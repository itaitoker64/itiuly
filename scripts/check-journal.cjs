/*
 * היומן: EXIF מתמונות (מיקום ושעה), סטטיסטיקה, ציר הזמן, ותור לא מקוון.
 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const store = {};
const ctx = vm.createContext({window:{TRIP_USER:{username:'itai'}}, document:{addEventListener(){}, getElementById(){ return {addEventListener(){}}; }, hidden:true},
  console, navigator:{onLine:false}, localStorage:{getItem:k=>store[k]??null, setItem:(k,v)=>{store[k]=String(v);}}, Intl, Date, Math, JSON, DataView, ArrayBuffer, Uint8Array});
ctx.window.window = ctx.window;
vm.runInContext(read('public/shared-seed.js'), ctx);
vm.runInContext(read('public/journal-view.js').replace('window.JV =', 'window.JV = globalThis.JV ='), ctx);
vm.runInContext(read('public/trip-app.js').replace(/loadState\(\);\s*$/, ''), ctx);
const run = s => vm.runInContext(s, ctx);
run('STATE=seedData(); ensureDefaults();');

// A JPEG with EXIF: GPS 8°0'0"N 98°50'24"E and DateTimeOriginal 2026:12:03 17:30:00, little-endian.
function jpegWithExif(){
  const b = [];
  const u16 = v => { b.push(v & 255, v >> 8); }, u32 = v => { b.push(v & 255, (v>>8)&255, (v>>16)&255, (v>>>24)&255); };
  const tiff = [];
  // build TIFF manually with offsets relative to TIFF start
  const T = [];
  const w16 = v => T.push(v & 255, v >> 8), w32 = v => T.push(v & 255, (v>>8)&255, (v>>16)&255, (v>>>24)&255);
  T.push(0x49,0x49); w16(42); w32(8);                 // header, IFD0 at 8
  // IFD0: 2 entries — ExifIFD, GPS IFD
  w16(2); w16(0x8769); w16(4); w32(1); w32(38); w16(0x8825); w16(4); w32(1); w32(56); w32(0);
  // Exif IFD at 38: 1 entry DateTimeOriginal ASCII 20 bytes at 120
  while(T.length < 38) T.push(0);
  w16(1); w16(0x9003); w16(2); w32(20); w32(120); w32(0);
  // GPS IFD at 56: 4 entries
  while(T.length < 56) T.push(0);
  w16(4);
  w16(1); w16(2); w32(2); T.push(0x4E,0,0,0);           // N
  w16(2); w16(5); w32(3); w32(150);                     // lat rationals at 150
  w16(3); w16(2); w32(2); T.push(0x45,0,0,0);           // E
  w16(4); w16(5); w32(3); w32(174);                     // lng rationals at 174
  w32(0);
  while(T.length < 120) T.push(0);
  for(const c of '2026:12:03 17:30:00') T.push(c.charCodeAt(0)); T.push(0);
  while(T.length < 150) T.push(0);
  [[8,1],[0,1],[0,1]].forEach(([n,d])=>{ w32(n); w32(d); });
  [[98,1],[50,1],[24,1]].forEach(([n,d])=>{ w32(n); w32(d); });
  const exif = [0x45,0x78,0x69,0x66,0,0, ...T];
  const out = [0xFF,0xD8, 0xFF,0xE1, (exif.length+2)>>8, (exif.length+2)&255, ...exif, 0xFF,0xD9];
  return new Uint8Array(out).buffer;
}
ctx.buf = jpegWithExif();
const ex = JSON.parse(run('JSON.stringify(readExif(buf))'));
assert.ok(Math.abs(ex.lat - 8) < 1e-9 && Math.abs(ex.lng - 98.84) < 1e-9, JSON.stringify(ex));
assert.equal(run('exifTime(readExif(buf))'), '2026-12-03T10:30:00.000Z', 'camera time is Thai time');
assert.deepEqual(JSON.parse(run('JSON.stringify(readExif(new ArrayBuffer(10)))')), {}, 'not a JPEG');

// Stats and the timeline.
run(`JOURNAL = {steps:[
  {id:'st_a',author:'itai',at:'2026-11-23T08:00:00Z',lat:13.74,lng:100.51,place:'צ׳יינטאון',text:'הגענו',photos:['f_00000000-0000-0000-0000-000000000001']},
  {id:'st_b',author:'talia',at:'2026-11-26T09:00:00Z',lat:8.1,lng:98.62,place:'קו יאו נוי',text:'',photos:[]}], track:[], follow:null, ping:null};`);
const st = JSON.parse(run('JSON.stringify(JV.stats(JOURNAL.steps, JOURNAL.track))'));
assert.equal(st.steps, 2); assert.equal(st.days, 2); assert.equal(st.photos, 1); assert.equal(st.km, 0, 'one point per person draws no line yet');
const html = run('renderJournal()');
assert.ok(/צ׳יינטאון/.test(html) && /קו יאו נוי/.test(html) && /jrnEdit/.test(html) && /קישור למשפחה/.test(html) && /קיצורים/.test(html));
assert.ok(/<svg/.test(run('JV.svgRoute(JOURNAL.steps, [], 300, 200)')));

// Offline: a step goes to the queue and stays there until there is a connection.
run(`jrnEnqueue({op:'step', step:JOURNAL.steps[0]});`);
assert.equal(run('jrnQueue().length'), 1);
assert.ok(/ממתינים לחיבור/.test(run('renderJournal()')));

// Planned place for a moment comes from the itinerary of that day.
assert.ok(/קאו סוק/.test(run(`plannedPlace('2026-12-04T05:00:00Z').name`)));
console.log('PASS: EXIF location and Thai time, stats, timeline, offline queue, planned place by date.');
