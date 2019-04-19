<template>
    <div class="editArticle">
        <div>
            <span>发表类型：</span>
            <el-radio v-model="type" label="0" @change="emptySelect">青说</el-radio>
            <el-radio v-model="type" label="1" @change="emptySelect">文章</el-radio>
            <span class="marginleft40">选择文集</span>
            <el-select  class="marginleft20" v-model="folder" :disabled="selectDis" clearable  placeholder="请选择文集">
                <el-option
                    v-for="item in folderList" 
                    :key="item.id"
                    :label="item.folderName"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-button class="floatRight marginright20" type="primary" @click="published">投稿</el-button>
            <div style="clear:both;"></div>
        </div>
        <div class="margintop20">
            <span class="fontsize6 marginright20">标题</span>
            <el-input v-model="title" clearable style="width:300px;"></el-input>
        </div>
        <div class="margintop20">
            <span class="fontsize6 marginright20">描述:</span>
            <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入发表内容的描述"
            v-model="textarea"
            style="width:600px;vertical-align:top;"
            ></el-input>
        </div>
        <div class="margintop20">
            <mavon-editor ref=md  
            :ishljs="true"
            v-model="content" 
            @imgAdd="imgAdd" 
            @save="save" 
            @change="getHtml"
            style="height:500px;whith:100%;">
            </mavon-editor>
        </div>
    </div>
</template>
<script>
import axion from '@/util/api.js'
export default {
    data() {
        return {
            imgUrl:'',
            topicId:sessionStorage.getItem('topicId'),
            token:localStorage.getItem('user_token'),
            type:'0',
            folder:'',
            folderList:[],
            title:'',
            textarea:'',
            content:'',
            article:''
        }
    },
    computed: {
        selectDis(){
            if(this.type == 0){
                return true
            }else {
                return false
            }
        }
    },
    mounted() {
        this.imgUrl = this.$store.state.imgUrl
        console.log('imgUrl',this.imgUrl)
        this.getFolderList()
    },
    methods: {
        emptySelect(){
            this.folder = ''
        },
        getFolderList(){
            axion.getFolderList(this.token).then( res => {
                if( res.data.retCode == 0) {
                    this.folderList = res.data.param
                }
            })
        },
        imgAdd(pos, $file){
            var file = new FormData();
            file.append('image', $file);
            file.append('articleFolderId', this.folder)
            file.append('token', this.token)
            file.append('type',this.type)
            axion.uploadArticlePic(file).then(res => {
                if(res.data.retCode == 0) {
                    this.$refs.md.$img2Url(pos, this.$store.state.imgUrl + res.data.param)
                    this.$message.success("上传成功");
                } else {
                    this.$message.warning("上传失败" + res.data.retInfo);
                }
            })
            
        },
        save(){},
        getHtml(content,html) {
            this.article = html
        },
        published(){
            if(this.type == 1 && this.folder == ''){
                this.$message.warning('请选择文集')
                return;
            }
            if(this.title == ''){
                this.$message.warning('请填写标题')
                return;
            }
            if(this.article == '') {
                this.$message.warning('请填写文章内容')
                return;
            }
            let param = {
                articleFolderId:parseInt(this.folder),
                content:this.article,
                title:this.title,
                token:this.token,
                topicId:parseInt(this.topicId),
                type:parseInt(this.type)
            }
            console.log('param',param)
            axion.write(param).then(res => {
                this.$emit('closeDialog',false)
                if(res.data.retCode == 0) {
                    this.$message.success('投稿成功，等待审核')
                    this.$emit('fresh',true)
                }
            })
        }
    },
}
</script>
<style lang="scss">
</style>
