<template>
    <div class="goods">
        <div class="menu-wrapper" ref='menuWrapper'>
            <ul>
                <li v-for='(item,index) in goods' :class="index === menuCurrentIndex ? 'menu-item-selected' : 'menu-item'" @click='menuClick(index)'>
                    <span class="text">
                        {{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="food-wrapper" ref='foodsWrapper'>
            <ul>
                <li v-for='item in goods' class="food-list food-list-hook">
                    <h1> {{ item.name }} </h1>
                    <ul>
                        <li v-for='food in item.foods' class="food-item" @click='goDetail(food)'>
                            <div class="_icon">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2>{{ food.name }}</h2>
                                <p class="description" v-show="food.description">{{ food.description }}</p>
                                <div class="sell-info">
                                    <span class="sellCount">月售{{ food.sellCount }}份</span>
                                    <span class="rating">好评率{{ food.rating }}%</span>
                                </div>
                                <div class="price">
                                    <span class="newPrice">
                                        <span class="unit">￥</span>
                                        {{ food.price }}
                                    </span>
                                    <span class="oldPrice" v-show='food.oldPrice'>￥{{ food.oldPrice }}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food='food'></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopCart :selectFoods='selectFoods' :deliveryPrice="seller.deliveryPrice" :minPrice = "seller.minPrice"></shopCart>
        <foodDetail :food='selectedFood' v-if='selectedFood' ref='myFood'></foodDetail>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import shopCart from '../../components/shopCart/shopCart'
import foodDetail from '../../components/foodDetail/foodDetail'
import BScroll from 'better-scroll'

const ERR_OK = 0
const eventHub = new Vue()
export default {
    data(){
        return {
            goods:[],
            listHeight:[],
            foodsScrollY:0,
            selectedFood: ''
        }
    },
    props:{
        seller: Object
    },
    created(){
        axios.get('static/data.json').then((res) => {
            this.goods = res.data.goods
            this.$nextTick(() => {
                this._initScroll()
                this._calculateHeight()
            })
        })
    },
    computed: {
        menuCurrentIndex(){
            for(let i = 0,l = this.listHeight.length; i<l; i++){
                let topHeight = this.listHeight[i]
                let bottomHeight = this.listHeight[i+1]
                if(!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)){
                    return i
                }
            }
            return 0;
        },
        selectFoods(){
            let foods = []
            this.goods.forEach((good) =>{
                good.foods.forEach((food) =>{  
                    if(food.count){
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    methods:{
        _initScroll(){
            
            this.menuWrapper = new BScroll(this.$refs.menuWrapper,{
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            })
                      
            //监控滚动事件
            this.foodsScroll.on('scroll', (pos) => {
                this.foodsScrollY = Math.abs(Math.round(pos.y))
            })
              
        },
        _calculateHeight(){
            let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
            let height = 0
            this.listHeight.push(height)
            for (let i = 0, l = foodList.length; i < l; i++) {
                let item = foodList[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        menuClick(index){
            this.foodsScroll.scrollTo(0 ,-this.listHeight[index],200)
        },
        goDetail(food){
            this.selectedFood = food
            this.$nextTick(() => {
                this.$refs.myFood.showToggle()
            })
        }
    },
    components:{
        cartcontrol,
        shopCart,
        foodDetail
    }
}
</script>

<style scoped> 
.goods{
    display: flex;
    position: absolute;
    top: 175px;
    width: 100%;
    overflow: hidden;
}
.menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    margin-top: 2px;
}
.menu-item-selected{
    background: #fff;
    font-weight: 700;
    margin-top: -1px;
}
.menu-item-selected,.menu-item{
    position: relative;
    display: table;
    height: 54px;
    line-height: 14px;
    width: 56px;
    padding: 0 12px;
    text-align: center;
}
.text{
    display: block;
    font-size: 12px;
    margin-top: 20px;
}
.food-wrapper{
    flex:1;
    margin-top: 2px;
    height: 500px;
    overflow: hidden;
}
.food-list h1{
    height: 26px;
    line-height: 26px;
    padding-left: 12px;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
    border-left: 2px solid #d9dde1;
}
.food-item{
    position: relative;
    display: flex;
    margin: 0 18px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.food-item _icon{
    flex: 0 0 57px;
}
.food-item _icon img{
    background-size: 100% 100%;
}
.food-item:last-child{
    border: none;
}
.content{
    flex: 1;
    padding-left: 10px;
}
h2{
    margin: 2px 0 8px 0;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
}
.description{
    margin-bottom: 8px;
}
.sell-info,.description{
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 12px;
}
.sell-info .sellCount{
    margin-right: 4px;
}
.price{
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
}
.price .newPrice{
    font-size: 14px;
    color: rgb(240, 20, 20);
}
.unit{
    font-size: 12px;
    font-weight: normal;
}
.oldPrice{
    text-decoration: line-through;
    color: rgb(147, 153, 159);
    padding-left: 4px;
}
.cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 6px;
    z-index: 20;
}
</style>