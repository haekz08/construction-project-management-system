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
              <a href="#" @click.prevent="progressReport()" class="list-group-item list-group-item-action">Progress Report</a>
              <a href="#" @click.prevent="billOfMaterials()" class="list-group-item list-group-item-action">Bill of Materials</a>
              <a href="#" @click.prevent="detailedEstimate()" class="list-group-item list-group-item-action">Detailed Estimate</a>
              <a href="#" @click.prevent="materialInventory()" class="list-group-item list-group-item-action">Material Inventory</a>
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
          project_location_structure_item: {
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
        project_location_structure_item:{
            immediate: true,
            deep:true,
            handler(){
            }
        }
      },
      created(){
      },
      methods: {
        progressReport(){
          let route = this.$router.resolve({path: '/reports/progress/'+this.project_location_structure_item.id});
          window.open(route.href, '_blank');
        },
        billOfMaterials(){
          let route = this.$router.resolve({path: '/reports/bill-of-materials/'+this.project_location_structure_item.id});
          window.open(route.href, '_blank');
        },
        detailedEstimate(){
          let route = this.$router.resolve({path: '/reports/detailed-estimate/'+this.project_location_structure_item.id});
          window.open(route.href, '_blank');
        },
        materialInventory(){
          let route = this.$router.resolve({path: '/reports/material-inventory/'+this.project_location_structure_item.id});
          window.open(route.href, '_blank');
        },
      }
    }
</script>
