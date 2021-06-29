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
          <el-tab-pane label="字典数据">

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
                :data="dicDetail"
                stripe
                style="width: 100%" >
                <el-table-column align="center" prop="id" label="字典编码" width="150">
                </el-table-column>
                <el-table-column align="center" prop="itemvalue" label="字典标签" width="180">
                </el-table-column>

                <el-table-column  align="center" prop="itemkey" label="字典键值" width="250">

                </el-table-column>

                <el-table-column align="center" prop="sortNum" label="字典排序" width="180">

                </el-table-column>

                <el-table-column align="center" prop="" label="" width="150">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button size="small" icon="el-icon-arrow-up" @click="sort_meth('up',scope.row)"></el-button>
                      <el-button size="small" icon="el-icon-arrow-down" @click="sort_meth('down',scope.row)"></el-button>
                    </el-button-group>
                  </template>
                </el-table-column>


                <el-table-column align="center" prop="isDefault" label="是否默认" width="200">
                </el-table-column>

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


          </el-tab-pane>

        </el-tabs>
      </el-main>
      <div style="height: 30px; witdh: 100%"></div>
      <router-view/>

      <!--  弹窗    -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="字典标签" prop="dictName">
            <el-input v-model="form.itemvalue" placeholder="请输入字典名称" />
          </el-form-item>
          <el-form-item label="字典键值" prop="dictType">
            <el-input v-model="form.itemkey" placeholder="请输入字典类型" />
          </el-form-item>
          <el-form-item label="状态" prop="isDefault">
            <el-radio-group v-model="form.isDefault">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--        <el-form-item label="备注" prop="remark">-->
          <!--          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>-->
          <!--        </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </el-container>



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
        op_num: 0,
        mycode:'',
        search: '',
        state: '编辑',
        tempCode: '',
        isEditDetail: false,
        headerNav:[],
        dicDetail: [
          // {id:1, code: 'sex', itemvalue: '男', itemkey:'0', sortNum:1, isDefault: '否'},
          // {id:2, code: 'sex', itemvalue: '女', itemkey:'1', sortNum:2, isDefault: '否'},
          // {id:3, code: 'role', itemvalue: '未知', itemkey:'2', sortNum:3, isDefault: '是'},
        ],
        dicDetail_temp:[],
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
          itemkey:undefined,
          itemvalue:undefined,
          code: undefined,
          isDefault:0,
          op:'修改 删除',
          t:'2020-11-20 20:11:12'
        },
        // 表单校验
        rules: {
          name: [
            { required: true, message: "字典名称不能为空", trigger: "blur" }
          ],
          code: [
            { required: true, message: "字典类型不能为空", trigger: "blur" }
          ]
        }
      }
    },
    created(){
      this.mycode=this.$route.params.code
      this.get_head()
      this.get_meth(this.mycode);
    },
    methods: {
      reset() {
        this.form = {
          id:undefined,
          name: undefined,
          itemkey:undefined,
          itemvalue:undefined,
          code: undefined,
          isDefault:0,
          op:'修改 删除',
          t:'2020-11-20 20:11:12'
        }
        this.resetForm("form");
      },
      handleAdd(op_num) {
        //this.reset();
        this.op_num=op_num;
        this.open = true;
        this.title = "添加字典类型";
      },
      handleUpdate(row,op_num) {
        this.op_num=op_num;
        this.form=row;
        this.open = true;
        this.title = "修改字典类型";
        //this.edit_meth_(row);
      },
      handleDel(row) {
        const dictId = row.id;
        this.get_meth(dictId)
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
        this.reset();
      },
      submitForm: function() {
        var t= this
        //this.$message("新增成功");
        if(this.op_num==0){
          t.post_meth()
        }else{
          t.edit_meth_()
        }

        this.open = false;
        //this.post_meth()
        //this.dicTable.push(this.form)
        this.reset();

      },
      get_meth(tran_data){
        var t = this
        //   ,{
        //   headers:{
        //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzU4MjE1ODIzIiwiZXhwIjoxNjIzNjQwMzAwfQ.Ff2_8lP954-wEY09H58UUBFh8hC6VxoUt_cRdVTWrFQ'
        //   }
        // }
        var url
        if(typeof(tran_data)=='string'){
          url='/detailbycode/'+tran_data
          this.$axios.get(url)
            .then(function (response) {
              console.log(response.data);
              if (response.data.code === '200') {
                //t.$message(response.data.msg);
                //t.$router.push({path: 'Homepage'})
                console.log(response.data.data)
                //t.dicDetail=response.data.data
                t.dicDetail_temp=response.data.data
                t.dicDetail_temp.sort(t.compare('sortNum'))
                t.dicDetail=t.dicDetail_temp
              } else {
                t.$message(response.data.msg);
              }
            })
            .catch(function (error) {
              console.log(error)
            })

        }else{
          url='/deletedictdetail/'+parseInt(tran_data)
          this.$axios.delete(url)
            .then(function (response) {
              console.log(response.data);
              if (response.data.code === '200') {
                //t.$message(response.data.msg);
                //t.$router.push({path: 'Homepage'})
                console.log(response.data.data)
                t.get_meth(t.mycode)
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

      post_meth(tran_data){
        var t = this
        //var url = this.HOST+'/alltype'
        //   ,{
        //   headers:{
        //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzU4MjE1ODIzIiwiZXhwIjoxNjIzNjQwMzAwfQ.Ff2_8lP954-wEY09H58UUBFh8hC6VxoUt_cRdVTWrFQ'
        //   }
        // }
        this.$axios.post('/insertdictdetail',{
          code:t.mycode,
          itemkey:t.form.itemkey,
          itemvalue:t.form.itemvalue
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              t.$message(response.data.msg);
              //t.$router.push({path: 'Homepage'})
              console.log(response.data.data)
              //t.dicTable=response.data.data
              t.get_meth(t.mycode)
            } else {
              t.$message(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      edit_meth_(tran_data){
        var t = this
        //var url = this.HOST+'/alltype'
        //   ,{
        //   headers:{
        //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzU4MjE1ODIzIiwiZXhwIjoxNjIzNjQwMzAwfQ.Ff2_8lP954-wEY09H58UUBFh8hC6VxoUt_cRdVTWrFQ'
        //   }
        // }
        this.$axios.put('/updatedictdetail',{
          id:t.form.id,
          name:t.form.name,
          code:t.form.code,
          isDefault:parseInt(t.form.isDefault)
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              t.$message(response.data.msg);
              //t.$router.push({path: 'Homepage'})
              console.log(response.data.data)
              //t.dicTable=response.data.data
              t.get_meth(this.mycode)
            } else {
              t.$message(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      sort_meth(up_down,row){
        var t = this
        var url
        var id1,id2
        var cur_ind= t.dicDetail.indexOf(row)
        if(up_down=='up'){
          id1=t.dicDetail[cur_ind-1].id;
          id2=row.id;
        }else{
          id1=row.id;
          id2=t.dicDetail[cur_ind+1].id;
        }
        url='changedictsort/'+parseInt(id1)+'/'+parseInt(id2)
        this.$axios.put(url)
          .then(function (response) {
            console.log(response.data);
            if (response.data.code === '200') {
              t.$message(response.data.msg);
              t.get_meth(this.mycode)
              this.reload();
              //t.dicDetail.sort(t.compare('sortNum'))
              // t.dicDetail.sort((a, b) => a.sortNum < b.sortNum)
              // console.log(t.dicDetail)
            } else {
              t.$message(response.data.msg);
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      compare(propertyName) {
        return function (object1, object2) {
          var value1 = object1[propertyName]
          var value2 = object2[propertyName]
          if (value2 < value1) {
            return 1
          } else if (value2 > value1) {
            return -1
          } else {
            return 0
          }
        }
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
      //this.num=this.$route.params.id
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
