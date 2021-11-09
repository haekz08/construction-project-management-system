<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img :src="assets_path.DEFAULT_URL+'logo-wide.png'" class="c-sidebar-brand-full" />
      <img :src="assets_path.DEFAULT_URL+'logo.png'" class="c-sidebar-brand-minimized" style="height:35px"/>
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import {client_details,assets_path} from '@/config';

export default {
  name: 'TheSidebar',
  nav,
  data(){
      return{
          assets_path:{}
      }
  },
  created() {
      //if(this.loggedIn){this.$router.push('/')}
      this.assets_path = assets_path;
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
