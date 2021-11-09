<template>
  <div class="p-2">
    <h3 class="text-center">PROJECT BUDGET FOR <span class="text-uppercase">{{result.description}}</span></h3>
    <b-row class="mt-2">
      <b-col style="min-height:300px;">
        <b-row align-v="center" class="loader" v-if="is_loading">
            <b-col>
                <b-spinner></b-spinner>
                <br><br>
                <strong>Loading</strong>
            </b-col>
        </b-row>
        <div class="p-2 bg-white" style="overflow-x: auto">
          <table class="table table-bordered ">
            <thead>
            <tr class="table-head-style">
              <th class="text-center">Item Name</th>
              <th class="text-center">Unit</th>
              <th class="text-center">Qty</th>
              <th class="text-center">Direct Labor Cost</th>
              <th class="text-center">Labor Unit Cost</th>
              <th class="text-center">Equipment Cost</th>
              <th class="text-center">Equipment Unit Cost</th>
              <th class="text-center">Material Cost</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in result.project_location_structure_items">
              <td><button class="btn btn-primary">{{row.description}}</button></td>
              <td>{{row.item_unit.description}}</td>
              <td>{{row.qty}} {{row.item_unit.description}}</td>
              <td class="text-right"><number-format-component :input_value="Number(row.labor_est.default)" /></td>
              <td class="text-right"><number-format-component :input_value="Number(row.labor_est.default/row.qty)" /></td>
              <td class="text-right"><number-format-component :input_value="Number(row.equipment_est.default)" /></td>
              <td class="text-right"><number-format-component :input_value="Number(row.equipment_est.default/row.qty)" /></td>
              <td class="text-right"><number-format-component :input_value="Number(row.material_est.default/row.qty)" /></td>

            </tr>
            </tbody>
            <tfoot>
            <th class="text-right" colspan="3">
              TOTAL
            </th>
            <th class="text-right">
              <number-format-component :input_value="Number(grand_direct_labor)" />
            </th>
            <th class="text-right">
              <number-format-component :input_value="Number(grand_labor_unit)" />
            </th>
            <th class="text-right">
              <number-format-component :input_value="Number(grand_equipment)" />
            </th>
            <th class="text-right">
              <number-format-component :input_value="Number(grand_equipment_unit)" />
            </th>
            <th class="text-right">
              <number-format-component :input_value="Number(grand_material)" />
            </th>
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
            id:this.$route.params.id
          },
          is_loading:false,
          result:{},
          details:{}
        }
      },
      created(){
        this.generate();
      },
      computed: {
        grand_direct_labor(){
          return this.result.project_location_structure_items.reduce((total, value)=>{
            return total + Number(value.labor_est.default);
          },0);
        },
        grand_labor_unit(){
          return this.result.project_location_structure_items.reduce((total, value)=>{
            return total + Number(value.labor_est.default/value.qty);
          },0);
        },
        grand_equipment(){
          return this.result.project_location_structure_items.reduce((total, value)=>{
            return total + Number(value.equipment_est.default);
          },0);
        },
        grand_equipment_unit(){
          return this.result.project_location_structure_items.reduce((total, value)=>{
            return total + Number(value.equipment_est.default/value.qty);
          },0);
        },
        grand_material(){
          return this.result.project_location_structure_items.reduce((total, value)=>{
            return total + Number(value.material_est.default);
          },0);
        },
      },
      methods: {
        generate(){
          this.is_loading=true;
          this.axios.get('reports/project-budget',{params:this.form}).then(response => {
            this.result = response.data;
              this.is_loading=false;
          }).catch(error => console.log(error));
        }
      }
    }
</script>
