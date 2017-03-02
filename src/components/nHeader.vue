<template>
    <div>
        <header>
            <h1>
                记事本
                <a class="t-btn" @click='showLeftToggle'><span></span></a>
            </h1>
        </header>
    </div>
</template>

<script>
export default{
    methods:{
        showLeftToggle(){
            this.$emit('tools')
        }
    }
}
</script>

<style lang="less" scoped rel="stylesheet/less">
div{
    header{
        width:100%;
        height:70px;
        background: #00a2ff;
        h1{
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            line-height: 70px;
            text-align: center;
            color: #fff;
            font-size: 30px;
            letter-spacing: 2px;
            font-weight: 700;
            a.t-btn{
                position: absolute;
                right:10px;
                top:22px;
                width:30px;
                height:26px;
                cursor: pointer;
            }
            span,span:before,span:after{
                position: absolute;
                left:0;
                width:30px;
                height:4px;
                content: '';
                background: #fff;
            }
            span{
                top:11px;
                &:before{
                    top:0;
                    transform: translateY(-7px);
                    transition: all .3s;
                }
                &:after{
                    transform: translateY(7px);
                    transition: all .3s;
                }
            }
        }
    }
}
</style>