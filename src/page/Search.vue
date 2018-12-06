<template>
  <div class="Search">
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import {send} from '../util/send'
import { Toast } from 'vant'
export default {
  name: 'Search',
  data () {
    return {
      keyword: ''
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
    }
  }
}
</script>

<style scoped>
.Search{
  padding: 10px;
}
</style>
