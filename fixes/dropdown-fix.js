/* dropdown-fix.js - click/toggle controller for static index.html nav dropdowns */
(function(){
  function initDropdowns(root=document){
    const dropdownParents = Array.from(root.querySelectorAll('.nav-item')).filter(n=>n.querySelector('.dropdown-panel'));
    function closeAll(){
      dropdownParents.forEach(p=>{
        p.classList.remove('open');
        const link=p.querySelector('.nav-link'); if(link) link.setAttribute('aria-expanded','false');
        const panel=p.querySelector('.dropdown-panel'); if(panel) panel.classList.remove('align-right');
      });
    }
    dropdownParents.forEach(parent=>{
      const trigger=parent.querySelector('.nav-link');
      const panel=parent.querySelector('.dropdown-panel');
      if(!trigger||!panel) return;
      trigger.setAttribute('aria-haspopup','true');
      trigger.setAttribute('aria-expanded','false');
      trigger.style.cursor='pointer';
      trigger.addEventListener('click',function(ev){
        ev.preventDefault();
        const opening=!parent.classList.contains('open');
        closeAll();
        if(opening){
          parent.classList.add('open');
          trigger.setAttribute('aria-expanded','true');
          // compute overflow
          const rect=panel.getBoundingClientRect();
          if(rect.right>window.innerWidth-8){ panel.classList.add('align-right'); } else { panel.classList.remove('align-right'); }
        }
      });
      trigger.addEventListener('keydown',function(ev){ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); trigger.click(); } });
    });
    document.addEventListener('click',function(ev){ if(!ev.target.closest('.nav-item')) closeAll(); });
    document.addEventListener('keydown',function(ev){ if(ev.key==='Escape') closeAll(); });
    window.addEventListener('resize',function(){ closeAll(); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>initDropdowns()); else initDropdowns();
})();
