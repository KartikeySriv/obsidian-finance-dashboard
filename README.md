# Obsidian Wealth Intelligence

A premium, dark-themed SaaS finance dashboard built with React, Tailwind CSS, and Recharts. This project is designed as a high-fidelity frontend application suitable for top-tier internship submissions.

## 🚀 Features

### 1. Intelligence (Main Dashboard)
- **Summary Cards**: Real-time calculation of Total Balance, Income, and Expenses.
- **Balance Over Time**: Interactive area chart visualizing financial growth.
- **Expense Allocation**: Donut chart breaking down spending by category.
- **Insights Panel**: Automated observations and monthly comparisons.

### 2. Portfolio Management
- **Asset Tracking**: Detailed view of bank accounts, investments, and digital assets.
- **Distribution Analysis**: Visual breakdown of asset diversification.
- **Performance Indicators**: Real-time trend percentages for each account.

### 3. Market Intelligence
- **Equities & Crypto**: Live-style tracking of top stocks and digital assets.
- **Mini Sparklines**: Visual trend indicators for every market asset.
- **Search & Filter**: Quickly find and categorize market data.

### 4. Advanced Analytics
- **Comparison Reports**: Bar charts comparing monthly income vs. expenses.
- **Spending Trends**: Progress-based visualization of category-wise spending.
- **Key Insights**: Automated alerts for savings rates and budget thresholds.

### 5. Security & Settings
- **Account Protection**: UI for password management and 2FA toggles.
- **API Management**: Placeholder for developer access and personal tokens.

### 🔐 Role-Based Access Control (RBAC)
- **Admin Mode**: Full access to add, edit, and delete transactions.
- **Viewer Mode**: Read-only access to all dashboards and analytics. All destructive actions are hidden.

### 📱 Responsive Design
- **Mobile First**: Sidebar collapses into a hamburger menu on small screens.
- **Adaptive Layouts**: Grid systems that gracefully transition from desktop to mobile.
- **Touch Optimized**: Large touch targets and scrollable tables for mobile usability.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (motion/react)
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API
- **Persistence**: LocalStorage API

## 📂 Project Structure

```text
src/
├── components/        # Reusable UI components
│   ├── dashboard/     # Dashboard-specific components
│   ├── layout/        # Sidebar and TopBar
│   └── transactions/  # Transaction management
├── context/           # Global state (FinanceContext)
├── layout/            # MainLayout wrapper
├── lib/               # Utility functions (cn, formatting)
├── pages/             # Individual route pages
├── types/             # TypeScript interfaces
└── App.tsx            # Router and Provider setup
```

## 🚦 Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build for production: `npm run build`

## 📄 License

This project is licensed under the Apache-2.0 License.
