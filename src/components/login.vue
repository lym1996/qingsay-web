<template>
  <div>
    <div class="modalWrap">
      <i class="el-icon-close" @click="close"></i>
      <main v-show="isSuccess" class="textAlignCenter">
        <div class="margintop30 color-666 fontsize2">{{alert.title}}</div>
        <div class="margintop40 color-333">{{alert.content}}</div>
        <button
          type="button"
          class="margintop60 loginBtn"
          @click="switchTab(0)"
        >{{alert.button}}</button>
      </main>
      <main v-show="!isSuccess">
        <nav class="tabNav margintop40">
          <p v-show="tabIndex == 0 || tabIndex == 1">
            <span :class="['tabMenu', {'cur' : tabIndex == 0}]" @click="switchTab(0)">登录</span>
            <span :class="['tabMenu', {'cur' : tabIndex == 1}]" @click="switchTab(1)">注册</span>
          </p>
          <p v-show="tabIndex == 2" class="fontsize2 textAlignCenter paddingbottom15">忘记密码</p>
        </nav>
        <form class="infoForm margintop30" id="myForm">
          <div class="formItem">
            <el-input
              prefix-icon="el-icon-ts-single"
              v-model="phone"
              placeholder="请输入手机号"
              @keyup.enter="msgLogin"
            ></el-input>
          </div>
          <div class="formItem margintop15">
            <el-input
              type="password"
              prefix-icon="el-icon-ts-lock"
              v-model="password"
              placeholder="请输入密码"
              @keyup.enter="msgLogin"
            ></el-input>
          </div>
          <div v-show="tabIndex == 1 || tabIndex == 2" class="formItem margintop15">
            <el-input
              type="password"
              prefix-icon="el-icon-ts-lock"
              v-model="passwordAgain"
              placeholder="请再次输入密码"
              @keyup.enter="msgLogin"
            ></el-input>
          </div>
          <div v-show="tabIndex == 1 || tabIndex == 2" class="formItem margintop15 flex-align-spacebetween">
            <el-input v-model="inputCode" placeholder="请输入图中验证码" @keyup.enter="msgLogin"></el-input>
            <el-button v-if="!hasSend" @click="getImg(tabIndex)" class="imgBtn">获取图形验证码</el-button>
            <img
              v-else
              id="codeImg"
              class="codeImg"
              style="margin-left:20px;"
              :src="imgsrc"
              alt="图形验证码"
              @click=" getImgUrl"
            >
          </div>
          <div
            v-show="tabIndex === 1 || tabIndex === 2"
            class="formItem margintop15 flex-align-spacebetween"
          >
            <el-input
              v-model="msgCode"
              placeholder="请输入短信验证码"
              @keyup.enter="msgLogin"
              style="margin-right:10px;"
            ></el-input>
            <b-button
              :ischeck="ischeck"
              variant="variant"
              @click="getMsgCode(ischeck,tabIndex)"
              :class="['codeBtn', {'cur': ischeck==1}]"
            >
              <span v-if="time !== '获取验证码' && time !== 'vertificode'">{{time}}s</span>
              <span v-else>获取验证码</span>
            </b-button>
          </div>
        </form>
        <div
          v-show="tip.text"
          class="margintop15 fontsize-2"
          :style="tip.type === 'error' ? {color: '#FF3939'} : {color: '#005BAC'}"
        >{{tip.text}}</div>
        <!-- 登录 -->
        <section v-show="tabIndex == 0">
          <p class="textAlignRight">
            <button
              type="button"
              @click="switchTab(2)"
              class="margintop15 fontsize-2 color-666 cursorPointer underline"
            >忘记密码？</button>
          </p>
          <button type="button" class="loginBtn margintop20 width300" @click="msgLogin">登录</button>
          <p class="textAlignRight margintop15 fontsize-2">
            <span class="color-666">还没有账户？</span>
            <button
              type="button"
              class="the-color-theme cursorPointer underline"
              @click="switchTab(1)"
            >立即注册</button>
          </p>
        </section>
        <!-- 注册 -->
        <section v-show="tabIndex === 1">
          <button class="loginBtn margintop15 width300" @click="msgLogin">注册</button>
          <p class="textAlignRight margintop15 fontsize-2">
            <span class="color-666">已有账户，</span>
            <button
              type="button"
              @click="switchTab(0)"
              class="the-color-theme cursorPointer underline"
            >去登录</button>
          </p>
        </section>
        <!-- 忘记密码 -->
        <section v-show="tabIndex === 2">
          <button class="loginBtn margintop30 width300" @click="msgLogin">重置密码</button>
          <p class="textAlignRight margintop15 fontsize-2">
            <span class="color-666">已有账户，</span>
            <button
              type="button"
              @click="switchTab(0)"
              class="the-color-theme cursorPointer underline"
            >去登录</button>
          </p>
        </section>
      </main>
    </div>
  </div>
</template>
<script>
import axion from '@/util/api.js'
export default {
  data() {
    return {
      hasSend:false,
      isSuccess: false,
      isAgree: false,
      alert: {
        title: "",
        content: "",
        button: ""
      },
      tip: {
        type: "", // info：信息类提示（蓝色），error：错误类提示（红色）
        text: ""
      },
      imgsrc:'',
      phone: "", //电话
      password: "", //密码
      passwordAgain: "", //再次输入密码
      inputCode: "", //图形验证码输入
      msgCode: "", //短信验证码
      ischeck: 1,
      time: "获取验证码",
      isRequest:true
    };
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
      this.formRset();
    },
    formRset() {
      document.getElementById("myForm").reset();
      this.phone = "";
      this.password = "";
      this.passwordAgain = "";
      this.inputCode = "";
    },
    switchTab(index) {
      this.isSuccess = false;
      this.$emit("switchTab", index);
      this.formRset();
    },
    msgLogin() {//输入验证以及登录注册忘记密码
        let phonereg = /^[1][3-9][0-9]{9}$/;
        if(!phonereg.test(this.phone)) {
            this.$message({
                type:'warning',
                message:'请输入正确的手机号！'
            });
            this.isSuccess = false;
            return;
        }
        if(this.password == '') {
            this.$message({
                type:'warning',
                message:'密码不能为空！'
            });
            this.isSuccess = false;
            return;
        }
        //登录
        if(this.tabIndex == 0 && this.isRequest) {
            this.isRequest = false
            this.isSuccess = false
                //调登录接口
                //登录成功  setItem
                let param = {
                  userId:this.phone,
                  password:this.password,
                }
                axion.login(param).then( res => {
                  if(res.data.retCode == 0) {
                    localStorage.setItem('user_phone',res.data.param.phone)
                    localStorage.setItem('user_token',res.data.param.token)
                    localStorage.setItem('isLogin',true)
                    localStorage.setItem('userId',res.data.param.user_id)
                    history.go(0)
                  }else {
                    this.$message.warning(res.data.retInfo)
                    this.isSuccess = false;
                    this.isRequest = true;
                  }
                })
                //登陆失败  this.isSuccess = false; this.isRequest = true
                
                
        }else if(this.tabIndex == 2 && this.isRequest) { 
            //忘记密码
            this.isRequest = false
            if(this.password == '' || this.passwordAgain == '') {
                this.$message({
                    type:'warning',
                    message:'密码或再次确认密码不能为空!'
                });
                this.isSuccess = false;
                return;
            }
            if(this.password != this.passwordAgain) {
                this.$message({
                    type:'warning',
                    message:'两次密码输入不一致，请核对后输入!'
                });
                this.isSuccess = false;
                return;
            }
            if(this.msgCode == ''){
                this.$message({
                    type:'warning',
                    message:'短信验证码不能为空！'
                });
                this.isSuccess = false;
                return;
            }
            let param = {
              phone:this.phone,
              newPwd:this.password,
              msgCode:this.msgCode
            }
            axion.reSetPassword(param).then( res => {
              if(res.data.retCode == 0) {
                this.isSuccess = true
                this.isRequest = true
                this.alert = {title:'重置成功',content:'恭喜你，重置成功',button:'去登录'}
              }else {
                this.$message.warning(res.data.retInfo)
                this.isSuccess = false
              }
            })
            //调用忘记密码接口
            // 重置 密码成功 ===》 
            // this.isSuccess = true;this.isRequest = true; this.alert = {title:'重置成功',content:'恭喜你，重置成功',button:'去登录'} ,setItem
            //重置密码失败 ===》 this.isSuccess = false;

        }else if(this.tabIndex == 1 && this.isRequest != 0) {
            //注册
            this.isRequest = false
            if(this.password == '' || this.passwordAgain == '') {
                this.$message({
                    type:'warning',
                    message:'密码或再次确认密码不能为空!'
                });
                this.isSuccess = false;
                return;
            }
            if(this.password != this.passwordAgain) {
                this.$message({
                    type:'warning',
                    message:'两次密码输入不一致，请核对后输入!'
                });
                this.isSuccess = false;
                return;
            }
            if(this.msgCode == ''){
                this.$message({
                    type:'warning',
                    message:'短信验证码不能为空！'
                });
                this.isSuccess = false;
                return;
            }
            let param = {
              userId:this.phone,
              msgCode:this.msgCode,
              password:this.password
            }
            axion.registration(param).then( res => {
              if(res.data.retCode == 0) {
                this.isSuccess = true
                this.alert = {
                  title:'注册成功',
                  content:'恭喜你，注册成功',
                  button:'去登录'
                }
              }else {
                this.isSuccess = false;
                this.isRequest = true;
              }
            })
            //调用注册接口
            //  注册成功 ===》 this.isSuccess = true; this.alert = {title:'注册成功',content:'恭喜你，注册成功',button:'去登录'} ,setItem
            // 注册失败 ===》 this.isSuccess = false; this.isRequest = true;
        }
    }, 
    getImg(index){
      if(this.phone != '') {
        this.hasSend = true
        this.getImgUrl(index)
      }else {
        this.$message.warning('请输入手机号')
      }
    },
    //图片验证url获取
    getImgUrl(index) {
      let param = {
        phone:this.phone,
        type:0
      }
      if(index == 0) {
        param.type = 2
      }else if(index == 1) {
        param.type = 0
      }else {
        param.type = 1
      }
      axion.getImgUrl(param).then( res => {
        if(res.data.retCode == 0) {
          this.imgsrc = res.data.param.validate_code_url
        }else {
          this.$message.warning(res.data.retInfo)
        }
      })
    }, 

    getMsgCode(ischeck, type) {
      //短信验证
      let phonereg = /^[1][3-9][0-9]{9}$/;
      if (!phonereg.test(this.phone)) {
        this.$message({
          type: "warning",
          message: "请输入正确的手机号"
        });
        return;
      }
      if(this.inputCode == '') {
        this.$message.warning('请填写图形验证码')
        return;
      }
      if (ischeck == 0) {
        return;
      } else {
        this.ischeck = 0;
      }
      //注册获取短信验证码
      if (type == 1) {
        //调短信验证码
        let param = {
          phone:this.phone,
          type:0,
          picCode:this.inputCode
        }
        axion.getMsgCode(param).then( res => {
          if(res.data.retCode == 0) {
            this.$message.success('短信已发送')
          }
        })
      } else if (type == 2) {//忘记密码获取短信验证码
        //调接口获取短信
        let param = {
          phone:this.phone,
          type:1,
          picCode:this.inputCode
        }
        axion.getMsgCode(param).then( res => {
          if(res.data.retCode == 0) {
            this.$message.success('短信已发送')
          }
        })
      }
      this.time = 60;
      let a = setInterval(() => {
        this.time = this.time - 1;
        if (this.time == 0) {
          this.time = "获取验证码";
          this.ischeck = 1;
          clearInterval(a);
        }
      }, 1000);
    }
  },
  props: ["tabIndex"]
};
</script>