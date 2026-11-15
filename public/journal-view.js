/*
 * The journal views, shared by the trip app and the family follow page:
 * stats, the day-by-day timeline, the route map, and a photo lightbox.
 * Nothing private here — it only draws what it is given.
 */
(function(){
  // A step is shown in the time of the place it was added: Thailand, Sri Lanka, home, or the phone's own zone.
  const DEVICE_TZ = (()=>{ try{ return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Bangkok'; }catch(e){ return 'Asia/Bangkok'; } })();
  function tzAt(lat, lng){
    if(lat==null || lng==null) return DEVICE_TZ;
    if(lat > 5 && lat < 21 && lng > 97 && lng < 106) return 'Asia/Bangkok';
    if(lat > 5 && lat < 10.5 && lng > 79 && lng < 82.5) return 'Asia/Colombo';
    if(lat > 29 && lat < 34 && lng > 34 && lng < 36) return 'Asia/Jerusalem';
    return DEVICE_TZ;
  }
  const TZ = 'Asia/Bangkok';
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dayKey = (iso, lat, lng) => new Intl.DateTimeFormat('en-CA',{timeZone:lat===undefined?TZ:tzAt(lat,lng),year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(iso));
  const timeOf = (iso, lat, lng) => new Intl.DateTimeFormat('en-GB',{timeZone:lat===undefined?TZ:tzAt(lat,lng),hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(iso));
  const stepDay = s => dayKey(s.at, s.lat, s.lng);
  const dayTitle = key => new Date(key+'T12:00:00').toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'long'});

  function haversine(a, b){
    const R = 6371, rad = x=>x*Math.PI/180;
    const dLat = rad(b.lat-a.lat), dLng = rad(b.lng-a.lng);
    const h = Math.sin(dLat/2)**2 + Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;
    return 2*R*Math.asin(Math.sqrt(h));
  }

  /** Every located moment in time order, steps and track together, one line per person. */
  function routePoints(steps, track, author){
    const pts = [
      ...steps.filter(s=>s.lat!=null && s.lng!=null && (!author || s.author===author)).map(s=>({lat:s.lat,lng:s.lng,at:s.at,step:s})),
      ...track.filter(t=>!author || t.author===author).map(t=>({lat:t.lat,lng:t.lng,at:t.at}))
    ].sort((a,b)=>a.at<b.at?-1:1);
    // drop GPS jitter: a point closer than 150 m to the previous one adds nothing to the line
    const out = [];
    for(const p of pts){ if(!out.length || p.step || haversine(out[out.length-1], p) > 0.15) out.push(p); }
    return out;
  }

  function stats(steps, track){
    const authors = [...new Set([...steps.map(s=>s.author), ...track.map(t=>t.author)])];
    let km = 0;
    for(const a of authors){
      const pts = routePoints(steps, track, a);
      for(let i=1;i<pts.length;i++) km += haversine(pts[i-1], pts[i]);
    }
    const days = new Set(steps.map(stepDay));
    const places = new Set(steps.map(s=>(s.place||'').trim()).filter(Boolean));
    return {km:Math.round(km), days:days.size, steps:steps.length, photos:steps.reduce((n,s)=>n+(s.photos||[]).length,0), places:places.size};
  }

  /** Steps grouped by day, in the order they happened, on a line like a travel diary. */
  function timeline(steps, opts){
    const o = opts || {};
    const people = o.people || {};
    const byDay = {};
    steps.forEach(s=>{ (byDay[stepDay(s)] = byDay[stepDay(s)] || []).push(s); });
    const keys = Object.keys(byDay).sort();
    if(!keys.length) return `<div class="jv-empty"><div class="jv-empty-icon">🧭</div>${esc(o.empty || 'עוד אין צעדים')}</div>`;
    const first = Date.parse((o.startDate || keys[0]) + 'T12:00:00Z');
    return `<div class="jv-line">` + keys.map(k=>{
      const list = byDay[k].sort((a,b)=>a.at<b.at?-1:1);
      const n = Math.round((Date.parse(k+'T12:00:00Z') - first)/86400000) + 1;
      const places = [...new Set(list.map(s=>(s.place||'').trim()).filter(Boolean))];
      return `<section class="jv-day">
        <div class="jv-day-head"><span class="jv-day-num">${n>0?'יום '+n:''}</span>
          <h3 class="jv-day-title">${esc(dayTitle(k))}</h3>
          ${places.length?`<div class="jv-day-places">${places.map(esc).join(' · ')}</div>`:''}</div>
        ${list.map(s=>{
          const p = people[s.author] || {};
          const ph = s.photos||[];
          const photos = ph.slice(0,5).map((id,i)=>`<img loading="lazy" src="${esc(o.photoUrl(id))}" data-jv-photo="${esc(s.id)}" data-jv-i="${i}" alt="">`).join('');
          const more = ph.length > 5 ? `<span class="jv-more" data-jv-photo="${esc(s.id)}" data-jv-i="5">+${ph.length-5}</span>` : '';
          return `<article class="jv-step ${ph.length?'has-photos':''}" id="step-${esc(s.id)}">
            <span class="jv-dot">${esc(p.emoji||'📍')}</span>
            ${photos?`<div class="jv-photos n${Math.min(5,ph.length)}">${photos}${more}</div>`:''}
            <div class="jv-step-body">
              <div class="jv-step-head">
                <div class="jv-step-meta"><b>${esc(s.place||'צעד')}</b>
                  <small><bdi dir="ltr">${timeOf(s.at, s.lat, s.lng)}</bdi>${p.name?' · '+esc(p.name):''}${s.lat==null?' · בלי מיקום':''}</small></div>
                ${o.editable?`<button class="jv-edit" data-action="jrnEdit" data-id="${esc(s.id)}" aria-label="עריכה">✎</button>`:''}
              </div>
              ${s.text?`<p class="jv-text">${esc(s.text).replace(/\n/g,'<br>')}</p>`:''}
            </div>
          </article>`;
        }).join('')}
      </section>`;
    }).join('') + `</div>`;
  }

  function statsHtml(st){
    return `<div class="jv-stats">
      <div><b>${st.days}</b><span>ימים</span></div>
      <div><b>${st.km.toLocaleString('he-IL')}</b><span>ק״מ</span></div>
      <div><b>${st.places || st.steps}</b><span>מקומות</span></div>
      <div><b>${st.photos}</b><span>תמונות</span></div>
    </div>`;
  }

  /** A drawing of the route that needs no map tiles — for offline and for print. */
  function svgRoute(steps, track, w, h){
    const pts = routePoints(steps, track);
    if(pts.length < 1) return '';
    const lats = pts.map(p=>p.lat), lngs = pts.map(p=>p.lng);
    let [minLat,maxLat,minLng,maxLng] = [Math.min(...lats),Math.max(...lats),Math.min(...lngs),Math.max(...lngs)];
    const pad = 0.05 + Math.max(maxLat-minLat, maxLng-minLng)*0.08;
    minLat-=pad; maxLat+=pad; minLng-=pad; maxLng+=pad;
    const sx = w/(maxLng-minLng), sy = h/(maxLat-minLat), sc = Math.min(sx, sy);
    const ox = (w-(maxLng-minLng)*sc)/2, oy = (h-(maxLat-minLat)*sc)/2;
    const X = lng=>ox+(lng-minLng)*sc, Y = lat=>h-(oy+(lat-minLat)*sc);
    const authors = [...new Set(pts.map(p=>p.step?p.step.author:null).filter(Boolean))];
    const lines = (authors.length?authors:[null]).map((a,i)=>{
      const ap = routePoints(steps, track, a||undefined);
      return `<polyline points="${ap.map(p=>X(p.lng).toFixed(1)+','+Y(p.lat).toFixed(1)).join(' ')}" fill="none" stroke="${i?'#6F8F6A':'#C97B5A'}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }).join('');
    const dots = pts.filter(p=>p.step).map(p=>`<circle cx="${X(p.lng).toFixed(1)}" cy="${Y(p.lat).toFixed(1)}" r="4" fill="#fff" stroke="#3A332C" stroke-width="1.5"/>`).join('');
    return `<svg class="jv-svg" viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="המסלול">${lines}${dots}</svg>`;
  }

  /** The route on a real map when Leaflet and the network are there; the drawing otherwise. */
  function initMap(el, steps, track, opts){
    if(!el) return null;
    const o = opts || {};
    const pts = routePoints(steps, track);
    if(!window.L || !navigator.onLine){ el.innerHTML = svgRoute(steps, track, 600, 380) || '<div class="jv-empty">המפה תופיע אחרי הצעד הראשון</div>'; return null; }
    if(el._jvMap){ el._jvMap.remove(); el._jvMap = null; }
    const map = L.map(el, {zoomControl:false});
    el._jvMap = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:18, attribution:'© OpenStreetMap'}).addTo(map);
    if(o.planned && o.planned.length > 1) L.polyline(o.planned, {color:'#8C8272', weight:2, dashArray:'4 6', opacity:.6}).addTo(map);
    const authors = [...new Set([...steps.map(s=>s.author), ...track.map(t=>t.author)])];
    authors.forEach((a,i)=>{
      const ap = routePoints(steps, track, a);
      if(ap.length > 1) L.polyline(ap.map(p=>[p.lat,p.lng]), {color:i?'#6F8F6A':'#C97B5A', weight:3.5}).addTo(map);
    });
    steps.filter(s=>s.lat!=null).forEach(s=>{
      const photo = (s.photos||[])[0];
      const icon = L.divIcon({className:'jv-pin', html: photo ? `<img src="${esc(o.photoUrl(photo))}" alt="">` : '<span>📍</span>', iconSize:[38,38], iconAnchor:[19,19]});
      L.marker([s.lat, s.lng], {icon}).addTo(map).on('click', ()=>{ const a = document.getElementById('step-'+s.id); if(a) a.scrollIntoView({behavior:'smooth', block:'center'}); });
    });
    const bounds = pts.length ? pts.map(p=>[p.lat,p.lng]) : (o.planned||[]);
    if(bounds.length) map.fitBounds(bounds, {padding:[24,24], maxZoom:13}); else map.setView([13.75,100.5], 5);
    return map;
  }

  /** Full-screen photos, swipe or tap to move on. */
  function lightbox(urls, start){
    let i = start || 0;
    const box = document.createElement('div');
    box.className = 'jv-lightbox';
    const draw = ()=>{ box.innerHTML = `<img src="${esc(urls[i])}" alt=""><button class="jv-lb-close" aria-label="סגירה">✕</button>${urls.length>1?`<div class="jv-lb-count">${i+1} / ${urls.length}</div>`:''}`; };
    draw();
    let x0 = null;
    box.addEventListener('touchstart', e=>{ x0 = e.touches[0].clientX; }, {passive:true});
    box.addEventListener('touchend', e=>{ if(x0===null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if(Math.abs(dx) > 40 && urls.length>1){ i = (i + (dx<0?1:-1) + urls.length) % urls.length; draw(); } });
    box.addEventListener('click', e=>{
      if(e.target.closest('.jv-lb-close')) { box.remove(); return; }
      if(urls.length>1){ i = (i+1)%urls.length; draw(); } else box.remove();
    });
    document.body.appendChild(box);
  }

  /** Clicks on a timeline photo open the lightbox with that step's photos. */
  function bindPhotos(root, steps, photoUrl){
    root.addEventListener('click', e=>{
      const img = e.target.closest('[data-jv-photo]');
      if(!img) return;
      const s = steps().find(x=>x.id===img.dataset.jvPhoto);
      if(s) lightbox(s.photos.map(photoUrl), Number(img.dataset.jvI)||0);
    });
  }

  window.JV = {tzAt, stepDay, haversine, routePoints, stats, statsHtml, timeline, svgRoute, initMap, lightbox, bindPhotos, dayKey, timeOf, esc};
})();
