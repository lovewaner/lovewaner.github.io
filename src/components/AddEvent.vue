<template>
    <div>
        <input type="text" v-model='content' placeholder="待办事项" @keyup.enter='submit'>
        <button @click='submit'>提交</button>
    </div>
</template> 

<script>
export default{
	data(){
		return{
			content:''
		}
	},
	methods:{
		submit(){
			let params = {
				id: 0,
				type: 1,
				content: '',
				time: ''
			}
			this.content = this.content.trim()			
			if(this.content){
				params.content = this.content
				this.$store.dispatch('addevent',params)
				this.content = ''
			}else {
				alert('请输入您的计划内容')
			}
		}
	}
}

</script> 

<style scoped>
div{
	display: flex;
	font-size: 16px;
	padding:30px;
}
input{
	width:100%;
	height:40px;
	padding:7px 10px;
	line-height: 26px;
	border:1px solid #c0ccda;
	border-radius:4px;
	color: #ccc;
	transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	box-sizing: border-box;
	font-size:inherit;
}
input:focus {
	outline: none;
	border-color: #20a0ff;
}
button{
	width:80px;
	height:40px;
	line-height: 26px;
	color: #fff;
	border:1px solid #20a0ff;
	background: #20a0ff;
	border-radius: 6px;
	margin-left: 30px;
	transition: background .3s ease-in;        
}
button:hover{
	background: #4db3ff;
}
</style>