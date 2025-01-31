"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode = 500, message = "Internal server error!", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message || "Success";
        this.data = data;
    }
}
exports.ApiResponse = ApiResponse;
