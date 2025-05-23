<template>
	<view class="music-head" :style="{color: color}">
		<view class="music-head-icon" v-if="icon" :style="{color:iconColor}" >
			<text class="iconfont iconzuojiantou-copy" @tap="handleToBack" ></text> | <text class="iconfont iconshouye" @tap="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data() {
			return {
				
			};
		},
		props:['title',"icon","color","iconColor"],
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style scoped>
.music-head{
	width: 100%;
	height: 75px;
	font-size: 16px;
	text-align: center;
	line-height: 80px;
	color: black;
	position: relative;
	padding-top: 30rpx;
	box-sizing: border-box;
}
.music-head-icon{
	position: absolute;
	left: 8px;
	top: 23px;
	width: 90px;
	height: 30px;
	background-color: rgba(0,0,0,0.4);
	color: white;
	line-height: 30px;
	border-radius: 15px;
	display: flex;
	justify-content: space-evenly;
	
}
</style>