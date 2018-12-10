<template>
  <div class="GongxuList">
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- <van-panel title="" desc="" status="" v-for="(item, idx) in GongxuList" style="border:1px solid #efefef;border-radius:5px;margin-top:15px;">
      <div>
        <van-cell title="工单号" :value="item.flsh" size="small" />
        <van-cell title="工序" :value="item.fgongxu" size="small" />
        <van-cell title="操作员" :value="item.fczy" size="small" />
        <van-cell title="面积" :value="item.fmj" size="small" />
        <van-cell title="备注" :value="item.fnote" size="small" />
      </div>
    </van-panel> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getGongxuList"
    >
      <van-cell is-link
        v-for="(item, idx) in GongxuList"
        :key="idx"
        :title="item.flsh"
        @click="GoDetail(item)"
      />
    </van-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../util/send'
import { Toast } from 'vant'
export default {
  name: 'GongxuList',
  data () {
    return {
      keyword: '',
      GongxuList: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.getGongxuList()
  },
  computed: {
    ...mapState({
      userName: state => state.userName
    })
  },
  methods: {
    ...mapActions([
      'changeCurPageName',
      'toggleSpinner',
      'updateCurGongXu'
    ]),
    onSearch () {
      if (this.keyword.trim() === '') {
        Toast.fail({
          duration: 1500,
          forbidClick: true,
          message: '请输入单号'
        })
        return false
      }
      send({
        name: '/userLoginPC?keyword=' + this.keyword,
        method: 'POST',
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
            this.loading = false
            break
          case 1:
            Toast.success('登陆成功！')
            this.loading = false
            this.$router.push({name: 'Order'})
            break
          default:
            Toast.fail('Interface error！')
            this.loading = false
        }
      }).catch((res) => {
        Toast.fail('Interface error！')
        this.loading = false
      })
    },
    getGongxuList () {
      this.toggleSpinner(true)
      send({
        name: '/userGongxuList?fczy=' + this.userName,
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
            this.GongxuList = _res.data.userGongxuList
            this.loading = false
            this.finished = true
            this.toggleSpinner(false)
            break
          default:
            Toast.fail('Interface error！')
            this.loading = false
            this.finished = true
            this.toggleSpinner(false)
        }
      }).catch((res) => {
        Toast.fail('Interface error！')
        this.toggleSpinner(false)
      })
    },
    GoDetail (Item) {
      this.updateCurGongXu(Item)
      this.changeCurPageName('GongXuDetail')
      this.$router.push({name: 'GongXuDetail'})
    }
  }
}
</script>

<style>
.GongxuList{
  padding: 10px;
}
.van-cell__title{
  text-align: left !important;
}

</style>
