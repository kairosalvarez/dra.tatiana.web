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
        { name: "Endolifting (Abdominal)", desc: "Tensado y mejora del contorno abdominal con enfoque médico.", img: "assets/Portada/endolifting.png" }, // PDF: Endolifting:contentReference[oaicite:5]{index=5}
        { name: "Lipopapada", desc: "Perfilado y armonización del contorno submentoniano (según valoración).", img: "assets/Portada/facial.png" }, // PDF: Lipopapada:contentReference[oaicite:6]{index=6}
        { name: "Adiposidad localizada y celulitis", desc: "Protocolos orientados a reducción localizada y mejoría de textura (según valoración).", img: "assets/Portada/piel.png" } // PDF: Adiposidad localizada y celulitis:contentReference[oaicite:7]{index=7}
      ]
    },
    sueroterapia: {
      label: "Sueroterapia",
      items: [
        { name: "Suero reparador", desc: "Apoyo revitalizante (según necesidad clínica).", img: "assets/Portada/piel.png" }, // PDF:contentReference[oaicite:8]{index=8}
        { name: "Suero energizante", desc: "Apoyo para vitalidad y bienestar (según valoración).", img: "assets/Portada/endolifting.png" }, // PDF:contentReference[oaicite:9]{index=9}
        { name: "Suero desintoxicante", desc: "Acompañamiento detox con enfoque médico (según valoración).", img: "assets/Portada/facial.png" } // PDF:contentReference[oaicite:10]{index=10}
      ]
    },
    rejuvenecimiento: {
      label: "Rejuvenecimiento & Botox",
      items: [
        { name: "Rejuvenecimiento facial no quirúrgico", desc: "Opciones para refrescar el rostro sin cirugía (según valoración).", img: "assets/Portada/facial.png" }, // PDF:contentReference[oaicite:11]{index=11}
        { name: "Botox: tercio superior", desc: "Tratamiento de tercio superior (según valoración).", img: "assets/Portada/piel.png" }, // PDF:contentReference[oaicite:12]{index=12}
        { name: "Botox: tercio inferior", desc: "Tratamiento de tercio inferior (según valoración).", img: "assets/Portada/endolifting.png" } // PDF:contentReference[oaicite:13]{index=13}
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
