"use client"
// src/pages/Catalog.jsx
import React, { useMemo, useState, useEffect } from "react"

/*
  Каталог (макет).
  - totalCount симулирует общее число товаров (можно поставить 50000).
  - Продукт генерируется детерминированно по индексу (generateProduct).
  - Фильтры, сортировка, пагинация работают на "индексах" — это экономно по памяти.
  - Для реального проекта замените генерацию на вызов API с параметрами фильтра/сорт/страница.
*/

const TOTAL_COUNT_DEFAULT = 50000 // можно менять

// ---------------------- Helper: generate mock product ----------------------
function generateProduct(idx: number) {
  const basePrice = 1500 + (idx % 50) * 120 // разнообразие цен
  const price = Math.round(basePrice / 10) * 10
  const rating = Math.round((3 + ((idx % 20) / 20) * 2) * 10) / 10 // 3.0 — 5.0
  const sold = Math.floor((idx % 1000) + (idx % 7) * 10)
  const categoryList = [
    "Стиральные машины",
    "Холодильники",
    "Посудомойки",
    "Плиты",
    "Мелкая техника",
    "Климат",
  ]
  const brandList = ["BOSCH", "Samsung", "LG", "Whirlpool", "Electrolux"]
  const tags = ["Оригинал", "Аналог", "Премиум", "Хит", "Скидка"]

  const category = categoryList[idx % categoryList.length]
  const brand = brandList[idx % brandList.length]
  const tag = tags[idx % tags.length]
  const inStock = idx % 7 !== 0 // некоторым нет в наличии

  return {
    id: `DH-${idx}`,
    idx,
    name: `Тест‑деталь №${idx} для ${category} (${brand})`,
    price,
    rating,
    sold,
    category,
    brand,
    tag,
    inStock,
    img: `https://zipinsk.ru/pictures/product/small/15221_small.jpg`,
  }
}

// ---------------------- UI helpers ----------------------
function formatPrice(p: number) {
  return p.toLocaleString("ru-RU") + " ₽"
}

// pagination window generator: returns array like [1, '...', 45,46,47, '...', 50000]
function getPageWindow(current: number, total: number, windowSize = 2) {
  const pages = []
  if (total <= 1) return [1]

  const left = Math.max(2, current - windowSize)
  const right = Math.min(total - 1, current + windowSize)

  pages.push(1)
  if (left > 2) pages.push("left-ellipsis")
  for (let p = left; p <= right; p++) pages.push(p)
  if (right < total - 1) pages.push("right-ellipsis")
  if (total > 1) pages.push(total)

  return pages
}

// ---------------------- Components ----------------------
function Breadcrumbs({ path = ["Каталог"] }) {
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="breadcrumbs">
      <ol className="flex items-center gap-2">
        <li>
          <a href="#" className="hover:text-dh-red">
            Главная
          </a>
        </li>
        <li>/</li>
        {path.map((p, i) => (
          <li key={i} className={i === path.length - 1 ? "text-gray-700" : ""}>
            {i === path.length - 1 ? (
              p
            ) : (
              <a href="#" className="hover:text-dh-red">
                {p}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function CategoryChips({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: any
  activeCategory: any
  setActiveCategory: any
}) {
  return (
    <div className="flex gap-3 flex-wrap mb-4">
      <button
        onClick={() => setActiveCategory(null)}
        className={`px-3 py-2 rounded-full text-sm ${
          activeCategory === null ? "bg-dh-red text-white" : "bg-white border"
        }`}
      >
        Все
      </button>
      {categories.map((c: any) => (
        <button
          key={c}
          onClick={() => setActiveCategory(c)}
          className={`px-3 py-2 rounded-full text-sm ${
            activeCategory === c ? "bg-dh-red text-white" : "bg-white border"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

function FiltersSidebar({
  filters,
  setFilters,
  brands,
  categories,
  resetFilters,
  applyFilters,
  collapsed,
  setCollapsed,
}: any) {
  // local temporary filter state could be used; for simplicity we operate directly on filters
  return (
    <aside className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 md:sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Фильтры</h3>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-gray-600"
        >
          {collapsed ? "Развернуть" : "Свернуть"}
        </button>
      </div>

      {!collapsed && (
        <div className="space-y-4">
          {/* Search inside filters */}
          <div>
            <label className="text-sm font-medium text-gray-700">Поиск</label>
            <input
              value={filters.query}
              onChange={(e) =>
                setFilters({ ...filters, query: e.target.value })
              }
              className="mt-2 w-full px-3 py-2 rounded-md border border-gray-200"
              placeholder="По артикулу, названию..."
            />
          </div>

          {/* Categories */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
              Категории
            </div>
            <div className="grid grid-cols-1 gap-2">
              {categories.map((c: any) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(c)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...filters.categories, c]
                        : filters.categories.filter((x: any) => x !== c)
                      setFilters({ ...filters, categories: next, page: 1 })
                    }}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Бренды</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {brands.map((b: any) => (
                <label key={b} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(b)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...filters.brands, b]
                        : filters.brands.filter((x: any) => x !== b)
                      setFilters({ ...filters, brands: next, page: 1 })
                    }}
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Цена (₽)</div>
              <div className="text-sm text-gray-500">
                {filters.priceMin}–{filters.priceMax}
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                className="w-1/2 px-2 py-1 rounded-md border border-gray-200"
                value={filters.priceMin}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMin: Number(e.target.value || 0),
                    page: 1,
                  })
                }
              />
              <input
                type="number"
                className="w-1/2 px-2 py-1 rounded-md border border-gray-200"
                value={filters.priceMax}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMax: Number(e.target.value || 9999999),
                    page: 1,
                  })
                }
              />
            </div>
          </div>

          {/* Availability and tag */}
          <div className="grid grid-cols-1 gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    inStockOnly: e.target.checked,
                    page: 1,
                  })
                }
              />
              В наличии
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.onlyPromos}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    onlyPromos: e.target.checked,
                    page: 1,
                  })
                }
              />
              Только акции / скидки
            </label>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Минимальный рейтинг
              </div>
              <select
                value={filters.minRating}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minRating: Number(e.target.value),
                    page: 1,
                  })
                }
                className="w-full px-3 py-2 rounded-md border border-gray-200 text-sm"
              >
                <option value={0}>Любой</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
                <option value={4.5}>4.5+</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                applyFilters()
              }}
              className="px-4 py-2 rounded-md bg-dh-red text-white font-medium"
            >
              Показать
            </button>
            <button
              onClick={() => {
                resetFilters()
              }}
              className="px-4 py-2 rounded-md bg-white border"
            >
              Сбросить
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

function ProductCard({
  product,
  view = "grid",
  size = "md",
  detail = "normal",
}: any) {
  const sizeClasses = {
    sm: "p-3 text-sm",
    md: "p-4 text-sm",
    lg: "p-6 text-base",
  }[size as string]

  const imgH = { sm: "h-28", md: "h-40", lg: "h-56" }[size as string]

  return (
    <article
      className={`bg-white rounded-2xl border border-gray-100 shadow-dh-soft overflow-hidden flex ${
        view === "list" ? "gap-4" : "flex-col"
      } ${size === "sm" ? "text-sm" : ""}`}
    >
      <div
        className={`${
          view === "list" ? "w-40 flex-shrink-0" : ""
        } bg-gray-50 flex items-center justify-center`}
      >
        <img
          src={product.img}
          alt={product.name}
          className={`${imgH} w-full object-cover`}
        />
      </div>

      <div className={`flex-1 ${sizeClasses}`}>
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-800">{product.name}</h4>
            <div className="text-xs text-gray-500 mt-1">
              {product.brand} • {product.category}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-dh-dark">
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-gray-500">
              {product.rating} ⭐ • {product.sold} продано
            </div>
          </div>
        </div>

        {detail !== "compact" && (
          <div className="mt-3 text-sm text-gray-600">
            <div>
              {product.tag}{" "}
              {product.inStock ? (
                <span className="text-green-600">• В наличии</span>
              ) : (
                <span className="text-red-600">• Нет в наличии</span>
              )}
            </div>
            {detail === "detailed" && (
              <div className="mt-2 text-xs text-gray-500">
                Подробное описание товара: совместимость, технические параметры
                и рекомендации по установке. (Мок-текст)
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg bg-dh-red text-white font-medium text-sm">
            В корзину
          </button>
          <button className="px-3 py-2 rounded-lg bg-white border text-sm">
            Подробнее
          </button>
        </div>
      </div>
    </article>
  )
}

function Pagination({ currentPage, totalPages, setPage }: any) {
  const window = getPageWindow(currentPage, totalPages, 2)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        «Первая
      </button>
      <button
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        ‹
      </button>

      {window.map((p, i) => {
        if (p === "left-ellipsis" || p === "right-ellipsis") {
          return (
            <span key={i} className="px-2">
              …
            </span>
          )
        }
        return (
          <button
            key={i}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-md ${
              p === currentPage ? "bg-dh-red text-white" : "bg-white border"
            }`}
          >
            {p}
          </button>
        )
      })}

      <button
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        ›
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
      >
        Последняя »
      </button>
    </div>
  )
}

// ---------------------- Main Page ----------------------
export default function CatalogPage() {
  // UI & data state
  const [totalCount] = useState(TOTAL_COUNT_DEFAULT)
  const [filters, setFilters] = useState({
    query: "",
    categories: [] as string[], // selected categories
    brands: [] as string[], // selected brands
    priceMin: 0,
    priceMax: 9999999,
    inStockOnly: false,
    onlyPromos: false,
    minRating: 0,
    page: 1,
  })

  const [pageSize, setPageSize] = useState(24)
  const [view, setView] = useState("grid") // grid | list
  const [cardSize, setCardSize] = useState("md") // sm | md | lg
  const [detailLevel, setDetailLevel] = useState("normal") // compact | normal | detailed
  const [sortBy, setSortBy] = useState("relevance") // many sorting options
  const [filterCollapsed, setFilterCollapsed] = useState(false)

  // available categories/brands (should match generateProduct)
  const categories = [
    "Стиральные машины",
    "Холодильники",
    "Посудомойки",
    "Плиты",
    "Мелкая техника",
    "Климат",
  ]
  const brands = ["BOSCH", "Samsung", "LG", "Whirlpool", "Electrolux"]

  // derive activeCategory (for chips demo) separate from filters.categories: we will allow one chip category selection as shortcut
  const [activeCategoryChip, setActiveCategoryChip] = useState(null)
  useEffect(() => {
    // when chip changes, update filters.categories to match single selection
    if (activeCategoryChip === null) {
      // if no chip - don't change existing filters
      return
    }
    setFilters((prev) => ({
      ...prev,
      categories: [activeCategoryChip],
      page: 1,
    }))
  }, [activeCategoryChip])

  // Reset & apply filter helpers
  const resetFilters = () => {
    setFilters({
      query: "",
      categories: [],
      brands: [],
      priceMin: 0,
      priceMax: 9999999,
      inStockOnly: false,
      onlyPromos: false,
      minRating: 0,
      page: 1,
    })
    setActiveCategoryChip(null)
  }

  const applyFilters = () => {
    // in this mock, changes are applied live; here we could fetch data
    setFilters((prev) => ({ ...prev, page: 1 }))
  }

  // ---------------------- Matching logic (deterministic by index) ----------------------
  // isMatch returns true if item with index idx matches current filters
  function isMatch(idx: number) {
    const p = generateProduct(idx)

    // query
    if (filters.query) {
      const q = filters.query.toLowerCase()
      if (
        !(
          String(p.idx).includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        )
      )
        return false
    }

    // categories filter (if any)
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(p.category)
    )
      return false

    // brands filter
    if (filters.brands.length > 0 && !filters.brands.includes(p.brand))
      return false

    // price
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false

    // inStock
    if (filters.inStockOnly && !p.inStock) return false

    // onlyPromos (simulate by tag)
    if (filters.onlyPromos && p.tag !== "Скидка" && p.tag !== "Хит")
      return false

    // rating
    if (p.rating < filters.minRating) return false

    return true
  }

  // compute matched indices (we iterate totalCount — fine for 50k)
  const matchedInfo = useMemo(() => {
    const matchedIndices = []
    // We'll scan indices 1..totalCount and collect matches
    for (let i = 1; i <= totalCount; i++) {
      if (isMatch(i)) matchedIndices.push(i)
    }
    return {
      matchedIndices,
      totalMatched: matchedIndices.length,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, totalCount]) // recompute when filters change

  // apply sorting and paging: we will sort the matchedIndices according to sortBy, then slice for page
  const totalMatched = matchedInfo.totalMatched
  const totalPages = Math.max(1, Math.ceil(totalMatched / pageSize))
  const currentPage = Math.min(filters.page, totalPages)

  // comparator for indices
  function comparator(aIdx: number, bIdx: number) {
    const a = generateProduct(aIdx)
    const b = generateProduct(bIdx)
    switch (sortBy) {
      case "priceAsc":
        return a.price - b.price
      case "priceDesc":
        return b.price - a.price
      case "ratingDesc":
        return b.rating - a.rating
      case "ratingAsc":
        return a.rating - b.rating
      case "popular":
        return b.sold - a.sold
      case "newest":
        return b.idx - a.idx
      case "brand":
        return a.brand.localeCompare(b.brand)
      default: // relevance (by idx)
        return a.idx - b.idx
    }
  }

  // Generate page indices (sorted) — avoid cloning huge array by mapping/sorting matchedIndices
  const pageIndices = useMemo(() => {
    const arr = matchedInfo.matchedIndices.slice() // copy
    arr.sort(comparator)
    const start = (currentPage - 1) * pageSize
    return arr.slice(start, start + pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedInfo, currentPage, pageSize, sortBy])

  // When filters/pageSize change, ensure page is valid
  useEffect(() => {
    setFilters((prev) => {
      const newPage = Math.min(prev.page, totalPages)
      if (newPage !== prev.page) return { ...prev, page: newPage }
      return prev
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  // Controls for card grid columns based on cardSize and view
  const gridColsClass =
    view === "list"
      ? "grid-cols-1"
      : {
          sm: "grid-cols-4",
          md: "grid-cols-3",
          lg: "grid-cols-2",
        }[cardSize]

  // ---------------------- Render ----------------------
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumbs
        path={[
          "Каталог",
          ...(filters.categories.length ? filters.categories : ["Все разделы"]),
        ]}
      />

      {/* Top categories chips */}
      <CategoryChips
        categories={categories}
        activeCategory={activeCategoryChip}
        setActiveCategory={setActiveCategoryChip}
      />

      <div className="flex items-center justify-between gap-4 mb-6 md:sticky top-0 bg-white pt-4 pb-2 px-2 z-10">
        {/* Left: filters toggle / count */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterCollapsed(!filterCollapsed)}
            className="px-3 py-2 rounded-md bg-white border"
          >
            Фильтры
          </button>
          <div className="text-sm text-gray-600">
            Найдено:{" "}
            <span className="font-semibold text-dh-dark">
              {totalMatched.toLocaleString()}
            </span>{" "}
            товаров
          </div>
        </div>

        {/* Right: sort, view, size, page size */}
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 text-sm"
          >
            <option value="relevance">По релевантности</option>
            <option value="priceAsc">Цена: по возрастанию</option>
            <option value="priceDesc">Цена: по убыванию</option>
            <option value="ratingDesc">Рейтинг: по убыванию</option>
            <option value="popular">Популярные</option>
            <option value="newest">Новые</option>
            <option value="brand">Бренд A–Z</option>
          </select>

          <div className="flex items-center gap-2 bg-white border rounded-md p-1">
            <button
              onClick={() => setView("grid")}
              className={`px-2 py-1 rounded ${
                view === "grid" ? "bg-dh-yellow-600 text-white" : ""
              }`}
            >
              Сетка товаров
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-2 py-1 rounded ${
                view === "list" ? "bg-dh-yellow-600 text-white" : ""
              }`}
            >
              Список товаров
            </button>
          </div>

          <div className="flex items-center bg-white border rounded-md p-1">
            <button
              onClick={() => setCardSize("sm")}
              className={`px-2 py-1 rounded ${
                cardSize === "sm" ? "bg-dh-red text-white" : ""
              }`}
            >
              S
            </button>
            <button
              onClick={() => setCardSize("md")}
              className={`px-2 py-1 rounded ${
                cardSize === "md" ? "bg-dh-red text-white" : ""
              }`}
            >
              M
            </button>
            <button
              onClick={() => setCardSize("lg")}
              className={`px-2 py-1 rounded ${
                cardSize === "lg" ? "bg-dh-red text-white" : ""
              }`}
            >
              L
            </button>
          </div>

          <select
            value={detailLevel}
            onChange={(e) => setDetailLevel(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 text-sm"
          >
            <option value="compact">Компактно</option>
            <option value="normal">Стандарт</option>
            <option value="detailed">Подробно</option>
          </select>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setFilters((prev) => ({ ...prev, page: 1 }))
            }}
            className="px-3 py-2 rounded-md border border-gray-200 text-sm"
          >
            <option value={12}>12 / стр</option>
            <option value={24}>24 / стр</option>
            <option value={48}>48 / стр</option>
            <option value={96}>96 / стр</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar filters */}
        <div className="lg:col-span-3">
          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            categories={categories}
            resetFilters={resetFilters}
            applyFilters={applyFilters}
            collapsed={filterCollapsed}
            setCollapsed={setFilterCollapsed}
          />
        </div>

        {/* Products area */}
        <div className="lg:col-span-9">
          {/* top bar inside results */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Показаны:{" "}
              <span className="font-medium">
                {Math.min(totalMatched, (filters.page - 1) * pageSize + 1)}–
                {Math.min(totalMatched, filters.page * pageSize)}
              </span>{" "}
              из{" "}
              <span className="font-semibold">
                {totalMatched.toLocaleString()}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              Аргументы поиска:{" "}
              <span className="font-medium">{filters.query || "—"}</span>
            </div>
          </div>

          {/* Products grid/list */}
          <div className={`grid gap-4 ${gridColsClass}`}>
            {pageIndices.length === 0 ? (
              <div className="col-span-full p-8 bg-white rounded-2xl shadow-sm border text-center">
                Ничего не найдено по заданным фильтрам.
              </div>
            ) : (
              pageIndices.map((idx) => {
                const p = generateProduct(idx)
                return (
                  <ProductCard
                    key={p.id}
                    product={p}
                    view={view}
                    size={cardSize}
                    detail={detailLevel}
                  />
                )
              })
            )}
          </div>

          {/* pagination */}
          <div className="mt-6 flex items-center justify-between">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setPage={(p: any) => setFilters((prev) => ({ ...prev, page: p }))}
            />

            <div className="text-sm text-gray-500">
              Страница {currentPage} из {totalPages} — всего результатов:{" "}
              {totalMatched.toLocaleString()}
            </div>
          </div>

          {/* Large dataset note */}
          <div className="mt-4 text-xs text-gray-500">
            Это прототип. Товары не настоящие
          </div>
        </div>
      </div>
    </div>
  )
}
