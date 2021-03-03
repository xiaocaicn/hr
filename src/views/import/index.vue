<template>
  <UploadExcel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
    async success({ headers, results }) {
      try {
        // results.shift()
        // console.log(results)
        // 1. 准备翻译字典
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        const arr = []
        results.forEach(item => {
          const user = {}
          for (const key in item) {
            const newkey = userRelations[key]
            const value = item[key]
            user[newkey] = value
          }
          console.log(user)
          arr.push(user)
        })
        // console.log(arr)
        // 时间改为合适的时间对象
        const newResults = arr.map(item => {
          item.timeOfEntry = new Date(this.formatDate(item.timeOfEntry, '/'))
          console.log(item.timeOfEntry)
          item.correctionTime = new Date(this.formatDate(item.correctionTime, '/'))
          return item
        })
        // console.log(newResults)
        await importEmployee(newResults)
        this.$message.success('导入成功')
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
