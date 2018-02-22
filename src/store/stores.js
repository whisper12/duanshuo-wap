import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
	state : {
		'menuFlag' : false,
		'isLogin': '',
		'userFile':'',
		'category': '',
		'currentType': '1',
		'isError':false,
		'isRouteLoading':false
	},
	mutations: {
		SET_menuFlag(state, menuFlag) {
		state.menuFlag = menuFlag;
		},
		SET_isLogin(state,isLogin){
		state.isLogin = isLogin
		},
		SET_userFile(state,userFile){
		state.userFile = userFile
		},
		SET_category(state,category){
			state.category = category
		},
		SET_currentType(state,currentType){
			state.currentType = currentType
		},
		SET_isError(state,isError){
			state.isError = isError
		},
		SET_isRouteLoading(state,isRouteLoading){
			state.isRouteLoading = isRouteLoading
		}					
	},
	actions: {
		setmenuFlag({commit}, menuFlag) {
		commit('SET_menuFlag', menuFlag)
		},
		setisLogin({commit}, isLogin) {
		commit('SET_isLogin', isLogin)
		},
		setuserFile({commit}, userFile) {
		commit('SET_userFile', userFile)
		},
		setcategory({commit}, category){
			commit('SET_category', category)
		},
		setcurrentType({commit},currentType){
			commit('SET_currentType',currentType)
		},
		setisError({commit},isError){
			commit('SET_isError',isError)
		},
		setisRouteLoading({commit},isRouteLoading){
			commit('SET_isRouteLoading',isRouteLoading)
		}
	},
	getters: {
		getmenuFlag: (state) => state.menuFlag,
		getisLogin: (state) => state.isLogin,
		getuserFile: (state) => state.userFile,
		getcategory: (state) => state.category,
		getcurrentType: (state) => state.currentType,
		getisError: (state) => state.isError,
		getisRouteLoading: (state) => state.isRouteLoading
	}
})