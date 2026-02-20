"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimestamp = void 0;
const getTimestamp = () => {
    const date = new Date();
    return date.getFullYear().toString() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0") +
        String(date.getSeconds()).padStart(2, "0");
};
exports.getTimestamp = getTimestamp;
