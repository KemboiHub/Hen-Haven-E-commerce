import express from "express";
import cors from "cors";
import mpesaRoutes from "./routes/mpesaRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/mpesa", mpesaRoutes);

export default app;