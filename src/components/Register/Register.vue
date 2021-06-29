<template>
<div>
  <div class="accountbg"></div>
    <!-- Begin page -->
    <div class="wrapper-page">
      <div class="card">
        <div class="card-body">
          <img src="@/assets/images/DaoYun-Logo.png" width="200">
          <div class="p-3">
            <h4 class="font-18 m-b-5 text-center">免费注册</h4>
            <p class="text-muted text-center">现在免费注册你的到云账号吧 !</p>

            <el-tabs type="border-card">
              <!--    手机号注册    -->
              <el-tab-pane label="手机号注册">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm1.phone" @input="checkLength" clearable size="small" type="number" placeholder="输入账号"></el-input>
                  </el-form-item>
                  <div class="form-group">
                    <el-row :gutter="0">
                      <el-col :span="16">
                        <el-form-item label="验证码" prop="val">
<!--                          <input class="form-control" id="val_num" placeholder="输入验证码" v-model="ruleForm1.val">-->
                          <el-input v-model="ruleForm1.val" clearable size="small"  placeholder="输入验证码"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item>
                          <el-button size="small" :disabled="disabled" v-show="show" type="warning" @click="sendcode" class="val_button">{{btntxt}}</el-button>
                        </el-form-item>

                      </el-col>
                    </el-row>
                  </div>

                  <div class="col-sm-8 text-right">
                    <el-button type="primary" @click="register()" class="button">注册</el-button>
                  </div>

                    <!--                <el-button @click="resetForm('ruleForm')" class="button">重置</el-button>-->

                </el-form>
              </el-tab-pane>

              <!--    账号密码注册    -->
              <el-tab-pane label="账号密码注册">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="账号" prop="account">
                    <el-input v-model="ruleForm.account" @input="checkLength" clearable size="small" type="number" placeholder="输入账号"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" clearable size="small" type="password" placeholder="输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="confirmPwd">
                    <el-input v-model="ruleForm.confirmPwd" clearable size="small" type="password" placeholder="再次输入密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="register2()" class="button">注册</el-button>
                    <!--                <el-button @click="resetForm('ruleForm')" class="button">重置</el-button>-->
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>


          </div>
        </div>
      </div>


      <div class="m-t-40 text-center">
        <p class="text-white">
          已有帐号？
          <router-link to = "/" replace><i class="mdi mdi-lock"></i>点击登录</router-link>
        </p>
        <p class="text-white">
          © 2021 工程实践11组
          <!-- <i class="mdi mdi-heart text-danger"></i> -->
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
  name: 'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.confirmPwd !== '') {
          this.$refs.ruleForm.validateField('confirmPwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    return {
      btntxt: '发送验证码',
      show: true,
      changePwdDialog:false,//修改密码弹框
      ruleForm: {
        account: '',
        password: '',
        confirmPwd:''
      },
      ruleForm1: {
        phone: '',
        val: '',
      },
      restult: '',
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPwd:[
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur', required: true }
        ],
        account:[
          { required: true, message: '请确输入账号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11', trigger: 'blur' },
          {validator: validAccount, trigger: 'blur', required: true}
        ]
      }
    }
  },
  // data () {
  //   return {
  //     isShow: false,
  //     // username: '',
  //     // userpassword: '',
  //     account: '',
  //     password: '',
  //     restult: ''
  //   }
  // },
  created () {
    // 定时函数，看载入效果，等之后后台完善了要删掉。进入页面两秒后自动消失
    setTimeout(this.showPreloader, 2000)
  },
  methods: {
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
      formData.append('phone',th.ruleForm1.phone);

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
    register () {
      var t = this
      var myDate = new Date()
      var qs = require('qs')
      var formData1=new FormData();
      formData1.append('phone',t.ruleForm1.phone);
      formData1.append('verifycode',t.ruleForm1.val);
      // {
      //   u: t.ruleForm.account,
      //     p: t.ruleForm.password,
      //   TimeStamp: myDate
      // }
      //18259449921
      this.$axios.post('/fastregister',formData1, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === "200") {
            console.log(response.data.msg)
            t.restult = response.data.msg
            // this.$store.commit('setToken', JSON.stringify(response.data.data.ukey))
            // this.$store.commit('setAccount', JSON.stringify(response.data.data.ui))
            t.$message(response.data.msg)
            //t.$router.push({path: '/'})
            t.$router.push({name: 'Log'})
          } else {
            t.$message(response.data.msg)
            t.restult = '请求错误'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    register2 () {
      var t = this

      this.$axios.post('/register',{
        phone:t.ruleForm.account,
        password:t.ruleForm.password
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === "200") {
            console.log(response.data.msg)
            t.$message(response.data.msg)
            //t.$router.push({path: '/'})
            t.$router.push({name: 'Log'})
          } else {
            t.$message(response.data.msg)
            t.restult = '请求错误'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    checkLength(e){
      if (e.length > 11) {
        this.ruleForm.account = e.slice(0, 11)
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .val_button{
    margin-left: -95px;
    width:110px;
    text-align: center;
  }
</style>
