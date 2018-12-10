<template>
<div>
  <!-- navbar -->
  <van-nav-bar
    title="订单详情"
    left-text=""
    right-text=""
    left-arrow
    @click-left="Back"
  />
  <div style="width:100%;height:15px;background:#efefef;"></div>

  <div class="Order">
    <div class="stepOne">
      <p class="TextAlign_L">★★★特别提示（Special Note）:</p>
      <p class="TextAlign_L PaddingL_10 SmallSize ColorR">请贵司认真录入订单，具体细节以订单为准</p>
      <van-cell-group class="TextAlign_L">
        <van-field
          v-model="Booking_name"
          required
          :disabled="orderStatus != 0"
          label="下单人"
          placeholder="请输入下单人姓名"
        />
        <van-field
          v-model="Contact_phone"
          required
          :disabled="orderStatus != 0"
          label="联系人手机号"
          placeholder="请输入联系人手机号"
        />
      </van-cell-group>
      <!-- basic infomation -->
      <van-cell-group>
        <van-field
          v-model="Consignee_name"
          required
          :disabled="orderStatus != 0"
          label="收货人"
          placeholder="请输入收货人姓名"
        />
        <van-field
          v-model="Consignee_phone"
          required
          :disabled="orderStatus != 0"
          label="收货人电话"
          placeholder="请输入收货人电话"
        />
        <van-field
          v-model="Consignee_address"
          required
          :disabled="orderStatus != 0"
          label="收货地址"
          placeholder="请输入收货地址"
        />
        <van-field
          v-model="backpass"
          required
          :disabled="orderStatus != 0"
          label="选择回传方式"
          icon="arrow"
          @click-icon="showWayAction()"
        />
        <van-field
          v-model="backAccount"
          required
          :disabled="orderStatus != 0"
          label="回传账号"
          placeholder="请输入回传账号"
        />
        <van-field
          v-model="customerName"
          required
          :disabled="orderStatus != 0"
          label="客户名称"
          placeholder="格式：地区+姓名"
        />
        <van-field
          v-model="orderName"
          required
          :disabled="orderStatus != 0"
          label="订单名称"
          placeholder="请输入终端安装地址"
        />
      </van-cell-group>
    </div>
    <!-- start write order infomation -->
    <div class="stepOne">
      <!-- cardTab -->
      <van-tabs @click="tabClick">
        <!-- 吊柜 -->
        <van-tab title="吊柜">
          <van-row class="WallCupboard MarginT_20 SmallSize_14" style="height: 50px;">
            <van-col span="12">
              <van-field
                v-model="WallCupboard.basic.baseMaterial"
                required
                disabled
                label="基材"
                icon="arrow"
                @click-icon="showSelectListAction(0, 'jicaiList', 'baseMaterial')"
              />
            </van-col>
            <van-col span="12">
              <van-field
                v-model="WallCupboard.basic.model"
                required
                disabled
                label="型号"
                icon="arrow"
                @click-icon="showSelectListAction(0, 'xinghaoList', 'model')"
              />
            </van-col>
          </van-row>
          <van-row class="WallCupboard SmallSize_14" style="height: 50px;">
            <van-col span="12">
              <van-field
                v-model="WallCupboard.basic.modelling"
                required
                disabled
                label="造型"
                icon="arrow"
                @click-icon="showSelectListAction(0, 'zaoxingList', 'modelling')"
              />
            </van-col>
            <van-col span="12">
              <van-field
                v-model="WallCupboard.basic.handle"
                required
                disabled
                label="拉手"
                icon="arrow"
                @click-icon="showSelectListAction(0, 'lashouList', 'handle')"
              />
            </van-col>
          </van-row>
          <van-row class="WallCupboard SmallSize_14" style="height: 50px;">
            <van-col span="12">
              <van-field
                v-model="WallCupboard.basic.lines"
                required
                disabled
                label="纹路"
                icon="arrow"
                @click-icon="showSelectListAction(0, 'wenluList', 'lines')"
              />
            </van-col>
            <van-col span="12">
              <van-field
                v-model="WallCupboard.basic.edgeSealing"
                required
                disabled
                label="封边"
                icon="arrow"
                @click-icon="showSelectListAction(0, 'fengbianList', 'edgeSealing')"
              />
            </van-col>
          </van-row>
          <van-row class="MarginT_20 SmallSize_12 FontBold" style="height: 50px;border-top: 1px solid #000;border-bottom: 1px solid #000;">
            <van-col class="column" span="2">序号</van-col>
            <van-col class="column" span="3">高度</van-col>
            <van-col class="column" span="3">宽度</van-col>
            <van-col class="column" span="3">厚度</van-col>
            <van-col class="column" span="3">数量</van-col>
            <van-col class="column" span="2">开门方向</van-col>
            <van-col class="column" span="3">拉手孔槽</van-col>
            <van-col class="column" span="5">工艺要求</van-col>
          </van-row>
          <van-row v-for="(itemW, idxW) in WallCupboard.items" :key="idxW" class="WallCupboardItem SmallSize_14" style="height: 50px;border-top: 0px solid #000;border-bottom: 1px solid #000;">
            <van-col class="column" span="2">{{idxW + 1}}</van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.height" type="number"/>
            </van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.width" type="number"/>
            </van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.thickness" type="number"/>
            </van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.amount" type="number"/>
            </van-col>
            <van-col class="column" span="2">
              <van-field :disabled="orderStatus != 0" v-model="itemW.doorDirection" /></van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.handle" /></van-col>
            <van-col class="column" span="5">
              <van-field :disabled="orderStatus != 0" v-model="itemW.requirement" autosize  type="textarea" rows="1" style="height: 49px;overflow:hidden"/></van-col>
          </van-row>
          <van-button v-if="orderStatus == 0" size="large" class="MarginT_20" plain type="primary" @click="addWallCupboardItem"><span>添加一条</span></van-button>
        </van-tab>
        <!-- 地柜 -->
        <van-tab title="地柜">
          <van-row class="FloorCabinet MarginT_20 SmallSize_14" style="height: 50px;">
            <van-col span="12">
              <van-field
                v-model="FloorCabinet.basic.baseMaterial"
                required
                disabled
                label="基材"
                icon="arrow"
                @click-icon="showSelectListAction(1, 'jicaiList', 'baseMaterial')"
              />
            </van-col>
            <van-col span="12">
              <van-field
                v-model="FloorCabinet.basic.model"
                required
                disabled
                label="型号"
                icon="arrow"
                @click-icon="showSelectListAction(1, 'xinghaoList', 'model')"
              />
            </van-col>
          </van-row>
          <van-row class="FloorCabinet SmallSize_14" style="height: 50px;">
            <van-col span="12">
              <van-field
                v-model="FloorCabinet.basic.modelling"
                required
                disabled
                label="造型"
                icon="arrow"
                @click-icon="showSelectListAction(1, 'zaoxingList', 'modelling')"
              />
            </van-col>
            <van-col span="12">
              <van-field
                v-model="FloorCabinet.basic.handle"
                required
                disabled
                label="拉手"
                icon="arrow"
                @click-icon="showSelectListAction(1, 'lashouList', 'handle')"
              />
            </van-col>
          </van-row>
          <van-row class="FloorCabinet SmallSize_14" style="height: 50px;">
            <van-col span="12">
              <van-field
                v-model="FloorCabinet.basic.lines"
                required
                disabled
                label="纹路"
                icon="arrow"
                @click-icon="showSelectListAction(1, 'wenluList', 'lines')"
              />
            </van-col>
            <van-col span="12">
              <van-field
                v-model="FloorCabinet.basic.edgeSealing"
                required
                disabled
                label="封边"
                icon="arrow"
                @click-icon="showSelectListAction(1, 'fengbianList', 'edgeSealing')"
              />
            </van-col>
          </van-row>
          <van-row class="MarginT_20 SmallSize_12 FontBold" style="height: 50px;border-top: 1px solid #000;border-bottom: 1px solid #000;">
            <van-col class="column" span="2">序号</van-col>
            <van-col class="column" span="3">高度</van-col>
            <van-col class="column" span="3">宽度</van-col>
            <van-col class="column" span="3">厚度</van-col>
            <van-col class="column" span="3">数量</van-col>
            <van-col class="column" span="2">开门方向</van-col>
            <van-col class="column" span="3">拉手孔槽</van-col>
            <van-col class="column" span="5">工艺要求</van-col>
          </van-row>
          <van-row v-for="(itemW, idxW) in FloorCabinet.items" :key="idxW" class="FloorCabinetItem SmallSize_14" style="height: 50px;border-top: 0px solid #000;border-bottom: 1px solid #000;">
            <van-col class="column" span="2">{{idxW + 1}}</van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.height" type="number"/>
            </van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.width" type="number"/>
            </van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.thickness" type="number"/>
            </van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.amount" type="number"/>
            </van-col>
            <van-col class="column" span="2">
              <van-field :disabled="orderStatus != 0" v-model="itemW.doorDirection" /></van-col>
            <van-col class="column" span="3">
              <van-field :disabled="orderStatus != 0" v-model="itemW.handle" /></van-col>
            <van-col class="column" span="5">
              <van-field :disabled="orderStatus != 0" v-model="itemW.requirement" autosize  type="textarea" rows="1" style="height: 49px;overflow:hidden"/></van-col>
          </van-row>
          <van-button v-if="orderStatus == 0" size="large" class="MarginT_20" plain type="primary" @click="addFloorCabinetItem"><span>添加一条</span></van-button>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  <!-- actionsheet -->
  <van-actionsheet
    v-model="showWay"
    :actions="BackWayActions"
    @select="onSelectBackWay"
  />
  <!--  -->
  <van-popup v-model="showSelctList" position="bottom" :overlay="true">
    <van-picker
      show-toolbar
      title="请选择"
      :columns="selectList"
      @cancel="onCancel"
      @confirm="changeSelect"
    />
  </van-popup>
  <van-row>
    <van-col v-if="orderStatus == 0" span="12"><van-button style="border-radius: 0;background:#666;border: 1px solid #666;" size="large" type="danger" class="MarginT_40" @click="deleteOrder">删除</van-button></van-col>
    <van-col v-if="orderStatus == 0" span="12"><van-button style="border-radius: 0;" size="large" type="danger" class="MarginT_40" @click="ModifyOrder">保存</van-button></van-col>
    <van-col v-if="orderStatus == 1" span="24" style="position:fixed;left:0;bottom:0;"><van-button style="border-radius: 0;" size="large" type="danger" class="MarginT_40">该订单已通过审核不能经行修改</van-button></van-col>
  </van-row>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../util/send'
import { Toast, Dialog } from 'vant'
export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      Booking_name: '',
      Contact_phone: '',
      Consignee_name: '',
      Consignee_phone: '',
      Consignee_address: '',
      backpass: '',
      backAccount: '',
      customerName: '',
      orderName: '',
      showWay: false,
      showSelctList: false,
      selectList: [],
      basicProperty: '',
      basicKind: 0,
      selectKind: '',
      orderStatus: 0,
      BackWayActions: [
        {
          name: 'QQ'
        },
        {
          name: '微信'
        },
        {
          name: '传真'
        }
      ],
      WallCupboard: {
        basic: {
          model: '请选择',
          modelling: '请选择',
          handle: '请选择',
          baseMaterial: '请选择',
          lines: '请选择',
          edgeSealing: '请选择',
          select_type: 1
        },
        items: [{'height': '', 'width': '', 'thickness': '', 'amount': '', 'doorDirection': '', 'handle': '', 'requirement': '', 'select_type': 1}]
      },
      FloorCabinet: {
        basic: {
          model: '请选择',
          modelling: '请选择',
          handle: '请选择',
          baseMaterial: '请选择',
          lines: '请选择',
          edgeSealing: '请选择',
          select_type: 2
        },
        items: [{'height': '', 'width': '', 'thickness': '', 'amount': '', 'doorDirection': '', 'handle': '', 'requirement': '', 'select_type': 2}]
      }
    }
  },
  created () {
    this.initOrder()
  },
  computed: {
    ...mapState({
      role: state => state.role,
      spinner: state => state.spinner
    })
  },
  methods: {
    ...mapActions([
      'updateSelectList',
      'changeCurPageName',
      'toggleSpinner',
      'changeCurTab'
    ]),
    Back () {
      this.changeCurPageName('Search')
      this.$router.push({name: 'Search'})
    },
    showWayAction () {
      if (this.orderStatus === '0') {
        this.showWay = true
      }
    },
    showSelectListAction (TYPE, KIND, PROPERTY) {
      if (this.orderStatus === '0') {
        if (KIND === 'xinghaoList') {
          if (this.$store.state[KIND].length === 0) {
            Toast.fail({
              duration: 1500,
              forbidClick: true,
              message: '请先选择基材!'
            })
            return false
          }
        }
        this.selectList = this.$store.state[KIND]
        this.showSelctList = true
        this.selectKind = KIND
        this.basicKind = TYPE
        this.basicProperty = PROPERTY
      }
    },
    onSelectBackWay (item) {
      this.showWay = false
      this.backpass = item.name
    },
    changeSelect (item) {
      this.showSelctList = false
      if (this.basicKind === 0) {
        this.WallCupboard.basic[this.basicProperty] = item
        // 获取型号list
        if (this.selectKind === 'jicaiList') {
          send({
            name: '/xinghaoList?fname=' + this.WallCupboard.basic.baseMaterial,
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
                _res.data.xinghaoList.map((item) => {
                  temp.push(item.fname)
                })
                this.updateSelectList({'property': 'xinghaoList', 'data': temp})
                this.WallCupboard.basic.model = '请选择'
                break
              default:
                Toast.fail('Interface error！')
            }
          }).catch((res) => {
            Toast.fail('Interface error！')
          })
        }
      } else {
        this.FloorCabinet.basic[this.basicProperty] = item
        // 获取型号list
        if (this.selectKind === 'jicaiList') {
          send({
            name: '/xinghaoList?fname=' + this.FloorCabinet.basic.baseMaterial,
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
                _res.data.xinghaoList.map((item) => {
                  temp.push(item.fname)
                })
                this.updateSelectList({'property': 'xinghaoList', 'data': temp})
                this.FloorCabinet.basic.model = '请选择'
                break
              default:
                Toast.fail('Interface error！')
            }
          }).catch((res) => {
            Toast.fail('Interface error！')
          })
        }
      }
    },
    onCancel () {
      this.showSelctList = false
    },
    // 添加一条吊柜信息
    addWallCupboardItem () {
      this.WallCupboard.items.push({'height': '', 'width': '', 'thickness': '', 'amount': '', 'doorDirection': '', 'handle': '', 'requirement': '', 'select_type': 1})
    },
    // 添加一条地柜信息
    addFloorCabinetItem () {
      this.FloorCabinet.items.push({'height': '', 'width': '', 'thickness': '', 'amount': '', 'doorDirection': '', 'handle': '', 'requirement': '', 'select_type': 2})
    },
    async ModifyOrder () {
      // 未审核的不能提交订单
      if (this.role === '1') {
        Toast.fail({
          duration: 2000,
          forbidClick: true,
          message: '您的账号还未通过审核，暂时还不能提交订单!'
        })
        // Toast({
        //   duration: 1500,
        //   forbidClick: true,
        //   message: '您的账号还未通过审核，暂时还不能提交订单！'
        // })
        return false
      } else {
        const WallCupboardItems = await this.filterNull(this.WallCupboard.items)
        const FloorCabinetItems = await this.filterNull(this.FloorCabinet.items)
        // 吊柜地柜需有一个
        if (WallCupboardItems.length === 0 && FloorCabinetItems.length === 0) {
          Toast.fail({
            duration: 1500,
            forbidClick: true,
            message: '请将至少添加一条吊柜或地柜信息!'
          })
          return false
        }
        if (WallCupboardItems.length > 0) {
          // 为空验证
          for (let key in this.WallCupboard.basic) {
            if (this.WallCupboard.basic[key] === '请选择') {
              Toast.fail({
                duration: 1500,
                forbidClick: true,
                message: '请选择吊柜信息!'
              })
              return false
            }
          }
          for (let i = 0; i < WallCupboardItems.length; i++) {
            for (let key in WallCupboardItems[i]) {
              if (WallCupboardItems[i][key] === '') {
                Toast({
                  duration: 1500,
                  forbidClick: true,
                  message: '请将吊柜每条的信息填写完整!'
                })
                return false
              }
            }
          }
        }
        if (FloorCabinetItems.length > 0) {
          // 为空验证
          for (let key in this.FloorCabinet.basic) {
            if (this.FloorCabinet.basic[key] === '请选择') {
              Toast.fail({
                duration: 1500,
                forbidClick: true,
                message: '请选择地柜信息!'
              })
              return false
            }
          }
          for (let i = 0; i < FloorCabinetItems.length; i++) {
            for (let key in FloorCabinetItems[i]) {
              if (FloorCabinetItems[i][key] === '') {
                Toast({
                  duration: 1500,
                  forbidClick: true,
                  message: '请将吊柜每条的信息填写完整!'
                })
                return false
              }
            }
          }
        }
        let WallCupboardBasicInfo = {
          'xinghao': this.WallCupboard.basic.model,
          'zaoxing': this.WallCupboard.basic.modelling,
          'lashou': this.WallCupboard.basic.handle,
          'jicai': this.WallCupboard.basic.baseMaterial,
          'wenlu': this.WallCupboard.basic.lines,
          'fengbian': this.WallCupboard.basic.edgeSealing,
          'select_type': this.WallCupboard.basic.select_type
        }
        let FloorCabinetBasicInfo = {
          'xinghao': this.FloorCabinet.basic.model,
          'zaoxing': this.FloorCabinet.basic.modelling,
          'lashou': this.FloorCabinet.basic.handle,
          'jicai': this.FloorCabinet.basic.baseMaterial,
          'wenlu': this.FloorCabinet.basic.lines,
          'fengbian': this.FloorCabinet.basic.edgeSealing,
          'select_type': this.FloorCabinet.basic.select_type
        }
        send({
          name: '/updateOrder',
          method: 'POST',
          data: {
            'order': {
              'id': this.$route.params.id,
              'xdr_name': this.Booking_name,
              'xdr_telephone': this.Contact_phone,
              'shr_name': this.Consignee_name,
              'shr_telephone': this.Consignee_phone,
              'xd_type': this.backpass,
              'xd_contact': this.backAccount,
              'kh_name': this.customerName,
              'order_name': this.orderName,
              'faddress': this.Consignee_address,
              'user_id': this.$store.state.userId,
              'orderSelectlist': (WallCupboardBasicInfo['xinghao'] !== '请选择' && FloorCabinetBasicInfo['xinghao'] === '请选择') ? [WallCupboardBasicInfo] : ((WallCupboardBasicInfo['xinghao'] === '请选择' && FloorCabinetBasicInfo['xinghao'] !== '请选择') ? [FloorCabinetBasicInfo] : [WallCupboardBasicInfo, FloorCabinetBasicInfo]),
              'orderentrylist': WallCupboardItems.concat(FloorCabinetItems)
            }
          }
        }).then(_res => {
          switch (_res.data.code) {
            case 1:
              Toast.fail({
                duration: 1500,
                forbidClick: true,
                message: _res.data.message
              })
              break
            case 0:
              Toast.success('修改成功！')
              this.Back()
              break
            default:
              Toast.fail('Interface error！')
          }
        }).catch((res) => {
          Toast.fail('Interface error！')
        })
      }
    },
    deleteOrder () {
      // this.toggleSpinner(true)
      Dialog.confirm({
        title: '标题',
        message: '确认删除该订单？'
      }).then(() => {
        // on confirm
        this.toggleSpinner(true)
        send({
          name: '/delOrder?orderid=' + this.$route.params.id,
          method: 'DELETE',
          data: {
          }
        }).then(_res => {
          switch (_res.data.code) {
            case 1:
              Toast.fail({
                duration: 1500,
                forbidClick: true,
                message: _res.data.message
              })
              this.toggleSpinner(false)
              break
            case 0:
              this.toggleSpinner(false)
              Toast.success({
                duration: 1000,
                forbidClick: true,
                message: '删除成功!'
              })
              this.$router.push({name: 'Search'})
              this.changeCurPageName('Search')
              this.changeCurTab(1)
              break
            default:
              console.log(_res)
              Toast.fail('Interface error！')
              this.toggleSpinner(false)
          }
        }).catch((res) => {
          console.log(res)
          Toast.fail('Interface error！')
          this.toggleSpinner(false)
        })
      }).catch(() => {
      // on cancel
      })
    },
    // 将空的排除
    filterNull (ITEMS) {
      let TempItems = []
      return new Promise((resolve, reject) => {
        ITEMS.map((item, idx) => {
          if (item.height === '' && item.width === '' && item.thickness === '' && item.amount === '' && item.doorDirection === '' && item.handle === '' && item.requirement === '') {
          } else {
            TempItems.push({
              'xuhao': idx + 1,
              'height': item.height,
              'width': item.width,
              'houdu': item.thickness,
              'fnumber': item.amount,
              'open_door': item.doorDirection,
              'lashou': item.handle,
              'require': item.requirement,
              'select_type': item.select_type
            })
          }
        })
        resolve(TempItems)
      })
    },
    // 初始化订单详情
    initOrder () {
      send({
        name: '/orderdetail?order_id=' + this.$route.params.id,
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
            let WallCupboardItems = []
            let FloorCabinetItems = []
            let OrderInfo = _res.data
            this.orderStatus = OrderInfo.order.fstatus
            if (OrderInfo.orderEntry1List.length > 0) {
              OrderInfo.orderEntry1List.map((item) => {
                WallCupboardItems.push({
                  'height': item.height,
                  'width': item.width,
                  'thickness': item.houdu,
                  'amount': item.fnumber,
                  'doorDirection': item.open_door,
                  'handle': item.lashou,
                  'requirement': item.require,
                  'select_type': 1
                })
              })
            }
            if (OrderInfo.orderEntry2List.length > 0) {
              OrderInfo.orderEntry2List.map((item) => {
                FloorCabinetItems.push({
                  'height': item.height,
                  'width': item.width,
                  'thickness': item.houdu,
                  'amount': item.fnumber,
                  'doorDirection': item.open_door,
                  'handle': item.lashou,
                  'requirement': item.require,
                  'select_type': 2
                })
              })
            }
            // 初始化订单信息
            this.Booking_name = OrderInfo.order.xdr_name
            this.Contact_phone = OrderInfo.order.xdr_telephone
            this.Consignee_name = OrderInfo.order.shr_name
            this.Consignee_phone = OrderInfo.order.shr_telephone
            this.Consignee_address = OrderInfo.order.faddress
            this.backpass = OrderInfo.order.xd_type
            this.backAccount = OrderInfo.order.xd_contact
            this.customerName = OrderInfo.order.kh_name
            this.orderName = OrderInfo.order.order_name
            this.showWay = false
            this.showSelctList = false
            this.selectList = []
            this.basicProperty = ''
            this.basicKind = 0
            this.selectKind = ''
            this.WallCupboard = {
              basic: {
                model: OrderInfo.orderSelect1 ? OrderInfo.orderSelect1.xinghao : '请选择',
                modelling: OrderInfo.orderSelect1 ? OrderInfo.orderSelect1.zaoxing : '请选择',
                handle: OrderInfo.orderSelect1 ? OrderInfo.orderSelect1.lashou : '请选择',
                baseMaterial: OrderInfo.orderSelect1 ? OrderInfo.orderSelect1.jicai : '请选择',
                lines: OrderInfo.orderSelect1 ? OrderInfo.orderSelect1.wenlu : '请选择',
                edgeSealing: OrderInfo.orderSelect1 ? OrderInfo.orderSelect1.fengbian : '请选择',
                select_type: 1
              },
              items: WallCupboardItems
            }
            this.FloorCabinet = {
              basic: {
                model: OrderInfo.orderSelect2 ? OrderInfo.orderSelect2.xinghao : '请选择',
                modelling: OrderInfo.orderSelect2 ? OrderInfo.orderSelect2.zaoxing : '请选择',
                handle: OrderInfo.orderSelect2 ? OrderInfo.orderSelect2.lashou : '请选择',
                baseMaterial: OrderInfo.orderSelect2 ? OrderInfo.orderSelect2.jicai : '请选择',
                lines: OrderInfo.orderSelect2 ? OrderInfo.orderSelect2.wenlu : '请选择',
                edgeSealing: OrderInfo.orderSelect2 ? OrderInfo.orderSelect2.fengbian : '请选择',
                select_type: 2
              },
              items: FloorCabinetItems
            }
            this.initXinghaoList(0)
            break
          default:
            console.log()
            Toast.fail('Interface error！')
        }
      }).catch((res) => {
        console.log(res)
        Toast.fail('Interface error！')
      })
    },
    tabClick (tabIdx) {
      this.initXinghaoList(tabIdx)
    },
    // 初始化xinghaoList
    initXinghaoList (KIND) {
      send({
        name: '/xinghaoList?fname=' + (KIND === 0 ? this.WallCupboard.basic.baseMaterial : this.FloorCabinet.basic.baseMaterial),
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
            _res.data.xinghaoList.map((item) => {
              temp.push(item.fname)
            })
            this.updateSelectList({'property': 'xinghaoList', 'data': temp})
            // this.WallCupboard.basic.model = '请选择'
            break
          default:
            Toast.fail('Interface error！')
        }
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    }
  }
}
</script>

<style>
.Order{
  padding: 0px 10px;
  margin-bottom: 80px;
}
.stepOne input{
  text-align: right;
}
.van-cell__title{
  text-align: left !important;
}
/*.stepOne .van-cell__title{
  text-align: left !important;
  max-width: 40px !important;
}*/
.WallCupboard .van-field__control{
  text-align: right !important;
}
.WallCupboardItem .van-field__control{
  text-align: center !important;
}
.WallCupboardItem .van-cell{
  width: 95%;
  padding: 0;
}
.FloorCabinet .van-field__control{
  text-align: right !important;
}
.FloorCabinetItem .van-field__control{
  text-align: center !important;
}
.FloorCabinetItem .van-cell{
  width: 95%;
  padding: 0;
}
.column{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.column:not(:last-child){
  border-right: 1px solid #000;
}
.BorderBottomInput .van-cell__value{
  border-bottom: 1px solid #ccc;
 }
</style>
