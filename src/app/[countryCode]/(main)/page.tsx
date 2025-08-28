// import { Metadata } from "next"
//
// import FeaturedProducts from "@modules/home/components/featured-products"
// import Hero from "@modules/home/components/hero"
// import { listCollections } from "@lib/data/collections"
// import { getRegion } from "@lib/data/regions"
//
// export const metadata: Metadata = {
//   title: "Medusa Next.js Starter Template",
//   description:
//     "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
// }
//
// export default async function Home(props: {
//   params: Promise<{ countryCode: string }>
// }) {
//   const params = await props.params
//
//   const { countryCode } = params
//
//   const region = await getRegion(countryCode)
//
//   const { collections } = await listCollections({
//     fields: "id, handle, title",
//   })
//
//   if (!collections || !region) {
//     return null
//   }
//
//   return (
//     <>
//       <Hero />
//       <div className="py-12">
//         <ul className="flex flex-col gap-x-6">
//           <FeaturedProducts collections={collections} region={region} />
//         </ul>
//       </div>
//     </>
//   )
// }

// src/pages/Home.jsx (или src/App.jsx)
import React from "react"

const products = [
  {
    id: 1,
    name: "Бак с барабаном и шкивом стиральной машины Indesit Ariston 5-6кг 40л 109633 зам. (C00263866-на 46л, 263866-на 46л НЕ поставляется), 293409, C00293409, 044671, 101310129, 24385600500, 488000109633",
    price: "9 800 ₽",
    img: "https://zipinsk.ru/pictures/product/middle/25676_middle.jpg",
    tag: "Премиум",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: "Шланг пылесоса Electrolux зам. 2198088102, 2193705015, 2191383062, 2191383013, 2192112015, 2192238018, 2193704018, 2193687049, 2193704034, 140039004712, 1099153015, 2192097018, UNI805475-805475, UNI804144-804144 2198088144",
    price: "2 400 ₽",
    img: "https://zipinsk.ru/pictures/product/small/15221_small.jpg",
    tag: "Хит",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 3,
    name: "Разбрызгиватель (импеллер) посудомойки Zanussi нижний DSA001ZN зам. 1526523004, 1526523103, 1526523202, 1526523400",
    price: "2 300 ₽",
    img: "https://zipinsk.ru/pictures/product/small/26256_small.jpg",
    tag: "Скидка",
    rating: 4.4,
    inStock: true,
  },
]

function IconSearch() {
  return (
    <svg
      className="w-5 h-5 text-dh-dark/70"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <Categories />
            <Benefits />
          </aside>

          <section className="lg:col-span-9">
            <section className="flex items-center justify-between mb-6">
              <h2 className="h-font text-3xl font-bold">Популярные товары</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск по артикулу или названию"
                    className="pl-10 pr-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-dh-yellow-600 w-80"
                  />
                  <span className="absolute left-3 top-3">
                    <IconSearch />
                  </span>
                </div>
                <button className="px-4 py-2 rounded-lg bg-dh-red text-white font-semibold shadow-sm hover:bg-red-600 transition">
                  Смотреть всё
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-white/60 via-dh-yellow to-white/80 shadow-dh-lg flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h3 className="h-font text-2xl font-semibold">
                  Профессиональный подбор запчастей
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  Экспертная поддержка и оригинальные комплектующие с гарантией.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-4">
                <button className="px-5 py-3 rounded-lg bg-dh-red text-white font-medium hover:bg-red-600 transition shadow">
                  Связаться с экспертами
                </button>
                <button className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800">
                  Каталог запчастей
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-14 mb-20">
          <Testimonials />
        </section>
      </main>
    </div>
  )
}

/* Hero */
function Hero() {
  return (
    <section className="mt-10 rounded-2xl overflow-hidden bg-gradient-to-r from-dh-yellow to-white shadow-dh-lg p-8">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2">
          <h1 className="h-font text-4xl sm:text-5xl font-bold leading-tight">
            Doctor House — запчасти, которые продлевают жизнь технике
          </h1>
          <p className="mt-4 text-gray-700 max-w-xl">
            Оригинальные и совместимые детали для бытовой техники. Быстрая
            доставка, гарантия и профессиональная поддержка при подборе.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded-lg bg-dh-red text-white font-semibold shadow hover:bg-red-600 transition"
            >
              Купить сейчас
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-lg bg-white border border-gray-200"
            >
              Подбор по модели
            </a>
          </div>

          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center">
                🚚
              </div>
              <div>
                <div className="text-sm font-semibold">Доставка 24-48ч</div>
                <div className="text-xs text-gray-500">по Омску и области</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center">
                🔧
              </div>
              <div>
                <div className="text-sm font-semibold">Подбор запчастей</div>
                <div className="text-xs text-gray-500">по фото или модели</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <img
              src="https://images.unsplash.com/photo-1644079446600-219068676743?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Запчасти"
              className="rounded-xl shadow-dh-lg"
            />
            <div className="absolute -bottom-4 left-4 bg-white rounded-xl p-4 shadow flex items-center gap-4 border border-gray-100">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthfvnext.bing.com%2Fth%2Fid%2FOIP._oEZHcfZnGq9CIS007oiVAHaHa%3Fcb%3Dthfvnext%26pid%3DApi&f=1&ipt=70c0f525d0948fa54f520fe9d9d5f9c0c042b2d89e11dd566753fa09cda6938e"
                alt="Мастер"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-semibold">
                  Онлайн‑консультация мастера
                </div>
                <div className="text-xs text-gray-500">
                  живой подбор и советы
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Categories */
function Categories() {
  const cats = [
    { id: 1, title: "Стиральные машины", icon: "🧺" },
    { id: 2, title: "Холодильники", icon: "❄️" },
    { id: 3, title: "Посудомойки", icon: "🍽️" },
    { id: 4, title: "Плиты и духовки", icon: "🔥" },
  ]

  return (
    <div className="bg-white/60 p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-3">Категории</h3>
      <ul className="grid grid-cols-1 gap-2">
        {cats.map((c) => (
          <li
            key={c.id}
            className="flex items-center gap-[6px] p-1 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="w-8 h-8 min-w-8 rounded-md bg-dh-yellow-600 flex items-center justify-center text-white text-lg">
              {c.icon}
            </div>
            <span className="text-sm font-medium">{c.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Benefits / Why choose us */
function Benefits() {
  const items = [
    {
      id: 1,
      title: "Гарантия качества",
      desc: "Оригинальные и проверенные аналоги",
    },
    {
      id: 2,
      title: "Поддержка экспертов",
      desc: "Помогаем подобрать запчасть по фото",
    },
    {
      id: 3,
      title: "Удобная доставка",
      desc: "Доставка в день заказа по региону",
    },
  ]

  return (
    <div className="mt-5 bg-white/60 p-4 rounded-xl shadow-sm border border-gray-100">
      <h4 className="text-md font-semibold mb-3">Почему мы</h4>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-lg bg-dh-red text-white flex items-center justify-center shadow">
              {it.id}
            </div>
            <div>
              <div className="text-sm font-medium">{it.title}</div>
              <div className="text-xs text-gray-500">{it.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ProductCard */
function ProductCard({ product }: { product: any }) {
  return (
    <article className="bg-white rounded-2xl p-4 shadow-dh-soft border border-gray-100 flex flex-col">
      <div className="relative">
        <a href="/product">
          <img
            src={product.img}
            alt={product.name}
            className="h-44 w-full object-cover rounded-xl"
          />
        </a>
        <span className="absolute top-3 left-3 bg-white/90 text-xs px-2 py-1 rounded-full font-medium">
          {product.tag}
        </span>
      </div>

      <div className="mt-4 flex-1">
        <a href="/product">
          <h4 className="text-sm font-semibold">{product.name}</h4>
        </a>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold">{product.price}</div>
          <div className="text-xs text-gray-500">{product.rating} ⭐</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 justify-between">
        <button className="flex-1 px-4 py-2 rounded-lg bg-dh-red text-white font-medium hover:bg-red-600 transition">
          В корзину
        </button>
        <button className="px-3 py-2 rounded-lg border border-gray-200 bg-white">
          Подробнее
        </button>
      </div>
    </article>
  )
}

/* Testimonials */
function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Иван П.",
      text: "Быстро подобрали нужную деталь по фото, отправили на следующий день. Качество отличное.",
    },
    {
      id: 2,
      name: "Мария С.",
      text: "Покупала ТЭН для посудомойки — пришёл оригинал, работает идеально.",
    },
  ]

  return (
    <div className="bg-white/60 p-6 rounded-2xl shadow-dh-lg border border-gray-100">
      <h3 className="h-font text-2xl font-semibold mb-4">
        Что говорят покупатели
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <div key={r.id} className="p-4 rounded-lg bg-white shadow-sm">
            <p className="text-gray-800">{r.text}</p>
            <div className="mt-3 text-sm font-medium text-gray-600">
              — {r.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
