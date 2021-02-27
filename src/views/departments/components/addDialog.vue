<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDailog" :node="node" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployesSimple" @blur="checkManager">
          <el-option v-for="person in people" :key="person.id" :label="person.username" :value="person.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartmentsDetail, updataDepartments } from '@/api/departments'
import { getEmployesSimple } from '@/api/employees'
export default {
  props: {
    showDailog: {
      type: Boolean,
      default: false
    }, node: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // console.log(depts)
      // const isRepeat = depts.filter((item) => {
      //   // 父部门相同
      //   return item.pid === this.node.id
      // }
      // ).some((item) => {
      //   // 名字相同
      //   return item.name === value
      // })
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts.filter((item) => {
        // 父部门相同
          return item.pid === this.node.pid
        }
        ).some((item) => {
        // 名字相同并且不是自身
          return item.name === value && item.id !== this.formData.id
        })
      } else {
        isRepeat = depts.filter((item) => {
        // 父部门相同
          return item.pid === this.node.id
        }
        ).some((item) => {
        // 名字相同
          return item.name === value
        })
      }
      isRepeat ? callback(new Error('同一部门下不能有两个重名的部门')) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      // 1. 获取全部部门数据
      const { depts } = await getDepartments()
      // 2. 校验是否重复 Code
      // 判断筛选出的code相同并且不是自身
      // 如果存在表示编码不唯一
      const isRepeat = depts.some(item => item.code === value && item.id !== this.formData.id)
      isRepeat ? callback(new Error('部门编码必须唯一')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }, rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 50, message: '部门名称要求1-50个字符' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 50, message: '部门编码要求1-50个字符' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-300个字符' }
        ]
      },
      people: []
    }
  }, computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployesSimple() {
      this.people = await getEmployesSimple()
    }, async btnOK() {
      try {
        // 判断是添加还是编辑窗口
        if (this.formData.id) {
          console.log(this.formData)
          await updataDepartments(this.formData)
        } else {
          // 校验表单
          console.log(1)
          await this.$refs.deptForm.validate()
          // 提交添加部门请求
          await addDepartments({ ...this.formData, pid: this.node.id })
        }
        // 刷新页面
        this.$emit('addDepartment')
        this.$emit('closeAddDepart')
        this.$message.success('操作成功')
      } catch (error) {
        console.log(error)
      }
    }, btnCancel() {
      this.$refs.deptForm.resetFields()
      // console.log(1)
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        id: ''
      }
      this.$emit('closeAddDepart')
    },
    checkManager() {
      setTimeout(() => {
        console.log(this.formData.manager)
        console.log('失去焦点')
        this.$refs.deptForm.validateField('manager')
      }, 200)
    },
    async getDepartmentsDetail(id) {
      // console.log(id)
      this.formData = await getDepartmentsDetail(id)
    }
  }
}
</script>

<style>

</style>
