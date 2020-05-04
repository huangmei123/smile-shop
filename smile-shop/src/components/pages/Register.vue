<template>
    <div>
       <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />

        <div class="register-panel">
        <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            @click-icon="username = ''"
        />

        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        <div class="register-button">
            <van-button type="primary" @click="registerAction" size="large" :loading="openLoading">马上注册</van-button>
        </div>
       </div>

    </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false,//是否开启用户的Loading
                usernameErrorMsg:'',//当用户名和密码为空，不给用户任何操作，只有按下注册按钮才进行检查提示
                passwordErrorMsg:'',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
            },
            registerAction(){
                this.checkForm() && this.axiosRegisterUser()
            },

            //编写axios用户注册方法
            //防重复的设置openLoading 
            //在一开始，就把注册按钮变成loading状态，注册失败后取消loading，成功就
            //跳转个人中心页面。
            axiosRegisterUser(){
                    axios({
                    url: url.registerUser,
                    method: 'post',
                    data:{
                        userName:this.username,
                        password:this.password 
                    }
                })
                .then(response => {
                    console.log(response)
                    //如果返回code为200，代表注册成功，我们给用户作Toast提示
                    if(response.data.code == 200){
                        Toast.success('注册成功')
                        this.$router.push('/')
                    }else{
                        console.log(response.data.message)
                        Toast.fail('注册失败')
                        this.openLoading=false
                    }
                        console.log(response.data.code)
                })
                .catch((error) => {   
                    Toast.fail('注册失败')  
                    this.openLoading = false
                })

            },
            checkForm(){
                let isOk= true
                if(this.username.length<5){
                    this.usernameErrorMsg="用户名不能小于5位"
                    isOk= false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<6){
                    this.passwordErrorMsg="密码不能少于6位"
                    isOk= false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            }
        },
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>