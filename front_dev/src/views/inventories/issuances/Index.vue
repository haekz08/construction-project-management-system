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
      <issuance-modal :material_issuance="material_issuance" @save="save"/>
    </b-modal>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import IssuanceModal from './IssuanceModal.vue';
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,IssuanceModal,ServerSidePaginatedTable},
      data() {
        return {
          is_saving:false,
          modal:false,
          result:[],
          table_settings:{
              api_url:'inventory/issuances/all',
              delete_url:'inventory/issuances/delete',
              fields:[
                {key: 'project', label:'Project'},
                {key: 'transaction_date.other_formats.format_1', label:'Date'},
                {key: 'reference_number', label:'Reference Number'},
                {key: 'total', label:'Total Issuance Amount'},
                {key: 'action', label:'Action',class:'text-center'},
              ]
          },
          material_issuance:{}
        }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
            this.modal = true;
        });
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          let material_issuance = JSON.parse(JSON.stringify(data));
          material_issuance.transaction_date = material_issuance.transaction_date.default;
          this.material_issuance = material_issuance;
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
