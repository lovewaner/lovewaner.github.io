<template>
    <div class="ratingsWrapper" ref='ratingsWrapper'>
        <div class="ratings-content">
            <div class="info">
                <div class="mark">
                    <div class="num">
                        {{ seller.score }}
                    </div>
                    <div class="text">
                        综合评分
                    </div>
                    <div class="contrast">
                        高于周边商家{{ seller.rankRate }}%
                    </div>
                </div>
                <div class="stars">
                    <div class="serviceScore">
                        <div class="text">服务态度</div>
                        <star :size='36' :score='seller.serviceScore'></star>
                        <span class="num">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="foodScore">
                        <div class="text">服务态度</div>
                        <star :size='36' :score='seller.serviceScore'></star>
                        <span class="num">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="deliveryTime">
                        <span class="text">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="evaluation">
                <div class="title">
                    商品评价
                </div>
                <div class="classify">
                    <span v-for="(item,index) in classifyArr" class="item" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" @click="filterEvel(item)">
                        {{ item.name }}<span class="count">{{ item.count }}</span>
                    </span>
                </div>
                <div class="switch" @click="evelflag=!evelflag">
                    <svg class="icon switch-icon" :class="{'on':evelflag}" aria-hidden="true">
                        <use xlink:href="#icon-check1"></use>
                    </svg>
                    <span class="text">只看有内容的评价</span>
                </div>
                <div class="evel-list">
                    <ul>
                        <li class="evel" v-for='evel in evelArr'>
                            <div class="userInfo">
                                <div class="time">{{ evel.rateTime || time }}</div>
                                <div class="user">
                                    <span>{{ evel.username }}</span>
                                    <span class="avatar">
                                        <img :src="evel.avatar" width="12" height="12">
                                    </span>
                                </div>
                            </div>
                            <div class="content">
                                <svg class="icon _icon" :class="evel.rateType?'icon-thumb_down':'icon-thumb_up'">
                                    <use xlink:href="#icon-dianzan1"></use>
                                </svg>
                                <span class="text">{{evel.text}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import star from '../../components/star/star.vue'
import BScroll from 'better-scroll'

export default{
    data(){
        return{
            classifyArr:[{
                name:'全部',
                count:0,
                active:true
            },
            {
                name:'推荐',
                count:0,
                active:false
            },
            {
                name:'吐槽',
                count:0,
                active:false
            }],
            ratings: [],
            seller: {},
            evelflag:true
        }
    },
    components:{
        star
    },
    computed:{
        evelArr(){
            let selectIndex = 0
            this.classifyArr.forEach((data, index) => {
                if (data.active) {
                    selectIndex = index
                }
            })
            if (this.scroll) {
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            }
            return selectIndex ? this.ratings.filter((data) => this.evelflag ? data.rateType === selectIndex - 1 && data.text : data.rateType === selectIndex - 1) : this.ratings.filter((data) => this.evelflag ? data.text : true)
        }
    },
    methods:{
        _init() {
            axios.get('static/data.json').then((res) => {
                this.ratings = res.data.ratings
                this.seller = res.data.seller
                this._initClassifyArr()
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                        click: true
                    })
                })
            })
        },
        _initClassifyArr() {
            this.classifyArr.forEach((data, index) => {
                if (index) {
                    data.count = this.ratings.filter((temp) => temp.rateType === index - 1).length
                } else {
                    data.count = this.ratings.length
                }
            })
        },
        filterEvel(item) {
            this.classifyArr.forEach((data) => {
                data.active = false
            })
            item.active = true
        }
    },
    created(){
        this._init()
    }
}
</script>