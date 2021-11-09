<template>
  <div>
    <nav aria-label="breadcrumb" class="bg-white">
      <ol class="breadcrumb">
        <li class="breadcrumb-item text-dark" v-if="is_saving">Loading...</li>
        <li v-for="crumb in crumbs" class="breadcrumb-item" v-else>
          <router-link :to="crumb.link">
              {{crumb.label}}
            </router-link>
          </li>
      </ol>
    </nav>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    export default {
      data: () => {
          return {
              crumbs:[
                {
                  label:'',
                  link:''
                }
              ],
              is_saving:false
          }
      },
      created(){
        this.setCrumbs();
      },
      methods:{
        setCrumbs(){
          this.is_saving=true;
          if(typeof this.$route.params.project_location_id != 'undefined' && typeof this.$route.params.project_location_structure_id =='undefined'){
            this.axios.get('crumbs/generate_from_location',{params:{id:this.$route.params.project_location_id}}).then(response => {
                this.crumbs=[];
                this.crumbs.push({label:response.data.location_description,link:'/projects/'+response.data.id+'/'+response.data.location_id});
                this.is_saving=false;
            }).catch(error => console.log(error));
          }else if(typeof this.$route.params.project_location_structure_id != 'undefined' && typeof this.$route.params.project_location_structure_item_id =='undefined'){
            this.axios.get('crumbs/generate_from_structure',{params:{id:this.$route.params.project_location_structure_id}}).then(response => {
                this.crumbs=[];
                this.crumbs.push({label:response.data.location_description,link:'/projects/'+response.data.id+'/'+response.data.location_id});
                this.crumbs.push({label:response.data.structure_description,link:'/projects/'+response.data.id+'/'+response.data.location_id+'/'+response.data.structure_id});
                this.is_saving=false;
            }).catch(error => console.log(error));
          }else if(typeof this.$route.params.project_location_structure_item_id != 'undefined'){
            this.axios.get('crumbs/generate_from_item',{params:{id:this.$route.params.project_location_structure_item_id}}).then(response => {
                this.crumbs=[];
                this.crumbs.push({label:response.data.location_description,link:'/projects/'+response.data.id+'/'+response.data.location_id});
                this.crumbs.push({label:response.data.structure_description,link:'/projects/'+response.data.id+'/'+response.data.location_id+'/'+response.data.structure_id});
                this.crumbs.push({label:response.data.item_description,link:'/projects/'+response.data.id+'/'+response.data.location_id+'/'+response.data.structure_id+'/'+response.data.item_id});
                this.is_saving=false;
            }).catch(error => console.log(error));
          }
        }
      }
    }
</script>
