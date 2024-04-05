// using class structure for user model
const clc = require("cli-color");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
const { userModel } = require("../Schemas/UserSchema");
const { departmentModel } = require("../Schemas/DepartmentSchema");

const User = class {
    username;
    name;
    password;
    email;
    role;
    deptName;

    constructor({name, email, username, password, role, department}) {
        this.name = name;
        this.email = email.toLowerCase();
        this.password = password;
        this.username = username;
        this.role = role;
        this.deptName = department;
    }

    static isUserAlreadyPresent({ username, email}){
        //  the email and username already exist in DB hence no use of SignUp
        return new Promise(async(resolve, reject)=>{
            try{
                const userFound = await userModel.findOne({
                    $or: [{email}, {username}],
                });
                // console.log(clc.redBright.bgYellow("user already present in database"))
                console.log(userFound)
                if(userFound && userFound.email === email){
                    reject("This email already exists, use another or simply login")
                }
                if(userFound && userFound.username === username){
                    reject("This username already exists, use another or simply login")
                }
                resolve();
            } catch(err){
                // console.error(err);
                reject(err);
            }
        })
    }

    static findUserInDB({ key }){
        return new Promise(async(resolve, reject)=>{
            console.log(clc.bgMagenta.underline("key: ", key))
            try{
                const userFound = await userModel.findOne({
                    $or: [{email: key.toLowerCase()}, {username: key}]
                }).select("+password")
                console.log( "user found: ", userFound);
                if(!userFound) reject("user not found")
                resolve(userFound);
            } catch(err){
                reject(err);
            }
        })
    }

    createUser(){
        return new Promise( async(resolve, reject)=>{
            // find if a department already exist with that name
            let departmentName = this.deptName;
            let departmentDoc = await departmentModel.findOne({name: departmentName})
            console.log("departmentDoc", departmentDoc)
            if (!departmentDoc) {
                departmentDoc = new departmentModel({name: departmentName});
            }

            const userObjForDB = new userModel({
                name: this.name,
                email: this.email,
                username: this.username,
                password: this.password,
                role: this.role,
                department: departmentDoc._id,
            })
            if (this.role == "employee") {
                departmentDoc.employees.push(userObjForDB._id)
            } else {
                departmentDoc.manager.push(userObjForDB._id)
            }
            try{
                const userDoc = await userObjForDB.save();
                const deptDoc = await departmentDoc.save();
                resolve(userDoc);
            } catch(err){
                reject(err);
            }
        })
    }
}

module.exports = User;