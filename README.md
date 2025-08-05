# Проектная работа "Веб-ларек"
<<<<<<< HEAD
## 📌 Описание проекта

Данное приложение представляет собой одностраничный интернет-магазин, реализованный с использованием **TypeScript** и архитектурного паттерна **MVP (Model-View-Presenter)**. Приложение построено по принципам модульности, событийного взаимодействия и чистой архитектуры.

---
=======
Интернет-магазин товаров для веб-разработчиков. Проект реализован на TypeScript по паттерну MVP с событийным обменом. Пользователь может просмотреть каталог, положить товары в корзину и оформить заказ.

# 1. Используемый  стек:
- HTML5 - интерфейс,
- SCSS + PostCSS - стили,
- TypeScript 5 - язык и типизация,
- Webpack 5 - сборка проекта

# 2. Инструкция по сборке и запуску:

1) Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```
2) Создать файл окружения .env в корне проекта с содержимым:
```
API_ORIGIN=https://larek-api.nomoreparties.co
```

3) Сборка

```
npm run build
```

# 3. Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
>>>>>>> c0d54a099703cef532cb7e960f35190e15b29e9d

## 🚀 Запуск проекта

<<<<<<< HEAD
1. Убедитесь, что установлен [Node.js](https://nodejs.org/)
2. Установите зависимости:

```bash
npm install
```
npm run start
```


3. Сборка:

```bash
npm run build
```


---

## 🧩 Архитектура проекта

Проект организован по паттерну **MVP (Model-View-Presenter)**:

* **Model** — бизнес-логика и хранение данных
* **View** — отрисовка DOM и взаимодействие с пользователем
* **Presenter** — связывает Model и View, обрабатывает события и управляет потоком данных

Событийная система реализована вручную через кастомный `EventEmitter`.

---

## 📁 Структура проекта

```bash
src/
├── base/           # Базовые классы: API и EventEmitter
├── components/     # Переиспользуемые модули
├── data/           # API-клиенты для взаимодействия с backend
├── models/         # Модели данных и бизнес-логика
├── presenters/     # Презентеры (связывают Model и View)
├── views/          # Отображение данных и работа с DOM
├── types/          # Определения типов и интерфейсов
├── utils/          # Вспомогательные функции и константы
```

---


### `models/`

* **CartModel** — управление корзиной (добавление, удаление, расчёт стоимости)
* **CheckoutModel** — пошаговое оформление заказа, отправка данных
* **MainPageModel** — загрузка каталога товаров
* **ProductPreviewModel** — загрузка подробной информации о товаре

---

### `presenters/`

Связывают модель и отображение:

* **CartPresenter** — управление корзиной
* **CheckoutPresenter** — шаги оформления заказа
* **MainPagePresenter** — управление загрузкой каталога
* **ProductPreviewPresenter** — отображение одного товара
* **SuccessPresenter** — финальный экран после покупки
* **ModalPresenter** — открытие/закрытие модального окна

---

### `views/`

Работают с DOM:

* **CartView** — список товаров в корзине
* **CheckoutView** — формы ввода адреса, оплаты и контактов
* **MainPageView** — список карточек товаров
* **ProductPreviewView** — детальное описание товара
* **SuccessView** — сообщение об успешной покупке
* **ModalView** — универсальное модальное окно

---

## 📦 Типы данных

Файл `types/` содержит:

* `TProduct` — описание товара
* `TOrderDetails` — структура данных заказа
* Ответы от API (`IGetProductListResponse`, `IPostOrderResponse`)

---

## 🔄 Взаимодействие компонентов

```text
Пользователь → View → Presenter → Model → API
                         ↑         ↓
                    View обновляется по событиям
```

* Все действия инициируются через `View`
* `Presenter` вызывает методы `Model`
* `Model` работает с данными и API
* Изменения отправляются обратно в `View` через события

---

## 🏗 Используемые паттерны

* **MVP (Model-View-Presenter)** — основная архитектура
* **Observer (наблюдатель)** — реализация через `EventEmitter`
* **Factory** — шаблонные DOM-элементы клонируются через `cloneTemplate`

---

=======
# 4. Архитектура проекта

Проект разбит на три логических слоя: Модели (Model), Представления (View) и Презентер (Presenter). Связь между слоями осуществляется через общий EventEmitter – брокер событий, что обеспечивает слабое связывание и упрощает тестирование.

**4.1 Базовые классы**

| Класс  | Расположение |  Назначение |
|---|---|---|
|  EventEmitter  |  src/components/base/events.ts | Регистрирует слушателей, рассылает события, передавая полезную нагрузку. |
|  Model<T> | src/components/base/Model.ts | Абстрактная модель-обёртка поверх данных типа T. Предоставляет метод emitChanges, автоматически микширует Partial<T> в this. |
| Component<P> |  src/components/base/Component.ts | Базовый класс представления: хранит ссылку на DOM-контейнер, умеет устанавливать текст, атрибуты, классы, изображения и реагировать на изм. свойств. |
|  WebLarekAPI |  src/components/api/WebLarekAPI.ts | Инкапсулирует HTTP-запросы (fetch). Методы: getProductList, getProduct, createOrder. |

**4.2 Модели данных**

| Класс |	Описание |
|---|---|
| CatalogModel |	Держит массив товаров, полученных из API. Предоставляет метод getProduct(id) для быстрого доступа к товару. |
| BasketModel	| Хранит Map товаров, добавленных в корзину, считает итоговую сумму и количество. |
| OrderModel	| Содержит промежуточные данные заказа (доставка, контакты), валидирует формы и формирует итоговый объект заказа. |

***4.2.1 CatalogModel — каталог товаров***

**Назначение:** единственный источник информации о загруженных товарах каталога, а также о выбранном пользователем товаре для предварительного просмотра.

**Наследование:** extends Model<ICatalogModel>.

**Конструктор:** (data: Partial<ICatalogModel>, events: IEvents)
- data — начальное состояние (может быть пустым).
- events — экземпляр брокера событий для взаимодействия с другими слоями.

**Поля:**
- _items: IProduct[] — актуальный список товаров.
- _preview: string \| null — id товара, выбранного для превью, либо null.
- _loading: boolean — индикатор загрузки каталога.

**Методы:**
- setItems(items: IProduct[]): void — сохраняет массив товаров и эмитит items:changed.
- getItems(): IProduct[] — возвращает копию массива _items.
- getProduct(id: string): IProduct \| undefined — ищет товар по id.
- setPreview(product: IProduct): void — устанавливает текущий товар-превью и эмитит preview:changed.
- getPreview(): IProduct \| null — возвращает объект товара для превью или null.
- setLoading(state: boolean): void — меняет флаг загрузки.
- isLoading(): boolean — текущий статус загрузки.


***4.2.2 BasketModel — корзина покупателя***

**Назначение:** управляет набором выбранных товаров и предоставляет агрегированные данные (количество, сумма).

**Наследование:** extends Model<IBasketModel>.

**Конструктор:** (data: Partial<IBasketModel>, events: IEvents).

**Поля:**
- _items: Map<string, IBasketItem> — коллекция позиций в корзине, ключ — id товара.

**Методы**
- add(product: IProduct): void — кладёт товар в корзину и эмитит basket:changed.
- remove(id: string): void — убирает товар и эмитит basket:changed.
- clear(): void — очищает корзину.
- getItems(): IBasketItem[] — массив позиций корзины.
- getCount(): number — количество товаров.
- getTotal(): number — суммарная стоимость.
- contains(id: string): boolean — проверка наличия товара.

***4.2.3 OrderModel — оформление заказа***

**Назначение:** хранит данные, введённые в формах оплаты и контактов, выполняет валидацию и формирует финальный объект IOrder на основании данных корзины.

**Наследование:** extends Model<IOrderModel>.

**Конструктор:** (data: Partial<IOrderModel>, events: IEvents, basketModel: IBasketModel)
- basketModel передаётся для вычисления суммы и списка товаров — таким образом, стоимость и состав заказа не дублируются, а вычисляются на лету (SSOT).

**Поля:**
- _orderForm: IOrderForm & IContactsForm — промежуточные данные, введённые пользователем.
- formErrors: FormErrors — объект текущих ошибок валидации.

**Геттеры:**
- order: IOrder — актуальный объект заказа, собирается из _orderForm и basketModel.

**Методы:**
- setField(field, value): void — обновляет любое поле заказа (способ оплаты, адрес, email, телефон) и автоматически проводит валидацию всех полей. При изменении эмитит события formErrors:change, а при успешной валидации частей формы — order:ready или contacts:ready.
- clearOrder(): void — сбрасывает данные заказа и эмитит order:clear.
- getOrderData(): IOrder — возвращает финальный объект для API.

**4.3 Представления (View-компоненты)**

| Компонент	| Файл |	Функция |
|---|---|---|
| Card |	src/components/views/Card.ts |	Карточка товара. Отображает инфо, выводит кнопку «Купить» / «Убрать». |
| Basket	| src/components/views/Basket.ts | Список товаров в корзине,сумма, кнопка «Оформить». |
| Modal	| src/components/views/Modal.ts  | Универсальное модальное окно с анимацией и оверлеем. Закрывается по Esc, крестику, оверлею. |
|Form | src/components/views/Form.ts |	Общая логика форм: сбор данных, валидация, блокировка кнопок. |
| OrderForm	| src/components/views/OrderForm.ts	| Шаг 1: выбор оплаты + ввод адреса. |
| ContactsForm |	src/components/views/ContactsForm.ts |	Шаг 2: почта + телефон. |
| Success	| src/components/views/Success.ts	| Модальное окно успешной покупки. |
| Page |	src/components/views/Page.ts	| Шапка, основной контейнер. Отображает счётчик корзины. |

***4.3.1 Card — карточка товара***

**Наследование:** extends Component<ICard>

 **Конструктор:**(container: HTMLElement, actions?: ICardActions)

**Сохраняемые элементы**
- _title – заголовок товара (h3)
- _image – картинка (img)
- _price – цена (span)
- _category – категория (span)
- _description – описание (p / li)
- _button – «В корзину» / «Убрать из корзины» (button)

**Методы:** свойства устанавливаются через метод render(data), который принимает объект с полями id, title, image, price, category, description, button.

***4.3.2 Basket — список корзины***

**Наследование:** extends Component<IBasketView>

**Конструктор:** (container: HTMLElement, events: IEvents)

**Сохраняемые элементы**
- _list – контейнер для позиций корзины (ul)
- _total – сумма заказа (span)
- _button – кнопка «Оформить» (button)

**Методы/сеттеры:** items, total, buttonDisabled.

***4.3.3 Modal — всплывающее окно***

**Наследование:** extends Component<IModalData>

**Конструктор:** (container: HTMLElement, events: IEvents)

**Сохраняемые элементы**
- _closeButton – крестик закрытия (button)
- _content – область контента (div)

**Методы:** content, open, close, render.

***4.3.4 Form***

**Наследование:**  extends Component<IForm>

**Конструктор:** (container: HTMLFormElement, events: IEvents)

**Сохраняемые элементы**
- _submit – кнопка отправки формы (button)
- _errors – блок ошибок валидации (div / span)

**Методы:** onInputChange, valid, errors, render.


***4.3.5 OrderForm — выбор оплаты и адреса***

**Наследование:**  extends Form<IOrderForm>

**Конструктор:**  (container: HTMLFormElement, events: IEvents)

**Сохраняемые элементы**
- _paymentButtons – массив кнопок способов оплаты (button)
- _addressInput – поле адреса (input)

**Методы:** address, render 


***4.3.6 ContactsForm — контактные данные***

**Наследование:** extends Form<IContactsForm>

**Конструктор:** (container: HTMLFormElement, events: IEvents)

**Сохраняемые элементы**
- _emailInput – поле email (input)
- _phoneInput – поле телефона (input)

**Методы:** email, phone.


***4.3.7 Success — окно успешной оплаты***

**Наследование:** extends Component<ISuccess>

**Конструктор:** (container: HTMLElement, actions: ISuccessActions)

**Сохраняемые элементы**
- _close – кнопка закрытия (button)
- _total – сумма заказа (span)

**Методы:** total.


***4.3.8 Page — обёртка страницы***

**Наследование:** extends Component<IPage>

**Конструктор:** (container: HTMLElement, events: IEvents)

**Сохраняемые элементы**
- _counter – счётчик товаров в корзине (span)
- _catalog – грид каталога (section / div)
- _wrapper – обёртка контента (div)
- _basket – иконка/кнопка корзины (button / div)

**Методы/сеттеры:** counter, catalog, locked.


# 5. Взаимодействие компонентов

1. Пользователь кликает по Card → Card через коллбэк вызывает catalogModel.setPreview(item).
2. CatalogModel эмитит preview:changed, Presenter в src/index.ts ловит событие, создаёт превью товара с переданным объектом, вставляет его в контент Modal и открывает окно.
3. «В корзину» → через коллбэк вызывается basketModel.add(item), который обновляет Map и эмитит basket:changed.
4. Page подписан на basket:changed и обновляет счётчик, Basket — перерисовывает список.
5. OrderForm и ContactsForm передают введённые значения в OrderModel.setField(). Модель валидирует данные и эмитит formErrors:change; Presenter реагирует на это событие и обновляет ошибки и активность кнопок форм.
6. OrderModel собирает финальный объект и отдаёт Presenter → WebLarekAPI.createOrder().

# 6. Данные и типы

| Интерфейс |	Назначение |
|---|---|
| IProduct |	Объект товара из API. |
|ICard |	Данные, требуемые компоненту Card. |
|IBasketItem |	Упрощённый товар в корзине. |
| IOrderForm / IContactsForm |	Шаги формы заказа. |
|IOrder	| Финальный объект, отправляемый POST /order. |
| IAppEvents |	Интерфейс словаря строковых констант всех внутренних событий. |

Все типы объявлены в src/types.
>>>>>>> c0d54a099703cef532cb7e960f35190e15b29e9d
