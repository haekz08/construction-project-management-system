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
      <withdrawal-modal :material_withdrawal="material_withdrawal" @save="save"/>
    </b-modal>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import WithdrawalModal from './WithdrawalModal.vue';
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,WithdrawalModal,ServerSidePaginatedTable},
      data() {
        return {
          is_saving:false,
          modal:false,
          result:[],
          table_settings:{
              api_url:'inventory/withdrawals/all',
              delete_url:'inventory/withdrawals/delete',
              fields:[
                {key: 'project', label:'Project'},
                  {key: 'transaction_date.other_formats.format_1', label:'Date'},
                  {key: 'reference_number', label:'Reference Number'},
                  {key: 'total', label:'Total Withdrawn Amount'},
                  {key: 'action', label:'Action',class:'text-center'},
              ]
          },
          material_withdrawal:{}
        }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
            this.modal = true;
        });
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          let material_withdrawal = JSON.parse(JSON.stringify(data));
          material_withdrawal.transaction_date = material_withdrawal.transaction_date.default;
          this.material_withdrawal = material_withdrawal;
          this.modal=true;
        });
      },
      methods: {
        get(){
          this.$refs.displayTable.getAll();
          this.modal=false;
        },
        save(){
          this.get();
        }
      }
    }
</script>
