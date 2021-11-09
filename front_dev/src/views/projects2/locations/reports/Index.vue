<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="chart-pie" /> Reports</h6>
          </div>
          <div class="card-body bg-white">
            <div class="list-group">
              <!--<a href="#" @click.prevent="workAccomplishment()" class="list-group-item list-group-item-action">Work Accomplishment Report</a>-->
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    export default {
      mixins:[SwalMixin],
      props:{
          project_location: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
        }
      },
      watch: {
        project_location:{
            immediate: true,
            deep:true,
            handler(){
            }
        }
      },
      created(){
      },
      methods: {
        workAccomplishment(){
          let route = this.$router.resolve({path: '/reports/work-accomplishment-per-structure/'+this.project_location.id});
          window.open(route.href, '_blank');
        },
      }
    }
</script>
