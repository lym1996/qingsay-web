<template>
    <div class="nav width100pct">
        <div class="width1210 marginXauto clear"> 
            <div class="floatLeft ">
                <ul class="lineheight45 margintop0" style="list-style:none;">
                    <li v-for="(item,index) in navlist" :key="index" class="navlist marginLeft50 floatLeft">
                        <a :href="item.url" target="_blank">{{item.title}}</a>
                    </li>
                </ul>
            </div>
            <div class="userInfo floatRight margintop10">
                <div v-if="isLogin">
                    <el-popover
                    placement="bottom"
                    width="30"
                    trigger="hover">
                    <div>
                        <div class="dongtai paddingtop10 paddingbottom10 paddingleft35 cursorPointer" @click="goPerson">个人空间</div>
                        <div class="dongtai paddingtop10 paddingbottom10 paddingleft45 cursorPointer" @click="logout">退出</div>
                    </div>   
                    <img slot="reference" :src="userInfo.profilePic" width="30" height="30" alt="" class="cursorPointer"  style="vertical-align: middle;border-radius:20px;">
                    </el-popover>
                    
                    <el-popover
                        placement="bottom"
                        width="30"
                        trigger="hover"
                        >
                        <div>
                            <div class="message cursorPointer" @click="checkMes(0)">粉丝消息<span class="mesRed" v-show="!!fansMsg">{{fansMsg}}</span></div>
                            <div class="message cursorPointer" @click="checkMes(1)"><span>评论我的</span><span class="mesRed" v-show="!!backme">{{backme}}</span></div>
                            <div class="message cursorPointer" @click="checkMes(2)">点赞我的<span class="mesRed" v-show="!!love">{{love}}</span></div>
                            <div class="message cursorPointer" @click="checkMes(3)">系统通知<span class="mesRed" v-show="!!xtMes">{{xtMes}}</span></div>
                            <div class="message cursorPointer" @click="checkMes(4)">我的私信<span class="mesRed" v-show="!!myMes">{{myMes}}</span></div>
                        </div>
                        <span class="navright" slot="reference">消息</span>
                    </el-popover>
                    <el-popover
                        placement="bottom"
                        width="400"
                        trigger="hover">
                        <el-tabs v-model="dynamicActive" @tab-click="handleClick">
                            <el-tab-pane label="青说" name="first">
                                <div v-if="loveMes.length != 0">
                                    <div class="scroll" style="height:200px;">
                                      <el-scrollbar  :native="false" style="height:100%;">
                                        <div v-for="(item,index) in loveMes" :key="index" class="paddingtop10 paddingbottom10 paddingleft10 clear dongtai">
                                            <img :src="item.profilePic" alt="" width="40" height="40" class="floatLeft">
                                            <div class="floatLeft marginleft10">
                                                <div><i class="el-icon-edit-outline"></i><span class="marginleft5 marginright30 fontsize2 cursorPointer">{{item.nickName}}</span><span class="color-999">投稿了</span></div>
                                                <div><span class="titleS" @click="lookArticle(item.id)">{{item.title}}</span></div>
                                            </div>
                                            <img class="floatRight marginright20" v-if="dynamicArticleTime < item.createTime" src="../assets/common/img/new.png" width="40" alt="">
                                        </div>
                                      </el-scrollbar>
                                    </div>
                                    <el-button type="primary" style="padding:12px 159px;" @click="checkMes(5)">查看全部</el-button>
                                </div>
                                <div v-if="loveMes.length == 0" class="textAlignCenter fontsize4">
                                    <span>暂无动态</span>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="文章" name="second">
                                <div v-if="loveMes.length != 0">
                                    <div class="scroll" style="height:200px;">
                                      <el-scrollbar  :native="false" style="height:100%;">
                                        <div v-for="(item,index) in loveMes" :key="index" class="paddingtop10 paddingbottom10 paddingleft10 clear dongtai">
                                            <img :src="item.firstContentPic?item.firstContentPic:item.profilePic" alt="" width="40" height="40" class="floatLeft">
                                            <div class="floatLeft marginleft10">
                                                <div><i class="el-icon-edit-outline"></i><span class="marginleft5 marginright30 fontsize2 cursorPointer">{{item.nickName}}</span><span class="color-999">投稿了</span></div>
                                                <div><span class="titleS" @click="lookArticle(item.id)">{{item.title}}</span></div>
                                            </div>
                                            <img class="floatRight marginright20" v-if="dynamicArticleTime < item.createTime" src="../assets/common/img/new.png" width="40" alt="">
                                        </div>
                                      </el-scrollbar>
                                    </div>
                                    <el-button type="primary" style="padding:12px 159px;" @click="checkMes(6)">查看全部</el-button>
                                </div>
                                <div v-if="loveMes.length == 0" class="textAlignCenter fontsize4">
                                    <span>暂无动态</span>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <span class="navright" style="font-size:14px;" slot="reference">动态</span>
                    </el-popover>
                    <el-popover
                        placement="bottom"
                        width="400"
                        trigger="hover">
                            <div v-if="collectList.length != 0" class="textAlginCenter">
                                <ul style="list-style:disc;">
                                    <li class="textAlginCenter dongtai paddingbottom10 paddingtop10 paddingleft10 paddingright10 fontsize4 cursorPointer" v-for="(item,index) in collectList" :key="index" @click="checkMes(7)">{{item.folderName}}</li>
                                </ul>
                                <el-button class="margintop10" type="primary" style="padding:12px 159px;" @click="checkMes(7)">查看收藏</el-button>
                            </div>
                            <div v-if="collectList.length == 0" class="textAlignCenter fontsize4">
                                    <span>暂无收藏</span>
                            </div>
                        <span class="navright" style="font-size:14px;" slot="reference">收藏</span>
                    </el-popover>
                </div>
                <div v-else class="loginBtn">
                    <el-button type="text" @click="loginshow(0)">登录</el-button>
                    <el-button type="text" @click="loginshow(1)">注册</el-button>
                </div>
            </div>
            <b-modal id="modal-login" ref="modalLogin" centered class="choosePerson clear">
				<login v-if="!ifLogin" :tabIndex="tabIndex" @switchTab="switchTab" @close="loginhide"></login>
			</b-modal>
        </div>
    </div>
</template>
<script>
import login from '../components/login'
import axion from '@/util/api.js'
export default {
    components:{ login },
    data() {
        return {
            dynamicArticleTime:localStorage.getItem('dynamicArticleTime'),
            token:localStorage.getItem('user_token'),
            userId:localStorage.getItem('userId'),
            isLogin:localStorage.getItem('isLogin'),
            ifLogin:true,
            tabIndex:'',
            fansMsg:0,
            backme:0,
            love:0,
            xtMes:0,
            myMes:0,
            userInfo:{},
            pageNum:1,
            pageSize:10,
            pages:1,
            type:1,
            loveMes:[],
            collectList:[],
            navlist:[{
                title:'首页',
                url:'#/home'
            },{
                title:'Java',
                url:'#/tieba?topic=java'
            },{
                title:'DNF',
                url:'#/tieba?topic=dnf'
            },{
               title:'足球',
                url:'#/tieba?topic=足球' 
            },{
               title:'冒险岛',
                url:'#/tieba?topic=冒险岛' 
            }],
            dynamicActive:'first',
        }
    },
    created() {
        if(this.$route.query.from == 'admin'){
            if(!this.token || this.token != this.$route.query.token){
                console.log('3333')
                localStorage.setItem('user_token',this.$route.query.token)
                console.log(this.$route.query.token)
                this.token = localStorage.getItem('user_token');
                localStorage.setItem('userId',this.$route.query.userId)
                this.userId = localStorage.getItem('userId')
                localStorage.setItem('isLogin', true)
                this.isLogin = localStorage.getItem('isLogin');
            }
        }
    },
    mounted() {
        console.log('token',localStorage.getItem('user_token'))
        console.log('isLogin',this.isLogin)
        this.getUserInfo()
        this.getMessage()
        // console.log(scrollDiv,'123')
        this.dynamicArticle()
        this.getCollection()               
    },
    updated(){
        if(this.loveMes.length != 0){
        let scrollDiv = document.getElementsByClassName('el-scrollbar__wrap')[0]
        console.log('div',scrollDiv)
        scrollDiv.addEventListener('scroll',this.scrollEvent)
        let scrollDiv2 = document.getElementsByClassName('el-scrollbar__wrap')[1]
        console.log('div',scrollDiv)
        scrollDiv2.addEventListener('scroll',this.scrollEvent)
        }
    },
    methods: {
        handleClick(tab,event) {
            this.pageNum = 1
            this.pageSize = 10
            this.pages = 1
            this.loveMes = []
            this.dynamicActive = tab.name
            this.dynamicArticle()
        },
        scrollEvent(){
            let dom = document.getElementsByClassName('el-scrollbar__wrap')[0]
            let scrollTop = dom.scrollTop
            let wholeHeight = dom.scrollHeight
            let divHeight = dom.clientHeight
            if(scrollTop+divHeight >= wholeHeight) {
                if(this.pages > this.pageNum){
                    this.pageNum++
                    this.dynamicArticle()
                }
            }
            let dom2 = document.getElementsByClassName('el-scrollbar__wrap')[0]
            let scrollTop2 = dom.scrollTop
            let wholeHeight2 = dom.scrollHeight
            let divHeight2 = dom.clientHeight
            if(scrollTop2+divHeight2 >= wholeHeight2) {
                if(this.pages > this.pageNum){
                    this.pageNum++
                    this.dynamicArticle()
                }
            }
        },
        dynamicArticle(){
            if(this.dynamicActive == 'first') {
                this.type = 0
            }else if(this.dynamicActive == 'second') {
                this.type = 1
            }
            axion.dynamicArticle(this.type,this.pageNum,this.pageSize,this.token).then( res => {
                if(res.data.retCode == 0) {
                    let createTime = res.data.param.getLastInfoTime
                    createTime = createTime.replace(new RegExp("-","gm"),"/");
                    let ms = (new Date(createTime)).getTime();
                        localStorage.setItem('dynamicArticleTime',ms)
                    this.pages = res.data.param.dynamicArticleDTOs.pages
                    for(let i = 0;i<res.data.param.dynamicArticleDTOs.rows.length;i++){
                        res.data.param.dynamicArticleDTOs.rows[i].profilePic = this.$store.state.imgUrl+res.data.param.dynamicArticleDTOs.rows[i].profilePic
                        let createTime = res.data.param.dynamicArticleDTOs.rows[i].createTime
                        createTime = createTime.replace(new RegExp("-","gm"),"/");
                        let ms = (new Date(createTime)).getTime();
                        res.data.param.dynamicArticleDTOs.rows[i].createTime = ms
                    }
                    for(let i = 0;i<res.data.param.dynamicArticleDTOs.rows.length;i++) {
                        this.loveMes.push(res.data.param.dynamicArticleDTOs.rows[i]);
                    }
                    console.log(this.loveMes,'love')
                }
            })
        },
        getCollection(){
            axion.listFold(this.userId).then(res => {
                if(res.data.retCode == 0) {
                    this.collectList = res.data.param
                }
            })
        },
        getUserInfo(){
            let param = {
                token:this.token
            }
            axion.getUserInfo(param).then( res => {
                if(res.data.retCode == 0) {
                    this.userInfo = res.data.param
                    this.userInfo.profilePic = this.$store.state.imgUrl+this.userInfo.profilePic
                    console.log('11',this.userInfo.profilePic)
                }else if(res.data.retCode == 50004) {
                    localStorage.removeItem('user_token');
                    this.isLogin = false
                    localStorage.removeItem('user_phone')
                    localStorage.removeItem('userId')
                }
            })
        },
        getMessage(){
            axion.getMsgCount(this.token).then( res => {
                if(res.data.retCode == 0) {
                    this.fansMsg = res.data.param.concernMsgCount
                    this.backme = res.data.param.commentMsgCount
                    this.love = res.data.param.praiseMsgCount
                    this.xtMes = res.data.param.systemMsgCount
                    this.myMes = res.data.param.userMsgCount
                    if(this.fansMsg > 99){
                        this.fansMsg = '99+'
                    }
                    if(this.backme > 99){
                        this.backme = '99+'
                    }
                    if(this.love > 99){
                        this.love = '99+'
                    }
                    if(this.xtMes > 99){
                        this.xtMes = '99+'
                    }
                    if(this.myMes > 99){
                        this.myMes = '99+'
                    }
                }
            })
        },
        loginshow(index){
            this.tabIndex = index
            this.ifLogin = false
            setTimeout(() => {
                this.ifLogin = false
            })
            this.$refs.modalLogin.show()
        },
        loginhide(){
            this.$refs.modalLogin.hide()
        },
        switchTab(index){
            this.tabIndex = index
        },
        checkMes(type){
            let routeData = this.$router.resolve({ path:'/personCenter' ,query:{userId:this.userInfo.uqsId,type:type}})
            window.open(routeData.href,'_blank');
        },
        goPerson(){
            let routeData = this.$router.resolve({ path:'/personCenter' ,query:{userId:this.userInfo.uqsId}})
            window.open(routeData.href,'_blank');
        },
        lookArticle(id){
            let routeData = this.$router.resolve({ path:'/articleContent' ,query:{articleId:id}})
            window.open(routeData.href,'_blank');
        },
        logout() {
            //调退出接口 if 成功 sessionStorage.removeItem
            let param = {
                token:this.token
            }
            axion.logout(param).then( res => {
                if(res.data.retCode == 0) {
                    localStorage.removeItem('user_token');
                    localStorage.removeItem('isLogin')
                    localStorage.removeItem('user_phone')
                    localStorage.removeItem('userId')
                    this.$router.push({ path:'/home'})
                    this.$router.go(0)
                }
            })
            
        },
    },
    watch: {
        
    },
}
</script>
<style lang="scss">
.message{
    border-radius: 5px;
    padding:7px 0px;
    padding-left: 30px;
    &:hover{
        color:#00a1d6;
        background-color: #e5e9ef;
    }
}
.mesRed{
    margin-left:2px;
    padding: 2px 6px;
    color:#fff;
    font-size: 12px;
    background-color: #F56C6C;
    border-radius: 100px;
    &:hover{
        color:#fff;
        background-color: #F56C6C;
    }
}
.dongtai{
    border-radius: 5px;
    &:hover{
        background-color: #E5E9EF;
    }
}
.titleS{
    cursor: pointer;
    color:#00a1d6;
    &:hover{
        border-bottom:1px solid #00a1d6;
    }
}
.scroll{
    .el-scrollbar__wrap{overflow-x:hidden;}
}
</style>
