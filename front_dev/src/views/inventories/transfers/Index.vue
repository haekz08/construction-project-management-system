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
      <modal :material_transfer="material_transfer" @save="save"/>
    </b-modal>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import Modal from './Modal.vue';
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,Modal,ServerSidePaginatedTable},
      data() {
        return {
          is_saving:false,
          modal:false,
          result:[],
          table_settings:{
              api_url:'inventory/transfers/all',
              delete_url:'inventory/transfers/delete',
              fields:[
                  {key: 'project_location_structure_item_from', label:'From Project'},
                  {key: 'project_location_structure_item_to', label:'To Project'},
                  {key: 'transaction_date.other_formats.format_1', label:'Date'},
                  {key: 'remarks', label:'Remarks'},
                  {key: 'action', label:'Action',class:'text-center'},
              ]
          },
          material_transfer:{}
        }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
            this.modal = true;
        });
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          let material_transfer = JSON.parse(JSON.stringify(data));
          material_transfer.project_location_structure_item_from = material_transfer.project_location_structure_item_from;
          material_transfer.project_location_structure_item_to = material_transfer.project_location_structure_item_to;

          material_transfer.transaction_date = material_transfer.transaction_date.default;

          material_transfer.project_location_structure_item_from_id = material_transfer.project_location_structure_item_from.project_location_structure_item_id;
          material_transfer.project_location_structure_item_to_id = material_transfer.project_location_structure_item_to.project_location_structure_item_id;

          this.material_transfer = material_transfer;
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
