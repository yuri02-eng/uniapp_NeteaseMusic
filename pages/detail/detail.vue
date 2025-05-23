<template>
	<view class="detail">
		<view class="fixbg" :style="{backgroundImage: 'url('+songDetail.al.picUrl+')'}"></view>
		<musichead :title="songDetail.name" :icon="true" color="black"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-head">
					<image src="/static/wangyiyunyinyue.png"></image>
					<text>网易云音乐</text>
				</view>
				<view class="detail-play" @tap="handleToPlay">
					<image src="/static/needle.png" :style="{animationPlayState: isPlayRotate ? 'running' : 'paused'}"></image>
					<image :src="songDetail.al.picUrl" :style="{animationPlayState: isPlayRotate ? 'running' : 'paused'}"></image>
					<text class="iconfont" :class="iconplay"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-warp" :style="{transform: 'translateY('+ -(lyricIndex-1)*82 +'rpx)'}">
						<view class="detail-lyric-warp-item" :class="{active:lyricIndex == index}" v-for="(item,index) in songLyric" :key="index">{{item.lyric}}</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">
						<text>喜欢这首歌的人也听</text>
						<view>
							<text class="iconfont iconbofang"></text>
							<text>一键收听</text>
						</view>
					</view>
					<view class="detail-like-body">
<!-- 						<view class="detail-like-item">
							<image src="/static/logo.png"></image>
							<view class="detail-like-item-song">
								<view>与我无关</view>
								<view>
									<image src="/static/dujia.png"></image>
									<image src="/static/sq.png"></image>
									<text>阿荣 - 与我无关</text>
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view> -->
						<view class="detail-like-item" v-for="(item,index) in songSimi" :key="index" @tap="handleToSimi(item.id)">
							<image :src="item.album.picUrl"></image>
							<view class="detail-like-item-song">
								<view>{{item.name}}</view>
								<view>
									<image v-if="item.privilege.flag > 0" src="/static/dujia.png"></image>
									<image v-if="item.privilege.maxBrLevel==='lossless'" src="/static/sq.png"></image>
									<text>{{joinArtistNames(item.artists)}} —— {{item.name}}</text>
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">精彩评论</view>
					<view class="detail-comment-body">
					<!-- 	<view class="detail-comment-item">
							<view class="detail-comment-img">
								<image src="/static/logo.png"></image>
							</view>
							<view class="detail-comment-content">
								<view class="detail-content-head">
									<view class="detail-content-name">
										<view>是啊冗余的荣</view>
										<view>2020年1月20日</view>
									</view>
									<view class="detail-content-like">
										<text>56027</text>
										<text class="iconfont iconlike"></text>
									</view>
								</view>
								<view class="detail-content-text">
									测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字测试文字
								</view>
							</view>
						</view> -->
						<view class="detail-comment-item" v-for="(item,index) in songComment" :key="index">
							<view class="detail-comment-img">
								<image :src="item.user.avatarUrl"></image>
							</view>
							<view class="detail-comment-content">
								<view class="detail-content-head">
									<view class="detail-content-name">
										<view>{{item.user.nickname}}</view>
										<view>{{formatTimestampToDate(item.time)}}</view>
									</view>
									<view class="detail-content-like">
										<text>{{formattCount(item.likedCount)}}</text>
										<text class="iconfont iconlike"></text>
									</view>
								</view>
								<view class="detail-content-text">
									{{item.content}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musicheadVue from '/components/musichead/musichead.vue';
	import formattCount from '/utils/Countformat'
	import {joinArtistNames,formatTimestampToDate} from '/utils/Countformat'
	import {songUrl,songDetail,songSimi,songLyric,songComment} from '@/common/api.js'
	import '@/common/iconfont.css'
	import { mapState, mapActions } from 'pinia'
	import {useMainStore} from '../../store/toplist'
	export default {
		computed: {
		  ...mapState(useMainStore, ['topIdList', 'nextId'])
		},
		data() {
			return {
				id:'',
				songDetail:{
					al:{
						picUrl:'',
					}
				},
				songSimi:[
					{
					album:{picUrl:''},
					privilege:{},
					artists:[{name:''}],
					},
				],
				songComment:[],
				songLyric:[],
				lyricIndex:0,
				iconplay:'iconpause',
				isPlayRotate:true,
				isLoading:true
			}
		},
		components: {
			musicheadVue
		},
		onLoad(options) {
			// console.log(options)
			this.id=options.songId
			this.getMusic(options.songId)
			// console.log(this.nextId)
			// console.log()
		},
		onUnload(){
			this.cancelLyricIndex()
			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
		onHide(){
			this.cancelLyricIndex()
			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
		methods: {
			...mapActions(useMainStore, ['initChange', 'nextID']),
			formatTimeToSec(value){
				let arr=value.split(":")
				return (parseFloat(arr[0])*60+parseFloat(arr[1])).toFixed(1)
			},
			joinArtistNames,
			formattCount,
			getMusic(Id){
				this.nextID(Number(Id))
				uni.showLoading({
					title:"加载中..."
				})
				this.isLoading=true
				Promise.all([songDetail(Id),songSimi(Id),songComment(Id),songLyric(Id),songUrl(Id)]).then(res=>{
					// console.log(res)
					if(res[0].data.code===200){
						// console.log(res[0].data)
						this.songDetail=res[0].data.songs[0]
						// console.log(this.songDetail)
					}
					// console.log(res)
					if(res[1].data.code===200){
						this.songSimi=res[1].data.songs
						// console.log(this.songSimi)
					}
					if(res[2].data.code===200){
						// console.log(this.songComment)
						this.songComment=res[2].data.hotComments
						// console.log(this.songComment)
					}
					if(res[3].data.code===200){
						let lyric = res[3].data.lrc.lyric;
						const lyricData = [];
						// 正则表达式，匹配时间戳以及之后的内容
						const pattern = /\[(\d{2}:\d{2}\.\d{2})\]\s*(.*)/g;
						
						let match;
						while ((match = pattern.exec(lyric)) !== null) {
						  lyricData.push({
						    time: this.formatTimeToSec(match[1]),  // 时间戳
						    lyric: match[2].trim()  // 合并后的角色和内容
						  });
						}
						this.songLyric=lyricData
					}
					if(res[4].data.code===200){
						// #ifdef H5
						if(!this.bgAudioManager)
						{
							this.bgAudioManager = uni.createInnerAudioContext();
							// this.bgAudioManager.src = res[4].data.data[0].url || ''
							// console.log(123)
							// // this.bgAudioManager.autoplay = true;
						}
						this.iconplay='iconbofang1'
						this.isPlayRotate=false
						// #endif
						// #ifndef H5
						if(!this.bgAudioManager)
						{
							this.bgAudioManager = uni.createInnerAudioContext();
						}
						// #endif
						this.bgAudioManager.title = this.songDetail.name
						this.bgAudioManager.singer = '暂无'
						// this.bgAudioManager.coverImgUrl = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png';
						this.bgAudioManager.src = res[4].data.data[0].url || ''
						this.listenLyricIndex()
						this.bgAudioManager.onPlay(()=>{
							// console.log(111)
							this.iconplay="iconpause"
							this.isPlayRotate=true
							this.listenLyricIndex()
						})
						this.bgAudioManager.onPause(()=>{
							this.iconplay="iconbofang1"
							this.isPlayRotate=false
							// console.log(this.isPlayRotate)
							this.cancelLyricIndex()
						})
						this.bgAudioManager.onEnded(()=>{
							this.getMusic(this.nextId)
						})
					}
					this.isLoading=false
					uni.hideLoading()
				} )
			
			},
			formatTimestampToDate,
			handleToPlay(){
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play()
				}
				else{
					this.bgAudioManager.pause()
				}
			},
			listenLyricIndex(){
				clearInterval(this.timer)
				this.timer=setInterval(()=>{
					const lastIndex=this.songLyric.length-1
					if(lastIndex<1){
						return
					}
					if(this.bgAudioManager.currentTime>this.songLyric[lastIndex].time){
						this.lyricIndex=lastIndex
						return
					}
					let startIndex = Math.max(this.lyricIndex - 2, 0)
					for(let i=startIndex;i<lastIndex+1;i++){
						if(this.bgAudioManager.currentTime>this.songLyric[i].time && this.bgAudioManager.currentTime<this.songLyric[i+1].time){
							this.lyricIndex=i
							break
						}
					}
					// console.log(this.lyricIndex)
				},500)
			},
			cancelLyricIndex(){
				clearInterval(this.timer)
			},
			handleToSimi(id){
				// // console.log(id)
				// // this.nextID(this.id)
				// // console.log(this.nextId)
				// // console.log(123123123123)
				// this.getMusic(this.nextId)
				this.getMusic(id)
			},
		},
	}
</script>

<style scoped lang="scss">
	.detail-head {
		display: flex;
		margin-left: 40rpx;
		align-items: center;
		margin-left: 40rpx;
		margin-bottom: 50rpx;
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

	.detail-play {
		width: 580rpx;
		height: 580rpx;
		margin: 0 auto;
		background-image: url('/static/disc.png');
		background-size: cover;
		border-radius: 290rpx;
		text-align: center;
		position: relative;

		image:nth-child(1) {
			position: absolute;
			width: 240rpx;
			height: 300rpx;
			left: 260rpx;
			top: -120rpx;
			z-index: 1;
			transform-origin: top left;
			animation: needleMove 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;

			:hover {
				animation-play-state: paused;
			}
		}

		@keyframes needleMove {
			0%,
			100% {
				transform: rotate(-3deg);
				/* 起始角度减小 */
				filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
				/* 增加投影增强立体感 */
			}

			50% {
				transform: rotate(3deg);
				/* 中间角度收敛 */
				filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3));
				/* 动态投影变化 */
			}
		}

		image:nth-child(2) {
			width: 370rpx;
			height: 370rpx;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto auto;
			border-radius: 50%;
			animation: 10s linear move infinite;
			animation-play-state: paused;

		}
		// .detail-play-run{
		// 		animation-play-state: running;
		// }
		@keyframes move {
			from{
				transform: rotate(0deg);
			}
			to{
				transform: rotate(360deg);
			}
		}
		text {
			font-size: 100rpx;
			width: 100rpx;
			height: 100rpx;
			color: white;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto auto;
		}

	}

	.detail-lyric {
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		color: #6f6e73;
		text-align: center;
		overflow: hidden;
	}

	.detail-lyric-warp {
		transition:0.5s;	
	}

	.detail-lyric-warp-item {
		height: 82rpx;
	}

	.detail-lyric-warp-item.active {
		color: white
	}

	.detail-like-head {
		margin: 0 20rpx 0 20rpx;
		display: flex;
		// color: white;
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		text-align: center;

		text {
			font-size: 40rpx;
		}

		view {
			text-align: end;
			margin-right: 10rpx;
			padding: 0 20rpx 0 5rpx;
			background-color: white;
			border-radius: 24rpx;

			text {
				font-size: 40rpx;

				margin-left: 10rpx;
			}

			height: 46rpx;
			line-height: 46rpx;
		}
	}

	.detail-like-item {
		display: flex;
		align-items: center;
		height: 80rpx;
		margin: 0 32rpx 30rpx 38rpx;
		color: #959595;
		text {
			font-size: 50rpx;
			color: #c7c7c7
		}

		image {
			width: 60rpx;
			height: 70rpx;
		}
	}

	.detail-like-item-song {
		margin-left: 15rpx;
		flex: 1;
		min-width: 0;
		// 参见markdown解释为什么设置min-width:0，才能使得view:nth-child(2) text省略号有效
		view:nth-child(1) {
			font-size: 30rpx;
			line-height: 30rpx;
			color: white;
			margin-bottom: 10rpx;
			width: 70vw;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		view:nth-child(2) {
			display: flex;
			// justify-content: flex-start;
			flex: 1;
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
				// flex: 1;
				margin-left: 10rpx;
				font-size: 20rpx;
				padding-left: 5rpx;
				color: #c6c2bf;
				min-width: 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.detail-comment {
		.detail-comment-head {
			height: 100rpx;
			font-size: 40rpx;
			line-height: 100rpx;
			margin-left: 10rpx;
			color: white;
		}

		.detail-comment-body {
			margin: 0 30rpx 0 20rpx;
			.detail-comment-item {
				display: flex;
				align-items: start;
				margin-bottom: 28rpx;
			}
		}
	}

	.detail-comment-img {
		width: 64rpx;
		height: 64rpx;
		// flex-shrink: 0;
		border-radius: 50%;
		overflow: hidden;
		background-color: black;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.detail-comment-content {
		flex:1;
		margin: 0 0 16rpx 16rpx;
		border-bottom: 2rpx #e0e0e0 solid;
		
		.detail-content-head {
			display: flex;
			justify-content: space-between;
			color:#757578;
			.detail-content-name {
				view:nth-child(1) {
					font-size: 26rpx;
					margin-bottom: 6rpx;
					color:#B7B7BB;
				}
				view:nth-child(2) {
					font-size: 20rpx;
				}
			}
			.detail-content-like {
				font-size: 28rpx;
			}
		}

		.detail-content-text {
			padding-top: 24rpx;
			padding-bottom: 20rpx;
			font-size: 28rpx;
			color:white;
			line-height: 40rpx;
			// margin-bottom: 10rpx;
		}
	}
</style>