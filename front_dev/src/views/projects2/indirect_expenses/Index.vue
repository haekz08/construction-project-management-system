<template>
  <div>
    <server-side-paginated-table
          :fields="table_settings.fields"
          :api_url="table_settings.api_url"
          :delete_url="table_settings.delete_url"
          :project_id="project.id"
          ref="displayTable"
          :top_right_btn_redirect="false"
        />
    <!-- START OF CHECK OUT MODAL -->
    <b-modal v-model="modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true" @hide="resetForm()">
      <form-component :project="project" @save="refresh()" :indirect_expense="indirect_expense" />
    </b-modal>
    <!-- END OF CHECK OUT MODAL -->
  </div>
</template>
<script>
    import {bus} from '@/main.js'
    import SwalMixin from '@/views/mixins/Swal.js'
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    import FormComponent from './Form.vue';
    export default {
      components: {FormComponent,ServerSidePaginatedTable},
      mixins:[SwalMixin],
      props:{
          project: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          modal:false,
          table_settings:{
              api_url:'indirect_expenses/all',
              delete_url:'indirect_expenses/delete',
              fields:[
                  {key: 'transaction_date.other_formats.format_1', label:'Transaction Date'},
                  {key: 'voucher_number', label:'Voucher Number'},
                  {key: 'check_number', label:'Check Number'},
                  {key: 'details', label:'Details'},
                  {key: 'total.other_formats.format_1', label:'Total Amount',class:'text-right'},
                  {key: 'action', label:'Action',class:'text-center'},
              ]
          },
          indirect_expense:{}
        }
      },
      watch: {
        project:{
            immediate: true,
            deep:true,
            handler(){
            }
        }
      },
      created(){
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          this.indirect_expense = JSON.parse(JSON.stringify(data));
          this.indirect_expense.transaction_date = data.transaction_date.default;
          this.modal=true;
        });
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
          this.modal=true;
        });
      },
      methods: {
        refresh(){
          this.modal=false;
          bus.$emit('reloadIndirectExpenseTable');
          bus.$emit('refreshComputations');
        },
        resetForm(){
          this.indirect_expense={};
        }
      }
    }
</script>
