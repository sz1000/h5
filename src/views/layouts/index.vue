<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view v-wechat-title="$route.meta.title"></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <!-- <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div> -->
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: "AppLayout",
  data() {
    return {
      tabbars: [
        {
          title: "自助开票",
          to: {
            name: "Home",
          },
          icon: "home-o",
        },
        {
          title: "开票信息",
          to: {
            name: "Info",
          },
          icon: "user-o",
        },
        {
          title: "关于我",
          to: {
            name: "About",
          },
          icon: "user-o",
        },
      ],
    };
  },
  components: {
    TabBar,
  },
  methods: {
    handleChange(v) {
      console.log("tab value:", v);
    },
  },
};
</script>
