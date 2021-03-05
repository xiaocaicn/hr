<template>
  <div>
    <!--
      action 必填,指定发送的地址, 由于使用腾讯云, 先用 # 占位
      list-type 指定样式
      file-list 绑定图片文件列表
     -->
    <el-upload
      action="#"
      :file-list="fileList"

      list-type="picture-card"
      :class="{disable: fileList.length > 0}"

      :on-preview="handlePreview"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog title="预览" :visible="showDialog" @close="showDialog = false">
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      imgUrl: '',
      fileList: [
        {
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F6%2F5795b9c935787.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617501995&t=2faa51526a99004d8af7aa1d23bfb8e3'
        }
      ]
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
      this.showDialog = true
      this.imgUrl = file.url
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
</style>
