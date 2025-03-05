import { hash, verify } from "argon2";
import Admin from "./admin.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

export const getAdminById = async (req, res) => {
    try{
        const { aid } = req.params;
        const admin = await Admin.findById(aid)

        if(!admin){
            return res.status(404).json({
                success: false,
                message: "Administrador no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            admin
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el administrador",
            error: err.message
        })
    }
}

export const getAdmins = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, admins ] = await Promise.all([
            Admin.countDocuments(query),
            Admin.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            admins
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los administradores",
            error: err.message
        })
    }
}

export const deleteAdmin = async (req, res) => {
    try{
        const { administrador } = req
        
        const admin = await Admin.findByIdAndUpdate(administrador.aid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Administrador eliminado",
            admin
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el administrador",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { aid } = req.params
        const { newPassword } = req.body

        const admin = await Admin.findById(aid)

        const matchOldAndNewPassword = await verify(admin.password, newPassword)

        if(matchOldAndNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await Admin.findByIdAndUpdate(aid, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const updateAdmin = async (req, res) => {
    try {
        const { aid } = req.params;
        const  data  = req.body;

        const admin = await Admin.findByIdAndUpdate(aid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Administrador Actualizado',
            admin,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar administrador',
            error: err.message
        });
    }
}

export const updateProfilePicture = async (req, res) => {
    try{
        const { aid } = req.params
        let newProfilePicture = req.file ? req.file.filename : null

        if(!newProfilePicture){
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la petición"
            })
        }

        const admin = await Admin.findById(aid)

        if(admin.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", admin.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        admin.profilePicture = newProfilePicture
        await admin.save()

        return res.status(200).json({
            success: true,
            message: "Foto actualizada",
            profilePicture: admin.profilePicture,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la foto",
            error: err.message
        })
    }
}