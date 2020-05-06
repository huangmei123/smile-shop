<template>
    <div>
        <div class="navbar-div">
             <van-nav-bar   title="类别列表" /> 
        </div>
        <div>
            <van-row>
                <van-col span="6">
                   <div id="leftNav">
                       <ul>
                           <!-- template里的方法进行class动态绑定 -->
                           <li @click="clickCategory(index,item.ID)" :class="{categoryActice:categoryIndex==index}" v-for="(item , index) in category" :key="index">
                               {{item.MALL_CATEGORY_NAME}}
                           </li>
                       </ul>
                  </div>
                </van-col>
                <van-col span="18">
                    <!-- 使用vant的tabs组件实现联动 -->
                    <div class="tabCategorySub">
                      <van-tabs v-model="active" @click="onClickCategorySub">
                          <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                          </van-tab>
                      </van-tabs>
                  </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                category:[], 
                categoryIndex:0, //反白操作，控制导航变白，默认第一个类别是白色的
            }
        },

        created(){
            this.getCategory();
           
        },
        mounted(){
            //让左侧当行适应页面高度
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height= winHeight-46 +'px'
        },
        methods:{
            getCategory() {
                axios({
                    url:url.getCateGoryList,
                    method:'get',
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code == 200 && response.data.message ){
                      this.category = response.data.message
                      this.getCategorySubByCategoryID(this.category[0].ID)
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                })        
            },
            //点击大类的方法
            clickCategory(index){
                this.categoryIndex=index

            },
            //根据大类ID读取小类类别列表
            getCategorySubByCategoryID(categoryId){
                axios({
                    url:url.getCateGorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code==200 && response.data.message){
                        this.categorySub=response.data.message
                        this.active=0
                        // this.categorySubId = this.categorySub[0].ID
                        // this.onLoad()
                    }else{
                        Toast('服务器错误，数据取得失败')
                    } 
                })
                .catch(error=>{
                    console.log(error)
                })
            },
        }
    }
</script>

<style scoped>
#leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }


    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>