<template>
  <div class="p-2">
    <b-form @submit.prevent="generate">
    <h3 class="text-center">PROGRESS REPORT</h3>
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
        
        <div class="p-2 bg-white" v-if="typeof result.details != 'undefined'">
          <table class="table table-bordered mb-0">
            <thead class="thead-dark">
            <tr class="text-center">
              <th class="text-center" colspan="11">
                WORK ACOMPLISHMENT
              </th>
            </tr>
            <tr class="table-head-style">
              <th class="text-center" rowspan="2">
                Estimated
              </th>
              <th class="text-center" rowspan="2">
                Unit Price
              </th>
              <th class="text-center" colspan="3">
                Previous Month
              </th>
              <th class="text-center" colspan="3">
                Current Month
              </th>
              <th class="text-center" colspan="3">
                Total To Date
              </th>
            </tr>
            <tr class="table-head-style">
              <th>Planned</th>
              <th>Actual</th>
              <th>Variance</th>

              <th>Planned</th>
              <th>Actual</th>
              <th>Variance</th>

              <th>Planned</th>
              <th>Actual</th>
              <th>Variance</th>
            </tr>
            </thead>
            <tr>
              <td class="text-right">
                <number-format-component :input_value="Number(result.details.qty)" :currency="false"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(unit_price)"/>
              </td>


              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.prev.estimate)" :currency="false"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.prev.actual)" :currency="false"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.prev.variance)" :currency="false"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.current.estimate)" :currency="false"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.current.actual)" :currency="false"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.current.variance)" :currency="false"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.total.estimate)" :currency="false"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.total.actual)" :currency="false"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.progress.total.variance)" :currency="false"/>
              </td>
            </tr>

            <tr>
						<td class="text-right" colspan="2">
							PERCENTAGE
						</td>

						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.prev.estimate)" :currency="false"/>%
						</td>
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.prev.actual)" :currency="false"/>%
						</td>
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.prev.variance)" :currency="false"/>%
						</td>

						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.current.estimate)" :currency="false"/>%
						</td>
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.current.actual)" :currency="false"/>%
						</td>
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.current.variance)" :currency="false"/>%
						</td>

						

						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.total.estimate)" :currency="false"/>%
						</td>
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.total.actual)" :currency="false"/>%
						</td>
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.percentage.total.variance)" :currency="false"/>%
						</td>
					</tr>

          <tr>
						<td class="text-right" colspan="2">
							COST
						</td>

						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.cost.prev.estimate)"/>
						</td>
						<td class="text-right">
              <number-format-component :input_value="Number(result.progress.cost.prev.actual)"/>
						</td>
						<td class="text-right">
								<number-format-component :input_value="Number(result.progress.cost.prev.variance)"/>
						</td>

						
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.cost.current.estimate)"/>
						</td>
						<td class="text-right">
              <number-format-component :input_value="Number(result.progress.cost.current.actual)"/>
						</td>
						<td class="text-right">
								<number-format-component :input_value="Number(result.progress.cost.current.variance)"/>
						</td>

            
						<td class="text-right">
							<number-format-component :input_value="Number(result.progress.cost.total.estimate)"/>
						</td>
						<td class="text-right">
              <number-format-component :input_value="Number(result.progress.cost.total.actual)"/>
						</td>
						<td class="text-right">
								<number-format-component :input_value="Number(result.progress.cost.total.variance)"/>
						</td>
					</tr>

          </table>


          <table class="table table-bordered mt-2">
            <thead class="thead-dark">
              <tr>
                <th class="text-center" rowspan="3">
                  Name
                </th>
                <th class="text-center" rowspan="3">
                  Budget
                </th>
                <th class="text-center" colspan="7">Cost Status</th>
                <th class="text-center" rowspan="3">
                  Cost at Completion
                </th>
                <th class="text-center" rowspan="3">
                  Forecast Project Cost
                </th>
                <th class="text-center" rowspan="3">
                  Variance
                </th>
              </tr>
              <tr class="	table-head-style">
                <th class="text-center" colspan="2">Previous Month</th>
                <th class="text-center" colspan="2">Current Month</th>
                <th class="text-center" colspan="3">Total To Date</th>
              </tr>
              <tr>
                <th class="text-center">Budget</th>
                <th class="text-center">Actual</th>
                <th class="text-center">Budget</th>
                <th class="text-center">Actual</th>
                <th class="text-center">Budget</th>
                <th class="text-center">Actual</th>
                <th class="text-center">Variance</th>
              </tr>
            </thead>
            <tr>
            <td>Material</td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.details.material_est.default)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.material_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.prev.material)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.material_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.current.material)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.material_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.total.material)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.total.material - result.details.material_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.completion.material)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.forecast.material)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.variance.material)"/>
              </td>
          </tr>
          <tr>
            <td>Labor</td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.details.labor_est.default)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.labor_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.prev.labor)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.labor_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.current.labor)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.labor_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.total.labor)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.total.labor - result.details.labor_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.completion.labor)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.forecast.labor)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.variance.labor)"/>
              </td>
          </tr>
          <tr>
            <td>Equipment</td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.details.equipment_est.default)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.equipment_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.prev.equipment)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.equipment_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.current.equipment)"/>
              </td>

              <td class="text-right">
                <number-format-component :input_value="Number(result.details.equipment_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.total.equipment)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.total.equipment - result.details.equipment_est.default)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.completion.equipment)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.forecast.equipment)"/>
              </td>
              <td class="text-right">
                <number-format-component :input_value="Number(result.cost.variance.equipment)"/>
              </td>
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
            from:'',
            to:''
          },
          is_loading:false,
          result:{}
        }
      },
      created(){
      },
      computed: {
          unit_price(){
                return Number(this.result.details.grand_total_est.default) / Number(this.result.details.qty);
          },
      },
      methods: {
        generate(){
          this.is_loading=true;
          this.axios.get('reports/progress',{params:this.form}).then(response => {
              this.result = response.data;
              this.is_loading=false;
          }).catch(error => console.log(error));
        }
      }
    }
</script>
