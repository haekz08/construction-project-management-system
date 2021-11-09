<template>
  <div class="p-2">
    <b-row class="mt-2">
      <b-col style="min-height:300px;">
        <b-row align-v="center" class="loader" v-if="is_loading">
            <b-col>
                <b-spinner></b-spinner>
                <br><br>
                <strong>Loading</strong>
            </b-col>
        </b-row>
        
        <div class="p-2 bg-white" v-if="typeof result.id != 'undefined'">
          <b-row>
              <b-col>
                  <h6><strong>Project Name :</strong> {{result.project_location_structure.project_location.project.title}}</h6> 
                  <h6><strong>Location :</strong> {{result.project_location_structure.project_location.description}}</h6> 
                  <h6><strong>Structure :</strong> {{result.project_location_structure.description}}</h6> 
              </b-col>
              <b-col>
                  <h6><strong>Item :</strong> {{result.description}}</h6> 
                  <h6><strong>Unit :</strong> {{result.item_unit.description}}</h6> 
                  <h6><strong>Qty :</strong> <number-format-component :input_value="Number(result.qty)" :currency="false"/></h6> 
              </b-col>
          </b-row>
          <table class="table table-bordered mb-0">
            <thead class="thead-dark">
              <tr class="text-center">
                <th class="text-center" colspan="5">
                  DETAILED ESTIMATE OF EQUIPMENT
                </th>
              </tr>
              <tr>
                <th class="text-center">
                  Equipment Name
                </th>
                <th class="text-center">
                  Number of Equipment
                </th>
                <th class="text-center">
                  Est. Duration (Hours)
                </th>
                <th class="text-center">
                  Hourly Rate
                </th>
                <th class="text-center">
                  Total Estimated Amount
                </th>
              </tr>
            </thead>
            <tr v-for="equipment_estimate in result.equipment_estimates">
                <th class="text-center">
                  {{equipment_estimate.equipment_type.description}}
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(equipment_estimate.qty)" :currency="false"/>
                </th>
                <th class="text-center">
                  {{equipment_estimate.duration_in_hour}}
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(equipment_estimate.hourly_rate)"/>
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(equipment_estimate.total)"/>
                </th>
              </tr>
              <tfoot class="thead-dark">
                <tr>
                  <th colspan="4">TOTAL AMOUNT FOR EQUIPMENT</th>
                  <th class="text-center"><number-format-component :input_value="Number(result.equipment_est.default)"/></th>
                </tr>
              </tfoot>
          </table>
          
          <table class="table table-bordered mb-0 mt-2">
            <thead class="thead-dark">
              <tr class="text-center">
                <th class="text-center" colspan="5">
                  DETAILED ESTIMATE OF MATERIALS
                </th>
              </tr>
              <tr>
                <th class="text-center">
                  Material Name
                </th>
                <th class="text-center">
                  Qty
                </th>
                <th class="text-center">
                  Unit
                </th>
                <th class="text-center">
                  Unit Cost
                </th>
                <th class="text-center">
                  Total Estimated Amount
                </th>
              </tr>
            </thead>
            <tr v-for="material_estimate in result.material_estimates">
                <th class="text-center">
                  {{material_estimate.material.name}}
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(material_estimate.qty)" :currency="false"/>
                </th>
                <th class="text-center">
                  {{material_estimate.material.material_unit.description}}
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(material_estimate.price)"/>
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(material_estimate.total)"/>
                </th>
              </tr>
              <tfoot class="thead-dark">
                <tr>
                  <th colspan="4">TOTAL AMOUNT FOR MATERIALS</th>
                  <th class="text-center"><number-format-component :input_value="Number(result.material_est.default)"/></th>
                </tr>
              </tfoot>
          </table>
          
          <table class="table table-bordered mb-0 mt-2">
            <thead class="thead-dark">
              <tr class="text-center">
                <th class="text-center" colspan="5">
                  DETAILED ESTIMATE OF LABOR
                </th>
              </tr>
              <tr>
                <th class="text-center">
                  Job Description
                </th>
                <th class="text-center">
                  Hourly Rate
                </th>
                <th class="text-center">
                  Est. Duration (Hours)
                </th>
                <th class="text-center">
                  Number of Manpower
                </th>
                <th class="text-center">
                  Total Estimated Amount
                </th>
              </tr>
            </thead>
            <tr v-for="labor_estimate in result.labor_estimates">
                <th class="text-center">
                  {{labor_estimate.job_description.description}}
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(labor_estimate.hourly_rate)"/>
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(labor_estimate.duration_in_hour)" :currency="false"/>
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(labor_estimate.qty)" :currency="false"/>
                </th>
                <th class="text-center">
                  <number-format-component :input_value="Number(labor_estimate.total)"/>
                </th>
              </tr>
              <tfoot class="thead-dark">
                <tr>
                  <th colspan="4">TOTAL AMOUNT FOR LABOR</th>
                  <th class="text-center"><number-format-component :input_value="Number(result.labor_est.default)"/></th>
                </tr>
              </tfoot>
          </table>
          <table class="table table-bordered mb-0 mt-2">
            <tr>
              <td class="text-right"><h4>TOTAL(EQUIPMENTS + MATERIALS + LABOR)</h4></td>
              <td class="text-right"><h4><number-format-component :input_value="Number(result.grand_total_est.default)"/></h4></td>
            </tr>
            <tr>
              <td class="text-right"><h4>UNIT COST</h4></td>
              <td class="text-right"><h4><number-format-component :input_value="Number(result.grand_total_est.default) / result.qty"/></h4></td>
            </tr>
          </table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent},
      data() {
        return {
          form:{
            id:this.$route.params.id,
          },
          is_loading:false,
          result:{}
        }
      },
      created(){
        this.get();
      },
      methods: {
        get(){
          this.is_loading=true;
          this.axios.get('reports/bill_of_materials',{params:this.form}).then(response => {
              this.result = response.data;
              this.is_loading=false;
          }).catch(error => console.log(error));
        }
      }
    }
</script>
