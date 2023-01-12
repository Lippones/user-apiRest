const { v4: uuidv4 } = require('uuid');
const Token = require('../Tokens/Tokens')
const User = require('./User.js')
class Tokens{
    async create(email){
            const user = await User.findByEmail(email)
            console.log(user)
            if(user.length != 0){
                try {
                const token = uuidv4()
                await Token.create({
                    user_id:user[0].id,
                    token,
                    used:0,
                })
                return {status:true, token}
                }catch (err) {
                    return {status:false, err}
                }
            }else{
                return {status:false, err:"Email not found"}
            }
        
    }
    async findByEmail(email){
        return await Token.findOne({email})
    }
    async validate(token){
        try {
            const result = await Token.findAll({where:{token:token}})
            if(result.length > 0){
                const tk = result[0];
                console.log(tk)
                if(tk.used != 0){
                    return {status:false}
                }else{
                    return {status:true, token:tk}
                }

            }else{
                return {status:false}
            }
        } catch (error) {
            return {status:false}
        }
    }
    async setUsed(token){
        await Token.update({used:1},{where:{token:token}})
    }
}
module.exports = new Tokens()