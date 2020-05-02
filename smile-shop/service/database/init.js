const mongoose = require('mongoose')
const db = "mongodb://127.0.0.1:27017/smile-vue"

mongoose.Promise=global.Promise

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
    //最大连接数 数据库连接达到一定次数，抛出异常
    let  maxConnectTimes = 0
    //把所有连接放到这里
    return new Promise((resolve,reject)=>{
    //增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('***********数据库断开***********')
           //抛出异常后 用reject（）通知Promise
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.....')
            }
        
        })

        //数据库出现错误的时候
        mongoose.connection.on('error',(err)=>{
            console.log(err,'***********数据库错误')
            mongoose.connect(db)
        })
        //链接打开的时候
        mongoose.connection.once('open',()=>{
            console.log('MongoDB connected successfully')   
        })
    })
}