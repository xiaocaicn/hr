<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
    <el-col>
      <span>
        {{ treeNode.name }}
      </span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作 <i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  }, methods: {
    // 操作节点调用的方法
    async operateDepts(type) {
      try {
        if (type === 'add') {
        // 添加子部门的操作
          // console.log(123)
          // console.log(this.treeNode)
          this.$emit('addDepartment', this.treeNode)
        } else if (type === 'edit') {
        //  编辑部门的操作
          this.$emit('editAddDepts', this.treeNode)
        } else {
        //  删除操作
        // 添加用户确认
          this.$confirm('确认删除这个部门吗?').then(() => {
          // console.log(this.treeNode)
            return delDepartments(this.treeNode.id)
          }).then(() => {
            this.$emit('deleDepartments')
            this.$message('删除成功')
          })
        }
      } catch (error) {
        // console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
