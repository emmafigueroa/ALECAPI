import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//importamos vue-router
import VueRouter from 'vue-router'

//Importamos Componentes
import inicio from './components/Inicio'
import listarDenuncia from './components/ListarDenuncia'
import editarDenuncia from './components/EditarDenuncia'
import crearDenuncia from './components/CrearDenuncia'

//Creamos Nuestros componentes
Vue.component('inicio', inicio)
Vue.component('listarDenuncias', listarDenuncia)
Vue.component('editarDenuncia', editarDenuncia)
Vue.component('crearDenuncia',crearDenuncia)

//uso de vue-router
Vue.use(VueRouter)

//definimos las rutas
const routes = [
  {path:'/', component:inicio},
  {path:'/inicio',component:inicio},
  {path:'/denuncias', component:listarDenuncia},
  {path:'/crear', component:crearDenuncia, name: 'crearDenuncia'},
  {path:'/editar/:id', component:editarDenuncia, name:'editarDenuncia'}
]

//crearmos el objeto router
const router = new VueRouter({
  routes,
  mode:'history'
})



Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
