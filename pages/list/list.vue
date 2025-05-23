<template>
	<view class="list">
		<view class="fixbg" :style="{backgroundImage : 'url('+playlist.coverImgUrl+')'}"></view>
		<musichead title="歌单" :icon="true" color="black"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl"></image>
						<text class="iconfont iconyousanjiao">{{formattCount(playlist.playCount)}}</text>
					</view>
					<view class="list-head-text">
						<view style="font-size: 30rpx;">{{playlist.name}}</view>
						<view class="list-head-text-body">
							<image :src="playlist.creator.avatarUrl"></image>
							<text>{{playlist.creator.nickname}}</text>
						</view>
						<view style="font-size: 19rpx;width: 80%;">{{playlist.description}}</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="list-share" open-type="share">
					<text class="iconfont iconicon-"></text>
					<text>分享给微信好友</text>
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont iconbofang1"> </text>
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>
					<!-- 					<view class="list-music-item">
						<view class="list-music-item-number">1</view>
						<view class="list-music-item-song">
							<view>与我无关</view>
							<view>
								<image src="/static/dujia.png"></image>
								<image src="/static/sq.png"></image>
								<text>阿荣 - 与我无关</text>
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view> -->
					<view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index" @tap="handleToDetail(item.id)">
						<view class="list-music-item-number">{{index+1}}</view>
						<view class="list-music-item-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="privileges[index].flag > 0" src="/static/dujia.png"></image>
								<image v-if="privileges[index].maxBrLevel==='lossless'" src="/static/sq.png"></image>
								<text>{{item.ar[0].name}} - {{item.name}}</text>
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script >
	import musicheadVue from '/components/musichead/musichead.vue'
	import formattCount from '/utils/Countformat'
	import { mapState, mapActions } from 'pinia'
	import {useMainStore} from '../../store/toplist'
	// import { useMainStore } from '@/stores/toplist.js'
	import '@/common/iconfont.css'
	import {
		list
	} from '/common/api.js'
	export default {
		computed: {
		    // 映射 state (只读)
		    mainStore() {
		      return useMainStore()
		    }
		  },
		  components(){
			musicheadVue  
		  },
		data() {
			return {
				playlist: {
					coverImgUrl: '',
					creator: {
						avatarUrl: ''
					},
					trackCount: '',
				},
				privileges:[],
				isLoading:true,
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'Loading...'
			})
			list(options.listId).then(res => {
				if (res.data.code === 200) {
					this.playlist = res.data.playlist
					this.privileges=res.data.privileges	
					// console.log(formattCount(1000))
					console.log(res.data.playlist.trackIds)
					this.initChange(res.data.playlist.trackIds)
					// console.log(this.topIdList)
					this.isLoading=false
					uni.hideLoading()
				}
			})
			
		},
		methods: {
			formattCount,
			handleToDetail(songId){
				uni.navigateTo({
					url:'/pages/detail/detail?songId='+songId
				})
			},
			 ...mapActions(useMainStore, ['initChange', 'nextID']),
		}
	}
</script>

<style scoped lang="scss">
	.list-head {
		display: flex;
		margin: 30rpx;
	}

	.list-head-img {
		width: 264rpx;
		height: 264rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-left: 30rpx;

		image {
			width: 100%;
			height: 100%;
		}

		text {
			position: absolute;
			font-size: 26rpx;
			color: white;
			top: 8rpx;
			right: 8rpx;
		}
	}

	.list-head-text {
		flex: 1;
		margin-left: 42rpx;
		color: #f0f2f7;

		view:nth-child(1) {
			font-size: 44rpx;
			color: white;
		}

		view:nth-child(3) {
			line-height: 32rpx;
			font-size: 22rpx;
		}
	}

	.list-head-text-body {
		display: flex;
		margin-left: 41rpx;
		align-items: center;
		margin: 20rpx 0;
		font-size: 24rpx;

		image {
			width: 54rpx;
			height: 54rpx;
			border-radius: 50%;
		}

		text {
			margin-left: 10rpx;
		}
	}

	.list-share {
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		border-radius: 30rpx;
		background-color: rgba(0, 0, 0, 0.4);
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 30rpx;

		text {
			margin-right: 15rpx;
		}
	}

	.list-music {
		margin-top: 40rpx;
		background-color: white;
		border-radius: 40rpx;
		display: flow-root;
	}

	.list-music-head {
		height: 50rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		margin-bottom: 50rpx;

		text {
			margin-right: 10rpx;
		}

		text:nth-child(1) {
			height: 50rpx;
			font-size: 50rpx;
			margin-right: 26rpx;
		}

		text:nth-child(2) {
			font-size: 30rpx;
		}

		text:nth-child(3) {
			font-size: 26rpx;
			color: #b2b2b2;
		}
	}

	.list-music-item {
		display: flex;
		align-items: center;
		height: 80rpx;
		margin: 0 32rpx 30rpx 38rpx;
		color: #959595;

		text {
			font-size: 50rpx;
			color: #c7c7c7
		}
	}

	.list-music-item-number {
		// width: 20rpx;
		// height: 20rpx;
		width: 40rpx;
		font-size: 30rpx;
		line-height: 30rpx;

	}

	.list-music-item-song {
		margin-left: 15rpx;
		flex: 1;
		min-width: 0; 
		// 参见markdown解释为什么设置min-width:0，才能使得view:nth-child(2) text省略号有效
		view:nth-child(1) {
			font-size: 30rpx;
			line-height: 30rpx;
			color: black;
			margin-bottom: 10rpx;
			width: 70vw;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		view:nth-child(2) {
			display: flex;
			// justify-content: flex-start;
			flex:1;
			// min-width: 0; 
			align-items: center;
			overflow: hidden;
			text-overflow: ellipsis;
			image {
				width: 32rpx;
				height: 20rpx;
				margin-right: 10rpx;
			}

			text {
				flex:1;
				margin-left: 10rpx;
				font-size: 20rpx;
				padding-left: 5rpx;
				min-width: 0; 
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>