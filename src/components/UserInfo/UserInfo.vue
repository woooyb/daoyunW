<template>
  <div>
    <el-container>
      <el-header id="topnav">
        <!-- MENU Start -->
        <div class="topbar-main">
          <div class="container-fluid">
            <div class="logo">
              <a href="index.html" class="logo">
                <img src="@/assets/images/DaoYun-Logo.png" alt="" height="45">
              </a>
            </div>
            <div class="menu-extras topbar-custom">
              <ul class="navigation-menu">
                <li v-for='(list,index) in headerNav'>
                  <a :href="list.url"><i class="mdi mdi-view-dashboard"></i>{{list.name}}</a>
                </li>
<!--                <li>-->
<!--                  <a href="#/ClassInfo"><i class="mdi mdi-view-dashboard"></i>班课管理</a>-->
<!--                </li>-->
<!--                <li class="has-submenu">-->
<!--                  <a href="#/Menu"><i class="mdi mdi-view-dashboard"></i>菜单管理</a>-->
<!--                </li>-->
<!--                <li class="has-submenu">-->
<!--                  <a href="/UserInfo"><i class="mdi mdi-view-dashboard"></i>用户管理</a>-->
<!--                </li>-->
<!--                <li class="has-submenu">-->
<!--                  <a href="/Management"><i class="mdi mdi-view-dashboard"></i>系统管理</a>-->
<!--                </li>-->
<!--                <li class="has-submenu">-->
<!--                  <p>{{menu_show}}</p>-->
<!--                </li>-->
              </ul>
              <!-- Navigation Menu-->
              <!-- End navigation menu -->
            </div> <!-- end #navigation -->
          </div> <!-- end container -->
          <div class="clearfix"></div>
        </div> <!-- end navbar-custom -->
      </el-header>
      <el-main>
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">

            <!--     参数管理新增       -->
            <el-form :inline="true">
              <el-row>
                <el-col :span="1.5">
                  <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd(0)"
                  >新增</el-button>
                </el-col>
              </el-row>
            </el-form>

            <el-form :inline="true">
              <div class="row table1">
                <el-table
                  :data="classTable"
                  stripe
                  style="width: 100%" >
                  <el-table-column align="center" prop="id" label="ID" width="150">
                  </el-table-column>
                  <el-table-column align="center" prop="number" label="学号" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="name" label="用户名" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="sex" label="用户性别" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="phone" label="手机号" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="email" label="邮箱" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="birthday" label="生日" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="school" label="学校" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="college" label="学院" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="major" label="专业" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="status" label="角色" width="180">
                  </el-table-column>

                  <!--                <el-table-column align="center" prop="t" label="创建时间" width="250">-->
                  <!--                </el-table-column>-->

                  <!--      修改和删除操作          -->
                  <el-table-column align="center" prop="op" label="操作" width="220">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row,1)"
                      >修改</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDel(scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

              </div>

            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <div style="height: 30px; witdh: 100%"></div>
      <router-view/>
    </el-container>

    <!--  弹窗    -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form"  label-width="80px">               <!--:rules="" -->
        <el-form-item label="班课id" prop="id">
          <el-input v-model="form.id" placeholder="请输入id" />
        </el-form-item>

        <el-form-item label="用户学号" prop="number">
          <el-input v-model="form.number" placeholder="请输入用户学号" />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="用户性别" prop="classsemester">
          <el-input v-model="form.classsemester" placeholder="请输入用户性别" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-input v-model="form.birthday" placeholder="请输入生日"/>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="form.school" placeholder="请输入学校" />
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="form.college" placeholder="请输入学院"/>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="form.major" placeholder="请输入专业"/>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio :label="1">1</el-radio>
            <el-radio :label="2">2</el-radio>
            <el-radio :label="3">3</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {EventBus} from "../../bus.js";
  export default {
    inject: ['reload'],
    beforeCreate () {
      // 添加背景色
      document.querySelector('body').setAttribute('style', 'background-color:######')
    },
    created() {
      EventBus.$on("aMsg", (msg) => {
        // A发送来的消息
        console.log(msg)
        this.menu_show = msg;
      });
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
      // EventBus.$off('aMsg')
    },
    data () {
      return {
        menu_show:"",
        title: "",
        op_num: 0,
        classTable: [],
        headerNav:[],
        form: {
          id:undefined,
          number:undefined,
          name: undefined,
          sex: undefined,
          phone: undefined,
          email:undefined,
          birthday:undefined,
          school:undefined,
          college:undefined,
          major:undefined,
          role:undefined
        },
        open: false,
      }
    },
    methods: {
      cancel() {
        this.open = false;
        this.reset();
      },
      reset() {
        this.form = {
          id:undefined,
          number:undefined,
          name: undefined,
          sex: undefined,
          phone: undefined,
          email:undefined,
          birthday:undefined,
          school:undefined,
          college:undefined,
          major:undefined,
          role:undefined
        }
      },
      submitForm: function() {
        var t= this
        //this.$message("新增成功");
        if(this.op_num==0){
          if(this.form.name==null||this.form.number==null){
            t.$message("名称、类型值必填")
          }else{
            t.post_meth()
            this.open = false;
          }
        }else{
          t.edit_meth()
          this.open = false;
        }
        this.reset();

      },
      handleAdd(op_num) {
        this.op_num=op_num;
        //this.reset();
        this.open = true;
        this.title = "添加用户";
      },
      handleUpdate(row,op_num) {
        this.op_num=op_num;
        this.form=row;
        this.open = true;

        this.title = "修改用户信息";
        //this.edit_meth(row);
      },
      handleDel(row) {
        const num = row.phone;
        this.$confirm('确认删除？').then(_=>{
          this.get_meth(num)
        }).catch(_=>{
          this.$message("删除失败")
        })
      },
      handleState(){
        var i
        for(i=0; i < this.classTable.length ;i++){
          if(this.classTable[i].role==1){
            this.classTable[i].status="管理员"
          }else if(this.classTable[i].role==2){
            this.classTable[i].status="教师"
          }else{
            this.classTable[i].status="学生"
          }
        }
      },
      post_meth(){
        var t = this
        var url
        url='/newuser'
        this.$axios.post(url,{
          number:parseInt(t.form.number),
          name: t.form.name,
          sex: t.form.sex,
          phone: t.form.phone,
          email: t.form.email,
          birthday:t.form.birthday,
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              t.$message(response.data.msg);
              //t.$router.push({path: 'Homepage'})
              console.log(response.data.data)
              //t.dicTable=response.data.data
              t.get_meth('see1')


            } else {
              t.$message(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      get_meth(tran_data,page){
        var t = this
        var url
        if(tran_data=='see1'){

          url='/userlist/'
          this.$axios.get(url)
            .then(function (response) {
              console.log(response.data);
              if (response.data.code === '200') {
                //t.$message(response.data.msg);
                //t.$router.push({path: 'Homepage'})
                console.log(response.data.data)
                t.classTable=response.data.data
                t.handleState()
              } else {
                t.$message(response.data.msg);
              }
            })
            .catch(function (error) {
              console.log(error)
            })

        }else{
          console.log("删除操作")
          url='/deleteuser/'+ tran_data
          this.$axios.delete(url)
            .then(function (response) {
              console.log(response.data);
              if (response.data.code === '200') {
                //console.log(response.data.data)
                t.get_meth('see1')

                //t.dicTable=response.data.data
              } else {
                t.$message(response.data.msg);
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      edit_meth(){
        var t = this
        var url
        url='/userinfo'
        this.$axios.put(url,{
          id:parseInt(t.form.id),
          number:parseInt(t.form.number),
          name: t.form.name,
          sex: t.form.sex,
          phone: t.form.phone,
          email: t.form.email,
          birthday:t.form.birthday,
          school:t.form.school,
          college:t.form.college,
          major:t.form.major,
          role:parseInt(t.form.role),
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              t.$message(response.data.msg);
              //t.$router.push({path: 'Homepage'})
              console.log(response.data.data)
              //t.dicTable=response.data.data
              t.get_meth('see1')

            } else {
              t.$message(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      get_head(){
        var t = this
        var url
        url='/menu/'
        this.$axios.get(url)
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              //console.log(response.data.data)
              t.headerNav=response.data.data
              t.handleState()
            } else {
              t.$message(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          })

      },
    },
    mounted () {
      this.get_head()
      this.get_meth('see1')
    },

  }
</script>

<style scoped>
  /*.map {*/
  /*  width: 100%;*/
  /*  height: 500px;*/
  /*}*/

  .table1{
    display:table;
    margin:0 auto;
    border-color: #0f6674;
  }

</style>

