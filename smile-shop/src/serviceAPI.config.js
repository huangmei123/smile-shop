const BASEURL = "https://www.easy-mock.com/mock/5eab84dc0a92d726eae93bf2/SmileVue/"
// const LOCALURL = "http://localhost:3000/"

const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    //加入LOCALURL常量的声明，用于存储本地请求路径，和在url里增加registerUser接口的地址配置
    // registerUser : LOCALURL+'user/register',  //用户注册接口
}

module.exports = URL