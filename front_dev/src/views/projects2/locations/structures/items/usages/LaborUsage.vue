<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Labor Usage</h6>
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
            <table class="table table-bordered mb-0">
              <thead class="bg-light text-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col" class="text-center">Job Description</th>
                  <th scope="col" class="text-center">Daily Rate</th>
                  <th scope="col" class="text-center">Regular Hours</th>
                  <th scope="col" class="text-center">OT Hours</th>
                  <th scope="col" class="text-center">Total</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(manpower_usage, index) in manpower_usages">
                  <th scope="row">{{manpower_usage.manpower.full_name}}</th>
                  <th scope="row">{{manpower_usage.job_description.description}}</th>
                  <td class="text-right"><number-format-component :input_value="Number(manpower_usage.daily_rate)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(manpower_usage.regular_hours)" :currency="false"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(manpower_usage.ot_hours)" :currency="false"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(manpower_usage.total)"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(manpower_usage.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-light text-dark">
                <tr>
                  <th scope="col" class="text-right" colspan="5">TOTAL</th>
                  <th scope="col" class="text-right"><number-format-component :input_value="Number(total_usage)"/></th>
                  <th scope="col" class="text-center"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal v-model="modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
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
            <table class="table border">
              <thead class="bg-light text-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col" class="text-center">Job Description</th>
                  <th scope="col" class="text-center">Daily Rate</th>
                  <th scope="col" class="text-center">Regular Hours</th>
                  <th scope="col" class="text-center">OT Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(project_location_structure_item_manpower, index) in project_location_structure_item_manpowers">
                  <th scope="row">{{project_location_structure_item_manpower.manpower.full_name}}</th>
                  <td>
                    <select class="form-control" v-model="project_location_structure_item_manpower.job_description_id" required>
                        <option value="">Please Select</option>
                        <option v-for="job_description in job_descriptions" :value="job_description.id">
                            {{job_description.description}}
                        </option>
                    </select>
                  </td>
                  <td>
                    <b-form-input
                      v-model="project_location_structure_item_manpower.daily_rate"
                      type="number"
                      step="any"
                      required
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      v-model="project_location_structure_item_manpower.regular_hours"
                      type="number"
                      step="any"
                      required
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      v-model="project_location_structure_item_manpower.ot_hours"
                      type="number"
                      step="any"
                      required
                    ></b-form-input>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-right">
                <b-button type="submit" variant="dark" size="sm" @click="save()"><font-awesome-icon icon="save" /> Save</b-button>
              </div>
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
          manpower_usages: {
              type: Array,
              default: () => [],
              required:false
          },
          project_location_structure_item_manpowers: {
              type: Array,
              default: () => [],
              required:false
          },
          daily_log_id: {
              type: Number,
              required:false
          }
      },
      computed: {
          total_usage(){
              return this.manpower_usages.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      data() {
        return {
          is_saving:false,
          modal_is_saving:false,
          job_descriptions:[],
          modal:false
        }
      },
      watch: {
        manpower_usages:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        },
        project_location_structure_item_manpowers:{
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
                let form = {
                  project_location_structure_item_manpowers:this.project_location_structure_item_manpowers,
                  daily_log_id:this.daily_log_id
                }
                this.axios.post('daily_log/manpower_usages/save',form).then(response => {
                    this.swalTransactionCompleted();
                    this.modal_is_saving=false;
                    this.modal=false;
                    this.$emit('addLabor');
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
                this.axios.delete('daily_log/manpower_usages/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addLabor');
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
