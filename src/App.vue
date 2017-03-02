<template>
	<div id="app">
		<n-header @tools='changePages'></n-header>
		<section class="container">
			<AddEvent></AddEvent>
			<div class="event-content">
				<div class="event-tab" @click='changeCollapse(0,$event)'>
					未完成
					<span :class="{'close-span': !collapse[0].show}"></span>
				</div>
				<ul class="event-box" :style="{'height':'auto','display':'block'}">
					<li class="event-list"  v-for='value in getToDo'>
						<input type="checkbox" @click='moveToDone(value.id,$event)'>
						<div>{{ value.content }}</div>
						<button class="cancel-btn" @click='eventCancel(value.id)'>取消</button>
					</li>
				</ul>
				<div class="event-tab"  @click='changeCollapse(1,$event)'>
					已完成
					<span :class="{'close-span': !collapse[1].show}"></span>
				</div>
				<ul class="event-box" :style="{'height':'auto','display':'block'}">
					<li class="event-list"  v-for="value in getDone">
						<input type="checkbox" checked @click='moveToDo(value.id,$event)'>
						<div>{{ value.content }}</div>
						<span class="event-time">{{ value.time }}</span>
					</li>
				</ul>
				<div class="event-tab"   @click='changeCollapse(2,$event)'>
					已取消
					<span  :class="{'close-span': !collapse[2].show}"></span>
				</div>
				<ul class="event-box" :style="{'height':'auto','display':'block'}">
					<li class="event-list"  v-for="value in getCancel">
						<div class="event-delete">{{value.content}}</div>
						<button class="cancel-btn" @click='moveToDo(value.id)'>恢复</button>
					</li>
				</ul>
			</div>
			<nTools :is-show='tools' @clearDialog='clearData' @openTable='table = true;tools = false'></nTools>
		</section>
		<nDialog :is-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></nDialog>
		<nTable @deldialog="delData" :is-show="table" @close="table = false"></nTable>
	</div>
</template>

<script>
import nHeader from './components/nHeader.vue'
import AddEvent from './components/AddEvent.vue'
import nTools from './components/nTools.vue'
import nDialog from './components/nDialog.vue'
import nTable from './components/nTable.vue'

export default {
  name: 'app',
  data(){
	  return{
		  collapse:[{
			  	show: true,
            	contentHeight: 'auto'
		  },{
			  	show: true,
            	contentHeight: 'auto'
		  },{
			  	show: true,
            	contentHeight: 'auto'
		  }],
		  tools:false,
		  dialog:false,
		  table:false,
		  tips:'',
		  dialog_type:'',
		  del_info:{
			  index:0,
			  id:0
		  }
	  }
  },
  methods:{
    changePages(){
		if(this.table){
			this.table = !this.table
		}else{
			this.tools = !this.tools
		}
    },
	moveToDone(id,event){
		//移至已完成
		if(event.target.checked){
			this.$store.dispatch('eventdone',id)
			event.target.checked = false;
		}
	},
	moveToDo(id,event){
		//移至未完成
		if(event && !event.target.checked){
			this.$store.dispatch('eventtodo',id)
			event.target.checked = true;
		}else if(id){
			this.$store.dispatch('eventtodo',id)
		}
	},
	eventCancel(id){
		this.$store.dispatch('eventcancel',id)
	},
	changeCollapse(num,event){
		if(this.collapse[num].show){
			this.closeCollapse(num,event);			
			this.collapse[num].show = false;
		}else{
			this.openCollapse(num,event);
            this.collapse[num].show = true;
		}
	},
	closeCollapse(num,event){
		const ulElement = event.currentTarget.nextElementSibling;
		ulElement.style.height = ulElement.offsetHeight + 'px';
		this.collapse[num].contentHeight = ulElement.offsetHeight;
		setTimeout(function () {
			ulElement.style.height = '0px';
			setTimeout(function () {
				ulElement.style.display = 'none';
			},300)
		},10)

	},
	openCollapse(num,event){
		const ulElement = event.currentTarget.nextElementSibling,
				self = this;
		ulElement.style.display = 'block';
		setTimeout(function () {
			ulElement.style.height = self.collapse[num].contentHeight + 'px';
			setTimeout(function () {
				ulElement.style.height = 'auto';
			},300)
		},10)
    },
	clearData(){
		this.dialog = true
		this.dialog_type = 'clear';
        this.tips = '清空后无法恢复，确认清空吗？';
	},
	delData(index,id){
		this.dialog = true;
		this.dialog_type = 'del';
		this.tips = '删除后无法恢复，确认删除吗？';
		this.del_info = {
			index: index,
			id : id
		}
	},
	sureDialog(){
		switch(this.dialog_type){
			case 'clear':
				this.$store.dispatch('clearevent');
				break;
			case 'del':
				this.$store.dispatch('delevent',this.del_info);
				break;
		}
		this.dialog = false
		this.tools = false
	}
  },
  components:{
    nHeader,
	AddEvent,
	nTools,
	nDialog,
	nTable
  },
  computed:{
	  getToDo(){
		return this.$store.state.event.filter((d) =>{
			if(d.type === 1){
				return d
			}
		})
	  },
	  getDone(){
		return this.$store.state.event.filter((d) =>{
			if(d.type === 2){
				return d
			}
		})
	  },
	  getCancel(){
		return this.$store.state.event.filter((d) =>{
			if(d.type === 3){
				return d
			}
		})
	  },
  }
}
</script>

<style>
.container{
	width: 100%;
    padding: 0 10px;
    max-width: 800px;
    margin: auto;
    box-sizing: border-box;
}
.event-tab{
	position: relative;
	height:44px;
	line-height: 44px;
	padding-left:20px;
	border-bottom:1px solid #fff;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	background: #00a2ff;
}
.event-tab span{
	position: absolute;
	right:20px;
	top:15px;
	width:10px;
	height:10px;
	content: '';
	border-top:3px solid #fff;
	border-right:3px solid #fff;
	transform: rotate(135deg);
	transition: transform .3s;	
}
.event-tab span.close-span{
	transform: rotate(45deg);
}
.event-box{
	overflow: hidden;
	border-left: 1px solid #eee;
	border-right: 1px solid #eee;
	transition: height 0.3s;
}
.event-list{
	position: relative;
	min-height:44px;
	line-height: 25px;
	padding:10px 100px 10px 50px;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
}
.event-list input[type=checkbox]{
	position: absolute;
	left:15px;
	top:12px;
	width:20px;
	height:20px;
}
.cancel-btn{
	position: absolute;
	right:10px;
	top:7px;
	width:50px;
	height:30px;
	line-height: 30px;
	padding:0;
	background: #fff;
	border: 1px solid #c0ccda;
	color: #1f2d3d;
	font-size:12px;
	border-radius: 5px;
}
.event-time{
	position: absolute;
	right: 10px;
	top:0;
	line-height:44px;
	font-size: 12px;
	color: #aaa;
}
.event-delete{
	text-decoration: line-through;
	color: #999;

}
</style>
