"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../app.js");
const common_api = require("../../common/api.js");
const musichead = () => "../../components/musichead/musichead.js";
const mForSkeleton = () => "../../components/m-for-skeleton/m-for-skeleton.js";
const _sfc_main = {
  data() {
    return {
      topList: [],
      loading: true
    };
  },
  components: {
    musichead,
    mForSkeleton
  },
  onLoad() {
    common_api.topList().then((res) => {
      if (res.length) {
        this.topList = res;
        this.loading = false;
      }
    });
  },
  onHide() {
    this.loading = false;
  },
  methods: {
    hide() {
      this.loading = false;
    },
    handleToList(listId) {
      common_vendor.index.navigateTo({
        url: "/pages/list/list?listId=" + listId
      });
    },
    handleToSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_musichead2 = common_vendor.resolveComponent("musichead");
  const _easycom_m_for_skeleton2 = common_vendor.resolveComponent("m-for-skeleton");
  (_easycom_musichead2 + _easycom_m_for_skeleton2)();
}
const _easycom_musichead = () => "../../components/musichead/musichead.js";
const _easycom_m_for_skeleton = () => "../../components/m-for-skeleton/m-for-skeleton.js";
if (!Math) {
  (_easycom_musichead + _easycom_m_for_skeleton)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "网易云音乐",
      icon: false,
      color: "black"
    }),
    b: common_vendor.o(($event) => $options.handleToSearch()),
    c: $data.loading
  }, $data.loading ? {
    d: common_vendor.f(4, (item, key, i0) => {
      return {
        a: key,
        b: "1cf27b2a-1-" + i0,
        c: common_vendor.p({
          avatarSize: 200,
          row: 3,
          loading: $data.loading,
          isarc: key % 2 == 0 ? "circular" : "square"
        })
      };
    })
  } : {}, {
    e: common_vendor.f($data.topList || [], (item, index, i0) => {
      return {
        a: item.coverImgUrl,
        b: common_vendor.t(item.name),
        c: common_vendor.f(item.tracks, (item2, index2, i1) => {
          return {
            a: common_vendor.t(index2 + 1),
            b: common_vendor.t(item2.first),
            c: common_vendor.t(item2.second),
            d: index2
          };
        }),
        d: index,
        e: common_vendor.o(($event) => $options.handleToList(item.listId), index)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
