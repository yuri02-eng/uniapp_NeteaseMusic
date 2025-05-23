<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false" color="black"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch()">
					<text class="iconfont iconsearch"></text>
					<input placeholder="搜索歌曲" type="text"/>
				</view>
				<view class="skeleton" v-if="loading">
				    <m-for-skeleton
				         :avatarSize="200"
				         :row="3"
				         :loading="loading"
				         :isarc="key%2==0?'circular':'square'"
				         v-for="(item,key) in 4"
				         :key="key">
				    <view>asdas</view>
				    </m-for-skeleton>
				</view>
				<view class="index-list">
					<view class="index-list-item" v-for="(item,index) in topList || []" :key="index" @tap="handleToList(item.listId)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl"></image>
							<text>{{item.name}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(item,index) in item.tracks" :key="index">{{index+1}}. {{item.first}} - {{item.second}}</view>
						</view>
					</view>
					<!-- <view class="index-list-item">
						<view class="index-list-img">
							<image src="/static/wangyiyunyinyue.png"></image>
							<text>每日更新</text>
						</view>
						<view class="index-list-text">
							<view>1.与我无关 - 阿冗余</view>
							<view>1.与我无关 - 阿冗余</view>
							<view>1.与我无关 - 阿冗余</view>
						</view>
					</view>
					<view class="index-list-item">
						<view class="index-list-img">
							<image src="/static/wangyiyunyinyue.png"></image>
							<text>每日更新</text>
						</view>
						<view class="index-list-text">
							<view>1.与我无关 - 阿冗余</view>
							<view>1.与我无关 - 阿冗余</view>
							<view>1.与我无关 - 阿冗余</view>
						</view>
					</view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import musichead from '@/components/musichead/musichead.vue'
	import { topList } from '../../common/api'
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton";
	export default {
		data() {
			return {
				topList:[],
				loading:true
			}
		},
		components:{
			musichead,
			mForSkeleton
		},
		onLoad() {
			topList().then(res=>{
				if(res.length){
					this.topList=res
					this.loading=false
				}
				// console.log(res)
			})
		},
		onHide(){
		this.loading=false	
		},
		methods: {
			   hide() {
			      this.loading = false;
			    },
			handleToList(listId){
				uni.navigateTo({
					url:'/pages/list/list?listId='+listId
				})	
			},
			handleToSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.index-search{
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 15rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
	}
	.index-search{
		text{
			font-size: 26rpx;
			margin-left: 50rpx;
		}
		input{
			font-size: 26rpx;
			margin-left: 20rpx;
			flex:1;	
		}
	}
	.index-list{
		margin: 0 30rpx;
		.index-list-item{
			display: flex;
			flex-direction: row;
			margin-bottom: 34rpx;
		}
		.index-list-img{
			width: 212rpx;
			height: 212rpx;
			position: relative;
			border-radius: 20rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
			text{
				position: absolute;
				left: 12rpx;
				bottom: 12rpx;
				font-size: 20rpx;
				color: white;
			}
			
		}
		.index-list-text{
			margin-top: 10rpx;
			margin-left: 25rpx;
			font-size: 24rpx;
			line-height: 66rpx;
		}
	}
</style>
