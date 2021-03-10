<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item">{{ item }}</el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;margin-left:10px" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{ item }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <!-- <template slot="dateCell" slot-scope="{date,data}" class="content"> -->
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      // 这里是一个日期过滤器
      // 将传进来的日程如 2011-01-01
      // 转换成没有年份没有月份只有当前日期号的数据
      const day = value.split('-')[2]
      // 判断日期是否以零开头, 如果是则切割
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  data() {
    return {
      // 当前日期, 作为起始时间
      startDate: new Date(),

      // 当前月份
      currentMonth: null,
      // 当前年份
      currentYear: null,

      currentDate: null,
      yearList: []
    }
  },
  created() {
    // const a = Array(11)
    // // console.log(a)
    // // 这个语法是创建一个仅有长度信息的数组
    // // Array.from(模板来源(一个有长度的数据), 每一个生成出来回调函数)
    // const b = Array.from(a, (value, index) => {
    //   // 这个回调函数可以接受两个参数, value是原数组的当前元素
    //   // index 则是当前的索引
    //   const date = new Date()
    //   const year = date.getFullYear()
    //   return year - 5 + index
    // })
    // console.log(b)
    // 另外一种比较简单的写法
    // const date = new Date()
    // const year = date.getFullYear()
    // const begin = year - 5
    // for (let i = 0; i < 11; i++) {
    //   this.yearList.push(begin + i)
    // }
    // console.log(this.yearList)
    // 1. 页面进来时拿到开始时间(就是当时的时间) 计算当前年份 +当前的月份
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    // 2. 计算当前年份列表
    this.yearList = Array.from(Array(11), (value, index) => this.currentYear + index - 5)
    // 默认调用一次计算 this.currentDate 的函数, 保证一开始这种变量就有值
    this.dateChange()
  },
  methods: {
    dateChange() {
      // 这是在任意一个下拉窗改变的时候触发
      // 拿到当前年, 当前月, 组成一个新的日期
      // 交给日历组件更新渲染
      const year = this.currentYear
      const month = this.currentMonth
      // new Date(日期字符串) 可以生成指定某一天的日期
      this.currentDate = new Date(`${year}-${month}-1`)
    },
    isWeek(val) {
      return val.getDay() === 6 || val.getDay() === 0
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td, ::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
