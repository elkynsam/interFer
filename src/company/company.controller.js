'use strict';

import xlsx from 'xlsx';
import Company from './company.model.js';

export const saveCompany = async (req, res) => {
    try {
        const { companyName, entityType, businessCategory, impactLevel, yearsOfExperience } = req.body;

        const newCompany = new Company({
            companyName,
            entityType,
            businessCategory,
            impactLevel,
            yearsOfExperience
        });

        await newCompany.save();

        res.status(200).json({
            success: true,
            message: "Empresa registrada correctamente",
            company: newCompany
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al registrar la empresa",
            error: error.message
        });
    }
};

export const getCompanys = async (req, res) => {
    try {
        const { Filter = 'Ascendente' } = req.body;

        let sortCriteria = {};
        let query = { status: "true" };

        if (Filter && !["A-Z", "Z-A", "Ascendente", "Descendente"].includes(Filter)) {
            query.businessCategory = Filter;
        }

        if (Filter === "A-Z") {
            sortCriteria["companyName"] = 1;
        } else if (Filter === "Z-A") {
            sortCriteria["companyName"] = -1;
        } else if (Filter === "Ascendente") {
            sortCriteria["yearsOfExperience"] = 1;
        } else if (Filter === "Descendente") {
            sortCriteria["yearsOfExperience"] = -1;
        }

        const companies = await Company.find(query)
            .sort(sortCriteria);

        return res.status(200).json({
            success: true,
            companies
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        });
    }
};

export const getCompanyById = async(req, res) => {
    try{
        const { id } = req.params
        const company = await Company.findById(id)

        if(!company){
            return res.status(404).json({
                success: false,
                message: "Empresa no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            company
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la empresa",
            error: err.message
        })
    }
}

export const updateCompany = [
    async (req, res) => {
        const { id } = req.params;
        const { companyName, entityType, businessCategory, impactLevel, yearsOfExperience } = req.body;

        let updateData = {};

        if (companyName) updateData.companyName = companyName;
        if (entityType) updateData.entityType = entityType;
        if (businessCategory) updateData.businessCategory = businessCategory;
        if (impactLevel) updateData.impactLevel = impactLevel;
        if (yearsOfExperience) updateData.yearsOfExperience = yearsOfExperience;

        try {
            const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedCompany) {
                return res.status(404).json({ message: "Empresa no encontrada" });
            }

            return res.status(200).json({
                message: "Empresa actualizada correctamente",
                company: updatedCompany
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error al actualizar la empresa",
                error: err.message
            });
        }
    },
];

export const generateReport = async (req, res) => {
    try {
        console.log('Iniciando la consulta de compañías...');

        const companies = await Company.find();

        if (!companies || companies.length === 0) {
            console.log('No se encontraron compañías.');
            return res.status(404).send("No se encontraron compañías.");
        }

        console.log(`Se encontraron ${companies.length} compañías.`);

        const data = companies.map(comp => ({
            ID: comp._id,
            CompanyName: comp.companyName,
            EntityType: comp.entityType,
            BusinessCategory: comp.businessCategory,
            ImpactLevel: comp.impactLevel,
            YearsOfExperience: comp.yearsOfExperience,
            'Fecha de Creación': comp.createdAt,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, 'Companies');

        const filePath = './reports/reporte_companies.xlsx';
        xlsx.writeFile(wb, filePath);

        console.log('Reporte generado exitosamente.');

        res.download(filePath, 'reporte_companies.xlsx', (err) => {
            if (err) {
                console.error("Error al descargar el archivo:", err);
                res.status(500).send("Error al generar el reporte.");
            }
        });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).send("Error al obtener las compañías.");
    }
};