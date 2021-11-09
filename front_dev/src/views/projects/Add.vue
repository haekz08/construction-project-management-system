<template>
  <div>
    <b-row class="m-0">
      <b-col sm="4" class="p-0">
        <div class="card bg-light mb-3">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add New Record</h6>
          </div>
          <div class="card-body bg-white">
            <project-form-component />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
    import ProjectFormComponent from './ProjectForm.vue';
    export default {
      components: {ProjectFormComponent},
      data() {
        return {
        }
      },
      created(){
        
      },
      methods: {
          
      }
    }
</script>
