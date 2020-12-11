<!-- home -->
<template>
  <div class="box">
    <div class="content">
      <!-- <div class="info" @click="back"><van-icon class="iconfont back" class-prefix="icon" slot="right-icon" name="left"></van-icon>发票信息</div> -->
      <div class="list">
        <van-image
          width="100"
          height="100"
          margin="auto"
          :src="require('../../assets/images/img_success@2x.png')"
        />
      </div>
      <div class="successfully">提交成功</div>
      <div class="message">请注意查收</div>
      <!-- <div style="margin: 10%">
        <van-button round block type="info" native-type="submit" @click="finish">
          完成
        </van-button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalMoney: "200.00元",
      orderTime: "2020年10月20日12:00:22",
      orderNumber: "1234567890098",
    };
  },
  computed: {},
  mounted() {
    // this.totalMoney = this.$route.query.totalMoney;
  },
  methods: {
    finish() {
      WeixinJSBridge.call("closeWindow");
      console.log(this.$store.state);
      // this.$store.state.tagsView.visitedViews.splice(
      //   this.$store.state.tagsView.visitedViews.findIndex(
      //     (item) => item.path === this.$route.path
      //   ),
      //   1
      // );
      // this.$router.push(
      //   this.$store.state.tagsView.visitedViews[
      //     this.$store.state.tagsView.visitedViews.length - 1
      //   ].path
      // );
      // window.location.href = "https://vant-contrib.gitee.io/vant/#/zh-CN/toast";
      // window.location.href = "about:blank";
      // this.$router.go(-1);
      // window.opener = null;
      // window.open("", "_self");
      // window.close();
      // window.addEventListener("pagehide", () => {
      //   localStorage.clear();
      // });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
}
.content {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  vertical-align: middle;
}
.list {
}
.successfully {
  font-size: 0.468rem;
  color: #333;
  font-weight: 900;
  letter-spacing: 0;
  text-align: center;
  line-height: 2;
  margin-top: 0.5rem;
}
.message {
  font-size: 0.45rem;
  color: #999;
  letter-spacing: 0;
  text-align: center;
  line-height: 2;
  margin-bottom: 0.5rem;
}
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
</style>
