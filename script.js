// ===== IMÁGENES =====
const IMAGES = {
  brandDark: "./627602842_17844436923689078_7708979460183207095_n.jpg",
  storeAwning: "./637800200_17847439629689078_7842886487961952353_n.jpg",
  storeOutside: "./655614404_17851915215689078_1120208256158658873_n.jpg",
  pistachioLatte: "./656595514_1912655296281171_6550121062891863980_n.jpg",
  coffeeBeans: "./657319664_17852815017689078_2234817550232075518_n.jpg",
  storeIllustration: "./727799395_17866945680689078_6926977040742980940_n.jpg",
  pistachioTray: "./Captura_de_pantalla_2026-09-02_a_la_s__5.34.50_p.m..png",
  personBack: "./Captura_de_pantalla_2026-09-02_a_la_s__5.34.31_p.m..png",
  espresso: "./Captura_de_pantalla_2026-09-02_a_la_s__5.34.39_p.m..png",
  matchaCup: "./Captura_de_pantalla_2026-09-02_a_la_s__5.34.24_p.m..png",
};

// ===== DATOS =====
const PRODUCTS = [
  {
    id: 1,
    name: "Pistachio Latte",
    description: "Espresso doble, leche fría y crema de pistacho tostado.",
    price: 8,
    category: "coffee",
    image: IMAGES.pistachioLatte,
    tag: "Signature",
  },
  {
    id: 2,
    name: "Iced Latte",
    description: "Espresso sobre leche fría, suave y equilibrado.",
    price: 6,
    category: "coffee",
    image: IMAGES.espresso,
  },
  {
    id: 3,
    name: "Matcha Latte",
    description: "Matcha ceremonial, leche cremosa y un toque de vainilla.",
    price: 7,
    category: "matcha",
    image: IMAGES.matchaCup,
    tag: "Favorito",
  },
  {
    id: 4,
    name: "Pistachio Matcha",
    description: "Matcha ceremonial, avena y crema de pistacho.",
    price: 8,
    category: "matcha",
    image: IMAGES.pistachioTray,
    tag: "Nuevo",
  },
  {
    id: 5,
    name: "Crêpe Clásico",
    description: "Mantequilla, azúcar glass y un toque de limón.",
    price: 6,
    category: "crepes",
    image: IMAGES.personBack,
  },
  {
    id: 6,
    name: "Crêpe de Nutella",
    description: "Nutella, fresa fresca y crema batida artesanal.",
    price: 8,
    category: "crepes",
    image: IMAGES.storeOutside,
    tag: "Favorito",
  },
];

const CATEGORY_LABELS = {
  coffee: "Café",
  matcha: "Matcha",
  crepes: "Crepas",
};

const MILK_OPTIONS = ["Leche entera", "Leche deslactosada", "Leche vegetal"];

// ===== ESTADO DE LA APP =====
const state = {
  activeTab: "home",
  category: "coffee",
  selectedProduct: null,
  selectedMilk: "Leche entera",
  cart: [],
  deliveryMode: "pickup",
  paid: false,
};

// ===== ÍCONOS SVG =====
function renderIcon(name, className = "size-5") {
  const paths = {
    home: `<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />`,
    menu: `<path d="M5 6h14M5 12h14M5 18h9" /><path d="M18 17v4M16 19h4" />`,
    bag: `<path d="M5 8h14l1 13H4z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" />`,
    gift: `<path d="M4 10h16v11H4zM3 6h18v4H3zM12 6v15" /><path d="M12 6H8.5A2.5 2.5 0 1 1 11 3.5zM12 6h3.5A2.5 2.5 0 1 0 13 3.5z" />`,
    user: `<circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />`,
    arrow: `<path d="m9 18 6-6-6-6" />`,
    close: `<path d="M6 6l12 12M18 6 6 18" />`,
    plus: `<path d="M12 5v14M5 12h14" />`,
    minus: `<path d="M5 12h14" />`,
    pin: `<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" />`,
    clock: `<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,
    check: `<path d="m5 12 4 4L19 6" />`,
  };

  return `
    <svg aria-hidden="true" class="${className}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      ${paths[name] || ""}
    </svg>
  `;
}

// ===== COMPONENTES =====
function renderWordmark(compact = false) {
  return `
    <div class="leading-none">
      <p class="${compact ? "text-xl" : "text-3xl"} font-brand font-black tracking-[0.22em] text-cream">
        OMAKA
      </p>
      ${
        !compact
          ? `<p class="mt-1.5 text-[0.5rem] uppercase tracking-[0.28em] text-latte">
              Coffee Bar · Matcha · Crêpes
            </p>`
          : ""
      }
    </div>
  `;
}

function renderHeader() {
  const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  return `
    <header class="sticky top-0 z-30 border-b border-bark/80 bg-espresso/90 px-5 py-4 backdrop-blur-xl md:px-10">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        ${renderWordmark(true)}
        <div class="flex items-center gap-3">
          <div class="hidden items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-sand/60 sm:flex">
            <span class="size-1.5 rounded-full bg-matcha"></span>
            Town Square · Abierto
          </div>
          <button
            aria-label="Ver pedido"
            data-action="change-tab"
            data-tab="orders"
            class="relative grid size-11 place-items-center rounded-full border border-bark bg-roast text-cream transition hover:border-bark-mid"
          >
            ${renderIcon("bag")}
            ${
              cartCount > 0
                ? `<span class="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-matcha text-[0.62rem] font-bold text-foam">
                    ${cartCount}
                  </span>`
                : ""
            }
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderBottomNav() {
  const items = [
    { id: "home", label: "Inicio", icon: "home" },
    { id: "menu", label: "Menú", icon: "menu" },
    { id: "orders", label: "Pedidos", icon: "bag" },
    { id: "rewards", label: "Beneficios", icon: "gift" },
    { id: "profile", label: "Perfil", icon: "user" },
  ];

  return `
    <nav class="fixed inset-x-0 bottom-0 z-40 border-t border-bark bg-espresso/95 px-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div class="mx-auto grid max-w-xl grid-cols-5">
        ${items
          .map(
            (item) => `
          <button
            data-action="change-tab"
            data-tab="${item.id}"
            class="relative flex flex-col items-center gap-1 rounded-xl py-1.5 text-[0.58rem] transition ${
              state.activeTab === item.id ? "text-cream" : "text-sand/45 hover:text-sand"
            }"
          >
            ${
              state.activeTab === item.id
                ? `<span class="absolute -top-2 h-0.5 w-7 rounded-full bg-latte"></span>`
                : ""
            }
            ${renderIcon(item.icon, "size-5")}
            <span>${item.label}</span>
          </button>
        `
          )
          .join("")}
      </div>
    </nav>
  `;
}

function renderRewardProgress(compact = false) {
  return `
    <div class="${compact ? "" : "mx-auto max-w-lg"}">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.22em] text-latte">Tu progreso</p>
          <p class="mt-1 font-brand text-xl text-cream">4 de 5 visitas</p>
        </div>
        <div class="grid size-12 place-items-center rounded-full border border-matcha/40 bg-matcha/15 font-brand text-lg text-pistachio">
          4/5
        </div>
      </div>
      <div class="grid grid-cols-5 gap-2">
        ${[1, 2, 3, 4, 5]
          .map(
            (visit) => `
          <div class="grid aspect-square place-items-center rounded-full border ${
            visit < 5
              ? "border-matcha bg-matcha text-foam"
              : "border-dashed border-bark-mid bg-espresso text-bark-mid"
          }">
            ${visit < 5 ? renderIcon("check", "size-4") : `<span class="text-sm">5</span>`}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

// ===== PANTALLAS =====
function renderHomeScreen() {
  return `
    <main class="pb-28">
      <section class="px-5 pb-6 pt-8 md:px-10 md:pt-12">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div class="order-2 lg:order-1">
            <p class="mb-3 text-xs uppercase tracking-[0.24em] text-latte">Buenos días</p>
            <h1 class="font-brand text-4xl leading-tight text-cream sm:text-5xl">
              Hola, Valeria <span class="inline-block origin-bottom-right animate-wave">👋</span>
            </h1>
            <p class="mt-4 max-w-md font-display text-xl italic leading-relaxed text-sand/75">
              Tu próximo momento favorito está a un sorbo de distancia.
            </p>
            <button
              data-action="change-tab"
              data-tab="menu"
              class="mt-7 inline-flex items-center gap-3 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-espresso transition hover:bg-parchment active:scale-[0.98]"
            >
              Ordenar ahora
              ${renderIcon("arrow", "size-4")}
            </button>
          </div>

          <div class="order-1 relative min-h-96 overflow-hidden rounded-[2rem] border border-bark bg-roast lg:order-2 lg:min-h-[32rem]">
            <img class="absolute inset-0 size-full object-cover" src="${IMAGES.pistachioLatte}" alt="Pistachio Latte de Omaka" />
            <div class="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/5 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 sm:p-8">
              <span class="rounded-full border border-cream/25 bg-espresso/50 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-cream backdrop-blur">
                El favorito de Valeria
              </span>
              <p class="mt-4 font-script text-3xl text-cream">Every cup tells a story.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="px-5 py-6 md:px-10">
        <div class="mx-auto max-w-7xl">
          <div class="mb-4 flex items-end justify-between">
            <div>
              <p class="text-[0.62rem] uppercase tracking-[0.25em] text-latte">Solo por hoy</p>
              <h2 class="mt-1 font-brand text-2xl text-cream">Promoción del día</h2>
            </div>
            <p class="text-xs text-sand/50">Hasta las 9PM</p>
          </div>
          <button
            data-action="change-tab"
            data-tab="menu"
            class="group grid w-full overflow-hidden rounded-3xl border border-bark bg-roast text-left md:grid-cols-[0.85fr_1.15fr]"
          >
            <div class="relative min-h-64 overflow-hidden">
              <img
                class="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                src="${IMAGES.matchaCup}"
                alt="Matcha Latte"
              />
              <span class="absolute left-4 top-4 rounded-full bg-cream px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-espresso">
                2 × 1
              </span>
            </div>
            <div class="flex flex-col justify-center p-7 md:p-10">
              <p class="text-[0.62rem] uppercase tracking-[0.22em] text-pistachio">Matcha Mondays</p>
              <h3 class="mt-2 font-brand text-3xl text-cream">Comparte un Matcha Latte</h3>
              <p class="mt-3 max-w-lg text-sm leading-relaxed text-sand/65">
                Pide dos Matcha Lattes y paga solo uno. Porque las mejores historias se cuentan en compañía.
              </p>
              <span class="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-cream">
                Ver promoción ${renderIcon("arrow", "size-4 transition group-hover:translate-x-1")}
              </span>
            </div>
          </button>
        </div>
      </section>

      <section class="px-5 py-8 md:px-10">
        <div class="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div class="rounded-3xl border border-bark bg-roast p-6 md:p-8">
            <div class="mb-7 flex items-start justify-between">
              <div>
                <p class="text-[0.62rem] uppercase tracking-[0.24em] text-latte">Beneficios disponibles</p>
                <h2 class="mt-2 font-brand text-2xl text-cream">Tu próxima bebida está cerca</h2>
              </div>
              ${renderIcon("gift", "size-6 text-pistachio")}
            </div>
            ${renderRewardProgress(true)}
            <button
              data-action="change-tab"
              data-tab="rewards"
              class="mt-7 flex w-full items-center justify-between border-t border-bark pt-5 text-sm text-cream"
            >
              Ver mis beneficios ${renderIcon("arrow", "size-4")}
            </button>
          </div>
          <div class="relative min-h-72 overflow-hidden rounded-3xl border border-bark">
            <img class="absolute inset-0 size-full object-cover" src="${IMAGES.storeAwning}" alt="Tienda Omaka" />
            <div class="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/25 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 p-6">
              <div class="flex items-center gap-2 text-xs text-cream">${renderIcon("pin", "size-4 text-latte")} Town Square, Mercado Norte</div>
              <div class="mt-2 flex items-center gap-2 text-xs text-sand/65">${renderIcon("clock", "size-4")} Todos los días · 9AM–9PM</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderMenuScreen() {
  const filteredProducts = PRODUCTS.filter((p) => p.category === state.category);

  return `
    <main class="mx-auto max-w-7xl px-5 pb-28 pt-10 md:px-10 md:pt-14">
      <p class="text-[0.62rem] uppercase tracking-[0.25em] text-latte">Menú Omaka</p>
      <h1 class="mt-2 max-w-2xl font-brand text-4xl leading-tight text-cream sm:text-5xl">¿Qué se te antoja hoy? ☕</h1>
      <p class="mt-3 text-sm text-sand/55">Preparado al momento, exactamente como te gusta.</p>

      <div class="mt-8 flex gap-2 overflow-x-auto pb-2">
        ${Object.keys(CATEGORY_LABELS)
          .map(
            (key) => `
          <button
            data-action="set-category"
            data-category="${key}"
            class="min-w-28 rounded-full border px-5 py-3 text-sm transition ${
              state.category === key
                ? "border-cream bg-cream text-espresso"
                : "border-bark bg-roast text-sand hover:border-bark-mid"
            }"
          >
            ${CATEGORY_LABELS[key]}
          </button>
        `
          )
          .join("")}
      </div>

      <div class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${filteredProducts
          .map(
            (product) => `
          <button
            data-action="select-product"
            data-id="${product.id}"
            class="group overflow-hidden rounded-3xl border border-bark bg-roast text-left transition hover:-translate-y-1 hover:border-bark-mid"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                class="size-full object-cover transition duration-700 group-hover:scale-105"
                src="${product.image}"
                alt="${product.name}"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-roast/80 to-transparent"></div>
              ${
                product.tag
                  ? `<span class="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-espresso">
                      ${product.tag}
                    </span>`
                  : ""
              }
            </div>
            <div class="p-5">
              <div class="flex items-start justify-between gap-4">
                <h2 class="font-brand text-xl text-cream">${product.name}</h2>
                <span class="font-display text-xl text-latte">$${product.price}</span>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-sand/55">${product.description}</p>
              <span class="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-cream">
                Personalizar ${renderIcon("plus", "size-4")}
              </span>
            </div>
          </button>
        `
          )
          .join("")}
      </div>
    </main>
  `;
}

function renderProductModal() {
  const product = state.selectedProduct;
  if (!product) return "";

  return `
    <div
      data-action="close-modal-backdrop"
      class="fixed inset-0 z-50 flex items-end justify-center bg-espresso/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
    >
      <div class="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-bark bg-roast sm:rounded-[2rem]">
        <div class="grid md:grid-cols-[0.9fr_1.1fr]">
          <div class="relative min-h-64 overflow-hidden md:min-h-[32rem]">
            <img class="absolute inset-0 size-full object-cover" src="${product.image}" alt="${product.name}" />
            <div class="absolute inset-0 bg-gradient-to-t from-roast via-transparent to-transparent md:bg-gradient-to-r"></div>
          </div>
          <div class="relative p-6 sm:p-8">
            <button
              aria-label="Cerrar"
              data-action="close-modal"
              class="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-bark bg-espresso/60 text-sand transition hover:text-cream"
            >
              ${renderIcon("close")}
            </button>
            <p class="text-[0.62rem] uppercase tracking-[0.22em] text-latte">${CATEGORY_LABELS[product.category]}</p>
            <h2 class="mt-2 pr-12 font-brand text-3xl text-cream">${product.name}</h2>
            <p class="mt-3 text-sm leading-relaxed text-sand/55">${product.description}</p>

            <div class="mt-8 border-t border-bark pt-7">
              <p class="font-brand text-xl text-cream">Personaliza tu bebida</p>
              <p class="mt-1 text-xs text-sand/45">Selecciona una opción de leche</p>
              <div class="mt-4 space-y-2">
                ${MILK_OPTIONS.map(
                  (option) => `
                  <button
                    data-action="select-milk"
                    data-milk="${option}"
                    class="flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm transition ${
                      state.selectedMilk === option
                        ? "border-matcha bg-matcha/10 text-cream"
                        : "border-bark text-sand/65 hover:border-bark-mid"
                    }"
                  >
                    <span class="grid size-5 place-items-center rounded-full border ${
                      state.selectedMilk === option ? "border-pistachio" : "border-bark-mid"
                    }">
                      ${state.selectedMilk === option ? `<span class="size-2.5 rounded-full bg-pistachio"></span>` : ""}
                    </span>
                    ${option}
                  </button>
                `
                ).join("")}
              </div>
            </div>

            <button
              data-action="add-to-cart"
              class="mt-7 flex w-full items-center justify-between rounded-2xl bg-cream px-5 py-4 text-sm font-semibold text-espresso transition hover:bg-parchment active:scale-[0.99]"
            >
              Agregar al carrito
              <span>$${product.price}.00</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderOrdersScreen() {
  const subtotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = state.deliveryMode === "delivery" && state.cart.length ? 2 : 0;

  if (state.paid) {
    return `
      <main class="grid min-h-[calc(100vh-9rem)] place-items-center px-5 pb-28 text-center">
        <div class="max-w-md">
          <div class="mx-auto grid size-20 place-items-center rounded-full border border-matcha/40 bg-matcha/15 text-pistachio">
            ${renderIcon("check", "size-9")}
          </div>
          <p class="mt-7 text-[0.62rem] uppercase tracking-[0.24em] text-pistachio">Pedido confirmado</p>
          <h1 class="mt-2 font-brand text-4xl text-cream">¡Gracias, Valeria!</h1>
          <p class="mt-4 text-sm leading-relaxed text-sand/60">
            ${
              state.deliveryMode === "pickup"
                ? "Tu pedido estará listo para recoger en aproximadamente 15 minutos."
                : "Tu pedido va en camino. Llegará en aproximadamente 30–40 minutos."
            }
          </p>
          <div class="mx-auto mt-7 size-28 overflow-hidden rounded-2xl border border-bark">
            <img class="size-full object-cover" src="${IMAGES.storeIllustration}" alt="Ilustración de la tienda Omaka" />
          </div>
          <button
            data-action="reset-paid"
            class="mt-8 rounded-full border border-bark px-6 py-3 text-sm text-cream hover:border-bark-mid"
          >
            Ver detalles del pedido
          </button>
        </div>
      </main>
    `;
  }

  return `
    <main class="mx-auto max-w-5xl px-5 pb-28 pt-10 md:px-10 md:pt-14">
      <p class="text-[0.62rem] uppercase tracking-[0.25em] text-latte">Tu carrito</p>
      <h1 class="mt-2 font-brand text-4xl text-cream">Tu pedido</h1>

      ${
        state.cart.length === 0
          ? `
        <div class="mt-12 rounded-3xl border border-dashed border-bark p-10 text-center">
          <div class="mx-auto grid size-16 place-items-center rounded-full bg-roast text-bark-mid">
            ${renderIcon("bag", "size-7")}
          </div>
          <h2 class="mt-5 font-brand text-2xl text-cream">Tu carrito espera una historia</h2>
          <p class="mt-2 text-sm text-sand/50">Elige tu bebida o crêpe favorito para comenzar.</p>
          <button
            data-action="change-tab"
            data-tab="menu"
            class="mt-6 rounded-full bg-cream px-6 py-3 text-sm font-medium text-espresso"
          >
            Explorar el menú
          </button>
        </div>
      `
          : `
        <div class="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="space-y-3">
            ${state.cart
              .map(
                (item, index) => `
              <article class="flex gap-4 rounded-2xl border border-bark bg-roast p-3 sm:p-4">
                <img class="size-24 rounded-xl object-cover sm:size-28" src="${item.image}" alt="${item.name}" />
                <div class="flex min-w-0 flex-1 flex-col justify-between py-1">
                  <div>
                    <div class="flex items-start justify-between gap-3">
                      <h2 class="font-brand text-lg text-cream">${item.name}</h2>
                      <span class="font-display text-lg text-latte">$${item.price * item.quantity}</span>
                    </div>
                    ${item.milk ? `<p class="mt-1 text-xs text-sand/45">${item.milk}</p>` : ""}
                  </div>
                  <div class="flex items-center gap-3">
                    <button
                      aria-label="Quitar un ${item.name}"
                      data-action="update-qty"
                      data-index="${index}"
                      data-delta="-1"
                      class="grid size-8 place-items-center rounded-full border border-bark text-sand hover:text-cream"
                    >
                      ${renderIcon("minus", "size-4")}
                    </button>
                    <span class="w-4 text-center text-sm text-cream">${item.quantity}</span>
                    <button
                      aria-label="Agregar un ${item.name}"
                      data-action="update-qty"
                      data-index="${index}"
                      data-delta="1"
                      class="grid size-8 place-items-center rounded-full border border-bark text-sand hover:text-cream"
                    >
                      ${renderIcon("plus", "size-4")}
                    </button>
                  </div>
                </div>
              </article>
            `
              )
              .join("")}
            <button
              data-action="change-tab"
              data-tab="menu"
              class="inline-flex items-center gap-2 py-3 text-xs uppercase tracking-[0.14em] text-sand/60 hover:text-cream"
            >
              ${renderIcon("plus", "size-4")} Agregar algo más
            </button>
          </div>

          <aside class="h-fit rounded-3xl border border-bark bg-roast p-5 sm:p-6">
            <p class="font-brand text-xl text-cream">¿Cómo lo recibes?</p>
            <div class="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-espresso p-1.5">
              ${["pickup", "delivery"]
                .map(
                  (option) => `
                <button
                  data-action="set-delivery-mode"
                  data-mode="${option}"
                  class="rounded-xl px-3 py-3 text-xs transition ${
                    state.deliveryMode === option ? "bg-cream font-medium text-espresso" : "text-sand/55"
                  }"
                >
                  ${option === "pickup" ? "Recoger" : "Delivery"}
                </button>
              `
                )
                .join("")}
            </div>
            <div class="mt-5 space-y-3 border-y border-bark py-5 text-sm">
              <div class="flex justify-between text-sand/55"><span>Subtotal</span><span>$${subtotal}.00</span></div>
              <div class="flex justify-between text-sand/55"><span>Delivery</span><span>${deliveryFee ? `$${deliveryFee}.00` : "Gratis"}</span></div>
              <div class="flex justify-between font-medium text-cream"><span>Total</span><span class="font-display text-xl text-latte">$${subtotal + deliveryFee}.00</span></div>
            </div>
            <p class="mt-5 text-center font-brand text-xl text-cream">Tu pedido está listo para confirmar.</p>
            <button
              data-action="pay-now"
              class="mt-5 w-full rounded-2xl bg-cream px-5 py-4 text-sm font-semibold text-espresso transition hover:bg-parchment active:scale-[0.99]"
            >
              Pagar ahora
            </button>
            <p class="mt-3 text-center text-[0.6rem] uppercase tracking-[0.14em] text-sand/35">Pago seguro · Apple Pay · Tarjeta</p>
          </aside>
        </div>
      `
      }
    </main>
  `;
}

function renderRewardsScreen() {
  return `
    <main class="pb-28">
      <section class="relative overflow-hidden border-b border-bark px-5 py-14 text-center md:px-10 md:py-20">
        <img class="absolute inset-0 size-full object-cover opacity-20" src="${IMAGES.coffeeBeans}" alt="" />
        <div class="absolute inset-0 bg-gradient-to-b from-espresso/60 to-espresso"></div>
        <div class="relative mx-auto max-w-2xl">
          <div class="mx-auto grid size-16 place-items-center rounded-full border border-latte/30 bg-latte/10 text-latte">
            ${renderIcon("gift", "size-7")}
          </div>
          <p class="mt-6 text-[0.62rem] uppercase tracking-[0.25em] text-latte">Omaka Club</p>
          <h1 class="mt-3 font-brand text-4xl leading-tight text-cream sm:text-5xl">¡Ya casi tienes tu recompensa! 🎉</h1>
          <p class="mt-4 font-display text-xl italic text-sand/65">Cada visita merece algo especial.</p>
        </div>
      </section>

      <section class="px-5 py-10 md:px-10">
        <div class="mx-auto max-w-xl rounded-[2rem] border border-bark bg-roast p-6 sm:p-8">
          ${renderRewardProgress(false)}
          <div class="mt-8 rounded-2xl border border-latte/20 bg-latte/5 p-5 text-center">
            <p class="text-xs uppercase tracking-[0.18em] text-latte">Te falta 1 visita para desbloquear</p>
            <p class="mt-3 font-brand text-2xl text-cream">✨ Una bebida gratis</p>
            <p class="mt-2 text-xs leading-relaxed text-sand/50">Elige cualquier bebida clásica del menú. Nosotros invitamos.</p>
          </div>
          <button
            data-action="change-tab"
            data-tab="menu"
            class="mt-6 w-full rounded-2xl bg-cream px-5 py-4 text-sm font-semibold text-espresso hover:bg-parchment"
          >
            Ver mis beneficios
          </button>
        </div>

        <div class="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3">
          <div class="rounded-2xl border border-bark bg-roast p-5">
            <p class="font-brand text-2xl text-latte">2×</p>
            <p class="mt-1 text-xs text-sand/55">Puntos en Matcha los lunes</p>
          </div>
          <div class="rounded-2xl border border-bark bg-roast p-5">
            <p class="font-brand text-2xl text-latte">10%</p>
            <p class="mt-1 text-xs text-sand/55">En tu mes de cumpleaños</p>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderProfileScreen() {
  const options = ["Mis datos", "Métodos de pago", "Direcciones guardadas", "Preferencias y ayuda"];

  return `
    <main class="mx-auto max-w-3xl px-5 pb-28 pt-10 md:px-10 md:pt-14">
      <p class="text-[0.62rem] uppercase tracking-[0.25em] text-latte">Mi cuenta</p>
      <h1 class="mt-2 font-brand text-4xl text-cream">Perfil</h1>
      <div class="mt-8 rounded-3xl border border-bark bg-roast p-6">
        <div class="flex items-center gap-4">
          <div class="grid size-16 place-items-center rounded-full bg-matcha font-brand text-xl text-foam">VR</div>
          <div>
            <h2 class="font-brand text-2xl text-cream">Valeria Rodríguez</h2>
            <p class="mt-1 text-xs text-sand/50">Miembro Omaka Club · Desde 2026</p>
          </div>
        </div>
        <div class="mt-7 divide-y divide-bark border-y border-bark">
          ${options
            .map(
              (item) => `
            <button class="flex w-full items-center justify-between py-4 text-sm text-sand/70 hover:text-cream">
              ${item}${renderIcon("arrow", "size-4")}
            </button>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="mt-5 overflow-hidden rounded-3xl border border-bark">
        <img class="h-48 w-full object-cover" src="${IMAGES.brandDark}" alt="Identidad visual de Omaka" />
      </div>
    </main>
  `;
}

// ===== RENDER PRINCIPAL =====
function renderApp() {
  const root = document.getElementById("root");
  let screenHtml = "";

  if (state.activeTab === "home") screenHtml = renderHomeScreen();
  else if (state.activeTab === "menu") screenHtml = renderMenuScreen();
  else if (state.activeTab === "orders") screenHtml = renderOrdersScreen();
  else if (state.activeTab === "rewards") screenHtml = renderRewardsScreen();
  else if (state.activeTab === "profile") screenHtml = renderProfileScreen();

  root.innerHTML = `
    <div class="min-h-full bg-espresso font-body text-cream">
      ${renderHeader()}
      ${screenHtml}
      ${renderBottomNav()}
      ${renderProductModal()}
    </div>
  `;
}

// ===== MANEJO DE EVENTOS =====
document.getElementById("root").addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "change-tab") {
    state.activeTab = target.dataset.tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderApp();
  } else if (action === "set-category") {
    state.category = target.dataset.category;
    renderApp();
  } else if (action === "select-product") {
    const id = Number(target.dataset.id);
    state.selectedProduct = PRODUCTS.find((p) => p.id === id) || null;
    state.selectedMilk = "Leche entera";
    renderApp();
  } else if (action === "close-modal") {
    state.selectedProduct = null;
    renderApp();
  } else if (action === "close-modal-backdrop" && event.target === target) {
    state.selectedProduct = null;
    renderApp();
  } else if (action === "select-milk") {
    state.selectedMilk = target.dataset.milk;
    renderApp();
  } else if (action === "add-to-cart" && state.selectedProduct) {
    const existing = state.cart.find(
      (item) => item.id === state.selectedProduct.id && item.milk === state.selectedMilk
    );
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        ...state.selectedProduct,
        milk: state.selectedMilk,
        quantity: 1,
      });
    }
    state.selectedProduct = null;
    state.paid = false;
    state.activeTab = "orders";
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderApp();
  } else if (action === "update-qty") {
    const index = Number(target.dataset.index);
    const delta = Number(target.dataset.delta);
    const item = state.cart[index];
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart.splice(index, 1);
    }
    renderApp();
  } else if (action === "set-delivery-mode") {
    state.deliveryMode = target.dataset.mode;
    renderApp();
  } else if (action === "pay-now") {
    state.paid = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderApp();
  } else if (action === "reset-paid") {
    state.paid = false;
    renderApp();
  }
});

// Cerrar modal con tecla Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.selectedProduct) {
    state.selectedProduct = null;
    renderApp();
  }
});

// Inicializar
renderApp();
