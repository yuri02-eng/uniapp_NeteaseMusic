"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../app.js");
const common_api = require("../../common/api.js");
const utils_Countformat = require("../../utils/Countformat.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      searchHot: [],
      searchWord: "",
      searchHistory: [],
      searchType: 1,
      searchList: [],
      searchSuggest: []
    };
  },
  onLoad() {
    common_api.searchHot().then((res) => {
      if (res.data.code === 200) {
        this.searchHot = res.data.data;
      }
    });
  },
  mounted() {
    common_vendor.index.getStorage({
      key: "searchHistory",
      success: (res) => {
        this.searchHistory = res.data;
      }
    });
  },
  components() {
  },
  methods: {
    handleClickHistory(evt) {
      const word = evt.target.dataset.item;
      if (word) {
        this.searchWord = word;
        this.handleToSearch(evt.target.dataset.item);
      }
    },
    handleToWord(word) {
      this.searchWord = word;
      this.handleToSearch(word);
    },
    handleToSearch(searchWord) {
      this.searchHistory.unshift(searchWord);
      this.searchHistory = [...new Set(this.searchHistory)];
      if (this.searchHistory.length > 10) {
        this.searchHistory.length = 10;
      }
      common_vendor.index.setStorage({
        key: "searchHistory",
        // data:JSON.stringify(this.searchHistory)
        data: this.searchHistory
      });
      this.getSearchList(searchWord);
    },
    handleClearHistory() {
      common_vendor.index.removeStorage({
        key: "searchHistory",
        success: () => {
          this.searchHistory = [];
        }
      });
    },
    getSearchList(word) {
      common_api.searchWord(word).then((res) => {
        if (res.data.code === 200) {
          this.searchList = res.data.result.songs.map((item) => ({
            ...item,
            artistText: this.joinArtistNames(item.artists)
            // 提前计算并存储
          }));
          this.searchType = 2;
        }
      });
    },
    joinArtistNames: utils_Countformat.joinArtistNames,
    handleToClose() {
      this.searchType = 1;
      this.searchWord = "";
    },
    handleToDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?songId=" + id
      });
    },
    handleToSuggest(event) {
      let value = event.detail.value;
      if (!value) {
        this.searchType = 1;
        return;
      }
      common_api.searchSuggest(value).then((res) => {
        if (res.data.code === 200) {
          this.searchSuggest = res.data.result.allMatch;
          this.searchType = 3;
        }
      });
    },
    handleClickKeyword(word) {
      this.searchWord = word;
      this.handleToSearch(word);
    }
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
  return common_vendor.e({
    a: common_vendor.p({
      title: "搜索",
      icon: true,
      color: "black",
      iconColor: "black"
    }),
    b: common_vendor.o(($event) => $options.handleToSearch($data.searchWord)),
    c: common_vendor.o([($event) => $data.searchWord = $event.detail.value, ($event) => $options.handleToSuggest($event)]),
    d: $data.searchWord,
    e: $data.searchType == 2
  }, $data.searchType == 2 ? {
    f: common_vendor.o(($event) => $options.handleToClose())
  } : {}, {
    g: $data.searchType == 1
  }, $data.searchType == 1 ? {
    h: common_vendor.o(($event) => $options.handleClearHistory()),
    i: common_vendor.f($data.searchHistory, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: item
      };
    }),
    j: common_vendor.o((...args) => $options.handleClickHistory && $options.handleClickHistory(...args)),
    k: common_vendor.f($data.searchHot, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.searchWord),
        c: item.iconUrl,
        d: common_vendor.t(item.content),
        e: common_vendor.t(item.score),
        f: index,
        g: common_vendor.o(($event) => $options.handleToWord(item.searchWord), index)
      };
    })
  } : $data.searchType == 2 ? {
    m: common_vendor.f($data.searchList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: item.fee === 8
      }, item.fee === 8 ? {
        c: common_assets._imports_0
      } : {}, {
        d: 17179877376 === item.mark
      }, 17179877376 === item.mark ? {
        e: common_assets._imports_1
      } : {}, {
        f: common_vendor.t(item.artistText),
        g: common_vendor.t(item.name),
        h: item.id,
        i: common_vendor.o(($event) => $options.handleToDetail(item.id), item.id)
      });
    })
  } : $data.searchType == 3 ? {
    o: common_vendor.t($data.searchWord),
    p: $data.searchWord,
    q: common_vendor.f($data.searchSuggest, (item, index, i0) => {
      return {
        a: common_vendor.t(item.keyword),
        b: index,
        c: common_vendor.o(($event) => $options.handleClickKeyword(item.keyword), index)
      };
    })
  } : {}, {
    l: $data.searchType == 2,
    n: $data.searchType == 3
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
