<template>
    <div class="notFound">
        <div class="search width800 marginXauto margintop100">
            <el-input placeholder="请输入感兴趣的内容" v-model="searInput">
                    <el-button slot="append" @click="searchQS">进入青说</el-button>
            </el-input>
        </div>
        <div class="width800 marginXauto margintop10">
            <div class="textAlignCenter">
                <img src="https://rubikx-10001356.image.myqcloud.com/3bbd6b52-cc0d-4d97-a90c-9338eacf089f" alt="" width="200" >
                <div class="margintop20 fontsize6" style="color:#2a3f54;">搜索不到相关结果，是否创建该主题</div>
            </div>
        </div>
        <div class="margintop20 marginXauto width800">
            <div class="textAlignCenter">
                <div class="margintop20 ">
                    <span class="inlineBlock  fontsize4 width100 marginright20 textAlignRight">主题名:</span>
                    <span class="inlineBlock textAlignLeft fontsize6" style="width:350px;color:#2a3f54;">{{topicName}}</span>
                </div>
                <div class="margintop20">
                    <span class="inlineBlock fontsize4 width100 textAlignRight marginright20">标签:</span>
                    <el-input v-model="tag" style="width:350px;">
                        <el-button slot="append" @click="addTag">+</el-button>
                    </el-input>
                </div>
                <div class="margintop10 marginleft200" style="width:500px;">
                    <el-tag
                      class="marginleft10 margintop10"
                      :key="index"
                      v-for="(tag,index) in tagList"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag}}
                    </el-tag>
                </div>
                <div class="margintop20">
                    <span class="inlineBlock fontsize4 width100 textAlignRight marginright20">主题描述:</span>
                    <el-input type="textarea" v-model="description" style="width:350px;vertical-align:top;"></el-input>
                </div>
                <div class="margintop30">
                    <el-button type="primary" @click="addTopic">创建主题</el-button>
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
            searInput:'',
            tag:'',
            topicName:'',
            description:'',
            tagList:[],
        }
    },
    mounted() {
        this.topicName = this.$route.query.topicName
        console.log('topicNmae',this.topicName)
    },
    methods: {
        searchQS(){
            if( this.searInput == ''){
                this.$message.warning('请输入搜索内容')
                return;
            }else {
                let routeData = this.$router.resolve({ path:'/tieba' ,query:{topic:this.searInput}})
                window.open(routeData.href,'_blank');
            }
        },
        addTag(){
            if(this.tag.trim() == '') {
                this.$message.warning('请填写标签内容')
                return;
            }
            if(this.tagList.length == 5){
                this.$message.warning('最多添加5个标签')
                this.tag = ''
                return;
            }
            this.tagList.push(this.tag)
            this.tag = ''
            console.log(this.tagList,'list')
        },
        handleClose(tag){
            this.tagList.splice(this.tagList.indexOf(tag), 1);
            console.log(this.tagList,'list')
        },
        addTopic(){
            let topicTag = this.tagList.join(";")
            console.log(topicTag,'11')
            let param = {
                topicTag:topicTag,
                topicName:this.topicName,
                token:this.token,
                description:this.description
            }
            axion.addTopic(param).then( res => {
                if( res.data.retCode == 0) {
                    this.$router.push({path:'/tieba',query:{topic:this.topicName}})
                }else if(res.data.retCode == 50004) {
                    this.$message.warning('请登录')
                }else {
                    this.$message.warning(res.data.retInfo)
                }
            })
        }
    },
}
</script>