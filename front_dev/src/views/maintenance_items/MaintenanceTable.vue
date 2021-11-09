<template>
  <div>
    <b-row align-v="center" class="loader" v-if="is_saving">
        <b-col>
            <b-spinner></b-spinner>
            <br><br>
            <strong>Loading</strong>
        </b-col>
    </b-row>
    <div class="card bg-light">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="list" /> Details</h6>
          <b-button v-if="is_editable" type="submit" size="sm" variant="info" class="mr-2" @click="maintenance_modal=true"><font-awesome-icon icon="plus-circle" /> Add</b-button>
      </div>
      <div class="card-body bg-white">
        <table class="table table-bordered mb-0 table-sm">
          <thead class="bg-light text-dark">
            <tr>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center">Type</th>
              <th scope="col" class="text-center">Incharge</th>
              <th scope="col" class="text-center">Amount</th>
              <th scope="col" class="text-center"  v-if="is_editable">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(detail, index) in maintenance_details">
            <tr>
              <td class="text-center">
                <b-button variant="info" @click="detail.show_details=!detail.show_details"><font-awesome-icon icon="info-circle" /></b-button>
                
              </td>
              <td scope="row">
                <strong v-if="detail.type==1">{{detail.equipment.equipment_type.description + ' - ' + detail.equipment.code}}</strong>
                <strong v-else>{{detail.tool.tool_type.description + ' - ' + detail.tool.code}}</strong>
                <small class="d-block">
                {{(detail.type==1) ? 'Equipment' : 'Tool'}}
                <template v-if="detail.is_indirect">
                  | <b-badge variant="danger" class="cursor-pointer">Indirect Expense</b-badge>
                </template>
                </small>
              </td>
              <td>
                <strong class="d-block">{{detail.maintenance_description.description}}</strong>
                <small>Incharge : {{detail.manpower.full_name}}</small>
              </td>
              <td class="text-right">
                <strong><number-format-component :input_value="Number(detail.total)"/></strong>
                <small class="d-block">
                  <number-format-component :input_value="Number(detail.qty)" :currency="false"/>@ <number-format-component :input_value="Number(detail.amount)"/>
                </small>
              </td>
              <td class="text-center" v-if="is_editable">
                <b-button type="submit" size="sm" variant="danger" @click="deleteItem(index)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
              </td>
            </tr>
            <tr v-show="detail.show_details">
              <td colspan="5">
                <b-collapse v-model="detail.show_details" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <template v-if="detail.project_location_structure_item !== null">
                      <h6>Project : <strong>{{detail.project_location_structure_item.project_location_structure.project_location.project.title}}</strong></h6>
                      <h6>Location : <strong>{{detail.project_location_structure_item.project_location_structure.project_location.description}}</strong></h6>
                      <h6>Structure : <strong>{{detail.project_location_structure_item.project_location_structure.description}}</strong></h6>
                      <h6>Item : <strong>{{detail.project_location_structure_item.description}}</strong></h6>
                    </template>
                    <template v-else>
                      <strong>Main Office</strong>
                    </template>
                    <hr>
                    <h6><strong>Details:</strong></h6>
                    {{detail.remarks}}
                    </b-card-body>
                </b-collapse>
              </td>
            </tr>
            </template>
          </tbody>
          <tfoot class="bg-light text-dark">
            <tr>
              <th colspan="3" class="text-right">
                TOTAL AMOUNT
              </th>
              <th class="text-right"><number-format-component :input_value="Number(total)"/></th>
              <th v-if="is_editable"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- START OF MAIANTENANCE MODAL -->
      <b-modal v-model="maintenance_modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
          <maintenance-modal @save="addMaintenance" />
      </b-modal>
      <!-- END OF MAIANTENANCE MODAL -->
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import MaintenanceModal from './MaintenanceModal.vue';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      components: {MaintenanceModal,NumberFormatComponent},
      mixins:[SwalMixin],
      props:{
          maintenance_details: {
              type: Array,
              default: () => [],
              required:false
          },
          is_editable: {
              type: Boolean,
              default: true,
              required:false
          }
      },
      watch: {
        maintenance_details:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        },
      },
      data() {
        return {
          is_saving:false,
          maintenance_modal:false
        }
      },
      computed: {
          total(){
              return this.maintenance_details.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      methods: {
        addMaintenance(data){
          this.maintenance_details.push(data);
          this.maintenance_modal=false;
        },
        deleteItem(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.maintenance_details.splice(index,1);
              }
          });
        }
      }
    }
</script>
