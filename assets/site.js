const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.navlinks');if(menu&&nav){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))})}
const form=document.querySelector('#quoteForm');if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const lines=[`Bonjour, je souhaite un devis pour ${d.get('service')}.`,`Nom : ${d.get('name')}`,`Commune / cimetière : ${d.get('place')}`,`Téléphone : ${d.get('phone')}`,`Précisions : ${d.get('message')||'—'}`];location.href=`sms:+33744400810?body=${encodeURIComponent(lines.join('\n'))}`})}

if(!document.querySelector('.mobile-cta')){const bar=document.createElement('div');bar.className='mobile-cta';bar.innerHTML='<a href="tel:+33744400810">Appeler</a><a href="/contact.html">Devis gratuit</a>';document.body.appendChild(bar)}

const photoFix=document.createElement('style');photoFix.textContent=`
.proof img,.proof-premium img{height:auto!important;max-height:none!important;object-fit:contain!important;background:#f3f5f1;padding:8px}
.hero-photo-wrap img{object-fit:contain!important;background:#f3f5f1}
.distance-photo img,.aside img{height:auto!important;object-fit:contain!important;background:#f3f5f1}
@media(max-width:620px){.proof img,.proof-premium img{height:auto!important;min-height:0!important}.hero-photo-wrap img{height:auto!important;max-height:520px!important}}
`;document.head.appendChild(photoFix);
