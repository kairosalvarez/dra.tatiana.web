// =======================
// WhatsApp
// =======================
const phone = "573015058597";
const msg = encodeURIComponent("Hola, quisiera agendar una valoración con la Dra. Tatiana Mendoza. ¿Me brindan información, por favor?");
const wa = `https://wa.me/${phone}?text=${msg}`;

// =======================
// Slider HERO
// =======================
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
let heroIdx = 0;

function heroShow(i){
  heroIdx = (i + slides.length) % slides.length;
  slides.forEach((s,k)=>s.classList.toggle("active", k===heroIdx));
  dots.forEach((d,k)=>d.classList.toggle("active", k===heroIdx));
}
document.getElementById("prev")?.addEventListener("click", ()=>heroShow(heroIdx-1));
document.getElementById("next")?.addEventListener("click", ()=>heroShow(heroIdx+1));
dots.forEach(d=>d.addEventListener("click", ()=>heroShow(parseInt(d.getAttribute("data-dot"),10))));
setInterval(()=>heroShow(heroIdx+1), 7000);

// =======================
// Mega menús
// =======================
const megaServicios = document.getElementById("mega-servicios");
const megaNosotros  = document.getElementById("mega-nosotros");

function closeAll(){
  megaServicios?.classList.remove("open");
  megaNosotros?.classList.remove("open");
}

document.getElementById("btnServicios")?.addEventListener("click", ()=>{
  const open = megaServicios?.classList.contains("open");
  closeAll();
  if(!open) megaServicios?.classList.add("open");
});

document.getElementById("btnNosotros")?.addEventListener("click", ()=>{
  const open = megaNosotros?.classList.contains("open");
  closeAll();
  if(!open) megaNosotros?.classList.add("open");
});

document.addEventListener("click", (e)=>{
  if(!e.target.closest("header")) closeAll();
});
document.querySelectorAll("[data-close]").forEach(a=>{
  a.addEventListener("click", ()=>closeAll());
});

// =======================
// WhatsApp botones
// =======================
document.getElementById("ctaTop")?.addEventListener("click", ()=>window.open(wa,"_blank"));
document.getElementById("ctaBottom")?.addEventListener("click", ()=>window.open(wa,"_blank"));
document.getElementById("waFloat")?.addEventListener("click", ()=>window.open(wa,"_blank"));

document.getElementById("ctaHero1")?.setAttribute("href", wa);
document.getElementById("ctaHero2")?.setAttribute("href", wa);
document.getElementById("ctaHero3")?.setAttribute("href", wa);

// =======================
// Catálogo tipo Chevrolet (tabs + 3 servicios + flechas)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const tabsEl = document.getElementById("chevyTabs");
  const imgEl  = document.getElementById("svcImg");
  const nameEl = document.getElementById("svcName");
  const descEl = document.getElementById("svcDesc");
  const moreEl = document.getElementById("svcMore");

  if (!tabsEl || !imgEl || !nameEl || !descEl) return;

  // Links directos (estables) de Unsplash CDN (NO source.unsplash.com)
  const IMG = {
    jawline: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    body: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    vitamin: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    energy: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1600&q=80",
    detox: "https://images.unsplash.com/photo-1580281658629-7b39d9c06f5a?auto=format&fit=crop&w=1600&q=80",
    skin: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=80",
    fallback: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
  };

  const CATALOG = {
    especializados: {
      label: "Especializados",
      items: [
        { name: "Endolifting (Abdominal)", desc: "Tensado y mejora del contorno abdominal con enfoque médico.", img: "assets/Portada/endolifting.png" },
        { name: "Lipopapada", desc: "Perfilado del contorno submentoniano tras valoración.", img: IMG.jawline },
        { name: "Adiposidad localizada y celulitis", desc: "Protocolos para reducción localizada y mejoría de textura.", img: IMG.body },
      ]
    },
    sueroterapia: {
      label: "Sueroterapia",
      items: [
        { name: "Suero reparador", desc: "Apoyo revitalizante según necesidad clínica.", img: IMG.vitamin },
        { name: "Suero energizante", desc: "Vitalidad y bienestar integral.", img: IMG.energy },
        { name: "Suero desintoxicante", desc: "Acompañamiento detox con enfoque médico.", img: IMG.detox },
      ]
    },
    facial: {
      label: "Faciales",
      items: [
        { name: "Armonización facial", desc: "Resultados naturales con protocolos personalizados.", img: "assets/Portada/facial.png" },
        { name: "Rejuvenecimiento no quirúrgico", desc: "Opciones para refrescar el rostro sin cirugía.", img: IMG.skin },
        { name: "Calidad de piel", desc: "Bioestimulación y regeneración para una piel luminosa.", img: "assets/Portada/piel.png" },
      ]
    }
  };

  let currentCat = "especializados";
  let currentIdx = 0;

  function renderTabs(){
    tabsEl.innerHTML = "";
    Object.keys(CATALOG).forEach(key=>{
      const b = document.createElement("button");
      b.className = "chevyTab" + (key===currentCat ? " active" : "");
      b.textContent = CATALOG[key].label;
      b.addEventListener("click", ()=>{
        currentCat = key;
        currentIdx = 0;
        renderTabs();
        renderCard();
      });
      tabsEl.appendChild(b);
    });
  }

  function safeSetImage(src){
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = IMG.fallback;
    };
    imgEl.src = src;
  }

  function renderCard(){
    const item = CATALOG[currentCat].items[currentIdx];
    nameEl.textContent = item.name;
    descEl.textContent = item.desc;
    moreEl.href = "#serviciosTop";
    safeSetImage(item.img);
  }

  function next(){
    const len = CATALOG[currentCat].items.length;
    currentIdx = (currentIdx + 1) % len;
    renderCard();
  }
  function prev(){
    const len = CATALOG[currentCat].items.length;
    currentIdx = (currentIdx - 1 + len) % len;
    renderCard();
  }

  document.getElementById("svcNext")?.addEventListener("click", next);
  document.getElementById("svcPrev")?.addEventListener("click", prev);

  document.querySelectorAll("[data-open]").forEach(a=>{
    a.addEventListener("click", ()=>{
      const val = a.getAttribute("data-open");
      const [cat, idx] = val.split(":");
      if(CATALOG[cat]){
        currentCat = cat;
        currentIdx = parseInt(idx,10) || 0;
        renderTabs();
        renderCard();
      }
      document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  renderTabs();
  renderCard();
});

      tabsEl.appendChild(b);
    });
  }

  function safeSetImage(src){
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = U("aesthetic,clinic,white");
    };
    imgEl.src = src;
  }

  function renderCard(){
    const item = CATALOG[currentCat].items[currentIdx];
    nameEl.textContent = item.name;
    descEl.textContent = item.desc;
    moreEl.href = "#serviciosTop";
    safeSetImage(item.img);
  }

  function next(){
    const len = CATALOG[currentCat].items.length;
    currentIdx = (currentIdx + 1) % len;
    renderCard();
  }
  function prev(){
    const len = CATALOG[currentCat].items.length;
    currentIdx = (currentIdx - 1 + len) % len;
    renderCard();
  }

  document.getElementById("svcNext")?.addEventListener("click", next);
  document.getElementById("svcPrev")?.addEventListener("click", prev);

  // Desde el mega menú: data-open="categoria:indice"
  document.querySelectorAll("[data-open]").forEach(a=>{
    a.addEventListener("click", ()=>{
      const val = a.getAttribute("data-open");
      const [cat, idx] = val.split(":");
      if(CATALOG[cat]){
        currentCat = cat;
        currentIdx = parseInt(idx,10) || 0;
        renderTabs();
        renderCard();
      }
      document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  renderTabs();
  renderCard();
});
