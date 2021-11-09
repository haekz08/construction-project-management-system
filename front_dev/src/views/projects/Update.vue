<template>
  <div>
    <b-row class="m-0 mb-3">
        <b-col cols="8" class="p-0">
            <b-row class="m-0">
              <b-col cols="1" class="text-center p-2 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="road" class="h2 mb-0" />
              </b-col>
              <b-col class="p-3 bg-white d-flex align-items-center">
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
              <b-col class="p-3 bg-white d-flex align-items-center">
                  <div>
                  <h4 class="mb-0"><strong>asdas</strong></h4>
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
          <div class="h4 mb-0">87.500</div>
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
          <div class="h4 mb-0">385</div>
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
          <div class="h4 mb-0">1238</div>
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
          <div class="h4 mb-0">28%</div>
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
          <div class="h4 mb-0">5:34:11</div>
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
    export default {
      data() {
        return {
          project:{
            title:'',
            project_locations:[]
          }
        }
      },
      created(){
        this.get();
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
        }
      }
    }
</script>