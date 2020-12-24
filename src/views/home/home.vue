<!-- home -->
<template>
  <div class="index-container" ref="box">
    <!-- <div class="info" @click="back">
      <van-icon class="iconfont back" class-prefix="icon" slot="right-icon" name="left"></van-icon>发票信息
    </div> -->
    <div class="warpper">
      <!-- <h1 class="demo-home__title"><img src="https://www.sunniejs.cn/static/weapp/logo.png" /><span> 自助开票</span></h1> -->
      <van-image width="100%" height="100" margin="auto" :src="require('../../assets/images/banner_1@2x.png')" />
    </div>
    <div class="list">
      <van-form @submit="onSubmit">
        <div class="detailsTitle">发票详情</div>
        <van-field name="radio" label="抬头类型">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="1">企业单位</van-radio>
              <van-radio name="0">个人/非企业单位</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          ref="input"
          required
          v-model="companyName"
          maxlength="100"
          @focus="focus"
          @input="inputChange"
          @blur="blur"
          @click.stop="clickUp"
          clearable
          name="companyName"
          label="公司名称"
          placeholder="请输入公司名称"
          input-align="right"
          @change="search"
          :rules="[{ required: true }]"
        >
        </van-field>
        <div v-if="flag">
          <ul>
            <li
              ref="dataNum"
              v-for="(item, index) in searchData"
              v-show="index < showLength"
              :key="index"
              class="van-cell items"
              :data-ird="item.ird"
              @click="onitem"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <van-field
          v-if="radio == '1'"
          maxlength="50"
          v-model="companyNumber"
          clearable
          name="companyNumber"
          label="公司税号"
          placeholder="请输入公司税号"
          input-align="right"
          :rules="[{ required: true }]"
        />
        <van-collapse v-model="activeNames">
          <van-collapse-item title="更多选填项（非必填）" name="1">
            <van-field
              v-for="(item, index) in list"
              :maxlength="item.maxlength"
              :type="item.type"
              v-model="item.value"
              clearable
              :key="index"
              :name="item.name"
              :label="item.title"
              input-align="right"
              :placeholder="'请输入' + item.title"
            />
          </van-collapse-item>
        </van-collapse>
        <div class="detailsTitle"></div>
        <van-field
          @click="toBillInfo"
          class="totalMoney"
          readonly
          label="总金额"
          input-align="right"
          v-model="totalMoney"
          name="totalMoney"
          right-icon="right"
          :rules="[{ required: true }]"
        >
          <van-icon class="iconfont" class-prefix="icon" slot="right-icon" name="right1"></van-icon>
        </van-field>
        <div class="detailsTitle">接收方式<span class="alternative">手机号码/电子邮箱至少填写一个</span></div>

        <van-cell-group>
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field
            v-model="phone"
            name="phone"
            type="tel"
            label="手机号码"
            clearable
            input-align="right"
            placeholder="手机号码"
          />
          <van-field
            v-model="email"
            name="email"
            label="电子邮箱"
            placeholder="电子邮箱"
            input-align="right"
            clearable
          />
        </van-cell-group>

        <div style="margin: 6% 6% 0">
          <van-button
            :disabled="companyName == '' || (phone == '' && email == '')"
            round
            block
            type="info"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <div>
      <van-popup
        style="background: #f1f1f1"
        v-model="popupShow"
        closeable
        close-icon="close"
        round
        position="bottom"
        :style="{ height: '70%' }"
      >
        <div class="invoice">开具电子发票</div>
        <van-field v-model="type" name="type" label="发票类型" clearable input-align="right" placeholder="发票类型" />
        <van-field v-model="companyName" name="companyName" label="公司名称" clearable input-align="right" />
        <van-field v-model="companyNumber" name="companyNumber" label="公司税号" input-align="right" clearable />
        <van-field v-model="phone" name="phone" type="tel" label="手机号码" clearable input-align="right" />
        <van-field v-model="email" name="email" label="电子邮箱" input-align="right" clearable />
        <div class="footer">
          <div class="message">请确认接收方式信息无误，电子发票将在开具成功后</div>
          <div class="message">发送至您，请注意查收</div>
        </div>
        <div style="margin: 0 10%">
          <van-button round block type="info" native-type="submit" @click="toSubmit"> 确定提交 </van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { query, invoice, orderInfo } from '@/api/product'
export default {
  data() {
    return {
      form: {
        channelId: 'WZPOS0001',
        merId: '831450072980005',
        termId: '30000792',
        tradeType: 'INV4',
        keyWord: '易生',
        version: '1.0.0'
      },
      popupShow: false,
      showLength: 6,
      totalMoney: '',
      tradeDate: '',
      tradeTrace: '',
      radio: '1',
      companyName: '',
      companyNumber: '',
      activeNames: [],
      phone: '',
      email: '',
      flag: false,
      type: '电子发票',
      list: [
        { name: 'address', title: '公司地址', value: '', maxlength: '60', type: '' },
        { name: 'tel', title: '公司电话', value: '', maxlength: '11', type: 'digit' },
        { name: 'bank', title: '公司开户行', value: '', maxlength: '60', type: '' },
        {
          name: 'account',
          title: '开户行账号',
          value: '',
          maxlength: '20',
          type: 'digit'
        }
      ],
      products: []
      // products: [
      //   {
      //     name: '易生支付',
      //     price: 25,
      //     ird: '9112 0116 6818 8834X4',
      //     category: 'Easy pay'
      //   },
      //   {
      //     name: '易生支付上海有限公司',
      //     price: 15,
      //     ird: '2100 0116 6818 8834X4',
      //     category: 'Easy pay SH'
      //   },
      //   {
      //     name: '易生支付北京分公司',
      //     price: 65,
      //     ird: '1112 0116 6818 8834X4',
      //     category: 'Easy pay BJ'
      //   },
      //   {
      //     name: '易生支付深圳有限公司',
      //     price: 30,
      //     ird: '5565 0116 6818 8834X4',
      //     category: 'Easy pay TJ'
      //   },
      //   {
      //     name: '易生支付广州有限公司',
      //     price: 30,
      //     ird: '5512 0116 6818 8834X4',
      //     category: 'Easy pay TJ'
      //   },
      // ]
    }
  },
  computed: {
    searchData: function () {
      var companyName = this.companyName
      var ird = this.companyNumber
      var searchVal = '' //搜索后的数据
      if (companyName) {
        searchVal = this.products.filter(function (product) {
          return Object.keys(product).some(function (key) {
            //搜索所有的内容
            return String(product[key]).toLowerCase().indexOf(companyName) > -1
            //只搜索问题内容（某一个key）
            return String(product['questions']).toLowerCase().indexOf(companyName) > -1
            return String(product['questions']).toLowerCase().indexOf(ird) > -1
          })
        })
        console.log(searchVal)
        return searchVal
      }
    }
  },
  mounted() {
    // this.initData()
    this.orderInfo()
    this.$nextTick(() => {
      this.$refs.box.addEventListener('click', () => {
        this.flag = false
      })
    })
  },
  methods: {
    async orderInfo() {
      //订单信息接口
      var date = new Date()
      var year = date.getFullYear() //获取完整的年份(4位)
      var yue = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
      var r = date.getDate() //获取当前日(1-31)
      var time = year + '' + yue + '' + r + ''
      console.log(time)
      let param = new URLSearchParams()
      let channelId = 'WZPOS0001'
      let merId = '831450072980005'
      let termId = '30000792'
      // let tradeDate = time
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
        this.totalMoney = jsonData.tradeAmt / 100 //总金额
        this.tradeDate = jsonData.tradeDate //订单交易时间
        this.tradeTrace = jsonData.tradeTrace //交易订单号
      }
    },
    search() {
      // this.initData()
    },
    // invoice
    async invoiceData() {
      // const param = {
      //   oriTradeDt: '20201221114200',
      //   amt: '100',
      //   version: '1.0.0',
      //   phoneNo: '18262283295',
      //   termId: '30000792',
      //   tradeTrace: 'ts1608625489071',
      //   invTitle: '成都市成华区库夏默默鞋帽经营部',
      //   drawerTp: '1',
      //   merId: '831450072980005',
      //   oriOrderNo: 'inv1608625489071',
      //   invTitleTaxNo: '91510108MA63YWQX9N',
      //   channelId: 'WZPOS0001',
      //   tradeType: 'INV4'
      // }
      var timestamp = new Date().valueOf()
      let param = new URLSearchParams()
      let channelId = 'WZPOS0001'
      let merId = '831450072980005'
      let termId = '30000792'
      let tradeType = 'INV4'
      let version = '1.0.0'
      // let tradeTrace = 'ts1608625489099' //AN...50个字符
      // let oriOrderNo = 'inv1608625489099' //原系统单号
      let tradeTrace = 'ts' + timestamp
      let oriOrderNo = 'inv' + timestamp //原系统单号
      let amt = this.totalMoney * 100 //金额
      let oriTradeDt = '20201223095143' //原交易时间
      let drawerTp = this.radio //开票类型，0个人，1企业
      let invTitle = this.companyName //发票抬头
      var invTitleTaxNo = this.companyNumber
      // if (this.radio == '1') {
      //   //等于企业就传
      //   let invTitleTaxNo = this.companyNumber
      // }

      // let invTitleTaxNo = '91510108MA63YWQX9N' //税号，企业必填
      let phoneNo = this.phone //接收手机号码

      let email = this.email //接收邮箱
      let invPhoneNo = this.tel //公司电话
      let invAddress = this.address //地址
      let invBank = this.bank //开户行
      let invAccNo = this.account //开户行账户
      param.append('channelId', channelId)
      param.append('merId', merId)
      param.append('termId', termId)
      param.append('tradeType', tradeType)
      param.append('version', version)
      param.append('tradeTrace', tradeTrace)
      param.append('amt', amt)
      param.append('oriOrderNo', oriOrderNo)
      param.append('oriTradeDt', oriTradeDt)
      param.append('drawerTp', drawerTp)
      param.append('invTitle', invTitle)
      console.log(this.radio)
      if (this.radio != '0') {
        param.append('invTitleTaxNo', invTitleTaxNo)
      }
      if (this.phone != '') {
        param.append('phoneNo', phoneNo)
      }
      if (this.email != '') {
        param.append('eMail', email)
      }
      if (this.account != undefined) {
        param.append('invAccNo', invAccNo)
      }
      if (this.bank != undefined) {
        param.append('invBank', invBank)
      }
      if (this.address != undefined) {
        param.append('invAddress', invAddress)
      }
      if (this.tel != undefined) {
        param.append('invPhoneNo', invPhoneNo)
      }

      // const params = Object.assign({}, this.form)
      const { data: data } = await invoice(param)
      console.log(data)
      if (data.resultCode === '00') {
        this.$router.push({
          path: '/succed'
        })
      }
    },
    // async initData(param) {
    //   // const params = Object.assign({}, this.form)
    //   //putPruduct getOrderList
    //   //企业模糊查询
    //   const { data: data } = await query(param)
    //   console.log(data)
    //   if (data) {
    //     this.products = []
    //     this.products.push({
    //       name: data.invTitle,
    //       ird: data.invTitleTaxNo
    //     })
    //   }
    //   // this.tableData = data.data;
    //   // if (data.page) {
    //   //   this.total = data.page.total;
    //   // } else {
    //   //   this.total = 0;
    //   // }
    // },
    //   var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    back() {
      this.$router.go(-1)
    },
    toBillInfo() {
      this.$router.push(
        // { name: 'Info', params: { totalMoney: this.totalMoney } }
        {
          path: '/info',
          query: {
            totalMoney: this.totalMoney,
            tradeTrace: this.tradeTrace,
            tradeDate: this.tradeDate
          }
        }
      )
    },
    clickUp(event) {
      if (event) {
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true)
      }
    },
    onSubmit(values) {
      var phone = values.phone
      var regP = /^1[3456789]\d{9}$/
      var email = values.email
      var regE = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (phone) {
        if (!regP.test(phone)) {
          this.$toast('输入的格式不正确')
          return
        }
      }
      if (email) {
        if (!regE.test(email)) {
          this.$toast('输入的格式不正确')
          return
        }
      }
      this.popupShow = true
      this.values = values
    },
    toSubmit() {
      //确认提交
      console.log('submit', this.values)
      this.invoiceData()
    },
    async inputChange() {
      let param = new URLSearchParams()
      let channelId = 'WZPOS0001'
      let merId = '831450072980005'
      let termId = '30000792'
      let tradeType = 'INV4'
      let keyWord = this.companyName //this.companyName
      let version = '1.0.0'
      param.append('channelId', channelId)
      param.append('merId', merId)
      param.append('termId', termId)
      param.append('tradeType', tradeType)
      param.append('keyWord', this.companyName)
      param.append('version', version)
      this.$refs.input.blur()
      this.$refs.input.focus()
      const { data: data } = await query(param)
      console.log(data)
      if (data) {
        this.products = []
        this.products.push({
          name: data.invTitle,
          ird: data.invTitleTaxNo
        })
      }
    },
    focus() {
      if (this.companyName) {
        this.flag = true
      }
    },
    blur() {},
    onitem(e) {
      console.log(e)
      this.companyName = e.target.innerText
      this.companyNumber = e.target.dataset.ird
      this.flag = false
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
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
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
  /deep/.van-cell {
    line-height: 0.72rem;
  }
  /deep/.list .van-field__control--right {
    margin-left: -10%;
  }
  /deep/.list .van-collapse-item__content {
    padding: 0;
  }
  /deep/.totalMoney .van-field__control {
    color: #2d7aff;
  }
  /deep/.totalMoney .van-field__right-icon::before {
    content: '元';
  }
  .detailsTitle {
    font-weight: 900;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    .alternative {
      margin-left: 0.2rem;
      font-size: 0.3rem;
      line-height: 0.64rem;
      font-weight: normal;
      color: #969799;
    }
  }
  .items {
    text-align: right !important;
    display: block;
    padding-right: 10%;
  }
  .items:hover {
    background: #ccc;
  }
  /deep/.van-popup__close-icon {
    position: absolute;
    z-index: 1;
    color: #c8c9cc;
    font-size: 0.8667rem;
    cursor: pointer;
  }
  .invoice {
    font-weight: 600;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    font-size: 0.6333rem;
    line-height: 0.64rem;
    margin: 0.4rem 0;
    color: #222;
  }
  .footer {
    margin: 0.5rem auto;
    .message {
      font-size: 0.32rem;
      color: #999;
      letter-spacing: 0;
      text-align: center;
    }
  }
}
</style>
