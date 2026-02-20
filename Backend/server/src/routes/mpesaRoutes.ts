import express from "express";

import {
  stkPush,
  callback
} from "../controllers/mpesaController";

const router = express.Router();

router.post("/stkpush", stkPush);

router.post("/callback", callback);

export default router;