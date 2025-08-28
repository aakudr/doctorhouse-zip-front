"use client"

// src/pages/Product.jsx
import React, { useState } from "react"

/*
  Компонент страницы товара.
  Предполагается, что global styles (index.css с Tailwind, шрифты, цвета) подключены.
  Если используешь Next.js, замени <img> на next/image и настрой domains в next.config.js.
*/

const sampleProduct = {
  id: "BH-2345",
  name: "Мотор (электродвигатель) для стиральной машины BOSCH WGA1234",
  price: 7490,
  oldPrice: 8990,
  currency: "₽",
  sku: "BOS-MTR-2345",
  stock: 12,
  rating: 4.8,
  sold: 340,
  tag: "Оригинал",
  images: [
    "https://zipinsk.ru/pictures/product/big/25676_big.jpg",
    "https://zipinsk.ru/pictures/product/big/25674_big.jpg",
    "https://zipinsk.ru/pictures/product/big/25675_big.jpg",
  ],
  shortDesc:
    "Надёжный электродвигатель BOSCH. Совместим с моделями BWF, WAE, MAX. Гарантия 12 месяцев.",
  specs: [
    { k: "Мощность", v: "250 W" },
    { k: "Напряжение", v: "220-240 V" },
    { k: "Тип", v: "Коллекторный двигатель" },
    { k: "Производитель", v: "BOSCH (Germany)" },
    { k: "Гарантия", v: "12 мес" },
  ],
  compatibility: [
    "BOSCH WAE2430",
    "BOSCH WFT6021",
    "BOSCH BWF4540",
    "Siemens SXE1234 (совместимо)",
  ],
  reviews: [
    {
      id: 1,
      name: "Иван П.",
      text: "Поставили за 2 дня, работает отлично. Мастер сказал — оригинал.",
      rating: 5,
    },
    {
      id: 2,
      name: "Ольга К.",
      text: "Упаковано аккуратно, всё как в описании.",
      rating: 4,
    },
  ],
}

function IconHeart() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.8 8.6a4.5 4.5 0 00-6.4 0L12 10.9l-2.4-2.3a4.5 4.5 0 10-6.4 6.4L12 21l8.8-6a4.5 4.5 0 000-6.4z"
      />
    </svg>
  )
}

export default function ProductPage(/*{
  product = sampleProduct,
}: {
  product: typeof sampleProduct
}*/) {
  const product = sampleProduct
  const [mainImage, setMainImage] = useState(product.images[0])
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const increase = () => setQty((q) => Math.min(q + 1, product.stock))
  const decrease = () => setQty((q) => Math.max(1, q - 1))

  const addToCart = () => {
    // TODO: интеграция с store / API
    alert(`Добавлено в корзину: ${product.name} x ${qty}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="breadcrumbs">
        <ol className="flex items-center gap-2">
          <li>
            <a href="#" className="hover:text-dh-red">
              Главная
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-dh-red">
              Каталог
            </a>
          </li>
          <li>/</li>
          <li className="text-gray-700">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Gallery */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 shadow-dh-lg border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="no:md:w-1/4 flex md:flex-col gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`rounded-xl overflow-hidden border ${
                      mainImage === img
                        ? "ring-2 ring-dh-red"
                        : "border-gray-100"
                    } duration-150`}
                    aria-label={`Показать изображение ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="md:flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-xl overflow-hidden cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-96 object-contain bg-gray-50 rounded-xl"
                  />
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <button className="px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                    Скачать инструкцию
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center gap-2">
                    <IconHeart />В избранное
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Description / Specs / Compatibility / Reviews */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-dh-soft border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === "description"
                      ? "bg-dh-yellow-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Описание
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === "specs"
                      ? "bg-dh-yellow-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Характеристики
                </button>
                <button
                  onClick={() => setActiveTab("compat")}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === "compat"
                      ? "bg-dh-yellow-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Совместимость
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === "reviews"
                      ? "bg-dh-yellow-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Отзывы
                </button>
              </div>

              <div className="text-sm text-gray-500">
                Артикул:{" "}
                <span className="text-gray-700 font-medium ml-1">
                  {product.sku}
                </span>
              </div>
            </div>

            <div className="mt-6">
              {activeTab === "description" && (
                <div className="prose prose-sm text-gray-700">
                  <p>{product.shortDesc}</p>
                  <p>
                    Оригинальная запчасть, каждая деталь проходит проверку
                    качества. Подходит для регулярного ремонта и восстановления
                    работоспособности бытовой техники.
                  </p>
                </div>
              )}

              {activeTab === "specs" && (
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr
                        key={i}
                        className={`${i % 2 === 0 ? "" : "bg-gray-50"}`}
                      >
                        <td className="py-3 px-4 w-1/3 text-gray-600">{s.k}</td>
                        <td className="py-3 px-4 font-medium">{s.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "compat" && (
                <ul className="list-disc pl-5 text-gray-700">
                  {product.compatibility.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {product.reviews.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-lg bg-white shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{r.name}</div>
                        <div className="text-sm text-gray-500">
                          {r.rating} ⭐
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 mt-2">{r.text}</div>
                    </div>
                  ))}

                  <form className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex gap-2">
                      <input
                        className="flex-1 px-3 py-2 rounded-md border border-gray-200"
                        placeholder="Ваше имя"
                      />
                      <select className="px-3 py-2 rounded-md border border-gray-200">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                      </select>
                    </div>
                    <textarea
                      className="w-full mt-3 px-3 py-2 rounded-md border border-gray-200"
                      rows="3"
                      placeholder="Комментарий"
                    ></textarea>
                    <div className="mt-3 text-right">
                      <button className="px-4 py-2 bg-dh-red text-white rounded-md">
                        Оставить отзыв
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Purchase card */}
        <aside className="lg:col-span-5">
          <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-dh-lg border border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="h-font text-2xl font-semibold">
                  {product.name}
                </h1>
                <div className="mt-2 text-sm text-gray-500">
                  {product.tag} • {product.sold} продано
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <div className="text-2xl font-bold">
                    {product.price.toLocaleString()} {product.currency}
                  </div>
                  {product.oldPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      {product.oldPrice.toLocaleString()} {product.currency}
                    </div>
                  )}
                </div>

                <div className="mt-3 text-sm">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">
                      {product.stock} в наличии
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Нет в наличии
                    </span>
                  )}
                </div>
              </div>

              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={decrease}
                  className="px-3 py-2 bg-white hover:bg-gray-50"
                >
                  −
                </button>
                <div className="px-4 py-2 font-medium">{qty}</div>
                <button
                  onClick={increase}
                  className="px-3 py-2 bg-white hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              <div className="flex-1">
                <button
                  onClick={addToCart}
                  className="w-full px-4 py-3 rounded-lg bg-dh-red text-white font-semibold shadow hover:bg-red-600"
                >
                  В корзину
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div>Доставка: 24–48ч по Москве</div>
              <div>
                Гарантия:{" "}
                {product.specs.find((s) => s.k === "Гарантия")?.v || "12 мес"}
              </div>
              <div>Оплата: картой, онлайн, при получении</div>
            </div>

            <div className="mt-6 border-t pt-4 text-sm">
              <div className="font-medium">Поддержка</div>
              <div className="text-gray-600">
                Консультация мастера и подбор по фото — бесплатно
              </div>
              <div className="mt-3">
                <button className="px-3 py-2 rounded-md bg-white border border-gray-200">
                  Связаться с экспертом
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Рекомендуем вместе</h3>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1579546928683-4f0e2f9f9f4f?q=80&w=100&auto=format&fit=crop"
                      alt="item"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <div className="text-sm font-medium">
                        Ремкомплект BOSCH
                      </div>
                      <div className="text-xs text-gray-500">от 890 ₽</div>
                    </div>
                  </div>
                  <button className="px-3 py-2 rounded-md bg-dh-yellow-600 text-white">
                    Купить
                  </button>
                </li>

                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1555685812-4b943f1b3c4f?q=80&w=100&auto=format&fit=crop"
                      alt="item"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <div className="text-sm font-medium">
                        Масло для двигателя
                      </div>
                      <div className="text-xs text-gray-500">от 199 ₽</div>
                    </div>
                  </div>
                  <button className="px-3 py-2 rounded-md bg-dh-yellow-600 text-white">
                    Купить
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={mainImage}
              alt="zoom"
              className="w-full h-[80vh] object-contain rounded-xl bg-white p-4"
            />
            <div className="mt-3 text-right">
              <button
                onClick={() => setLightboxOpen(false)}
                className="px-4 py-2 rounded-md bg-white"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
