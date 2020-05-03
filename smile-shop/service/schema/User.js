const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
let ObjectId = Schema.Types.ObjectId

//创建用户Schema
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    creatAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})
//用pre每次进行保存时都进行加盐加密的操作。
//每次存储数据都要操作
userSchema.pre('save',function(next){
    let.user=this
    console.log(this)
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})

//发布模型
mongoose.model('User',userSchema)