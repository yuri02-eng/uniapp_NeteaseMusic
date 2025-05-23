"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Countformat = require("../../utils/Countformat.js");
const common_api = require("../../common/api.js");
require("../../app.js");
const store_toplist = require("../../store/toplist.js");
const common_assets = require("../../common/assets.js");
const musicheadVue = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  computed: {
    ...common_vendor.mapState(store_toplist.useMainStore, ["topIdList", "nextId"])
  },
  data() {
    return {
      id: "",
      songDetail: {
        al: {
          picUrl: ""
        }
      },
      songSimi: [
        {
          album: { picUrl: "" },
          privilege: {},
          artists: [{ name: "" }]
        }
      ],
      songComment: [],
      songLyric: [],
      lyricIndex: 0,
      iconplay: "iconpause",
      isPlayRotate: true,
      isLoading: true
    };
  },
  components: {
    musicheadVue
  },
  onLoad(options) {
    this.id = options.songId;
    this.getMusic(options.songId);
  },
  onUnload() {
    this.cancelLyricIndex();
  },
  onHide() {
    this.cancelLyricIndex();
  },
  methods: {
    ...common_vendor.mapActions(store_toplist.useMainStore, ["initChange", "nextID"]),
    formatTimeToSec(value) {
      let arr = value.split(":");
      return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(1);
    },
    joinArtistNames: utils_Countformat.joinArtistNames,
    formattCount: utils_Countformat.formatCount,
    getMusic(Id) {
      this.nextID(Number(Id));
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      this.isLoading = true;
      Promise.all([common_api.songDetail(Id), common_api.songSimi(Id), common_api.songComment(Id), common_api.songLyric(Id), common_api.songUrl(Id)]).then((res) => {
        if (res[0].data.code === 200) {
          this.songDetail = res[0].data.songs[0];
        }
        if (res[1].data.code === 200) {
          this.songSimi = res[1].data.songs;
        }
        if (res[2].data.code === 200) {
          this.songComment = res[2].data.hotComments;
        }
        if (res[3].data.code === 200) {
          let lyric = res[3].data.lrc.lyric;
          const lyricData = [];
          const pattern = /\[(\d{2}:\d{2}\.\d{2})\]\s*(.*)/g;
          let match;
          while ((match = pattern.exec(lyric)) !== null) {
            lyricData.push({
              time: this.formatTimeToSec(match[1]),
              // 时间戳
              lyric: match[2].trim()
              // 合并后的角色和内容
            });
          }
          this.songLyric = lyricData;
        }
        if (res[4].data.code === 200) {
          if (!this.bgAudioManager) {
            this.bgAudioManager = common_vendor.index.createInnerAudioContext();
          }
          this.bgAudioManager.title = this.songDetail.name;
          this.bgAudioManager.singer = "暂无";
          this.bgAudioManager.src = res[4].data.data[0].url || "";
          this.listenLyricIndex();
          this.bgAudioManager.onPlay(() => {
            this.iconplay = "iconpause";
            this.isPlayRotate = true;
            this.listenLyricIndex();
          });
          this.bgAudioManager.onPause(() => {
            this.iconplay = "iconbofang1";
            this.isPlayRotate = false;
            this.cancelLyricIndex();
          });
          this.bgAudioManager.onEnded(() => {
            this.getMusic(this.nextId);
          });
        }
        this.isLoading = false;
        common_vendor.index.hideLoading();
      });
    },
    formatTimestampToDate: utils_Countformat.formatTimestampToDate,
    handleToPlay() {
      if (this.bgAudioManager.paused) {
        this.bgAudioManager.play();
      } else {
        this.bgAudioManager.pause();
      }
    },
    listenLyricIndex() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        const lastIndex = this.songLyric.length - 1;
        if (lastIndex < 1) {
          return;
        }
        if (this.bgAudioManager.currentTime > this.songLyric[lastIndex].time) {
          this.lyricIndex = lastIndex;
          return;
        }
        let startIndex = Math.max(this.lyricIndex - 2, 0);
        for (let i = startIndex; i < lastIndex + 1; i++) {
          if (this.bgAudioManager.currentTime > this.songLyric[i].time && this.bgAudioManager.currentTime < this.songLyric[i + 1].time) {
            this.lyricIndex = i;
            break;
          }
        }
      }, 500);
    },
    cancelLyricIndex() {
      clearInterval(this.timer);
    },
    handleToSimi(id) {
      this.getMusic(id);
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
  return {
    a: "url(" + $data.songDetail.al.picUrl + ")",
    b: common_vendor.p({
      title: $data.songDetail.name,
      icon: true,
      color: "black"
    }),
    c: common_assets._imports_0$1,
    d: common_assets._imports_1$1,
    e: $data.isPlayRotate ? "running" : "paused",
    f: $data.songDetail.al.picUrl,
    g: $data.isPlayRotate ? "running" : "paused",
    h: common_vendor.n($data.iconplay),
    i: common_vendor.o((...args) => $options.handleToPlay && $options.handleToPlay(...args)),
    j: common_vendor.f($data.songLyric, (item, index, i0) => {
      return {
        a: common_vendor.t(item.lyric),
        b: $data.lyricIndex == index ? 1 : "",
        c: index
      };
    }),
    k: "translateY(" + -($data.lyricIndex - 1) * 82 + "rpx)",
    l: common_vendor.f($data.songSimi, (item, index, i0) => {
      return common_vendor.e({
        a: item.album.picUrl,
        b: common_vendor.t(item.name),
        c: item.privilege.flag > 0
      }, item.privilege.flag > 0 ? {
        d: common_assets._imports_1
      } : {}, {
        e: item.privilege.maxBrLevel === "lossless"
      }, item.privilege.maxBrLevel === "lossless" ? {
        f: common_assets._imports_0
      } : {}, {
        g: common_vendor.t($options.joinArtistNames(item.artists)),
        h: common_vendor.t(item.name),
        i: index,
        j: common_vendor.o(($event) => $options.handleToSimi(item.id), index)
      });
    }),
    m: common_vendor.f($data.songComment, (item, index, i0) => {
      return {
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickname),
        c: common_vendor.t($options.formatTimestampToDate(item.time)),
        d: common_vendor.t($options.formattCount(item.likedCount)),
        e: common_vendor.t(item.content),
        f: index
      };
    }),
    n: !$data.isLoading
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
