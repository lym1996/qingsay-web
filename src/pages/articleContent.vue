<template>
    <div class="artContent marginbottom20">
        <!-- 为主题 -->
        <div  class="width1210 marginXauto " style="margin-top:44.8px;">
            <!-- 头部信息 -->
            <div>
                <div class="paddingtop20 paddingleft20 paddingbottom20 bgcolor-white border-bottom border-left border-right" style="background-color:#F2F4F7;">
                    <div class="floatLeft">
                        <img :src="topicInfo.topicProfilePic" alt="" width="60" height="60" class="vartivalmiddle">
                        <span class="fontsize10 marginleft20 vartivalmiddle">{{topicInfo.topicName}}</span>
                        <span class="mes marginleft20 vartivalmiddle">关注:</span><span class=" marginleft10 vartivalmiddle " style="color:#FF7F3E">{{topicInfo.userConcernCount}}</span>
                        <span class="mes marginleft20 vartivalmiddle">帖子:</span><span class="marginleft10 vartivalmiddle" style="color:#FF7F3E">{{topicInfo.collectSayCount}}</span>
                        <span class="mes marginleft20 vartivalmiddle">文章:</span><span class="marginleft10 vartivalmiddle" style="color:#FF7F3E">{{topicInfo.collectArticleCount}}</span>
                        <div class="marginleft85 desc">简介 :   {{topicInfo.description}}</div>
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
                <!-- 为文章 -->
                <div v-if="articleInfo.type == 1" id="testTop" class="width1210 bgcolor-white marginXauto border-bottom border-left border-right">
                    <div class="floatLeft textAlignCenter" >
                        <div class="marginX20 margintop20 paddingX5 border paddingtop5 bgcolor-white">
                            <img :src="articleInfo.profilePic" alt="" width="80" height="80">
                        </div>
                        <div class="margintop15 marginbottom5">
                            <span class=" fontsize0" style="color:#FFA640">{{articleInfo.nickName}}</span>
                        </div>
                        <div class="margintop5 marginbottom10" style="font-size:12px;color:#99A2AA;">
                            <span>帖子数:</span><span>{{articleInfo.authorSayCount}}</span>
                            <span>文章数:</span><span>{{articleInfo.authorArticleCount}}</span>
                        </div>
                        <div class="marginbottom10" v-if="userId != articleInfo.uqsId">
                            <el-button size="mini" :type="articleInfo.hasConcernUser == true?'':'danger'"  v-html="articleInfo.hasConcernUser == true?'已关注':'关注'" style="width:90px;" @click="concernUser(articleInfo.uqsId)"></el-button>
                        </div>
                    </div>
                    <div class="floatLeft bgcolor-white">
                        <div v-if="articleInfo.type == 1" class="paddingX20 padding20X border-bottom">
                        <div class="floatLeft">
                            <span class="fontsize4">{{articleInfo.title}}</span>
                        </div>
                        <div class="floatRight head">
                            <el-button @click="lookAll">查看全部</el-button>
                            <el-button v-html="articleInfo.hasPraise?'已点赞(取消点赞)':'点赞'" @click="articlePraise(articleInfo.hasPraise)"></el-button>
                            <el-button v-html="articleInfo.hasCollection?'已收藏':'收藏'" :disabled="articleInfo.hasCollection?true:false" @click="openDialog()"></el-button>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                        <div>
                            <div class="Acontent marginX20 margin20X" style="width:1036px;" v-html="articleInfo.content"></div>
                            <div v-if="articleInfo.qsLock != 0" class="floatRight marginright20">
                                <span>审核：</span>
                                <el-button size="mini" type="primary" @click="checkArticleOk(articleInfo.id,articleInfo.qsLock)">通过</el-button>
                                <el-button size="mini" type="danger" @click="checkArticleBack(articleInfo.id,articleInfo.qsLock)">驳回</el-button>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <!-- 帖子部分 -->
                <div class="floatLeft width800 bgcolor-white border-left border-right border-bottom">
                    <!-- 标题 -->
                    <div v-if="articleInfo.type == 0" class="paddingX20 padding20X border-bottom">
                        <div class="floatLeft">
                            <span class="fontsize4">{{articleInfo.title}}</span>
                        </div>
                        <div class="floatRight head">
                            <el-button @click="lookAll">查看全部</el-button>
                            <el-button v-html="articleInfo.hasPraise?'已点赞(取消点赞)':'点赞'" @click="articlePraise(articleInfo.hasPraise)"></el-button>
                            <el-button v-html="articleInfo.hasCollection?'已收藏':'收藏'" :disabled="articleInfo.hasCollection?true:false" @click="openDialog()"></el-button>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <!-- 帖子内容 -->
                    <div v-if="articleInfo.type == 0" id="testTop" class="border-bottom">
                        <div class="floatLeft textAlignCenter" >
                            <div style="text-align:left;margin-left:-2px;margin-top:-2px;">
                                <img src="../assets/common/img/firstFloor.png" alt="" width="40" height="40">
                            </div>
                            <div class="marginX20 paddingX5 border paddingtop5 bgcolor-white">
                                <img :src="articleInfo.profilePic" alt="" width="80" height="80">
                            </div>
                            <div class="margintop15 marginbottom10">
                                <span class=" fontsize0" style="color:#FFA640">{{articleInfo.nickName}}</span>
                            </div>
                            <div class="margintop5 marginbottom5" style="font-size:12px;color:#99A2AA;">
                                <span>帖子数:</span><span>{{articleInfo.authorSayCount}}</span>
                                <span>文章数:</span><span>{{articleInfo.authorArticleCount}}</span>
                            </div>
                            <div class="marginbottom10" v-if="userId != articleInfo.uqsId">
                                <el-button size="mini" :type="articleInfo.hasConcernUser == true?'':'danger'"  v-html="articleInfo.hasConcernUser == true?'已关注':'关注'" style="width:90px;" @click="concernUser(articleInfo.uqsId)">关注</el-button>
                            </div>
                            <div class="marginbottom10">
                                <el-button type="text" size="mini" @click="onlyLook">只看他/她</el-button>
                            </div>
                        </div>
                        <div class="floatLeft bgcolor-white">
                            <div class="marginX20 margin20X ">
                                <div class="Acontent" style="width:626px;" v-html="articleInfo.content"></div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    
                    <!-- 评论 -->
                    <div v-for="(item,index) in comments" :key="index" class="border-bottom">
                        <div class="floatLeft textAlignCenter" >
                            <div class="marginX20 margintop20 paddingX5 border paddingtop5 bgcolor-white">
                                <img :src="item.profilePic" alt="" width="80" height="80">
                            </div>
                            <div class="margintop15 marginbottom5">
                                <span class=" fontsize0" style="color:#FFA640">{{item.nickName}}</span>
                            </div>
                            <div class="margintop5 marginbottom5" style="font-size:12px;color:#99A2AA;">
                                <span>帖子数:</span><span>{{item.sayCount}}</span>
                                <span>文章数:</span><span>{{item.articleCount}}</span>
                            </div>
                            <div class="marginbottom10" v-show="userId != item.uqsId">
                                <el-button size="mini" :type="item.hasConcernUser == null?'danger':''" v-html="item.hasConcernUser == null?'关注':'已关注'" style="width:90px;" @click="concernComment(item.uqsId,item.hasConcernUser)">关注</el-button>
                            </div>
                            <div class="marginbottom10">
                                <el-button type="text" size="mini" @click="ConlyLook(item.uqsId)">只看他/她</el-button>
                            </div>
                        </div>
                        <div class="floatLeft bgcolor-white">
                            <div class="marginX20 margin20X ">
                                <div class="Acontent" style="width:626px;" v-html="item.content"></div>
                                <div class="margintop80">
                                    <span class="marginright20" style="color:#99A2AA;">{{item.createTime}}</span>
                                    <img  class="cursorPointer" :src="item.hasPraise == null?NoPrisePic:hasPraisePic" alt="" width="12" height="12" @click="commentParise(item.id,item.hasPraise,item.praiseCount)">
                                    <span style="color:#99A2AA;">({{item.praiseCount}})</span>
                                    <img class="marginleft20" src="../assets/common/img/resend.png" alt="" width="12" height="12">
                                    <el-button type="text" v-if="index != isIndex" @click="showSend(index)">回复</el-button>
                                    <el-button v-if="index == isIndex" type="text" @click="hide()">收起</el-button>
                                    <el-button v-if="item.uqsId == userId" type="text" @click="deleteShow(item.id)">删除评论</el-button>
                                </div>
                                <div class="margintop10" v-if="index == isIndex">
                                        <span>回复:</span>
                                        <el-input class="margintop5" v-model="commentText" type="textarea" :rows="2" placeholder="请输入回复内容"></el-input>
                                        <el-button class="margintop10" type="primary" @click="reSend(item.id)">发表回复</el-button>
                                </div>
                                <div v-show="!item.MoresonComments" class="margintop20">
                                    <div  class="marginbottom5" v-for="(j,index) in item.commentDTOs" :key="index">
                                        <div>
                                            <img :src="j.profilePic" alt="" width="35" height="35" style="border-radius:20px;">
                                            <span class="marginright5" style="font-size:13px;color:#FFA640">{{j.nickName}}</span>
                                            <span>{{j.content}}</span>
                                        </div>
                                        <div class="margintop10">
                                            <span class="marginright20" style="color:#99A2AA;">{{j.createTime}}</span>
                                            <img class="cursorPointer" :src="j.hasPraise == null?NoPrisePic:hasPraisePic" alt="" width="12" height="12" @click="commentParise(j.id,j.hasPraise,item.praiseCount)">
                                            <span v-if="j.hasPraise != null" style="color:#99A2AA;">({{item.praiseCount}})</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="item.MoresonComments" class="margintop20">
                                    <div v-for="(j,index) in sonComments" :key="index">
                                        <div>
                                            <img :src="j.profilePic" alt="" width="35" height="35" style="border-radius:20px;">
                                            <span class="marginright5" style="font-size:13px;color:#FFA640">{{j.nickName}}</span>
                                            <span>{{j.content}}</span>
                                        </div>
                                        <div class="margintop10">
                                            <span class="marginright20" style="color:#99A2AA;">{{j.createTime}}</span>
                                            <img class="cursorPointer" :src="j.hasPraise == null?NoPrisePic:hasPraisePic" alt="" width="12" height="12" @click="commentParise(j.id,j.hasPraise,item.praiseCount)">
                                            <span v-if="j.hasPraise != null" style="color:#99A2AA;">({{item.praiseCount}})</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="item.commentDTOs && item.commentDTOs.length > 2 &&!item.MoresonComments">
                                    <el-button type="text" size="mini" @click="getSonComments(item.id,index)">查看更多回复</el-button>
                                </div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <div class="textAlignCenter margin20X">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                        ></el-pagination>
                    </div>
                    <div class="margintop20">
                        <span class="marginleft20 fontsize6">评论:</span>
                        <el-button type="primary" style="margin-left:645px;" @click="publishComment">发表评论</el-button>
                        <mavon-editor ref=md  
                        :ishljs="true"
                        v-model="text" 
                        @imgAdd="imgAdd" 
                        @save="save" 
                        @change="getHtml"
                        style="height:300px;whith:50%;">
                        </mavon-editor>
                    </div>
                </div>
                <div class="floatRight width400 marginleft10">
                    <hot-key></hot-key>
                    <rank-list></rank-list>
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
        <el-dialog
          title="选择收藏夹"
          :visible.sync="dialogshow"
          width="50%">
            <div>
                <span>选择收藏夹：</span>
                <el-select  class="marginleft20" v-model="folder" multiple  clearable  placeholder="请选择收藏夹">
                <el-option
                    v-for="item in folderList" 
                    :key="item.id"
                    :label="item.folderName"
                    :value="item.id">
                </el-option>
            </el-select>
            </div>
            <div class="margintop20">
                <el-input v-model="newFold" placeholder="请输入收藏夹名字">
                    <el-button slot="append" @click="addFold">新建</el-button>
                </el-input>
            </div>
            <div class="margintop20 floatRight">
                <el-button class="" size="medium " type="primary" @click="articleCollect(articleInfo.hasCollection)">添加收藏</el-button>
            </div>
            <div style="clear:both;"></div>
        </el-dialog>
    </div>
</template>
<script>
import rankList from '../components/rankList.vue'
import hotKey from '../components/hotKey.vue'
import Cprise from '../assets/common/img/Cprise.png'
import NoPrisePic from '../assets/common/img/NoPraise.png'
import axion from '@/util/api.js'
export default {
    components:{ rankList, hotKey },
    data() {
        return {
            hasPraisePic:Cprise,
            NoPrisePic:NoPrisePic,
            userId:localStorage.getItem('userId'),
            token:localStorage.getItem('user_token'),
            topicId:-1,
            articleId:0,
            articleInfo:{},
            topicInfo:{},
            comments:[],
            sonComments:[],
            pageNum:1,
            pageSize:10,
            total:0,
            sonPageNum:1,
            sonPageSize:10,
            sonTotal:0,
            commentText:'',
            content:'',
            text:'',
            isIndex:-1,
            dialogshow:false,
            folder:[],
            folderList:[],
            newFold:'',
        }
    },
    watch: {
        topicId(val,oldValue) {
            this.getTopicInfo()
            sessionStorage.setItem('topicId',this.topicId)
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
        this.articleId = this.$route.query.articleId
        this.getArticleInfo()
        this.getAllComments()
    },
    methods: {
        checkArticleOk(id,stepType){
            console.log('id',id,'stepType',stepType)
            let param = {
                articleId:id,
                token:this.token,
                type:0
            }
            if(stepType == 2) {
                axion.bazhuReview(param).then( res => {
                    if(res.data.retCode == 0) {
                        this.$message.success(res.data.retInfo)
                        console.log('霸主通过')
                        this.getArticleInfo()
                    }
                })
            }else if(stepType == 1) {
               axion.adminReview(param).then( res => {
                    if(res.data.retCode == 0) {
                        this.$message.success(res.data.retInfo)
                        console.log('管理员通过')
                        this.getArticleInfo()
                    }
                }) 
            }
        },
        checkArticleBack(id,stepType){
            let param = {
                articleId:id,
                token:this.token,
                type:1
            }
            this.$prompt('请输入驳回原因', '驳回', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: /\S/,
                  inputErrorMessage: '请填写原因'
                }).then(({ value }) => {
                    param.reason = value
                  if(stepType == 2){
                      axion.bazhuReview(param).then( res =>{
                          if(res.data.retCode == 0){
                              this.$message.success('驳回成功')
                              window.close()
                              console.log('霸主驳回')
                          }
                      })
                  }else if(stepType == 1) {
                      axion.adminReview(param).then( res =>{
                          if(res.data.retCode == 0){
                              this.$message.success('驳回成功')
                              console.log('管理员驳回')
                          }
                      })
                  }
                }).catch(() => {
                    return;     
                });
        },
        getArticleInfo(){
            axion.getArticleInfo(this.articleId,this.token).then( res => {
                if(res.data.retCode == 0) {
                    this.articleInfo = res.data.param
                    this.topicId = this.articleInfo.topicId
                    this.articleInfo.profilePic = this.$store.state.imgUrl + this.articleInfo.profilePic
                    console.log(this.articleInfo.profilePic)
                }else if(res.data.retCode == 50012 ) {
                    this.$router.push({ path:'/315' })
                }
                else {
                    this.$router.push({ path:'/305' })
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
        },
        getAllComments(){
           axion.getAllcomments(this.articleId,this.pageNum,this.pageSize,this.token).then( res => {
               if( res.data.retCode == 0) {
                   this.comments = res.data.param.rows
                   this.total = res.data.param.total
                   this.pageNum = res.data.param.pageNum
                   this.pageSize = res.data.param.pageSize
                   for(let i = 0; i<this.comments.length;i++) {
                       this.comments[i].profilePic = this.$store.state.imgUrl + this.comments[i].profilePic
                       this.comments[i].MoresonComments = false
                       this.comments[i].isOpen = false
                       if(this.comments[i].commentDTOs){
                           for(let j = 0;j<this.comments[i].commentDTOs.length;j++) {
                               this.comments[i].commentDTOs[j].profilePic = this.$store.state.imgUrl + this.comments[i].commentDTOs[j].profilePic
                           }
                       }
                   }
                   console.log(this.comments,'comments')
               }else if (res.data.retCode == 50008) {
                   this.comments = []
               }
           })
        },
        getSonComments(id,index){
            this.comments[index].MoresonComments = true
            let param ={
                articleId:this.articleId,
                commentId:id,
                pageNum:this.sonPageNum,
                pageSize:this.sonPageSize,
                token:this.token
            }
            axion.getSonComments(param).then(res => {
                if(res.data.retCode == 0) {
                    this.sonComments = res.data.param.rows
                    this.sonPageNum = res.data.param.pageNum
                    this.sonPageSize = res.data.param.pageSize
                    this.sonTotal = res.data.param.total
                    for(let i = 0;i<this.sonComments.length;i++){
                        this.sonComments[i].profilePic = this.$store.state.imgUrl + this.sonComments[i].profilePic
                    }
                }
            })
        },
        articlePraise(hasPraise){
            let param = {
                articleId:this.articleId,
                token:this.token,
                type:hasPraise?1:0
            }
            axion.praiseArticle(param).then( res => {
                if( res.data.retCode == 0) {
                    this.getArticleInfo()
                }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                }
            })
        },
        commentParise(id,hasPraise,praiseCount){
            console.log(id,hasPraise,praiseCount)
            let param = {
                commentId:id,
                token:this.token,
                type:hasPraise == null ?0:1
            }
            axion.praiseComment(param).then( res => {
                if(res.data.retCode == 0) {
                    this.getAllComments()
                }
            })
        },
        showSend(index){
            this.isIndex = index
        },
        hide(){
            this.isIndex = -1
        },
        reSend(id){
            let param = {
                articleId:this.articleId,
                parentId:id,
                content:this.commentText,
                token:this.token
            }
            axion.comment(param).then(res => {
                if(res.data.retCode == 0) {
                    this.getAllComments()
                    this.commentText = ''
                    this.isIndex = -1
                }
            })
        },
        deleteShow(id){
            const h = this.$createElement;
                this.$msgbox({
                    title: "删除确认",
                    message: h("p", null, [
                        h("p",{style: "line-height:22px"}, "是否删除所选评论")
                    ]),
                    showCancelButton: true,
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    beforeClose: (action, instance, done) => {
                        if(action === "confirm") {
                            this.deleteComment(id);//调删除接口
                            done();
                            instance.confirmButtonLoading = false;
                        }else {
                            done();
                        }
                    }
                }).then(action => {
                    action = '删除成功';
                    this.$message.success(action)
                })
        },
        deleteComment(id){
            let param = {
                articleId:this.articleId,
                id:id,
                token:this.token
            }
            axion.deleteComments(param).then(res => {
                if(res.data.retCode == 0) {
                    this.getAllComments()
                }else{
                    this.$message.warning(res.data.retInfo)
                }
            })
        },
        save(){},
        imgAdd(pos, $file){
            let file = new FormData()
            file.append('image', $file);
            file.append('token',this.token)
            axion.uploadCommentPic(file).then(res => {
                if(res.data.retCode == 0) {
                    this.$refs.md.$img2Url(pos, this.$store.state.imgUrl + res.data.param)
                    this.$message.success("上传成功");
                }else{
                    this.$message.warning("上传失败" + res.data.retInfo);
                }
            })
        },
        getHtml(content,html) {
            this.content = html
        },
        publishComment(){
            if(this.content.trim() == '') {
                this.$message.warning('请填写评论内容')
                return;
            }
            let param = {
                articleId:this.articleId,
                content:this.content,
                token:this.token
            }
            axion.comment(param).then(res => {
                if(res.data.retCode  == 0) {
                    this.text = ''
                    this.getAllComments()
                    this.$message.success('发表成功')
                }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                }
            })
        },
        openDialog(hasCollection){
            console.log("token" + this.token)
            if(this.token != null) {
                this.dialogshow = true
                this.getFoldList()
            }else {
                this.$message.warning('请登录')
            }
        },
        getFoldList(){
            axion.listFold(this.userId).then(res => {
                if(res.data.retCode == 0) {
                    this.folderList = res.data.param
                }else if(res.data.retCode == 50099){
                    this.folderList = []
                }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                    this.dialogshow = false
                }
            })
        },
        addFold(){
            let param = {
                folderName:this.newFold,
                token:this.token
            }
            axion.addNewFold(param).then(res => {
                if(res.data.retCode == 0) {
                    this.$message.success('新建成功')
                    this.getFoldList()
                }
            })
        },
        articleCollect(hasCollection){
            for(let i = 0;i<this.folder.length;i++){
                let param = {
                folderId:this.folder[i],
                articleId:this.articleId,
                token:this.token
            }
            axion.collect(param).then(res => {
                if(res.data.retCode == 0) {
                    if(i == this.folder.length -1){
                    this.dialogshow = false
                    this.$message.success('收藏成功')
                    this.getArticleInfo()
                    }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                }
                }
            })
            }
        },
        concernUser(id){
            let param = {
                beConcernUqsId:id,
                token:this.token,
                type:this.articleInfo.hasConcernUser == true ?1:0
            }
            axion.concernUser(param).then(res => {
                if(res.data.retCode == 0) {
                    this.getArticleInfo()
                    console.log('关注成功')
                }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                }
            })
        },
        concernComment(id,hasConcernUser){
            let param = {
                beConcernUqsId:id,
                token:this.token,
                type:hasConcernUser == null ?0:1
            }
            axion.concernUser(param).then(res => {
                if(res.data.retCode == 0) {
                    this.getAllComments()
                    console.log('关注成功')
                }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                }
            })
        },
        onlyLook(){
            let param = {
                articleId:this.articleId,
                uqsId:this.articleInfo.uqsId,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                token:this.token
            }
            axion.getOnecomments(param).then(res => {
                if(res.data.retCode == 0) {
                   this.comments = res.data.param.rows
                   this.total = res.data.param.total
                   this.pageNum = res.data.param.pageNum
                   this.pageSize = res.data.param.pageSize
                   for(let i = 0; i<this.comments.length;i++) {
                       this.comments[i].profilePic = this.$store.state.imgUrl + this.comments[i].profilePic
                       this.comments[i].MoresonComments = false
                       this.comments[i].isOpen = false
                       if(this.comments[i].commentDTOs){
                           for(let j = 0;j<this.comments[i].commentDTOs.length;j++) {
                               this.comments[i].commentDTOs[j].profilePic = this.$store.state.imgUrl + this.comments[i].commentDTOs[j].profilePic
                           }
                       }
                   }
                }else if (res.data.retCode == 50008) {
                    this.comments = []
                    this.total = 0
                    this.pageNum = 1
                    this.pageSize = 10
                }
            })
        },
        ConlyLook(id){
            let param = {
                articleId:this.articleId,
                uqsId:id,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
                token:this.token
            }
            axion.getOnecomments(param).then(res => {
                if(res.data.retCode == 0) {
                   this.comments = res.data.param.rows
                   this.total = res.data.param.total
                   this.pageNum = res.data.param.pageNum
                   this.pageSize = res.data.param.pageSize
                   for(let i = 0; i<this.comments.length;i++) {
                       this.comments[i].profilePic = this.$store.state.imgUrl + this.comments[i].profilePic
                       this.comments[i].MoresonComments = false
                       this.comments[i].isOpen = false
                       if(this.comments[i].commentDTOs){
                           for(let j = 0;j<this.comments[i].commentDTOs.length;j++) {
                               this.comments[i].commentDTOs[j].profilePic = this.$store.state.imgUrl + this.comments[i].commentDTOs[j].profilePic
                           }
                       }
                   }
                }else if (res.data.retCode == 50008) {
                    this.comments = []
                    this.total = 0
                    this.pageNum = 1
                    this.pageSize = 10
                }
            })
        },
        lookAll(){
            this.getAllComments()
        },
        handleCurrentChange(val){
            let div  = document.getElementById('testTop')
            document.body.scrollTop = document.documentElement.scrollTop = div.offsetTop+div.clientHeight - 45;
            this.pageNum = val
            this.getAllComments()
        },
    },
}
</script>