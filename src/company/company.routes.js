import { Router } from "express";
import { saveCompany, getCompanys, getCompanyById, updateCompany, generateReport } from "./company.controller.js";
import { createCompanyValidator, getCompanyByIdValidator, updateCompanyValidator, getCompanyValidator } from "../middlewares/company-validators.js";
import Company from "./company.model.js";

const router = Router();

/**
 * @swagger
 * /addCompany:
 *   post:
 *     summary: Add a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               entityType:
 *                 type: string
 *               businessCategory:
 *                 type: string
 *               impactLevel:
 *                 type: string
 *               yearsOfExperience:
 *                 type: number
 *     responses:
 *       200:
 *         description: Company added successfully
 *       500:
 *         description: Error adding company
 */
router.post("/addCompany", createCompanyValidator, saveCompany);

/**
 * @swagger
 * /findCompany/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The company ID
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Company not found
 *       500:
 *         description: Error retrieving company
 */
router.get("/findCompany/:id", getCompanyByIdValidator, getCompanyById);

/**
 * @swagger
 * /getCompanys:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: List of companies
 *       500:
 *         description: Error retrieving companies
 */
router.get("/getCompanys", getCompanyValidator, getCompanys);

/**
 * @swagger
 * /updateCompany/{id}:
 *   put:
 *     summary: Update a company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               entityType:
 *                 type: string
 *               businessCategory:
 *                 type: string
 *               impactLevel:
 *                 type: string
 *               yearsOfExperience:
 *                 type: number
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Error updating company
 */
router.put("/updateCompany/:id", updateCompanyValidator, updateCompany);

/**
 * @swagger
 * /generateReport:
 *   get:
 *     summary: Generate a report of companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       500:
 *         description: Error generating report
 */
router.get("/generateReport", generateReport);

export default router;