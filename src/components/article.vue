<template>
    <div class="article marginbottom20">
        <div v-for="(item,index) in article" :key="index" class="marginbottom10">
            <div v-if="!!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
              <img :src="item.firstContentPic" alt="" width="100" height="100" class="floatLeft marginleft20" style="vertical-align: middle">
              <div class="floatLeft marginleft20" style="width:580px;">
                  <span class="title" @click="lookArticle(item.id)">{{item.title}}</span>
                  <span class="marginleft10" style="color:#A9A9A9;">{{item.topicName}}</span>
                  <div class="content" v-if="!!item.littleContent" >{{item.littleContent}}</div>
                  <div class="content" v-if="!!item.content" >{{item.content}}</div>
              </div>
              <div style="clear:both;"></div>
              <div class="marginleft20 margintop10 marginright25">
                  <div class="floatLeft">
                      <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.browseCount}}</span>
                   <img class="marginleft10" src="../assets/common/img/NoPraise.png" alt="" width="12" height="12" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.praiseCount}}</span>
                  </div>
                  <div class="floatRight">
                      <img class="marginleft10" :src="item.profilePic" alt="" width="20" height="20" style="vertical-align: middle;border-radius:50px;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">作者：{{item.nickName}}</span>
                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                  </div>
                  <div style="clear:both;"></div>
              </div>
            </div>
            <div v-if="!item.firstContentPic" :class="['paddingbottom20','paddingtop10', {'listbottom':index != 9}]">
              <div class="marginleft20" style="width:700px;">
                  <span class="title" @click="lookArticle(item.id)">{{item.title}}</span>
                  <span class="marginleft10" style="color:#A9A9A9;">{{item.topicName}}</span>
                  <div class="content">{{item.littleContent}}</div>
                  <div class="content" v-if="!!item.content" >{{item.content}}</div>
              </div>
              <div class="marginleft20 margintop10 marginright20">
                  <div class="floatLeft">
                      <img src="../assets/common/img/look.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.browseCount}}</span>
                      <img class="marginleft10" src="../assets/common/img/NoPraise.png" alt="" width="12" height="12" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:60px;">{{item.praiseCount}}</span>
                  </div>
                  <div class="floatRight">
                      <img class="marginleft10" :src="item.profilePic" alt="" width="15" height="20" style="vertical-align: middle;border-radius:30px;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">作者：{{item.nickName}}</span>
                      <img class="marginleft10" src="../assets/common/img/time.png" alt="" width="15" height="15" style="vertical-align: middle;"><span class="marginleft10" style="vertical-align: middle;display:inline-block;width:140px;">{{item.createTime}}</span>
                  </div>
                   <div style="clear:both;"></div>
              </div>
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
        }
    },
    computed: {},
    mounted() {

    },
    methods: {
        lookArticle(id){
            let routeData = this.$router.resolve({ path:'/articleContent' ,query:{articleId:id}})
                window.open(routeData.href,'_blank');
        }
    },
    props:["activeName","article"]
}
</script>
<style lang="scss">
    .listbottom{
        border-bottom:1px solid #A9A9A9;
    }
</style>
