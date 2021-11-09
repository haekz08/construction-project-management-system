<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add New Item</h6>
          </div>
          <div class="card-body bg-white">
            <b-row align-v="center" class="loader" v-if="is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            
              <!-- <b-progress
                variant="info"
                :value="(form.usage<=form.qty) ? form.usage : form.qty"
                :max="form.qty"
                show-progress
                animated
                height="2.5rem"
              >
                <b-progress-bar :value="(form.usage<=form.qty) ? form.usage : form.qty">
                  <strong class="h6">{{ form.usage }}</strong>
                </b-progress-bar>
              </b-progress> -->
              <b-row>
                <b-col cols="4">
                  <CRow>
                    <CCol>
                      <CWidgetBrand
                        color="facebook"
                        :rightHeader="form.qty"
                        rightFooter="ESTIMATE"
                        :leftHeader="form.usage"
                        leftFooter="USAGE"
                        class="w-100"
                      >
                      <div class="p-4 w-100">
                        <h1 class="mb-0"><number-format-component :input_value="Number(form.balance)" :currency="false"/></h1>
                        <h5>BALANCE</h5>
                      </div>
                      </CWidgetBrand>
                    </CCol>
                  </CRow>
                <b-form @submit="save">
                  <b-form-group
                    label="Month:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.transaction_date"
                      type="month"
                      required
                      size="sm"
                    ></b-form-input>
                  </b-form-group>
                  
                  <b-form-group
                    label="Estimated Qty:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.qty"
                      type="number"
                      step="any"
                      required
                      size="sm"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Details:"
                    description="This field is required"
                  >
                    <b-form-textarea
                      id="textarea"
                      v-model="form.details"
                      placeholder="Enter something..."
                      rows="3"
                      max-rows="6"
                      size="sm"
                    ></b-form-textarea>
                  </b-form-group>
                  <div class="text-right">
                    <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
                  </div>
                </b-form>
                </b-col>
                <b-col>
                  <div class="card bg-light mb-0">
                    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <h6 class="mb-0"><font-awesome-icon icon="check-square" /> Accomplishments</h6>
                    </div>
                    <div class="card-body bg-white position-relative">
                      
                      <b-row align-v="center" class="loader" v-if="is_saving_details">
                          <b-col>
                              <b-spinner></b-spinner>
                              <br><br>
                              <strong>Loading</strong>
                          </b-col>
                      </b-row>
                      <locked-component :status="(form.id==-1)" display_text="Save your monthly estimate first." />
                      <fieldset class="border p-3 mb-3 bg-light">
                        <legend class="w-auto bg-facebook px-3 py-1 text-white rounded border h5">DAILY ACCOMPLISHMENT</legend>
                        <b-form @submit="saveDetail">
                        <b-row>
                            <b-col>
                              <b-form-group
                                label="Date:"
                                description="This field is required"
                              >
                                <b-form-input
                                  v-model="progress_details_form.transaction_date"
                                  type="date"
                                  required
                                  size="sm"
                                ></b-form-input>
                              </b-form-group>
                            </b-col>
                            <b-col>
                              <b-form-group
                                label="Qty:"
                                description="This field is required"
                              >
                                <b-form-input
                                  v-model="progress_details_form.qty"
                                  type="number"
                                  step="any"
                                  required
                                  size="sm"
                                ></b-form-input>
                              </b-form-group>
                            </b-col>
                            <b-col>
                              <b-form-group
                                label="Details:"
                                description="This field is required"
                              >
                                <b-input-group size="sm">
                                  <template v-slot:append>
                                    <b-button type="submit" variant="facebook" size="sm"><font-awesome-icon icon="plus-circle" /> Add Accomplishment</b-button>
                                  </template>
                                  <b-form-input
                                    v-model="progress_details_form.details"
                                    type="text"
                                    required
                                    size="sm"
                                  ></b-form-input>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                        </b-row>
                        </b-form>
                      </fieldset>
                      <b-row>
                          <b-col class="px-3">
                            <table class="table border mb-0">
                              <thead class="bg-light text-dark">
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col" class="text-center">Qty</th>
                                  <th scope="col" class="text-center">Details</th>
                                  <th scope="col" class="text-center">Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(progress_detail, index) in form.progress_details">
                                  <th scope="row">{{progress_detail.transaction_date.other_formats.format_1}}</th>
                                  <td class="text-right">
                                    <number-format-component :input_value="Number(progress_detail.qty)" :currency="false"/>
                                  </td>
                                  <td class="text-right">
                                    {{progress_detail.details}}
                                  </td>
                                  <td class="text-center">
                                    <b-button type="submit" size="sm" variant="danger" @click="deleteDetail(progress_detail.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
              </b-row>

              
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js';
    import LockedComponent from '@/views/helpers/LockedComponent.vue';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,LockedComponent},
      props:{
          progress_id: {
              type: Number,
              default: () => -1,
              required:false
          }
      },
      data() {
        return {
          form: {
            id:-1,
            project_location_structure_item_id:this.$route.params.project_location_structure_item_id,
            transaction_date:'',
            qty:'',
            usage:0,
            balance:0,
            details:'',
            progress_details:[]
          },
          progress_details_form:{
            id:-1,
            transaction_date:'',
            qty:'',
            details:'',
            is_deleted:false
          },
          progress_details_form_copy:{},
          is_saving:false,
          is_saving_details:false,
          is_locked:false
        }
      },
      watch: {
        progress_id:{
            immediate: true,
            deep:true,
            handler(){
                this.get();
            }
        }
      },
      created(){
        console.log(this.progress_id)
        this.progress_details_form_copy = JSON.parse(JSON.stringify(this.progress_details_form));
      },
      methods: {
        save(){
          event.preventDefault();
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('progresses/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.form.id=response.data.id
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        },
        saveDetail(){
          event.preventDefault();
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving_details=true;
                let form = this.progress_details_form;
                form.progress_id=this.form.id;
                this.axios.post('progress_details/save',form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving_details=false;
                    this.progress_details_form = JSON.parse(JSON.stringify(this.progress_details_form_copy));
                    this.get();
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving_details=false;
                });
              }
          });
        },
        deleteDetail(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving_details=true;
                this.axios.delete('progress_details/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving_details=false;
                    this.get();
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving_details=false;
                });
              }
          });
        },
        get(){
          if(this.progress_id!=-1){
            this.is_saving=true;
            this.axios.get('progresses/get',{params:{id:this.progress_id}}).then(response => {
                let data = response.data;
                data.transaction_date = data.transaction_date.default;
                this.form=response.data;
                this.is_saving=false;
            }).catch(error => console.log(error));
          }
        },
      }
    }
</script>
