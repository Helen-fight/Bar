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
    <!--start: 存酒-->
    <div v-if="tabIndex === 0">
      <p class="note">找到房号（台号）二维码【扫一扫】存酒</p>
      <div class="scan-btn">扫一扫</div>
    </div>
    <!--end: 存酒-->
    <!--start: 取酒-->
    <div v-else-if="tabIndex === 1">
      <div class="take-box flex-h">
        <p class="take-text">自助取酒请扫房台二维码</p>
        <div class="take-scan" @click="scanTap">扫一扫</div>
      </div>

      <div class="wine-list">
        <div class="item-box" v-for="(item, index) in list" :key="index">
          <div class="wine-item flex-h flex-hsb">
            <img class="wine-img" src="" alt="" />
            <div class="wine-content">
              <p class="wine-name">
                Heineken/喜力啤酒{{ index + 1 }}<span> (支)</span>
              </p>
              <div class="flex-h flex-hsb flex-vc">
                <span>存酒数量：2</span>
                <div class="count-box flex-h">
                  <span
                    :class="{ disabled: item.ipt === item.num }"
                    @click="cutTakeWineNum(item)"
                    >-</span
                  >
                  <input
                    class="wine-num"
                    v-model="item.ipt"
                    disabled
                    type="number"
                    pattern="[0-9]*"
                  />
                  <span
                    :class="{ disabled: item.ipt === item.num }"
                    @click="addTakeWineNum(item)"
                    >+</span
                  >
                </div>
              </div>
              <p class="price-box">剩余时间：20天</p>
            </div>
          </div>
          <div class="take-btn-box">
            <span class="take-btn">取酒</span>
          </div>
        </div>
      </div>
    </div>
    <!--end: 取酒-->
    <!--start: 存取记录-->
    <div class="wine-list" style="padding-bottm: 0" v-else>
      <div
        class="wine-item history flex-h flex-hsb"
        v-for="(item, index) in list"
        :key="index"
      >
        <img class="wine-img" src="" alt="" />
        <div class="wine-content">
          <div class="flex-h flex-hsb">
            <p class="wine-name">
              Heineken/喜力啤酒{{ index + 1 }}<span> (支)</span>
            </p>
            <span class="save-text">已存</span>
          </div>
          <p>存酒数量：2</p>
          <p class="price-box">剩余时间：20天</p>
        </div>
      </div>
    </div>
    <!--end: 存取记录-->
  </div>
</template>

<script>
import Header from "@/components/header";
import {
  saveWine,
  takeWine,
  historySaveWine,
  overdueWine
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
          name: "存酒记录"
        },
        {
          id: 3,
          name: "过期酒水"
        }
      ],
      tabIndex: 0,
      list: [1, 2, 3]
    };
  },
  components: {
    Header
  },
  mounted() {
    if (this.$route.query && this.$route.query.tabIndex) {
      this.tabIndex = Number(this.$route.query.tabIndex);
    }
  },
  methods: {
    tabFn(index) {
      this.tabIndex = index;
      if (index == 1) this.getTakeWineList();
      if (index == 2) this.getHistorySaveWineList();
      if (index == 3) this.getOverdueWineList();
    },
    scanTap() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

          saveWine({
            data: {
              id: result,
              num: 0,
              table_num: result
            },
            loading: true
          }).then(res => {
            this.$toast("成功存酒!");
          });
        }
      });
    },
    // 我要取酒
    getTakeWineList() {
      this.list = [1, 2, 3, 4, 5];
      return;
      takeWine({
        // data: {uid: },
        loading: true
      })
        .then(res => {
          let list = res.data || [];
          this.list = list.reduce((newArr, currItem, currInx, arr) => {
            currItem.ipt = 0;
            newArr.push(currItem);
            return newArr;
          }, []);
        })
        .catch(err => {});
    },
    cutTakeWineNum(item) {
      if (item.ipt === item.num) return;
      item.ipt--;
    },
    addTakeWineNum(item) {
      if (item.ipt === item.num) return;
      item.ipt++;
    },
    getHistorySaveWineList() {
      this.list = [];
      historySaveWine({
        loading: true
      })
        .then(res => {
          this.list = res.data || [];
        })
        .catch(err => {});
    },
    getOverdueWineList() {
      this.list = [1, 2, 3];
      return;
      overdueWine({
        loading: true
      })
        .then(res => {
          this.list = res.data || [];
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
  }
  .take-scan {
    width: 28%;
    background-color: #68da6b;
  }
}
.wine-list {
  padding-top: 90px;
  padding-bottom: 1rem;
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
      height: 20px;
    }
    .save-text {
      font-size: 0.24rem;
      color: #a7a7a7;
    }
    .wine-name {
      margin-bottom: 0.2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        color: #ff314f;
        &.disabled {
          color: #ddd;
        }
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
        color: #f88346;
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
