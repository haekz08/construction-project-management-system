<template>
  <div>
    <b-row class="m-0">
      <b-col sm="12" class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="users" /> tool Designation</h6>
          </div>
          <div class="card-body p-3">
            <b-form @submit.prevent="save">
              <b-row>
                <b-col cols="3">
                  <b-form-group
                    label="Designate to:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <template v-slot:append>
                        <b-button @click="manpower_modal=true" type="button" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select Employee</b-button>
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
                    label="Current Location:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <template v-slot:append>
                        <b-button type="button" @click="project_modal=true" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select Location</b-button>
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
                  
                  <b-form-group
                    label="Date:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.transaction_date"
                      type="date"
                      required
                    ></b-form-input>
                  </b-form-group>
                  
                  <b-form-group
                    label="Time:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.transaction_time"
                      type="time"
                      required
                    ></b-form-input>
                  </b-form-group>
                  
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
                <b-col>
                  <b-row class="m-0 border mb-3">
                    <b-col cols="1" class="text-center p-2 bg-facebook text-white d-flex align-items-center justify-content-center">
                        <font-awesome-icon icon="wrench" class="h2 mb-0" />
                    </b-col>
                    <b-col class="p-3 bg-white d-flex align-items-center">
                        <div>
                        <h5 class="mb-0"><strong>{{tool.tool_type.description}} | {{tool.code}}</strong></h5>
                        <small class="text-muted text-uppercase font-weight-bold">tool</small>
                        </div>
                    </b-col>
                  </b-row>
                  <div class="card bg-light mb-0">
                    <div class="card-header bg-dark text-white">
                        <h6 class="mb-0"><font-awesome-icon icon="list" /> Designation History</h6>
                    </div>
                    <div class="card-body p-3 bg-white">
                      <table class="table table-bordered mb-0 table-sm">
                        <thead class="bg-light text-dark">
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">Date & Time</th>
                            <th scope="col" class="text-center">Designated To</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          <template v-for="(tool_designation, index) in tool_designations">
                          <tr>
                            <td class="text-center">
                              
                              <b-button size="sm" variant="info" @click="tool_designation.show_details=!tool_designation.show_details"><font-awesome-icon icon="info-circle" /></b-button>
                            </td>
                            <th scope="row">
                              {{tool_designation.transaction_date.other_formats.format_1}} | {{tool_designation.transaction_time.other_formats.format_1}}
                            </th>
                            <td>
                              {{tool_designation.manpower.full_name}} - {{tool_designation.show_details}}
                              <template v-if="tool_designation.is_active==1">
                                | <b-badge variant="success" class="cursor-pointer">Accountable</b-badge>
                              </template>
                            </td>
                          </tr>
                          
                          <tr v-show="tool_designation.show_details">
                            <td colspan="4">
                              <b-collapse v-model="tool_designation.show_details" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                  <template v-if="tool_designation.project_location_structure_item !== null">
                                    <h6>Project : <strong>{{tool_designation.project_location_structure_item.project_location_structure.project_location.project.title}}</strong></h6>
                                    <h6>Location : <strong>{{tool_designation.project_location_structure_item.project_location_structure.project_location.description}}</strong></h6>
                                    <h6>Structure : <strong>{{tool_designation.project_location_structure_item.project_location_structure.description}}</strong></h6>
                                    <h6>Item : <strong>{{tool_designation.project_location_structure_item.description}}</strong></h6>
                                  </template>
                                  <template v-else>
                                    <strong>Main Office</strong>
                                  </template>
                                  <hr>
                                  <h6><strong>Details:</strong></h6>
                                  {{tool_designation.remarks}}
                                  </b-card-body>
                              </b-collapse>
                            </td>
                          </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
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
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import ProjectModal from '@/views/helpers/ProjectModal.vue';
    import ManpowerModal from '@/views/helpers/ManpowerModal.vue';
    export default {
      mixins:[SwalMixin],
      components: {ProjectModal,ManpowerModal},
      props:{
          tool: {
              type: Object,
              default: () => {}
          },
      },
      data() {
        return {
          form: {
            id:-1,
            project_location_structure_item_id:'',
            project_location_structure_item:{},
            manpower:{},
            manpower_id:-1,
            transaction_date:'',
            transaction_time:'',
            remarks:''
          },
          project_modal:false,
          manpower_modal:false,
          is_saving:false,
          tool_designations:[]
        }
      },
      watch: {
        tool:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        }
      },
      created(){
        let data = JSON.parse(JSON.stringify(this.tool.tool_designations));
        data.forEach((e) => {
                e.show_details=false;
              });
        this.tool_designations=data;
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
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                let form = JSON.parse(JSON.stringify(this.form));
                form.tool_id = this.tool.id;
                this.axios.post('tool_designations/save',form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('save');
                    
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
