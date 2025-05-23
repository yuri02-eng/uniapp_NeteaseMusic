"use strict";
const common_vendor = require("../common/vendor.js");
const useMainStore = common_vendor.defineStore("main", {
  state: () => ({
    topIdList: [],
    nextId: ""
  }),
  actions: {
    initChange(payload) {
      this.topIdList = payload;
    },
    nextID(payload) {
      for (let i = 0; i < this.topIdList.length; i++) {
        console.log(typeof this.topIdList[i].id, this.topIdList[i].id, typeof payload, payload, Number(this.topIdList[i].id) === payload);
        if (Number(this.topIdList[i].id) === payload) {
          if (i + 1 < this.topIdList.length) {
            this.nextId = this.topIdList[i + 1].id;
          } else {
            this.nextId = this.topIdList[0].id;
          }
          break;
        }
      }
      console.log("匹配到的nextId为", this.nextId);
    }
  }
});
exports.useMainStore = useMainStore;
