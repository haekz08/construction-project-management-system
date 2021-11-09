<template>
  <div class="p-2">
    <b-form @submit.prevent="generate">
    <h3 class="text-center">MONTHLY COST FORECAST REPORT (per item)</h3>
    <div class="d-flex justify-content-center">
      <div class="input-group w-50">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Input Date Range</span>
        </div>
        <input type="date" class="form-control" placeholder="Date From" v-model="form.from">
        <input type="date" class="form-control" placeholder="Date To" v-model="form.to">
        <div class="input-group-append">
          <button class="btn btn-info" type="submit"><font-awesome-icon icon="check-circle" /> GENERATE</button>
        </div>
      </div>
    </div>
    </b-form>
    <b-row class="mt-2">
      <b-col style="min-height:300px;">
        <b-row align-v="center" class="loader" v-if="is_loading">
            <b-col>
                <b-spinner></b-spinner>
                <br><br>
                <strong>Loading</strong>
            </b-col>
        </b-row>
        <h3 class="text-center">Structure Name : {{details.description}}</h3>
        <div class="p-2 bg-white" v-if="result.length >0" style="overflow-x: auto">
          <table class="table table-bordered ">
            <thead>
            <tr class="table-head-style">
              <th class="text-center" rowspan="2">Item Name</th>
              <th class="text-center" colspan="5">Materials</th>
              <th class="text-center" colspan="5">Labor</th>
              <th class="text-center" colspan="5">Equiment</th>
              <th class="text-center" colspan="7">Total</th>
            </tr>
            <tr class="table-head-style">
              <th class="text-center">Budget</th>
              <th class="text-center">Cost to Date</th>
              <th class="text-center">Est. to Complete</th>
              <th class="text-center">Variance</th>
              <th class="text-center">% Weight</th>

              <th class="text-center">Budget</th>
              <th class="text-center">Cost to Date</th>
              <th class="text-center">Est. to Complete</th>
              <th class="text-center">Variance</th>
              <th class="text-center">% Weight</th>

              <th class="text-center">Budget</th>
              <th class="text-center">Cost to Date</th>
              <th class="text-center">Est. to Complete</th>
              <th class="text-center">Variance</th>
              <th class="text-center">% Weight</th>

              <th class="text-center">Budget</th>
              <th class="text-center">Cost to Date</th>
              <th class="text-center">Est. to Comlete</th>
              <th class="text-center">Est. Final Cost</th>
              <th class="text-center">Est. Variance</th>
              <th class="text-center">Percent Complete</th>
              <th class="text-center">Actual Percent Complete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in result">
              <td><button class="btn btn-primary">{{row.description}}</button></td>
              <td class="text-right"><number-format-component :input_value="Number(row.material_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.material.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.material_est.default - row.material.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.material.default - row.material_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.material_weight)" :currency="false"/> %</td>


              <td class="text-right"><number-format-component :input_value="Number(row.labor_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.labor.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.labor_est.default - row.labor.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.labor.default - row.labor_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.labor_weight)" :currency="false"/>%</td>

              <td class="text-right"><number-format-component :input_value="Number(row.equipment_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.equipment.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.equipment_est.default - row.equipment.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.equipment.default - row.equipment_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.equipment_weight)" :currency="false"/>%</td>

              <td class="text-right"><number-format-component :input_value="Number(row.grand_total_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.grand_total.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.grand_total_est.default - row.grand_total.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.grand_total.default - row.grand_total_est.default)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.total_weight)" :currency="false"/>%</td>
              <td class="text-right"><number-format-component :input_value="Number((row.grand_total_est.default - row.grand_total.default)/row.grand_total_est.default)" :currency="false"/>%</td>
              <td class="text-right"><number-format-component :input_value="Number(row.grand_total.default/row.grand_total_est.default)" :currency="false"/>%</td>
            </tr>
            </tbody>
            <tfoot>
            <th class="text-right">TOTAL</th>
            <th class="text-right"><number-format-component :input_value="Number(col_1)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_2)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_3)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_4)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_5)"  :currency="false"/>%</th>
            <th class="text-right"><number-format-component :input_value="Number(col_6)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_7)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_8)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_9)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_10)"  :currency="false"/>%</th>
            <th class="text-right"><number-format-component :input_value="Number(col_11)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_12)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_13)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_14)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_15)"  :currency="false"/>%</th>
            <th class="text-right"><number-format-component :input_value="Number(col_16)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_17)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_18)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_19)" /></th>
            <th class="text-right"><number-format-component :input_value="Number(col_20)"  :currency="false"/>%</th>
            <th class="text-right"><number-format-component :input_value="Number(col_21)" :currency="false" />%</th>
            <th class="text-right"><number-format-component :input_value="Number(col_22)" :currency="false" />%</th>
            </tfoot>
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
            from:'',
            to:''
          },
          is_loading:false,
          result:[],
          details:{}
        }
      },
      created(){
      },
      computed: {
        col_1(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.material_est.default);
          },0);
        },
        col_2(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.material.default);
          },0);
        },
        col_3(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.material_est.default - row.material.default);
          },0);
        },
        col_4(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.material.default - row.material_est.default);
          },0);
        },
        col_5(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.material_weight);
          },0);
        },
        col_6(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.labor_est.default);
          },0);
        },
        col_7(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.labor.default);
          },0);
        },
        col_8(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.labor_est.default - row.labor.default);
          },0);
        },
        col_9(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.labor.default - row.labor_est.default);
          },0);
        },
        col_10(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.labor_weight);
          },0);
        },
        col_11(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.equipment_est.default);
          },0);
        },
        col_12(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.equipment.default);
          },0);
        },
        col_13(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.equipment_est.default - row.equipment.default);
          },0);
        },
        col_14(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.equipment.default - row.equipment_est.default);
          },0);
        },
        col_15(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.equipment_weight);
          },0);
        },
        col_16(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.grand_total_est.default);
          },0);
        },
        col_17(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.grand_total.default);
          },0);
        },
        col_18(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.grand_total_est.default - row.grand_total.default);
          },0);
        },
        col_19(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.grand_total.default - row.grand_total_est.default);
          },0);
        },
        col_20(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.total_weight);
          },0);
        },
        col_21(){
          return this.result.reduce((total, row)=>{
            return total + Number((row.grand_total_est.default - row.grand_total.default)/row.grand_total_est.default);
          },0);
        },
        col_22(){
          return this.result.reduce((total, row)=>{
            return total + Number(row.grand_total.default/row.grand_total_est.default);
          },0);
        },
      },
      methods: {
        generate(){
          this.is_loading=true;
          this.axios.get('reports/cost-forecast-per-item',{params:this.form}).then(response => {
            this.result = response.data.project_location_structure_items;
            this.details = response.data;
              this.is_loading=false;
          }).catch(error => console.log(error));
        }
      }
    }
</script>
