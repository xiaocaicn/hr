<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column label="序号" width="120">
                <template slot-scope="scope">
                  {{ (page.page -1) *page.pagesize + scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :total="total"
                layout="sizes,total,prev,pager,next,jumper"
                :page-size="page.pagesize"
                :page-sizes="[2,5,10,50]"
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
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCompanyInfo, getRoleList, deleteRole } from '@/api/setting'
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
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  }, created() {
    this.getCompanyInfo()
    this.getRoleList()
  },
  methods: {
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    }, async getRoleList() {
      const res = await getRoleList(this.page)
      this.list = res.rows
      this.total = res.total
      // console.log(this.list)
    }, currentChange(newPage) {
      this.page.page = newPage
      console.log(1)
      this.getRoleList()
    }, sizeChange(newSize) {
      this.page.pagesize = newSize
      this.getRoleList()
    }, async deleteRole(id) {
      try {
        await this.$confirm('确认删除?')
        await deleteRole(id)
        await this.getRoleList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
