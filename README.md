


# README

### Table of Contents
1. [Folder Structure](#folder-structure)
2. [Instructions to Set Up and Run the Application](#instructions-to-set-up-and-run-the-application)
    - [Clone the Repository](#1-clone-the-repository)
    - [Install Dependencies](#2-install-dependencies)
    - [Set Up Environment Variables](#3-set-up-environment-variables)
    - [Start the Development Server](#4-start-the-development-server)
    - [Application Features](#5-application-features)
    - [Running Tests](#6-running-tests)
    - [Build for Production](#7-build-for-production)
    - [Troubleshooting](#8-troubleshooting)
7. [Architecture and Design Overview](#architecture-and-design-overview)
8. [Challenges Faced](#challenges-faced)
9. [Regrets and Next Steps](#regrets-and-next-steps)

---

## Folder Structure

Below is the key structure of the project with explanations for each part:

```
src/
├── components/                   # Reusable UI components
│   ├── styles/                   # Styled-components for shared UI elements
│   ├── CountryCard.tsx           # Displays a card for individual countries
│   ├── CountryCard.test.tsx      # Unit test for CountryCard component
│   ├── FilterAndSort.tsx         # Filtering and sorting functionality for country lists
│   ├── FilterAndSort.test.tsx    # Unit test for FilterAndSort component
│   ├── SearchBar.tsx             # Search bar for filtering country lists
│   ├── SearchBar.test.tsx        # Unit test for SearchBar component
│   └── WeatherInfo.tsx           # Weather information display for capitals
├── graphql/                      # GraphQL setup and queries
│   ├── apolloClient.ts           # Apollo Client configuration for GraphQL API
│   └── queries.ts                # GraphQL queries for country data
├── pages/                        # Main application pages
│   ├── styles/                   # Styled-components for page-specific components
│   ├── Home.tsx                  # Homepage displaying the country list
│   ├── Home.test.tsx             # Unit test for Home page
│   └── CountryDetailsPage.tsx    # Details page for individual countries
│   └── CountryDetailsPage.test.tsx # Unit test for CountryDetailsPage
├── store/                        # Redux store and state management
│   ├── countrySlice.ts           # Redux slice for managing country state
│   ├── hooks.ts                  # Custom Redux hooks for ease of use
│   ├── store.ts                  # Store configuration for Redux Toolkit
│   └── countrySlice.test.ts      # Unit test for Redux slice
├── utils/                        # Utility functions
│   ├── fetchWeather.ts           # Fetches weather data from OpenWeather API
│   └── fetchWeather.test.ts      # Unit test for fetchWeather utility
├── App.tsx                       # Main application entry point with routing
├── App.test.tsx                  # Unit test for App component
├── index.tsx                     # Renders the React application
├── types.ts                      # Type definitions for the application
├── styles.css                    # Global CSS styles

```

### Key Highlights
- **`components/`**: Encapsulates UI elements like `SearchBar`, `FilterAndSort`, and `WeatherInfo` for reusability.
- **`graphql/`**: Manages GraphQL integration with the API for country metadata.
- **`pages/`**: Contains main pages (`Home` and `CountryDetailsPage`) with isolated styles.
- **`store/`**: Centralized Redux state management to keep app state consistent.
- **`utils/`**: Utility functions like `fetchWeather` for clean separation of concerns.
- **`App.tsx`**: Ties together all pages and handles routing.

---

## Instructions to Set Up and Run the Application

Follow these steps to set up and run the application locally:

---

#### **1. Clone the Repository**
1. Open your terminal and run:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <repository-directory>
   ```

---

#### **2. Install Dependencies**
1. Ensure you have **Node.js** and **npm** installed. Check versions using:
   ```bash
   node -v
   npm -v
   ```
   Install them from [Node.js official website](https://nodejs.org/) if necessary.
2. Install the required dependencies:
   ```bash
   npm install
   ```

---

#### **3. Set Up Environment Variables**
1. Create a `.env` file in the project root directory.
2. Add the following variables to the `.env` file:
   ```env
   REACT_APP_WEATHER_API_KEY=<Your_OpenWeather_API_Key>
   ```
   Replace `<Your_OpenWeather_API_Key>` with your actual API key obtained from [OpenWeather](https://openweathermap.org/api).

---

#### **4. Start the Development Server**
1. Run the application:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
   ```plaintext
   http://localhost:3000
   ```

---

#### **5. Application Features**
- **Homepage (`/`)**:
  - Displays a list of countries fetched via a **GraphQL API**.
  - Includes a search bar, region filter, and sorting functionality.
  
- **Country Details Page (`/country/:code`)**:
  - Displays detailed information about a selected country, fetched via a **REST API**.
  - Includes weather data for the country's capital fetched via the **OpenWeather API**.

---

#### **6. Running Tests**
1. Run all tests:
   ```bash
   npm test
   ```
2. Run tests for a specific component or file:
   ```bash
   npm test -- <file-name>
   ```

---

#### **7. Build for Production**
1. To create a production build:
   ```bash
   npm run build
   ```
2. The build files will be located in the `build` directory.

---

#### **8. Troubleshooting**
- If dependencies fail to install, delete `node_modules` and `package-lock.json`:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Ensure your API key is valid and correctly set in the `.env` file.
- Clear the browser cache if changes do not appear after restarting the server.

---

## Architecture and Design Overview

#### **1. Architecture**
The application follows a **modular, component-based architecture** leveraging the following key technologies:
- **React:** For building reusable UI components and managing application state.
- **Redux Toolkit:** For state management, ensuring global accessibility of data like countries, filters, and sorting preferences.
- **Apollo Client:** For GraphQL query execution, enabling efficient and declarative data fetching.
- **RESTful API:** Used for fetching weather data via the `fetchWeather` utility function.
- **React Router:** For handling routing between pages (`Home` and `CountryDetailsPage`) in a single-page application (SPA) format.
- **Styled Components:** For managing styles in a modular, scalable way without global conflicts.

---

#### **2. Key Design Features**

##### **a. Routing and Navigation**
- **Implementation:**
  - React Router is used to define and navigate between routes (`/` for the homepage and `/country/:code` for country details).
  - Routes are dynamically parameterized to support navigation to country-specific pages.
- **Benefit to Stakeholders:**
  - Improves user experience by providing seamless navigation without page reloads.
  - Easy extension for additional routes or pages in the future.

##### **b. State Management**
- **Implementation:**
  - Redux Toolkit is used to store and manage global state, such as the list of countries, filters, and sorting preferences.
  - Custom hooks (`useAppDispatch` and `useAppSelector`) streamline interaction with Redux.
- **Benefit to Stakeholders:**
  - Reduces complexity by centralizing application state.
  - Ensures consistency across components and simplifies debugging and testing.

##### **c. Data Fetching**
- **GraphQL API Integration:**
  - Apollo Client fetches country data via the `GET_COUNTRIES` GraphQL query.
  - Automatic caching by Apollo ensures efficient use of resources.
- **RESTful API Integration:**
  - OpenWeatherMap API is used to fetch weather details for capital cities.
  - The `fetchWeather` utility abstracts API interaction, improving maintainability.
- **Benefit to Stakeholders:**
  - Combines the power of GraphQL and REST APIs for flexible data fetching.
  - Enhances performance through Apollo's caching mechanism.

##### **d. Component Reusability**
- **Implementation:**
  - Components like `SearchBar`, `FilterAndSort`, `CountryList`, and `CountryCard` are modular and reusable.
  - Custom styling is applied using `styled-components`.
- **Benefit to Stakeholders:**
  - Accelerates development by enabling code reuse.
  - Simplifies future enhancements or design changes.

##### **e. Design and Styling**
- **Implementation:**
  - Styled-components ensure that styles are scoped to specific components, preventing style leakage.
  - A responsive and user-friendly UI is implemented, with intuitive elements like dropdowns, search bars, and filters.
- **Benefit to Stakeholders:**
  - Provides a polished, professional appearance, improving usability and engagement.
  - Supports maintainability by keeping styles encapsulated within components.

##### **f. Testing**
- **Implementation:**
  - Comprehensive unit tests are written for components like `SearchBar`, `FilterAndSort`, and `CountryCard` using Jest and React Testing Library.
- **Benefit to Stakeholders:**
  - Improves application reliability and reduces the risk of regression bugs.
  - Provides confidence during feature additions or refactoring.

---

#### **3. Benefits to Stakeholders**

| Stakeholder      | Benefit                                                                 |
|------------------|-------------------------------------------------------------------------|
| **Developers**   | Modular design simplifies onboarding, debugging, and feature addition.  |
| **End Users**    | Fast and seamless user experience with intuitive navigation and design. |
| **Product Owners**| Efficient development cycles with reusable components and clear structure. |
| **System Admins** | Performance optimizations through Apollo caching and REST API integration. |

---

## Challenges Faced

#### 1. **Handling Non-Standard Country Names**
   - **Challenge:** 
     - Country names like `'Åland'` caused issues due to non-ASCII characters and inconsistent encoding in the APIs and application.
   - **Solution:**
     - Switched to using country codes (`code`) instead of names for routing and fetching country details.
     - Updated routing (`useParams`) and Redux selectors to rely on `code` for better consistency and reliability.
   - **Reflection:** 
     - This approach reduced errors and enhanced compatibility with external APIs.
     - **Next Steps:** If more time was available, additional validation could be implemented to handle edge cases for countries with similar or ambiguous codes.

---

#### 2. **Refreshing Country Details**
   - **Challenge:**
     - Refreshing a country detail page caused the application to lose context, as data was fetched dynamically from Redux and not persisted locally.
   - **Solution:**
     - Implemented a fallback mechanism using a REST API (`restcountries.com`) to dynamically fetch country details when Redux state was unavailable.
     - Added a local state to manage `country` details, with `useEffect` to handle data fetching.
     - Updated the logic to populate `country` state based on API data or Redux, ensuring seamless page refreshes.
   - **Reflection:** 
     - Enhanced the user experience by preventing page breakages during refresh.
     - **Next Steps:** Introducing caching strategies (e.g., localStorage or service workers) could further optimize the solution and reduce redundant API calls.

---

#### 3. **Combining Data Sources**
   - **Challenge:**
     - The need to integrate data from both GraphQL (`GET_COUNTRIES`) and RESTful APIs (weather data) required handling multiple asynchronous data sources and managing potential conflicts or errors.
   - **Solution:**
     - Separated concerns: GraphQL handled country metadata, while RESTful APIs fetched weather and additional country data.
     - Used `useEffect` hooks and state management to ensure seamless integration of both data sources.
   - **Reflection:**
     - Successfully implemented a modular approach to handle both APIs, but this added complexity.
     - **Next Steps:** Explore unifying data fetching under a single API layer (e.g., custom GraphQL resolvers) to streamline development.

---

#### 4. **User Interface Challenges**
   - **Challenge:** 
     - Ensuring that the application remained user-friendly while providing features like filtering, sorting, and handling dynamic data.
   - **Solution:**
     - Modularized components (`SearchBar`, `FilterAndSort`, `CountryList`) to handle specific responsibilities.
     - Used Redux for centralized state management to keep UI and data in sync.
   - **Reflection:** 
     - The component-based architecture simplified UI updates and debugging.
     - **Next Steps:** Add more comprehensive UI tests to catch regressions and edge cases earlier.

---

## Regrets and Next Steps

1. **Automated Error Handling:**
   - **Regret:** Error handling is currently basic, displaying generic error messages to users.
   - **Next Steps:** Implement a standardized error-handling utility to provide more informative feedback.

2. **Performance Optimization:**
   - **Regret:** Multiple API calls (e.g., fetching weather data for capitals) could have been optimized with caching mechanisms.
   - **Next Steps:** Introduce caching for GraphQL queries and REST API responses to improve performance.

3. **Enhanced Testing Coverage:**
   - **Regret:** While unit tests cover key components, end-to-end tests are limited.
   - **Next Steps:** Add Cypress tests to validate the complete user journey, including API integration and routing scenarios.

4. **Accessibility Improvements:**
   - **Regret:** Limited focus on WCAG compliance for UI components.
   - **Next Steps:** Conduct an accessibility audit and update components to be screen-reader friendly and fully navigable via keyboard.

