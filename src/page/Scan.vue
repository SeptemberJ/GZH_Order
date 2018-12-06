<template>
  <div class="Scan">
    <van-button type="default" @click="Scan()">扫码</van-button>
  </div>
</template>

<!-- <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script> -->

<script>
// import { mapState, mapActions } from 'vuex'
// import { Toast } from 'vant'
export default {
  name: 'Scan',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    // ...mapState({
    //   register_id: state => state.register_id
    // })
  },
  components: {
  },
  methods: {
    Scan () {
      wx.scanQRCode({
        needResult: 1,// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"],// 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr
          alert (result)
        }
      })
    }
  }
}
</script>

<style scoped>
.Scan{
}
</style>
