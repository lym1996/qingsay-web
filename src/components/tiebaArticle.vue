<template>
    <div>
        <div class="floatRight margintop10 marginright30" ><el-button type="primary" @click="pushArticle">发表</el-button></div>
        <div style="clear:both;"></div>
        <div class="paddingX30">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="青说" name="first">
                    <articleList :activeName="activeName" :article="article"></articleList>
                </el-tab-pane>
                <el-tab-pane label="文章" name="second">
                    <articleList :activeName="activeName" :article="article"></articleList>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="textAlignCenter margin20X">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total"
            ></el-pagination>
        </div>
        <el-dialog title="发表" width="70%" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <editArticle @closeDialog="close" @fresh="freshArticle"></editArticle>
        </el-dialog>
    </div>
</template>
<script>
import axion from '@/util/api.js'
import articleList from '../components/article'
import editArticle from '../components/editArticle'
export default {
    components:{ articleList, editArticle },
    data() {
        return {
            token:localStorage.getItem('user_token'),
            activeName:'first',
            article:[],
            pageNum:1,
            pageSize:10,
            total:0,
            dialogVisible:false, 
        }
    },
    watch: {
        topicId(val,oldValue) {
            this.getArticle(this.activeName)
            sessionStorage.setItem('topicId',this.topicId)
        }
    },
    mounted() {
        console.log('topicId',this.topicId)
        this.getArticle(this.activeName)
    },
    methods: {
        close(msg){
            this.dialogVisible = msg
        },
        pushArticle(){
            this.dialogVisible = true
        },
        handleClick(tab,event){
            this.activeName = tab.name
            this.getArticle(tab.name)
        },
        handleCurrentChange(val){
            this.pageNum = val
            this.getArticle(this.activeName)
            document.body.scrollTop = document.documentElement.scrollTop = 300;
        },
        getArticle(name){
            this.article = []
            let type
            if(name == 'first'){
                type = 0
            }else if(name == 'second') {
                type = 1
            }
            axion.gettopicArticle(this.pageNum,this.pageSize,this.topicId,type).then(res => {
                if(res.data.retCode == 0) {
                    this.article = res.data.param.rows
                    for(let i =0;i<this.article.length;i++) {
                        this.article[i].profilePic = this.$store.state.imgUrl+this.article[i].profilePic
                    }
                    this.total = res.data.param.total
                }else {
                    this.total = 0
                }
            })
        },
        freshArticle(msg){
            this.getArticle(this.activeName)
        }
    },
    props:["topicId"]
}
</script>