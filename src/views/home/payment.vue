<!-- 支付完成 -->
<template>
  <div class="box">
    <div>
      <van-image width="100%" height="100%" margin="auto" :src="require('../../assets/images/navibar_bg_3@2x.png')" />
    </div>
    <div class="content">
      <div class="list">
        <van-field label="商户名称：" v-model="merName" value="" readonly />
        <van-field label="支付时间：" v-model="tradeDate" value="" readonly />
        <van-field label="支付订单号：" v-model="tradeTrace" value="" readonly />
      </div>
      <div>
        <!-- <van-button class="query" round block type="info" native-type="submit" @click="finish"> 完成 </van-button> -->
        <van-button round block class="concel" native-type="submit" @click="toInvoice"> 开发票 </van-button>
      </div>
      <div class="deal">
        关注<a class="easy" href="#">易生小助手公众号</a>可查询订单详情或者开发票
        <!-- <van-checkbox v-model="checked"
          >关注<a class="easy" href="#">易生小助手</a> 查询订单详情或者补开发票</van-checkbox
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import { query, invoice, orderInfo } from '@/api/product'
export default {
  data() {
    return {
      checked: false,
      merName: '',
      tradeDate: '',
      tradeTrace: ''
    }
  },
  computed: {},
  mounted() {
    this.orderInfo()
  },
  methods: {
    async orderInfo() {
      //订单信息接口
      let param = new URLSearchParams()
      let channelId = 'WZPOS0001'
      let merId = '831450072980005'
      let termId = '30000792'
      let tradeDate = '20201223'
      let payChannelBalanceTrace = '11920201223100840135619'
      param.append('channelId', channelId)
      param.append('merId', merId)
      param.append('termId', termId)
      param.append('tradeDate', tradeDate)
      param.append('payChannelBalanceTrace', payChannelBalanceTrace)
      const { data: data } = await orderInfo(param)
      if (data.resultCode == '00') {
        var jsonData = JSON.parse(data.data)
        console.log(jsonData)
        this.merName = jsonData.merName //商户名称
        // this.tradeDate = jsonData.tradeDate //订单交易时间
        this.tradeTrace = jsonData.tradeTrace //交易订单号
        var str = jsonData.tradeDate
        console.log(str)
        var year = str.substring(0, 4)
        var yue = str.substring(4, 6)
        var r = str.substring(6, 8)
        var date = year + '.' + yue + '.' + r + ''
        this.tradeDate = date
      }
    },
    finish() {
      //   this.$router.go(-1);
      WeixinJSBridge.call('closeWindow')
    },
    toInvoice() {
      //   if (this.checked) {
      this.$router.push({
        path: '/home'
      })
      //   } else {
      //     this.$toast("关注易小助手");
      //   }
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
  top: 65%;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  background: #ffffff;
  height: 65%;
  border-radius: 0.2rem;
  .list {
    padding: 0.3rem 0.2rem;
  }
  .deal {
    position: absolute;
    bottom: 0.5rem;
    left: 10%;
    color: #999;
  }
}
.query {
  width: 50%;
  margin: 0.5rem auto;
  border: 1px solid #2d7aff;
  border-radius: 0.75rem;
}
.concel {
  width: 50%;
  margin: 0.5rem auto;
  background: #ffffff;
  border: 1px solid #2d7aff;
  border-radius: 0.75rem;
}
/deep/.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background: none;
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
.easy {
  margin: 0 0.1rem;
  color: #2d7aff;
}
/deep/.deal .van-checkbox__label {
  margin-left: 0.21333rem;
  color: #999;
  font-size: 0.3rem;
  line-height: 1em;
}
</style>
