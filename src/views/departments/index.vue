<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <treeTools :tree-node="company" :is-root="true" />
        <hr>
        <el-tree default-expand-all :data="departs" :props="defaultProps">
          <treeTools slot-scope="{data}" :tree-node="data" @deleDepartments="getDepartments" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
export default {
  components: {
    TreeTools },
  data() {
    return {
      departs: [],
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartments()
  }, methods: {
    transListToTreeData(list, pid) {
      const res = []
      list.forEach(item => {
        if (item.pid === pid) {
          const children = this.transListToTreeData(list, item.id)
          if (children.length) {
            item.children = children
          }
          res.push(item)
        }
      })
      return res
    },
    async getDepartments() {
      const res = await getDepartments()
      // console.log(res)
      this.departs = this.transListToTreeData(res.depts, '')
      // console.log(this.departs)
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
