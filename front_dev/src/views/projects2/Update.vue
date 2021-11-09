<template>
  <div>
    <b-row class="m-0 mb-3">
        <b-col cols="8" class="p-0">
            <b-row class="m-0">
              <b-col cols="1" class="text-center p-2 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="road" class="h2 mb-0" />
              </b-col>
              <b-col class="p-3 bg-facebook text-white d-flex align-items-center">
                  <div>
                  <h4 class="mb-0"><strong>{{project.title}}</strong></h4>
                  <small class="text-muted text-uppercase font-weight-bold">PROJECT TITLE</small>
                  </div>
              </b-col>
          </b-row>
        </b-col>
        <b-col class="p-0 pl-3">
            <b-row class="m-0 h-100">
              <b-col cols="2" class="text-center p-2 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="chart-pie" class="h2 mb-0" />
              </b-col>
              <b-col class="p-3 bg-facebook text-white d-flex align-items-center">
                  <div>
                  <h4 class="mb-0"><strong><number-format-component :input_value="Number(project.grand_total.default)"/> of <b-badge variant="info"><number-format-component :input_value="Number(project.grand_total_est.default)"/></b-badge></strong></h4>
                  <small class="text-muted text-uppercase font-weight-bold">PROJECT TOTAL COST</small>
                  </div>
              </b-col>
          </b-row>
        </b-col>
    </b-row>
    
    <div class="card-group mb-3">
      <div class="card">
        <div class="card-block p-3">
          <div class="h1 text-muted text-right mb-2">
            <font-awesome-icon icon="users" class="text-info"/>
          </div>
          <div class="h5 mb-0"><number-format-component :input_value="Number(project.labor.default)"/> of <b-badge variant="info"><number-format-component :input_value="Number(project.labor_est.default)"/></b-badge></div>
          <small class="text-muted text-uppercase font-weight-bold">Manpower Total Expenses</small>
          <div class="progress progress-xs mt-1 mb-0">
            <div class="progress-bar bg-info" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-block p-3">
          <div class="h1 text-muted text-right mb-2">
            <font-awesome-icon icon="truck" class="text-success"/>
          </div>
          <div class="h5 mb-0"><number-format-component :input_value="Number(project.equipment.default)"/> of <b-badge variant="info"><number-format-component :input_value="Number(project.equipment_est.default)"/></b-badge></div>
          <small class="text-muted text-uppercase font-weight-bold">Equipment Total Expenses</small>
          <div class="progress progress-xs mt-1 mb-0">
            <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-block p-3">
          <div class="h1 text-muted text-right mb-2">
            <font-awesome-icon icon="cubes" class="text-warning"/>
          </div>
          <div class="h5 mb-0"><number-format-component :input_value="Number(project.material.default)"/> of <b-badge variant="info"><number-format-component :input_value="Number(project.material_est.default)"/></b-badge></div>
          <small class="text-muted text-uppercase font-weight-bold">Material Total Expenses</small>
          <div class="progress progress-xs mt-1 mb-0">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-block p-3">
          <div class="h1 text-muted text-right mb-2">
            <font-awesome-icon icon="list-ol" class="text-primary"/>
          </div>
          <div class="h5 mb-0"><number-format-component :input_value="Number(project.other_expense.default)"/></div>
          <small class="text-muted text-uppercase font-weight-bold">Other Total Expenses</small>
          <div class="progress progress-xs mt-1 mb-0">
            <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-block p-3">
          <div class="h1 text-muted text-right mb-2">
            <font-awesome-icon icon="paperclip" class="text-danger"/>
          </div>
          <div class="h5 mb-0"><number-format-component :input_value="Number(project.indirect_expense.default)"/></div>
          <small class="text-muted text-uppercase font-weight-bold">Indirect Expenses</small>
          <div class="progress progress-xs mt-1 mb-0">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>

    
    <router-view :project="project" @addProjectLocation="addProjectLocation"></router-view>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      components: {NumberFormatComponent},
      data() {
        return {
          project:{
            title:'',
            project_locations:[],
            grand_total:'',
            grand_total_est :'',
            labor:'',
            material:'',
            equipment:'',
            other_expense:'',
            labor_est:'',
            material_est:'',
            equipment_est:'',
            other_expense_est:'',
            price:'',
          }
        }
      },
      created(){
        this.get();
        bus.$on('refreshComputations', ()=>{
            this.get();
        });
      },
      methods: {
        get(){
          this.is_saving=true;
          this.axios.get('projects/get',{params:{id:this.$route.params.id}}).then(response => {
              this.project=response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
        addProjectLocation(){
          this.get();
        },
      }
    }
</script>