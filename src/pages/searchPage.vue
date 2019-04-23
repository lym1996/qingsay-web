<template>
    <div class="searchPage">
        <div class="searchInput width980 marginXauto margintop80">
            <div class="textAlignCenter">
                <el-input v-model="searchInput" style="width:400px;" class="input-with-select" placeholder="请输入搜索内容">
                    <el-select v-model="searchType" slot="prepend">
                        <el-option label="用户" value="0"></el-option>
                        <el-option label="文章" value="1"></el-option>
                    </el-select>
                </el-input>
                <el-button class="marginleft20" type="info" icon="el-icon-search" @click="searchBytype">搜索</el-button>
            </div>
        </div>
        <div class="content width980 marginXauto margintop40 bgcolor-white">
            <div>
                <el-tabs  v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户" name="user">
                        <div class="user marginbottom20 margintop20">
                            <div v-for="(item,index) in userList" :key="index" class=" paddingbottom10 paddingX20 border-bottom">
                                <div class="floatLeft">
                                    <img :src="item.profilePic" alt="" width="100" height="100" class="border" style="border-radius:50px;">
                                </div>
                                <div class="floatLeft marginleft20">
                                    <div>
                                        <span class="fontsize6 bold">{{item.nickName}}</span>
                                        <el-button v-if="item.uqsId != userId" class="marginleft20" size="mini" v-html="item.hasConcern == null?'关注':'已关注'" :type="item.hasConcern == null?'danger':''" @click="concern(item.uqsId,item.hasConcern)"></el-button>
                                    </div>
                                    <div class="margintop5" style="color:#99A2AA;font-size:13px;">
                                        <span>关注主题数：</span><span>{{item.concernTopicCount}}</span>
                                        <span class="marginleft20">关注用户数：</span><span>{{item.concernUserCount}}</span>
                                        <span class="marginleft20">粉丝数：</span><span>{{item.fansCount}}</span>
                                        <span class="marginleft20">帖子数：</span><span>{{item.sayCount}}</span>
                                        <span class="marginleft20">文章数:</span><span>{{item.articleCount}}</span>
                                    </div>
                                    <div class="margintop10">
                                        <div v-for="(j,index) in item.articleList" :key="index" class="floatLeft" style="width:250px;">
                                            <div v-if="!!j.firstContentPic" class="marginRight20">
                                                <div class="floatLeft">
                                                    <img :src="j.firstContentPic" alt="" width="80" height="70">
                                                </div>
                                                <div class="floatLeft marginleft10">
                                                    <div>
                                                        <span class="content cursorPointer" style="display:inline-block;width:160px;" @click="lookArticle(j.id)">{{j.title}}</span>
                                                    </div>
                                                    <div>
                                                        <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft5" style="vertical-align: middle;display:inline-block;width:40px;">{{j.browseCount}}</span>
                                                        <img class="marginleft10" src="../assets/common/img/prise.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft5" style="vertical-align: middle;display:inline-block;width:40px;">{{j.praiseCount}}</span>
                                                    </div>
                                                    <div style="margin-top:3px;color:#99A2AA;">
                                                        <span class="content" style="display:inline-block;width:160px;">{{j.createTime}}</span>
                                                    </div>
                                                </div>
                                                <div style="clear:both;"></div>
                                            </div>
                                            <div v-if="!j.firstContentPic">
                                                <div>
                                                    <span class="content cursorPointer" style="display:inline-block;width:160px;" @click="lookArticle(j.id)">{{j.title}}</span>
                                                </div>
                                                <div>
                                                    <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft5" style="vertical-align: middle;display:inline-block;width:40px;">{{j.browseCount}}</span>
                                                    <img class="marginleft10" src="../assets/common/img/prise.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft5" style="vertical-align: middle;display:inline-block;width:40px;">{{j.praiseCount}}</span> 
                                                </div>
                                                <div style="margin-top:3px;color:#99A2AA;">
                                                    <span class="content" style="display:inline-block;width:160px;">{{j.createTime}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="clear:both;"></div>
                                    </div>
                                </div>
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="文章" name="article">
                        <div class="article marginbottom20">
                            <div v-for="(item,index) in articleList" :key="index" class="marginbottom10">
                                <div v-if="!!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                  <img :src="item.firstContentPic" alt="" width="100" height="100" class="floatLeft marginleft20" style="vertical-align: middle">
                                  <div class="floatLeft marginleft20" style="width:820px;">
                                      <span class="title" @click="lookArticle(item.id)">{{item.title}}</span>
                                      <span class="marginleft10" style="color:#A9A9A9;">{{item.topicName}}</span>
                                      <div class="content" v-if="!!item.littleContent" >{{item.littleContent}}</div>
                                      <div class="content" v-if="!!item.content" >{{item.content}}</div>
                                  </div>
                                  <div style="clear:both;"></div>
                                  <div class="marginleft20 margintop10 marginright25">
                                      <div class="floatLeft">
                                          <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.browseCount}}</span>
                                       <img class="marginleft10" src="../assets/common/img/prise.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.praiseCount}}</span>
                                      </div>
                                      <div class="floatRight">
                                          <img class="marginleft10" :src="item.profilePic" alt="" width="15" height="20" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">作者：{{item.nickName}}</span>
                                          <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                                      </div>
                                      <div style="clear:both;"></div>
                                  </div>
                                </div>
                                <div v-if="!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                  <div class="marginleft20" style="width:940px;">
                                      <span class="title" @click="lookArticle(item.id)">{{item.title}}</span>
                                      <div class="content">{{item.littleContent}}</div>
                                      <div class="content" v-if="!!item.content" >{{item.content}}</div>
                                  </div>
                                  <div class="marginleft20 margintop10 marginright20">
                                      <div class="floatLeft">
                                          <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.browseCount}}</span>
                                          <img class="marginleft10" src="../assets/common/img/prise.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.praiseCount}}</span>
                                      </div>
                                      <div class="floatRight">
                                          <img class="marginleft10" :src="item.profilePic" alt="" width="15" height="20" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">作者：{{item.nickName}}</span>
                                          <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                                      </div>
                                       <div style="clear:both;"></div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
        </div>
    </div>
</template>
<script>
import axion from '@/util/api.js'
export default {
    data() {
        return {
            token:localStorage.getItem('user_token'),
            userId:localStorage.getItem('userId'),
            searchInput:'',
            searchType:'0',
            activeName:'user',
            userList:[],
            articleList:[],
            pageNum:1,
            pageSize:10,
            total:0
        }
    },
    mounted() {
        this.searchInput = this.$route.query.keyWord
        this.activeName = 'article'
        this.searchType = '1'
        this.search()
    },
    methods: {
        lookArticle(id){
            let routeData = this.$router.resolve({ path:'/articleContent' ,query:{articleId:id}})
                window.open(routeData.href,'_blank');
        },
        handleClick(tab,event){
            this.activeName = tab.name
            this.pageNum = 1
            this.pageSize = 10
            if(this.activeName == 'user') {
                this.searchType = '0'
            }else if(this.activeName == 'article') {
                this.searchType = '1'
            }
            this.search()
        },
        handleCurrentChange(val){
            this.pageNum = val
            this.search()
        },
        searchBytype(){
            if(this.searchType == '0') {
                this.activeName = 'user'
            }else if(this.searchType == '1') {
                this.activeName = 'article'
            }
            this.search()
        },
        search(){
            if(this.activeName == 'user'){
                axion.searchByuser(this.searchInput,this.pageNum,this.pageSize,this.token).then( res=> {
                    if(res.data.retCode == 0) {
                        this.userList = res.data.param.rows
                        this.pageNum = res.data.param.pageNum
                        this.pageSize = res.data.param.pageSize
                        this.total = res.data.param.total
                        for(let i =0;i<this.userList.length;i++) {
                            this.userList[i].profilePic = this.$store.state.imgUrl+this.userList[i].profilePic
                        }
                    }
                })
            }else if(this.activeName == 'article'){
                axion.searchByTitle(this.searchInput,this.pageNum,this.pageSize,this.token).then( res=> {
                    if(res.data.retCode == 0) {
                        this.articleList = res.data.param.rows
                        this.pageNum = res.data.param.pageNum
                        this.pageSize = res.data.param.pageSize
                        this.total = res.data.param.total
                        for(let i =0;i<this.articleList.length;i++) {
                            this.articleList[i].profilePic = this.$store.state.imgUrl+this.articleList[i].profilePic
                        }
                    }
                })
            }
        },
        concern(id,hasConcern) {
            let param = {
                beConcernUqsId:id,
                token:this.token,
                type:hasConcern == null?0:1
            }
            axion.concernUser(param).then(res => {
                if(res.data.retCode == 0) {
                    this.search()
                }else{
                    this.$message.warning(res.data.retInfo)
                }
            })
        }
    },
}
</script>
