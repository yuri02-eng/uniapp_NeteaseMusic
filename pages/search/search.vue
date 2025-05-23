<template>
	<view class="search">
		<musichead title="搜索" :icon="true" color="black" iconColor="black">
		</musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<input placeholder="搜索歌曲" type="text" v-model="searchWord" @confirm="handleToSearch(searchWord)"
					@input="handleToSuggest($event)"/>
					<text  v-if="searchType==2" class="iconfont iconguanbi" @tap="handleToClose()"></text>
				</view>
				<block v-if="searchType==1">
					<view class="search-history">
						<view class="search-history-head">
							<view>历史记录</view>
							<text class="iconfont iconlajitong" @tap="handleClearHistory()"></text>
						</view>
						<view class="search-history-list" @tap="handleClickHistory">
							<view v-for="(item,index) in searchHistory" :key="index" :data-item="item">{{item}}</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">
							<view>热搜榜</view>
						</view>
						<view class="search-hot-body">
	<!-- 						<view class="search-hot-item">
								<view class="search-hot-top">1</view>
								<view class="search-hot-world">
									<view>
									少年
									<image src="/static/dujia.png" mode="aspectFit"></image>
									</view>
									<view>"少年"这个词实在是太美好了</view>
								</view>
								<text class="search-hot-count">
									296844
								</text>
							</view> -->
							<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" @tap="handleToWord(item.searchWord)">
								<view class="search-hot-top">{{index+1}}</view>
								<view class="search-hot-world">
									<view>
									{{item.searchWord}}
									<image :src="item.iconUrl" mode="aspectFit"></image>
									</view>
									<view>{{item.content}}</view>
								</view>
								<text class="search-hot-count">
									{{item.score}}
								</text>
							</view>
							
						</view>
					</view>
				</block>
				<block v-else-if="searchType==2">
					<view class="search-result" >
						<view class="search-result-item" v-for="(item,index) in searchList" data-item :key="item.id" @tap="handleToDetail(item.id)" >
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view class="search-item-detail">
									<image v-if="item.fee===8" src="/static/sq.png"></image>
									<image v-if="17179877376===item.mark" src="/static/dujia.png"></image>
									<text>{{item.artistText}} - {{item.name}}</text>
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
<!-- 						<view class="search-result-item">
							<view class="search-result-word">
								<view>少年</view>
								<view class="search-item-detail">
									<image src="/static/sq.png"></image>
									<text>许巍 - 爱如少年</text>
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view> -->
					</view>
				</block>
				<block v-else-if="searchType==3">
					<view class="search-suggest">
						<view v-show="searchWord" class="search-suggest-head">搜索"{{searchWord}}"</view>
						<view class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index" @tap="handleClickKeyword(item.keyword)">
							<text class="iconfont iconsearch"></text>
							<text>{{item.keyword}}</text>
						</view>
<!-- 						<view class="search-suggest-item">
							<text class="iconfont iconsearch"></text>
							<text>少年抖音</text>
						</view> -->
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '/components/musichead/musichead.vue'
	import '@/common/iconfont.css'
	import {searchWord,searchSuggest,searchHot} from '@/common/api.js'
	import { joinArtistNames } from '../../utils/Countformat'
	export default {
		data() {
			return {
				searchHot:[],
				searchWord:"",
				searchHistory:[],
				searchType:1,
				searchList:[],
				searchSuggest:[],
			}
		},
		onLoad(){
			searchHot().then(res=>{
				if(res.data.code===200){
					this.searchHot=res.data.data
					// console.log(this.searchHot)
				}
			})
		},
		 mounted() {
		    // 从本地存储加载历史记录
		    uni.getStorage({
				key:"searchHistory",
				success: (res) => {
					this.searchHistory=res.data
				}
			})
		  },
		components(){
			musichead
		},
		methods: {
			handleClickHistory(evt){
				// console.log(evt.target.dataset.item)
				const word=evt.target.dataset.item
				if(word){
					this.searchWord=word
					this.handleToSearch(evt.target.dataset.item)
				}
			},
			handleToWord(word){
				this.searchWord=word
				this.handleToSearch(word)
			},
			handleToSearch(searchWord){
				// console.log(searchWord)
				this.searchHistory.unshift(searchWord)
				// this.searchHistory=[...new Set(this.searchHistory)].slice(0,10)
				this.searchHistory=[...new Set(this.searchHistory)]
				if(this.searchHistory.length>10){
					this.searchHistory.length=10
				}
				uni.setStorage({
					key:'searchHistory',
					// data:JSON.stringify(this.searchHistory)
					data:this.searchHistory
				})
				this.getSearchList(searchWord)
			},
			handleClearHistory(){
				uni.removeStorage({
					key:'searchHistory',
					success:()=> {
						this.searchHistory=[]
					}
				})
			},
			getSearchList(word){
				searchWord(word).then(res=>{
					if(res.data.code===200){
						  this.searchList = res.data.result.songs.map(item => ({
						    ...item,
						    artistText: this.joinArtistNames(item.artists) // 提前计算并存储
						  }));
						  this.searchType = 2;
					}
				})
			},
			joinArtistNames,
			handleToClose(){
				this.searchType=1
				this.searchWord=''
			},
			handleToDetail(id){
				uni.navigateTo({
					url:'/pages/detail/detail?songId='+id
				})
				// 事件委托机制实现事件处理
				// <view class="search-result" @tap="handleToDetail">  
				// item的父元素绑定可以在H5实现，但小程序实现复杂，因此绑定到具体项目
				// const item = evt.target.closest('.search-result-item');
				// console.log(item)
				// if (!item) return;
				// const id = item.dataset.id;
				// uni.navigateTo({
				// 	url:'/pages/detail/detail?songId='+id
				// })
			},
			handleToSuggest(event){
				let value=event.detail.value
				if(!value){
					this.searchType=1
					return
				}
				searchSuggest(value).then(res=>{
					if(res.data.code===200){
						// console.log(res.data.result)
						this.searchSuggest=res.data.result.allMatch
						this.searchType=3
					}
				})
			},
			handleClickKeyword(word){
				this.searchWord=word
				this.handleToSearch(word)
			}

		}
	}
</script>

<style scoped lang="scss">
	.search-search{
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 15rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
		// width: 100%;
	}
	.search-search{
		text{
			font-size: 26rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
		}
		input{
			font-size: 26rpx;
			// margin-left: 500rpx;
			flex:1;
		}
	}
.search-history{
	margin: 20rpx;
	margin-bottom: 34rpx;
	.search-history-head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10rpx;
		view{
			font-size: 30rpx;
			line-height: 40rpx;
		}
		text{
			font-size: 30rpx;
			color: darkgrey;
		}
	}
	.search-history-list{
		display: flex;
		flex-wrap: wrap;
		margin: 20rpx 10rpx ;
		font-size: 26rpx;
		view{
			background-color: #f7f7f7;
			border-radius: 24rpx;
			padding: 16rpx 28rpx;
			margin-right: 16rpx;
			margin-bottom: 30rpx;
		}
	}
}
.search-hot{
	.search-hot-head{
		font-size: 30rpx;
		margin:0 30rpx;
		margin-bottom: 36rpx;
	}
	.search-hot-body{
		margin: 0rpx 26rpx 0 30rpx;
		.search-hot-item{
			display: flex;
			align-items: center;
			margin-left: 6rpx;
			margin-bottom: 36rpx;
			.search-hot-top{
				color: #fb2222;
				width:60rpx;
			}
			.search-hot-world{
				flex:1;
				font-size: 30rpx;
				view:nth-child(1){
					image{
						width: 48rpx;
						height:22rpx;
					}
				}
				view:nth-child(2){
					font-size: 24rpx;
					color:#878787;
				}
			}
				.search-hot-count{
					margin-left: 20rpx;
					color:#878787;
				}
			}
	}
}
.search-result{
	padding: 0rpx 30rpx;
	border-top: 3rpx solid #e4e4e4;
	.search-result-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 0;
		border-bottom: 3rpx solid #e4e4e4;
		.search-result-word{
			view:nth-child(1){
				font-size: 28rpx;
				color: #235790;
				margin-bottom: 12rpx;
			}
			.search-item-detail{
				// display: flex;
				// align-items: center;
				image{
					width: 36rpx;
					height: 22rpx;
					margin-right: 10rpx;
					vertical-align: middle;
				}
				text{
					font-size: 22rpx;
					line-height: 22rpx;
					vertical-align: middle;
					color: #898989;
				}
			}
		}
		> text{
			color: #898989;
			font-size: 50rpx;
		}
	}
}
.search-suggest{
	padding:  30rpx;
	border-top: 3rpx solid #e4e4e4;
	font-size: 26rpx;
	.search-suggest-head{
		color: #4574a5;
	}
	.search-suggest-item{
		margin-top: 40rpx;
		color: #5d5d5d;
		text:first-child{
			position: relative;
			top:4rpx;
			color:#bdbdbd;

		}
		text:last-child{
			margin-left: 10rpx;
		}
	}
}

</style>
