"use client"

// src/pages/Cart.jsx
import React, { useEffect, useMemo, useState } from "react"

/*
  Страница корзины — клиентский прототип.
  - Быстрый добавитель генерирует 20 мок-товаров.
  - Карточки в корзине с qty, удалением.
  - Промокоды: DH10 (10%), SAVE500 (-500₽), FREESHIP (бесплатная доставка)
  - Суммы считаются динамически.
  - Корзина сохраняется в localStorage.
  - Кнопка "Перейти к оформлению" всегда видна (фиксированная панель).
*/

const CART_LS_KEY = "dh_cart_v1"
const MAX_UNIQUE_ITEMS = 500

// Mock product generator (same idea как в каталоге)
function generateProduct(idx: any) {
  const categories = [
    "Стиральные машины",
    "Холодильники",
    "Посудомойки",
    "Плиты",
  ]
  const brands = ["BOSCH", "Samsung", "LG", "Whirlpool"]
  const tags = ["Оригинал", "Аналог", "Хит", "Скидка"]

  const price = 1200 + (idx % 12) * 350
  return {
    id: `DH-P-${idx}`,
    idx,
    name: `Мок‑запчасть №${idx} (${brands[idx % brands.length]})`,
    price,
    brand: brands[idx % brands.length],
    category: categories[idx % categories.length],
    tag: tags[idx % tags.length],
    img: `https://zipinsk.ru/pictures/product/small/15221_small.jpg`,
  }
}

// Promo codes map
const PROMOS = {
  DH10: { type: "percent", value: 10, desc: "10% скидка" },
  SAVE500: { type: "fixed", value: 500, desc: "Скидка 500₽" },
  FREESHIP: { type: "freeship", value: 0, desc: "Бесплатная доставка" },
}

// Delivery options
const DELIVERY_OPTIONS = [
  { id: "pickup", label: "Самовывоз", price: 0 },
  { id: "standard", label: "Доставка 24–48ч", price: 350 },
  { id: "express", label: "Экспресс 24ч", price: 700 },
]

// helpers
function formatPrice(value: any) {
  return `${value.toLocaleString("ru-RU")} ₽`
}

function clamp(v: any, a: any, b: any) {
  return Math.max(a, Math.min(b, v))
}

// ---------- Main page ----------
export default function CartPage() {
  // quick add items
  const quickItems = useMemo(
    () => Array.from({ length: 20 }, (_, i) => generateProduct(i + 1)),
    []
  )

  // cart: array of { id, product, qty }
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_LS_KEY)
      if (raw) return JSON.parse(raw)
    } catch (e) {
      /* noop */
    }
    return []
  })

  const [promoInput, setPromoInput] = useState("")
  const [promoApplied, setPromoApplied] = useState<any>(null) // promo object or null
  const [promoError, setPromoError] = useState("")
  const [delivery, setDelivery] = useState(DELIVERY_OPTIONS[1].id) // default standard
  const [notes, setNotes] = useState("")

  // persist cart
  useEffect(() => {
    localStorage.setItem(CART_LS_KEY, JSON.stringify(cart))
  }, [cart])

  // Add item (if exists increment qty, else push new) - limit unique items
  function addToCart(product: any) {
    setCart((prev: any) => {
      const idx = prev.findIndex((p: any) => p.id === product.id)
      if (idx >= 0) {
        const next = prev.slice()
        next[idx] = { ...next[idx], qty: clamp(next[idx].qty + 1, 1, 99) }
        return next
      } else {
        if (prev.length >= MAX_UNIQUE_ITEMS) {
          alert(
            `Максимум ${MAX_UNIQUE_ITEMS} уникальных товаров в корзине (макет).`
          )
          return prev
        }
        return [...prev, { id: product.id, product, qty: 1 }]
      }
    })
  }

  function removeFromCart(id: any) {
    setCart((prev: any) => prev.filter((p: any) => p.id !== id))
  }

  function setQty(id: any, qty: any) {
    setCart((prev: any) =>
      prev.map((p: any) =>
        p.id === id ? { ...p, qty: clamp(Math.floor(qty), 1, 99) } : p
      )
    )
  }

  function clearCart() {
    if (!confirm("Очистить корзину?")) return
    setCart([])
    setPromoApplied(null)
    setPromoInput("")
    setPromoError("")
  }

  function applyPromo(code: any) {
    const c = (code || promoInput).trim().toUpperCase()
    if (!c) {
      setPromoError("Введите код")
      return
    }
    const p = PROMOS[c as keyof typeof PROMOS]
    if (!p) {
      setPromoError("Неверный промокод")
      setPromoApplied(null)
      return
    }
    setPromoApplied({ code: c, ...p } as any)
    setPromoError("")
  }

  function removePromo() {
    setPromoApplied(null)
    setPromoInput("")
    setPromoError("")
  }

  // totals
  const subtotal = useMemo(
    () => cart.reduce((s: any, it: any) => s + it.product.price * it.qty, 0),
    [cart]
  )

  const deliveryPrice = useMemo(() => {
    // if promo freeship -> 0
    if (promoApplied && promoApplied.type === "freeship") return 0
    const opt =
      DELIVERY_OPTIONS.find((d) => d.id === delivery) || DELIVERY_OPTIONS[1]
    // free delivery if subtotal >= 10000
    if (subtotal >= 10000) return 0
    return opt.price
  }, [delivery, promoApplied, subtotal])

  const discount = useMemo(() => {
    if (!promoApplied) return 0
    if (promoApplied.type === "percent") {
      return Math.round(subtotal * (promoApplied.value / 100))
    } else if (promoApplied.type === "fixed") {
      return Math.min(promoApplied.value, subtotal) // not negative
    } else if (promoApplied.type === "freeship") {
      return 0
    }
    return 0
  }, [promoApplied, subtotal])

  const total = Math.max(0, subtotal - discount + deliveryPrice)

  // proceed to checkout handler
  function proceedToCheckout() {
    if (cart.length === 0) {
      alert("Корзина пуста. Добавьте товары перед оформлением.")
      return
    }
    // In real app redirect to checkout page / create order
    alert(
      `Переход к оформлению.\nСумма: ${formatPrice(total)}\nТоваров: ${
        cart.length
      }`
    )
  }

  // UI pieces
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-4 text-sm text-gray-500">
        <a href="#" className="hover:text-dh-red">
          Главная
        </a>{" "}
        /{" "}
        <a href="#" className="hover:text-dh-red">
          Каталог
        </a>{" "}
        / <span className="text-gray-700">Корзина</span>
      </div>

      <h1 className="h-font text-3xl font-semibold mb-4">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: items and quick add */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick add panel */}
          <div className="bg-white rounded-2xl p-4 shadow-dh-soft border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="font-semibold">
                Быстро добавить товары (для тестирования корзины)
              </div>
              <div className="text-sm text-gray-500">
                Максимум уникальных позиций: {MAX_UNIQUE_ITEMS}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickItems.map((p) => (
                <div
                  key={p.id}
                  className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <div className="text-xs font-medium text-gray-800">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500">{p.brand}</div>
                  <div className="mt-2 text-sm font-semibold">
                    {formatPrice(p.price)}
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="mt-2 px-3 py-1 rounded-md bg-dh-red text-white text-sm"
                  >
                    Добавить
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart items */}
          <div className="bg-white rounded-2xl p-4 shadow-dh-soft border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Товары в корзине</div>
              <div className="text-sm text-gray-500">
                {cart.length} уникальных позиций
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                Корзина пуста. Добавьте товары сверху.
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 p-3 rounded-lg border border-gray-100"
                  >
                    <img
                      src={item.product.img}
                      alt={item.product.name}
                      className="w-28 h-20 object-cover rounded-md bg-gray-50"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-800">
                            {item.product.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.product.brand} • {item.product.category}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-dh-dark">
                            {formatPrice(item.product.price)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.product.tag}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              setQty(item.id, Math.max(1, item.qty - 1))
                            }
                            className="px-3 py-1"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.qty}
                            min={1}
                            max={99}
                            onChange={(e) =>
                              setQty(item.id, Number(e.target.value || 1))
                            }
                            className="w-14 text-center px-2 py-1 border-l border-r"
                          />
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="px-3 py-1"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-sm text-gray-600">
                          Итого:{" "}
                          <span className="font-medium">
                            {formatPrice(item.product.price * item.qty)}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-sm text-red-600"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-gray-600">
                    Итого уникальных товаров:{" "}
                    <span className="font-medium">{cart.length}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={clearCart}
                      className="px-3 py-2 rounded-md bg-white border text-sm"
                    >
                      Очистить корзину
                    </button>
                    <button
                      onClick={() => {
                        /* placeholder: go to catalog */
                      }}
                      className="px-3 py-2 rounded-md bg-dh-yellow-600 text-white text-sm"
                    >
                      Продолжить покупки
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes and promo */}
          <div className="bg-white rounded-2xl p-4 shadow-dh-soft border border-gray-100">
            <h3 className="font-semibold">Промокод и заметки к заказу</h3>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              <div className="md:col-span-2 flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Введите промокод"
                  className="px-3 py-2 rounded-md border border-gray-200 w-full"
                />
                <button
                  onClick={() => applyPromo(promoInput)}
                  className="px-4 py-2 rounded-md bg-dh-red text-white"
                >
                  Применить
                </button>
                <button
                  onClick={removePromo}
                  className="px-3 py-2 rounded-md bg-white border"
                >
                  Стереть
                </button>
              </div>

              <div className="text-sm md:text-right">
                {promoApplied ? (
                  <div className="text-green-700">
                    Применён:{" "}
                    <span className="font-medium">
                      {promoApplied.code} — {promoApplied.desc}
                    </span>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    Доступные коды: DH10, SAVE500, FREESHIP
                  </div>
                )}
                {promoError && (
                  <div className="text-red-600 text-sm mt-1">{promoError}</div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Примечание к заказу</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-2 w-full px-3 py-2 rounded-md border border-gray-200"
                placeholder="Например: оставить у консьержа"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right: summary + checkout (sticky) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-2xl p-5 shadow-dh-lg border border-gray-100">
            <div className="text-sm text-gray-600">Подведение итогов</div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">Подытог</div>
                <div className="font-medium">{formatPrice(subtotal)}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">Доставка</div>
                <div className="text-sm">
                  <select
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    className="px-3 py-1 rounded-md border"
                  >
                    {DELIVERY_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}{" "}
                        {o.price ? `(${formatPrice(o.price)})` : "(бесплатно)"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {promoApplied && promoApplied.type === "freeship" && (
                <div className="text-sm text-green-700">
                  Промокод даёт бесплатную доставку
                </div>
              )}

              <div className="flex justify-between">
                <div className="text-sm text-gray-600">Скидка</div>
                <div className="text-red-600 font-medium">
                  -{formatPrice(discount)}
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between items-center">
                <div className="text-lg font-semibold">Итого</div>
                <div className="text-2xl font-bold text-dh-dark">
                  {formatPrice(total)}
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Включая все применённые скидки и стоимость доставки. Налог и
                сборы не учитываются (макет).
              </div>

              <div className="mt-4">
                <button
                  onClick={proceedToCheckout}
                  className="w-full px-4 py-3 rounded-lg bg-dh-red text-white font-semibold"
                >
                  Перейти к оформлению
                </button>
              </div>

              <div className="mt-3 text-sm">
                <div className="font-medium">Опции оплаты</div>
                <div className="text-gray-500 text-xs">
                  Картой, онлайн, при получении
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Fixed bottom bar for checkout (always visible) */}
      <div className="fixed left-0 right-0 bottom-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-gray-500">Итого</div>
            <div className="text-lg font-semibold">{formatPrice(total)}</div>
          </div>
          <div className="flex items-center gap-2 w-1/2">
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="px-3 py-2 rounded-md bg-white border w-full"
            >
              Вернуться к товарам
            </button>
            <button
              onClick={proceedToCheckout}
              className="px-4 py-2 rounded-md bg-dh-red text-white font-medium"
            >
              Оформить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
