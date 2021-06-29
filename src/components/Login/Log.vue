<template>
  <div>

    <!-- Begin page -->
    <div class="accountbg"></div>
    <div class="wrapper-page">
      <div class="card">
        <div class="card-body">
          <!--
          <h3 class="text-center m-0">
            <a href="index.html" class="logo logo-admin"
              ><img src="assets/images/DaoYun-Logo.png" height="80" alt="logo"
            /></a>
          </h3>
          -->
          <img src="@/assets/images/DaoYun-Logo.png" width="200">
          <div class="p-3">
            <h4 class="font-18 m-b-5 text-center">欢迎!</h4>
            <p class="text-muted text-center">登录以继续</p>

            <el-tabs type="border-card">
              <!--     手机号验证码登录         -->
              <el-tab-pane label="手机号登录">
<!--                <form class="form-horizontal m-t-30" action="index.html">-->
                <el-form class="form-horizontal m-t-30" action="index.html">
                  <div class="form-group">
                    <label for="phone_num">手机号</label>
                    <input
                      type="text"
                      class="form-control"
                      id="phone_num"
                      placeholder="输入手机号"
                      v-model="phone"
                    />
                  </div>

                  <div class="form-group">
                    <label for="val_num">验证码</label>

                    <el-row :gutter='34'>
                      <el-col :span="14">
                        <el-form-item>
                          <input class="form-control" id="val_num" placeholder="输入验证码" v-model="validation">
<!--                          <el-input class="form-control" id="val_num" placeholder="输入验证码" v-model="validation"></el-input>-->
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item >
                          <el-button :disabled="disabled" v-show="show" type="warning" @click="sendcode" class="val_button">{{btntxt}}</el-button>

                        </el-form-item>

                      </el-col>
                    </el-row>

                  </div>

                  <div>
                    <el-alert
                      v-show = isShow
                      type="error">
                      {{showMsg}}
                    </el-alert>
                  </div>
                  <div class="form-group row m-t-20">
<!--                    <div class="col-sm-6">-->

<!--                    </div>-->
                    <div class="col-sm-8 text-right">
                      <button
                        class="btn btn-primary w-md waves-effect waves-light" type="button"
                        @click="login()"
                      >
                        登录
                      </button>
                    </div>
                  </div>

                  <div class="form-group m-t-10 mb-0 row">
                    <div class="col-12 m-t-20">

                    </div>
                  </div>
                </el-form>

              </el-tab-pane>

              <!--     账号密码登录         -->
              <el-tab-pane label="账号密码登录">
                <form class="form-horizontal m-t-30" action="index.html">
                  <div class="form-group">
                    <label for="username">账号</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="输入用户名"
                      v-model="phone"
                    />
                  </div>

                  <div class="form-group">
                    <label for="userpassword">密码</label>
                    <input
                      type="password"
                      class="form-control"
                      id="userpassword"
                      placeholder="输入密码"
                      v-model="password"
                    />
                  </div>
                  <div>
                    <label v-show = isShow>用户名或密码不正确</label>
                  </div>
                  <div class="form-group row m-t-20">
<!--                    <div class="col-sm-6">-->
<!--                      <div class="custom-control custom-checkbox">-->
<!--                        <input-->
<!--                          type="checkbox"-->
<!--                          class="custom-control-input"-->
<!--                          id="customControlInline2"-->
<!--                        />-->
<!--                        <label class="custom-control-label" for="customControlInline2">记住密码</label>-->
<!--                      </div>-->
<!--                    </div>-->
                    <div class="col-sm-6 text-right">
                      <button
                        class="btn btn-primary w-md waves-effect waves-light" type="button"
                        @click="pass_login()"
                      >
                        登录
                      </button>
                    </div>
                  </div>

                  <div class="form-group m-t-10 mb-0 row">
                    <div class="col-12 m-t-20">
                      <router-link to = "/RecoverPassword" replace><i class="mdi mdi-lock"></i>忘记密码？</router-link>
                      <!-- <a href="pages-recoverpw.html" class="text-muted"
                        ><i class="mdi mdi-lock    "></i>忘记密码？</a
                      > -->
                    </div>
                  </div>
                </form>
              </el-tab-pane>
            </el-tabs>

          </div>
        </div>
      </div>

      <div class="m-t-40 text-center">
        <p class="text-white">
          还没有账号?
          <router-link to = "Register" replace><i class="mdi mdi-lock"></i>现在注册</router-link>
        </p>
        <p class="text-white">
          © 2021 工程实践11组
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    count () {
      return this.$store.state.ukey
    },
    ...mapGetters([
      'getToken'
    ])
  },
  name: 'Log',
  data () {
    return {
      validation: '',
      phone: '',
      btntxt: '发送验证码',
      // loginForm: {
      //   user_number: 200327122,
      //   password: "123456"
      // },
      show: true,
      isShow: false,
      // username: '',
      // userpassword: '',
      account: '',
      password: '',
      restult: '',
      showMsg: ''
    }
  },
  created () {
    // 定时函数，看载入效果，等之后后台完善了要删掉。进入页面两秒后自动消失
    setTimeout(this.showPreloader, 2000)
  },
  methods: {
    // getAccount () {
    //   this.$axios.get('/Employee/getEmployee?Employee_id=1')
    //     .then(function (response) {
    //       console.log(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    sendcode(){
      this.time=60;
      this.timer();
      this.validate();
    },
    //发送手机验证码倒计时
    timer() {
      if (this.time > 0) {
        this.disabled=true;
        this.time--;
        this.btntxt=this.time+"秒";
        setTimeout(this.timer, 1000);
      } else{
        this.time=0;
        this.btntxt="发送验证码";
        this.disabled=false;
      }
    },

    validate(){
      var th=this
      var formData=new FormData();
      formData.append('phone',th.phone);

      // qs.stringify({
      //   "phone": th.phone,
      //   //18259449921 guohan
      // })
      this.$axios.post('/sendsms',formData
        , {
        headers: {
          'Content-Type': 'application/json;'
        }
      })
        .then(function (response) {
          console.log(response.data)
        })
    },
    pass_login () {
      var t = this
      var qs = require('qs')
      //   // "user_number": 200327122, //t.account,
      //   // "password": "123456" //t.password,

      this.$axios.post('/userlogin', {
          phone: t.phone,
          password:t.password
        })
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            t.restult = '登录成功'
            console.log(t.restult)
            t.$router.push({path: 'UserInfo'})
          } else{
            t.showMsg=response.data.msg
            t.restult = '账户或密码错误'
            t.isShow = true
          }
        })
        .catch(function (error) {
          console.log(error)
        })

    },
    login () {
      var t = this
      var myDate = new Date()
      var formData1=new FormData();
      formData1.append('phone',t.phone);    //18259449921
      formData1.append('verifycode',t.validation);

      var qs = require('qs')
      // {
      //   "user_number": t.account,
      //   "password": t.password
      //   // "user_number": 200327122, //t.account,
      //   // "password": "123456" //t.password,
      //   // ut: 6,
      //   // TimeStamp: myDate
      // }
      if (localStorage.getItem('account') === null || localStorage.getItem('password') === null) {
        console.log("无本地")
        this.$axios.post('/fastlogin', formData1
          , {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
              t.restult = '登录成功'
              console.log(t.restult)

              t.$router.push({path: 'Homepage'})
            } else if (response.data.code === "105") {
              t.showMsg=response.data.msg
              t.restult = '账户或密码错误'
              t.isShow = true
            } else if (response.data.code === 1001) {
              t.restult = '请求错误'
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.$axios.post('/userlogin', qs.stringify({
          u: localStorage.getItem('account'),
          p: localStorage.getItem('password'),
          ut: 6,
          TimeStamp: myDate
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.code === 1) {
              t.restult = '登录成功'
              localStorage.setItem('ukey', response.data.data.ukey)
              t.$router.push({path: 'UserInfo'})
            } else if (response.data.code === 1002) {
              console.log(localStorage.getItem('password'))
              t.restult = '账户或密码错误'
              t.isShow = true
            } else if (response.data.code === 1001) {
              t.restult = '请求错误'
            }
          })
      }
    },
    autologin () {
      var t = this
      var myDate = new Date()
      var qs = require('qs')
      if (localStorage.getItem('account') === null || localStorage.getItem('password') === null) {
      } else {
        this.$axios.post('/api/user-login', qs.stringify({
          u: localStorage.getItem('account'),
          p: localStorage.getItem('password'),
          ut: 6,
          TimeStamp: myDate
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(function (response) {
            console.log(response.data)
            if (response.data.code === 1) {
              t.restult = '登录成功'
              localStorage.setItem('ukey', response.data.data.ukey)
              t.$router.push({path: 'Homepage'})
            } else if (response.data.code === 1002) {
              console.log(localStorage.getItem('password'))
              t.restult = '账户或密码错误'
              t.isShow = true
            } else if (response.data.code === 1001) {
              t.restult = '请求错误'
            }
          })
      }
    }
  },
  mounted () {
    this.autologin()
  },




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-container{
    margin-top: 200px;
  }
  .login-card{
    width: 480px;
  }
  .input-contianer{
    margin-top: 40px;
  }
  .val_button{
    width:120px;
  }
</style>
