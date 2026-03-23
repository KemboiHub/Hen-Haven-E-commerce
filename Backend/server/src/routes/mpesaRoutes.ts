import express from "express";
import { initiateSTK, mpesaCallback } from "../controllers/mpesaController";

const router = express.Router();

router.post("/stk", initiateSTK);
router.post("/callback", mpesaCallback);

export default router;