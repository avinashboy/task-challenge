// const mongoose = require('mongoose');
// const {DB_URL} = require('../config')
const userModel = require('../models/users.models');
const bcrypt = require('bcrypt')




module.exports ={
    createUser: async ({username, uuid , email, password, confirmationCode})=>{

        const userSave = new userModel({
            username,
            uuid,
            email,
            password,
            confirmationCode
        })
    try {
        await userSave.save()
        return {"message":"Successful created."}
    } catch (error) {
        console.log('error:', error)
        if(error.code) return {"message":"Already in use."}
    }

    },
    checkingPasswordMatch: async ({password, uuid})=>{

        try {
            const data = await userModel.findOne({ uuid: uuid })
            if(!data) return false
            const match = await bcrypt.compare(password, data.password)
            if(!match) return false
            return true
        } catch (error) {
            return "Try again later"
        }
        
    },

    saveHashPassword: async ({hashPassword, uuid})=>{
        try {
        const data = await userModel.updateOne({uuid: uuid}, {$set: {password:hashPassword,confirmationCode: null,status: "Active"}})
        return data.modifiedCount === data.matchedCount
        } catch (error) {
            return "Try again later"
        }
    },

    getDataInfo: async ({uuid, code})=>{
        try {
            await userModel.updateOne({uuid: uuid}, {$set: {confirmationCode: code, status: "Pending"}})
            const data = await userModel.findOne({uuid: uuid})
            return data
            } catch (error) {
                return "Try again later"
            }
    },
    deleteUser: async ({uuid})=>{
        try {
            const data = await userModel.findOne({uuid: uuid})
            if(!data) return false
            await userModel.deleteOne({uuid: uuid})
            return true
            } catch (error) {
                return false
            }
    },
    showUserInfo: async ({uuid})=>{
        try {
            const data = await userModel.findOne({uuid: uuid})
            if(!data) return {message: "Not found"}
            return data
            } catch (error) {
                return {message: "Try again later"}
            }
    }
}