import { Router } from "express";
import { stkPush } from "../controllers/mpesaController";

const router = Router();
router.post("/stkpush", stkPush);

export default router;

