<template>
  <div>
    <Header />
    <div class="tab flex-h flex-hsb">
      <div
        class="tab-item"
        v-for="(item, index) in tab"
        :key="index"
        :class="tabIndex === index ? 'on' : ''"
        @click="tabFn(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="take-box flex-h" v-if="tabIndex === 0 || tabIndex === 1">
      <p class="take-text">
        当前台号：<span>{{ table }}</span
        >，扫码换台
      </p>
      <div class="take-scan" @click="scanTap">扫一扫</div>
    </div>
    <!--start: 存酒-->
    <!-- <div v-if="tabIndex === 0">
      <p class="note">找到房号（台号）二维码【扫一扫】存酒</p>
      <div class="scan-btn">扫一扫</div>
    </div> -->
    <!--end: 存酒-->
    <!--start: 取酒-->
    <div v-if="tabIndex === 1 || tabIndex === 0">
      <div class="wine-list" v-if="list.length > 0">
        <div class="item-box" v-for="(item, index) in list" :key="index">
          <div class="wine-item flex-h flex-hsb">
            <img class="wine-img" :src="item.img" alt="" />
            <div class="wine-content">
              <p class="wine-name">
                {{ item.name }}<span> ({{ item.unit }})</span>
              </p>
              <div class="flex-h flex-hsb flex-vc">
                <span v-if="tabIndex === 0">价格：{{ item.sell_price }}</span>
                <span v-if="tabIndex === 1">存酒数量：{{ item.num }}</span>
                <div class="count-box flex-h">
                  <span @click="cutTakeWineNum(item)">-</span>
                  <input
                    class="wine-num"
                    v-model="item.ipt"
                    disabled
                    type="number"
                    pattern="[0-9]*"
                  />
                  <span @click="addTakeWineNum(item)">+</span>
                </div>
              </div>
              <p class="price-box" v-if="tabIndex === 1">
                过期时间：{{ item.expire_time }}
              </p>
            </div>
          </div>
          <div class="take-btn-box">
            <span
              class="take-btn"
              v-if="tabIndex === 0"
              @click="saveWineFn(item)"
              >存酒</span
            >
            <span
              class="take-btn"
              v-else-if="tabIndex === 1"
              @click="takeWineFn(item)"
              >取酒</span
            >
          </div>
        </div>
      </div>
      <p v-else class="no-wine">
        <span v-if="tabIndex === 0">暂无酒水</span
        ><span v-if="tabIndex === 1">暂无存储酒水</span>
      </p>
    </div>
    <!--end: 取酒-->
    <!--start: 存取记录-->
    <div v-else>
      <div
        class="wine-list"
        style="padding-bottm: 0"
        v-infinite-scroll="getdata"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="5"
        v-if="recordList.length > 0"
      >
        <div
          class="wine-item history flex-h flex-hsb"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <img class="wine-img" :src="item.img" alt="" />
          <div class="wine-content">
            <div class="flex-h flex-hsb">
              <p class="wine-name">
                {{ item.name }}<span> ({{ item.unit }})</span>
              </p>
              <span class="save-text">
                <template v-if="item.status === '0'">待确认</template>
                <template v-if="item.status === '1' && item.type === '1'"
                  >已存</template
                >
                <template v-if="item.status === '1' && item.type === '2'"
                  >已取</template
                >
                <template v-if="item.status === '2'">已拒绝</template>
                <template v-if="tabIndex === 3">已过期</template>
              </span>
            </div>
            <p>
              <span v-if="item.type === '2'">取酒</span
              ><span v-if="item.type === '1'">存酒</span>数量：{{ item.num }}
            </p>
            <p class="mar" v-if="tabIndex === 2">
              下单时间：{{ item.addtime }}
            </p>
            <p class="mar" v-if="tabIndex === 3">
              过期时间：{{ item.expire_time }}
            </p>
          </div>
        </div>
      </div>
      <p v-else class="no-wine">暂无记录</p>
    </div>
    <!--end: 存取记录-->
  </div>
</template>

<script>
import Header from "@/components/header";
import wx from "weixin-js-sdk";
import {
  saveWine,
  takeWine,
  takeWineList,
  historySaveWine,
  overdueWine,
  saveWineList
} from "@/api/takeWine.js";
export default {
  name: "TakeWine",
  data() {
    return {
      tab: [
        {
          id: 0,
          name: "我要存酒"
        },
        {
          id: 1,
          name: "我要取酒"
        },
        {
          id: 2,
          name: "存取酒记录"
        },
        {
          id: 3,
          name: "过期酒水"
        }
      ],
      tabIndex: 0,
      list: [], // 存取酒列表
      table: "未知",
      recordList: [], // 存酒记录
      pn: 1,
      loading: true,
      hasmore: true
    };
  },
  components: {
    Header
  },
  mounted() {
    let table = window.localStorage.getItem("table");
    if (table) {
      this.table = table;
    }
    if (this.$route.query && this.$route.query.tabIndex) {
      this.tabIndex = Number(this.$route.query.tabIndex);
    }
    if (this.tabIndex === 0) this.getSaveWineList();
    else if (this.tabIndex === 1) this.getTakeWineList();
    else if (this.tabIndex === 2 || this.tabIndex === 3) {
      this.loading = true;
      this.pn = 1;
      this.hasmore = true;
      this.recordList = [];
      this.getdata();
    }
  },
  methods: {
    tabFn(index) {
      if (this.tabIndex === index) return;
      this.tabIndex = index;
      this.list = [];
      if (index === 0) this.getSaveWineList();
      if (index === 1) this.getTakeWineList();
      if (this.tabIndex === 2 || this.tabIndex === 3) {
        this.loading = true;
        this.pn = 1;
        this.hasmore = true;
        this.recordList = [];
        this.getdata();
      }
    },
    scanTap() {
      let that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if (result.indexOf("table=") < 0) {
            that.$toast("扫码错误，请扫描正确的二维码");
            return;
          }
          that.$toast("扫码成功");
          let tableNum = result.split("table=")[1];
          window.localStorage.setItem("table", tableNum);
        }
      });
    },
    // 获取存酒列表
    getSaveWineList() {
      saveWineList({
        loading: true
      })
        .then(res => {
          if (res.data.length > 0) {
            let arr = [];
            res.data.forEach(item => {
              if (item.data.length > 0) arr.push(...item.data);
            });
            arr.forEach(item => {
              item.ipt = 0;
            });
            this.list = arr;
          }
        })
        .catch(err => {});
    },
    // 存酒
    saveWineFn(item) {
      if (this.table === "未知") {
        this.$toast("请先扫码获取台号");
        return;
      } else if (item.ipt === 0) {
        this.$toast("请先点酒");
        return;
      }
      this.$messagebox
        .confirm("确定存酒吗", "存酒提示")
        .then(action => {
          if (action === "confirm") {
            saveWine({
              loading: true,
              data: {
                pid: item.id,
                num: item.ipt,
                table_num: this.table
              }
            })
              .then(res => {
                this.$toast(res.msg);
                item.ipt = 0;
              })
              .catch(err => {});
          }
        })
        .catch(e => {});
    },
    // 获取取酒列表
    getTakeWineList() {
      takeWineList({
        loading: true
      })
        .then(res => {
          let list = res.data || [];
          list.forEach(item => {
            item.ipt = Number(item.num);
          });
          this.list = list;
        })
        .catch(err => {});
    },
    // 取酒
    takeWineFn(item) {
      if (this.table === "未知") {
        this.$toast("请先扫码获取台号");
        return;
      } else if (item.ipt === 0) {
        this.$toast("请选择取多少酒");
        return;
      }
      this.$messagebox
        .confirm("确定取酒吗", "取酒提示")
        .then(action => {
          if (action === "confirm") {
            takeWine({
              loading: true,
              data: {
                pid: item.id,
                num: item.ipt,
                table_num: this.table
              }
            })
              .then(res => {
                this.$toast(res.msg);
                this.getTakeWineList();
              })
              .catch(err => {});
          }
        })
        .catch(e => {});
    },
    cutTakeWineNum(item) {
      if (item.ipt === 0) return;
      item.ipt--;
    },
    addTakeWineNum(item) {
      if (this.tabIndex === 1 && item.ipt === Number(item.num)) return;
      item.ipt++;
    },
    getdata() {
      if (this.tabIndex === 2) {
        this.getHistorySaveWineList();
      } else if (this.tabIndex === 3) {
        this.getOverdueWineList();
      }
    },
    // 存取记录
    getHistorySaveWineList() {
      if (!this.hasmore) return;
      this.loading = true;
      historySaveWine({
        loading: true,
        data: {
          page: this.pn
        }
      })
        .then(res => {
          if (res.data.length > 0) {
            this.loading = false;
            this.pn++;
            this.recordList = this.recordList.concat(res.data);
          } else {
            if (this.pn !== 1) {
              this.$toast("已无更多数据");
              this.hasmore = false;
            }
          }
        })
        .catch(err => {});
    },
    getOverdueWineList() {
      if (!this.hasmore) return;
      this.loading = true;
      overdueWine({
        loading: true,
        data: {
          page: this.pn
        }
      })
        .then(res => {
          if (res.data.length > 0) {
            this.loading = false;
            this.pn++;
            this.recordList = this.recordList.concat(res.data);
          } else {
            if (this.pn !== 1) {
              this.$toast("已无更多数据");
              this.hasmore = false;
            }
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  padding: 0 0.3rem;
  height: 40px;
  background-color: #070707;
  .tab-item {
    padding-top: 0.36rem;
    padding-bottom: 0.23rem;
    border-bottom: 2px solid #070707;
    color: #fff;
    &.on {
      color: #ff314f;
      border-bottom: 2px solid #ff314f;
    }
  }
}
.note {
  margin-top: 5rem;
  font-size: 0.26rem;
  color: #fff;
  text-align: center;
}
.scan-btn {
  margin: 0.52rem 0.75rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.38rem;
  color: #fff;
  background-color: #ff314f;
  border-radius: 24px;
}
.no-wine {
  margin-top: 5.6rem;
  color: #fff;
  text-align: center;
}
.take-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  background-color: #070707;
  .take-text {
    width: 72%;
    span {
      color: #ff314f;
    }
  }
  .take-scan {
    width: 28%;
    background-color: #68da6b;
  }
}
.wine-list {
  padding-top: 90px;
  .item-box {
    margin-bottom: 0.14rem;
  }
  .wine-item {
    padding: 0.36rem;
    margin-bottom: 1px;
    background-color: #070707;
    color: #fff;
    &.history {
      margin-bottom: 0.14rem;
    }
    .wine-img {
      width: 1.4rem;
      height: 1.4rem;
      background-color: pink;
      border-radius: 3px;
    }
    .wine-content {
      width: 5.1rem;
      .mar {
        margin-top: 0.16rem;
      }
    }
    .save-text {
      font-size: 0.24rem;
      color: #a7a7a7;
    }
    .wine-name {
      height: 0.32rem;
      line-height: 0.32rem;
      margin-top: 3px;
      margin-bottom: 0.12rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        color: #ff314f;
      }
    }
    .count-box {
      border: 1px solid #ddd;
      height: 0.45rem;
      line-height: 0.45rem;
      font-size: 0.22rem;
      border-radius: 2px;
      input {
        width: 0.6rem;
        text-align: center;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        background-color: #070707;
        color: #fff;
      }
      span {
        width: 0.45rem;
        text-align: center;
        color: #ff314f;
      }
    }
    .price-box {
      margin-top: 0.1rem;
    }
  }
  .take-btn-box {
    background-color: #070707;
    padding: 0.13rem 0.6rem;
    text-align: right;
    .take-btn {
      display: inline-block;
      width: 1.3rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      border-radius: 20px;
      background-color: #ff314f;
      color: #fff;
    }
  }
}
</style>
