import express from "express";
import cors from "cors";

import flowRoutes from "./routes/flowRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/flows", flowRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`FlowMigrate backend running on port ${PORT}`);
});