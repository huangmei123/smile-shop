const Koa = require('koa')
const {connect} = require('./database/init.js')
const app = new Koa()

app.use(async(ctx) =>{
    ctx.body=`<h1>hello Koa</h>`
})
//立即执行函数
;(async ()=>{
    await connect()
    initSchemas()
})()

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})