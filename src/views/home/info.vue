<!-- home -->
<template>
  <div>
    <!-- <div class="info" @click="back"><van-icon class="iconfont back" class-prefix="icon" slot="right-icon" name="left"></van-icon>发票信息</div> -->
    <div class="list">
      <van-form>
        <van-field
          class="totalMoney"
          readonly
          label="总金额"
          input-align="right"
          v-model="totalMoney"
          right-icon="right"
          :rules="[{ required: true }]"
        >
        </van-field>
        <van-field
          readonly
          label="订单时间"
          input-align="right"
          v-model="tradeDate"
          right-icon="right"
          :rules="[{ required: true }]"
        >
        </van-field>
        <van-field
          readonly
          label="订单号"
          input-align="right"
          v-model="tradeTrace"
          right-icon="right"
          :rules="[{ required: true }]"
        >
        </van-field>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalMoney: '',
      tradeTrace: '',
      tradeDate: ''
    }
  },
  computed: {},
  mounted() {
    var str = this.$route.query.tradeDate
    console.log(str)
    var year = str.substring(0, 4)
    var yue = str.substring(4, 6)
    var r = str.substring(6, 8)
    var date = year + '.' + yue + '.' + r + ''

    this.totalMoney = this.$route.query.totalMoney
    this.tradeTrace = this.$route.query.tradeTrace
    this.tradeDate = date
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.back {
  position: absolute;
  left: 0.26667rem;
}
.info {
  font-weight: bold;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  font-size: 0.47333rem;
  line-height: 0.64rem;
  background-color: #fff;
  text-align: center;
}
/deep/.totalMoney .van-field__right-icon::before {
  content: '元';
  margin-right: 0.8rem;
  color: #000;
}
</style>
