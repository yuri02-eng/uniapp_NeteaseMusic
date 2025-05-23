"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "m-for-skeleton",
  props: {
    // 是否显示--(明面上的意思)
    loading: {
      type: Boolean,
      default: true
    },
    // 是否显示标题
    title: {
      type: Boolean,
      default: true
    },
    // 是否显示头像
    avatar: {
      type: Boolean,
      default: true
    },
    // 头像大小
    avatarSize: {
      type: [Number, String],
      default: 100
    },
    // 头像形状-圆形-方形
    isarc: {
      type: String,
      default: "square"
      // 圆形
    },
    // title宽度
    titleSize: {
      type: [Number, String],
      default: "50%"
    },
    // 标题sytle
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    // 几行
    row: {
      type: Number,
      default: 1
    },
    // 几行信息
    rowData: {
      type: [Array, String],
      default: "80%"
    },
    // 显示类型-垂直-水平
    display: {
      type: String,
      default: "horizontal"
      // 默认水平
    }
  },
  setup(__props) {
    const props = __props;
    const animationData = common_vendor.ref({});
    const imgType = ["circular", "square"];
    const displayType = ["vertical", "horizontal"];
    const show = common_vendor.ref(true);
    const createAnimation = () => {
      return common_vendor.index.createAnimation({
        duration: 1e3,
        timingFunction: "linear"
      });
    };
    let animation = createAnimation();
    common_vendor.onMounted(() => {
      animationData.value = animation.export();
    });
    common_vendor.watch(
      () => props.loading,
      (loading) => {
        if (!loading) {
          animation.opacity(0).step();
          animationData.value = animation.export();
          const time = setTimeout(() => {
            show.value = false;
            clearTimeout(time);
          }, 1e3);
        }
      }
    );
    const rowDataInfo = common_vendor.computed(() => {
      let rowArr = [];
      for (let index = 0; index < props.row; index++) {
        rowArr.push(index);
      }
      return rowArr;
    });
    const titleInfo = common_vendor.computed(() => {
      let titlData = "";
      for (const key in props.titleStyle) {
        titlData += `${key}:${props.titleStyle[key]};`;
      }
      return titlData;
    });
    const imgsize = common_vendor.computed(() => {
      switch (typeof props.avatarSize) {
        case "number":
          return `${common_vendor.index.upx2px(props.avatarSize)}px`;
        default:
          return `${common_vendor.index.upx2px(parseFloat(props.avatarSize))}px`;
      }
    });
    common_vendor.computed(() => {
      switch (typeof props.titleSize) {
        case "number":
          return `${common_vendor.index.upx2px(props.titleSize)}px`;
        default:
          return `${common_vendor.index.upx2px(parseFloat(props.titleSize))}px`;
      }
    });
    const imgarc = common_vendor.computed(() => {
      if (imgType.includes(props.isarc)) {
        if (props.isarc == "square") {
          return "0%";
        }
        return "50%";
      }
      console.error(`输入错误${props.isarc}`);
      return "0%";
    });
    const displayInfo = common_vendor.computed(() => {
      if (displayType.includes(props.display)) {
        return props.display;
      }
      console.error(`输入错误${props.display}`);
      return "horizontal";
    });
    const rowInfo = (key) => {
      const rowTypeof = typeof props.rowData;
      switch (rowTypeof) {
        case "string":
          return props.rowData;
        case "object":
          if (!props.rowData[0]) {
            return "80%";
          }
          if (!props.rowData[key]) {
            key = 0;
          }
          return props.rowData[key].indexOf("%") > -1 ? props.rowData[key] : `${common_vendor.index.upx2px(parseFloat(props.rowData[key]))}px`;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? common_vendor.e({
        b: __props.avatar
      }, __props.avatar ? {
        c: imgsize.value,
        d: imgsize.value,
        e: imgarc.value
      } : {}, {
        f: __props.title
      }, __props.title ? {
        g: common_vendor.s(titleInfo.value)
      } : {}, {
        h: common_vendor.f(rowDataInfo.value, (item, key, i0) => {
          return {
            a: key,
            b: rowInfo(key)
          };
        }),
        i: common_vendor.n(displayInfo.value),
        j: animationData.value
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7bc14c24"]]);
wx.createComponent(Component);
