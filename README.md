# Dashboard Wine Project

A modern dashboard web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**. The app features interactive charts, forms with validation, and a sleek UI for managing transactions and visualizing data.

**Live Demo:** [https://dashboard-wine-ten-21.vercel.app](https://dashboard-wine-ten-21.vercel.app)

---

## Features

- **Dashboard UI** built with **ShadCN UI** and **Tailwind CSS**
- Form validation using **Zod**
- Real-time notifications with **React Hot Toast**
- Charts and graphs using **Recharts** (PieChart & BarGraph)
- Transaction management (Add Transaction feature may not work on Vercel, see notes below)

---

## Project Setup

### Clone the repository

```bash
git clone https://github.com/SumanPoU/dashboard.git
cd dashboard
```

### Running the Project

```bash
npm i 
```

```bash
npm run dev
```

## Note

The Add Transaction feature does not work on the Vercel live demo because Vercel uses a read-only file system. It works correctly when running the project locally.
