// src/pages/Warranty.jsx
import React from "react"

/* Страница "Гарантия" — контент без Header/Footer.
   Предполагается, что глобальные стили и шрифты подключены (index.css).
*/

function IconCheck() {
  return (
    <svg
      className="w-5 h-5 text-dh-red"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 6L9 17l-5-5"
      />
    </svg>
  )
}

function IconDoc() {
  return (
    <svg
      className="w-5 h-5 text-dh-yellow-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
      />
      <path
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 2v6h6"
      />
    </svg>
  )
}

export default function WarrantyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-dh-yellow to-white rounded-2xl p-8 shadow-dh-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="lg:w-3/5">
            <h1 className="h-font text-3xl lg:text-4xl font-bold">
              Гарантия и сервис от Doctor House
            </h1>
            <p className="mt-4 text-gray-700 max-w-2xl">
              Мы гарантируем качество поставляемых запчастей и предоставляем
              прозрачную процедуру обращения по гарантии. На большинство товаров
              действует гарантия производителя или наша собственная гарантия —
              подробности ниже.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#claim"
                className="px-5 py-3 rounded-lg bg-dh-red text-white font-semibold shadow hover:bg-red-600 transition"
              >
                Подать заявку по гарантии
              </a>
              <a
                href="#faq"
                className="px-5 py-3 rounded-lg bg-white border border-gray-200"
              >
                Частые вопросы
              </a>
            </div>
          </div>

          <div className="lg:w-2/5">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-dh-red text-white flex items-center justify-center h-font">
                  DH
                </div>
                <div>
                  <div className="text-sm font-semibold">Горячая линия</div>
                  <div className="text-gray-600">+7 (495) 123‑45‑67</div>
                </div>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <IconCheck />
                  <div>
                    <div className="font-medium">Гарантия 12 мес</div>
                    <div className="text-xs text-gray-500">
                      на большинство оригинальных деталей
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <IconDoc />
                  <div>
                    <div className="font-medium">Прозрачные сроки</div>
                    <div className="text-xs text-gray-500">
                      решение по заявке в течение 5 рабочих дней
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key policy points */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-dh-soft border border-gray-100">
          <h3 className="text-lg font-semibold">Что покрывается</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-dh-yellow-600 flex items-center justify-center text-white">
                ✓
              </div>
              <div>
                Производственные дефекты и неисправности при нормальной
                эксплуатации.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-dh-yellow-600 flex items-center justify-center text-white">
                ✓
              </div>
              <div>Несоответствие спецификации (не та модель/артикул).</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-dh-yellow-600 flex items-center justify-center text-white">
                ✓
              </div>
              <div>Повреждения, возникшие вследствие дефекта детали.</div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-dh-soft border border-gray-100">
          <h3 className="text-lg font-semibold">Что не покрывается</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                —
              </div>
              <div>
                Механические повреждения из‑за неумелой установки или падения.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                —
              </div>
              <div>Износ при длительной эксплуатации (естественный износ).</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                —
              </div>
              <div>
                Повреждения, вызванные вторичными причинами (короткое замыкание,
                вода и пр.).
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-dh-soft border border-gray-100">
          <h3 className="text-lg font-semibold">Варианты решения</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li>Ремонт (если возможно) — бесплатно в рамках гарантии.</li>
            <li>Замена на идентичную/эквивалентную деталь.</li>
            <li>Возврат или компенсация — в случаях, оговорённых политикой.</li>
          </ul>
        </div>
      </section>

      {/* How to claim */}
      <section
        id="claim"
        className="mt-12 bg-white rounded-2xl p-6 shadow-dh-lg border border-gray-100"
      >
        <h2 className="h-font text-2xl font-semibold">
          Как подать заявку по гарантии
        </h2>
        <p className="mt-3 text-gray-700">
          Мы сделали процедуру максимально простой — заполните заявку онлайн или
          свяжитесь с поддержкой. Ниже — пошаговая инструкция.
        </p>

        <ol className="mt-6 space-y-5 list-decimal pl-5">
          <li>
            <div className="font-medium">Соберите документы</div>
            <div className="text-sm text-gray-600 mt-1">
              Документ покупки (чек/счёт), фотография неисправности,
              серия/артикул товара.
            </div>
          </li>

          <li>
            <div className="font-medium">Отправьте заявку</div>
            <div className="text-sm text-gray-600 mt-1">
              Через форму на сайте, по электронной почте warranty@doctorhouse.ru
              или по телефону.
            </div>
          </li>

          <li>
            <div className="font-medium">Диагностика</div>
            <div className="text-sm text-gray-600 mt-1">
              Наши инженеры проанализируют информацию и назначат удалённую или
              очную диагностику.
            </div>
          </li>

          <li>
            <div className="font-medium">Решение и ремонт/замена</div>
            <div className="text-sm text-gray-600 mt-1">
              В течение 5 рабочих дней мы принимаем решение и согласуем
              следующий шаг.
            </div>
          </li>
        </ol>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium">Онлайн-заявка</div>
            <div className="text-xs text-gray-500 mt-1">
              Заполните форму — прикрепите фото и копию чека.
            </div>
            <div className="mt-3">
              <a
                href="#"
                className="inline-block px-4 py-2 rounded-md bg-dh-red text-white"
              >
                Открыть форму
              </a>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium">Электронная почта</div>
            <div className="text-xs text-gray-500 mt-1">
              warranty@doctorhouse.ru — напишите тему: «Гарантия:
              артикул/заказ».
            </div>
            <div className="mt-3">
              <a
                href="mailto:warranty@doctorhouse.ru"
                className="inline-block px-4 py-2 rounded-md bg-dh-yellow-600 text-white"
              >
                Написать письмо
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Documents table */}
      <section className="mt-10">
        <div className="bg-white rounded-2xl p-6 shadow-dh-soft border border-gray-100">
          <h3 className="text-lg font-semibold">
            Необходимые документы и фото
          </h3>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-sm font-medium">1. Чек / счет</div>
              <div className="text-xs text-gray-600 mt-1">
                Подтверждение покупки у нас или у партнёра.
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-sm font-medium">2. Фото неисправности</div>
              <div className="text-xs text-gray-600 mt-1">
                Крупные планы дефекта, серийный номер детали.
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <div className="text-sm font-medium">3. Описание проблемы</div>
              <div className="text-xs text-gray-600 mt-1">
                Кратко опишите симптомы и обстоятельства появления дефекта.
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            Если чек утерян — возможен альтернативный способ подтверждения
            покупки (карточный платёж, заказ в личном кабинете). Обсуждается
            индивидуально.
          </div>
        </div>
      </section>

      {/* Service centers */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-dh-soft border border-gray-100">
          <h3 className="text-lg font-semibold">Сервисные центры</h3>
          <p className="mt-3 text-sm text-gray-700">
            У нас есть сеть проверенных сервисных партнёров по всей России. Ниже
            — несколько ближайших и опция отправки детали в наш центр.
          </p>

          <ul className="mt-4 space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-dh-red mt-2"></div>
              <div>
                <div className="font-medium">Москва — СЦ «РемонтПро»</div>
                <div className="text-xs text-gray-500">
                  м. Тверская; прием 9:00–18:00
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-dh-red mt-2"></div>
              <div>
                <div className="font-medium">
                  Санкт‑Петербург — «ДомТехСервис»
                </div>
                <div className="text-xs text-gray-500">
                  м. Площадь Восстания; прием 10:00–19:00
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-dh-red mt-2"></div>
              <div>
                <div className="font-medium">
                  Отправка в наш центральный центр
                </div>
                <div className="text-xs text-gray-500">
                  Бесплатная доставка в центр в рамках гарантийного случая (по
                  согласованию)
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-dh-soft border border-gray-100">
          <h3 className="text-lg font-semibold">
            Гарантийный срок и сроки рассмотрения
          </h3>
          <div className="mt-4 text-sm text-gray-700">
            <p>
              <strong>Стандартный срок</strong> — 12 месяцев с даты покупки
              (если не указано иное производителем).
            </p>
            <p className="mt-2">
              <strong>Срок рассмотрения заявки</strong> — до 5 рабочих дней. В
              отдельных сложных случаях — до 14 дней.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Время ремонта зависит от доступности запчастей и загрузки
              сервисного центра.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mt-12 bg-white rounded-2xl p-6 shadow-dh-lg border border-gray-100"
      >
        <h2 className="h-font text-2xl font-semibold">Частые вопросы</h2>

        <div className="mt-6 space-y-4">
          <details className="p-4 border rounded-lg bg-gray-50">
            <summary className="cursor-pointer font-medium">
              Что делать, если деталь пришла неисправной?
            </summary>
            <div className="mt-2 text-sm text-gray-700">
              Сфотографируйте дефект, прикрепите чек и отправьте заявку через
              форму или на почту warranty@doctorhouse.ru. Мы свяжемся и
              подскажем дальнейшие шаги.
            </div>
          </details>

          <details className="p-4 border rounded-lg bg-gray-50">
            <summary className="cursor-pointer font-medium">
              Сколько времени занимает замена?
            </summary>
            <div className="mt-2 text-sm text-gray-700">
              При наличии запчасти — обычно 1–5 рабочих дней. Если нужна
              доставка из другого склада — сроки обсуждаются.
            </div>
          </details>

          <details className="p-4 border rounded-lg bg-gray-50">
            <summary className="cursor-pointer font-medium">
              Можно ли получить возврат денег?
            </summary>
            <div className="mt-2 text-sm text-gray-700">
              Вариант возврата возможен при невозможности замены или ремонте в
              рамках политики продавца/производителя. Решение принимается
              индивидуально.
            </div>
          </details>
        </div>
      </section>

      {/* CTA / Contact */}
      <section className="mt-12 bg-gradient-to-r from-white to-dh-yellow rounded-2xl p-6 shadow-dh-lg border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="h-font text-xl font-semibold">
            Нужна помощь с гарантией?
          </h3>
          <p className="text-sm text-gray-700 mt-1">
            Наши специалисты готовы помочь с оформлением заявки и подбором
            оптимального решения.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:+74951234567"
            className="px-4 py-3 rounded-lg bg-dh-red text-white font-semibold"
          >
            Позвонить: +7 (495) 123‑45‑67
          </a>
          <a
            href="#"
            className="px-4 py-3 rounded-lg bg-white border border-gray-200"
          >
            Написать в чат
          </a>
        </div>
      </section>

      {/* Footer note */}
      <div className="mt-8 text-xs text-gray-500">
        Примечание: окончательные условия гарантии определяются гарантией
        производителя и условиями продажи. Doctor House оставляет за собой право
        запросить дополнительные документы для подтверждения гарантийного
        случая.
      </div>
    </div>
  )
}
