
function toast(msg){const old=document.querySelector('.toast');if(old)old.remove();const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}

const params=new URLSearchParams(location.search);
if(document.getElementById('match-name')){
  const name=params.get('name')||'Sara', initial=params.get('initial')||'S', match=params.get('match')||'98', color=params.get('color')||'coral';
  document.getElementById('match-name').textContent=name;
  document.getElementById('match-percent').textContent=match+'%';
  const a=document.getElementById('match-avatar'); a.textContent=initial; a.className='big-avatar '+color;
}
document.querySelectorAll('.question').forEach(q=>q.addEventListener('click',()=>{document.querySelectorAll('.question').forEach(x=>x.classList.remove('selected-question'));q.classList.add('selected-question')}));

const search=document.getElementById('user-search');
const filterButtons=document.querySelectorAll('.chip');
let activeFilter='all';
function filterUsers(){
  if(!search)return;
  const query=search.value.toLowerCase().trim();
  let shown=0;
  document.querySelectorAll('.profile-card').forEach(card=>{
    const hay=card.dataset.tags;
    const okQuery=!query||hay.includes(query);
    const okFilter=activeFilter==='all'||hay.includes(activeFilter);
    card.style.display=okQuery&&okFilter?'block':'none';
    if(okQuery&&okFilter)shown++;
  });
  document.getElementById('empty-state').style.display=shown?'none':'block';
}
if(search)search.addEventListener('input',filterUsers);
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');activeFilter=btn.dataset.filter;filterUsers()}));

const eventTask=document.getElementById('event-task');
if(eventTask)eventTask.addEventListener('click',()=>{
  const circle=document.getElementById('task-circle'), fill=document.getElementById('progress-fill'), text=document.getElementById('progress-text'), cap=document.getElementById('progress-caption'), reward=document.getElementById('reward');
  const complete=eventTask.classList.toggle('done');
  if(complete){circle.textContent='✓';circle.style.background='#55b575';circle.style.color='#fff';fill.style.width='100%';text.textContent='100%';cap.textContent='Badge unlocked — streak complete!';reward.classList.add('unlocked');toast('Friendship Badge unlocked!')}
  else{circle.textContent='';circle.style.background='transparent';fill.style.width='55%';text.textContent='55%';cap.textContent='1 more quest to unlock your badge';reward.classList.remove('unlocked')}
});
document.querySelectorAll('.join-event').forEach(btn=>btn.addEventListener('click',()=>{btn.textContent='Joined ✓';toast('Event added to your challenge')}));
const suggest=document.getElementById('suggest-btn');if(suggest)suggest.addEventListener('click',()=>toast('Choose another time'));
const composer=document.getElementById('composer');
if(composer)composer.addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('message-input');if(!input.value.trim())return;const b=document.createElement('div');b.className='bubble mine';b.textContent=input.value;document.querySelector('.chat-area').appendChild(b);input.value='';toast('Message sent')});
