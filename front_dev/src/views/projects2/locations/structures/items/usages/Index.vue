<template>
  <div>
    <CRow v-if="typeof project_location_structure_item.labor_est !='undefined'">
      <CCol>
        <CWidgetBrand
          color="info"
          :rightHeader="project_location_structure_item.labor_est.other_formats.format_1"
          rightFooter="ESTIMATE"
          :leftHeader="project_location_structure_item.labor.other_formats.format_1"
          leftFooter="USAGE"
          class="w-100 custom-font"
          v-b-popover.hover.top="'Manpower estimate and usage.'" title="Manpower"
        >
        <div class="p-4">
          <font-awesome-icon icon="users" class="h1 mb-0" />
        </div>
        </CWidgetBrand>
      </CCol>
      <CCol>
        <CWidgetBrand
          color="success"
          :rightHeader="project_location_structure_item.equipment_est.other_formats.format_1"
          rightFooter="ESTIMATE"
          :leftHeader="project_location_structure_item.equipment.other_formats.format_1"
          leftFooter="USAGE"
          class="w-100 custom-font"
          v-b-popover.hover.top="'Equipment estimate and usage.'" title="Equipment"
        >
        <div class="p-4">
          <font-awesome-icon icon="truck" class="h1 mb-0" />
        </div>
        </CWidgetBrand>
      </CCol>
      <CCol>
        <CWidgetBrand
          color="warning"
          :rightHeader="project_location_structure_item.material_est.other_formats.format_1"
          rightFooter="ESTIMATE"
          :leftHeader="project_location_structure_item.material.other_formats.format_1"
          leftFooter="USAGE"
          class="w-100 custom-font"
          v-b-popover.hover.top="'Material estimate and usage.'" title="Material"
        >
        <div class="p-4">
          <font-awesome-icon icon="cubes" class="h1 mb-0" />
        </div>
        </CWidgetBrand>
      </CCol>
      <CCol>
        <CWidgetBrand
          color="primary"
          rightHeader="NA"
          rightFooter="ESTIMATE"
          :leftHeader="project_location_structure_item.other_expense.other_formats.format_1"
          leftFooter="USAGE"
          class="w-100 custom-font"
          v-b-popover.hover.top="'Other expense usage.'" title="Other Expense"
        >
        <div class="p-4">
          <font-awesome-icon icon="list-ol" class="h1 mb-0" />
        </div>
        </CWidgetBrand>
      </CCol>
    </CRow>
    <server-side-paginated-table
            :fields="table_settings.fields"
            :api_url="table_settings.api_url"
            :delete_url="table_settings.delete_url"
            :project_location_structure_item_id="project_location_structure_item.id"
            ref="displayTable"
            @itemDbClicked="itemDbClicked"
    />
    <b-modal v-model="modal" centered size="xl" body-class="p-0" modal-class="xxl-modal" :hide-footer="true" :hide-header="true" >
      <modal :project_location_structure_item="project_location_structure_item" :daily_log_id="daily_log_id" @save="save()" />
    </b-modal>
  </div>
</template>
<script>
    import {bus} from '@/main.js'
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import Modal from './Modal.vue';
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,Modal,ServerSidePaginatedTable},
      props:{
          project_location_structure_item: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          table_settings:{
              api_url:'daily_logs/get_by_item',
              delete_url:'daily_logs/delete',
              fields:[
                  {key: 'transaction_date.other_formats.format_1', label:'Transaction Date'},
                  {key: 'labor', label:'Labor',class:'text-center'},
                  {key: 'equipment', label:'Equipment',class:'text-center'},
                  {key: 'other_expense', label:'Other Expense',class:'text-center'},
                  {key: 'total', label:'Total',class:'text-center'},
                  {key: 'action', label:'Action',class:'text-center'},
              ]
          },
          is_saving:false,
          modal:false,
          daily_log_id:-1
        }
      },
      watch: {
        project_location_structure_item:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', ()=>{
            this.modal=true;
        });
      },
      methods: {
        viewItem(daily_log_id){
          this.daily_log_id=daily_log_id;
          this.modal=true;
        },
        save(){
          this.modal=false;
          bus.$emit('refreshComputations');
        },
        itemDbClicked(data){
            this.viewItem(data.id);
        }
      }
    }
</script>
