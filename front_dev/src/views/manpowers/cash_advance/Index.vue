<template>
  <div>
    <server-side-paginated-table
            :fields="table_settings.fields"
            :api_url="table_settings.api_url"
            :delete_url="table_settings.delete_url"
            :top_right_btn_redirect="false"
            ref="displayTable"
    />
    
    <b-modal v-model="modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
      <modal :cash_advance="cash_advance" @save="save"/>
    </b-modal>
    
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import ServerSidePaginatedTable from '@/views/helpers/ServerSidePaginatedTable.vue';
    import Modal from './Modal.vue';
    export default {
      components: {ServerSidePaginatedTable,Modal},
      data: () => {
          return {
              table_settings:{
                  api_url:'maintenance/manpowers/cash_advance/all',
                  delete_url:'maintenance/manpowers/cash_advance/delete',
                  fields:[
                      {key: 'transaction_date.other_formats.format_1', label:'Transaction Date'},
                      {key: 'voucher_number', label:'Voucher Number'},
                      {key: 'check_number', label:'Check Number'},
                      {key: 'action', label:'Action',class:'text-center'},
                  ]
              },
              modal:false,
              cash_advance:{}
          }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
            this.modal = true;
        });
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          let cash_advance = JSON.parse(JSON.stringify(data));
          cash_advance.transaction_date = cash_advance.transaction_date.default;
          this.cash_advance = cash_advance;
          this.modal=true;
        });
      },
      methods: {
        get(){
          this.$refs.displayTable.getAll();
        },
        save(){
          this.get();
          this.modal=false;
        }
      }
    }
</script>
