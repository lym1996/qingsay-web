<template>
    <div class="home">
        <div>
            <carousel></carousel>
        </div>
        <!-- 搜索框 -->
        <div class="search width1210 marginXauto margintop20">
            <el-input placeholder="请输入感兴趣的内容" v-model="searInput">
                <el-button slot="append" @click="enterQs">进入青说</el-button>
            </el-input>
            <el-button @click="search">搜索</el-button>
        </div>
        <!-- 热门关键词 -->
        <div class="width1210 marginXauto">
            <div style="margin-left:25%;" class="margintop5">
                <img src="../assets/common/img/hot.png" alt="" width="20" style="vertical-align: top;">
                <span>热门关键词 : </span>
                <span v-for="(item,index) in hotKeyWord" :key="index" class="hotword cursorPointer paddingX5 color-333">{{item}}</span>
            </div>
        </div>
        <div class="width1210 marginXauto margintop20 clear marginbottom20">
            <div class="floatLeft bgcolor-white border-color" style="width:800px;">
                <articleBreif></articleBreif>
            </div>
            <div class="floatLeft marginleft10" style="width:400px;">
                <!-- 用户信息 -->
                <div class="bgcolor-white border-color" >
                    <div class="marginleft20 margintop20">
                        <div class="floatLeft" >
                            <img :src="!!isLogin?userInfo.profilePic:userPhoto" alt="" width="80" height="80" style="border-radius:100px;">
                        </div>
                        <div class="floatLeft marginleft20 margintop10">
                            <div>
                                <span v-if="!!isLogin">昵称 : {{userInfo.nickName}}</span>
                                <span v-else>未登录</span>
                            </div>
                            <div v-if="!!isLogin" class="margintop20">
                                <img src="../assets/common/img/concern.png" alt="" width="15">
                                <el-tooltip placement="bottom">
                                    <span>{{userInfo.concernUserCount}}</span>
                                    <div slot="content"><span>关注数 : {{userInfo.concernUserCount}}</span></div>
                                </el-tooltip>
                                <img class="marginleft50" src="../assets/common/img/fans.png" alt="" width="15">
                                <el-tooltip placement="bottom">
                                    <span>{{userInfo.fansCount}}</span>
                                    <div slot="content"><span>粉丝数 : {{userInfo.fansCount}}</span></div>
                                </el-tooltip>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <div class="marginleft20 margintop20">
                        <div class="floatLeft fontsize4"><span v-if="!!token">关注主题</span><span v-else>推荐主题</span></div>
                        <div class="floatRight marginright20"><span v-if="!!token">总数 : {{userInfo.concernTopicCount}}</span></div>
                        <div style="clear:both;"></div>
                        <div class="margintop10">
                            <span class="topic" v-for="(item,index) in topics" :key="index" @click="enterTieba(item.topicName)">{{item.topicName}}</span>
                        </div>
                    </div>
                </div>
                <!-- 排行榜 -->
                <div class="bgcolor-white border-color margintop10">
                    <div class="clear">
                        <div class="floatLeft marginleft10"><img src="../assets/common/img/rank.png" alt="" width="50" style="vertical-align: middle;"><span class="marginleft10 fontsize7 bold" style="vertical-align: middle;">热议榜</span></div>
                        <div class="floatRight margintop10 marginright10 Ttype">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">{{timeType}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,index) in options" :key="index" :command="item.label">{{item.label}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <div class="marginbottom20">
                        <div v-for="(item,index) in rankList" :key="index" class="marginleft20 margintop10">
                            <div v-if="index == 0">
                                <div class="floatLeft">
                                <img src="../assets/common/img/金牌.png" alt="" width="35" style="vertical-align: middle;">
                                <span class="hotPoint marginleft20 fontsize4">{{item.title}}</span>
                                </div>
                                <div class="floatRight">
                                    <span class="fontsize4">{{item.hotValue}}</span>
                                    <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
                                </div>
                                <div style="clear:both;"></div>
                            </div>
                            <div v-if="index == 1">
                                <div class="floatLeft">
                                    <img src="../assets/common/img/银牌.png" alt="" width="35" style="vertical-align: middle;">
                                    <span class="hotPoint marginleft20 fontsize4">{{item.title}}</span>
                                </div>
                                <div class="floatRight">
                                    <span class="fontsize4">{{item.hotValue}}</span>
                                    <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
                                </div>
                                <div style="clear:both;"></div>
                            </div>
                            <div v-if="index == 2">
                                <div class="floatLeft">
                                    <img src="../assets/common/img/铜牌.png" alt="" width="35" style="vertical-align: middle;">
                                    <span class="hotPoint marginleft20 fontsize4">{{item.title}}</span>
                                </div>
                                <div class="floatRight">
                                    <span class="fontsize4">{{item.hotValue}}</span>
                                    <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
                                </div>
                                <div style="clear:both;"></div>
                            </div>
                            <div v-if="index > 2" class="marginleft5 margintop20">
                                <div class="floatLeft">
                                    <div class="fontsize4 rankitem floatLeft"><span class="floatRight">{{index+1}}</span></div>
                                    <div class="hotPoint marginleft30 fontsize4 floatLeft">{{item.title}}</div>
                                    <div style="clear:both;"></div>
                                </div>
                                <div class="floatRight">
                                    <span class="fontsize4">{{item.hotValue}}</span>
                                    <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
                                </div>
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axion from '@/util/api.js'
import carousel from '../components/carousel'
import articleBreif from '../components/recommendArticle.vue'
import userPhoto from '../assets/common/img/default.png'
export default {
    components: { carousel, articleBreif },
    data() {
        return {
            userPhoto:userPhoto,
            token:localStorage.getItem('user_token'),
            isLogin:localStorage.getItem('isLogin'),
            userInfo:{},
            searInput:'',
            timeType:'天',
            hotKeyWord:[],
            options:[{
                label:'天',
                value:0
            },{
               label:'周',
                value:1
            },{
                label:'月',
                value:2
            }],
            rankList:[],
            topics:[]
        }
    },
    mounted() {
        this.getUserInfo()
        this.getTopic()
        this.getKeyWord()
        this.getRankList('天')
    },
    methods: {
        getUserInfo(){
            let param = {
                token:this.token
            }
            axion.getUserInfo(param).then( res => {
                if(res.data.retCode == 0) {
                    this.userInfo = res.data.param
                    this.userInfo.profilePic = this.$store.state.imgUrl+this.userInfo.profilePic
                    console.log('11',this.userInfo.profilePic)
                }
            })
        },
        getTopic(){
            if(!!this.token) {
                axion.getloginTopic(this.token).then( res => {
                    if(res.data.retCode == 0) {
                        this.topics = res.data.param.rows
                        this.subTopic(this.topics)
                    }
                })
            }else {
                axion.getNologinTopic().then( res => {
                    if(res.data.retCode == 0) {
                        this.topics = res.data.param
                        this.subTopic(this.topics)
                    }
                })
            }
        },
        getKeyWord(){
            axion.getKeyWord().then(res => {
                if(res.data.retCode == 0) {
                    this.hotKeyWord = res.data.param
                }
            })
        },
        enterQs(){
            if( this.searInput == ''){
                this.$message.warning('请输入搜索内容')
                return;
            }else {
                let routeData = this.$router.resolve({ path:'/tieba' ,query:{topic:this.searInput}})
                window.open(routeData.href,'_blank');
            }
        },
        enterTieba(topicName){
                let routeData = this.$router.resolve({ path:'/tieba' ,query:{topic:topicName}})
                window.open(routeData.href,'_blank');
        },
        search(){},
        handleCommand(command){
            this.timeType = command
            this.getRankList(this.timeType)
        },
        getRankList(type){
            console.log(type)
            if(this.timeType == '天') {
                axion.getDailyRank().then( res => {
                    if(res.data.retCode == 0) {
                        this.rankList = res.data.param
                        this.subTitle(this.rankList)
                    }
                })
            }else if(this.timeType == '周') {
                axion.getWeekRank().then( res => {
                    if(res.data.retCode == 0) {
                        this.rankList = res.data.param
                        this.subTitle(this.rankList)
                    }
                })
            }else if(this.timeType == '月') {
                axion.getMonthRank().then( res => {
                    if(res.data.retCode == 0) {
                        this.rankList = res.data.param
                        this.subTitle(this.rankList)
                    }
                })
            }
        },
        subTitle(list){
            for(let i = 0;i<list.length;i++){
                if(list[i].title.length > 10){
                    list[i].title = list[i].title.substr(0,10) + '...'
                }
            }
        },
        subTopic(list){
           for(let i = 0;i<list.length;i++){
                if(list[i].topicName.length > 5){
                    list[i].topicName = list[i].topicName.substr(0,5) + '...'
                }
            } 
        }
    },
}
</script>
