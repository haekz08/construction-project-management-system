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
            <div class="card bg-light mb-3">
              <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h6 class="mb-0"><font-awesome-icon icon="map-marker" /> Project Locations</h6>
                  <b-button variant="secondary" size="sm" @click="add_project_location_modal=true">
                      <font-awesome-icon icon="plus" /> Add New Location
                  </b-button>
              </div>
              <div class="card-body bg-white">
                <table class="table border">
                  <thead class="bg-light text-dark">
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col" class="text-center">Location Description</th>
                      <th scope="col" class="text-center">Manpower Expenses</th>
                      <th scope="col" class="text-center">Equipment Expenses</th>
                      <th scope="col" class="text-center">Material Expenses</th>
                      <th scope="col" class="text-center">Other Expenses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(project_location, index) in project.project_locations">
                      <th scope="row">{{project_location.description}}</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td class="text-center">
                        <router-link :to="{ path: String(project_location.id)}" append>
                            <b-button type="submit" size="sm" variant="info" class="mr-2"><font-awesome-icon icon="edit" /> View</b-button>
                        </router-link>
                        <b-button type="submit" size="sm" variant="danger"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-col>
        </b-row>
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
    import ProjectFormComponent from './ProjectForm.vue';
    import ProjectLocationFormComponent from './project_locations/ProjectLocationFormComponent.vue';
    export default {
      components: {ProjectFormComponent,ProjectLocationFormComponent},
      props: ['project'],
      data() {
        return {
          add_project_location_modal:false
        }
      },
      created(){
      },
      methods: {
          addProjectLocation(){
            this.add_project_location_modal=false;
            this.$emit('addProjectLocation');
          }
      }
    }
</script>
<style scope>
.nav-wrapper-custom-width{
  width: 250px!important;
}
</style>
