<template>
  <view :class="[displayInfo, 'skeleton']" :animation="animationData" v-if="show">
    <view
      class="skeleton-avatar"
      v-if="avatar"
      :style="{
        width: imgsize,
        height: imgsize,
        borderRadius: imgarc,
      }"
    />
    <view class="skeleton-content">
      <view v-if="title" class="skeleton-content-title" :style="titleInfo" />
      <view v-for="(item, key) in rowDataInfo" :key="key" class="skeleton-content-row" :style="{ width: rowInfo(key) }" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

// 定义props
const props = defineProps({
  // 是否显示--(明面上的意思)
  loading: {
    type: Boolean,
    default: true,
  },
  // 是否显示标题
  title: {
    type: Boolean,
    default: true,
  },
  // 是否显示头像
  avatar: {
    type: Boolean,
    default: true,
  },
  // 头像大小
  avatarSize: {
    type: [Number, String],
    default: 100,
  },
  // 头像形状-圆形-方形
  isarc: {
    type: String,
    default: 'square', // 圆形
  },
  // title宽度
  titleSize: {
    type: [Number, String],
    default: '50%',
  },
  // 标题sytle
  titleStyle: {
    type: Object,
    default: () => ({}),
  },
  // 几行
  row: {
    type: Number,
    default: 1,
  },
  // 几行信息
  rowData: {
    type: [Array, String],
    default: '80%',
  },
  // 显示类型-垂直-水平
  display: {
    type: String,
    default: 'horizontal', // 默认水平
  },
});

// 定义状态
const animationData = ref({});
const imgType = ['circular', 'square']; // 圆形----方形
const displayType = ['vertical', 'horizontal']; // 垂直----水平
const show = ref(true); // 实际意义上的隐藏

// 创建动画
const createAnimation = () => {
  return uni.createAnimation({
    duration: 1000,
    timingFunction: 'linear',
  });
};

// 初始化动画
let animation = createAnimation();

// 生命周期钩子
onMounted(() => {
  animationData.value = animation.export();
});

// 监听loading变化
watch(
  () => props.loading,
  (loading) => {
    if (!loading) {
      animation.opacity(0).step();
      animationData.value = animation.export();
      const time = setTimeout(() => {
        show.value = false;
        clearTimeout(time);
      }, 1000);
    }
  }
);

// 计算属性
const rowDataInfo = computed(() => {
  let rowArr = [];
  for (let index = 0; index < props.row; index++) {
    rowArr.push(index);
  }
  return rowArr;
});

const titleInfo = computed(() => {
  let titlData = '';
  for (const key in props.titleStyle) {
    titlData += `${key}:${props.titleStyle[key]};`;
  }
  return titlData;
});

const imgsize = computed(() => {
  switch (typeof props.avatarSize) {
    case 'number':
      return `${uni.upx2px(props.avatarSize)}px`;
    default:
      return `${uni.upx2px(parseFloat(props.avatarSize))}px`;
  }
});

const titlwidth = computed(() => {
  switch (typeof props.titleSize) {
    case 'number':
      return `${uni.upx2px(props.titleSize)}px`;
    default:
      return `${uni.upx2px(parseFloat(props.titleSize))}px`;
  }
});

const imgarc = computed(() => {
  if (imgType.includes(props.isarc)) {
    if (props.isarc == 'square') {
      return '0%';
    }
    return '50%';
  }
  console.error(`输入错误${props.isarc}`);
  return '0%';
});

const displayInfo = computed(() => {
  if (displayType.includes(props.display)) {
    return props.display;
  }
  console.error(`输入错误${props.display}`);
  return 'horizontal';
});

// 方法
const rowInfo = (key) => {
  const rowTypeof = typeof props.rowData;
  switch (rowTypeof) {
    case 'string':
      return props.rowData;
    case 'object':
      // 如果没有就默认80%
      if (!props.rowData[0]) {
        return '80%';
      }
      if (!props.rowData[key]) {
        key = 0;
      }
      return props.rowData[key].indexOf('%') > -1
        ? props.rowData[key]
        : `${uni.upx2px(parseFloat(props.rowData[key]))}px`;
  }
};
</script>

<style lang="scss" scoped>
$bg: #dddddd;

$height: 100upx;

$title-height: 40upx;

.skeleton {
  display: flex;
  padding: 20upx;
  box-sizing: border-box;
  &.vertical {
    flex-direction: column;
    align-items: center;
    .skeleton-content {
      width: 100%;
      margin-left: 0;
      margin-top: 20upx;
    }
  }
  &-avatar {
    background: $bg;
    flex-shrink: 0;
  }

  &-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 20upx;
    overflow: hidden;

    &-title {
      height: $title-height;
      width: 50%;
      background: $bg;
    }

    &-row {
      width: 80%;
      height: $title-height;
      background: $bg;
      margin-top: 20upx;
    }
  }
}
</style>  