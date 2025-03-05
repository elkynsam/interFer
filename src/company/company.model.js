import { Schema, model } from "mongoose";

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        required: true
    },
    businessCategory: {
        type: String,
        required: true
    },
    impactLevel: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true,
    versionKey: false
});

export default model('Company', companySchema);