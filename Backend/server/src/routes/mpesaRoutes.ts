import express from "express";
import { stkPush, mpesaCallback } from "../controllers/mpesaController";

const router = express.Router();

router.post("/stkpush", stkPush);

router.post("/callback", mpesaCallback);

export default router;

