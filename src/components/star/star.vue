<template>
    <div class="star" :class='starType'>
        <span class="star-item" :class='itemClass' v-for='itemClass in itemClasses' track-by='$index'></span>
    </div>
</template>

<script>
    const LENGTH = 5
    const ClS_ON = 'on'
    const ClS_HALF = 'half'
    const ClS_OFF = 'off'

    export default{
        props : {
            size : {
                type : Number
            },
            score: {
                type : Number
            }
        },
        computed: {
            starType(){
                return 'star-' + this.size
            },
            itemClasses(){
                let result = []
                let score = Math.floor(this.score * 2) / 2
                let hasDecimal = score % 1 !== 0
                let integer = Math.floor(this.score)
                for(let i = 0;i < integer; i++){
                    result.push(ClS_ON)
                }
                if(hasDecimal) {
                    result.push(ClS_HALF)
                }
                if(result.length < LENGTH){
                    result.push(ClS_OFF)
                }
                return result
            }
        }
    }
</script>
