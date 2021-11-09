<template>
  <div>
    <bread-crumbs/>
    <b-card no-body>
    <b-tabs pills card vertical nav-class="bg-secondary p-2" active-nav-item-class="bg-dark text-white"  nav-wrapper-class="nav-wrapper-custom-width">
      
      <b-tab title-item-class="mb-2">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Item Details</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="edit" />
            </div>
          </h6>
        </template>
        <b-card-text class="w-50">
          <project-location-structure-form-component :project_location_structure_item="project_location_structure_item"/>
        </b-card-text>
      </b-tab>

      <b-tab title-item-class="mb-2">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Estimates</span>
            
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="list" />
            </div>
          </h6>
        </template>
        
        <b-tabs content-class="mt-3">
          <b-tab title="Labor" active>
            <labor-estimate :labor_estimates="project_location_structure_item.labor_estimates" @addLaborEstimate="get()"/>
          </b-tab>
          <b-tab title="Equipment">
            <equipment-estimate :equipment_estimates="project_location_structure_item.equipment_estimates" @addEquipmentEstimate="get()"/>
          </b-tab>
          <b-tab title="Material">
            <material-estimate :material_estimates="project_location_structure_item.material_estimates" @addMaterialEstimate="get()"/>
          </b-tab>
        </b-tabs>
      </b-tab>
      
      <b-tab title-item-class="mb-0">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Manpower</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="users" />
            </div>
          </h6>
        </template>
        <manpower :project_location_structure_item_manpowers="project_location_structure_item.project_location_structure_item_manpowers" @addManpower="get()"/>
      </b-tab>

      <b-tab title-item-class="mb-0" active>
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Usage</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="chart-line" />
            </div>
          </h6>
        </template>
        <usages-index :project_location_structure_item="project_location_structure_item"/>
      </b-tab>

      <b-tab title-item-class="mb-0">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Current Inventory</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="cubes" />
            </div>
          </h6>
        </template>
        <inventory :inventory="inventory"/>
      </b-tab>

      <b-tab title-item-class="mb-0">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Progress</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="check-square" />
            </div>
          </h6>
        </template>
        <progress-report :project_location_structure_item="project_location_structure_item" @refresh="get()"/>
      </b-tab>

      <b-tab title-item-class="mb-2">
        <template slot="title">
          <h6 class="mb-0 p-2 d-flex justify-content-between align-items-center">
            <span>Reports</span>
            <div class="text-center" style="width:25px">
              <font-awesome-icon icon="chart-pie" />
            </div>
          </h6>
        </template>
        <b-card-text class="w-50">
          <reports :project_location_structure_item="project_location_structure_item" />
        </b-card-text>
      </b-tab>

    </b-tabs>
  </b-card>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import LaborEstimate from './estimates/LaborEstimate.vue';
    import EquipmentEstimate from './estimates/EquipmentEstimate.vue';
    import MaterialEstimate from './estimates/MaterialEstimate.vue';
    import Manpower from './estimates/Manpower.vue';
    import UsagesIndex from './usages/Index.vue';
    import Inventory from './inventory/Index.vue';
    import ProgressReport from './progress/Index.vue';
    import ProjectLocationStructureFormComponent from './Form.vue';
    import Reports from './reports/Index.vue';
    import BreadCrumbs from '@/views/helpers/BreadCrumbs.vue';
    export default {
      components: {BreadCrumbs,ProjectLocationStructureFormComponent,LaborEstimate,EquipmentEstimate,MaterialEstimate,Manpower,UsagesIndex,Inventory,ProgressReport,Reports},
      data() {
        return {
          project_location_structure_item:{
            description:'',
            labor_estimates:[],
            equipment_estimates:[],
            material_estimates:[],
            project_location_structure_item_manpowers:[]
          },
          inventory:[],
          is_saving:false,
        }
      },
      created(){
        this.get();
        bus.$on('refreshComputations', (data)=>{
            this.get();
        });
      },
      methods: {
          addProjectLocationStructureItem(){
            this.add_project_location_structure_item_modal=false;
          },
          get(){
            this.is_saving=true;
            this.axios.get('project/location/structure/items/get',{params:{id:this.$route.params.project_location_structure_item_id}}).then(response => {
                this.project_location_structure_item=response.data.details;
                this.inventory=response.data.materials;
                this.is_saving=false;
            }).catch(error => console.log(error));
          },
      }
    }
</script>
<style scope>
</style>
