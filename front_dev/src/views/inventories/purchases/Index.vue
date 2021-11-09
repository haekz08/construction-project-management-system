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
      <modal :material_purchase="material_purchase" @save="save"/>
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
              api_url:'inventory/purchases/all',
              delete_url:'inventory/purchases/delete',
              fields:[
                  {key: 'starting_inventory', label:'Project'},
                  {key: 'transaction_date.other_formats.format_1', label:'Date'},
                  {key: 'order_number', label:'Order Number'},
                  {key: 'action', label:'Action',class:'text-center'},
              ]
          },
          material_purchase:{}
        }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
            this.modal = true;
        });
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          let material_purchase = JSON.parse(JSON.stringify(data));
          material_purchase.project_location_structure_item = material_purchase.project_location_structure_item;
          material_purchase.transaction_date = material_purchase.transaction_date.default;
          material_purchase.project_location_structure_item_id = material_purchase.project_location_structure_item_id;
          this.material_purchase = material_purchase;
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
