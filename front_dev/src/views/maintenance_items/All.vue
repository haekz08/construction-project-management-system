<template>
  <div class="animated fadeIn">
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
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    export default {
      components: {ServerSidePaginatedTable},
      data: () => {
          return {
              table_settings:{
                  api_url:'maintenance_items/all',
                  delete_url:'maintenance/item_units/delete',
                  fields:[
                      {key: 'date', label:'Transaction Date'},
                      {key: 'voucher_number', label:'Voucher Number'},
                      {key: 'check_number', label:'Check Number'},
                      {key: 'total.other_formats.format_1', label:'Total Amount',class:'text-right h6'},
                      {key: 'action', label:'Action',class:'text-center'},
                  ]
              },
          }
      },
      created(){
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
            this.$router.push('/maintenance-items/update/'+data.id);
        });
      }
    }
</script>
