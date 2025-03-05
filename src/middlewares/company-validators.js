import { body, param } from "express-validator";
import { companyExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const createCompanyValidator = [
    validateJWT,
    body("companyName").notEmpty().withMessage("El nombre es requerido"),
    body("entityType").notEmpty().withMessage("El tipo de entidad es requerido"),
    body("businessCategory").notEmpty().withMessage("La categoria es requerida"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("yearsOfExperience").isInt({ min: 0 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];

export const getCompanyByIdValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(companyExists),
    validarCampos,
    handleErrors
];

export const getCompanyValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const updateCompanyValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(companyExists),
    body("companyName").optional().notEmpty().withMessage("El nombre es requerido"),
    body("entityType").optional().notEmpty().withMessage("El tipo de entidad es requerido"),
    body("businessCategory").optional().notEmpty().withMessage("La categoria es requerida"),
    body("impactLevel").optional().notEmpty().withMessage("El nivel de impacto es requerido"),
    body("yearsOfExperience").optional().isInt({ min: 0 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];