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
        <el-tab-pane label="班课信息">

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
                <el-table-column align="center" prop="id" label="班课ID" width="150">
                </el-table-column>
                <el-table-column align="center" prop="classnumber" label="班课号" width="180">
                </el-table-column>
                <el-table-column align="center" prop="classname" label="班课名" width="180">
                </el-table-column>
                <el-table-column align="center" prop="classsemester" label="学期" width="180">
                </el-table-column>
                <el-table-column align="center" prop="teacherid" label="教师ID" width="180">
                </el-table-column>
                <el-table-column align="center" prop="school" label="学校" width="180">
                </el-table-column>
                <el-table-column align="center" prop="college" label="学院" width="180">
                </el-table-column>
                <el-table-column align="center" prop="status" label="状态" width="180">
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

        <el-form-item label="班课号" prop="classnumber">
          <el-input v-model="form.classnumber" placeholder="请输入班课号" />
        </el-form-item>
        <el-form-item label="班课名" prop="classname">
          <el-input v-model="form.classname" placeholder="请输入班课名" />
        </el-form-item>
        <el-form-item label="班课学期" prop="classsemester">
          <el-input v-model="form.classsemester" placeholder="请输入学期" />
        </el-form-item>
        <el-form-item label="老师id" prop="classsemester">
          <el-input v-model="form.teacherid" placeholder="请输入教师id" />
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="form.school" placeholder="请输入学校" />
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="form.college" placeholder="请输入学院"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="form.state">
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
export default {
  inject: ['reload'],
  beforeCreate () {
    // 添加背景色
    document.querySelector('body').setAttribute('style', 'background-color:######')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
  },
  data () {
    return {
      title: "",
      op_num: 0,
      classTable: [],
      headerNav:[],
      form: {
        id:undefined,
        classnumber: undefined,
        classname: undefined,
        classsemester: undefined,
        teacherid: undefined,
        school: undefined,
        college: undefined,
        state:undefined,
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
        classnumber: undefined,
        classname: undefined,
        classsemester: undefined,
        teacherid: undefined,
        school: undefined,
        college: undefined,
        state:undefined,
      }
    },
    submitForm: function() {
      var t= this
      //this.$message("新增成功");
      if(this.op_num==0){
        if(this.form.classname==null||this.form.classnumber==null){
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
      this.title = "添加班课";
    },
    handleUpdate(row,op_num) {
      this.op_num=op_num;
      this.form=row;
      this.open = true;

      this.title = "修改班课状态";
      //this.edit_meth(row);
    },
    handleDel(row,page) {
      const num = row.classnumber;
      this.$confirm('确认删除？').then(_=>{
        this.get_meth(num)
      }).catch(_=>{
        this.$message("删除失败")
      })
    },
    handleState(){
      var i
      for(i=0; i < this.classTable.length ;i++){
        if(this.classTable[i].state==1){
          this.classTable[i].status="可加入"
        }else if(this.classTable[i].state==2){
          this.classTable[i].status="不可加入"
        }else{
          this.classTable[i].status="已结束"
        }
      }
    },
    post_meth(){
      var t = this
      var url
      //var url = this.HOST+'/alltype'
      //   ,{
      //   headers:{
      //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzU4MjE1ODIzIiwiZXhwIjoxNjIzNjQwMzAwfQ.Ff2_8lP954-wEY09H58UUBFh8hC6VxoUt_cRdVTWrFQ'
      //   }
      // }
      url='/newclass'
      this.$axios.post(url,{
        id:parseInt(t.form.id),
        classnumber: t.form.classnumber,
        classname: t.form.classname,
        classsemester: t.form.classsemester,
        teacherid: parseInt(t.form.teacherid),
        school: t.form.school,
        college: t.form.college,
        state:parseInt(t.form.state),
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

        url='/allclass/'
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
        url='/deleteclass/'+ tran_data
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
      url='/changeclassstate'
      this.$axios.put(url,{
        classnumber: t.form.classnumber,
        state:parseInt(t.form.state)
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

    }
  },
  mounted () {
    this.get_head()
    this.get_meth('see1')
  }
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
