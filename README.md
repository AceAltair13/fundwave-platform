# Topics in Distributed Computing Research Project - Team Helios

## Research Topic
A Decentralized Crowdfunding Platform Powered By Blockchain

## Team Members
- Tirth Shailesh Thoria (031149064)
- Laksh Chandrabhan Jadhwani (032166249)
- Avantika Singh (031376590)
- Kunal Rajendra Pandey (031753941)

## Introduction
This project aims to develop a decentralized crowdfunding platform leveraging blockchain technology. The platform allows users to create and support campaigns securely and transparently. By utilizing smart contracts, we ensure that funds are only released when campaign goals are met, providing a trustless environment for both campaign creators and supporters.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your machine.
- A web3 wallet like MetaMask for interacting with the blockchain.
- A local blockchain environment like Hardhat or access to a testnet.

## Project Structure
The project is organized as follows:

```
fundwave-platform/
├── app/
│   ├── create-campaign/
│   ├── view-campaign/
│   ├── profile/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── assets/
├── components/
├── constants/
├── fundwave/
│   ├── Contract.sol
│   ├── .env
│   └── ...
├── lib/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```


- **app/**: Contains the main application pages and global styles.
    - **create-campaign/**: page for creating campaigns.
    - **view-campaign/**: page for viewing campaigns.
    - **profile/**: page for user profiles.
    - **global.css**: Global CSS styles.
    - **layout.tsx**: Layout component.
    - **page.tsx**: Main page component.
- **assets/**: folder for static assets
- **components/**: Reusable UI components like buttons, input fields, etc.
- **constants/**: Static data and configuration constants.
- **fundwave/**: Contains smart contracts and related configurations.
    - **Contract.sol**: Smart contract
- **lib/**: Utility functions and helpers
- **.env.local**: Local environment variables
- **.gitignore**: Git ignore file
- **package.json**: Project dependencies and scripts

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/AceAltair13/fundwave-platform.git
   cd fundwave-platform

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:** Copy the .env.local.example file to .env.local and update the variables as needed.

4. **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

5. **Open the application:** Open http://localhost:3000 with your browser to see the result.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.


