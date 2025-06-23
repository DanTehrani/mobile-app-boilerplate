# Expo App Boilerplate

## ✅ Out of the box

- Push Notifications
- Authentication
- Over-the-air updates
- Postgres integration
- Monorepo configuration
- Basic UI components
- Basic onboarding flow
- End-to-end type safety (tRPC + Prisma)
- In-app purchases (coming soon)

## 📙 Tutorial

- [Part 1: Basic setup](https://raylac.notion.site/Build-react-native-apps-as-fast-as-possible-Part-1-21b8a1e8bd748040b17ac06eb4fc9224)
- Part 2: Build a ChatGPT clone (coming soon)

## Structure

| **Package**       | **Description**                                                     |
| ----------------- | ------------------------------------------------------------------- |
| `packages/api`    | Contains the backend API written in [tRPC](https://trpc.io/).       |
| `packages/app`    | Contains an [Expo](https://expo.dev/) app.                          |
| `packages/db`     | Contains a [PrismaORM](https://www.prisma.io/) schema for Postgres. |
| `packages/worker` | Contains a worker for backend jobs. (e.g. notifications)            |

## Basic commands

Install dependencies

```
pnpm install
```

Run continuous build for tRPC types.

```
pnpm build:watch
```

Please refer to the [tutorial](https://raylac.notion.site/Build-react-native-apps-as-fast-as-possible-Part-1-21b8a1e8bd748040b17ac06eb4fc9224) for more details.
