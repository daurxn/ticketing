import type {FieldValidationError, ValidationError} from "express-validator";
import {CustomError} from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters')

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return (this.errors as FieldValidationError[])
            .map(error => ({message: error.msg, field: error.path}))
    }
}