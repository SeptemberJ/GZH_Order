<template>
  <div class="Search">
    <van-search
      v-model="keyword"
      placeholder="请输入需要查询的订单号"
      show-action
      @clear="clearSearch"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- 查询结果 -->
    <div v-if="ifSearch && gongXuResult.name">
      <van-panel title="查询结果" desc="" status="">
        <div>
          <van-cell :title="gongXuResult.orderNumber" :value="gongXuResult.name" size="large" />
          <van-cell v-for="(item, idx) in gongXuResult.process" :key="idx"  :title="item.fgongxu" :value="item.time" size="small" />
        </div>
      </van-panel>
    </div>
    <!-- 订单列表 -->
    <div v-if="!ifSearch">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getOrderList"
      >
        <van-cell is-link
          v-for="(item, idx) in OrderList"
          :key="idx"
          :title="item.order_name"
          @click="GoDetail(item.id)"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../util/send'
import { Toast } from 'vant'
import {formatTime} from '../util/utils'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      OrderList: [],
      loading: false,
      finished: false,
      ifSearch: false,
      gongXuResult: {
        name: '',
        orderNumber: '',
        process: []
      }
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  watch: {
    keyword: function (val) {
      if (val.trim() === '') {
        this.clearSearch()
      }
    }
  },
  methods: {
    ...mapActions([
      'changeCurPageName',
      'toggleSpinner',
      'toggleSpinner'
    ]),
    clearSearch () {
      this.ifSearch = false
      this.gongXuResult = {
        name: '',
        process: []
      }
    },
    onSearch () {
      if (this.keyword.trim() === '') {
        Toast.fail({
          duration: 1500,
          forbidClick: true,
          message: '请输入单号'
        })
        return false
      }
      this.toggleSpinner(true)
      send({
        name: '/orderGongxuList?order_no=' + this.keyword,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
            Toast.fail({
              duration: 1500,
              forbidClick: true,
              message: _res.data.message
            })
            this.toggleSpinner(false)
            break
          case 1:
            this.ifSearch = true
            this.gongXuResult.orderNumber = this.keyword
            if (_res.data.orderGongxuList.length > 0) {
              _res.data.orderGongxuList.map((item, idx) => {
                if (idx === 0) {
                  this.gongXuResult.name = item.fgongxu
                } else {
                  item.time = formatTime(new Date(item.fdate.time))
                  this.gongXuResult.process.push(item)
                }
              })
              Toast.success({
                duration: 800,
                forbidClick: true,
                message: '查询成功！'
              })
            } else {
              Toast.fail({
                duration: 1500,
                forbidClick: true,
                message: '查无此单，请检查您输入的单号！'
              })
            }
            this.toggleSpinner(false)
            break
          default:
            this.toggleSpinner(false)
            Toast.fail('Interface error！')
        }
      }).catch((res) => {
        console.log(res)
        this.toggleSpinner(false)
        Toast.fail('Interface error！')
      })
    },
    getOrderList () {
      this.toggleSpinner(true)
      send({
        name: '/orderList?user_id=' + this.userId,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
            this.loading = false
            this.finished = true
            this.toggleSpinner(false)
            Toast.fail({
              duration: 1500,
              forbidClick: true,
              message: _res.data.message
            })
            break
          case 1:
            this.OrderList = _res.data.orderList
            this.loading = false
            this.finished = true
            this.toggleSpinner(false)
            break
          default:
            console.log(_res)
            Toast.fail('Interface error！')
            this.loading = false
            this.finished = true
            this.toggleSpinner(false)
        }
      }).catch((res) => {
        console.log(res)
        Toast.fail('Interface error！')
        this.toggleSpinner(false)
      })
    },
    GoDetail (ID) {
      this.changeCurPageName('OrderDetail')
      this.$router.push({name: 'OrderDetail', params: { id: ID }})
    }
  }
}
</script>

<style>
.Search{
  padding: 10px;
}
.van-cell__title{
  text-align: left !important;
}
.van-field__control{
  text-align: right !important;
}
</style>
