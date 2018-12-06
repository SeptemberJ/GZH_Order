<template>
  <div class="Sign">
    <van-nav-bar
      title="忘记密码"
      left-text=""
      right-text=""
      left-arrow
      @click-left="BackLogin"
    />
    <!-- <van-cell-group> -->
      <van-field
        v-model="phoneNumber"
        type="tel"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />

      <van-field
        v-model="passwordAgain"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        required
      />
    <!-- </van-cell-group> -->
    <van-button class="MarginT_40 loginBt" size="large" :loading='loading' round @click="Save">保存</van-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {send} from '../util/send'
import { Toast } from 'vant'
export default {
  name: 'Sign',
  data () {
    return {
      loading: false,
      phoneNumber: '',
      password: '',
      passwordAgain: ''
    }
  },
  created () {
  },
  computed: {
    // ...mapState({
    //   register_id: state => state.register_id
    // })
  },
  methods: {
    ...mapActions([
      'changeCurPageName',
      'changeCurTab'
    ]),
    BackLogin () {
      this.$router.push({name: 'Login'})
    },
    Save () {
      if (this.phoneNumber.trim() === '' || this.password.trim() === '') {
        Toast({
          duration: 1500,
          forbidClick: true,
          position: 'bottom',
          message: '请将信息填写完整!'
        })
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.phoneNumber.trim()))) {
        Toast({
          duration: 1500,
          forbidClick: true,
          position: 'bottom',
          message: '手机号格式不正确!'
        })
        return false
      }
      if (this.passwordAgain !== this.password) {
        Toast({
          duration: 1500,
          forbidClick: true,
          position: 'bottom',
          message: '两次输入的密码不一致!'
        })
        return false
      }
      this.loading = true
      send({
        name: '/backFpasswordByMobile?mobile=' + this.phoneNumber + '&fpasswordNew=' + this.passwordAgain,
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
            Toast.success('修改成功！')
            this.loading = false
            this.$router.push({name: 'Login'})
            break
          default:
            Toast.fail({
              duration: 1500,
              forbidClick: true,
              message: _res.data.message
            })
            this.loading = false
        }
      }).catch((res) => {
        Toast.fail('Interface error！')
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.Sign{
  padding: 0px 20px;
}
.loginBt{
  background: cadetblue !important;
  color: #fff;
  height: 40px !important;
  line-height: 39px !important;
}
</style>
