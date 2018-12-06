<template>
  <div class="My">
    <!-- <h3>{{userName}}</h3>
    <van-button round @click='ModifyPsd'>修改密码</van-button> -->
    <van-cell title="姓名" :value="userName">
      <van-icon slot="right-icon" name="edit" class="custom-icon PaddingL_10 MarginT_5" @click="edit('name')"/>
    </van-cell>
    <van-cell title="手机号" :value="userPhone">
      <van-icon slot="right-icon" name="edit" class="custom-icon PaddingL_10 MarginT_5" @click="edit('phone')"/>
    </van-cell>
    <van-cell title="公司名称" :value="company">
      <van-icon slot="right-icon" name="edit" class="custom-icon PaddingL_10 MarginT_5" @click="edit('company')"/>
    </van-cell>
    <van-cell title="修改密码">
      <van-icon slot="right-icon" name="edit" class="custom-icon PaddingL_10 MarginT_5" @click="edit('password')"/>
    </van-cell>
    <van-button type="danger" size="large" class="MarginT_40" @click="LoginOut">退出登陆</van-button>
    <van-dialog
      v-model="ifEdit"
      show-cancel-button
      :before-close="beforeClose"
    >
      <h4>信息修改</h4>
      <van-field v-if="editTpye == 'name'"
        v-model="newName"
        label="姓名"
        placeholder="请输入新的姓名"
      />
      <van-field v-if="editTpye == 'phone'"
        v-model="newPhone"
        label="手机号"
        placeholder="请输入新的手机号"
      />
      <van-field v-if="editTpye == 'company'"
        v-model="newCompany"
        label="公司名称"
        placeholder="请输入新的公司名称"
      />
      <!-- psd -->
      <van-field v-if="editTpye == 'password'"
        v-model="userPhone"
        type="tel"
        clearable
        label="手机号"
        disabled
      />
      <van-field v-if="editTpye == 'password'"
        v-model="oldPassword"
        type="password"
        label="旧密码"
        placeholder="请输入旧密码"
      />

      <van-field v-if="editTpye == 'password'"
        v-model="password"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
      />

      <van-field v-if="editTpye == 'password'"
        v-model="passwordAgain"
        type="password"
        label="确认密码"
        placeholder="请再次输入新密码"
      />
    </van-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../util/send'
import { Dialog, Toast } from 'vant'
export default {
  name: 'My',
  data () {
    return {
      ifEdit: false,
      editTpye: '',
      newName: '',
      newPhone: '',
      newCompany: '',
      oldPassword: '',
      password: '',
      passwordAgain: ''
    }
  },
  create () {
    alert('app---------------')
  },
  computed: {
    ...mapState({
      userName: state => state.userName,
      userPhone: state => state.userPhone,
      company: state => state.company
    })
  },
  methods: {
    ...mapActions([
      'changeCurTab',
      'changeCurPageName',
      'changeUserName',
      'changeUserPhone',
      'changeCompany'
    ]),
    ModifyPsd () {
      this.$router.push({name: 'ModifyPsd'})
      this.changeCurPageName('ModifyPsd')
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (this.newPhone.trim() === '' || this.newName.trim() === '' || this.newCompany.trim() === '') {
          Toast.fail({
            duration: 1500,
            forbidClick: true,
            message: '修改失败，信息不完整！'
          })
          done()
          return false
        }
        send({
          name: '/updateUser?id=' + this.$store.state.userId + '&mobile=' + this.newPhone + '&user_name=' + this.newName + '&company_name=' + this.newCompany,
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
              done()
              break
            case 1:
              this.changeUserName(this.newName)
              this.changeUserPhone(this.newPhone)
              this.changeCompany(this.newCompany)
              Toast.success('修改成功！')
              done()
              break
            default:
              Toast.fail({
                duration: 1500,
                forbidClick: true,
                message: _res.data.message
              })
              done()
          }
        }).catch((res) => {
          console.log(res)
          Toast.fail('Interface error！')
          done()
        })
      } else {
        done()
      }
    },
    edit (TYPE) {
      this.ifEdit = true
      this.editTpye = TYPE
      this.newName = this.userName
      this.newPhone = this.userPhone
      this.newCompany = this.company
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
      if (this.oldPassword.trim() === '') {
        Toast({
          duration: 1500,
          forbidClick: true,
          position: 'bottom',
          message: '请输入旧密码!'
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
        name: '/backFpassword?mobile=' + this.userPhone + '&fpasswordNew=' + this.passwordAgain + '&fpasswordOld=' + this.oldPassword,
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
    },
    LoginOut () {
      Dialog.confirm({
        title: '提示',
        message: '确认退出当前账号？'
      }).then(() => {
        this.$router.push({name: 'Login'})
        this.changeCurTab(-1)
        this.changeCurPageName('Login')
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style scoped>
.My{
  padding: 20px;
}
</style>
