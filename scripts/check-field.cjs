/*
 * בשטח: כרטיסים לנהג, אישורים, הוצאה מהירה, חירום, וקובץ יומן.
 */
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const ctx = vm.createContext({window:{TRIP_USER:{username:'itai'}}, document:{addEventListener(){}, getElementById(){ return {addEventListener(){}}; }}, console, localStorage:{getItem(){return null;}, setItem(){}}, navigator:{}});
vm.runInContext(read('public/shared-seed.js'), ctx);
vm.runInContext(read('public/trip-app.js').replace(/loadState\(\);\s*$/, ''), ctx);
const run = s => vm.runInContext(s, ctx);
run('STATE=seedData(); ensureDefaults(); uploadedFiles=[];');

// Taxi cards: the places for a day, in Thai, with a phone where there is one.
const ids = d => JSON.parse(run(`JSON.stringify(taxiPlacesFor('${d}').map(p=>p.id))`));
assert.ok(ids('2026-11-24').includes('asai') && ids('2026-11-24').includes('sala'));
assert.ok(ids('2026-12-04').includes('rainforest') && ids('2026-12-04').includes('pier'));
assert.ok(ids('2026-12-10').includes('bkk-int'));
assert.ok(run(`TAXI_PLACES.every(p=>/[\\u0E00-\\u0E7F]/.test(p.th) && p.addr && p.maps)`), 'every card has Thai text, an address and a map');

// Bookings: which ones belong to a day, and their contacts.
const covers = (what, d) => run(`bookingCovers(sh().bookings.find(b=>b.what===${JSON.stringify(what)}), '${d}')`);
assert.equal(covers('לילה על האגם · Siam Tour', '2026-12-03'), true);
assert.equal(covers('לילה על האגם · Siam Tour', '2026-12-05'), false);
assert.equal(covers('Khaosok Rainforest Resort', '2026-12-04'), true);
assert.equal(covers('Thai Vietjet · MSR6JW', '2026-12-09'), true, '"26/11 + 9/12" covers both dates');
assert.ok(/wa\.me\/66825796015/.test(run('renderBookingsSection()')), 'WhatsApp to Lukas on the Siam Tour booking');
assert.ok(/לצרף אישור/.test(run('renderBookingsSection()')));

// Today has the field bar; More has the field tab.
run('activeTab="today"; todayIndex=10;');
assert.ok(/fld-bar/.test(run('renderToday()')));
assert.ok(/כרטיסים לנהג/.test(run('renderFieldSection()')) && /1155/.test(run('renderFieldSection()')));

// Quick expense counts toward the day.
run(`wallet().expenses.push({id:'x_q',title:'מונית',amount:200,currency:'THB',date:'2026-12-04',category:'transport',paidBy:'itai',split:'ratio',status:'paid'})`);
assert.ok(Math.abs(run(`dayExpensesIls('2026-12-04')`) - (200 + 2600) * run('rate()')) < 0.01);
assert.ok(/הוצאתם/.test(run(`renderDaySpend(sh().days.find(d=>d.date==='2026-12-04'))`)));

// Calendar: Thai times become UTC, with alarms; the booked filter keeps the lake pickup.
const ics = run('buildIcs(true)');
assert.ok(/BEGIN:VCALENDAR/.test(ics) && /END:VCALENDAR\s*$/.test(ics));
assert.ok(/DTSTART:20261203T010000Z/.test(ics), '08:00 in Thailand on 3/12 is 01:00 UTC');
assert.ok(/TRIGGER:-PT1H/.test(ics) && /TRIGGER:-PT12H/.test(ics));
assert.ok(ics.split('BEGIN:VEVENT').length - 1 < run('buildIcs(false)').split('BEGIN:VEVENT').length - 1, 'the booked file is shorter');
assert.ok(ics.split('\r\n').every(l => l.length <= 75), 'folded lines');

// Defaults survive a second pass.
const settled = run('JSON.stringify(STATE)'); run('ensureDefaults();');
assert.equal(run('JSON.stringify(STATE)'), settled);
assert.deepEqual(JSON.parse(run('JSON.stringify(sh().emergency)')), {insurer:'PassportCard', policy:'', phone:'', notes:''});
console.log('PASS: taxi cards by day, bookings by day with contacts and files, the field bar, quick expenses per day, the calendar file, defaults once.');

// הביטוח מופיע ברשימת האישורים, וקבצים מתחברים להזמנה לפי מספר האישור שבשם
assert.ok(run("sh().bookings.some(b=>b.fileTag==='PassportCard')"));
assert.equal(run("(uploadedFiles=[{id:'f1',name:'ASAI · 5547616403'},{id:'f2',name:'PassportCard · פוליסה'},{id:'f3',name:'אחר'}], bookingFiles(sh().bookings.find(b=>/ASAI/.test(b.what))).join(','))"), 'f1');
assert.equal(run("bookingFiles(sh().bookings.find(b=>b.fileTag==='PassportCard')).join(',')"), 'f2');
console.log('booking files: ok');
assert.ok(run("sh().bookings.some(b=>b.fileTag==='Asian Trails' && b.when==='7/12')"));
assert.equal(run("(uploadedFiles=[{id:'k',name:'KYN Phoenix · Sea House'}], bookingFiles(sh().bookings.find(b=>b.id==='kyn-2026-11')).join(','))"), 'k');
console.log('kyn + similan files: ok');
