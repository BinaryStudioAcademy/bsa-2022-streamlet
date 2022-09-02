# BSA-2022 | Streamlet

## ℹ️ General Info

This is the repository responsible for Streamlet's apps.

## 🏭 Applications

- [Backend](./backend) — Streamlet's application backend.

  _To work properly, fill in the `.env` file. Use the `.env.example` file as an example._

- [Frontend](./frontend) — Streamlet's application frontend.

  _To work properly, fill in the `.env` file. Use the `.env.example` file as an example._

- [Shared](./shared) — Streamlet's application common modules for reuse.

## 🖍 Requirements

- [NodeJS](https://nodejs.org/en/) (16.x.x);
- [NPM](https://www.npmjs.com/) (8.x.x);
- [PostgreSQL](https://www.postgresql.org/) (14.0)
- [Docker](https://www.docker.com)
- run `npx simple-git-hooks` at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

## 🏃‍♂️ Simple Start

### Setup database

1. Create `.env` folder at the root project and add `api-db.env` file according to `.env.example`

### Setup apps

1. Fill ENVs in each project
2. `npm install` at the root
3. `npx simple-git-hooks` at the root

### Run project

_Each project run in the separate terminal_

1. Go to `.docker` folder and run: `docker compose up -d`
2. Apply first migration to DB: `npm run migrate`
3. Run: `npm run start:backend`
4. Run: `npm run start:frontend`

## Code Quality

Static analyzers are used for both frontend and backend projects to ensure basic code quality. Additionally, [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md) rules are enforced during code review and audit.

## Architecture

### 💽 DB Schema

```mermaid
erDiagram

  User {
    String id PK
    String email
    String username
    String password
    Boolean isActivated
    DateTime createdAt
    DateTime updatedAt
    }


  UserProfile {
    String id PK
    String firstName
    String lastName
    String avatar
    DateTime createdAt
    DateTime updatedAt
    }


  RefreshToken {
    String id PK
    String token
    DateTime createdAt
    DateTime updatedAt
    }

  ResetPasswordToken {
    String id PK
    String token
    String userId
    DateTime createdAt
    DateTime updatedAt
    }


  Video {
    String id PK
    String name
    String description
    Boolean isLive
    String videoPath
    Int liveViews
    Int videoViews
    DateTime createdAt
    DateTime updatedAt
    }


  Tag {
    String id PK
    String name
    DateTime createdAt
    DateTime updatedAt
    }


  Category {
    String id PK
    String name
    DateTime createdAt
    DateTime updatedAt
    }


  VideoComment {
    String id PK
    String text
    DateTime createdAt
    DateTime updatedAt
    }


  Channel {
    String id PK
    String name
    String description
    String contactEmail
    String bannerImage
    DateTime createdAt
    DateTime updatedAt
    }


  Subscription {
    String id PK
    Boolean notify
    DateTime createdAt
    DateTime updatedAt
    }


  ChatMessage {
    String id PK
    String text
    DateTime createdAt
    DateTime updatedAt
    }


  Notification {
    String id PK
    String text
    Boolean viewed
    DateTime createdAt
    DateTime updatedAt
    }


  History {
    String id PK
    DateTime createdAt
    DateTime updatedAt
    }


  Reaction {
    String id PK
    Boolean isLike
    DateTime createdAt
    DateTime updatedAt
    }

    UserProfile o|--|| User : "user"
    RefreshToken o|--|| User : "user"
    Video o{--}o Tag : ""
    Video o{--}o Category : ""
    Video o{--|| Channel : "channel"
    Tag o{--}o Video : ""
    Category o{--}o Video : ""
    VideoComment o{--|| Video : "video"
    VideoComment o{--|| User : "author"
    Channel o{--|| User : "author"
    Subscription o{--|| User : "user"
    Subscription o{--|| Channel : "channel"
    ChatMessage o{--|| Video : "video"
    ChatMessage o{--|| User : "author"
    Notification o{--|| User : "user"
    Notification o{--|| Video : "video"
    History o{--|| User : "user"
    History o{--|| Video : "video"
    Reaction o{--|| User : "user"
    Reaction o{--|| Video : "video"
```

## 🧑‍💻 CI

### 🗜 Tools

### 🌑 Backend

- [Express](https://expressjs.com/) – a backend framework.
- [InversifyJS](https://inversify.io) - an IoC container
- [Prisma](https://www.prisma.io/) – an ORM.

### 🌕 Frontend

- [React](https://reactjs.org/) – a frontend library.
- [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) – a state manager.

#### 🥊 Code quality

- [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
- [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
- [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [prettier](https://prettier.io/) — an opinionated code formatter.
- [ls-lint](https://ls-lint.org/) — file and directory name linter.
- [eslint](https://eslint.org/) – find problems in your JS code
- [stylelint](https://stylelint.io/) – Find and fix problems in your CSS code

### 🗞 Git

#### 📊 Branches

- **`production`** - production source code.
- **`development`** - staging source code.

#### 🌳 Branch flow

```
<type>/<project-prefix><ticket-number>-<short-desc>
```

##### Types:

- task
- fix

##### Examples:

- `task/design5-add-signin-page`
- `task/blog12-add-filters`
- `fix/design16-fix-signup-validation`

#### 🗂 Commit flow

```
<project-prefix>-<ticket-number>: <modifier> <desc>
```

##### Modifiers:

- `+` (add)
- `*` (edit)
- `-` (remove)

##### Examples:

- `blog-5: + form component`
- `design-12: * filter markup`
- `blog-16: - require prop for nickname field`

## Build app in Docker locally

Specify `api.env` `api-db.env` files in `.env` folder
Run commands from root:

```
docker build --build-arg REACT_APP_API_ORIGIN_URL=/api/v1 -f .docker/frontend.Dockerfile -t frontend .
docker build -f .docker/backend.Dockerfile -t backend .
docker build -f .docker/push.Dockerfile -t push .
docker build -f .docker/video-transcoding-server.Dockerfile -t video-transcoding-server .
docker compose -f .docker/docker-compose.local.yml up -d
```

## 📦 CD

[Handled](.github/workflows/cd.yml) by [GitHub Actions](https://docs.github.com/en/actions).
