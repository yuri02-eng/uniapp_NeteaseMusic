// stores/mainStore.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    topIdList: [],
    nextId: ''
  }),
  actions: {
    initChange(payload) {
      this.topIdList = payload;
    },
    nextID(payload) {
	// console.log("进入函数执行了",payload)
      for (let i = 0; i < this.topIdList.length; i++) {
		  console.log(typeof(this.topIdList[i].id),this.topIdList[i].id,typeof(payload),payload ,Number(this.topIdList[i].id )=== payload)
        if (Number(this.topIdList[i].id )=== payload) {
          // 添加边界检查防止越界
          if (i + 1 < this.topIdList.length) {
            this.nextId = this.topIdList[i + 1].id;
          } else {
            this.nextId = this.topIdList[0].id; // 或者处理为没有下一个的情况
          }
          break;
        }
      }
	console.log("匹配到的nextId为",this.nextId)
    }
  }
});