<template>
  <div>
    <server-side-paginated-table
            :fields="table_settings.fields"
            :api_url="table_settings.api_url"
            :delete_url="table_settings.delete_url"
            ref="displayTable"
    />
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import ServerSidePaginatedTable from '@/views/helpers/ServerSidePaginatedTable.vue';
    export default {
      components: {ServerSidePaginatedTable},
      data: () => {
          return {
              table_settings:{
                  api_url:'maintenance/manpowers/all',
                  delete_url:'maintenance/manpowers/delete',
                  fields:[
                      {key: 'full_name', label:'Full Name'},
                      {key: 'job_description.description', label:'Job Description'},
                      {key: 'action', label:'Action',class:'text-center'},
                  ]
              },
          }
      },
      created(){
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
            this.$router.push('/manpowers/update/'+data.id);
        });
      }
    }
</script>
