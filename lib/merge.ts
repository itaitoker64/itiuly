/**
 * Three-way merge for the trip document.
 *
 * Both people edit the same JSON document, usually in different corners of it:
 * one ticks off a day in Ko Yao Noi while the other adds an expense. Before
 * this, whoever saved second was told to reload and lost the edit. With the
 * version they started from (the base) kept in history, the two sets of changes
 * can simply be combined.
 *
 * The rules are the usual ones:
 *   - a side that did not change a value defers to the side that did
 *   - when both changed the same value, the one already saved (theirs) wins,
 *     and the path is reported so the client can say so
 *   - lists of objects with an `id` are matched by id, not by position, so
 *     additions and removals on both sides survive
 */

type Json = unknown;
type JsonObject = Record<string, unknown>;

export type MergeResult = { merged: Json; conflicts: string[] };

function isPlainObject(value: Json): value is JsonObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function sameJson(a: Json, b: Json): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== 'object') return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

function hasId(value: Json): value is JsonObject & { id: string } {
  return isPlainObject(value) && typeof value.id === 'string';
}

/**
 * A list is id-keyed when every entry carries a distinct string id. An empty
 * list qualifies too: a list someone emptied still has to merge by id against
 * the other side, or a delete would swallow the other person's edit.
 */
function asKeyedList(value: Json): (JsonObject & { id: string })[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every(hasId)) return null;
  const ids = new Set(value.map((item) => item.id));
  return ids.size === value.length ? value : null;
}

function isKeyedList(value: Json): value is (JsonObject & { id: string })[] {
  const list = asKeyedList(value);
  return list !== null && list.length > 0;
}

function mergeKeyedLists(
  base: Json,
  mine: (JsonObject & { id: string })[],
  theirs: (JsonObject & { id: string })[],
  path: string,
  conflicts: string[]
): Json {
  const baseList = isKeyedList(base) ? base : [];
  const baseById = new Map(baseList.map((item) => [item.id, item as Json]));
  const mineById = new Map(mine.map((item) => [item.id, item as Json]));
  const theirsById = new Map(theirs.map((item) => [item.id, item as Json]));

  const out: Json[] = [];
  const emitted = new Set<string>();

  // Their order is the saved one, so it leads; anything I added follows.
  const order = [...theirs.map((i) => i.id), ...mine.map((i) => i.id)];

  for (const id of order) {
    if (emitted.has(id)) continue;
    emitted.add(id);

    const inBase = baseById.has(id);
    const mineItem = mineById.get(id);
    const theirsItem = theirsById.get(id);

    if (mineItem === undefined && theirsItem === undefined) continue;

    // Deleted by one side, untouched by the other → stays deleted.
    if (mineItem === undefined) {
      if (inBase && sameJson(baseById.get(id), theirsItem)) continue;
      out.push(theirsItem as Json);
      continue;
    }
    if (theirsItem === undefined) {
      if (inBase && sameJson(baseById.get(id), mineItem)) continue;
      out.push(mineItem);
      continue;
    }

    out.push(
      mergeValues(
        inBase ? (baseById.get(id) as Json) : undefined,
        mineItem,
        theirsItem,
        `${path}[${id}]`,
        conflicts
      )
    );
  }
  return out;
}

function mergeValues(
  base: Json,
  mine: Json,
  theirs: Json,
  path: string,
  conflicts: string[]
): Json {
  if (sameJson(mine, theirs)) return theirs;
  if (sameJson(base, mine)) return theirs; // only they touched it
  if (sameJson(base, theirs)) return mine; // only I touched it

  const mineList = asKeyedList(mine);
  const theirsList = asKeyedList(theirs);
  if (
    mineList &&
    theirsList &&
    (mineList.length > 0 || theirsList.length > 0 || isKeyedList(base))
  ) {
    return mergeKeyedLists(base, mineList, theirsList, path, conflicts);
  }

  if (isPlainObject(mine) && isPlainObject(theirs)) {
    const baseObject = isPlainObject(base) ? base : {};
    const out: JsonObject = {};
    const keys = new Set([...Object.keys(mine), ...Object.keys(theirs)]);
    for (const key of keys) {
      const childPath = path ? `${path}.${key}` : key;
      const inMine = key in mine;
      const inTheirs = key in theirs;
      if (inMine && inTheirs) {
        out[key] = mergeValues(baseObject[key], mine[key], theirs[key], childPath, conflicts);
        continue;
      }
      // Added or removed on one side only.
      const present = inMine ? mine[key] : theirs[key];
      const existedInBase = key in baseObject;
      if (!existedInBase) {
        out[key] = present;
      } else if (!sameJson(baseObject[key], present)) {
        out[key] = present;
      }
      // else: deleted on one side and untouched on the other → leave it out
    }
    return out;
  }

  // Both edited the same scalar. The saved value stands.
  conflicts.push(path || '(root)');
  return theirs;
}

export function mergeTripState(base: Json, mine: Json, theirs: Json): MergeResult {
  const conflicts: string[] = [];
  const merged = mergeValues(base, mine, theirs, '', conflicts);
  return { merged, conflicts };
}
