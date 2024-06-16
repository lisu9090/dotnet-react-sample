# Welcome to Awesome Web App

Powered by the most common web technologies and frameworks project which gives you initial setup and much more...

## Technology stack

- ASP.NET Core Web API
  - .NET 8.0
  - MediatR
  - MSTest
- Next.js
  - React 18
  - TypeScript
  - MUI (Material UI)
  - Tailwind CSS
  - NextAuth.js

## Design concepts

Concept behind the project is to speed up development process by delivering extensible, ready-to-develop web app. The app takes advantage of common technology stack, architecture, best practices and design patterns that are widely used in modern web systems. Moreover it ships with bunch of mechanisms, which usually need to be developed from scratch on project startup. This includes user authentication, role-based authorization, error handling, logging and localization. All of these can be found in Awesome Web App.

### Architecture

System consists of three main components: 
- **RESTful web API** - REST compliant web API, which serves business logic and can be easily consumed by multiple services.
- **App backend** - acts as a proxy to API, handles user authentication, authorization and HTTP errors. It can be extended to consume multiple web services. 
- **App frontend** - application user interface.

### RESTful web API

Created using ASP.NET Core Web API is a REST compliant web service. It takes advanteage of Layered Architecture and implements Command-Query Responsibility Segregation (CQRS) and Repository patterns. Each layer is separated with contracts that hide implementations and enables power of Dependency Injection. Code quality is ensured by set of Unit Tests.

### App backend

Next.js projects ship with build-in API. Here, API acts as application backend that fetches data from other services, handles user authentication, role-based authorization and HTTP Errors.   

### App frontend

App frontend is React application that takes advantage of Next.js framework. It uses Static Site Generation for pages that do not require user context and Server-Side Rendering in order to manage user access.

## Running

Application has no production environment yet, therefore you will need to compile source files.

### Prerequisites

In order to run app you will need following software to be installed:
- Visual Studio IDE or .NET CLI
- .NET 8.0
- Node.js v22

### Run in debug mode (Windows)

1. API
    1. Open src\AwesomeApp.API\AwesomeApp.API.sln file with Visual Studio
    2. From menu in the top of window select Debug > Start debugging or press F5 button
2. App
    1. Create config file .env.local in src/AwesomeApp.UI folder based on example.env. Provide value for SESSION_PASSWORD variable (this needs to be strong password of at least 32 characters; you can generate one [here](https://1password.com/password-generator/))
    2. Open src\AwesomeApp.UI folder in termianl
    3. Run commands 
    ``` bash
    npm install
    npm run dev
    ```
    4. Open browser and access http://localhost:3000

## Roadmap

- [x] Create API and App projects
- [x] Setup projects structure
- [x] Setup communication between API and App Backend
- [x] Setup communication between App Backend and App frontend
- [x] Setup error handling in API
- [x] Setup error handling mechanism in both App Backend and frontend
- [ ] (Optional) Setup sample logging mechanism in API and App Backend
- [x] Secure communication between API and App Backend with SSL
- [x] Secure communication between App backend and App frontend with SSL
- [x] Secure API with subscription key
- [x] Secure App backend with JWT token
- [ ] Secure App backend with CSRF token
- [x] Secure pages with user authentication
- [x] Enable role-based user authorization
- [ ] Enable App localization (string translations)
- [ ] Apply docs
- [x] Feature: Landing, Error and NotFound pages
- [x] Feature: Create user account
- [x] Feature: Authenticate user
- [x] Feature: UserDetails page that allows to view and edit account data (secured)
- [ ] Feature: AdminPanel page that allows admins to manage accounts (secured)
- [ ] Unit tests
- [ ] Docker support
