<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">HOTEL-SEARCH-CHALLENGE</h1>
</p>
<p align="center">
    <em>Find the best hotel for you!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/matheusgomes062/hotel-search-challenge?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/matheusgomes062/hotel-search-challenge?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/matheusgomes062/hotel-search-challenge?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/matheusgomes062/hotel-search-challenge?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Vitest-6E9F18.svg?style=flat&logo=Vitest&logoColor=white" alt="Vitest">
	<br>
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/Vue.js-4FC08D.svg?style=flat&logo=vuedotjs&logoColor=white" alt="Vue.js">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running hotel-search-challenge](#-running-hotel-search-challenge)
>   - [🧪 Tests](#-tests)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---
![image](https://github.com/matheusgomes062/hotel-search-challenge/assets/47605309/b96dd670-16ab-4393-8660-cb19b6f3b152)
![image](https://github.com/matheusgomes062/hotel-search-challenge/assets/47605309/3d3883f8-ad7b-401b-bd18-5a8bb4041684)
![image](https://github.com/matheusgomes062/hotel-search-challenge/assets/47605309/f54ae490-3335-4fc5-a04b-188e5fa4a787)
![image](https://github.com/matheusgomes062/hotel-search-challenge/assets/47605309/62e26e0d-0060-49db-a1de-39149a987340)
![image](https://github.com/matheusgomes062/hotel-search-challenge/assets/47605309/e0fc7425-d808-4aac-a478-8c68a5e01c7f)
![image](https://github.com/matheusgomes062/hotel-search-challenge/assets/47605309/e6d2fd8a-282b-41b9-ba13-98c11c72982b)



## 📍 Overview

The hotel-search-challenge is a web application designed to help users find the best hotels according to their preferences. The application offers various features, such as searching for hotels, applying filters, comparing different hotels, and booking rooms. It utilizes modern web development tools and frameworks, ensuring a smooth and efficient user experience.

---

## 📦 Features

Hotel Search: Easily search for hotels by name, location, or other criteria.
Filtering Options: Apply filters to narrow down the search results based on price, rating, amenities, etc.
Hotel Comparison: Compare multiple hotels side by side to make an informed decision.
Room Booking: Book rooms directly from the application.
Responsive Design: Accessible on various devices, ensuring a seamless user experience across different screen sizes.
Notifications: Get notified about booking status, errors, and other important updates.

---

## 📂 Repository Structure

```sh
└── hotel-search-challenge/
    ├── .github
    │   └── workflows
    │       ├── ci.yml
    │       └── github-actions.yml
    ├── README.md
    ├── api
    │   └── hotels.json
    ├── env.d.ts
    ├── index.html
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── public
    │   └── favicon.ico
    ├── src
    │   ├── App.vue
    │   ├── assets
    │   │   └── main.css
    │   ├── components
    │   │   ├── BookRoomModal.vue
    │   │   ├── CompareHotels.vue
    │   │   ├── HotelCard.vue
    │   │   ├── HotelComposableCard.vue
    │   │   ├── HotelListFilters.vue
    │   │   ├── HotelListResult.vue
    │   │   ├── HotelSearch.vue
    │   │   ├── ToastNotification.vue
    │   │   └── __tests__
    │   │       ├── bookRoomModal.spec.ts
    │   │       ├── compareHotels.spec.ts
    │   │       ├── hotelCard.spec.ts
    │   │       ├── hotelListFilters.spec.ts
    │   │       ├── hotelListResult.spec.ts
    │   │       └── hotelSearch.spec.ts
    │   ├── main.ts
    │   ├── router
    │   │   └── index.ts
    │   ├── stores
    │   │   ├── __tests__
    │   │   │   └── hotels.spec.ts
    │   │   ├── hotels.spec.ts
    │   │   ├── hotels.ts
    │   │   └── notification.ts
    │   ├── types
    │   │   └── index.d.ts
    │   └── views
    │       ├── BookingStatusView.vue
    │       ├── ErrorView.vue
    │       └── HomeView.vue
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── tsconfig.vitest.json
    ├── vite.config.ts
    ├── vite.config.ts.timestamp-1717823268952-bf559d31ce9e4.mjs
    └── vitest.config.ts
```

---

## 🧩 Modules

<details closed><summary>Modules</summary>

| File                                                                                                                     | Summary                                      |
| ---                                                                                                                      | ---                                          |
| `tsconfig.json`                                                                                                          | TypeScript configuration file.               |
| `index.html`                                                                                                             | Main HTML file for the project.               |
| `postcss.config.js`                                                                                                      | PostCSS configuration file.                  |
| `tsconfig.app.json`                                                                                                      | TypeScript configuration for the app.        |
| `tsconfig.vitest.json`                                                                                                   | TypeScript configuration for Vitest.         |
| `vite.config.ts.timestamp-1717823268952-bf559d31ce9e4.mjs`                                                               | Vite configuration with a timestamp.         |
| `vite.config.ts`                                                                                                         | Vite configuration file.                     |
| `package.json`                                                                                                           | Project dependencies and scripts.            |
| `vitest.config.ts`                                                                                                       | Vitest configuration file.                   |
| `tsconfig.node.json`                                                                                                     | TypeScript configuration for Node.js.        |
| `tailwind.config.js`                                                                                                     | Tailwind CSS configuration file.             |
| `env.d.ts`                                                                                                               | TypeScript definitions for environment variables. |
| `pnpm-lock.yaml`                                                                                                         | Lockfile for pnpm package manager.           |

</details>

<details closed><summary>api</summary>

| File                                 | Summary                              |
| ---                                  | ---                                  |
| `api/hotels.json`                    | JSON file containing hotel data.     |

</details>

<details closed><summary>.github.workflows</summary>

| File                                     | Summary                                |
| ---                                      | ---                                    |
| `.github/workflows/github-actions.yml`   | Configuration for GitHub Actions.      |
| `.github/workflows/ci.yml`               | Continuous Integration workflow file.  |

</details>

<details closed><summary>src</summary>

| File                       | Summary                            |
| ---                        | ---                                |
| `src/App.vue`              | Main Vue.js component.             |
| `src/main.ts`              | Entry point for the application.   |

</details>

<details closed><summary>src.router</summary>

| File                         | Summary                               |
| ---                          | ---                                   |
| `src/router/index.ts`        | Vue Router configuration.            |

</details>

<details closed><summary>src.types</summary>

| File                             | Summary                                  |
| ---                              | ---                                      |
| `src/types/index.d.ts`           | TypeScript type definitions.             |

</details>

<details closed><summary>src.components</summary>

| File                                     | Summary                                        |
| ---                                      | ---                                            |
| `src/components/ToastNotification.vue`   | Component for toast notifications.             |
| `src/components/CompareHotels.vue`       | Component for comparing hotels.                |
| `src/components/HotelListResult.vue`     | Component for displaying hotel list results.   |
| `src/components/HotelCard.vue`           | Component for a single hotel card.             |
| `src/components/HotelComposableCard.vue` | Composable hotel card component.               |
| `src/components/HotelListFilters.vue`    | Component for hotel list filters.              |
| `src/components/BookRoomModal.vue`       | Modal component for booking rooms.             |
| `src/components/HotelSearch.vue`         | Component for hotel search functionality.      |

</details>

<details closed><summary>src.components.__tests__</summary>

| File                                     | Summary                                        |
| ---                                      | ---                                            |
| `src/components/__tests__/hotelSearch.spec.ts` | Unit tests for hotel search component.         |
| `src/components/__tests__/compareHotels.spec.ts` | Unit tests for compare hotels component.       |
| `src/components/__tests__/hotelListResult.spec.ts` | Unit tests for hotel list result component.   |
| `src/components/__tests__/hotelCard.spec.ts` | Unit tests for hotel card component.           |
| `src/components/__tests__/hotelListFilters.spec.ts` | Unit tests for hotel list filters component. |
| `src/components/__tests__/bookRoomModal.spec.ts` | Unit tests for book room modal component.      |

</details>

<details closed><summary>src.stores</summary>

| File                         | Summary                                  |
| ---                          | ---                                      |
| `src/stores/hotels.spec.ts`  | Unit tests for hotels store.             |
| `src/stores/notification.ts` | Store for handling notifications.        |
| `src/stores/hotels.ts`       | Store for handling hotels data.          |

</details>

<details closed><summary>src.stores.__tests__</summary>

| File                                 | Summary                                        |
| ---                                  | ---                                            |
| `src/stores/__tests__/hotels.spec.ts`| Unit tests for hotels store.                   |

</details>

<details closed><summary>src.views</summary>

| File                                 | Summary                                        |
| ---                                  | ---                                            |
| `src/views/HomeView.vue`             | View component for the home page.              |
| `src/views/BookingStatusView.vue`    | View component for booking status page.        |
| `src/views/ErrorView.vue`            | View component for error page.                 |

</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**: `version x.y.z`

### ⚙️ Installation

1. Clone the hotel-search-challenge repository:

```sh
git clone https://github.com/matheusgomes062/hotel-search-challenge
```

2. Change to the project directory:

```sh
cd hotel-search-challenge
```

3. Install the dependencies:

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### 🤖 Running hotel-search-challenge

Use the following command to run hotel-search-challenge:

```sh
pnpm dev
```

Use the following command to run hotel server:

```sh
pnpm run serve
```
---

## 🛠 Project Roadmap

- [X] `► Design`
- [x] `► Logic for search`
- [x] `► Logic for filter`
- [x] `► Logic for compare`
- [x] `► Logic for booking`
- [x] `► Notification`
- [x] `► Booking Status`
- [x] `► Tests`
- [x] `► CI/CD`
- [x] `► Improve styling to be more accessible`
- [x] `► Documentation`
- [IN PROGRESS] `► Improve Vue 3 usage`
- [IN PROGRESS] `► Improve Typings`
- [ ] `► Add a node.js server`
- [ ] `► Add mongodb`
- [ ] `► Storybook`
- [ ] `► Figma`

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/matheusgomes062/hotel-search-challenge/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/matheusgomes062/hotel-search-challenge/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/matheusgomes062/hotel-search-challenge/issues)**: Submit bugs found or log feature requests for Hotel-search-challenge.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/matheusgomes062/hotel-search-challenge
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 👏 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
