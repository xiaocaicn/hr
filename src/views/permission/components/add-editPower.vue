<template>
  <!-- 放置一个弹层 用来编辑新增节点 -->
  <el-dialog :title="`${showText}权限点`" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:90%" />
      </el-form-item>
      <el-form-item label="开启">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, getPermissionDetail, updatePermission } from '@/api/permission'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userId: '',
      showText: '',
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  }, methods: {
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    getData(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.formData.enVisible = '1'
      console.log(this.formData)
    },
    async editPowerDialog(id) {
      this.userId = id
      //   console.log(id)
      this.formData = await getPermissionDetail(id)
    //   console.log(this.formData)
    },
    async btnOK() {
      // 校验
      await this.$refs.perForm.validate()
      if (this.formData.id) {
        await updatePermission(this.formData)
      } else {
        // 请求
        await addPermission(this.formData)
      }
      // 提示
      this.$message.success('操作成功')
      // 刷新页面
      this.$parent.getPermissionList()
      // 关闭弹窗
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
