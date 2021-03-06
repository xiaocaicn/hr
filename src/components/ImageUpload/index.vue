<template>
  <div>
    <!--
      action 必填,指定发送的地址, 由于使用腾讯云, 先用 # 占位
      list-type 指定样式
      file-list 绑定图片文件列表
     -->
    <el-upload
      action="#"
      :limit="1"
      :file-list="fileList"

      list-type="picture-card"
      :class="{disable: fileList.length > 0}"

      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="perShowDialog" :percentage="percentage" :show-text="false" class="pergress" />

    <el-dialog title="预览" :visible="showDialog" @close="showDialog = false">
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDe5HErG1KzPaYFgKQNvlOkqgK5ZnktodH',
  SecretKey: 'aomZ6NMrDEM0WmIXYLp9E3bw0nKtJSL2'
})
export default {
  data() {
    return {
      showDialog: false,
      imgUrl: '',
      currentFileUid: '',
      percentage: 0,
      perShowDialog: false,
      fileList: []
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
      this.showDialog = true
      this.imgUrl = file.url
    },
    handleRemove(file, fileList) {
    //   console.log(file)
    //   console.log(fileList)
      this.fileList = [...fileList]
      this.perShowDialog = false
    },
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.indexOf(file.type)) {
        this.$message.error('上传图片格式不正确')
        return false
      }

      //   检查大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片不能超过5m')
        return false
      }
      this.currentFileUid = file.uid
      this.perShowDialog = true
      return true
    },
    upload(params) {
      console.log(params)
      cos.putObject({
        // 储存桶名称 必填
        Bucket: 'hr-1305127288',
        // 地区 必填
        Region: 'ap-guangzhou',
        // 希望存放在储存桶中的文件名
        Key: params.file.size + params.file.name,
        // 储存方式标准储存(固定不用改)
        StorageClass: 'STANDARD',
        // 文件本身
        Body: params.file,
        onProgress: (progressData) => {
          console.log(progressData)
          //   console.log(JSON.stringify(progressData))
          this.percentage = Math.floor(progressData.percent * 100)
        }
      }, (err, data) => {
        //   成功的部分
        console.log(err || data)
        this.fileList = this.fileList.map(item => {
          if (item.uid === this.currentFileUid) {
            item.url = 'http://' + data.Location
            item.status = 'success'
          }
          return item
        })
        setTimeout(() => {
          this.perShowDialog = false
        }, 800)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep img {
  object-fit: cover;
  max-width: 100%;
  width: 100%;
}
.disable {
  ::v-deep .el-upload {
    display: none;
  }
}
.pergress{
	width:146px;
}
</style>
