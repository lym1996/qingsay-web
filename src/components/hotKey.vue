<template>
    <div class="bgcolor-white border-color">
        <div>
            <div class="margintop10 marginleft10">
                <img src="../assets/common/img/allsearch.png" width="40" alt="" style="vertical-align: top;">
                <span class="marginleft10 fontsize7 bold">大家都在搜</span>
            </div>
            <div class="margintop10 marginleft20">
                <span class="tbtopic" v-for="(item,index) in hotKeyWord" :key="index" @click="gosearch(item)">{{item}}</span>
            </div>
            <div style="clear:both;"></div>
        </div>
    </div>
</template>
<script>
import axion from '@/util/api.js'
export default {
    data() {
        return {
            hotKeyWord:[]
        }
    },
    mounted() {
        this.getKeyWord()
    },
    methods: {
        getKeyWord(){
            axion.getKeyWord().then(res => {
                if(res.data.retCode == 0) {
                    this.hotKeyWord = res.data.param
                }
            })
        },
        gosearch(keyWord){
            let routeData = this.$router.resolve({ path:'/searchPage' ,query:{keyWord:keyWord}})
            window.open(routeData.href,'_blank');
        }
    },
}
</script>