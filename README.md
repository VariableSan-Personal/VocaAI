# AI Vocabulary Builder

Welcome to **AI Vocabulary Builder** – an intelligent application designed to help you build and enhance your vocabulary using state-of-the-art AI and spaced repetition techniques.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Introduction

**AI Vocabulary Builder** is a modern web application developed with [Nuxt 3](https://nuxt.com) and [Vue.js](https://vuejs.org). It leverages [Pinia](https://pinia.vuejs.org/) for state management and [Dexie](https://dexie.org/) for IndexedDB storage, ensuring a smooth and offline-capable experience. With beautifully crafted UI components powered by [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/), the app provides a delightful user experience.

---

## Features

- **Spaced Repetition:** Learn and review words using effective spaced repetition algorithms.
- **AI-powered Suggestions:** Generate example sentences automatically with an integrated AI service (Gemini).
- **Deck Management:** Create, edit, and delete vocabulary decks.
- **Interactive Review Sessions:** Enjoy interactive sessions with dynamic review options.
- **Offline Support:** Store your flashcards locally using IndexedDB.
- **Modern UI/UX:** Responsive design with customizable themes and appearance settings.
- **PWA Ready:** Progressive Web App support for seamless mobile and desktop experiences.

---

## Tech Stack

- **Frontend:** [Nuxt 3](https://nuxt.com), [Vue 3](https://vuejs.org)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Database:** [Dexie.js](https://dexie.org/) (IndexedDB)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **AI Integration:** Custom AI service using Gemini API
- **Build & Deployment:** Docker, Nginx, GitHub Actions for CI/CD

---

## Project Structure

The project is organized into several key folders:

- **assets/**: Static assets such as CSS files and images.
- **components/**: Reusable Vue components including buttons, form fields, modals, etc.
- **composables/**: Custom composables such as logging and API fetch utilities.
- **pages/**: Nuxt pages for routing (e.g., *vocabulary*, *learn*, *menu*).
- **server/**: Server-side configuration and API routes.
- **shared/**: Shared modules including AI services, storage services, types, and configurations.
- **stores/**: Pinia stores for managing application state (cards, AI, global, etc.).
- **.github/**: GitHub workflows for automated deployment.
- **Dockerfile & docker-compose.yml**: Containerization configuration for deployment.

For more details on individual files and folders, please refer to the file structure in your workspace.

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v22+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Docker (for containerized deployment)

### Local Setup

1. **Clone the repository:**

   ```sh
   git clone https://your-repo-url.git
   cd ai-vocabulary-builder
   ```

2. **Install dependencies:**

   ```sh
   npm ci
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   Your application should now be running at [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Vocabulary Decks:** Create and manage your vocabulary decks.
- **Add & Review Cards:** Add new words and review them in interactive sessions.
- **AI Service Configuration:** Configure the integrated AI service under *Settings* to generate example sentences.
- **Settings & Appearance:** Customize storage, appearance, and notification settings from the *Settings* page.

Explore the navigation menu to access the various features of the app.

---

## Deployment

The project supports containerized deployment using Docker. Use the provided `Dockerfile` and `docker-compose.yml` for building and deploying the app.

### Build and Run with Docker

1. **Build the Docker Image:**

   ```sh
   docker build -t voca-ai:latest .
   ```

2. **Run the Container:**

   ```sh
   docker run -p 3000:3000 voca-ai:latest
   ```

For automated deployments, refer to the GitHub Actions workflow under [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## Contributing

Contributions, bug reports, and feature requests are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a Pull Request describing your changes.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## Acknowledgements

- Built with ❤️ using [Nuxt](https://nuxt.com) and [Vue](https://vuejs.org).
- Inspired by modern AI-driven learning techniques.
- Thanks to the contributors of [Tailwind CSS](https://tailwindcss.com/), [Pinia](https://pinia.vuejs.org/), and [Dexie.js](https://dexie.org/).

---

Happy Learning!
