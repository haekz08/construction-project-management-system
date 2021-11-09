<template>
  <div>
    <b-row class="m-0">
      <b-col sm="12" class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Maintenance Details</h6>
          </div>
          <div class="card-body p-3">
            <b-form @submit.prevent="save">
              <b-row>
                <b-col>
                  <b-row>
                    <b-col cols="4">
                      <b-form-group
                        label="Type:"
                        description="This field is required"
                      >
                        <b-input-group size="sm">
                          <select class="form-control" v-model="form.type">
                            <option value="1">Equipment</option>
                            <option value="2">Tool</option>
                          </select>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Equipment Description:"
                        description="This field is required"
                        v-if="form.type==1"
                      >
                        <b-input-group size="sm">
                          <template v-slot:append>
                            <b-button @click="equipment_modal=true" type="button" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select</b-button>
                          </template>
                          <b-form-input
                            :value="(typeof form.equipment.equipment_type != 'undefined') ? form.equipment.equipment_type.description + ' - ' + form.equipment.code : ''"
                            type="text"
                            readonly
                            required
                            size="sm"
                            class="bg-white text-dark"
                          ></b-form-input>
                        </b-input-group>
                      </b-form-group>
                      
                      <b-form-group
                        label="Tool Description:"
                        description="This field is required"
                        v-if="form.type==2"
                      >
                        <b-input-group size="sm">
                          <template v-slot:append>
                            <b-button @click="tool_modal=true" type="button" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select</b-button>
                          </template>
                          <b-form-input
                            :value="(typeof form.tool.tool_type != 'undefined') ? form.tool.tool_type.description + ' - ' + form.tool.code : ''"
                            type="text"
                            required
                            size="sm"
                            readonly
                            class="bg-white text-dark"
                          ></b-form-input>
                        </b-input-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-group
                    label="Person Incharge:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <template v-slot:append>
                        <b-button @click="manpower_modal=true" type="button" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select</b-button>
                      </template>
                      <b-form-input
                        v-model="form.manpower.full_name"
                        type="text"
                        required
                        size="sm"
                        readonly
                        class="bg-white text-dark"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  
                  <b-form-group
                    label="Charge to Project:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <template v-slot:append>
                        <b-button type="button" @click="project_modal=true" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select</b-button>
                      </template>
                      <template v-slot:prepend v-if="typeof form.project_location_structure_item.id != 'undefined'">
                        <b-button variant="info" id="popover-button-open" size="sm"><font-awesome-icon icon="info-circle" /></b-button>
                        <b-popover target="popover-button-open" title="Location Details" placement="left">
                          <h6>Project : <strong>{{form.project_location_structure_item.project_location_structure.project_location.project.title}}</strong></h6>
                          <h6>Location : <strong>{{form.project_location_structure_item.project_location_structure.project_location.description}}</strong></h6>
                          <h6>Structure : <strong>{{form.project_location_structure_item.project_location_structure.description}}</strong></h6>
                        </b-popover>
                      </template>
                      <b-form-input
                        v-model="form.project_location_structure_item.description"
                        type="text"
                        size="sm"
                        readonly
                        class="bg-white text-dark"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>

                  <b-alert show class="d-flex align-items-center">
                    <label class="c-switch-sm c-switch-pill c-switch-success mb-0">
                      <input type="checkbox" class="c-switch-input" v-model="form.is_indirect">
                      <span class="c-switch-slider"></span>
                    </label>
                    <span class="ml-2">Mark as Indirect Expense</span>
                  </b-alert>
                  
                  <b-form-group
                    label="Maintenance Description:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <template v-slot:append>
                        <b-button @click="maintenance_description_modal=true" type="button" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select</b-button>
                      </template>
                      <b-form-input
                        v-model="form.maintenance_description.description"
                        type="text"
                        required
                        size="sm"
                        readonly
                        class="bg-white text-dark"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>


                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Amount:"
                        description="This field is required"
                      >
                        <b-form-input
                          v-model="form.amount"
                          type="number"
                          required
                          step="any"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Qty:"
                        description="This field is required"
                      >
                        <b-form-input
                          v-model="form.qty"
                          type="number"
                          required
                          step="any"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Total:"
                        description="Total Amount"
                      >
                        <b-form-input
                          v-model="total"
                          type="number"
                          readonly
                          step="any"
                          class="bg-white text-dark text-right"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-form-group
                    label="Details:"
                    description="This field is required"
                  >
                    <b-form-textarea
                      id="textarea"
                      v-model="form.remarks"
                      placeholder="Enter something..."
                      rows="3"
                      max-rows="6"
                      size="sm"
                    ></b-form-textarea>
                  </b-form-group>
                  
                  <div class="text-right">
                    <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal v-model="project_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <project-modal @select="selectItem"/>
    </b-modal>

    <b-modal v-model="manpower_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <manpower-modal @select="selectManpower"/>
    </b-modal>
    
    <b-modal v-model="maintenance_description_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <maintenance-description-modal @select="selectMaintenanceDescription"/>
    </b-modal>
    
    <b-modal v-model="equipment_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <equipment-modal @select="selectEquipment"/>
    </b-modal>
    
    <b-modal v-model="tool_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <tool-modal @select="selectTool"/>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import ProjectModal from '@/views/helpers/ProjectModal.vue';
    import ManpowerModal from '@/views/helpers/ManpowerModal.vue';
    import MaintenanceDescriptionModal from '@/views/helpers/MaintenanceDescriptionModal.vue';
    import EquipmentModal from '@/views/helpers/EquipmentModal.vue';
    import ToolModal from '@/views/helpers/ToolModal.vue';
    export default {
      mixins:[SwalMixin],
      components: {ProjectModal,ManpowerModal,MaintenanceDescriptionModal,EquipmentModal,ToolModal},
      props:{
          equipment: {
              type: Object,
              default: () => {}
          },
      },
      data() {
        return {
          form: {
            id:-1,
            type:1,
            project_location_structure_item_id:'',
            project_location_structure_item:{},
            manpower:{},
            manpower_id:-1,
            maintenance_description:{},
            maintenance_description_id:-1,
            equipment:{},
            equipment_id:-1,
            tool:{},
            tool_id:-1,
            transaction_date:'',
            transaction_time:'',
            remarks:'',
            amount:'',
            qty:'',
            is_deleted:false,
            is_indirect:false
          },
          project_modal:false,
          manpower_modal:false,
          maintenance_description_modal:false,
          equipment_modal:false,
          tool_modal:false,
          is_saving:false
        }
      },
      watch: {
        equipment:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        }
      },
      computed: {
          total(){
            return Number(this.form.amount) * Number(this.form.qty);
          },
      },
      created(){
        //this.form=JSON.parse(JSON.stringify(this.equipment_form));
      },
      methods: {
        selectItem(data){
          this.form.project_location_structure_item = data;
          this.form.project_location_structure_item_id = data.id;
          this.project_modal = false;
        },
        selectManpower(data){
          this.form.manpower = data;
          this.form.manpower_id = data.id;
          this.manpower_modal = false;
        },
        selectMaintenanceDescription(data){
          this.form.maintenance_description = data;
          this.form.maintenance_description_id = data.id;
          this.maintenance_description_modal = false;
        },
        selectEquipment(data){
          this.form.equipment = data;
          this.form.equipment_id = data.id;

          this.form.tool = {};
          this.form.tool_id = -1;

          this.equipment_modal = false;
        },
        selectTool(data){
          this.form.tool = data;
          this.form.tool_id = data.id;
          
          this.form.equipment = {};
          this.form.equipment_id = -1;

          this.tool_modal = false;
        },
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.form.total=this.total;
                this.$emit('save',this.form);
              }
          });
        },
      }
    }
</script>
