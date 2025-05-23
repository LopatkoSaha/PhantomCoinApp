# 📘 Документация проекта PhantomCoin

## 🔧 1. Общая информация о проекте

**PhantomCoin** — это веб-приложение для отслеживания, управления и обмена вымышленной криптовалютой. Проект включает как пользовательскую часть, так и административную панель.

### ✨ Основной функционал:

- **Аутентификация пользователей** (JWT).
- **Отслеживание курсов валют в реальном времени** через WebSocket (`react-use-websocket`).
- **Графики изменений валют** (`@canvasjs/react-charts`).
- **Игровые сервисы**: ставки и умножение средств.
- **Личный кабинет пользователя**:
  - Статус кошелька.
  - Торговля валютами (в т.ч. автоматическая).
  - Менеджмент предзаказов.
  - Интеграция с Telegram через `telegraf` (уведомления).
  - Модель ИИ (`mistlslLlm`) для прогнозирования конъюнктуры рынка.
- **Административная панель**:
  - Управление пользователями (активация/деактивация).
  - Управление кошельками (редактирование балансов).
  - Настройка параметров игровых сервисов.

📍 Демо: [`https://lopatkosaha.github.io/PhantomCoinApp/`](https://lopatkosaha.github.io/PhantomCoinApp/)

---

## ⚙️ 2. Технологии и стек

| Технология / Библиотека       | Версия     | Назначение                                               |
|------------------------------|------------|-----------------------------------------------------------|
| React                        | ^18.3.1    | Основной UI-фреймворк                                     |
| TypeScript                   | ^4.9.5     | Статическая типизация                                     |
| React Router DOM             | ^6.26.1    | Маршрутизация                                             |
| Redux Toolkit                | ^2.2.7     | Глобальное состояние (синхр. и асинхр. логика)           |
| React Redux                  | ^9.1.2     | Интеграция Redux с React                                  |
| React Hook Form              | ^7.54.2    | Обработка и валидация форм                                |
| Axios                        | ^1.7.7     | Работа с HTTP-запросами                                   |
| CanvasJS (React)             | ^1.0.2     | Построение интерактивных графиков                         |
| Recharts                     | ^2.12.7    | Альтернативная библиотека графиков                        |
| React Use WebSocket          | ^3.0.0     | WebSocket-подключения                                     |
| React Scripts                | 5.0.1      | CRA-конфигурация                                          |
| React Testing Library / Jest| ^13.4.0+   | Юнит и интеграционные тесты                               |
| Web Vitals                   | ^2.1.4     | Метрики производительности                                |
| @types/*                     | ^*         | Типы для TypeScript                                       |

---

## 🧱 3. Структура проекта

```
src/
├── api/                Работа с backend (axios-запросы)
├── app.tsx             Главный компонент приложения
├── pages/              Страницы (роуты)
├── shared/             Общие модули
│ ├── assets/           Шрифты, изображения
│ ├── components/       Переиспользуемые компоненты
│ ├── config/           Конфигурации
│ ├── elements/         Примитивные UI-элементы
│ ├── handlers/         Хелперы и обработчики
│ └── hooks/            Кастомные хуки
├── types/              Типы TypeScript
├── global.d.ts         Глобальные декларации типов
└── index.tsx           Точка входа
```

## 🚀 4. Установка и запуск

```
git clone https://github.com/LopatkoSaha/PhantomCoinApp.git
cd PhantomCoinApp
npm install

# Запуск в dev-режиме
npm run start-dev

# Сборка production-бандла
npm run build
```

## 🧪 5. Тестирование

```
npm run test
```
Используется Jest и @testing-library/react для написания модульных и интеграционных тестов.

## 🧭 6. Навигация и маршруты

| Путь               | Компонент          | Описание                         |
| ------------------ | ------------------ | -------------------------------- |
| `/`                | `MainPage`         | Главная                          |
| `/about`           | `AboutPage`        | О проекте                        |
| `/game`            | `GamePage`         | Игровая зона                     |
| `/market`          | `MarketPage`       | Валютный рынок                   |
| `/personal`        | `PersonalPage`     | Личный кабинет                   |
| `/chart/:currency` | `ChartPage`        | График выбранной валюты          |
| `/adminUsers`      | `AdminUsersPage`   | Панель управления пользователями |
| `/adminWallets`    | `AdminWalletsPage` | Управление кошельками            |
| `/adminGames`      | `AdminGamesPage`   | Конфигурации игровых сервисов    |

## 🔐 7. Работа с API

Все запросы к backend выполняются через axios. Пример:

```
export const userGet = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('http://localhost:3600/user/get', {
      withCredentials: true,
    });
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(showMessage({
      msgType: "warning",
      msgText: error.errName,
    }));
  }
}
```

## 🧠 8. Прогнозирование с AI

Интеграция с моделью ИИ (mistlslLlm) позволяет:

* прогнозировать динамику валют;

* снижать риски при трейдинге;

* использовать предиктивные графики в интерфейсе.

## 📄 10. Авторство

* 👨‍💼 Руководитель проекта: [Andrey Lopatko](https://github.com/d00dde)

* 👨‍💻 Основной разработчик: [LopatkoSaha](https://github.com/LopatkoSaha)