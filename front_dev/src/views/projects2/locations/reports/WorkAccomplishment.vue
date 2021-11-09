<template>
  <div class="p-2">
    <b-form @submit.prevent="generate">
    <h3 class="text-center">WORK ACCOMPLISHMENT REPORT (per structure)</h3>
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
        <h3 class="text-center">Location Name : {{details.description}}</h3>
        <div class="p-2 bg-white" v-if="result.length >0" style="overflow-x: auto">
          <table class="table table-bordered ">
            <thead>
            <tr class="table-head-style">
              <th class="text-center" rowspan="2">Item Name</th>
              <th class="text-center" rowspan="2">Unit</th>
              <th class="text-center" rowspan="2">Qty</th>
              <th class="text-center" rowspan="2">Unit Price</th>
              <th class="text-center" rowspan="2">Amount</th>
              <th class="text-center" rowspan="2">% Weight</th>
              <th class="text-center" colspan="3">Previous</th>
              <th class="text-center" colspan="3">Current Month</th>
              <th class="text-center" colspan="3">Total To Date</th>
              <th class="text-center" colspan="3">Balance</th>
            </tr>
            <tr class="table-head-style">
              <th class="text-center">Qty</th>
              <th class="text-center">Amount</th>
              <th class="text-center">% Weight</th>

              <th class="text-center">Qty</th>
              <th class="text-center">Amount</th>
              <th class="text-center">% Weight</th>

              <th class="text-center">Qty</th>
              <th class="text-center">Amount</th>
              <th class="text-center">% Weight</th>

              <th class="text-center">Qty</th>
              <th class="text-center">Amount</th>
              <th class="text-center">% Weight</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in result">
              <td><button class="btn btn-primary">{{row.description}}</button></td>
              <td>{{row.item_unit.description}}</td>
              <td class="text-right">{{row.qty}}</td>
              <td class="text-right">{{row.unit_price.other_formats.format_1}}</td>
              <td class="text-right"><number-format-component :input_value="Number(row.estimated_budget)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.weight)" :currency="false"/>%</td>

              <!-- PREVIOUS -->
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_qty_before_date)" :currency="false"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_amount_before_date)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_weight_before_date)" :currency="false"/>%</td>

              <!-- CURRENT -->
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_qty_on_date)" :currency="false"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_amount_on_date)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_weight_on_date)" :currency="false"/>%</td>

              <!-- TOTAL TO DATE -->
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_qty_all)" :currency="false"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_amount_all)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.total_weight_all)" :currency="false"/>%</td>


              <!-- BALANCE -->
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.qty_balance)" :currency="false"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.amount_balance)"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.progress_details.weight_balance)" :currency="false"/>%</td>
            </tr>
            </tbody>
            <tfoot>
            <th colspan="2" class="right">TOTAL</th>
            <th class="right"><number-format-component :input_value="Number(grand_qty)" :currency="false"/></th>
            <th class="right"><number-format-component :input_value="Number(grand_unit_price)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_amount)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_weight)" :currency="false" />%</th>


            <th class="right"><number-format-component :input_value="Number(grand_before_qty)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_before_amount)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_before_weight)" :currency="false" />%</th>

            <th class="right"><number-format-component :input_value="Number(grand_on_qty)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_on_amount)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_on_weight)" :currency="false" />%</th>

            <th class="right"><number-format-component :input_value="Number(grand_all_qty)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_all_amount)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_all_weight)" :currency="false" />%</th>

            <th class="right"><number-format-component :input_value="Number(grand_balance_qty)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_balance_amount)" /></th>
            <th class="right"><number-format-component :input_value="Number(grand_balance_weight)" :currency="false" />%</th>
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
        grand_qty(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.qty);
          },0);
        },
        grand_unit_price(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.unit_price.default);
          },0);
        },
        grand_amount(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.estimated_budget);
          },0);
        },
        grand_weight(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.weight);
          },0);
        },
        grand_before_qty(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_qty_before_date);
          },0);
        },
        grand_before_amount(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_amount_before_date);
          },0);
        },
        grand_before_weight(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_weight_before_date);
          },0);
        },
        grand_on_qty(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_qty_on_date);
          },0);
        },
        grand_on_amount(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_amount_on_date);
          },0);
        },
        grand_on_weight(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_weight_on_date);
          },0);
        },
        grand_all_qty(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_qty_all);
          },0);
        },
        grand_all_amount(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_amount_all);
          },0);
        },
        grand_all_weight(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.total_weight_all);
          },0);
        },
        grand_balance_qty(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.qty_balance);
          },0);
        },
        grand_balance_amount(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.amount_balance);
          },0);
        },
        grand_balance_weight(){
          return this.result.reduce((total, value)=>{
            return total + Number(value.progress_details.weight_balance);
          },0);
        },
      },
      methods: {
        generate(){
          this.is_loading=true;
          this.axios.get('reports/work-accomplishment-per-structure',{params:this.form}).then(response => {
            this.result = response.data.project_location_structure_items;
            this.details = response.data;
              this.is_loading=false;
          }).catch(error => console.log(error));
        }
      }
    }
</script>
