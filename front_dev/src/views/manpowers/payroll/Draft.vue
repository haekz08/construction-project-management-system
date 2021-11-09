<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="list" /> Payroll Draft</h6>
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


          <b-row class="m-0 mb-3" v-if="typeof project.title !='undefined'">
            <b-col class="p-0 pr-1">
              <b-row class="m-0">
                <b-col cols="1" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="map-marker" class="h2 mb-0" />
                </b-col>
                <b-col class="p-2 bg-white d-flex align-items-center border">
                    <div>
                    <h6 class="mb-0 text-muted">Project</h6>
                    <h6 class="mb-0">
                        <strong>{{project.title}}</strong>
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
                        <strong>{{$route.params.date_from}} - {{$route.params.date_to}}</strong>
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
                    <input  type="text"
                            class="form-control"
                            placeholder="Remarks"
                            required
                            v-model="form.remarks"
                          />
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
                    <input  type="text"
                            class="form-control"
                            placeholder="Voucher Number"
                            required
                            v-model="form.voucher_number"
                          />
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
                    <input  type="text"
                            class="form-control"
                            placeholder="Check Number"
                            required
                            v-model="form.check_number"
                          />
                  </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-tabs content-class="mt-3" class="mt-3">
              <b-tab title="Cost per Person" active>
                  <table class="table table-bordered mb-0 mt-3">
                      <thead class="bg-light text-dark">
                      <tr>
                          <th scope="col" rowspan="2">Employee</th>
                          <th scope="col" class="text-center" colspan="2">Hours</th>
                          <th scope="col" rowspan="2" class="text-center">Days</th>
                          <th scope="col" rowspan="2" class="text-center">Cost</th>
                          <th scope="col" rowspan="2" class="text-center">CA Balance</th>
                          <th scope="col" class="text-center" colspan="5">Deductions</th>
                          <th scope="col" rowspan="2" class="text-center">Remarks</th>
                          <th scope="col" rowspan="2" class="text-center">Total Payout</th>
                      </tr>
                      <tr>
                          <th scope="col" class="text-center">Regular</th>
                          <th scope="col" class="text-center">OT</th>
                          <th scope="col" class="text-center">CA Payment</th>
                          <th scope="col" class="text-center">SSS</th>
                          <th scope="col" class="text-center">PHILHEALTH</th>
                          <th scope="col" class="text-center">PAGIBIG</th>
                          <th scope="col" class="text-center">OTHERS</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(payroll_detail, index) in form.payroll_details">
                          <td class="text-nowrap">
                              {{payroll_detail.full_name}}
                          </td>
                          <td class="text-center">
                              <number-format-component :input_value="Number(payroll_detail.total_regular_hours)" :currency="false" :decimal=1 />
                          </td>
                          <td class="text-center">
                              <number-format-component :input_value="Number(payroll_detail.total_ot_hours)" :currency="false" :decimal=1 />
                          </td>
                          <td class="text-center">
                            <a href="#" @click="showLogDetails(payroll_detail.manpower_id)">
                              <number-format-component :input_value="Number(payroll_detail.total_days)" :currency="false" :decimal=0 />
                            </a>
                          </td>
                          <td class="text-right">
                              <number-format-component :input_value="Number(payroll_detail.initial_payout)" :currency="false"/>
                          </td>
                          <td class="text-right">
                              <number-format-component :input_value="Number(payroll_detail.previous_ca_balance)" :currency="false"/>
                          </td>
                          <td>
                              <b-form-input
                                      v-model="payroll_detail.ca_payment"
                                      type="number"
                                      step="any"
                                      min="0"
                                      required
                                      class="text-right"
                              ></b-form-input>
                          </td>
                          <td>
                              <b-form-input
                                      v-model="payroll_detail.sss_payment"
                                      type="number"
                                      step="any"
                                      min="0"
                                      required
                                      class="text-right"
                              ></b-form-input>
                          </td>
                          <td>
                              <b-form-input
                                      v-model="payroll_detail.philhealth_payment"
                                      type="number"
                                      step="any"
                                      min="0"
                                      required
                                      class="text-right"
                              ></b-form-input>
                          </td>
                          <td>
                              <b-form-input
                                      v-model="payroll_detail.pagibig_payment"
                                      type="number"
                                      step="any"
                                      min="0"
                                      required
                                      class="text-right"
                              ></b-form-input>
                          </td>
                          <td>
                              <b-form-input
                                      v-model="payroll_detail.other_payment"
                                      type="number"
                                      step="any"
                                      min="0"
                                      required
                                      class="text-right"
                              ></b-form-input>
                          </td>
                          <td>
                              <b-form-input
                                      v-model="payroll_detail.remarks"
                                      type="text"
                              ></b-form-input>
                          </td>
                          <td class="text-center">
                              <number-format-component :input_value="Number(payroll_detail.total_payout)"/>
                          </td>
                      </tr>
                      </tbody>
                      <tfoot class="bg-light text-dark">
                      <tr>
                          <th scope="col" class="text-right" colspan="12">GRAND TOTAL PAYOUT</th>
                          <th scope="col" class="text-right"><number-format-component :input_value="Number(total)"/></th>
                      </tr>
                      </tfoot>
                  </table>
              </b-tab>
              <b-tab title="Cost per Item of Work"  v-if="form.payroll_type==1">
                  <table class="table table-bordered mb-0 mt-3" v-for="(cost_per_item, index) in form.cost_per_item">
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
              </b-tab>
              <b-tab title="Cost Summary"  v-if="form.payroll_type==1">
                  <table class="table table-bordered mb-0 mt-3">
                      <thead class="bg-light text-dark">
                      <tr>
                          <th scope="col" class="text-center" rowspan="2">Item Name</th>
                          <th scope="col" class="text-center" colspan="2">Estimate</th>
                          <th scope="col" class="text-center" rowspan="2">Hours Rendered</th>
                          <th scope="col" class="text-center" rowspan="2">Days Rendered</th>
                          <th scope="col" class="text-center" colspan="2">Balance per Estimate</th>
                      </tr>
                      <tr>
                          <th scope="col" class="text-center">Hours</th>
                          <th scope="col" class="text-center">Days</th>
                          <th scope="col" class="text-center">Hours</th>
                          <th scope="col" class="text-center">Days</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(cost_per_item, index) in form.cost_per_item">
                          <td>{{cost_per_item.item.description}}</td>
                          <td><number-format-component :input_value="Number(cost_per_item.item.estimated_hours)" :currency="false" :decimal="0"/></td>
                          <td><number-format-component :input_value="Number(cost_per_item.item.estimated_days)" :currency="false" :decimal="0"/></td>

                          <td><number-format-component :input_value="Number(cost_per_item.item.total_hours)" :currency="false" :decimal="0"/></td>
                          <td><number-format-component :input_value="Number(cost_per_item.item.total_days)" :currency="false" :decimal="0"/></td>

                          <td><number-format-component :input_value="Number(cost_per_item.item.balance_hours)" :currency="false" :decimal="0"/></td>
                          <td><number-format-component :input_value="Number(cost_per_item.item.balance_days)" :currency="false" :decimal="0"/></td>
                      </tr>
                      </tbody>
                  </table>
              </b-tab>
          </b-tabs>

          <div class="text-right mt-3">
            <b-button type="submit" variant="success" size="sm"><font-awesome-icon icon="save" /> PROCESS PAYROLL</b-button>
          </div>
        </b-form>
      </div>
    </div>

    <b-modal v-model="modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
      <div class="card bg-light mb-0">
        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h6 class="mb-0"><font-awesome-icon icon="lock" /> Security Check</h6>
        </div>
        <div class="card-body bg-white position-relative">
            <b-row align-v="center" class="loader" v-if="is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <b-form @submit.prevent="save">
            <b-row class="m-0 mb-3">
                <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="user" class="h3 mb-0" />
                </b-col>
                <b-col class="p-2 bg-light">
                  <small class="text-muted">Authoirized USERNAME</small>
                  <input  type="text"
                          class="form-control"
                          placeholder="Username"
                          required
                          v-model="form.authorization.username"
                        />
                </b-col>
            </b-row>
            <b-row class="m-0 mb-3">
                <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="lock" class="h3 mb-0" />
                </b-col>
                <b-col class="p-2 bg-light">
                  <small class="text-muted">To Date</small>
                  <input  type="password"
                          class="form-control"
                          placeholder="Password"
                          required
                          v-model="form.authorization.password"
                        />
                </b-col>
            </b-row>
            <b-button type="submit" block variant="info" size="md"><font-awesome-icon icon="check-circle" /> SUBMIT</b-button>
          </b-form>
        </div>
      </div>
    </b-modal>


    <b-modal v-model="daily_logs_modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
      <div class="card bg-light mb-0" v-if="typeof log_details.manpower!='undefined'">
        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="list" /> Log Details</h6>
        </div>
        <div class="card-body bg-white position-relative">
          <b-row class="m-0">
            <b-col cols="1" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
              <font-awesome-icon icon="user" class="h2 mb-0" />
            </b-col>
            <b-col class="p-2 bg-white d-flex align-items-center border">
              <div>
                <h6 class="mb-0 text-muted">Manpower</h6>
                <h6 class="mb-0">
                  <strong>{{log_details.manpower.full_name}}</strong>
                </h6>
              </div>
            </b-col>
          </b-row>
          <table class="table table-bordered mb-0 mt-3">
            <thead class="bg-light text-dark">
            <tr>
              <th scope="col" rowspan="2">Date</th>
              <th scope="col" rowspan="2" v-if="form.payroll_type==1">Item</th>
              <th scope="col" rowspan="2">Job Description</th>
              <th scope="col" rowspan="2">Rate</th>
              <th scope="col" class="text-center" colspan="2">Hours</th>
              <th scope="col" rowspan="2" class="text-center">Total Payout</th>
            </tr>
            <tr>
              <th scope="col" class="text-center">Regular</th>
              <th scope="col" class="text-center">OT</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(log_detail, index) in log_details.log_details">
              <td>{{log_detail.transaction_date}}</td>
              <td v-if="form.payroll_type==1">{{log_detail.project_location_structure_item}}</td>
              <td>{{log_detail.job_description}}</td>
              <td><number-format-component :input_value="Number(log_detail.daily_rate)" :decimal="2" /></td>
              <td><number-format-component :input_value="Number(log_detail.regular_hours)" :currency="false" :decimal=1 /></td>
              <td><number-format-component :input_value="Number(log_detail.ot_hours)" :currency="false" :decimal=1 /></td>
              <td><number-format-component :input_value="Number(log_detail.total)" :decimal="2"/></td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </b-modal>
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
            form:{
              id:-1,
                payroll_type:'',
                project_id:'',
              date_from:'',
              date_to:'',
              voucher_number:'',
              check_number:'',
              remarks:'',
              payroll_details:[],
                cost_per_item:[],
              authorization:{
                username:'',
                password:''
              }
            },
            log_details:{},
            project:{},
            is_saving:false,
            modal:false,
            daily_logs_modal:false
          }
      },
      watch: {
        form:{
            immediate: true,
            deep:true,
            handler(){
              this.form.payroll_details.forEach((value, index) => {
                  value.total_payout = Number(value.initial_payout) - (Number(value.ca_payment) + Number(value.sss_payment) + Number(value.philhealth_payment) + Number(value.pagibig_payment) + Number(value.other_payment));
              });
            }
        }
      },
      computed: {
          total(){
              return this.form.payroll_details.reduce((total, value)=>{
                return total + Number(value.total_payout);
              },0);
          }
      },
      created(){
        this.is_saving = true;
      this.form.payroll_type = this.$route.params.payroll_type;
      this.form.project_id = this.$route.params.project_id;
        this.form.date_from = this.$route.params.date_from;
        this.form.date_to = this.$route.params.date_to;

        let params={
            payroll_type:this.$route.params.payroll_type,
            project_id:this.$route.params.project_id,
              date_from:this.$route.params.date_from,
              date_to:this.$route.params.date_to
            }
        this.axios.get('payroll/generate',{params:params}).then(response => {
          let result = response.data;
          result.payroll_draft.forEach((value, index) => {
              let details = {
                manpower_id:value.id,
                full_name:value.last_name + ' ' + value.first_name,
                total_days:value.days_rendered,
                total_regular_hours:value.regular_hours,
                total_ot_hours:value.ot_hours,
                initial_payout:value.total,
                previous_ca_balance:value.ca_balance,
                ca_payment:0,
                sss_payment:0,
                philhealth_payment:0,
                pagibig_payment:0,
                other_payment:0,
                total_payout:value.total,
                remarks:''
              }
              this.form.payroll_details.push(details);
              this.form.cost_per_item = result.cost_per_item;
          });
          this.project = result.project;
          this.form.daily_log_ids = result.daily_log_ids;
          this.is_saving=false;
        }).catch(error => console.log(error));
      },
      methods: {
        showLogDetails(manpower_id){
          this.is_saving=true;
          let data = {
            manpower_id:manpower_id,
            payroll_type:this.$route.params.payroll_type,
            project_id:this.$route.params.project_id,
            date_from:this.$route.params.date_from,
            date_to:this.$route.params.date_to
          };
          this.axios.get('payroll/get_details',{params:data}).then(response => {
            //this.swalTransactionCompleted();
            this.is_saving=false;
            this.daily_logs_modal=true;
            this.log_details=response.data;
          }).catch(error => {
            this.swal_transaction_error_data.text = error.response.data;
            this.swalRequestError();
            this.is_saving=false;
          });
        },
        confirm(){
          if(this.form.payroll_details.length<=0){
            this.swal_transaction_error_data.text = "Nothing to process.";
            this.swalRequestError();
            return
          }
          this.modal=true;
        },
        save(){
          this.swalConfirmSubmit((data)=>{
            if (data.value) {
              this.is_saving=true;
              this.axios.post('payroll/save',this.form).then(response => {
                  this.swalTransactionCompleted();
                  this.is_saving=false;
                  this.$router.push('/manpowers/payroll/'+response.data.id);
              }).catch(error => {
                  this.swal_transaction_error_data.text = error.response.data;
                  this.swalRequestError();
                  this.is_saving=false;
              });
            }
          });
        },
      }
    }
</script>
