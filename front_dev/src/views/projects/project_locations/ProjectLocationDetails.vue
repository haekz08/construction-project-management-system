<template>
  <div>
    <b-card no-body>
    <b-tabs pills card vertical nav-class="bg-secondary p-2" active-nav-item-class="bg-dark text-white"  nav-wrapper-class="nav-wrapper-custom-width">
      
      <b-tab title-item-class="mb-2">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Location Details</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="edit" />
            </div>
          </h6>
        </template>
        <b-card-text class="w-50">
          <project-location-form-component :project_location="project_location"/>
        </b-card-text>
      </b-tab>

      <b-tab title-item-class="mb-0" active>
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Structures</span>
            
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="map-marker" />
            </div>
          </h6>
        </template>
        
        <b-row class="m-0">
          <b-col class="p-0">
            <div class="card bg-light mb-3">
              <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h6 class="mb-0"><font-awesome-icon icon="map-marker" /> Structures</h6>
                  <b-button variant="secondary" size="sm" @click="add_project_location_structure_modal=true">
                      <font-awesome-icon icon="plus" /> Add New Structure
                  </b-button>
              </div>
              <div class="card-body bg-white">
                <table class="table border">
                  <thead class="bg-light text-dark">
                    <tr>
                      <th scope="col">Structure Description</th>
                      <th scope="col" class="text-center">Manpower Expenses</th>
                      <th scope="col" class="text-center">Equipment Expenses</th>
                      <th scope="col" class="text-center">Material Expenses</th>
                      <th scope="col" class="text-center">Other Expenses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(project_location_structure, index) in project_location.project_location_structures">
                      <th scope="row">{{project_location_structure.description}}</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td class="text-center">
                        <router-link :to="{ path: String(project_location_structure.id)}" append>
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
  <b-modal v-model="add_project_location_structure_modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
    <project-location-structure-form-component @addProjectLocationStructure="addProjectLocationStructure" />
  </b-modal>
  <!-- END OF CHECK OUT MODAL -->
  </div>
</template>
<script>
    //import ProjectFormComponent from './ProjectForm.vue';
    import ProjectLocationFormComponent from './ProjectLocationFormComponent.vue';
    import ProjectLocationStructureFormComponent from './project_location_structures/ProjectLocationStructureFormComponent.vue';
    export default {
      components: {ProjectLocationFormComponent,ProjectLocationStructureFormComponent},
      data() {
        return {
          project_location:{
            description:'',
            project_location_structures:[]
          },
          is_saving:false,
          add_project_location_structure_modal:false
        }
      },
      created(){
        this.get();
      },
      methods: {
          addProjectLocationStructure(){
            this.add_project_location_structure_modal=false;
            this.get();
          },
          get(){
            this.is_saving=true;
            this.axios.get('project/locations/get',{params:{id:this.$route.params.project_location_id}}).then(response => {
                this.project_location=response.data;
                this.is_saving=false;
            }).catch(error => console.log(error));
          },
      }
    }
</script>
<style scope>
.nav-wrapper-custom-width{
  width: 250px!important;
}
</style>
