# Finance-Tracker
Overview

Finance Tracker is a React Native mobile application designed to help users manage their daily expenses and income. Track, categorize, and visualize your finances with an intuitive interface.

Features

✅ Add income and expense transactions

✅ Edit or delete transactions directly (trash/bin icon)

✅ Predefined categories with custom icons

✅ Select transaction date easily with date picker

✅ Visual charts to track spending and income trends

✅ Real-time updates and clean UI

Screenshots

Home Screen


Add Transaction Screen


Charts Screen


Setup Instructions

Clone the repository

git clone <your-repo-url>
cd finance-tracker


Install dependencies

npm install


or

yarn install


Install iOS/Android dependencies

npx pod-install ios


Run the app

iOS:

npx react-native run-ios


Android:

npx react-native run-android

Dependencies

React Navigation

React Native Vector Icons

React Native Chart Kit

Install example:

npm install react-native-vector-icons @react-navigation/native react-native-chart-kit

Project Structure
/FinanceTracker
  ├── App.js
  ├── package.json
  ├── /screens
  │     ├── HomeScreen.js
  │     ├── AddTransactionScreen.js
  │     ├── EditTransactionScreen.js
  │     ├── ChartsScreen.js
  │     └── CategoriesScreen.js
  ├── /components
  │     ├── TransactionItem.js
  │     ├── CategoryPicker.js
  │     └── ChartComponent.js
  └── /assets
        ├── icons/
        └── images/

Usage

Open the app.

Tap “+” to add a transaction.

Enter amount, category, type (income/expense), and date.

Save the transaction.

Edit or delete transactions using the trash/bin icon.

View charts to analyze spending and income trends.

Notes

Direct Deletion: No need for long press—tap the bin icon.

Category Management: Ensure categories exist before adding transactions.

Data Persistence: Currently stored in local state; can integrate AsyncStorage or backend for permanent storage.

Future Improvements

Sync data across devices (backend integration)

Add recurring transactions

Export reports (PDF/Excel)

Notifications for budget limits

License

This project is licensed under the MIT License.

Built with ❤️ using React Native
