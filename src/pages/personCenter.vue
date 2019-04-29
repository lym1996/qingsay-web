<template>
    <div class="personCenter">
        <div class="width980 marginXauto">
        <!-- 头部信息 -->
            <div class="margintop45 paddingleft20 padding20X bgcolor-white">
                <div class="floatLeft">
                    <img :src="userInfo.profilePic" alt="" width="70" height="70" style="border-radius:50px;">
                </div>
                <div class="floatLeft marginleft20">
                    <div>
                        <span class="fontsize4 bold">{{userInfo.nickName}}</span>
                        <el-button class="marginleft20" v-if="userId != pushUserId" size="mini" type="primary" @click="sendMsg">发送私信</el-button>
                        <el-button size="mini" v-if="userId != pushUserId" :type="userInfo.hasConcern == true?'':'danger'"  v-html="userInfo.hasConcern == true?'已关注':'关注'" style="width:90px;" @click="concernUser(userInfo.uqsId)">关注</el-button>
                    </div>
                    <div class="margintop3" style="color:#99A2AA;font-size:13px;">
                        <span>关注用户数：</span><span>{{userInfo.concernUserCount}}</span>
                        <span class="marginleft15">关注主题数：</span><span>{{userInfo.concernTopicCount}}</span>
                        <span class="marginleft15">粉丝数：</span><span>{{userInfo.fansCount}}</span>
                        <span class="marginleft15">帖子数：</span><span>{{userInfo.sayCount}}</span>
                        <span class="marginleft15">文章数：</span><span>{{userInfo.articleCount}}</span>
                    </div>
                    <div class="margintop3" style="font-size:13px;">
                        <span>{{userInfo.introduction}}</span>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div>   
            <div class="">
                <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane name="first">
                        <span slot="label"><i class="el-icon-ts-bianji"></i>原创</span>
                        <el-tabs :tab-position="tabPosition" v-model="articleActive" @tab-click="handleClick2">
                            <el-tab-pane label="青说" name="say">
                                <div class="article marginbottom20">
                                        <div v-for="(item,index) in sayList" :key="index" class="marginbottom10">
                                            <div v-if="!!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                              <img :src="item.firstContentPic" alt="" width="100" height="100" class="floatLeft marginleft20" style="vertical-align: middle">
                                              <div class="floatLeft marginleft20" style="width:700px;">
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
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                            <div v-if="!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                              <div class="marginleft20" style="width:800px;">
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
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                                                  </div>
                                                   <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
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
                            </el-tab-pane>
                            <el-tab-pane label="文章" name="article">
                                <div class="marginleft20">
                                    <div >
                                        <span>选择文集 ：</span>
                                        <el-select v-model="foldId" @change="changeFolder">
                                            <el-option
                                                v-for="(item,index) in folderList"
                                                :key="index"
                                                :label="item.folderName"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="article marginbottom20">
                                        <div v-for="(item,index) in articleList" :key="index" class="marginbottom10">
                                            <div v-if="!!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                              <img :src="item.firstContentPic" alt="" width="100" height="100" class="floatLeft marginleft20" style="vertical-align: middle">
                                              <div class="floatLeft marginleft20" style="width:700px;">
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
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                            <div v-if="!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                              <div class="marginleft20" style="width:800px;">
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
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                                                  </div>
                                                   <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
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
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane v-if="pushUserId == userId" name="second">
                        <span slot="label"><i class="el-icon-ts-msg"></i>消息</span>
                        <el-button v-show="msgActive != 'sendMsg'" class="floatRight marginright20" type="primary" size="mini" @click="msgRead">一键已读</el-button>
                        <div style="clear:both;"></div>
                        <el-tabs :tab-position="tabPosition" v-model="msgActive" @tab-click="handleClick3">
                            <el-tab-pane label="粉丝消息" name="fansMsg">
                                <div class="margintop10">
                                    <div class="paddingX20">
                                        <div v-for="(item,index) in msgList" :key="index">
                                            <div  :class="['paddingbottom10','paddingtop10', {'listbottom':index != 10}]">
                                              <img :src="item.sendProfilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                              <div class="floatLeft marginleft20" style="width:700px;">
                                                  <div class="fontsize2 bold marginbottom15">{{item.sendNikeName}}</div>
                                                  <div class="" v-html="item.content"></div>
                                              </div>
                                              <div style="clear:both;"></div>
                                              <div class="marginleft20">
                                                  <div class="floatLeft"></div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                             <el-tab-pane label="评论我的" name="commentMsg">
                                 <div class="margintop10">
                                    <div class="paddingX20">
                                        <div v-for="(item,index) in msgList" :key="index">
                                            <div  :class="['paddingbottom10','paddingtop10', {'listbottom':index != 10}]">
                                              <img :src="item.sendProfilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                              <div class="floatLeft marginleft20" style="width:700px;">
                                                  <div class="fontsize2 bold marginbottom15">{{item.sendNikeName}}</div>
                                                  <div class="" v-html="item.content"></div>
                                              </div>
                                              <div style="clear:both;"></div>
                                              <div class="marginleft20">
                                                  <div class="floatLeft"></div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="点赞我的" name="praiseMsg">
                                <div class="margintop10">
                                    <div class="paddingX20">
                                        <div v-for="(item,index) in msgList" :key="index">
                                            <div  :class="['paddingbottom10','paddingtop10', {'listbottom':index != 10}]">
                                              <img :src="item.sendProfilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                              <div class="floatLeft marginleft20" style="width:700px;">
                                                  <div class="fontsize2 bold marginbottom15">{{item.sendNikeName}}</div>
                                                  <div class="" v-html="item.content"></div>
                                              </div>
                                              <div style="clear:both;"></div>
                                              <div class="marginleft20">
                                                  <div class="floatLeft"></div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="系统通知" name="xtMsg">
                                <div class="margintop10">
                                    <div class="paddingX20">
                                        <div v-for="(item,index) in msgList" :key="index">
                                            <div  :class="['paddingbottom10','paddingtop10', {'listbottom':index != 10}]">
                                              <img :src="item.sendProfilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                              <div class="floatLeft marginleft20" style="width:700px;">
                                                  <div class="fontsize2 bold marginbottom15">
                                                      <div class="floatLeft">{{item.sendNikeName}}</div>
                                                      <div class="floatRight"><el-button v-if="item.hasBtn" class="floatRight" size="mini" type="primary" @click="lookArticle(item.articleId)">审核</el-button></div>
                                                      <div style="clear:both;"></div>
                                                  </div>
                                                  <div v-html="item.content"></div>
                                              </div>
                                              <div style="clear:both;"></div>
                                              <div class="marginleft20">
                                                  <div class="floatLeft"></div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的私信" name="privateMsg">
                                <div class="margintop10">
                                    <div class="paddingX20">
                                        <div v-for="(item,index) in msgList" :key="index">
                                            <div  :class="['paddingbottom10','paddingtop10', {'listbottom':index != 10}]">
                                              <img :src="item.sendProfilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                              <div class="floatLeft marginleft20" style="width:700px;">
                                                  <div class="fontsize2 bold marginbottom15">{{item.sendNikeName}}</div>
                                                  <div class="" v-html="item.content"></div>
                                              </div>
                                              <div style="clear:both;"></div>
                                              <div class="marginleft20">
                                                  <div class="floatLeft"></div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="已发送私信" name="sendMsg">
                                <div class="margintop10">
                                    <div class="paddingX20">
                                        <div v-for="(item,index) in msgList" :key="index">
                                            <div  :class="['paddingbottom10','paddingtop10', {'listbottom':index != 10}]">
                                              <img :src="item.receiveProfilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                              <div class="floatLeft marginleft20" style="width:700px;">
                                                  <div class="fontsize2 bold marginbottom15">{{item.sendNikeName}}</div>
                                                  <div class="" v-html="item.content"></div>
                                              </div>
                                              <div style="clear:both;"></div>
                                              <div class="marginleft20">
                                                  <div class="floatLeft"></div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <div class="textAlignCenter margin20X">
                                <el-pagination
                                @current-change="handleCurrentChange2"
                                :current-page="pageNum"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total"
                                ></el-pagination>
                            </div>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane v-if="pushUserId == userId" name="third">
                        <span slot="label"><i class="el-icon-ts-jztx"></i>动态</span>
                        <el-tabs :tab-position="tabPosition" v-model="dynamicActive" @tab-click="handleClick5">
                            <el-tab-pane label="青说" name="saydynamic">
                                <div class="margintop10 paddingX20">
                                    <div v-for="(item,index) in dynamic" :key="index">
                                        <div  :class="['paddingbottom20','paddingtop10', {'listbottom':index != 10}]">
                                            <img :src="item.profilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                            <div class="floatLeft marginleft20 margintop20">
                                                <span class="fontsize2" style="color:#FFA640;">{{item.nickName}}</span>
                                                <span class="marginX10">投稿了</span>
                                                <span class="cursorPointer">{{item.title}}</span>
                                            </div>
                                            <div class="floatRight margintop20">
                                                <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                            </div>
                                            <div style="clear:both;"></div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="文章" name="articledynamic">
                                <div class="margintop10 paddingX20">
                                    <div v-for="(item,index) in dynamic" :key="index">
                                        <div  :class="['paddingbottom20','paddingtop10', {'listbottom':index != 10}]">
                                            <img :src="item.profilePic" alt="" width="60" height="60" class="floatLeft" style="vertical-align: middle;border-radius:50px;">
                                            <div class="floatLeft marginleft20 margintop20">
                                                <span class="fontsize2" style="color:#FFA640;">{{item.nickName}}</span>
                                                <span class="marginX10">投稿了</span>
                                                <span class="cursorPointer">{{item.title}}</span>
                                            </div>
                                            <div class="floatRight margintop20">
                                                <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;">{{item.createTime}}</span>
                                            </div>
                                            <div style="clear:both;"></div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <div class="textAlignCenter margin20X">
                            <el-pagination
                            @current-change="handleCurrentChange6"
                            :current-page="pageNum"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane  name="fourth">
                        <span slot="label"><i class="el-icon-star-on"></i>收藏</span>
                        <div>
                            <el-input v-model="newFold" placeholder="请输入收藏夹名字" style="width:300px;">
                                <el-button slot="append" @click="addFold">新建</el-button>
                            </el-input>
                        </div>
                        <div class="margintop20">
                           <el-collapse accordion>
                                <el-collapse-item v-for="(item,index) in collectFolderList" :key="index" >
                                    <template slot="title">
                                        <div class="marginleft20" @mouseenter="deleteShow(index,item.id)" @mouseleave="deleteHide(index)">
                                            <span class="fontsize4" @click="setFolderId(item.id)">{{item.folderName}}</span>
                                            <img v-if="isShowdelete &&deleteIndex == index" src="../assets/common/img/delete.png" @click.stop="deleteFold(item.id)" style="vertical-align:middle;" alt="" width="20" height="20">
                                        </div>
                                    </template>
                                    <div v-if="collectList.length != 0" class="article marginbottom20">
                                        <div v-for="(j,index) in collectList" :key="index" class="marginbottom10">
                                            <div v-if="!!j.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                              <img :src="j.firstContentPic" alt="" width="100" height="100" class="floatLeft marginleft20" style="vertical-align: middle">
                                              <div class="floatLeft marginleft20" style="width:700px;">
                                                  <span class="title" @click="lookArticle(j.articleId)">{{j.title}}</span>
                                              </div>
                                              <div style="clear:both;"></div>
                                              <div class="marginleft20 margintop10 marginright25">
                                                  <div class="floatLeft">
                                                      <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{j.browseCount}}</span>
                                                   <img class="marginleft10" src="../assets/common/img/prise.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{j.praiseCount}}</span>
                                                  </div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{j.createTime}}</span>
                                                  </div>
                                                  <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                            <div v-if="!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
                                              <div class="marginleft20" style="width:800px;">
                                                  <span class="title" @click="lookArticle(j.articleId)">{{j.title}}</span>
                                              </div>
                                              <div class="marginleft20 margintop10 marginright20">
                                                  <div class="floatLeft">
                                                      <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{j.browseCount}}</span>
                                                      <img class="marginleft10" src="../assets/common/img/prise.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{j.praiseCount}}</span>
                                                  </div>
                                                  <div class="floatRight">
                                                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{j.createTime}}</span>
                                                  </div>
                                                   <div style="clear:both;"></div>
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="collectList.length == 0" class="marginbottom">
                                        <span class="marginleft20 fontsize1">暂无收藏</span>
                                    </div>
                                    <div v-if="collectList.length != 0" class="textAlignCenter margin20X">
                                        <el-pagination
                                        @current-change="handleCurrentChange3"
                                        :current-page="pageNum"
                                        :page-size="pageSize"
                                        layout="total, prev, pager, next, jumper"
                                        :total="total"
                                        ></el-pagination>
                                    </div>
                                </el-collapse-item>   
                            </el-collapse> 
                        </div>
                    </el-tab-pane>
                    <el-tab-pane v-if="pushUserId == userId" name="fiveth">
                        <span slot="label"><i class="el-icon-ts-leson"></i>关注</span>
                        <el-tabs :tab-position="tabPosition" v-model="concernActive" @tab-click="handleClick4">
                            <el-tab-pane label="关注用户" name="user">
                                <div class="clear marginleft15">
                                    <div v-for="(item,index) in concernUserList" :key="index" class="marginbottom20 marginright15 textAlignCenter floatLeft border paddingX10 padding10X" style="width:150px;height:160px;">
                                        <div class="margintop10"><img :src="item.profilePic" alt="" width="60" height="60" style="border-radius:50px;"></div>
                                        <div class="margintop20 cursorPointer" style="color:#FFA640;"><span @click="checkUser(item.uqsId)">{{item.nickName}}</span></div>
                                        <div class="introduction" style="width:130px;"><span style="color:#99A2AA;font-size:12px;">{{item.introduction}}</span></div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="关注主题" name="topic">
                                <div class="clear marginleft15">
                                    <div v-for="(item,index) in concernTopicList" :key="index" class="marginbottom20 marginright15 textAlignCenter floatLeft border paddingX10 padding10X" style="width:150px;height:160px;">
                                        <div class="margintop10"><img :src="item.topicProfilePic" alt="" width="60" height="60" style="border-radius:50px;"></div>
                                        <div class="margintop10 cursorPointer" style="color:#FFA640;"><span>{{item.topicName}}</span></div>
                                        <div><span class="margintop20" style="color:#99A2AA;font-size:12px;">{{item.description}}</span></div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <div  class="textAlignCenter margin20X">
                                <el-pagination
                                @current-change="handleCurrentChange4"
                                :current-page="pageNum"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total"
                                ></el-pagination>
                            </div>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane v-if="pushUserId == userId" name="sixth">
                        <span slot="label"><i class="el-icon-ts-rygl"></i>粉丝</span>
                        <div class="clear marginleft20">
                            <div v-for="(item,index) in fansList" :key="index" class="marginbottom20 marginright35 textAlignCenter floatLeft border paddingX10 padding10X" style="width:150px;height:160px;">
                                <div class="margintop10"><img :src="item.profilePic" alt="" width="60" height="60" style="border-radius:50px;"></div>
                                <div class="margintop10 cursorPointer" style="color:#FFA640;"><span @click="checkUser(item.uqsId)">{{item.nickName}}</span></div>
                                <div><span class="margintop20" style="color:#99A2AA;font-size:12px;">{{item.introduction}}</span></div>
                            </div>
                        </div>
                        <div  class="textAlignCenter margin20X">
                            <el-pagination
                            @current-change="handleCurrentChange5"
                            :current-page="pageNum"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane v-if="pushUserId == userId" name="seventh">
                        <span slot="label"><i class="el-icon-ts-man"></i>个人信息</span>
                        <div>
                            <!-- 更换头像 -->
                            <div class="floatLeft marginleft5">
                                <img class="floatLeft" :src="userInfo.profilePic" alt=""  width="70" height="70" style="border-radius:50px;">
                                <el-upload
                                    class="floatLeft marginleft20 margintop20"
                                  action=""
                                  :multiple="false"
                                  :show-file-list="false"
                                  :http-request="uploadUserPic"
                                  :on-change="selectFile"
                                  accept=".jpg,.png,.jpeg"
                                >
                                    <el-button size="mini" type="primary">更换头像</el-button>
                                </el-upload>
                            </div>
                            <div class="floatLeft marginleft50">
                                <!-- 更改个人信息 -->
                                <el-form ref="form" label-width="120px" label-position="right">
                                    <el-form-item label="昵称 :">
                                        <span v-if="flag" @click="changeInput()">{{userInfo.nickName}}</span>
                                        <el-input v-else v-show="hasChange" v-model="User.nickName"></el-input>
                                        <span v-show="!hasChange&&!flag">{{userInfo.nickName}}</span>
                                        <span v-if="!hasChange&&!flag" style="color:red;">(*不可修改)</span>
                                    </el-form-item>
                                    <el-form-item label="性别 :">
                                        <span v-if="flag" @click="changeInput()" v-html="userInfo.sex == ''?'未知':userInfo.sex == 1?'男':'女'"></span>
                                        <el-radio-group v-else v-model="User.sex">
                                            <el-radio label="1">男</el-radio>
                                            <el-radio label="2">女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="年龄 :">
                                        <span v-if="flag" @click="changeInput()">{{userInfo.age}}岁</span>
                                        <el-input v-else v-model="User.age"></el-input>
                                    </el-form-item>
                                    <el-form-item label="出生年月 :">
                                        <span v-if="flag" @click="changeInput()" v-html="userInfo.birthday == null?'未知':userInfo.birthday"></span>
                                        <el-date-picker v-else v-model="User.birthday" type="date"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="身份证 :">
                                        <span v-if="flag" @click="changeInput()">{{userInfo.cardId}}</span>
                                        <el-input v-else v-model="User.cardId"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱 :">
                                        <span v-if="flag" @click="changeInput()" v-html="userInfo.email == ''?'未知':userInfo.email"></span>
                                        <el-input v-else v-model="User.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="个性签名 :">
                                        <span v-if="flag" @click="changeInput()" v-html="userInfo.introduction == ''?'未知':userInfo.introduction"></span>
                                        <el-input v-else type="textarea" rows="3" v-model="User.introduction"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="!flag">
                                        <el-button type="primary" @click="save">保存</el-button>
                                        <el-button @click="cancle">取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
            activeName:'first',
            articleActive:'say',
            msgActive:'fansMsg',
            collectActive:'myFolder',
            tabPosition:'left',
            pushUserId:null,
            type:-1,
            userInfo:{},
            User:{},
            flag:true,
            foldId:'',
            folderList:[],//文集
            pageNum:1,
            pageSize:10,
            total:0,
            articleList:[],
            sayList:[],
            msgList:[],
            collectFolderList:[],//收藏夹
            collectList:[],//收藏夹下的内容
            folderId:-1,
            isShowdelete:false,
            deleteIndex:-1,
            concernActive:'user',
            concernUserList:[],//关注用户
            concernTopicList:[],//关注主题
            fansList:[],
            dynamicActive:'saydynamic',
            dynamic:[],
            newFold:'',
            hasChange:false,

        }
    },
    mounted() {
        this.pushUserId = this.$route.query.userId
        this.getFolderList()
        this.getArticleByUqs()
        this.getUserInfo()
        if(this.$route.query.type) {
            this.type = this.$route.query.type
            if(this.type == 0) {
                this.activeName = 'second'
                this.msgActive = 'fansMsg'
                this.getMsg()
            }else if(this.type == 1) {
                this.activeName = 'second'
                this.msgActive = 'commentMsg'
                this.getMsg()
            }else if(this.type == 2) {
                this.activeName = 'second'
                this.msgActive = 'praiseMsg'
                this.getMsg()
            }else if(this.type == 3) {
                this.activeName = 'second'
                this.msgActive = 'xtMsg'
                this.getMsg()
            }else if(this.type == 4) {
                this.activeName = 'second'
                this.msgActive = 'privateMsg'
                this.getMsg()
            }else if(this.type == 5) {
                this.activeName = 'third'
                this.dynamicActive = 'saydynamic'
                this.getDynamic()
            }else if(this.type == 6) {
                this.activeName = 'third'
                this.dynamicActive = 'articledynamic'
                this.getDynamic()
            }else if(this.type == 7) {
                this.activeName = 'fourth'
                this.getMycollectFolderList()
            }
        }
    },
    methods: {
        handleCurrentChange(val){
            this.pageNum = val
            this.getArticleByUqs()
        },
        handleCurrentChange2(val){
            this.pageNum = val
            this.getMsg()
        },
        handleCurrentChange3(val){
            this.pageNum = val
            this.getCollect()
        },
        handleCurrentChange4(val){
            this.pageNum = val
            this.getConcern()
        },
        handleCurrentChange5(val){
            this.pageNum = val
            this.getFans()
        },
        handleCurrentChange6(val){
            this.pageNum = val
            this.getDynamic()
        },
        handleClick(tab,event){
            this.pageNum = 1
            this.pageSize = 10
            this.total = 0
            this.activeName = tab.name
            if(this.activeName == 'first') {
                if(this.articleActive == 'say'){
                    this.pageNum = 1
                    this.pageSize = 10
                    this.foldId = ''
                    this.getArticleByUqs()
                }else if(this.articleActive == 'article') {
                    this.pageNum = 1
                    this.pageSize = 10
                    this.foldId  = this.folderList[0].id
                    this.getArticleByUqs()
                }
            }
            if(this.activeName == 'second') {
                this.getMsg()
            }
            if(this.activeName == 'third') {
                this.getDynamic()
            }
            if(this.activeName == 'fourth') {
                this.getMycollectFolderList()
            }
            if(this.activeName == 'fiveth') {
                this.getConcern()
            }
            if(this.activeName == 'sixth') {
                this.getFans()
            }
        },
        handleClick2(tab,event){
            this.articleActive = tab.name
            if(this.articleActive == 'say'){
                this.pageNum = 1
                this.pageSize = 10
                this.foldId = ''
                this.getArticleByUqs()
            }else if(this.articleActive == 'article') {
                this.pageNum = 1
                this.pageSize = 10
                this.foldId  = this.folderList[0].id
                this.getArticleByUqs()
            }
        },
        handleClick3(tab,event){
            this.pageNum = 1
            this.pageSize = 10
            this.msgActive = tab.name
            this.getMsg()
        },
        handleClick4(tab,event) {
            this.concernActive = tab.name
            this.pageNum = 1
            this.pageSize = 10
            this.getConcern()
        },
        handleClick5(tab,event){
            this.dynamicActive = tab.name
            this.pageNum = 1
            this.pageSize = 10
            this.getDynamic()
        },
        changeInput(){
            this.flag = false
        },
        getFolderList(){
            axion.getFolderListByUqs(this.pushUserId).then(res => {
                if(res.data.retCode == 0) {
                    this.folderList = res.data.param
                    if(this.folderList){
                        this.foldId = this.folderList[0].id
                    }
                }
            })
        },
        changeFolder(val){
            this.foldId = val
            this.getArticleByUqs()
        },
        getArticleByUqs(){
            axion.getArticleByUqs(this.foldId,this.pushUserId,this.pageNum,this.pageSize).then(res => {
                if(res.data.retCode == 0) {
                    this.pageNum = res.data.param.pageNum
                    this.pageSize = res.data.param.pageSize
                    this.total = res.data.param.total
                    if(this.articleActive == 'say'){
                        this.sayList = res.data.param.rows
                        for(let i =0;i<this.sayList.length;i++) {
                            this.sayList[i].profilePic = this.$store.state.imgUrl+this.sayList[i].profilePic
                        }
                    }else if(this.articleActive == 'article'){
                        this.articleList = res.data.param.rows
                        for(let i =0;i<this.articleList.length;i++) {
                            this.articleList[i].profilePic = this.$store.state.imgUrl+this.articleList[i].profilePic
                        }
                    }
                    console.log('say',this.sayList,'article',this.articleList)
                }
            })
        },
        lookArticle(id){
            let routeData = this.$router.resolve({ path:'/articleContent' ,query:{articleId:id}})
                window.open(routeData.href,'_blank');
        },
        checkUser(id){
            let routeData = this.$router.resolve({ path:'/personCenter' ,query:{userId:id}})
                window.open(routeData.href,'_blank');
        },
        getUserInfo(){
            if(this.pushUserId == this.userId){
            let param = {
                token:this.token
            }
            axion.getUserInfo(param).then( res => {
                if(res.data.retCode == 0) {
                    this.userInfo = res.data.param
                    this.userInfo.profilePic = this.$store.state.imgUrl+this.userInfo.profilePic
                    this.User = this.userInfo
                    let string = this.userInfo.userId
                    let shortString = string.substring(string.length - 8,string.length)
                    if(this.userInfo.nickName == shortString) {
                        this.hasChange = true
                    }else {
                        this.hasChange = false
                    }
                    console.log('11',this.hasChange)
                }
            })
            }else{
                let param = {
                    token:this.token,
                    uqsId:this.pushUserId
                }
                axion.getUsercustomInfo(param).then(res => {
                    this.userInfo = res.data.param
                    this.userInfo.profilePic = this.$store.state.imgUrl+this.userInfo.profilePic
                    this.User = this.userInfo
                })
            }
        },
        getMsg(){
            if(this.msgActive != 'sendMsg'){
                let param = {
                    token:this.token,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    type:-1
                }
                switch (this.msgActive) {
                    case 'fansMsg':
                        param.type = 106
                        break;
                    case 'commentMsg':
                        param.type = 102
                        break;
                    case 'praiseMsg':
                        param.type = 104
                        break;
                    case 'xtMsg':
                        param.type = 108
                        break;
                    case 'privateMsg':
                        param.type = 107
                        break;
                }
                axion.readReceiveMsg(param).then(res => {
                    if(res.data.retCode == 0) {
                        this.pageNum = res.data.param.pageNum
                        this.pageSize = res.data.param.pageSize
                        this.total = res.data.param.total
                        this.msgList = res.data.param.rows
                        for(let i =0;i<this.msgList.length;i++) {
                            this.msgList[i].sendProfilePic = this.$store.state.imgUrl+this.msgList[i].sendProfilePic
                            if(param.type == 108) {
                                let hasReview = this.msgList[i].content.substr(0,2)
                                if(hasReview == '审核'){
                                   this.msgList[i].hasBtn = true
                                   let splitstr = this.msgList[i].content.split(";")
                                   let jsonObj = JSON.parse(splitstr[1])
                                   this.msgList[i].articleId = jsonObj.articleId
                                   this.msgList[i].content = splitstr[0]+';'+'文章标题为：'+jsonObj.title
                                   console.log(jsonObj)
                                }else{
                                    this.msgList[i].hasBtn = false
                                }
                            }
                        }
                        
                    }
                })
            }else if (this.msgActive == 'sendMsg'){
                let param = {
                    token:this.token, 
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
                axion.readsendMsg(param).then(res => {
                    if(res.data.retCode == 0) {
                        this.pageNum = res.data.param.pageNum
                        this.pageSize = res.data.param.pageSize
                        this.total = res.data.param.total
                        this.msgList = res.data.param.rows
                        for(let i =0;i<this.msgList.length;i++) {
                            this.msgList[i].receiveProfilePic = this.$store.state.imgUrl+this.msgList[i].receiveProfilePic
                        }
                    }
                })
            }

        },
        msgRead(){
            let param = {
                token:this.token,
                type:-1
            }
            switch (this.msgActive) {
                    case 'fansMsg':
                        param.type = 106
                        break;
                    case 'commentMsg':
                        param.type = 102
                        break;
                    case 'praiseMsg':
                        param.type = 104
                        break;
                    case 'xtMsg':
                        param.type = 108
                        break;
                    case 'privateMsg':
                        param.type = 107
                        break;
                }
                axion.msgRead(param).then(res => {
                    if(res.data.retCode == 0) {
                        this.$message.success('已读成功')
                        if(param.type == 106) {
                            this.$router.push({path:'/personCenter',query:{userId:this.pushUserId,type:0}})
                        }else if(this.type == 102) {
                            this.$router.push({path:'/personCenter',query:{userId:this.pushUserId,type:1}})
                        }else if(this.type == 104) {
                            this.$router.push({path:'/personCenter',query:{userId:this.pushUserId,type:2}})
                        }else if(this.type == 108) {
                            this.$router.push({path:'/personCenter',query:{userId:this.pushUserId,type:3}})
                        }else if(this.type == 107) {
                            this.$router.push({path:'/personCenter',query:{userId:this.pushUserId,type:4}})
                        }
                    }else {
                        this.$message.warning(res.data.retInfo)
                    }
                })
        },
        sendMsg(){
            this.$prompt('请输入私信内容', '私信', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputPattern: /\S/,
                  inputErrorMessage: '请填写私信内容'
                }).then(({ value }) => {
                    let param = {
                        receiveUqsId:this.pushUserId,
                        content:value,
                        token:this.token
                    }
                  axion.sendMsg(param).then(res => {
                      if(res.data.retCode == 0) {
                          this.$message.success('发送成功')
                      }
                  })
                }).catch(() => {
                    return;     
                });
        },
        concernUser(id){
            let param = {
                beConcernUqsId:id,
                token:this.token,
                type:this.userInfo.hasConcern == true ?1:0
            }
            axion.concernUser(param).then(res => {
                if(res.data.retCode == 0) {
                    this.getUserInfo()
                    console.log('关注成功')
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
                    this.newFold = ''
                    this.getMycollectFolderList()()
                }
            })
        },
        getMycollectFolderList(){
            axion.listFold(this.pushUserId).then( res => {
                if(res.data.retCode == 0) {
                    this.collectFolderList = res.data.param
                }
            })
        },
        getCollect(){
            axion.collectionList(this.foldId,this.pageNum,this.pageSize).then(res => {
                if(res.data.retCode == 0) {
                    this.collectList = res.data.param.rows
                    this.pageNum = res.data.param.pageNum
                    this.pageSize = res.data.param.pageSize
                    this.total = res.data.param.total
                    for(let i =0;i<this.collectList.length;i++) {
                        this.collectList[i].profilePic = this.$store.state.imgUrl+this.collectList[i].profilePic
                    }
                }
            })
        },
        setFolderId(id){
            this.pageNum = 1
            this.pageSize = 10
            this.total = 0
            this.foldId = id
            this.getCollect()
        },
        deleteShow(index,id) {
            this.isShowdelete = true
            this.deleteIndex = index
        },
        deleteHide(index) {
            this.isShowdelete = false
            this.deleteIndex = -1
        },
        deleteFold(id){
            const h = this.$createElement;
                this.$msgbox({
                    title: "删除确认",
                    message: h("p", null, [
                        h("p",{style: "line-height:22px"}, "是否删除所选收藏夹")
                    ]),
                    showCancelButton: true,
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    beforeClose: (action, instance, done) => {
                        if(action === "confirm") {
                            this.delete(id);//调删除接口
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
        delete(id){
            let param = {
                folderId:id,
                token:this.token
            }
            axion.deleteFold(param).then(res => {
                if(res.data.retCode == 0) {
                    console.log('删除成功')
                    this.getMycollectFolderList()
                }else{
                    this.$message.warning('删除失败')
                }
            })
        },
        getConcern(){
            if(this.concernActive == 'user'){
                axion.getConcernUser(this.pageNum,this.pageSize,this.token).then(res => {
                    if(res.data.retCode == 0) {
                        this.concernUserList = res.data.param.rows
                        this.pageNum = res.data.param.pageNum
                        this.pageSize = res.data.param.pageSize
                        this.total = res.data.param.total
                        for(let i =0;i<this.concernUserList.length;i++) {
                            this.concernUserList[i].profilePic = this.$store.state.imgUrl+this.concernUserList[i].profilePic
                        }
                    }
                })
            }else if(this.concernActive == 'topic'){
                axion.getConcernTopic(this.pageNum,this.pageSize,this.token).then(res => {
                    if(res.data.retCode == 0) {
                        this.concernTopicList = res.data.param.rows
                        this.pageNum = res.data.param.pageNum
                        this.pageSize = res.data.param.pageSize
                        this.total = res.data.param.total
                        for(let i =0;i<this.concernTopicList.length;i++) {
                            this.concernTopicList[i].topicProfilePic = this.$store.state.imgUrl+this.concernTopicList[i].topicProfilePic
                        }
                    }
                })
            }
        },
        getFans(){
            axion.getFans(this.pageNum,this.pageSize,this.token).then( res => {
                if(res.data.retCode == 0) {
                    this.fansList = res.data.param.rows
                    this.pageNum = res.data.param.pageNum
                    this.pageSize = res.data.param.pageSize
                    this.total = res.data.param.total
                    for(let i =0;i<this.fansList.length;i++) {
                        this.fansList[i].profilePic = this.$store.state.imgUrl+this.fansList[i].profilePic
                    }
                }
            })
        },
        getDynamic(){
            let type = -1
            if(this.dynamicActive == 'saydynamic'){
                type = 0
            }else if (this.dynamicActive == 'articledynamic') {
                type= 1
            }
            axion.dynamicArticle(type,this.pageNum,this.pageSize,this.token).then( res => {
                if(res.data.retCode == 0) {
                    this.dynamic = res.data.param.dynamicArticleDTOs.rows
                    this.pageNum = res.data.param.dynamicArticleDTOs.pageNum
                    this.pageSize = res.data.param.dynamicArticleDTOs.pageSize
                    this.total = res.data.param.dynamicArticleDTOs.total
                    for(let i =0;i<this.dynamic.length;i++) {
                        this.dynamic[i].profilePic = this.$store.state.imgUrl+this.dynamic[i].profilePic
                    }
                }
            })
        },
        selectFile(file){
            console.log('file',file)
        },
        uploadUserPic(param){
            console.log('param',param)
            let file = new FormData()
            file.append('image',param.file)
            file.append('token',this.token)
            axion.uploadUserPic(file).then( res => {
                if(res.data.retCode == 0) {
                    this.$message.success('更换成功')
                    this.getUserInfo()
                }else {
                    this.$message.warning(res.data.retInfo)
                }
            })
        },
        save(){
            console.log(this.User.birthday)
            let param = {
                nickName:this.User.nickName,
                sex:this.User.sex,
                birthday:this.User.birthday == null?null:this.User.birthday instanceof Date?this.getDate(this.User.birthday):this.User.birthday,
                cardId:this.User.cardId,
                eMail:this.User.email,
                age:this.User.age,
                introduction:this.User.introduction,
                token:this.token
            }
            axion.updateUserInfo(param).then( res => {
                if(res.data.retCode == 0) {
                    this.flag = true
                    this.$message.success('保存成功')
                    this.getUserInfo()
                }
            })
            console.log(param)
        },
        cancle(){
            this.flag = true
            this.getUserInfo()
        },
        getDate(date){
            let y = date.getFullYear()
            let m = date.getMonth()+1
            let d = date.getDate()
            if(m < 10) {
                m = '0'+m
            }
            if(d < 10) {
                d = '0'+d
            }
            return y+'-'+m+'-'+d
        }
    }
}
</script>
<style lang="scss">
.listbottom{
        border-bottom:1px solid #A9A9A9;
    }
</style>
