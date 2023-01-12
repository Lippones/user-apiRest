const User = require('../models/User')
const Token = require('../models/Tokens')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret=  jwt.secret = 'dwpq2jnza4'

class UserController{
    async index(req,res){
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async findUser(req,res){
        const id = req.params.id
        const users = await User.findById(id)
        if(users.length > 0){
            res.status(200).json(users)
        }else{
            res.status(404).json({})
        }
    }
    async create(req,res){
        const {email,name,password,role} = req.body
        try{   
            if(email == "" || email == undefined){
                res.status(400).json({error: "Invalid"})
                return
            }else if(name == "" || name == undefined){
                res.status(400).json({error: "Invalid"})
                return
            }else if(password == "" || password == undefined){
                res.status(400).json({error: "Invalid"})
                return
            }
            const result = await User.new(email,name,password,role)
            if(result){
                res.status(201).json({mensage:'Created'})
            }else{
                res.status(406).json({error: "Email already exists"})
            }
            

        }catch(err){
            console.log(err)
        }
    }
    async edit(req,res){
        const {id,name,role,email} = req.body
        const result = await User.update(id,email,name,role)
        if(result != undefined){
            if(result.status){
                res.send("ok").status(200)
            }else{
            res.send(result.err).status(400)
            }
        }else{
            res.status(406).json({error:"Bad request"})
        }
    }
    async delete(req,res){
        const id = req.params.id
        if(id != undefined){
            const result = await User.delete(id)
            if(result != undefined){
                res.status(202).json({mensage:"Deleted"})
            }else{
                res.status(400).json({mensage:'user not found'})
            }
        }else{
            res.status(400).json({error:"Bad request"})
        }
    }
    async recoverPassword(req,res){
        const {email} = req.body
        const result = await Token.create(email)
        if(result.status){
            res.status(200).json(result.token)
        }else{
            res.status(406).json()
        }
    }
    async changePassword(req,res){
        const token = req.body.token
        const password = req.body.password

        const isTokenValid = await Token.validate(token)
        try {
            if(isTokenValid.status){
                await User.changePassword(isTokenValid.token.user_id,isTokenValid.token.token,password)
                res.status(200).json({mensage:"Password changed"})
            }else{
                res.status(406).json({mensage:"token invalid"})
            }
        } catch (error) {
            res.status(400)
        }
    }
    async login(req,res){
        const {email,password} = req.body
        const user = await User.findByEmail(email)
        if(user != undefined){
            const result = await bcrypt.compare(password, user[0].password)
            if(result){
                var token = jwt.sign({ email:user[0].email, role:user[0].role },secret );
                res.status(200).json(token)
            }else{
                res.status(400).json({err:"password mismatch"})
            }
        }else{
            res.status(400).json({status:false})
        }
    }
}

module.exports = new UserController()