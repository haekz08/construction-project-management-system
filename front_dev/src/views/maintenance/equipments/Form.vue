<template>
  <div>
    <b-row align-v="center" class="loader" v-if="is_saving">
        <b-col>
            <b-spinner></b-spinner>
            <br><br>
            <strong>Loading</strong>
        </b-col>
    </b-row>
    <b-row class="bg-white m-0 border">
      <b-col cols="3" class="border-right p-3">
        <b-form @submit.prevent="save">
          <b-form-group
            label="Name:"
            description="This field is required"
          >
            <b-form-input
              v-model="form.description"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <div class="text-right">
            <router-link to="/maintenance/equipments/all">
              <b-button v-if="form.id!=-1" variant="dark" size="sm" class="mr-1">
                <font-awesome-icon icon="chevron-left" /> Back</b-button>
            </router-link>
              <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save Equipment</b-button>
          </div>
        </b-form>
      </b-col>
      <b-col class="p-2">
        <b-button type="submit" size="sm" class="float-right mb-2" @click="addEquipment()"><font-awesome-icon icon="plus-circle" /> Add Equipment</b-button>
        <table class="table table-bordered table-sm">
          <thead class="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Code</th>
              <th scope="col" class="text-center">Hourly Rate</th>
              <th scope="col" class="text-center">Company Property</th>
              <th scope="col" class="text-center">Designated To</th>
              <th scope="col" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(equipment, index) in form.equipments" v-if="!equipment.is_deleted">
            <tr>
              <td class="text-center">
                <b-button size="sm" variant="info" @click="equipment.show_details=!equipment.show_details"><font-awesome-icon icon="info-circle" /></b-button>
              </td>
              <th scope="row">{{equipment.code}}</th>
              <td class="text-right"><number-format-component :input_value="Number(equipment.hourly_rate)"/></td>
              <td class="text-center">
                  {{(equipment.is_company_owned) ? 'YES' : 'NO'}}
              </td>
              <td class="text-center">
                <template v-if="equipment.id==-1">
                  <b-badge variant="danger" class="cursor-pointer">No Designation Yet | Please save your data.</b-badge>
                </template>
                <template v-else>
                  <b-badge variant="danger" class="cursor-pointer" v-if="equipment.equipment_designation==null" @click="designate(equipment)">No Designation Yet</b-badge>
                  <b-badge variant="success" class="cursor-pointer" v-else @click="designate(equipment)">{{equipment.equipment_designation.manpower.full_name}}</b-badge>
                </template>
                </td>
              <!-- <td>
                <template v-if="equipment.equipment_designation.project_location_structure_item !== null">
                  <h6>Project : <strong>{{equipment.equipment_designation.project_location_structure_item.project_location_structure.project_location.project.title}}</strong></h6>
                  <h6>Location : <strong>{{equipment.equipment_designation.project_location_structure_item.project_location_structure.project_location.description}}</strong></h6>
                  <h6>Structure : <strong>{{equipment.equipment_designation.project_location_structure_item.project_location_structure.description}}</strong></h6>
                  <h6>Item : <strong>{{equipment.equipment_designation.project_location_structure_item.description}}</strong></h6>
                </template>
                <template v-else>
                  <strong>Main Office</strong>
                </template>
              </td> -->
              <td class="text-center">
                <b-button type="submit" size="sm" variant="info" class="mr-2" @click="updateEquipment(index,equipment)"><font-awesome-icon icon="edit" /> Edit</b-button>
                <b-button type="submit" size="sm" variant="danger" class="mr-2" @click="deleteEquipment(index)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
              </td>
            </tr>
            <tr v-show="equipment.show_details" v-if="equipment.equipment_designation !== null">
              <td colspan="6">
                <b-collapse v-model="equipment.show_details" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <template v-if="equipment.equipment_designation.project_location_structure_item !== null">
                      <h6>Project : <strong>{{equipment.equipment_designation.project_location_structure_item.project_location_structure.project_location.project.title}}</strong></h6>
                      <h6>Location : <strong>{{equipment.equipment_designation.project_location_structure_item.project_location_structure.project_location.description}}</strong></h6>
                      <h6>Structure : <strong>{{equipment.equipment_designation.project_location_structure_item.project_location_structure.description}}</strong></h6>
                      <h6>Item : <strong>{{equipment.equipment_designation.project_location_structure_item.description}}</strong></h6>
                    </template>
                    <template v-else>
                      <strong>Main Office</strong>
                    </template>
                    <hr>
                    <h6><strong>Details:</strong></h6>
                    {{equipment.remarks}}
                    </b-card-body>
                </b-collapse>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <!-- START OF CHECK OUT MODAL -->
      <b-modal v-model="add_equipment_modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
              <add-equipment-component :equipment_form="default_equipment_form" :current_equipments="form.equipments"  @saveEquipment="saveEquipment" />
      </b-modal>
      <!-- END OF CHECK OUT MODAL -->

    <!-- START OF DESIGNATION MODAL -->
      <b-modal v-model="designation_modal" centered size="xl" body-class="p-0" modal-class="xxl-modal" :hide-footer="true" :hide-header="true" @hide="get()">
          <designation :equipment="selected_equipment" @save="designation_modal=false" />
      </b-modal>
      <!-- END OF DESIGNATION MODAL -->
  </div>
</template>
<script>
    import AddEquipmentComponent from './AddEquipmentComponent.vue';
    import Designation from './Designation.vue';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import SwalMixin from '@/views/mixins/Swal.js'
    export default {
      mixins:[SwalMixin],
      components: {AddEquipmentComponent,NumberFormatComponent,Designation},
      data() {
        return {
          form: {
            id:-1,
            description: '',
            equipments:[]
          },
          form_copy:{},
          default_equipment_form: {
            index_id:-1,
            id:-1,
            code: '',
            hourly_rate: '',
            is_company_owned: false,
            is_deleted:false
          },
          is_saving:false,
          add_equipment_modal:false,
          designation_modal:false,
          selected_equipment:{},
          maintenance_modal:false
        }
      },
      watch: {
        form:{
            immediate: true,
            deep:true,
            handler(){
              
            }
        }
      },
      created(){
        this.form_copy=JSON.parse(JSON.stringify(this.form));
        if(typeof this.$route.params.id !== 'undefined')
        this.get();
      },
      methods: {
        get(){
          this.is_saving=true;
          this.axios.get('maintenance/equipment_types/get',{params:{id:this.$route.params.id}}).then(response => {
              this.form.equipments = [];
              this.form.id=response.data.id;
              this.form.description=response.data.description;
              response.data.equipments.forEach((e) => {
                let equipment = e;
                equipment.is_deleted=false;
                equipment.show_details=false;
                this.form.equipments.push(equipment);
              });
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('maintenance/equipment_types/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    if(this.form.id==-1){
                      this.form=JSON.parse(JSON.stringify(this.form_copy));
                    }else{
                      this.get();
                    }
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        },
        addEquipment(){
          let form = {
            index_id:-1,
            id:-1,
            code: '',
            hourly_rate: '',
            is_company_owned: false,
            is_deleted:false,
            equipment_designation:null,
            equipment_designations:[]
          }
          this.default_equipment_form = form;
          this.add_equipment_modal=true;
        },
        updateEquipment(index,equipment){
          this.default_equipment_form = equipment;
          this.default_equipment_form.index_id = index;
          this.add_equipment_modal = true;
        },
        saveEquipment(equipment){
          if(equipment.index_id==-1){
            equipment.equipment_type_id = this.form.id;
            this.form.equipments.push(equipment);
          }else{
            this.form.equipments[equipment.index_id]=equipment;
          }
          
          this.add_equipment_modal=false;
        },
        deleteEquipment(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.form.equipments[index].is_deleted = true;
                console.log(this.form.equipments[index].is_deleted);
              }
          });
        },
        designate(equipment){
          this.designation_modal=true;
          this.selected_equipment = equipment;
        },
        maintenance(equipment){
          this.maintenance_modal=true;
          this.selected_equipment = equipment;
        }
      }
    }
</script>
