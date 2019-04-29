<template>
    <div class="tieba">
        <div class="search width1210 marginXauto margintop100">
            <el-input placeholder="请输入感兴趣的内容" v-model="searInput">
                    <el-button slot="append" @click="searchQS">进入青说</el-button>
            </el-input>
        </div>
        <div class=" marginXauto margintop150" style="width:1210px;">
            <!-- 头部信息 -->
            <div class="bgcolor-white border">
                <div class="floatLeft relative">
                    <div class="topicImg">
                        <img :src="topicMes.topicProfilePic" alt="" width="150" height="150">
                    </div>
                    <div class=" paddingleft200 margintop10 marginbottom20 head">
                        <div>
                            <span class="Ttitle color-333">{{topicMes.topicName}}</span>
                            <el-button id="concernBtn" :type="concern == '+关注' ? 'danger':'primary'" @click="addConcern">{{concern}}</el-button>
                            <span class="marginleft10 mes" >关注：</span><span style="color:#FF7F3E">{{topicMes.userConcernCount}}</span>
                            <span class="marginleft10 mes" >帖子：</span><span style="color:#FF7F3E">{{topicMes.collectSayCount}}</span>
                            <span class="marginleft10 mes" >文章：</span><span style="color:#FF7F3E">{{topicMes.collectArticleCount}}</span>
                        </div>
                        <div class="margintop5">
                            <span class="desc">简介:{{topicMes.description}}</span>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div class="floatRight margintop15 marginright20">
                    <div class="marginbottom10">
                        <span class="vartivalmiddle fontsize4">创建者:</span>
                        <img class="vartivalmiddle marginleft5" :src="topicMes.createUserProfilePic" alt="" width="30" height="30" style="border-radius:20px;">
                        <span class="vartivalmiddle">{{topicMes.createNikeName}}</span>
                    </div>
                    <div v-if="userId == createUqsId">
                        <el-upload
                          action=""
                          :multiple="false"
                          :show-file-list="false"
                          :http-request="uploadTopicPic"
                          :on-change="selectFile"
                          accept=".jpg,.png,.jpeg"
                        >
                            <el-button type="primary">更改主题头像</el-button>
                        </el-upload>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div>
            <!-- 帖子信息 -->
            <div class="bgcolor-white border margintop10 floatLeft" style="width:800px;">
                <tiebaArticle :topicId="topicId"></tiebaArticle>
            </div>
            <div class="margintop10 marginleft10 floatLeft" style="width:400px;">
                <!-- 大家都在搜 -->
                <hot-key></hot-key>
                <!-- 排行榜 -->
                <rank-list></rank-list>
            </div>
        </div>
    </div>
</template>
<script>
import rankList from '../components/rankList.vue'
import hotKey from '../components/hotKey.vue'
import axion from '@/util/api.js'
import tiebaArticle from '../components/tiebaArticle'
export default {
    components:{ tiebaArticle,rankList,hotKey } ,
    data() {
        return {
            topicId:0,
            userId:localStorage.getItem('userId'),
            createUqsId:'',
            token:localStorage.getItem('user_token'),
            topicName:'',
            concern:'',
            searInput:'',
            topicMes:{},
        }
    },
    mounted() {
        this.topicName = this.$route.query.topic
        window.document.title = this.topicName
        this.getTopicInfo()
    },
    methods: {
        selectFile(file){
            console.log('file',file)
        },
        uploadTopicPic(param){
            console.log('param',param)
            let file = new FormData()
            file.append('image',param.file)
            file.append('topicId',this.topicId)
            file.append('token',this.token)
            axion.uploadTopicPic(file).then( res => {
                if(res.data.retCode == 0) {
                    this.$message.success('更改成功')
                    this.getTopicInfo()
                }else {
                    this.$message.warning(res.data.retInfo)
                }
            })
        },
        getTopicInfo(){
            axion.getTopicInfo(this.topicName,this.token).then( res => {
                if(res.data.retCode == 0) {
                    this.topicMes = res.data.param
                    this.topicMes.topicProfilePic = this.$store.state.imgUrl+this.topicMes.topicProfilePic 
                    this.topicMes.createUserProfilePic = this.$store.state.imgUrl + this.topicMes.createUserProfilePic
                    this.topicId = this.topicMes.id
                    this.createUqsId = this.topicMes.createUqsId
                    axion.getConcernTopic(1,100,this.token).then( res => {
                        if(res.data.retCode == 0) {
                            let data = res.data.param.rows
                            for(let i = 0; i<data.length;i++) {
                                if(data[i].id == this.topicId){
                                    this.concern = '已关注/取消'
                                    return;
                                }else {
                                    this.concern = '+关注'
                                }
                            }
                        }else if (res.data.retCode == 50099) {
                            this.concern = '+关注'
                        }
                    })
                    console.log('topicId',this.topicId)
                }else if (res.data.retCode == 50099) {
                    this.$router.push({path:'/404',query:{topicName:this.topicName}})
                }
            })
        },
        addConcern(){
            // let btn = document.getElementById('btn')
            // btn.blur()
            let param = {
                topicId : this.topicId,
                type : '0',
                token : this.token
            }
            if(this.concern == '+关注'){
                param.type = '0'
            }else if(this.concern == '已关注/取消'){
                param.type = '1'
            }
            axion.concernTopic(param).then(res => {
                if(res.data.retCode == 0) {
                    this.getTopicInfo()
                }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                }else{
                    this.$message.warning(res.data.retInfo)
                }
            })
        },
        subTitle(list){
            for(let i = 0;i<list.length;i++){
                if(list[i].title.length > 10){
                    list[i].title = list[i].title.substr(0,10) + '...'
                }
            }
        },
        searchQS(){
            if( this.searInput == ''){
                this.$message.warning('请输入搜索内容')
                return;
            }else {
                let routeData = this.$router.resolve({ path:'/tieba' ,query:{topic:this.searInput}})
                window.open(routeData.href,'_blank');
            }
        }
    },
}
</script>

