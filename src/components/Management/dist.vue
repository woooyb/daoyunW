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
          <el-tab-pane label="数据字典管理">

            <el-form :inline="true">
              <el-row>
                <el-col span="2">
                  <el-form-item label="">
                    <el-input placeholder="字典编号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="1"  style="margin-right: 100px">
                  <el-form-item label="">
                    <el-button type="primary" icon="el-icon-search" circle></el-button>
                  </el-form-item>

                </el-col>

                <el-col span="2">
                  <el-form-item label="">
                    <el-input placeholder="字典名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="1">
                  <el-form-item label="">
                    <el-button type="primary" icon="el-icon-search" circle></el-button>
                  </el-form-item>

                </el-col>

              </el-row>
            </el-form>

            <!--    新增        -->
            <!--    v-hasPermi="['system:dict:add']"-->
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


            <div class="row table1">
              <el-table
                :data="dicTable"
                stripe
                style="width: 100%" >
                <el-table-column align="center" prop="id" label="字典编号" width="150">
                </el-table-column>
                <el-table-column align="center" prop="name" label="字典名称" width="180">
                </el-table-column>

                <el-table-column label="字典类型" align="center" :show-overflow-tooltip="true" width="250">
                  <template slot-scope="scope">
                    <router-link :to="'/Management/distData/' + scope.row.code" class="link-type">
                      <span>{{ scope.row.code }}</span>
                    </router-link>
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="status" label="状态" width="180">
                  0
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
                      @click="handleDel(scope.row,'dict')"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>


          </el-tab-pane>
          <el-tab-pane label="系统参数管理">
            <el-form :inline="true">
              <el-row>
                <el-col span="2">
                  <el-form-item label="">
                    <el-input placeholder="参数主键"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="1"  style="margin-right: 100px">
                  <el-form-item label="">
                    <el-button type="primary" icon="el-icon-search" circle></el-button>
                  </el-form-item>

                </el-col>

                <el-col span="2">
                  <el-form-item label="">
                    <el-input placeholder="参数名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="1">
                  <el-form-item label="">
                    <el-button type="primary" icon="el-icon-search" circle></el-button>
                  </el-form-item>

                </el-col>

              </el-row>
            </el-form>

            <!--     参数管理新增       -->
            <el-form :inline="true">
              <el-row>
                <el-col :span="1.5">
                  <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini"
                    @click="handleAdd(2)"
                  >新增</el-button>
                </el-col>
              </el-row>
            </el-form>

            <div class="row table1" align="center">
              <el-table
                :data="sysTable"
                stripe
                style="width: 100%">
                <el-table-column align="center" prop="id" label="参数主键" width="150">
                </el-table-column>
                <el-table-column align="center" prop="pname" label="参数名称" width="250">
                </el-table-column>

                <el-table-column align="center" prop="pkey" label="参数键名" width="250">
                </el-table-column>

                <el-table-column align="center" prop="pvalue" label="参数键值" width="200">
                </el-table-column>
<!--                <el-table-column align="center" prop="t" label="创建时间" width="250">-->
<!--                </el-table-column>-->
                <el-table-column align="center" prop="op" label="操作" width="220">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      @click="handleUpdate(scope.row,3)"
                    >修改</el-button>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      @click="handleDel(scope.row,'sys')"
                    >删除</el-button>

                  </template>
                </el-table-column>
              </el-table>

            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <div style="height: 30px; witdh: 100%"></div>
      <router-view/>

      <!--  弹窗    -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="字典名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入字典名称" />
          </el-form-item>
          <el-form-item label="字典类型" prop="code">
            <el-input v-model="form.code" placeholder="请输入字典类型" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--        <el-form-item label="备注" prop="remark">-->
          <!--          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>-->
          <!--        </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dict')">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </el-container>

    <!--  弹窗 2   -->
    <el-dialog :title="title" :visible.sync="open1" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="参数名称" prop="pname">
          <el-input v-model="form.pname" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="参数键名" prop="pkey">
          <el-input v-model="form.pkey" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="参数键值" prop="pvalue">
          <el-input v-model="form.pvalue" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="2">是</el-radio>
            <el-radio :label="3">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--        <el-form-item label="备注" prop="remark">-->
        <!--          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('sys')">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>




  </div>
</template>

<script>
  export default {
    name: 'Management',
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
        //row_data:{},
        op_num: 0,
        search: '',
        state: '编辑',
        tempCode: '',
        isEditDetail: false,
        headerNav:[],
        dicTable: [
        ],
        sysTable: [
          // {id:1, name: '主框架页-默认皮肤样式名称', code: 'skin-blue',state:'是',op:'修改 删除',t:'2020-11-20 19:29:49'},
          // {id:2, name: '用户管理-账号初始密码', code: 'pass',state:'是',op:'修改 删除',t:'2020-11-20 20:11:12'},
          // {id:3, name: '主框架页-顶栏主题', code: 'theme-blue',state:'是',op:'修改 删除',t:'2021-3-20 19:28:02'},
          // {id:4, name: '用户管理-用户名风格', code: 'user-style',state:'是',op:'修改 删除',t:'2021-3-21 10:08:21'}
        ],
        dicTableForSelect:[],

        dialogVisible:false,
        isSelect: false,//是否选择了字典表
        editDicTableName:'',  //字典表名
        editDicTableCode:'',  //字典表编码
        beforeEditDicTableCode:'',
        beforeEditDicTableName:'',
        editDicTableId:0,     //字典表Id（这个怎么用还要考虑
        newDicTableId:0,     //新字典表Id
        selectDetailRow: [{ code: '', value:'',isDefault:''}],  //选择某一字典表时展示用
        addDicRow:{id:0, name:'', code:''}, //新增字典表时用
        editDetailRow: [{id:0,code: '', value:'',isDefault:''}],//用于保存编辑字典

        editOrAdd:'',
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 字典表格数据
        typeList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        //参数设置中的是否显示弹窗
        open1: false,
        // 状态数据字典
        statusOptions: [],
        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          dictName: undefined,
          dictType: undefined,
          status: undefined
        },
        // 表单参数
        form: {
          id:undefined,
          name: undefined,
          code: undefined,
          status:undefined,
          op:'修改 删除',
          t:'2020-11-20 20:11:12',
          pname:undefined,
          pkey: undefined,
          pvalue: undefined,
        },
        // 表单校验
        rules: {
          name: [
            { required: true, message: "字典名称不能为空", trigger: "blur" }
          ],
          code: [
            { required: true, message: "字典类型不能为空", trigger: "blur" }
          ],
          pname: [
            { required: true, message: "参数名称不能为空", trigger: "blur" }
          ],
          pkey: [
            { required: true, message: "参数键名不能为空", trigger: "blur" }
          ],
          pvalue: [
            { required: true, message: "参数键值不能为空", trigger: "blur" }
          ],

        }
      }
    },
    created(){
      this.get_head()
      this.get_meth('see1');
      this.get_meth('see2');
    },
    methods: {
      reset() {
        this.form = {
          id: undefined,
          name: undefined,
          code: undefined,
          status:undefined,
          // op:'修改 删除',
          // t:'2020-11-20 20:11:12',
          pname:undefined,
          pkey: undefined,
          pvalue: undefined,
        }
        this.resetForm("form");
      },
      handleAdd(op_num) {
        //this.reset();
        this.op_num=op_num;
        if(op_num==0){
          this.open = true;
        }else{
          this.open1 = true;
        }
        this.title = "添加字典类型";
      },
      handleUpdate(row,op_num) {
        this.op_num=op_num;
        this.form=row;
        if(op_num==1){
          this.open = true;
        }else{
          this.open1 = true;
        }
        this.title = "修改字典类型";
        //this.edit_meth(row);
      },
      handleDel(row,page) {
        const dictId = row.id;
        this.$confirm('确认删除？').then(_=>{
          this.get_meth(dictId,page)
        }).catch(_=>{
          this.$message("删除失败")
        })



        //this.dicTable.slice(0,1);
        // for(let cur of this.dicTable.entries()){
        //   if (cur[1].id === dictIds) {
        //     this.$delete(this.dicTable,cur[0]);
        //   }
        // }

      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.open1 = false;
        this.reset();
      },
      submitForm: function(page) {

        var t= this
        //this.$message("新增成功");
        if(this.op_num==0||this.op_num==2){
          if(this.op_num==0 && (this.form.name==null||this.form.code==null)){
            t.$message("名称、类型值必填")
          }else if(this.op_num==2 && (this.form.pname==null||this.form.pkey==null||this.form.pvalue==null)){
            t.$message("名称、关键字和值必填")
          }else{
              t.post_meth(page)
              this.open = false;
              this.open1 = false;
          }

        }else{
          t.edit_meth(page)
          this.open = false;
          this.open1 = false;
        }

        //this.open = false;
        //this.post_meth()
        //this.dicTable.push(this.form)
        this.reset();

      },
      get_meth(tran_data,page){
        var t = this
        //   ,{
        //   headers:{
        //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzU4MjE1ODIzIiwiZXhwIjoxNjIzNjQwMzAwfQ.Ff2_8lP954-wEY09H58UUBFh8hC6VxoUt_cRdVTWrFQ'
        //   }
        // }
        var url
        if(tran_data=='see1'||tran_data=='see2'){
          if(tran_data=='see1'){
            url='/alltype/'
          }else{
            url='/allsys/'
          }
          this.$axios.get(url)
            .then(function (response) {
              console.log(response.data);
              if (response.data.code === '200') {
                //t.$message(response.data.msg);
                //t.$router.push({path: 'Homepage'})
                console.log(response.data.data)
                if(tran_data=='see1'){
                  t.dicTable=response.data.data
                }else{
                  t.sysTable=response.data.data
                }

              } else {
                t.$message(response.data.msg);
              }
            })
            .catch(function (error) {
              console.log(error)
            })

        }else if(typeof(tran_data)=='number'){
          if(page=='dict'){
            url='/deletedicttype/'+parseInt(tran_data)
          }else{
            url='/deletesys/'+parseInt(tran_data)
          }

          this.$axios.delete(url)
            .then(function (response) {
              console.log(response.data);
              if (response.data.code === '200') {
                //t.$message(response.data.msg);
                //t.$router.push({path: 'Homepage'})
                console.log(response.data.data)
                if(page=='dict'){
                  t.get_meth('see1')
                }else{
                  t.get_meth('see2')
                }

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

      post_meth(page){
        var t = this
        var url
        //var url = this.HOST+'/alltype'
        //   ,{
        //   headers:{
        //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzU4MjE1ODIzIiwiZXhwIjoxNjIzNjQwMzAwfQ.Ff2_8lP954-wEY09H58UUBFh8hC6VxoUt_cRdVTWrFQ'
        //   }
        // }
        if(page=='dict'){
          url='/insertdicttype'
        }else{
          url='/insertsys'
        }

        this.$axios.post(url,{
          name:t.form.name,
          code:t.form.code,
          pname:t.form.pname,
          pkey:t.form.pkey,
          pvalue:t.form.pvalue
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              t.$message(response.data.msg);
              //t.$router.push({path: 'Homepage'})
              console.log(response.data.data)
              //t.dicTable=response.data.data
              if(page=='dict'){
                t.get_meth('see1')
              }else{
                t.get_meth('see2')
              }


            } else {
              t.$message(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      edit_meth(page){
        var t = this
        //var url = this.HOST+'/alltype'
        //   ,{
        //   headers:{
        //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzU4MjE1ODIzIiwiZXhwIjoxNjIzNjQwMzAwfQ.Ff2_8lP954-wEY09H58UUBFh8hC6VxoUt_cRdVTWrFQ'
        //   }
        // }
        var url
        if(page=='dict'){
          url='/updatedicttype'
        }else{
          url='/updatesys'
        }
        this.$axios.put(url,{
          id:t.form.id,
          name:t.form.name,
          code:t.form.code,

          pname:t.form.pname,
          pkey:t.form.pkey,
          pvalue:t.form.pvalue
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              t.$message(response.data.msg);
              //t.$router.push({path: 'Homepage'})
              console.log(response.data.data)
              //t.dicTable=response.data.data
              if(page=='dict'){
                t.get_meth('see1')
              }else{
                t.get_meth('see2')
              }

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
      //this.getAllClass()
      // 表单重置

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .table1{
    display:table;
    margin:0 auto;
    border-color: #0f6674;
  }


</style>
