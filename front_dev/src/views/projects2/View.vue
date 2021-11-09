<template>
  <div>
    <b-card no-body>
    <b-tabs pills card vertical nav-class="bg-secondary p-2" active-nav-item-class="bg-dark text-white"  nav-wrapper-class="nav-wrapper-custom-width">
      
      <b-tab title-item-class="mb-2">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Project Details</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="edit" />
            </div>
          </h6>
        </template>
        <b-card-text>
          <b-row class="m-0">
            <b-col sm="6" class="p-0">
              <div class="card bg-light mb-3">
                <div class="card-header bg-dark text-white">
                    <h6 class="mb-0"><font-awesome-icon icon="edit" /> Update Project Details</h6>
                </div>
                <div class="card-body bg-white">
                  <project-form-component :project="project"/>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
      </b-tab>

      <b-tab title-item-class="mb-0" active>
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Project Locations</span>
            
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="map-marker" />
            </div>
          </h6>
        </template>
        
        <b-row class="m-0">
          <b-col class="p-0">
            <div class="card bg-light">
              <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h6 class="mb-0"><font-awesome-icon icon="map-marker" /> Project Locations</h6>
                  <b-button variant="secondary" size="sm" @click="add_project_location_modal=true">
                      <font-awesome-icon icon="plus" /> Add New Location
                  </b-button>
              </div>
              <div class="card-body bg-white">
                <table class="table border mb-0">
                  <thead class="bg-light text-dark">
                    <tr>
                      <th scope="col">Location Description</th>
                      <th scope="col" class="text-center">Manpower Expenses</th>
                      <th scope="col" class="text-center">Equipment Expenses</th>
                      <th scope="col" class="text-center">Material Expenses</th>
                      <th scope="col" class="text-center">Other Expenses</th>
                      <th scope="col" class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(project_location, index) in project.project_locations">
                      <th scope="row">{{project_location.description}}</th>
                      <td class="text-right"><number-format-component :input_value="Number(project_location.labor.default)"/></td>
                      <td class="text-right"><number-format-component :input_value="Number(project_location.equipment.default)"/></td>
                      <td class="text-right"><number-format-component :input_value="Number(project_location.material.default)"/></td>
                      <td class="text-right"><number-format-component :input_value="Number(project_location.other_expense.default)"/></td>
                      <td class="text-center">
                        <router-link :to="{ path: String(project_location.id)}" append>
                            <b-button type="submit" size="sm" variant="info" class="mr-2"><font-awesome-icon icon="edit" /> View</b-button>
                        </router-link>
                        <b-button type="submit" size="sm" variant="danger" @click="deleteRow(project_location.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title-item-class="mb-2" v-if="project.is_project_owner">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>User Access</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="lock" />
            </div>
          </h6>
        </template>
        <b-card-text>
          <b-row class="m-0">
            <b-col sm="6" class="p-0">
              <div class="card bg-light mb-3">
                <div class="card-header bg-dark text-white">
                    <h6 class="mb-0"><font-awesome-icon icon="lock" /> Update User Access</h6>
                </div>
                <div class="card-body bg-white">
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="row in authorized_users">
                      
                      <h6>{{row.full_name}}</h6>
                      <label class="c-switch c-switch-pill c-switch-success">
                        <input type="checkbox" class="c-switch-input" v-model="row.is_selected">
                        <span class="c-switch-slider"></span>
                      </label>
                    </li>
                  </ul>
                  <div class="text-right mt-3">
                    <b-button type="submit" variant="dark" size="sm" @click="save()"><font-awesome-icon icon="save" /> Save</b-button>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card-text>
      </b-tab>
      <b-tab title-item-class="mb-2" v-if="project.is_project_owner">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Indirect Expenses</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="list" />
            </div>
          </h6>
        </template>
        <b-card-text>
          <indirect-expense-component :project="project"/>
        </b-card-text>
      </b-tab>
      <b-tab title-item-class="mb-2" v-if="project.is_project_owner">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Indirect Logs</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="list" />
            </div>
          </h6>
        </template>
        <b-card-text>
          <indirect-log-component :project="project"/>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
  
  <!-- START OF CHECK OUT MODAL -->
  <b-modal v-model="add_project_location_modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
    <project-location-form-component @addProjectLocation="addProjectLocation" />
  </b-modal>
  <!-- END OF CHECK OUT MODAL -->
  </div>
</template>
<script>
    import {bus} from '@/main.js'
    import ProjectFormComponent from './Form.vue';
    import IndirectExpenseComponent from './indirect_expenses/Index.vue';
    import IndirectLogComponent from './indirect_expenses/Log.vue';
    import ProjectLocationFormComponent from './locations/Form.vue';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import SwalMixin from '@/views/mixins/Swal.js'
    export default {
      components: {ProjectFormComponent,ProjectLocationFormComponent,NumberFormatComponent,IndirectExpenseComponent,IndirectLogComponent},
      props: ['project'],
      mixins:[SwalMixin],
      data() {
        return {
          add_project_location_modal:false,
          authorized_users:[]
        }
      },
      created(){
        this.getFields();
      },
      methods: {
          addProjectLocation(){
            this.add_project_location_modal=false;
            this.$emit('addProjectLocation');
          },
          getFields() {
            this.axios.get("users/all").then((response) => {
              let data = JSON.parse(JSON.stringify(response.data));;
              data.forEach((value, index) => {
                let check = this.project.users.find(
                  (x) => x.id === value.id
                );
                if (check) {
                  value.is_selected = true;
                } else {
                  value.is_selected = false;
                }
              });
              this.authorized_users = data;
            }).catch((error) => console.log(error));
          },
          save() {
            this.swalConfirmSubmit((data) => {
              if (data.value) {
                this.is_saving = true;
                let form = {
                  id:this.project.id,
                  users:this.authorized_users
                }
                this.axios.post("projects/save_access", form).then((response) => {
                    this.swalTransactionCompleted();
                    this.is_saving = false;
                  })
                  .catch((error) => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving = false;
                  });
              }
            });
          },
          deleteRow(row_id){
            this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('project/locations/delete',{ data: {id:row_id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    bus.$emit('refreshComputations');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
            });
          }
      }
    }
</script>
<style scope>
.nav-wrapper-custom-width{
  width: 250px!important;
}
</style>
