const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

app.use(bodyParser())
app.use(cors())

let goods = require('./appApi/goods.js')
let home = require('./appApi/home.js')
let user = require('./appApi/user.js')

//装载所有子路由
//egg.js
let router = new Router()
router.use('/user',user.routes())
router.use('/home',home.routes())
router.use('/goods',goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    /*const User = mongoose.model('User')
    let oneUser = new User({userName:'jspang13',password:'123456'})

    oneUser.save().then(()=>{
        console.log('插入成功')*/

    })
//let  users = await  User.findOne({}).exec()

console.log('------------------')
console.log(users)
console.log('------------------')  
})()


app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})