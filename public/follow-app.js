/* The family follow page: draws the journal, and refreshes it every few minutes. */
(function(){
  const F = window.FOLLOW;
  if(!F || !window.JV) return;
  const photoUrl = id => '/api/follow/'+encodeURIComponent(F.token)+'/photo/'+encodeURIComponent(id);
  let data = {steps:F.steps, track:F.track};
  function draw(){
    document.getElementById('fw-stats').innerHTML = JV.statsHtml(JV.stats(data.steps, data.track));
    document.getElementById('fw-timeline').innerHTML = JV.timeline(data.steps, {photoUrl, people:F.people, empty:'הצעד הראשון יופיע כאן כשהם ינחתו'});
    JV.initMap(document.getElementById('fw-map'), data.steps, data.track, {photoUrl});
    const all = [...data.steps.map(s=>s.at), ...data.track.map(t=>t.at)].sort();
    const last = all[all.length-1];
    document.getElementById('fw-last').textContent = last ? 'עדכון אחרון: ' + new Date(last).toLocaleString('he-IL',{timeZone:'Asia/Bangkok',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) + ' (שעון תאילנד)' : '';
  }
  JV.bindPhotos(document.getElementById('fw-timeline'), ()=>data.steps, photoUrl);
  draw();
  setInterval(async ()=>{
    try{
      const r = await fetch('/api/follow/'+encodeURIComponent(F.token), {cache:'no-store'});
      if(!r.ok) return;
      const next = await r.json();
      if(next.steps.length !== data.steps.length || next.track.length !== data.track.length){ data = next; draw(); }
    }catch(e){}
  }, 5*60*1000);
})();
