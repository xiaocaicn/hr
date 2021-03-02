<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">总数据有{{ totalCount }}条</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="addEmployees">新增员工</el-button>
        </template>
      </PageTools>
      <el-card>
        <!-- 员工列表 -->
        <el-table border :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="scope">
              {{ scope.row.timeOfEntry|formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="账户状态"
            sortable=""
            prop="enableState"
            :formatter="formatEable"
          >
            <template slot-scope="scope">
              <el-switch :value="scope.row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delEmployee(scope.row.id)"
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
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            :page-size="page.size"
            :page-sizes="[2, 5, 10]"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
        </el-row>
      </el-card>
      <AddEmployeedialog :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
import { getEmployesList, delEmployee } from '@/api/employees'
import Employees from '@/api/constant/employees'
import AddEmployeedialog from './components/add-employee-dialog'
export default {
  components: {
    AddEmployeedialog
  },
  data() {
    return {
      list: [],
      totalCount: 0,
      page: {
        page: 1,
        size: 10
      },
      showDialog: false
    }
  },
  created() {
    this.getEmployesList()
  },
  methods: {
    async getEmployesList() {
      const { rows, total } = await getEmployesList(this.page)
      // console.log(res)
      this.list = rows
      this.totalCount = total
    },
    currentChange(newPage) {
      this.page.page = newPage
      this.getEmployesList()
    },
    sizeChange(newSize) {
      this.page.size = newSize
      this.getEmployesList()
    },
    formatEmployment(row, column, cellValue, index) {
      // console.log(cellValue)
      const res = Employees.hireType.find((item) => {
        // 寻找并且返回对于的对象
        return item.id === cellValue
      })
      return res ? res.value : '未知'
    },
    formatEable(row, column, cellValue, index) {
      const res = Employees.stausInfos.find((item) => {
        return Number(item.id) === cellValue
      })
      return res ? res.value : '未知'
    }, async delEmployee(id) {
      try {
        await this.$confirm('确认删除?')
        await delEmployee(id)
        // 刷新页面
        this.getEmployesList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log('删除失败')
      }
    },
    addEmployees() {
      this.showDialog = true
    }
  }
}
</script>

<style>
</style>
