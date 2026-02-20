import express from "express";
import cors from "cors";

import mpesaRoutes from "./routes/mpesaRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/mpesa", mpesaRoutes);

export default app;