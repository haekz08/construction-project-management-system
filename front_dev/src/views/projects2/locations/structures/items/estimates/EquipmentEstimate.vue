<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <!-- <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add New Item</h6>
          </div> -->
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Equipment Estimates</h6>
              <b-button variant="secondary" size="sm" @click="modal=true">
                  <font-awesome-icon icon="plus" /> Add New
              </b-button>
          </div>
          <div class="card-body bg-white position-relative">
            <b-row align-v="center" class="loader" v-if="is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <table class="table border">
              <thead class="bg-light text-dark">
                <tr>
                  <th scope="col">Equipment Description</th>
                  <th scope="col" class="text-center">Hourly Rate</th>
                  <th scope="col" class="text-center">Est. Duration (Hours)</th>
                  <th scope="col" class="text-center">Est. Duration (Days)</th>
                  <th scope="col" class="text-center">Number of Equipment</th>
                  <th scope="col" class="text-center">Total</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(equipment_estimate, index) in equipment_estimates">
                  <th scope="row">{{equipment_estimate.equipment_type.description}}</th>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_estimate.hourly_rate)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_estimate.duration_in_hour)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_estimate.duration_in_day)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_estimate.qty)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_estimate.total)"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(equipment_estimate.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-light text-dark">
                <tr>
                  <th scope="col" class="text-right" colspan="5">TOTAL EST. AMOUNT FOR EQUPMENT</th>
                  <th scope="col" class="text-right"><number-format-component :input_value="Number(total_estimate)"/></th>
                  <th scope="col" class="text-center"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal v-model="modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
      <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Equipment Estimates</h6>
          </div>
          <div class="card-body bg-white position-relative">
            <b-row align-v="center" class="loader" v-if="modal_is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <b-form @submit="save">
              <b-form-group
                label="Equipment:"
                description="This field is required"
              >
                <select class="form-control" v-model="form.equipment_type_id" required>
                    <option value="">Please Select</option>
                    <option v-for="equipment_type in equipment_types" :value="equipment_type.id">
                        {{equipment_type.description}}
                    </option>
                </select>
              </b-form-group>

              <b-form-group
                label="Hourly Rate:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.hourly_rate"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Estimated Duration in Hours:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.duration_in_hour"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Estimated Duration in Days:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.duration_in_day"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Number of Equipment:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.qty"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>


              <div class="text-right">
                <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
              </div>
            </b-form>
          </div>
        </div>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent},
      props:{
          equipment_estimates: {
              type: Array,
              default: () => [],
              required:false
          }
      },
      computed: {
          total_estimate(){
              return this.equipment_estimates.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      data() {
        return {
          form: {
            id:-1,
            project_location_structure_item_id:this.$route.params.project_location_structure_item_id,
            equipment_type_id: '',
            hourly_rate:'',
            duration_in_hour:'',
            duration_in_day:'',
            qty:'',
            total:''
          },
          is_saving:false,
          modal_is_saving:false,
          equipment_types:[],
          modal:false
        }
      },
      watch: {
        equipment_estimates:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        }
      },
      created(){
        this.getFields();
      },
      methods: {
        save(){
          event.preventDefault();
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.modal_is_saving=true;
                this.axios.post('equipment_estimates/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.modal_is_saving=false;
                    this.modal=false;
                    this.$emit('addEquipmentEstimate');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.modal_is_saving=false;
                });
              }
          });
        },
        getFields(){
          this.is_saving=true;
          this.axios.get('maintenance/equipment_types/all').then(response => {
              this.equipment_types = response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
        deleteItem(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('equipment_estimates/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addEquipmentEstimate');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
          
        },
      }
    }
</script>
