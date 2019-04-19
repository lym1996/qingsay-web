<template>
    <div class="artContent">
        <!-- 为主题 -->
        <div  class="width1210 marginXauto " style="margin-top:44.8px;">
            <!-- 头部信息 -->
            <div>
                <div class="paddingtop20 paddingleft20 paddingbottom20 bgcolor-white border-bottom border-left border-right" style="background-color:#F2F4F7;">
                    <div class="floatLeft">
                        <img :src="topicInfo.topicProfilePic" alt="" width="60" height="60" class="vartivalmiddle">
                        <span class="fontsize10 marginleft20 vartivalmiddle">{{topicInfo.topicInfo}}java</span>
                        <span class="mes marginleft20 vartivalmiddle">关注:</span><span class=" marginleft10 vartivalmiddle " style="color:#FF7F3E">{{topicInfo.userConcernCount}}</span>
                        <span class="mes marginleft20 vartivalmiddle">帖子:</span><span class="marginleft10 vartivalmiddle" style="color:#FF7F3E">{{topicInfo.collectSayCount}}</span>
                        <span class="mes marginleft20 vartivalmiddle">文章:</span><span class="marginleft10 vartivalmiddle" style="color:#FF7F3E">{{topicInfo.collectArticleCount}}</span>
                        <div class="marginleft80 desc">简介 :   {{topicInfo.description}}</div>
                    </div>
                    <div class="floatRight marginright20 margintop20">
                        <span class="vartivalmiddle fontsize2">创建者:</span>
                        <img class="vartivalmiddle marginleft5" :src="topicInfo.createUserProfilePic" alt="" width="30" height="30" style="border-radius:20px;">
                        <span class="vartivalmiddle">{{topicInfo.createNikeName}}</span>
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </div>
            <div>
                <!-- 帖子部分 -->
                <div class="floatLeft width800 bgcolor-white border-left border-right border-bottom">
                    <!-- 标题 -->
                    <div class="paddingX20 padding20X border-bottom">
                        <div class="floatLeft">
                            <span class="fontsize4">{{articleInfo.title}}</span>
                        </div>
                        <div class="floatRight">
                            <el-button>点赞</el-button>
                            <el-button>收藏</el-button>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <!-- 帖子内容 -->
                    <div>
                        <div class="floatLeft textAlignCenter">
                            <!-- <div class="floatRight">
                                <span>楼主</span>
                            </div> -->
                            <div class="marginX20 margintop20 paddingX5 border paddingtop5 bgcolor-white">
                                <img :src="articleInfo.profilePic" alt="" width="80" height="80">
                            </div>
                            <div class="margintop15 marginbottom5">
                                <span class=" fontsize0" style="color:#FFA640">{{articleInfo.nickName}}</span>
                            </div>
                        </div>
                        <div class="floatLeft">
                            <div class="marginX20 margin20X ">
                                <div class="Acontent" style="width:620px;" v-html="articleInfo.content"></div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                </div>
                <div class="floatRight width400 bgcolor-white marginleft10">
                    222
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
        <!-- 为文章 -->
        <div v-if="articleInfo.type == 1">

        </div>
        <!-- 评论 -->
        <div>

        </div>
    </div>
</template>
<script>
import axion from '@/util/api.js'
export default {
    data() {
        return {
            token:localStorage.getItem('user_token'),
            topicId:-1,
            articleId:0,
            articleInfo:{},
            topicInfo:{}
        }
    },
    watch: {
        topicId(val,oldValue) {
            this.getTopicInfo()
            sessionStorage.setItem('topicId',this.topicId)
        }
    },
    mounted() {
        this.articleId = this.$route.query.articleId
        this.getArticleInfo()
    },
    methods: {
        getArticleInfo(){
            axion.getArticleInfo(this.articleId).then( res => {
                if(res.data.retCode == 0) {
                    this.articleInfo = res.data.param
                    this.topicId = this.articleInfo.topicId
                    this.articleInfo.profilePic = this.$store.state.imgUrl + this.articleInfo.profilePic
                    console.log(this.articleInfo.profilePic)
                }
            })
        },
        getTopicInfo(){
            axion.getTopicInfoById(this.topicId,this.token).then(res => {
                if(res.data.retCode == 0) {
                    this.topicInfo = res.data.param
                    this.topicInfo.topicProfilePic = this.$store.state.imgUrl + this.topicInfo.topicProfilePic
                    this.topicInfo.createUserProfilePic = this.$store.state.imgUrl + this.topicInfo.createUserProfilePic
                    console.log(this.topicInfo.topicProfilePic)
                }
            })
        }
    },
}
</script>