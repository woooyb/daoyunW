<template>
<!-- Loader -->
  <div>
    <div class="accountbg"></div>
  <div class="wrapper-page">
            <div class="card">
                <div class="card-body">

                    <h3 class="text-center m-0">
                        <a href="../../../index.html" class="logo logo-admin"><img src="@/assets/images/DaoYun-Logo.png" width="200"></a>
                    </h3>

                    <div class="p-3">
                        <h4 class="font-18 m-b-5 text-center">修改密码</h4>
                        <p class="text-muted text-center">请输入以下信息</p>

                        <form class="form-horizontal m-t-30" action="../../../index.html">

                            <div class="form-group">
                                <label for="account">账号</label>
                                <input type="text" class="form-control" id="account" placeholder="输入账号" v-model="account" disabled>
                            </div>

                            <div class="form-group">
                                <label for="oldpassword">旧密码</label>
                                <input type="password" class="form-control" id="oldpassword" placeholder="输入旧密码" v-model="oldpassword">
                            </div>

                            <div class="form-group">
                                <label for="newpassword">新密码</label>
                                <input type="password" class="form-control" id="newpassword" placeholder="输入新密码" v-model="newpassword">
                            </div>

                            <div class="form-group row m-t-20">
                                <div class="col-12 text-right">
                                    <button class="btn btn-primary w-md waves-effect waves-light" type="button"
                    @click="updatecode()">确认修改</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <div class="m-t-40 text-center">
                <p class="text-white">已有账号？ <router-link to = "/" replace><i class="mdi mdi-lock"></i>登录</router-link> </p>
                <p class="text-white">© 2021 工程实践11组.</p>
            </div>

        </div>
    </div>
</template>
<script>

export default {
  name: 'RecoverPassword',
  data () {
    return {
      preloader: true,
      account: localStorage.getItem('account'),
      oldpassword: '',
      newpassword: ''
    }
  },
  created () {
    // 定时函数，看载入效果，等之后后台完善了要删掉。进入页面两秒后自动消失
    setTimeout(this.showPreloader, 2000)
  },
  methods: {
    // 关闭载入动画的函数
    showPreloader () {
      this.preloader = false
    },
    updatecode () {
      var t = this
      var myDate = new Date()
      var qs = require('qs')
      this.$axios.post('api/change-pass', qs.stringify({
        ui: localStorage.getItem('userid'),
        ukey: localStorage.getItem('ukey'),
        oldpass: t.oldpassword,
        newpass: t.newpassword,
        TimeStamp: myDate
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === 1) {
            t.restult = '修改成功'
          } else if (response.data.code === 9999) {
            t.restult = '系统错误'
            t.isShow = true
          } else if (response.data.code === 1001) {
            t.restult = '请求错误'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
