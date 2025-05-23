"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/list/list.js";
  "./pages/detail/detail.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
    // 此处必须将 Pinia 返回
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
