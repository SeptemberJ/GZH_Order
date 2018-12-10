<template>
  <div class="GongXuDetail">
    <van-nav-bar
      title="订单详情"
      left-text=""
      right-text=""
      left-arrow
      @click-left="Back"
    />
    <van-panel title="" desc="" status="">
      <div>
        <van-cell title="工单号" :value="curGongXu.flsh" size="small" />
        <van-cell title="工序" :value="curGongXu.fgongxu" size="small" />
        <van-cell title="操作员" :value="curGongXu.fczy" size="small" />
        <van-cell title="面积" :value="curGongXu.fmj" size="small" />
        <van-cell title="备注" :value="curGongXu.fnote" size="small" />
      </div>
    </van-panel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'GongXuDetail',
  data () {
    return {
    }
  },
  created () {
    // this.getGongxuList()
  },
  computed: {
    ...mapState({
      curGongXu: state => state.curGongXu
    })
  },
  methods: {
    ...mapActions([
      'changeCurPageName'
    ]),
    Back () {
      this.changeCurPageName('GongXuList')
      this.$router.push({name: 'GongXuList'})
    }
  }
}
</script>

<style>
.GongXuDetail{
  padding: 10px;
}
.van-cell__title{
  text-align: left !important;
}
</style>
