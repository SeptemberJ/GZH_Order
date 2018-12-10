<template>
  <div class="Sign">
    <van-nav-bar
      title="注册"
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
        v-model="userName"
        required
        clearable
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="company"
        required
        clearable
        label="公司名称"
        placeholder="请输入公司名称"
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
    <van-button class="MarginT_40 loginBt" size="large" :loading='loading' round @click="Sign">注册</van-button>
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
      userName: '',
      company: '',
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
      'changeCurTab',
      'toggleSpinner'
    ]),
    BackLogin () {
      this.$router.push({name: 'Login'})
    },
    Sign () {
      if (this.company.trim() === '' || this.phoneNumber.trim() === '' || this.userName.trim() === '' || this.password.trim() === '') {
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
      this.toggleSpinner(true)
      send({
        name: '/userInsert?mobile=' + this.phoneNumber + '&fpassword=' + this.passwordAgain + '&user_name=' + this.userName + '&company_name=' + this.company,
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
            this.toggleSpinner(false)
            break
          case 1:
            Toast.success('注册成功！')
            this.loading = false
            this.toggleSpinner(false)
            this.$router.push({name: 'Login'})
            break
          default:
            Toast.fail({
              duration: 1500,
              forbidClick: true,
              message: _res.data.message
            })
            this.loading = false
            this.toggleSpinner(false)
        }
      }).catch((res) => {
        Toast.fail('Interface error！')
        this.loading = false
        this.toggleSpinner(false)
      })
    }
  }
}
</script>

<style>
.Sign{
  padding: 0px 20px;
}
.loginBt{
  background: cadetblue !important;
  color: #fff;
  height: 40px !important;
  line-height: 39px !important;
}
.van-field__control{
  text-align: right !important;
}
</style>
