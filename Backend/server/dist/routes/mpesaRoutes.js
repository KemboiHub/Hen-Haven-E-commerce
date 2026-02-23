"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mpesaController_1 = require("../controllers/mpesaController");
const router = (0, express_1.Router)();
router.post("/stkpush", mpesaController_1.stkPush);
exports.default = router;
