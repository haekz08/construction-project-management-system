<template>
  <div>
    <b-row class="m-0">
      <b-col sm="4" class="p-0">
        <div class="card bg-light mb-3">
          <div class="card-header bg-dark text-white">
            <h6 class="mb-0"><font-awesome-icon icon="edit" /> Update Record</h6>
          </div>
          <div class="card-body position-relative">
            <form-component/>
          </div>
        </div>
      </b-col>
      <b-col class="p-0 pl-2">
        <div class="card bg-light mb-3">
          <div class="card-header bg-dark text-white">
            <h6 class="mb-0"><font-awesome-icon icon="list" /> Manpower Records</h6>
          </div>
          <div class="card-body position-relative">
            <manpower-record/>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
    import FormComponent from './Form.vue';
    import ManpowerRecord from './ManpowerRecord.vue';
    export default {
      components: {FormComponent,ManpowerRecord},
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
