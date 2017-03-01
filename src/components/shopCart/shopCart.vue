<template>
    <div>
        <div class="shopCart">
            <div class="content">
                <div class="content-left" @click='listToggle'>
                    <div class="logo-wrapper">
                        <div class="badge" v-show='totalCount'>
                            {{ totalCount }}
                        </div>
                        <div class="logo" :class="{'active':totalPrice}">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gouwuche"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="price" :class="{'active':totalPrice}">
                        ￥{{totalPrice}}
                    </div>
                    <div class="desc">
                        另需要配送费￥{{deliveryPrice}}元
                    </div>
                    
                </div>
                <div class="content-right" :class="{'active':totalPrice>=minPrice}">
                    {{ payDesc }}
                </div>
            </div>
            <transition name='transHeight'>
                <div class="shopCart-list" v-show='listShow' >
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click='clearList'>清空</span>
                    </div>
                    <div class="list-content" ref='foodlist'>
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <span class="name">{{ food.name }}</span>
                                <div class="price">
                                    <span>￥{{ food.price * food.count }}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food='food'></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition> 
        </div>
        <transition name="fade-backdrop">
            <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
        </transition>
    </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

    export default{
        props:{
            selectFoods:{
                type: Array,
                default: []
            },
            deliveryPrice :{
                type : Number,
                default : 0
            },
            minPrice : {
                type : Number,
                default : 0
            }
        },
        data(){
            return {
                listShow:false
            }
        },
        computed: {
            totalCount(){
                let count = 0
                this.selectFoods.forEach((food) =>{
                    count += food.count
                })
                return count
            },
            totalPrice(){
                let total = 0
                this.selectFoods.forEach((food) =>{
                    if(food.count){
                        total += food.count * food.price
                    }
                })
                return total
            },
            payDesc(){
                let difference = this.minPrice - this.totalPrice
                if(!this.totalPrice){
                    return `￥${this.minPrice}起送`
                }else if(difference > 0){
                    return `还差￥${difference}`
                }else{                    
                    return `去结算`
                }
            },
            showBackdrop(){
                if(this.listShow && this.totalPrice){
                    return true
                }
                this.listShow = false
                return false
            }
        },
        methods:{
            _initScroll() {
                this.foodListScroll = new BScroll(this.$refs.foodlist,{
                    click: true
                })
            },
            listToggle(){
                if(!this.selectFoods.length){
                    return false
                }
                this.listShow = !this.listShow
                if(this.listShow){
                    this.$nextTick(() =>{
                        if(!this.foodListScroll){
                            this._initScroll()
                        } else {
                            this.foodListScroll.refresh()
                        }
                    })
                }
            },
            hideBackdrop(){
                this.listShow = false
            },
            clearList(){
                this.selectFoods.forEach((food) =>{
                    food.count = 0
                })
            }
        },
        components:{
            cartcontrol
        }
    }
</script>