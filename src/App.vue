<template>
  <div id="app">
    <!-- <h2>{{curPageName}}</h2>
    <h2>{{curTab}}</h2> -->
    <!-- <van-nav-bar
      title="梵家全屋定制智能订单系统"
      left-text=""
      right-text=""
    /> -->
    <router-view/>
    <van-tabbar v-model="curTab" v-if="curPageName !== 'Login' && curPageName !== 'ModifyPsd' && curPageName !== 'OrderDetail' && curPageName !== 'GongXuDetail'">
      <van-tabbar-item icon="records" v-show="role != 2">录入</van-tabbar-item>
      <van-tabbar-item icon="aim" v-show="role != 2">查询</van-tabbar-item>
      <van-tabbar-item icon="pending-orders" v-show="role == 2">工单</van-tabbar-item>
      <van-tabbar-item icon="qr" v-show="role == 2">扫码</van-tabbar-item>
      <!-- <van-tabbar-item icon="qr" v-show="role == 2">扫码</van-tabbar-item> -->
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <!-- spinner -->
    <div style="width: 100px;height:100px;border-radius: 5px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#000;opacity:.6" v-if="spinner">
      <van-loading type="spinner" color="#fff" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);"/>
    </div>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import {MySha1} from './util/utils'
import {send} from './util/send'
import { Toast } from 'vant'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      curPageName: state => state.curPageName,
      role: state => state.role,
      spinner: state => state.spinner
    }),
    curTab: {
      get: function () {
        return this.$store.state.curTab
      },
      set: function (newValue) {
        this.changeCurTab(newValue)
      }
    }
  },
  watch: {
    curTab: function (val) {
      switch (val) {
        case 0:
          this.$router.push({name: 'Order'})
          this.changeCurPageName('Order')
          this.changeCurTab(0)
          break
        case 1:
          this.$router.push({name: 'Search'})
          this.changeCurPageName('Search')
          this.changeCurTab(1)
          break
        case 2:
          this.$router.push({name: 'GongXuList'})
          this.changeCurPageName('GongXuList')
          this.changeCurTab(2)
          break
        case 3:
          this.$router.push({name: 'Scan'})
          this.changeCurPageName('Scan')
          this.changeCurTab(3)
          break
        case 4:
          this.$router.push({name: 'My'})
          this.changeCurPageName('My')
          this.changeCurTab(4)
          break
        default:
          this.$router.push({name: 'Login'})
          this.changeCurPageName('Login')
          this.changeCurTab(-1)
      }
    }
    // curTab: function (val) {
    //   switch (val) {
    //     case 0:
    //       this.$router.push({name: 'Order'})
    //       this.changeCurPageName('Order')
    //       break
    //     case 1:
    //       this.$router.push({name: 'Search'})
    //       this.changeCurPageName('Search')
    //       break
    //     case 2:
    //       this.$router.push({name: 'Scan'})
    //       this.changeCurPageName('Scan')
    //       break
    //     case 3:
    //       this.$router.push({name: 'My'})
    //       this.changeCurPageName('My')
    //       break
    //   }
    // }
  },
  created () {
    // let HashString = window.location.hash
    // if (HashString.indexOf('Order') !== -1) {
    //   this.changeCurTab(0)
    //   this.changeCurPageName('Order')
    // } else if (HashString.indexOf('Search') !== -1) {
    //   this.changeCurTab(1)
    //   this.changeCurPageName('Search')
    // } else if (HashString.indexOf('Scan') !== -1) {
    //   this.changeCurTab(2)
    //   this.changeCurPageName('Scan')
    // } else if (HashString.indexOf('My') !== -1) {
    //   this.changeCurTab(3)
    //   this.changeCurPageName('My')
    // } else {
    //   this.changeCurTab(-1)
    //   this.changeCurPageName('Login')
    // }
    // 获取select选项
    this.getSelectList()
    // 配置
    this.getAccessToken()
  },
  methods: {
    ...mapActions([
      'changeCurPageName',
      'changeCurTab',
      'updateSelectList'
    ]),
    // 获取url参数
    // QueryString () {
    //   let urlData = {}
    //   let aPairs
    //   let aTmp
    //   let queryString = new String(location.search)
    //   queryString = queryString.substr(1, queryString.length)
    //   aPairs = queryString.split("&")
    //   for (let i = 0; i < aPairs.length; i++) {
    //     aTmp = aPairs[i].split("=")
    //     urlData[aTmp[0]] = aTmp[1]
    //   }
    //   return urlData
    // },
    // 获取openid
    // getOpenid () {
    //   send({
    //     name: '/device?id=' + this.QueryString()['code'],
    //     method: 'GET',
    //     data: {
    //     }
    //   }).then(_res => {
    //     // switch (_res.data.code) {
    //     //   case 1:
    //     //     break
    //     //   default:
    //     // }
    //   }).catch((_res) => {
    //     console.log(_res)
    //   })
    // },
    ConfigFn (JsapiTicket) {
      var mytimestamp = (Date.parse(new Date())) / 1000
      var mynonceStr = MySha1(String(mytimestamp)).substring(0, 16)
      var mysignature = 'jsapi_ticket=' + JsapiTicket + '&noncestr=' + mynonceStr + '&timestamp=' + mytimestamp + '&url=' + window.location.href.split("#")[0]
      wx.config({
        beta: true,
        debug: false,
        appId: 'wx1b0ae914875f576f',
        timestamp: mytimestamp,
        nonceStr: mynonceStr,
        signature: MySha1(mysignature),
        jsApiList: [
          'scanQRCode',
          'chooseImage'
        ]
      })
      wx.error(function (res) {
        console.log('config失败---')
      })
      wx.ready(function () {
      })
    },
    getAccessToken () {
      send({
        name: '/getAccessToken',
        method: 'GET',
        data: {
        }
      }).then(_res => {
        switch (_res.data.expiresIn) {
          case 1:
            Toast.fail({
              duration: 1500,
              forbidClick: true,
              message: _res.data.message
            })
            break
          case 0:
            this.getTicket(_res.data.accessToken)
            break
          default:
            Toast.fail('Interface error！')
        }
      }).catch((res) => {
        Toast.fail('Interface error accseeToken！')
      })
    },
    getTicket (acessToken) {
      send({
        name: '/getJSApiTicket?acess_token=' + acessToken,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        switch (_res.data.errcode) {
          case 1:
            Toast.fail({
              duration: 1500,
              forbidClick: true,
              message: _res.data.message
            })
            break
          case 0:
            this.ConfigFn(_res.data.ticket)
            break
          default:
            Toast.fail('Interface error！')
        }
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    },
    // 6个列表
    getSelectList () {
      ['jicaiList', 'fengbianList', 'lashouList', 'wenluList', 'zaoxingList'].map((PROPERTY) => {
        send({
          name: '/' + PROPERTY,
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
              break
            case 1:
              let temp = []
              _res.data[PROPERTY].map((item) => {
                temp.push(item.fname)
              })
              this.updateSelectList({'property': PROPERTY, 'data': temp})
              break
            default:
              Toast.fail('Interface error！')
          }
        }).catch((res) => {
          Toast.fail('Interface error！')
        })
      })
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.van-nav-bar{
  background: cadetblue !important;
  color: #fff;
}
</style>
