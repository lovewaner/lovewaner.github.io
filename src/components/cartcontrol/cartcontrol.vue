<template>
    <div class="cartcontrol">
        <transition name='fadeRotate'>
            <div class="cart-decrease" @click.stop.prevent="decreaseCart()" v-show="food.count>0">
                <svg class="icon inner" aria-hidden="true">
                    <use xlink:href="#icon-henghao"></use>
                </svg>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">
            {{ food.count }}
        </div>
        <div class="cart-add" @click.stop.prevent='addCart($event)'>
            <svg class="icon icon-add" aria-hidden="true">
                <use xlink:href="#icon-anonymous-iconfont"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default{
    props:{
        food: Object
    },
    methods:{
        addCart(event){
            if(!this.food.count){
                Vue.set(this.food, 'count', 0)
            }
            this.food.count++
            this.$root.eventHub.$emit('cart.add', event.target)
        },
        decreaseCart() {
            if (!this.food.count) {
                return
            }
            this.food.count--;
        }
    }
}    
</script>
