<template>
    <div class="box">
       <ul class="listbox tabs">
           <li class="li-tab" v-for="(item,index) in tabsParam" :key="item.tabsParam"
                 @click="toggleTabs(index)"
                  :class="{active:index===nowIndex}">{{item}}
               </li>
       </ul>
       <div class="list">
           <!-- <div class="kedu"></div> -->
            <bjs-list v-show="nowIndex===0"></bjs-list>
        <dyb-list v-show="nowIndex===1"></dyb-list>
        <dyn-list v-show="nowIndex===2"></dyn-list>
        <dh-list v-show="nowIndex===3"></dh-list>
        <ml-list v-show="nowIndex===4"></ml-list>
        <ns-list v-show="nowIndex===5"></ns-list>
       </div>
    </div>
</template>
<script>
import BjsList from "@/components/rcdd/components/bjslist";
import DybList from "@/components/rcdd/components/dyblist";
import DynList from "@/components/rcdd/components/dynlist";
import DhList from "@/components/rcdd/components/dhlist";
import MlList from "@/components/rcdd/components/mllist";
import NsList from "@/components/rcdd/components/nslist";
export default {
  name: "Tablist",
  data() {
    return {
      tabsParam: [
        "笔架山水厂",
        "大涌北水厂",
        "大涌南水厂",
        "东湖水厂",
        "梅林水厂",
        "南山水厂"
      ],
      nowIndex: 0,
      isShow: false
    };
  },
  methods: {
    //切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
    }
  },
  components: {
    BjsList,
    DybList,
    DynList,
    DhList,
    MlList,
    NsList
  }
};
</script>
<style lang="scss" scoped>
.box {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  /*   margin: 0 20px; */
  width: 100%;
  
}
.listbox {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 1128px;
  height: 40px;
  color: #788493;
   background-color: #f5f5f6;
}
.listbox > li {
  width: 188px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px #e4e4ec solid;
  font-size: 12px;
  font-family: "微软雅黑";
  font-weight: bold;
  cursor: pointer;
}
.active {
  color: #fff;
  background-color: #70991f;
  /*   border-bottom: 2px #548ff6 solid; */
}
.list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction:column;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
/* border: 1px #e4e4ec solid; */
}
/* .kedu{
    width: 100%;
    height:28px;
    background-color: #fff;
    border: 1px #e4e4ec solid;
} */
</style>

