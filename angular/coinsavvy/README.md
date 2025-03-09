# Coinsavvy

coinsavvy/
│── src/
│ ├── app/
│ │ ├── core/ # Global services & utilities
│ │ │ ├── interceptors/ # HTTP interceptors (e.g., auth, error handling)
│ │ │ ├── guards/ # Route guards (e.g., AuthGuard)
│ │ │ ├── services/ # Global services (e.g., AuthService, APIService)
│ │ │ ├── models/ # Interfaces & types (e.g., Expense, User)
│ │ │ ├── utils/ # Helper functions (e.g., formatDate, currency formatter)
│ │ │ ├── core.module.ts # Core module to group global providers
│ │ ├── shared/ # Reusable components, pipes, directives
│ │ │ ├── components/ # UI elements (e.g., Button, Card, Modal)
│ │ │ ├── pipes/ # Custom pipes (e.g., currency formatter)
│ │ │ ├── directives/ # Custom directives
│ │ │ ├── shared.module.ts # Shared module for UI components
│ │ ├── modules/ # Feature modules (Lazy loaded)
│ │ │ ├── auth/ # Authentication module
│ │ │ │ ├── login/ # Login component
│ │ │ │ ├── signup/ # Signup component
│ │ │ │ ├── auth-routing.module.ts
│ │ │ │ ├── auth.module.ts
│ │ │ ├── dashboard/ # Dashboard module
│ │ │ │ ├── dashboard.component.ts
│ │ │ │ ├── dashboard.module.ts
│ │ │ ├── expenses/ # Expense tracking module
│ │ │ │ ├── expense-list/ # Expense list component
│ │ │ │ ├── add-expense/ # Add expense component
│ │ │ │ ├── expenses-routing.module.ts
│ │ │ │ ├── expenses.module.ts
│ │ ├── app-routing.module.ts # Routes configuration
│ │ ├── app.component.ts # Root component
│ │ ├── app.module.ts # Root module
│ ├── assets/ # Static assets (images, icons, etc.)
│ ├── environments/ # Configurations for different environments
│ ├── styles/ # Global styles
│── angular.json # Angular project configuration
│── package.json # Dependencies
│── tsconfig.json # TypeScript configuration

Dashboard Features for CoinSavvy

1. Navigation Bar (Top Bar)
   Logo & Branding
   Sidebar Toggle Button (for mobile)
   User Profile Dropdown:
   View Profile
   Settings
   Earnings
   Sign Out
2. Sidebar Navigation (Left Panel)
   Dashboard (Overview)
   Portfolio
   Market Trends
   Transactions
   Budgeting & Goals
   Insights & Reports
   Alerts & Notifications
   Settings

3. Main Dashboard Panel
   Portfolio Summary:

Total Balance
Asset Allocation (Crypto, Stocks, Other Investments)
Performance Chart
Market Trends:

Top Gainers & Losers
Trending Cryptos/Stocks
Live Price Charts
Recent Transactions:

Deposits, Withdrawals, Trades
Filters for Date & Type
Budgeting & Goals:

Monthly Saving Targets
Spending Analysis
Insights & Reports:

AI-Based Predictions
Historical Performance Analysis
Alerts & Notifications:

Price Alerts
Important News Updates
Quick Actions:

Add Transaction
Set Budget Goal
