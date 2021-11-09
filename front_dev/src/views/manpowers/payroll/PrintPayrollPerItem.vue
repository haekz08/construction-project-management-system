<template>
  <div class="p-2">
      <b-row class="m-0 mb-3" v-if="typeof payroll.project.title !='undefined'">
          <b-col class="p-0 pr-1">
              <b-row class="m-0">
                  <b-col cols="1" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="map-marker" class="h2 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-white d-flex align-items-center border">
                      <div>
                          <h6 class="mb-0 text-muted">Project</h6>
                          <h6 class="mb-0">
                              <strong>{{payroll.project.title}}</strong>
                          </h6>
                      </div>
                  </b-col>
              </b-row>
          </b-col>
          <b-col class="p-0 px-1" cols="3">
              <b-row class="m-0">
                  <b-col cols="2" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="calendar" class="h2 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-white d-flex align-items-center border">
                      <div>
                          <h6 class="mb-0 text-muted">Date</h6>
                          <h6 class="mb-0">
                              <strong>{{payroll.date_from.other_formats.format_3}} - {{payroll.date_to.other_formats.format_3}}</strong>
                          </h6>
                      </div>
                  </b-col>
              </b-row>
          </b-col>
          <b-col class="p-0 pl-1" cols="3">
              <b-row class="m-0">
                  <b-col cols="2" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="check-circle" class="h2 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-white d-flex align-items-center border">
                      <div>
                          <h6 class="mb-0 text-muted">Total</h6>
                          <h6 class="mb-0">
                              <strong><number-format-component :input_value="Number(total)"/></strong>
                          </h6>
                      </div>
                  </b-col>
              </b-row>
          </b-col>
      </b-row>
      <b-row class="m-0">
          <b-col class="p-0 pr-1" cols="6">
              <b-row class="m-0">
                  <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="check-circle" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                      <small class="text-muted">Remarks</small>
                      <h6 class="mb-0">
                          <strong>{{payroll.remarks}}</strong>
                      </h6>
                  </b-col>
              </b-row>
          </b-col>
          <b-col class="p-0 px-1">
              <b-row class="m-0">
                  <b-col cols="2" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="check-circle" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                      <small class="text-muted">Voucher Number</small>
                      <h6 class="mb-0">
                          <strong>{{payroll.voucher_number}}</strong>
                      </h6>
                  </b-col>
              </b-row>
          </b-col>
          <b-col class="p-0 pl-1">
              <b-row class="m-0">
                  <b-col cols="2" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="check-circle" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                      <small class="text-muted">Check Number</small>
                      <h6 class="mb-0">
                          <strong>{{payroll.check_number}}</strong>
                      </h6>
                  </b-col>
              </b-row>
          </b-col>
      </b-row>
      <table class="table table-bordered mb-0 mt-3" v-for="(cost_per_item, index) in cost_per_item">
          <thead class="bg-light text-dark">
          <tr>
              <th scope="col" colspan="4">Item Name : {{cost_per_item.item.description}}</th>
          </tr>
          <tr>
              <th scope="col" class="text-center">Employee</th>
              <th scope="col" class="text-center">Hours Rendered</th>
              <th scope="col" class="text-center">Days Rendered</th>
              <th scope="col" class="text-center">Payroll Cost</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="details in cost_per_item.details">
              <td>{{details.last_name}}, {{details.first_name}}</td>
              <td>{{Number(details.regular_hours)+Number(details.ot_hours)}}</td>
              <td><number-format-component :input_value="Number(details.days_rendered)" :currency="false" :decimal="0"/></td>
              <td><number-format-component :input_value="Number(details.total)" :currency="false"/></td>
          </tr>
          </tbody>
          <tfoot class="bg-light text-dark">
          <th></th>
          <th><number-format-component :input_value="Number(cost_per_item.item.total_hours)" :currency="false" :decimal="0"/></th>
          <th><number-format-component :input_value="Number(cost_per_item.item.total_days)" :currency="false" :decimal="0"/></th>
          <th><number-format-component :input_value="Number(cost_per_item.item.total_cost)" :currency="false" :decimal="2"/></th>
          </tfoot>
      </table>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent},
      data: () => {
          return {
              cost_per_item:[],
            is_saving:false,

              payroll:{
                  project:{},
                  payroll_details:[],
              },
          }
      },
        computed: {
            total(){
                return this.payroll.payroll_details.reduce((total, value)=>{
                    return total + Number(value.total_payout);
                },0);
            }
        },
      created(){
        this.is_saving = true;        
        let params={
              id:this.$route.params.id
            }
        this.axios.get('payroll/get-per-item',{params:params}).then(response => {
          this.cost_per_item = response.data.cost_per_item;
          this.payroll = response.data.payroll;
          this.is_saving=false;
        }).catch(error => console.log(error));
      },
      methods: {
      }
    }
</script>
