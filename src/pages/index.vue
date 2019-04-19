<template>
    <div>
        <!-- 头部 -->
        <!-- 导航 -->
        <!-- 主题内容 -->
        <div>
            <navlist></navlist>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import navlist from '../components/nav'
export default {
    components:{ navlist },
    data() {
        return {
            
        }
    },
}
</script>