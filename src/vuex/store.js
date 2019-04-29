import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        imgUrl:'http://192.168.1.101:8515/img/getPicture?path='
    }
})
 export default store