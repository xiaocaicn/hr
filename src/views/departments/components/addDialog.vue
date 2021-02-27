<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDailog" :node="node">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
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
      const isRepeat = depts.filter((item) => {
        return item.pid === this.node.id
      }
      ).some((item) => {
        return item.name === value
      })
      isRepeat ? callback(new Error('同一部门下不能有两个重名的部门')) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      // 1. 获取全部部门数据
      const { depts } = await getDepartments()
      // 2. 校验是否重复 Code
      const isRepeat = depts.some(item => item.code === value)
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
      }
    }
  }
}
</script>

<style>

</style>
