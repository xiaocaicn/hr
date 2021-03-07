<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRole"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column label="序号" width="120">
                <template slot-scope="scope">
                  {{ (page.page - 1) * page.pagesize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPermission(scope.row.id)"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="updataRole(scope.row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(scope.row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :total="total"
                layout="sizes,total,prev,pager,next,jumper"
                :page-size="page.pagesize"
                :page-sizes="[2, 5, 10, 50]"
                @current-change="currentChange"
                @size-change="sizeChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 弹窗 -->
        <el-dialog
          :title="dialogTitle"
          :visible="showDialog"
          @close="btnCancel"
        >
          <el-form
            v-if="showDialog"
            ref="roleForm"
            :model="roleForm"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <!-- 底部 -->
          <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
              <el-button size="small" @click="btnCancel">取消</el-button>
              <el-button
                size="small"
                type="primary"
                @click="btnOK"
              >确定</el-button>
            </el-col>
          </el-row>
        </el-dialog>

        <el-dialog title="分配权限" :visible="showDialogAssignPer">
          <el-tree
            ref="powerTree"
            :data="permData"
            :props="{ label: 'name' }"
            :default-expand-all="true"
            :show-checkbox="true"
            :check-strictly="true"
            node-key="id"
            :default-checked-keys="selectCheck"
          >
            <!-- node-key="id"表示选中id为字段名作为唯一表示，不同的项目根据需求可以变换字段名 -->
            <!-- default-checked-keys 一个数组, 里面包含一些唯一标识字段的数据, 被包含的节点就会自动选中 -->
          </el-tree>
          <el-row slot="footer" type="flex" justify="center">
            <el-col :span="6">
              <el-button
                type="primary"
                size="small"
                @click="btnPermOK"
              >确定</el-button>
              <el-button size="small" @click="btnPermCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getCompanyInfo,
  getRoleList,
  deleteRole,
  updataRole,
  getRoleDetail,
  addRole,
  assignPerm
} from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      formData: {
        name: '111',
        companyAddress: '111',
        mailbox: '',
        remarks: ''
      },
      list: [],
      total: 0,
      page: {
        // 当前页码
        page: 1,
        pagesize: 2
      },
      showDialog: false,
      roleForm: {
        description: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '名称长度在 2-20 之间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 200,
            message: '简介长度在 5-200 之间',
            trigger: 'blur'
          }
        ]
      },
      showDialogAssignPer: false,
      permData: [],
      selectCheck: [],
      roleId: ''
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    dialogTitle() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getCompanyInfo()
    this.getRoleList()
  },
  methods: {
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async getRoleList() {
      const res = await getRoleList(this.page)
      this.list = res.rows
      this.total = res.total
      // console.log(this.list)
    },
    currentChange(newPage) {
      this.page.page = newPage
      // console.log(1)
      this.getRoleList()
    },
    sizeChange(newSize) {
      this.page.pagesize = newSize
      this.getRoleList()
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除?')
        await deleteRole(id)
        await this.getRoleList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // this.roleForm = {
      //   description: '', name: ''
      // }
      // 或者使用销毁表单的方式在73:
      this.showDialog = false
    },
    async btnOK() {
      await this.$refs.roleForm.validate()
      if (this.roleForm.id) {
        await updataRole(this.roleForm)
      } else {
        await addRole(this.roleForm)
      }
      await getRoleList()
      this.showDialog = false
      this.$message.success('操作成功')
    },
    async updataRole(id) {
      const res = await getRoleDetail(id)
      // console.log(res)
      this.roleForm = res
      if (res.id) {
        this.settingDailog = '编辑员工资料'
      } else {
        this.settingDailog = '新增员工'
      }
      this.showDialog = true
    },
    addRole() {
      this.showDialog = true
    },
    async assignPermission(id) {
      // 获取所有的权限列表
      const res = await getPermissionList(id)
      console.log(res)
      this.permData = transListToTreeData(res, '0')
      // 将当前角色所代表的id回显到弹出窗口
      const { permIds } = await getRoleDetail(id)
      // console.log(permIds)
      this.selectCheck = permIds
      this.roleId = id
      this.showDialogAssignPer = true
      console.log(this.permData)
    },
    async btnPermOK() {
      try {
        // this.selectChecke无法拿取选中的数据
        // console.log(this.selectCheck)
        // await assignPrem(this.selectCheck)
        const list = this.$refs.powerTree.getCheckedKeys()
        // console.log(list)
        const data = { permIds: list, id: this.roleId }
        console.log(data)
        await assignPerm(data)
        this.$message.success('修改成功')
        this.showDialogAssignPer = false
      } catch (error) {
        console.log(error)
      }
    },
    btnPermCancel() {
      this.selectCheck = []
      this.showDialogAssignPer = false
    }
  }
}
</script>

<style>
</style>
