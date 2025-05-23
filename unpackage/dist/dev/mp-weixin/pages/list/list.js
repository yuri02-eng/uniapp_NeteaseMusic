"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Countformat = require("../../utils/Countformat.js");
const store_toplist = require("../../store/toplist.js");
require("../../app.js");
const common_api = require("../../common/api.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  computed: {
    // 映射 state (只读)
    mainStore() {
      return store_toplist.useMainStore();
    }
  },
  components() {
  },
  data() {
    return {
      playlist: {
        coverImgUrl: "",
        creator: {
          avatarUrl: ""
        },
        trackCount: ""
      },
      privileges: [],
      isLoading: true
    };
  },
  onLoad(options) {
    common_vendor.index.showLoading({
      title: "Loading..."
    });
    common_api.list(options.listId).then((res) => {
      if (res.data.code === 200) {
        this.playlist = res.data.playlist;
        this.privileges = res.data.privileges;
        console.log(res.data.playlist.trackIds);
        this.initChange(res.data.playlist.trackIds);
        this.isLoading = false;
        common_vendor.index.hideLoading();
      }
    });
  },
  methods: {
    formattCount: utils_Countformat.formatCount,
    handleToDetail(songId) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?songId=" + songId
      });
    },
    ...common_vendor.mapActions(store_toplist.useMainStore, ["initChange", "nextID"])
  }
};
if (!Array) {
  const _easycom_musichead2 = common_vendor.resolveComponent("musichead");
  _easycom_musichead2();
}
const _easycom_musichead = () => "../../components/musichead/musichead.js";
if (!Math) {
  _easycom_musichead();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: "url(" + $data.playlist.coverImgUrl + ")",
    b: common_vendor.p({
      title: "歌单",
      icon: true,
      color: "black"
    }),
    c: $data.playlist.coverImgUrl,
    d: common_vendor.t($options.formattCount($data.playlist.playCount)),
    e: common_vendor.t($data.playlist.name),
    f: $data.playlist.creator.avatarUrl,
    g: common_vendor.t($data.playlist.creator.nickname),
    h: common_vendor.t($data.playlist.description),
    i: common_vendor.t($data.playlist.trackCount),
    j: common_vendor.f($data.playlist.tracks, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.name),
        c: $data.privileges[index].flag > 0
      }, $data.privileges[index].flag > 0 ? {
        d: common_assets._imports_1
      } : {}, {
        e: $data.privileges[index].maxBrLevel === "lossless"
      }, $data.privileges[index].maxBrLevel === "lossless" ? {
        f: common_assets._imports_0
      } : {}, {
        g: common_vendor.t(item.ar[0].name),
        h: common_vendor.t(item.name),
        i: index,
        j: common_vendor.o(($event) => $options.handleToDetail(item.id), index)
      });
    }),
    k: !$data.isLoading
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-98a9e0b2"]]);
wx.createPage(MiniProgramPage);
