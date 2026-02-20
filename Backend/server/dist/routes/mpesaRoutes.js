"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mpesaController_1 = require("../controllers/mpesaController");
const router = express_1.default.Router();
router.post("/stkpush", mpesaController_1.stkPush);
router.post("/callback", mpesaController_1.mpesaCallback);
exports.default = router;
