# FlowMigrate

FlowMigrate is a small developer tool for analyzing and migrating Salesforce Flow metadata between environments.

The system allows a user to upload a Flow JSON file, detect its dependencies, visualize how flows depend on each other, and remap those dependencies before deployment.

---

## Overview

FlowMigrate simulates a simplified Salesforce Flow migration workflow where dependencies must be identified and resolved before deployment to another environment.

The project consists of:

- A **backend service** that parses and processes Flow metadata
- A **frontend interface** that allows users to interact with the system

The backend exposes REST APIs, and the frontend communicates with those APIs to perform parsing, dependency resolution, and deployment simulation.

---

## Supported Dependency Types

The system detects the following dependencies:

- Subflows  
- Custom Fields  
- Custom Objects  
- User IDs  

---

## Tech Stack

### Backend
- Express
- TypeScript

### Frontend
- React
- TypeScript
- Vite

---

## Repository Structure

```
FlowMigrate
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── parser/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── types/
│   │   └── server.ts
│   │
│   ├── fixtures/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## Backend Responsibilities

The backend contains:

- Flow JSON parsing logic
- Dependency detection engine
- Deployment simulation logic
- In-memory storage for flows
- REST API endpoints

Base URL:

```
http://localhost:5000
```

API Base Path:

```
http://localhost:5000/api
```

---

## Frontend Responsibilities

The frontend provides:

- Flow import interface
- Dependency listing and mapping table
- Dependency graph visualization
- Deployment simulation results
- JSON diff display after remapping

Frontend URL:

```
http://localhost:5173
```

---

# How to Run the Project

The backend and frontend run as separate applications.

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd FlowMigrate
```
## Optional Improvement

Currently, the backend and frontend must be started separately.

With additional setup, this could be simplified to a single root-level command such as:

npm install && npm run dev

This could be implemented using concurrently or a root-level script to start both services together.

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Environment Variables

No environment variables are required to run this project.

The frontend communicates with the backend using:

```
http://localhost:5000/api
```

This can be modified in:

```
frontend/src/services/api.ts
```

---

# What I Built

This project implements a simplified system for migrating Salesforce Flow metadata between environments.

### Workflow Summary

1. User uploads a Flow JSON file
2. Backend parses the Flow structure
3. Dependencies are detected:
   - Subflows
   - Custom fields
   - Custom objects
   - User IDs
4. Frontend displays detected dependencies in a table
5. User provides mappings for unresolved dependencies
6. Dependency graph visualizes flow relationships
7. System simulates deployment
8. JSON diff shows original vs remapped flow

If a dependency already exists in the target environment, it is marked as resolved automatically.

---

# Key Design Decisions

## Parser Structure

The parser uses recursive traversal over the Flow JSON object.

Instead of relying on fixed positions, it walks through the entire object tree and analyzes keys and values to detect dependency patterns.

This makes the parser flexible and resilient to structural differences in Flow metadata.

---
## Tradeoffs

The system prioritizes simplicity over full Salesforce API integration.  
It uses rule-based dependency detection instead of schema-based validation.  
An in-memory store is used instead of a database to keep the prototype lightweight.

---

## Dependency Detection Rules

Dependencies are detected using pattern-based rules:

- **User IDs** → Salesforce ID patterns  
- **Custom Fields** → `__c` suffix with object prefix  
- **Custom Objects** → `__c` suffix without object prefix  
- **Subflows** → `referencedFlow` keys  

This keeps the detection logic simple but effective.

---

## Dependency Graph Representation

The dependency graph is derived from subflow relationships.

- Each node represents a flow
- Directed edges represent subflow references

The frontend renders a vertical dependency structure to visualize deployment order.

---

## In-Memory Flow Store

Flows are stored in memory on the backend.

The store tracks:

- Parsed flows
- Deployment status
- Flow metadata

This avoids database complexity for the prototype.

---

# Edge Cases Handled

## Subflow Ordering

If a flow references another flow that has not been imported yet, the system generates a warning that deployment may fail.

---

## Shared User ID

If multiple flows reference the same user ID, the mapping only needs to be provided once and can be reused.

---

## Name-Based Deduplication

If a flow with the same name already exists in the target environment, the system marks it as resolved automatically.

---

## Unknown Subflow

If a referenced subflow has not been imported, the system does not block the process but shows a warning.

---

# What I Would Improve With More Time

## 1. Dependency Graph Engine

Implement automatic deployment order using topological sorting.

---

## 2. Persistent Storage

Add a database to persist flows and mappings across sessions.

---

## 3. Improved Graph Visualization

Use libraries such as React Flow or D3.js for interactive dependency graphs.

---

## 4. Automatic Mapping Suggestions

Suggest mappings automatically by comparing source and target metadata.

---

## 5. Better Error Handling

Improve validation and error reporting for malformed Flow JSON.

---

# Conclusion

FlowMigrate demonstrates the core workflow required when migrating Salesforce Flow metadata between environments.

It focuses on:

- Detecting dependencies
- Visualizing flow relationships
- Allowing user-provided mappings
- Simulating deployment after dependency resolution

The implementation prioritizes clarity, modularity, and extensibility while keeping the system simple enough to understand and expand.
