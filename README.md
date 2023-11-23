# Welcome to Awesome Web App

Powered by the most common web technologies and frameworks project which gives you initial setup and much more...

## Technology stack

- ASP.NET Core Web API
  - .NET 7
  - Mediatr
  - MSTest
- Next.js
  - React 18
  - TypeScript
  - MUI (Material UI)
  - Tailwind CSS
  - iron-session

## Design concepts

Application is intended to 

## Running

Application has no production evironment yet, therefore you will need to compile source files.

### Prerequisites

In order to run app you will need following software to be installed:
- Visual Studio IDE or .NET CLI
- Nodejs

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
- [ ] Setup error handling in API
- [ ] Setup error handling mechanism in both App Backend and frontend
- [ ] (Optional) Setup sample logging mechanism in API and App Backend
- [ ] Secure communication between API and App Backend (simple subscription key)
- [ ] Secure communication between App backend and App frontend (uster autheintication and authorization)
- [ ] Secure App routing and enable user authorization
- [ ] Enable App localization (string translations)
- [x] Feature: Landing, Error and NotFound pages
- [X] Feature: Create user account
- [x] Feature: Authenticate user
- [ ] Feature: UserDetails page that allows to view and edit account data (secured)
- [ ] Feature: AdminPanel page that allows admins to manage accounts (secured)
