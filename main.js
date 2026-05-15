// ===== MAIN.JS =====
// Preloader — only runs on index.html (where #preloader exists)
const preloaderEl = document.getElementById('preloader');
if (preloaderEl) {
  window.addEventListener('load', () => {
    setTimeout(() => { preloaderEl.classList.add('hidden'); }, 2800);
  });
}

// Navbar scroll
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY>60)navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  const btn=document.getElementById('back-to-top');
  if(btn){btn.classList.toggle('show',window.scrollY>400)}
});

// Hamburger / Drawer
const hamburger=document.getElementById('hamburger');
const drawer=document.getElementById('mobile-drawer');
const overlay=document.getElementById('drawer-overlay');
const drawerClose=document.getElementById('drawer-close');
function openDrawer(){hamburger.classList.add('active');drawer.classList.add('open');overlay.classList.add('active');document.body.style.overflow='hidden'}
function closeDrawer(){hamburger.classList.remove('active');drawer.classList.remove('open');overlay.classList.remove('active');document.body.style.overflow=''}
if(hamburger)hamburger.addEventListener('click',openDrawer);
if(drawerClose)drawerClose.addEventListener('click',closeDrawer);
if(overlay)overlay.addEventListener('click',closeDrawer);

// Back to top
const backBtn=document.getElementById('back-to-top');
if(backBtn)backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Active nav link
const currentPage=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-link').forEach(link=>{
  if(link.getAttribute('href')===currentPage)link.classList.add('active');
  else link.classList.remove('active');
});

// Particles
const pContainer=document.getElementById('particles');
if(pContainer){
  for(let i=0;i<25;i++){
    const p=document.createElement('div');
    p.className='particle';
    p.style.cssText=`left:${Math.random()*100}%;width:${Math.random()*3+1}px;height:${Math.random()*3+1}px;animation-duration:${Math.random()*15+8}s;animation-delay:${Math.random()*10}s;opacity:${Math.random()*0.4+0.1}`;
    pContainer.appendChild(p);
  }
}

// 3D tilt card
const whyCard=document.getElementById('why-card');
if(whyCard){
  whyCard.addEventListener('mousemove',e=>{
    const r=whyCard.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*20;
    const y=((e.clientY-r.top)/r.height-.5)*-20;
    whyCard.style.transform=`perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
  whyCard.addEventListener('mouseleave',()=>whyCard.style.transform='perspective(1000px) rotateY(0) rotateX(0)');
}

// Counter animation
function animateCounter(el){
  const target=+el.dataset.target;
  const duration=2000;
  const step=target/duration*16;
  let current=0;
  const timer=setInterval(()=>{
    current+=step;
    if(current>=target){current=target;clearInterval(timer);}
    el.textContent=Math.floor(current).toLocaleString();
  },16);
}
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.stat-num').forEach(el=>animateCounter(el));observer.disconnect()}});
},{threshold:.5});
const statsEl=document.querySelector('.hero-stats');
if(statsEl)observer.observe(statsEl);

// Search tabs
document.querySelectorAll('.search-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{document.querySelectorAll('.search-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active')});
});

// Filter tabs
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('.prop-card').forEach(card=>{
      card.style.display=(filter==='all'||card.dataset.type===filter)?'block':'none';
    });
  });
});

// Video modal
const playBtn=document.getElementById('play-btn');
const videoModal=document.getElementById('video-modal');
const modalClose=document.getElementById('modal-close');
const ytFrame=document.getElementById('yt-frame');
if(playBtn)playBtn.addEventListener('click',()=>{videoModal.classList.add('open');ytFrame.src='https://www.youtube.com/embed/nVCubhQ454c?autoplay=1';});
if(modalClose)modalClose.addEventListener('click',()=>{videoModal.classList.remove('open');ytFrame.src='';});
if(videoModal)videoModal.addEventListener('click',e=>{if(e.target===videoModal){videoModal.classList.remove('open');ytFrame.src=''}});

// Testimonial Swiper
if(document.querySelector('.testimonial-swiper')){
  new Swiper('.testimonial-swiper',{loop:true,slidesPerView:1,spaceBetween:24,pagination:{el:'.swiper-pagination',clickable:true},navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'},breakpoints:{768:{slidesPerView:2},1024:{slidesPerView:3}},autoplay:{delay:4000,disableOnInteraction:false}});
}

// Property Cards Data
const properties=[
  {id:1,name:'Skyline Penthouse',location:'Bandra West, Mumbai',price:'₹8.5 Cr',beds:4,baths:4,area:'3,800',type:'penthouse',badge:'For Sale',img:'images/property1.png'},
  {id:2,name:'Villa Serenita',location:'Whitefield, Bangalore',price:'₹5.2 Cr',beds:5,baths:4,area:'5,200',type:'villa',badge:'For Sale',img:'images/property2.png'},
  {id:3,name:'Horizon Beachfront',location:'Juhu, Mumbai',price:'₹12 Cr',beds:6,baths:5,area:'8,000',type:'villa',badge:'Premium',img:'images/property3.png'},
  {id:4,name:'Prestige Business Hub',location:'Cyber City, Gurgaon',price:'₹3.8 Cr',beds:null,baths:null,area:'4,500',type:'commercial',badge:'Commercial',img:'images/property4.png'},
  {id:5,name:'Royal Oak Apartments',location:'Koramangala, Bangalore',price:'₹1.9 Cr',beds:3,baths:2,area:'1,850',type:'apartment',badge:'For Sale',img:'images/hero_bg.png'},
  {id:6,name:'The Grand Residency',location:'DLF Phase 5, Gurgaon',price:'₹6.7 Cr',beds:4,baths:3,area:'4,200',type:'villa',badge:'New Launch',img:'images/property2.png'},
];

function renderProperties(data){
  const grid=document.getElementById('properties-grid');
  if(!grid)return;
  grid.innerHTML=data.map(p=>`
    <div class="prop-card" data-type="${p.type}">
      <div class="prop-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        <span class="prop-badge ${p.badge==='For Rent'?'rent':''}">${p.badge}</span>
        <button class="prop-fav" onclick="this.classList.toggle('active')"><i class="fa fa-heart"></i></button>
      </div>
      <div class="prop-info">
        <div class="prop-price">${p.price}</div>
        <div class="prop-name">${p.name}</div>
        <div class="prop-loc"><i class="fa fa-map-marker-alt"></i>${p.location}</div>
        <div class="prop-features">
          ${p.beds?`<span class="prop-feat"><i class="fa fa-bed"></i>${p.beds} Beds</span>`:''}
          ${p.baths?`<span class="prop-feat"><i class="fa fa-bath"></i>${p.baths} Baths</span>`:''}
          <span class="prop-feat"><i class="fa fa-ruler-combined"></i>${p.area} sqft</span>
        </div>
      </div>
    </div>`).join('');
}
renderProperties(properties);

// Scroll reveal
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');revealObserver.unobserve(e.target)}});
},{threshold:0.1});
document.querySelectorAll('.prop-card,.service-card,.why-feat,.testimonial-card').forEach(el=>{
  el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity 0.6s ease,transform 0.6s ease';
  revealObserver.observe(el);
});
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.revealed').forEach(el=>{el.style.opacity='1';el.style.transform='translateY(0)'});
});
// CSS class injection for reveal
const style=document.createElement('style');
style.textContent='.revealed{opacity:1 !important;transform:translateY(0) !important}';
document.head.appendChild(style);
