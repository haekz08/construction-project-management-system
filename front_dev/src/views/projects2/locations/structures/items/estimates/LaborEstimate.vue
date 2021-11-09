<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Labor Estimates</h6>
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
                  <th scope="col">Job Description</th>
                  <th scope="col" class="text-center">Daily Rate</th>
                  <th scope="col" class="text-center">Hourly Rate</th>
                  <th scope="col" class="text-center">Est. Duration (Hours)</th>
                  <th scope="col" class="text-center">Number of Manpower</th>
                  <th scope="col" class="text-center">Total</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(labor_estimate, index) in labor_estimates">
                  <th scope="row">{{labor_estimate.job_description.description}}</th>
                  <td class="text-right"><number-format-component :input_value="Number(labor_estimate.daily_rate)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(labor_estimate.hourly_rate)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(labor_estimate.duration_in_hour)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(labor_estimate.qty)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(labor_estimate.total)"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(labor_estimate.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-light text-dark">
                <tr>
                  <th scope="col" class="text-right" colspan="5">TOTAL EST. AMOUNT FOR LABOR</th>
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
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Labor Estimates</h6>
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
                label="Job Description:"
                description="This field is required"
              >
                <select class="form-control" v-model="form.job_description_id" required>
                    <option value="">Please Select</option>
                    <option v-for="job_description in job_descriptions" :value="job_description.id">
                        {{job_description.description}}
                    </option>
                </select>
              </b-form-group>

              <b-form-group
                label="Daily Rate:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.daily_rate"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
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
                label="Number of Manpower:"
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
          labor_estimates: {
              type: Array,
              default: () => [],
              required:false
          }
      },
      computed: {
          total_estimate(){
              return this.labor_estimates.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      data() {
        return {
          form: {
            id:-1,
            project_location_structure_item_id:this.$route.params.project_location_structure_item_id,
            job_description_id: '',
            daily_rate:'',
            hourly_rate:'',
            duration_in_hour:'',
            qty:'',
            total:''
          },
          is_saving:false,
          modal_is_saving:false,
          job_descriptions:[],
          modal:false
        }
      },
      watch: {
        labor_estimates:{
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
                this.axios.post('labor_estimates/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.modal_is_saving=false;
                    this.modal=false;
                    this.$emit('addLaborEstimate');
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
          this.axios.get('maintenance/job_descriptions/all').then(response => {
              this.job_descriptions = response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
        deleteItem(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('labor_estimates/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addLaborEstimate');
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
