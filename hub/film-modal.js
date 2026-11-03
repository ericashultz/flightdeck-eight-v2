/* The shared full-screen film overlay (Ken, 16 Oct). A page links this file and hub/film-modal.css and marks
   each opener with data-film-open and a literal data-src holding the film's address. The overlay's markup is
   created here when the page has none, so no page carries its own copy. An opener whose data-src is empty does
   nothing: its address has not arrived yet. Escape, the backdrop and the close button shut it, and shutting it
   clears the frame so the film stops rather than playing behind the page. */
(function(){
  function el(){
    var m=document.getElementById('filmmodal');
    if(m) return m;
    m=document.createElement('div');
    m.className='filmmodal'; m.id='filmmodal';
    m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true'); m.setAttribute('aria-label','Film');
    m.innerHTML='<div class="scrim" data-film-close></div><div class="box">'+
      '<button type="button" class="x" aria-label="Close" data-film-close>&times;</button>'+
      '<div class="ratio"><iframe id="filmframe" title="Film" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div></div>';
    document.body.appendChild(m);
    return m;
  }
  function open(src,label){
    if(!src) return;
    var m=el(), f=document.getElementById('filmframe');
    if(label){ m.setAttribute('aria-label',label); f.setAttribute('title',label); }
    f.setAttribute('src',src); m.classList.add('on'); document.body.style.overflow='hidden';
  }
  function close(){
    var m=document.getElementById('filmmodal'), f=document.getElementById('filmframe');
    if(!m) return;
    m.classList.remove('on'); if(f) f.setAttribute('src',''); document.body.style.overflow='';
  }
  /* Bound once per document: the overlay is created on demand, so the click handler lives on the document. */
  if(document.documentElement.hasAttribute('data-film-bound')) return;
  document.documentElement.setAttribute('data-film-bound','');
  document.addEventListener('click',function(e){
    var t=e.target.closest?e.target.closest('[data-film-open]'):null;
    if(t){ e.preventDefault(); open(t.getAttribute('data-src'),t.getAttribute('aria-label')||''); return; }
    if(e.target.closest&&e.target.closest('[data-film-close]')) close();
  });
  document.addEventListener('keydown',function(e){
    var m=document.getElementById('filmmodal');
    if(e.key==='Escape'&&m&&m.classList.contains('on')) close();
  });
})();
