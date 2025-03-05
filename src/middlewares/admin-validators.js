import { body, param } from "express-validator";
import { emailExists, usernameExists, adminExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const getAdminByIdValidator = [
    validateJWT,
    param("aid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("aid").custom(adminExists),
    validarCampos,
    handleErrors
]

export const deleteAdminValidator = [
    validateJWT,
    param("aid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("aid").custom(adminExists),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    param("aid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("aid").custom(adminExists),
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateAdminValidator = [
    validateJWT,
    param("aid", "No es un ID válido").isMongoId(),
    param("aid").custom(adminExists),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    param("aid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("aid").custom(adminExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]