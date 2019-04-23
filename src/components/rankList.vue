<template>
    <div class="bgcolor-white border-color margintop10">
        <div>
            <div class="floatLeft marginleft10">
                <img class="margintop5" src="../assets/common/img/rank.png" alt="" width="50" style="vertical-align: middle;">
                <span class="marginleft10 fontsize7 bold" style="vertical-align: middle;">热议榜</span>
            </div>
            <div class="floatRight margintop10 marginright10 Ttype">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">{{timeType}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in options" :key="index" :command="item.label">{{item.label}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div class="marginbottom20">
            <div v-for="(item,index) in rankList" :key="index" class="marginleft20 margintop10">
                <div v-if="index == 0">
                    <div class="floatLeft">
                    <img src="../assets/common/img/金牌.png" alt="" width="35" style="vertical-align: middle;">
                    <span class="marginleft20 fontsize4 cursorPointer" @click="lookArticle(item.id)">{{item.title}}</span>
                    </div>
                    <div class="floatRight">
                        <span class="fontsize4">{{item.hotValue}}</span>
                        <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div v-if="index == 1">
                    <div class="floatLeft">
                        <img src="../assets/common/img/银牌.png" alt="" width="35" style="vertical-align: middle;">
                        <span class="marginleft20 fontsize4 cursorPointer" @click="lookArticle(item.id)">{{item.title}}</span>
                    </div>
                    <div class="floatRight">
                        <span class="fontsize4">{{item.hotValue}}</span>
                        <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div v-if="index == 2">
                    <div class="floatLeft">
                        <img src="../assets/common/img/铜牌.png" alt="" width="35" style="vertical-align: middle;">
                        <span class="marginleft20 fontsize4 cursorPointer" @click="lookArticle(item.id)">{{item.title}}</span>
                    </div>
                    <div class="floatRight">
                        <span class="fontsize4">{{item.hotValue}}</span>
                        <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div v-if="index > 2" class="marginleft5 margintop20">
                    <div class="floatLeft">
                        <div class="fontsize4 rankitem floatLeft"><span class="floatRight">{{index+1}}</span></div>
                        <div class="marginleft35 fontsize4 floatLeft cursorPointer" @click="lookArticle(item.id)">{{item.title}}</div>
                        <div style="clear:both;"></div>
                    </div>
                    <div class="floatRight">
                        <span class="fontsize4">{{item.hotValue}}</span>
                        <img src="../assets/common/img/rankHot.png" class="marginright50" alt="" width="15">
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
            timeType:'天',
            options:[{
                label:'天',
                value:0
            },{
               label:'周',
                value:1
            },{
                label:'月',
                value:2
            }],
            rankList:[]
        }
    },
    mounted() {
        this.getRankList('天')
    },
    methods: {
        handleCommand(command){
            this.timeType = command
            this.getRankList(this.timeType)
        },
        getRankList(type){
            if(this.timeType == '天') {
                axion.getDailyRank().then( res => {
                    if(res.data.retCode == 0) {
                        this.rankList = res.data.param
                        this.subTitle(this.rankList)
                    }
                })
            }else if(this.timeType == '周') {
                axion.getWeekRank().then( res => {
                    if(res.data.retCode == 0) {
                        this.rankList = res.data.param
                        this.subTitle(this.rankList)
                    }
                })
            }else if(this.timeType == '月') {
                axion.getMonthRank().then( res => {
                    if(res.data.retCode == 0) {
                        this.rankList = res.data.param
                        this.subTitle(this.rankList)
                    }
                })
            }
        },
        subTitle(list){
            for(let i = 0;i<list.length;i++){
                if(list[i].title.length > 10){
                    list[i].title = list[i].title.substr(0,10) + '...'
                }
            }
        },
        lookArticle(id){
            let routeData = this.$router.resolve({ path:'/articleContent' ,query:{articleId:id}})
                window.open(routeData.href,'_blank');
        }
    },
}
</script>