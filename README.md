# Secure Transaction History Module

built using **React Native** and **TypeScript**.

---

## 🚀 Features

- 🔐 Biometric Login (FaceID / Fingerprint)
- 📋 Transaction History List
- 👁️ Sensitive Amounts Masked (biometric to reveal)
- 📱 Mobile-First UI (touch-friendly)
- 🧾 Transaction Detail Screen
- 🔄 Pull-to-Refresh for transaction list
- ❌ Error handling for biometric auth

---

## 🛠️ Tech Stack

- React Native (Expo)
- TypeScript
- Expo Local Authentication
- React Navigation

---

## 📂 Folder Structure
- /src/models/Transaction.ts – defines the Transaction type
- /src/services/transactionService.ts – contains 20 sample transactions
- /src/screens/LoginScreen.tsx – handles biometric login
- /src/screens/TransactionHistoryScreen.tsx – list of transactions
- /src/screens/TransactionDetailScreen.tsx – detailed view of one transaction
- App.tsx – sets up the navigation stack

## How to Run:
- Clone the repo: git clone https://github.com/ashrafhamil/rytbank-transaction-history.git cd rytbank-transaction-history
- Install dependencies: npm install
- Start the project using Expo: npx expo start
- Scan the QR code with Expo Go on your mobile phone, or run it in an emulator or web browser.