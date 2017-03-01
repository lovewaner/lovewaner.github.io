<template lang="html">
    <div class="header">
        <div class="content-warpper">
            <div class="avatar">
                <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="description">
                    {{  seller.description + ' / ' + seller.deliveryTime + '分钟送达'}}
                </div>
                <div class="supports">
                    <div class="supports_desc">
                        <span class="icon" :class="iconClassMap[0]"></span>
                        <!--<span>{{ seller.supports[0].description }}</span>-->
                        <span>在线支付满28减5</span>
                    </div>
                </div>
            </div>
            <div class="supports-count" @click='methShowDetail()'>
                <!--<span class="count">{{ seller.supports.length + '个' }}</span>-->
                <span class="count">5个</span>
                <svg class="icon icon_keyboard_arrow_right" aria-hidden="true">
                    <use xlink:href="#icon-jiantouyou"></use>
                </svg>
            </div>
        </div>
        <div class="bulletin-wrapper" @click='methShowDetail()'>
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{ seller.bulletin }}</span>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="background" width="100%" height="100%">
        </div>
        <transition name='fade'>
            <div class="detail" v-if='showDetails'>
                <div class="detail-wrapper">
                    <div class="detail-main">
                        <h1 class="name">{{ seller.name }}</h1>
                        <div class="star-warpper">
                            <star :size='48' :score='seller.score'></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports">
                            <li class="supports-item" v-for='item in seller.supports'>
                                <span class="icon" :class='iconClassMap[item.type]'></span>
                                <span class="text">{{ item.description }}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商品公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">{{ seller.bulletin}}</div>
                    </div>
                </div>
                <div class="detail-close" >
                    <svg class="icon icon-close" aria-hidden="true" @click='showDetails = false'>
                        <use xlink:href="#icon-guanbi"></use>
                    </svg>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../../components/star/star'
export default{
    props: {
        seller: {
            type: Object
        }
    },
    data(){
        return {
            showDetails:false
        }
    },
    created(){
        this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
        star
    },
    methods:{
        methShowDetail(){
            console.log(this.seller.supports[0].description)
            this.showDetails = true
        }
    }
}
</script>

