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
                        <div class="dongtai paddingtop10 paddingbottom10 paddingleft35 cursorPointer">个人中心</div>
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
                        <div class="scroll" style="height:200px;">
                          <el-scrollbar  :native="false" style="height:100%;">
                            <div v-for="(item,index) in loveMes" :key="index" class="paddingtop10 paddingbottom10 paddingleft10 clear dongtai">
                                <img :src="item.profilePic" alt="" width="40" class="floatLeft">
                                <div class="floatLeft marginleft10">
                                    <div><i class="el-icon-edit-outline"></i><span class="marginleft5 marginright30 fontsize2 cursorPointer">{{item.nickName}}</span><span class="color-999">投稿了</span></div>
                                    <div><span class="titleS">{{item.title}}</span></div>
                                </div>
                                <img class="floatRight marginright20" v-if="dynamicArticleTime < item.createTime" src="../assets/common/img/new.png" width="40" alt="">
                            </div>
                          </el-scrollbar>
                        </div>
                        <el-button type="primary" style="padding:12px 159px;">查看全部</el-button>
                        <span class="navright" style="font-size:14px;" slot="reference">动态</span>
                    </el-popover>
                    <el-popover
                        placement="bottom"
                        width="400"
                        trigger="hover">
                            <div class="textAlginCenter">
                                <ul style="list-style:disc;">
                                    <li class="dongtai paddingbottom10 paddingtop10 paddingleft10 paddingright10 fontsize2 cursorPointer" v-for="(item,index) in collectList" :key="index">{{item.title}}</li>
                                </ul>
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
            dynamicArticleTime:localStorage.getItem('dynamicArticle'),
            token:localStorage.getItem('user_token'),
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
            type:0,
            loveMes:[{
                profilePic:'default/userinfo/userProfilePic.png',
                nickName:'倪文硕',
                title:'JAVAJAVAJAVA',
                createTime:'2018-11-27 11:23:37'
            },{
                profilePic:'default/userinfo/userProfilePic.png',
                nickName:'倪文硕',
                title:'JAVAJAVAJAVA',
                createTime:'2018-11-27 11:23:37'
            },{
                profilePic:'default/userinfo/userProfilePic.png',
                nickName:'倪文硕',
                title:'JAVAJAVAJAVA',
                createTime:'2018-11-27 11:23:37'
            },{
                profilePic:'default/userinfo/userProfilePic.png',
                nickName:'倪文硕',
                title:'JAVAJAVAJAVA',
                createTime:'2018-11-27 11:23:37'
            },{
                profilePic:'default/userinfo/userProfilePic.png',
                nickName:'倪文硕',
                title:'JAVAJAVAJAVA',
                createTime:'2018-11-27 11:23:37'
            }],
            collectList:[{
                title:'吧啦吧啦吧啦吧啦吧啦吧啦吧啦吧啦吧啦吧吧'
            },{
                title:'房间里可是飞机离开书房里看书发电机发电'
            },{
                title:'是jog金额容量根据二哦i热加工i二哥i哦警方山东'
            }],
            navlist:[{
                title:'Java',
                url:'www.baidu.com'
            },{
                title:'DNF',
                url:'www.baidu.com'
            },{
               title:'DNF',
                url:'www.baidu.com' 
            },{
               title:'DNF',
                url:'www.baidu.com' 
            }]
        }
    },
    mounted() {
        this.getUserInfo()
        this.getMessage()
        let scrollDiv = document.getElementsByClassName('el-scrollbar__wrap')[0]
        scrollDiv.addEventListener('scroll',this.scrollEvent)
        // console.log(scrollDiv,'123')
        this.dynamicArticle()
    },
    methods: {
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
        },
        dynamicArticle(){
            axion.dynamicArticle(this.type,this.pageNum,this.pageSize,this.token).then( res => {
                if(res.data.retCode == 0) {
                    let createTime = res.data.param.getLastInfoTime
                    createTime = createTime.replace(new RegExp("-","gm"),"/");
                    let ms = (new Date(createTime)).getTime();
                    if(this.dynamicArticleTime == null){
                        localStorage.setItem('dynamicArticleTime',ms)
                    }
                    for(let i = 0;i<res.data.param.dynamicArticleDTOs.rows.length;i++) {
                        this.loveMes.push(res.data.param.dynamicArticleDTOs.rows[i]);
                    }
                    this.pages = res.data.param.dynamicArticleDTOs.pages
                    for(let i = 0;i<this.loveMes.length;i++){
                        this.loveMes[i].profilePic = this.$store.state.imgUrl+this.loveMes[i].profilePic
                        let createTime = this.loveMes[i].createTime
                        createTime = createTime.replace(new RegExp("-","gm"),"/");
                        let ms = (new Date(createTime)).getTime();
                        this.loveMes[i].createTime = ms
                    }
                    
                }
            })
        },
        go(){},
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
            console.log('aaa')
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
.el-scrollbar__wrap{overflow-x:hidden;}
</style>
