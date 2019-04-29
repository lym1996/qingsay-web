<template>
    <div class="recommendArticle relative">
        <div class="paddingX30">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="精彩推荐" name="first">
                    <articleList :activeName="activeName" :article="article"></articleList>
                </el-tab-pane>
                <el-tab-pane label="最新推荐" name="second">
                    <articleList :activeName="activeName" :article="article"></articleList>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="textAlignCenter">
            <el-button size="mini" type="primary" @click="backTop">返回顶部</el-button>
        </div>
        <div class="absolute cursorPointer" style="right:30px;top:5px;">
            <img src="../assets/common/img/fresh.png" alt="" width="25" height="25" @click="refresh">
        </div>
    </div>
</template>
<script>
import axion from '@/util/api.js'
import articleList from '../components/article'
export default {
    components:{ articleList },
    data() {
        return {
            token:localStorage.getItem('user_token'),
            activeName:'first',
            article:[]
        }
    },
    mounted() {
        this.getArticle(this.activeName)
    },
    methods: {
        handleClick(tab,event){
            this.activeName = tab.name
            this.getArticle(tab.name)
        },
        getArticle(name){
            if(name == 'first') {
                axion.getHotArticle(this.token).then( res => {
                    if(res.data.retCode == 0) {
                        this.article = res.data.param
                        for(let i =0;i<this.article.length;i++) {
                            this.article[i].profilePic = this.$store.state.imgUrl+this.article[i].profilePic
                        }
                    }
                })
            }else if(name == 'second') {
                axion.getTodayArticle(this.token).then( res => {
                    if(res.data.retCode == 0) {
                        this.article = res.data.param
                        for(let i =0;i<this.article.length;i++) {
                            this.article[i].profilePic = this.$store.state.imgUrl+this.article[i].profilePic
                        }
                    }
                })
            }
        },
        refresh(){
            this.getArticle(this.activeName)
        },
        backTop(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    },
}
</script>