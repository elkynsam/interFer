import Admin from "../admin/admin.model.js"
import Company from "../company/company.model.js"

export const emailExists = async (email = "") => {
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await Admin.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const adminExists = async (aid = " ") => {
    const existe = await Admin.findById(aid)
    if(!existe){
        throw new Error("No existe el administrador con el ID proporcionado")
    }
}

export const companyExists = async (id = " ") => {
    const existe = await Company.findById(id)
    if(!existe){
        throw new Error("No existe la empresa con el ID proporcionado")
    }
}