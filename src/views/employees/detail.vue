<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="updatePsdForm" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <UserInfoComponent />
          </el-tab-pane>
          <el-tab-pane label="工作详情">
            <JobInfoComponents />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfoComponent from './components/user-info'
import JobInfoComponents from './components/job-info'
export default {
  components: { UserInfoComponent, JobInfoComponents },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserDetailById(this.userId)
  },
  methods: {
    async getUserDetailById(id) {
    //   console.log(id)
      this.userInfo = await getUserDetailById(id)
    },
    async saveUserDetailById() {
      this.$refs.updatePsdForm.validate()
      await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
      this.$message.success('密码更新成功')
    }
  }
}
</script>

<style>

</style>
