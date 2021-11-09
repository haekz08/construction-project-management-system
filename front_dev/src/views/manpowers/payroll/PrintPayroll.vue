<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="list" /> Payroll View</h6>
      </div>
      <div class="card-body bg-white position-relative">
          <b-row align-v="center" class="loader" v-if="is_saving">
              <b-col>
                  <b-spinner></b-spinner>
                  <br><br>
                  <strong>Loading</strong>
              </b-col>
          </b-row>
          <b-form @submit.prevent="confirm">
          
          
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
          <table class="table table-bordered mb-0 mt-3">
            <thead class="bg-light text-dark">
              <tr>
                <th scope="col" rowspan="2">Employee</th>
                <th scope="col" class="text-center" colspan="2">Hours</th>
                <th scope="col" rowspan="2" class="text-center">Days</th>
                <th scope="col" rowspan="2" class="text-center">Cost</th>
                <th scope="col" rowspan="2" class="text-center">CA Balance</th>
                <th scope="col" class="text-center" colspan="2">Deductions</th>
                <th scope="col" rowspan="2" class="text-center">Remarks</th>
                  <th scope="col" rowspan="2" class="text-center">Total Payout</th>
                  <th scope="col" rowspan="2" class="text-center">Signature</th>
              </tr>
              <tr>
                <th scope="col" class="text-center">Regular</th>
                <th scope="col" class="text-center">OT</th>
                <th scope="col" class="text-center">CA Payment</th>
                <th scope="col" class="text-center">OTHERS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(payroll_detail, index) in payroll.payroll_details">
                <td>
                  {{payroll_detail.manpower.full_name}}
                </td>
                <td class="text-center">
                  <number-format-component :input_value="Number(payroll_detail.total_regular_hours)" :currency="false" :decimal=1 />
                </td>
                <td class="text-center">
                  <number-format-component :input_value="Number(payroll_detail.total_ot_hours)" :currency="false" :decimal=1 />
                </td>
                <td class="text-center">
                  <number-format-component :input_value="Number(payroll_detail.total_days)" :currency="false" :decimal=1 />
                </td>
                <td class="text-right">
                  <number-format-component :input_value="Number(payroll_detail.initial_payout)" :currency="false"/>
                </td>
                <td class="text-right">
                  <number-format-component :input_value="Number(payroll_detail.previous_ca_balance)" :currency="false"/>
                </td>
                <td class="text-right">
                  <number-format-component :input_value="Number(payroll_detail.ca_payment)" :currency="false" />
                </td>
                <td class="text-right">
                  <number-format-component :input_value="Number(payroll_detail.other_payment)" :currency="false" />
                </td>
                <td class="text-right">
                  {{payroll_detail.remarks}}
                </td>
                <td class="text-center">
                  <number-format-component :input_value="Number(payroll_detail.total_payout)"/>
                </td>
                  <td>

                  </td>
              </tr>
            </tbody>
            <tfoot class="bg-light text-dark">
              <tr>
                <th scope="col" class="text-right" colspan="9">GRAND TOTAL PAYOUT</th>
                <th scope="col" class="text-right"><number-format-component :input_value="Number(total)"/></th>
                  <th></th>
              </tr>
            </tfoot>
          </table>
        </b-form>
      </div>
    </div>
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
            payroll:{
              project:{},
              payroll_details:[],
            },
            is_saving:false,
          }
      },
      watch: {
        payroll:{
            immediate: true,
            deep:true,
            handler(){
              this.payroll.payroll_details.forEach((value, index) => {
                  value.total_payout = Number(value.initial_payout) - (Number(value.ca_payment) + Number(value.sss_payment) + Number(value.philhealth_payment) + Number(value.pagibig_payment) + Number(value.other_payment));
              });
            }
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
        this.axios.get('payroll/get',{params:params}).then(response => {
          this.payroll = response.data;
          this.is_saving=false;
        }).catch(error => console.log(error));
      },
      methods: {
      }
    }
</script>
