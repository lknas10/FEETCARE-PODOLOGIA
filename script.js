const CONTACTS = {
  whatsapp: "5561998872244",
  instagram: "https://www.instagram.com/feetcare_podologia",
};

const WHATSAPP_MESSAGES = {
  availability:
    "Olá! Gostaria de consultar a disponibilidade para um atendimento.",
  "ingrown-nail":
    "Olá! Gostaria de saber mais sobre atendimento para unhas encravadas.",
  "inflamed-nail":
    "Olá! Gostaria de saber mais sobre atendimento para unhas inflamadas.",
  calluses: "Olá! Gostaria de saber mais sobre atendimento para calosidades.",
  "cracked-heels":
    "Olá! Gostaria de saber mais sobre atendimento para fissuras nos pés.",
  reflexology:
    "Olá! Gostaria de saber mais sobre atendimento para reflexologia.",
  "foot-health":
    "Olá! Gostaria de saber mais sobre cuidados gerais com a saúde dos pés.",
};

const SERVICE_DETAILS = {
  "ingrown-nail":
    "Atendimento cuidadoso para aliviar o desconforto e orientar os cuidados necessários para unhas encravadas.",
  "inflamed-nail":
    "Avaliação individual e cuidado profissional para unhas inflamadas, priorizando conforto e segurança.",
  calluses:
    "Tratamento direcionado para reduzir calosidades e proporcionar mais conforto ao caminhar no dia a dia.",
  "cracked-heels":
    "Cuidado voltado à hidratação e proteção da pele, ajudando a manter os pés mais confortáveis e saudáveis.",
  reflexology:
    "Sessão de reflexologia em um ambiente acolhedor, pensada para promover uma pausa de bem-estar na rotina.",
  "foot-health":
    "Acompanhamento preventivo e cuidados gerais para manter a saúde e o conforto dos seus pés.",
};

function createWhatsAppUrl(message) {
  const url = new URL(`https://wa.me/${CONTACTS.whatsapp}`);
  url.searchParams.set("text", message);
  return url.href;
}

function setupContactLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const { link: destination, message: messageKey } = link.dataset;

    if (destination === "whatsapp" && WHATSAPP_MESSAGES[messageKey]) {
      link.href = createWhatsAppUrl(WHATSAPP_MESSAGES[messageKey]);
      link.target = "_blank";
      link.rel = "noopener";
    } else if (destination === "instagram") {
      link.href = CONTACTS.instagram;
      link.target = "_blank";
      link.rel = "noopener";
    }
  });
}

function setupServicesModal() {
  const sourceList = document.querySelector(".service-grid");
  const heading = document.querySelector(".services__heading");

  if (!sourceList || !heading) return;

  const services = [...sourceList.children].map((item) => {
    const link = item.querySelector("a");
    const gallery = item
      .querySelector(".service-gallery__track")
      .cloneNode(true);

    return {
      title: item.querySelector("strong").textContent,
      description: item.querySelector("small").textContent,
      detail: SERVICE_DETAILS[link.dataset.message],
      cover: gallery.firstElementChild.cloneNode(true),
      gallery,
      href: link.href,
    };
  });

  const showcase = document.createElement("div");
  showcase.className = "service-showcase";
  showcase.innerHTML = services
    .map(
      (service, index) => `
        <button type="button" class="service-showcase__card" data-service-index="${index}" aria-label="Ver detalhes: ${service.title}">
          <span class="service-showcase__media">${service.cover.outerHTML}</span>
          <span class="service-showcase__overlay"></span>
          <span class="service-showcase__name">${service.title}</span>
        </button>
      `,
    )
    .join("");

  const modal = document.createElement("dialog");
  modal.className = "service-modal";
  modal.innerHTML = `
    <button class="service-modal__close" type="button" aria-label="Fechar detalhes do serviço">×</button>
    <div class="service-modal__content">
      <div class="service-modal__media"></div>
      <div class="service-modal__details">
        <p class="eyebrow service-modal__index"></p>
        <h2 class="service-modal__title"></h2>
        <p class="service-modal__description"></p>
        <a class="button service-modal__cta" target="_blank" rel="noopener">Consultar atendimento</a>
      </div>
    </div>
  `;

  function renderService(index) {
    const service = services[index];
    const gallery = service.gallery.cloneNode(true);
    const slides = [...gallery.children];
    const media = modal.querySelector(".service-modal__media");
    const title = modal.querySelector(".service-modal__title");
    const description = modal.querySelector(".service-modal__description");
    const serviceIndex = modal.querySelector(".service-modal__index");
    const cta = modal.querySelector(".service-modal__cta");

    gallery.className = "service-modal__viewport";
    gallery.setAttribute("aria-label", `Galeria: ${service.title}`);
    gallery.tabIndex = 0;
    gallery
      .querySelectorAll(".service-gallery__placeholder span")
      .forEach((label) => {
        label.textContent = "Imagem do procedimento";
      });

    const galleryFooter = document.createElement("div");
    galleryFooter.className = "service-modal__gallery-footer";
    galleryFooter.innerHTML = `
      <button class="modal-gallery-control" type="button" data-direction="previous" aria-label="Imagem anterior">←</button>
      <div class="service-modal__thumbnails"></div>
      <button class="modal-gallery-control" type="button" data-direction="next" aria-label="Próxima imagem">→</button>
    `;

    media.replaceChildren(gallery, galleryFooter);
    title.textContent = service.title;
    description.textContent = service.detail || service.description;
    serviceIndex.textContent = service.title;
    cta.href = service.href;

    const thumbnails = galleryFooter.querySelector(
      ".service-modal__thumbnails",
    );

    function selectSlide(slideIndex) {
      gallery.scrollTo({
        left: gallery.clientWidth * slideIndex,
        behavior: "smooth",
      });

      [...thumbnails.children].forEach((thumbnail, currentIndex) => {
        thumbnail.setAttribute(
          "aria-current",
          currentIndex === slideIndex ? "true" : "false",
        );
      });
    }

    slides.forEach((slide, slideIndex) => {
      const thumbnail = document.createElement("button");
      thumbnail.type = "button";
      thumbnail.className = "service-modal__thumbnail";
      thumbnail.setAttribute(
        "aria-label",
        `Visualizar imagem ${slideIndex + 1}`,
      );
      thumbnail.setAttribute(
        "aria-current",
        slideIndex === 0 ? "true" : "false",
      );
      thumbnail.append(slide.cloneNode(true));
      thumbnail.addEventListener("click", () => selectSlide(slideIndex));
      thumbnails.append(thumbnail);
    });

    galleryFooter
      .querySelector('[data-direction="previous"]')
      .addEventListener("click", () => {
        const currentSlide = Math.round(
          gallery.scrollLeft / gallery.clientWidth,
        );
        selectSlide(Math.max(0, currentSlide - 1));
      });
    galleryFooter
      .querySelector('[data-direction="next"]')
      .addEventListener("click", () => {
        const currentSlide = Math.round(
          gallery.scrollLeft / gallery.clientWidth,
        );
        selectSlide(Math.min(slides.length - 1, currentSlide + 1));
      });
  }

  showcase.querySelectorAll("[data-service-index]").forEach((card) => {
    card.addEventListener("click", () => {
      renderService(Number(card.dataset.serviceIndex));
      modal.showModal();
    });
  });

  modal.querySelector(".service-modal__close").addEventListener("click", () => {
    modal.close();
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  heading.after(showcase);
  document.body.append(modal);
  sourceList.hidden = true;
}

function setupHeroAnimation() {
  const hero = document.querySelector("#hero");
  const video = hero?.querySelector("video");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const compactLayout = window.matchMedia("(max-width: 48rem)");

  if (!hero) return;

  let frameRequested = false;

  function updateHeroProgress() {
    frameRequested = false;

    if (reduceMotion.matches || compactLayout.matches) {
      hero.style.setProperty("--progress", 0);
      return;
    }

    const { top } = hero.getBoundingClientRect();
    const scrollRange = hero.offsetHeight - window.innerHeight;
    const progress = scrollRange > 0 ? -top / scrollRange : 0;

    hero.style.setProperty("--progress", Math.min(1, Math.max(0, progress)));
  }

  function requestProgressUpdate() {
    if (!frameRequested) {
      frameRequested = true;
      window.requestAnimationFrame(updateHeroProgress);
    }
  }

  function controlVideo() {
    if (!video) return;

    if (reduceMotion.matches) {
      video.pause();
      return;
    }

    video.play().catch(() => {});
  }

  if (video && "IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controlVideo();
        else video.pause();
      },
      { threshold: 0.1 },
    ).observe(video);
  } else {
    controlVideo();
  }

  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate);
  reduceMotion.addEventListener("change", controlVideo);
  compactLayout.addEventListener("change", requestProgressUpdate);
  updateHeroProgress();
}

setupContactLinks();
setupServicesModal();
setupHeroAnimation();
