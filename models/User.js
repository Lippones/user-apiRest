const bcrypt = require('bcrypt')
const Users = require('../Users/User')
const Token = require('./Tokens')
class User{
    async new(email,name,password,role){
        try {
            const hash = await bcrypt.hash(password, 10)
            await Users.create({
                email,
                name,
                password: hash,
                role
            })
            return true
        } catch (error) {
            return false
        }
    }
    async findById(id){
        try{
            const res = await Users.findAll({
                where:{
                    id:id
                },
                attributes: ['id','email', 'name', 'role']
                
            })
            if(res.length > 0){
                return res
            }else{
                return []
            }
        }catch(error){
            console.log(error)
            return []
        }
    }
    async findByEmail(email){
        try{
            const res = await Users.findAll({
                where:{
                    email
                },
                attributes: ['id','email','password', 'name', 'role']
                
            })
            if(res.length > 0){
                return res
            }else{
                return []
            }
        }catch(error){
            console.log(error)
            return []
        }
    }
    async findAll(){
        try{
            const res = await Users.findAll({
                attributes: ['id','email', 'name', 'role']
            })
            console.log(res)
            return res
        }catch(error){
            console.log(error)
            return []
        }
    }
    async update(id,email,name,role){
        const user = await this.findById(id)
        if(user.length > 0){
            let editUser = {

            }
            if(email != "" || email != undefined){
                if(email != user.email){
                    editUser.email = email
                }
            }else{
                return {status:false, err:"Email already in use"}
            }
            if(name != "" || name != undefined){
                if(name != user.name){
                    editUser.email = name
                }
            }
            if(role != "" || role != undefined){
                if(role != user.role){
                    editUser.email = role
                }
            }
            try{
                await Users.update({
                    email,
                    name,
                    role
                },{
                    where:{
                        id:id
                    }
                })
                return {status:true}
            }catch(err){
                return {status:false, err:"Email already in use"}
            }
        }else{
            return {status:false, err:"User not found"}
        }
    }
    async delete(id){
        try {
           const result = await Users.destroy({where:{id:id}})
           if(result){
            return {status:false, err:"User not found"}
           }
        } catch (error) {
            return {status:false, err:"User not found"}
        }
    }
    async changePassword(id,token,newPassword){
        try{
            const hash = await bcrypt.hash(newPassword,10)
            await Users.update({
            password:hash
            },{
                where:{
                id:id
            }
        })
        await Token.setUsed(token)
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = new User()