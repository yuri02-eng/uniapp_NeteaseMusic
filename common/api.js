import { baseUrl } from './config.js';
const TOKEN="123"
// http://localhost:8000/api/user/cellphone?  在网易云客户端获取验证码，然后用这个获取token,替换如下的内容就可以了
// document.cookie="token="
export function topList(){
	var listIds = ['3' , '0' , '2' , '1' ];
	return new Promise(function(resolve,reject){
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length = 4;
				for(let i=0;i<result.length;i++){
					result[i].listId = listIds[i];
				}
				resolve(result);
			},
			fail: (err) => {
				console.log(err);
			},
			complete: () => {}
		});
	});
}

export function list(listId){
	return uni.request({
		url: `${baseUrl}/toplist?id=${listId}`,
		method: 'GET'
	});
}

export function songDetail(id){
	return uni.request({
		url : `${baseUrl}/song/detail?id=${id}`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		}
	})
}

export function songUrl(id){
	return uni.request({
		url : `${baseUrl}/song/url?id=${id}`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		},
	})
}

export function songLyric(id){
	return uni.request({
		url : `${baseUrl}/song/lyric?id=${id}`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		}
	})
}

export function songSimi(id){
	return uni.request({
		url : `${baseUrl}/song/simi?id=${id}`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		}
	})
}

export function songComment(id){
	return uni.request({
		url : `${baseUrl}/comment/song?id=${id}`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		}
	})
}

export function searchHot(){
	return uni.request({
		url : `${baseUrl}/search/hotdetail`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		}
	})
}

export function searchWord(word,limit=10,offset=0){
	return uni.request({
		url : `${baseUrl}/search?value=${word}&limit=${limit}&offset=${offset}`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		}
	})
}

export function searchSuggest(word){
	return uni.request({
		url : `${baseUrl}/search/suggest?value=${word}&type=mobile`,
		method : 'GET',
		header: {
		      'Cookie': `token=${TOKEN}`,
		}
	})
}