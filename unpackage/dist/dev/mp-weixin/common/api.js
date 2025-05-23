"use strict";
const common_vendor = require("./vendor.js");
const common_config = require("./config.js");
const TOKEN = "123";
function topList() {
  var listIds = ["3", "0", "2", "1"];
  return new Promise(function(resolve, reject) {
    common_vendor.index.request({
      url: `${common_config.baseUrl}/toplist/detail`,
      method: "GET",
      data: {},
      success: (res) => {
        let result = res.data.list;
        result.length = 4;
        for (let i = 0; i < result.length; i++) {
          result[i].listId = listIds[i];
        }
        resolve(result);
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    });
  });
}
function list(listId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/toplist?id=${listId}`,
    method: "GET"
  });
}
function songDetail(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/detail?id=${id}`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
function songUrl(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/url?id=${id}`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
function songLyric(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/lyric?id=${id}`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
function songSimi(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/simi?id=${id}`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
function songComment(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/comment/song?id=${id}`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
function searchHot() {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/hotdetail`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
function searchWord(word, limit = 10, offset = 0) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search?value=${word}&limit=${limit}&offset=${offset}`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
function searchSuggest(word) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/suggest?value=${word}&type=mobile`,
    method: "GET",
    header: {
      "Cookie": `token=${TOKEN}`
    }
  });
}
exports.list = list;
exports.searchHot = searchHot;
exports.searchSuggest = searchSuggest;
exports.searchWord = searchWord;
exports.songComment = songComment;
exports.songDetail = songDetail;
exports.songLyric = songLyric;
exports.songSimi = songSimi;
exports.songUrl = songUrl;
exports.topList = topList;
