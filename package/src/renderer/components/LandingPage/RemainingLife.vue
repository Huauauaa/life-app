<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="你的生日">
        <el-date-picker
          v-model="birth"
          type="date"
          placeholder="Pick a day"
          :disabledDate="disabledDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="理想岁数">
        <el-input-number
          v-model="idealAge"
          :min="pastYear"
          :max="120"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="单位">
        <el-radio-group v-model="unit">
          <el-radio :label="3">年</el-radio>
          <el-radio :label="6">月</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div class="age-area" :class="{ year: unit === 3, month: unit === 6 }">
      <template v-if="unit === 3 && pastYear > 0">
        <div
          class="item"
          v-for="(item, index) in idealAge"
          :key="index"
          :class="{ past: item <= pastYear }"
        >
          <i v-if="item <= pastYear" class="el-icon-close"></i>
        </div>
      </template>
      <template v-else-if="unit === 6 && pastMonth > 0">
        <div
          class="item"
          v-for="(item, index) in idealMonth"
          :key="index"
          :class="{ past: item <= pastMonth }"
        >
          <i v-if="item <= pastMonth" class="el-icon-close"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
function dateMonth (date1, date2) {
  const year1 = date1.getFullYear()
  const month1 = date1.getMonth()
  const year2 = date2.getFullYear()
  const month2 = date2.getMonth()
  return (year1 - year2) * 12 + month1 - month2
}

export default {
  name: 'RemainingLife',
  data: () => ({
    birth: new Date(),
    idealAge: 100,
    unit: 3
  }),
  computed: {
    pastYear () {
      return new Date().getFullYear() - this.birth.getFullYear()
    },
    pastMonth () {
      return dateMonth(new Date(), this.birth)
    },
    idealMonth () {
      return this.idealAge * 12
    }
  },
  methods: {
    disabledDate (date) {
      return date.getTime() > new Date().getTime()
    }
  }
}
</script>

<style lang="scss" scoped>
.age-area {
  display: flex;
  flex-wrap: wrap;
  &.year {
    grid-template-columns: repeat(10, 1fr);
    .item {
      border: 1px solid #000;
      box-sizing: border-box;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 50px;
      &.past {
        background-color: #ccc;
      }
    }
  }
  &.month {
    grid-template-columns: repeat(50, 1fr);
    .item {
      border: 1px solid #000;
      box-sizing: border-box;
      height: 20px;
      width: 20px;
      &.past {
        background-color: #ccc;
      }
    }
  }
}
</style>
