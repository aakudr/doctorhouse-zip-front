import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
// import Footer from "@modules/layout/templates/footer"
// import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCartOptions()

    shippingOptions = shipping_options
  }

  return (
    <>
      <Header />
      {/*<Nav />*/}
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
    </>
  )
}

/* Header */
function Header() {
  return (
    <header className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-dh-red text-white shadow">
                <span className="h-font text-xl font-bold">DH</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="h-font text-lg font-semibold">
                  Doctor House
                </span>
                <span className="text-xs text-gray-500 -mt-0.5">
                  Запчасти для бытовой техники
                </span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
              <a
                href="/dk/catalog"
                className="px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Каталог
              </a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-50">
                Оригинальные детали
              </a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-50">
                Гарантия
              </a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-50">
                Услуги
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-700 hover:text-dh-red">
              Для бизнеса
            </a>
            <a
              href={"/cartNew"}
              className="px-3 py-2 rounded-md bg-white shadow-sm border border-gray-100 flex items-center gap-2"
            >
              <IconCart />
              <span className="text-sm font-medium">Корзина</span>
            </a>
            <a
              href="#"
              className="text-sm px-3 py-2 rounded-md bg-dh-red text-white font-medium shadow"
            >
              Войти
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

function IconCart() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14"
      />
    </svg>
  )
}

/* Footer */
function Footer() {
  return (
    <footer className="bg-white/60 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-dh-red text-white flex items-center justify-center h-font">
            DH
          </div>
          <div>
            <div className="font-semibold">Doctor House</div>
            <div className="text-xs text-gray-500">
              © 2025. Все права защищены.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-700">
            Политика
          </a>
          <a href="#" className="text-sm text-gray-700">
            Контакты
          </a>
          <a href="#" className="text-sm text-gray-700">
            Помощь
          </a>
        </div>
      </div>
    </footer>
  )
}
