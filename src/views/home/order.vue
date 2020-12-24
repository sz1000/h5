<!-- home -->
<template>
  <div class="box">
    <div class="list">
      <van-image width="100%" height="100%" margin="auto" :src="require('../../assets/images/navibar_bg_2@2x.png')" />
    </div>
    <div class="content">
      <div class="payOrder">请输入支付订单号</div>
      <van-form @submit="onSubmit">
        <!-- type="digit" <van-search v-model="searchVal" placeholder="请输入搜索关键词" input-align="center" /> -->
        <van-field
          clearable
          v-model="value"
          name="value"
          background="#F4F5F7"
          placeholder="搜一搜"
          input-align="center"
        >
          <van-icon
            class="iconfont"
            class-prefix="icon"
            text-align="center"
            type="info"
            slot="left-icon"
            name="sousuo"
          ></van-icon>
        </van-field>
        <van-button class="query" round block type="info" native-type="submit"> 查询 </van-button>
      </van-form>
      <van-button round class="cancel" @click="cancel"> 取消 </van-button>
      <!-- <van-button round block class="query" type="submit" @click="onSearch"> 查询 </van-button> -->
    </div>
    <div v-if="show" class="mask">
      <div class="dialog">
        <div v-if="isOrder" class="orderInfo">
          <div class="close" @click="close">
            <img src="../../assets/images/close_2@2x.png" alt="" />
          </div>
          <van-field label="支付订单号：" v-model="orderNumber" value="" readonly />
          <van-field label="支付时间：" v-model="orderTime" value="" readonly />
          <van-field label="消费总额：" v-model="totalMoney" value="" readonly />
        </div>
        <div v-if="!isOrder" class="failedInfo">
          <div class="close" @click="close">
            <img src="../../assets/images/close_2@2x.png" alt="" />
          </div>
          <div class="failed">查询失败，未找到订单号，</div>
          <div calss="failed">请重新输入</div>
        </div>
        <van-button ref="btnText" @click="invoice" class="invoiceBtn" block type="info">
          {{ isOrder ? '开具电子发票' : '知道了' }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: '',
      show: false,
      isOrder: false,
      value: '',
      totalMoney: '200',
      orderTime: '2020.10.20',
      orderNumber: '1234567890098'
    }
  },
  computed: {},
  mounted() {},
  methods: {
    cancel(val) {
      this.value = ''
    },
    close() {
      this.show = false
    },
    onSubmit(val) {
      if (!val.value) return
      this.show = true
      this.isOrder = !this.isOrder
      console.log(val)
    },
    back() {
      this.$router.go(-1)
    },
    invoice() {
      if (this.isOrder) {
        this.$router.push({
          path: '/home'
        })
      } else {
        this.show = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  width: 92%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  background: #ffffff;
  height: 50%;
  border-radius: 0.2rem;
}
.payOrder {
  text-align: left;
  display: flex;
  font-weight: 900;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  font-size: 0.48333rem;
  line-height: 0.88rem;
}
.query {
  width: 50%;
  margin: 0.5rem auto;
  border: 1px solid #2d7aff;
  border-radius: 0.75rem;
}
.cancel {
  width: 50%;
  margin: 0.5rem auto;
  background: #ffffff;
  border: 1px solid #2d7aff;
  border-radius: 0.75rem;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.3);
}
.close {
  width: 1rem;
  height: 1rem;
  position: absolute;
  left: 80%;
  top: -28%;
  img {
    width: 1rem;
    height: 1rem;
    vertical-align: top;
  }
}
.dialog {
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffff;
  border-radius: 0.2rem;
  .van-cell {
    background: none;
  }
}
.orderInfo {
  padding: 0.5rem;
  position: relative;
}
.failedInfo {
  padding: 0.88rem;
  text-align: center;
  line-height: 2;
}
.invoiceBtn {
  // margin: 0.5rem 0;
  border-radius: 0 0 0.2rem 0.2rem;
}
/deep/.van-field__label {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
  box-sizing: border-box;
  /* width: 6.2em; */
  margin-right: 0.5rem;
  color: #646566;
  text-align: left;
  word-wrap: break-word;
}
</style>
