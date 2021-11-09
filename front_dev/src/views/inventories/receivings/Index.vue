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
      <delivery-modal :material_receive="material_receive" @save="save"/>
    </b-modal>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import DeliveryModal from './DeliveryModal.vue';
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,DeliveryModal,ServerSidePaginatedTable},
      data() {
        return {
          is_saving:false,
          modal:false,
          result:[],
          table_settings:{
              api_url:'inventory/receivings/all',
              delete_url:'inventory/receivings/delete',
              fields:[
                  {key: 'starting_inventory', label:'Project'},
                  {key: 'transaction_date.other_formats.format_1', label:'Date'},
                  {key: 'reference_number', label:'Reference Number'},
                  {key: 'material_delivery.delivery_number', label:'Delivery Number'},
                  {key: 'action', label:'Action',class:'text-center'},
              ]
          },
          material_receive:{}
        }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
            this.modal = true;
        });
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          let material_receive = JSON.parse(JSON.stringify(data));
          material_receive.material_delivery = material_receive.material_delivery;
          material_receive.material_delivery_id = material_receive.material_delivery.id;
          material_receive.transaction_date = material_receive.transaction_date.default;
          this.material_receive = material_receive;
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
