const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.navlinks');if(menu&&nav){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))})}
const form=document.querySelector('#quoteForm');if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const lines=[`Bonjour, je souhaite un devis pour ${d.get('service')}.`,`Nom : ${d.get('name')}`,`Commune / cimetière : ${d.get('place')}`,`Téléphone : ${d.get('phone')}`,`Précisions : ${d.get('message')||'—'}`];location.href=`sms:+33744400810?body=${encodeURIComponent(lines.join('\n'))}`})}

if(!document.querySelector('.mobile-cta')){const bar=document.createElement('div');bar.className='mobile-cta';bar.innerHTML='<a href="tel:+33744400810">Appeler</a><a href="/contact.html">Devis gratuit</a>';document.body.appendChild(bar)}


const photoLinks=document.querySelectorAll('.photo-open');
if(photoLinks.length){
 const dialog=document.createElement('dialog');dialog.className='photo-dialog';dialog.setAttribute('aria-label','Photographie agrandie');
 dialog.innerHTML='<button type="button" class="photo-close" aria-label="Fermer la photographie">Fermer ×</button><img alt=""><p></p>';document.body.appendChild(dialog);
 const full=dialog.querySelector('img');let trigger;
 photoLinks.forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();trigger=link;full.src=link.href;full.alt=link.querySelector('img')?.alt||'Réalisation du Jardin d’Éden';dialog.querySelector('p').textContent=full.alt;dialog.showModal();}));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>trigger?.focus());
}
