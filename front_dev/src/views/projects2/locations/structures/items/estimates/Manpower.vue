<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <!-- <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add New Item</h6>
          </div> -->
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Manpower</h6>
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
                  <th scope="col">Name</th>
                  <th scope="col" class="text-center">Job Description</th>
                  <th scope="col" class="text-center">Daily Rate</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(project_location_structure_item_manpower, index) in project_location_structure_item_manpowers">
                  <th scope="row">{{project_location_structure_item_manpower.manpower.full_name}}</th>
                  <td class="text-right">{{project_location_structure_item_manpower.job_description.description}}</td>
                  <td class="text-right"><number-format-component :input_value="Number(project_location_structure_item_manpower.daily_rate)"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(project_location_structure_item_manpower.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal v-model="modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
      <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Material Estimates</h6>
          </div>
          <div class="card-body bg-white position-relative p-2">
            <b-row align-v="center" class="loader" v-if="modal_is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <b-row class="m-0 border">
              <b-col cols="6" class="p-2 bg-dark">
                  <b-row class="m-0">
                      <b-col cols="1" class="text-center p-1 bg-success text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="search" class="h3 mb-0" />
                      </b-col>
                      <b-col class="p-2 bg-white">
                          <b-form-input v-model="search_key" type="text" debounce="500" placeholder="Search..." ></b-form-input>
                      </b-col>
                  </b-row>
                  <div class="list-group bg-white mt-2" style="max-height:260px;overflow-y: auto;">
                      <a href="#" class="list-group-item list-group-item-action" v-for="manpower in manpowers" @click.prevent="select(manpower)">{{manpower.full_name}}</a>
                  </div>
              </b-col>
              <b-col class="p-2">
                <b-form @submit="save">
                  <b-row class="m-0 border mb-3">
                      <b-col cols="2" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                          <font-awesome-icon icon="user" class="h2 mb-0" />
                      </b-col>
                      <b-col class="p-2 bg-white d-flex align-items-center">
                          <div>
                          <h6 class="mb-0 text-muted">Manpower Name</h6>
                          <h2 class="mb-0"><strong>{{form.manpower.full_name}}</strong></h2>
                          </div>
                      </b-col>
                  </b-row>

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


                  <div class="text-right">
                    <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
                  </div>
                </b-form>
              </b-col>
            </b-row>
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
          project_location_structure_item_manpowers: {
              type: Array,
              default: () => [],
              required:false
          }
      },
      data() {
        return {
          form: {
            id:-1,
            project_location_structure_item_id:this.$route.params.project_location_structure_item_id,
            manpower:{},
            manpower_id: '',
            job_description_id:'',
            daily_rate:'',
          },
          is_saving:false,
          modal_is_saving:false,
          manpowers:[],
          job_descriptions:[],
          modal:false,
          search_key:'',
        }
      },
      watch: {
        project_location_structure_item_manpowers:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        },
        search_key:{
            immediate: true,
            handler(){
                if(this.search_key!='')
                this.getManpowers();
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
                let new_form = JSON.parse(JSON.stringify(this.form));
                new_form.manpower_id = new_form.manpower.id;
                this.axios.post('project/location/structure/item/manpowers/save',new_form).then(response => {
                    this.swalTransactionCompleted();
                    this.modal_is_saving=false;
                    this.modal=false;
                    this.$emit('addManpower');
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
        getManpowers(){
            this.axios.get('maintenance/manpowers/search?search=' + this.search_key).then(response => {
                this.manpowers=response.data
            }).catch(error => console.log(error));
        },
        deleteItem(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('project/location/structure/item/manpowers/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addManpower');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
          
        },
        select(manpower){
            this.form.manpower=manpower;
            this.form.job_description_id=manpower.job_description_id;
        },
      }
    }
</script>
