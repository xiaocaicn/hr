<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPower(1,'0')">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-card>
        <!-- row-key 是使用属性表格时必须的设定
        这个属性, 并不是指向某个变量 -->
        <!-- 只是告诉 table 在遍历行的时候, 使用当前行的那个数据作为 key 值
        传入一个字符串 即可 -->
        <el-table border :data="list" row-key="id" :default-expand-all="true">
          <el-table-column align="center" label="名称" prop="name" />
          <el-table-column align="center" label="标识" prop="code" />
          <el-table-column align="center" label="描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.type === 1" type="text" @click="addPower(2, scope.row.id)">添加</el-button>
              <el-button type="text" @click="editPower(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="delPower(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <AddEditPower ref="addPowerDialog" :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
// 引入树形数据的转换函数
import { transListToTreeData } from '@/utils'
import { getPermissionList, delPermission } from '@/api/permission'
import AddEditPower from './components/add-editPower'
export default {
  components: {
    AddEditPower
  },
  data() {
    return {
      showDialog: false,
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      // console.log(res)
      this.list = transListToTreeData(res, '0')
      // console.log(this.list)
    },
    addPower(type, pid) {
      this.showDialog = true
      this.$refs.addPowerDialog.getData(type, pid)
    },
    async editPower(id) {
      await this.$refs.addPowerDialog.editPowerDialog(id)
      this.showDialog = true
    },
    async delPower(id) {
      // 询问
      await this.$confirm('确认删除吗')
      await delPermission(id)
      this.$message.success('删除成功')
      // 记得刷新
      this.getPermissionList()
    }
  }
}
</script>

<style>

</style>
