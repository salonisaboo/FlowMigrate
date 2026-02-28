# FlowMigrate

A simple tool for analysing and migrating Salesforce Flow metadata between environments.

The system allows a user to upload a Flow JSON file, detect its dependencies (such as custom fields, objects, subflows, and user IDs), visualise the dependency graph, and remap these dependencies before deployment.

This project is built with:

- **Backend:** Express + TypeScript
- **Frontend:** React + TypeScript (Vite)
- **Architecture:** Separate backend and frontend applications communicating via REST APIs.

---

# Repository Structure
FlowMigrate
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── parser/
│ │ ├── services/
│ │ ├── store/
│ │ ├── utils/
│ │ ├── types/
│ │ └── server.ts
│ │
│ ├── fixtures/
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── styles/
│ │ ├── types/
│ │ ├── App.tsx
│ │ └── main.tsx
│ │
│ ├── index.html
│ ├── package.json
│ └── vite.config.ts
│
└── README.md

---

# How to Run the Project

The backend and frontend are separate applications.

## 1. Clone the repository

```bash
git clone <repository-url>
cd flow-migrate

Backend Setup

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Run the backend server:

npm run dev

The backend server will start on:

http://localhost:5000
Frontend Setup

Open a new terminal and navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The frontend application will start on:

http://localhost:5173
Environment Variables

Currently no environment variables are required.

The frontend communicates with the backend using:

http://localhost:5000/api

If needed, the API URL can be modified inside:

frontend/src/services/api.ts

Backend Setup

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Run the backend server:

npm run dev

The backend server will start on:

http://localhost:5000
Frontend Setup

Open a new terminal and navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The frontend application will start on:

http://localhost:5173
Environment Variables

Currently no environment variables are required.

The frontend communicates with the backend using:

http://localhost:5000/api

If needed, the API URL can be modified inside:

frontend/src/services/api.ts
