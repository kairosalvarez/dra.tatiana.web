<script>
  // WhatsApp (usa el mismo que ya tienes)
  const phone = "573015058597";
  const msg = encodeURIComponent("Hola, quisiera agendar una valoración con la Dra. Tatiana Mendoza. ¿Me brindan información, por favor?");
  const wa = `https://wa.me/${phone}?text=${msg}`;

  // Catálogo (3 servicios por categoría, tipo Chevrolet)
  // IMÁGENES: puedes usar por ahora las 3 que ya tienes en Portada.
  // Luego, si quieres, creamos imágenes específicas por servicio y solo cambias el src.
 const CATALOG = {
  especializados: {
    label: "Especializados",
    items: [
      {
        name: "Endolifting (Abdominal)",
        desc: "Tensado y mejora del contorno abdominal con enfoque médico.",
        img: "assets/Portada/endolifting.png" // TU imagen
      },
      {
        name: "Lipopapada",
        desc: "Perfilado del contorno submentoniano tras valoración.",
        img: "https://images.unsplash.com/photo-1598449426314-8b02525e8733?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Adiposidad localizada y celulitis",
        desc: "Protocolos orientados a reducción localizada y mejora de textura.",
        img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },

  sueroterapia: {
    label: "Sueroterapia",
    items: [
      {
        name: "Suero reparador",
        desc: "Apoyo revitalizante según necesidad clínica.",
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Suero energizante",
        desc: "Vitalidad y bienestar integral.",
        img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Suero desintoxicante",
        desc: "Acompañamiento detox con enfoque médico.",
        img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  },

  rejuvenecimiento: {
    label: "Rejuvenecimiento & Botox",
    items: [
      {
        name: "Rejuvenecimiento facial no quirúrgico",
        desc: "Opciones para refrescar el rostro sin cirugía.",
        img: "assets/Portada/facial.png" // TU imagen
      },
      {
        name: "Botox – tercio superior",
        desc: "Tratamiento del tercio superior tras valoración.",
        img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=1200&q=80"
      },
      {
        name: "Botox – tercio inferior",
        desc: "Tratamiento del tercio inferior tras valoración.",
        img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  }
};

  const tabsEl = document.getElementById("catalogTabs");
  const imgEl  = document.getElementById("catImg");
  const nameEl = document.getElementById("catName");
  const descEl = document.getElementById("catDesc");
  const bookEl = document.getElementById("catBook");
  const moreEl = document.getElementById("catMore");

  let currentCat = "especializados";
  let currentIdx = 0;

  function renderTabs(){
    tabsEl.innerHTML = "";
    Object.keys(CATALOG).forEach(key=>{
      const b = document.createElement("button");
      b.className = "catalog-tab" + (key===currentCat ? " active" : "");
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

  function renderCard(){
    const item = CATALOG[currentCat].items[currentIdx];
    imgEl.src = item.img;
    imgEl.alt = item.name;
    nameEl.textContent = item.name;
    descEl.textContent = item.desc;
    bookEl.href = wa;
    moreEl.href = "#serviciosTop"; // si luego haces una página del servicio, aquí la linkeamos
  }

  function next(){ currentIdx = (currentIdx + 1) % CATALOG[currentCat].items.length; renderCard(); }
  function prev(){ currentIdx = (currentIdx - 1 + CATALOG[currentCat].items.length) % CATALOG[currentCat].items.length; renderCard(); }

  const prevBtn = document.getElementById("catPrev");
  const nextBtn = document.getElementById("catNext");
  if(prevBtn) prevBtn.addEventListener("click", prev);
  if(nextBtn) nextBtn.addEventListener("click", next);

  // Desde el mega menú: data-open="categoria:indice"
  document.querySelectorAll("[data-open]").forEach(a=>{
    a.addEventListener("click", (e)=>{
      const val = a.getAttribute("data-open");
      const [cat, idx] = val.split(":");
      if(CATALOG[cat]){
        currentCat = cat;
        currentIdx = parseInt(idx,10) || 0;
        renderTabs();
        renderCard();
      }
      // baja al catálogo
      const target = document.getElementById("catalogo");
      if(target) target.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  renderTabs();
  renderCard();
</script>
