<template>
    <div>
     <el-carousel height="300px">
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                <img :src="item.url" alt="">
            </el-carousel-item>
        </el-carousel>   
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgList:[
                // {
                //     url:'https://hlwyy-10001356.image.myqcloud.com/a5df14bb-c485-48e1-88dd-0c13fc51100a'
                // },{
                //     url:'https://hlwyy-10001356.image.myqcloud.com/0cd9e18e-c4ff-48b0-972d-26abf681eea7'
                // },{
                    {
                    url:'http://diagnose.zwjk.com/upload/2018/09/12/1536724290857.png'
                }
            ]
        }
    },
}
</script>