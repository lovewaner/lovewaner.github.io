/**
 * Created by linxin on 2017/3/1.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions.js';
Vue.use(Vuex)

const localEvent = function(item){
    this.get = function(){
        return JSON.parse(localStorage.getItem(item))
    }
    this.set = function(obj){
        return localStorage.setItem(item,JSON.stringify(obj))
    }
    this.clear = function(){
        return localStorage.removeItem(item)
    }
}

const local = new localEvent('ty')
const state = local.get() || {
    event:[],
    count:0
}
const toDou = (n) =>{
    return n<10?'0'+n:n
}
const getDate = () => {
    const oDate = new Date(),mouth = parseInt(oDate.getMonth()+1)
    return oDate.getFullYear() + '-' + mouth + '-' + oDate.getDate()+' ' + toDou(oDate.getHours()) +':' + toDou(oDate.getMinutes()) + ':' + toDou(oDate.getSeconds())
}
const mutations = {
    ADDEVENT(state,obj){
        state.count++
        obj.items.id = state.count
        state.event.unshift(obj.items)
        local.set(state)
    },
    EVENTDONE(state,obj){
        for(let i = 0;i< state.event.length;i++){
            if(state.event[i].id === obj.id){
                state.event[i].type = 2
                state.event[i].time = getDate();
                var item = state.event[i];
                state.event.splice(i,1)
            }
        }
        state.event.unshift(item)
        local.set(state)
    },
    EVENTTODO(state,obj){
        for(let i = 0;i< state.event.length;i++){
            if(state.event[i].id === obj.id){
                state.event[i].type = 1
                var item = state.event[i];
                state.event.splice(i,1)
            }
        }
        state.event.unshift(item)
        local.set(state)
    },
    EVENTCANCEL(state,obj){
        for(let i = 0;i< state.event.length;i++){
            if(state.event[i].id === obj.id){
                state.event[i].type = 3
                var item = state.event[i];
                state.event.splice(i,1)
            }
        }
        state.event.unshift(item)
        local.set(state)
    },
    CLEAREVENT(state){
        state.event = [];
        local.clear();
    },
    DELEVENT(states,info){
        if(states.event[info.index].id === info.id){
            states.event.splice(info.index, 1);
        }else{
            states.event.filter(function(d,i){
                if(d.id == info.id){
                    states.event.splice(i, 1);
                }
            })
        }
        local.set(states);
    },
    EDITEVENT(states,info){
        if(states.event[info.index].id === info.id){
            states.event[info.index].content = info.content;
        }else{
            states.event.filter(function(d){
                if(d.id == info.id){
                    d.content = info.content;
                }
            })
        }
        local.set(states);
    }
}


export default new Vuex.Store({
    state,
    actions,
    mutations
})