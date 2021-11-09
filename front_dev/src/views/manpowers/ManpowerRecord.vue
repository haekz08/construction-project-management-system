<template>
  <div style="min-height: 200px;">
    <b-row align-v="center" class="loader" v-if="is_saving">
        <b-col>
            <b-spinner></b-spinner>
            <br><br>
            <strong>Loading</strong>
        </b-col>
    </b-row>
      <b-row class="m-0 mb-3">
          <b-col cols="1" class="text-center p-2 bg-dark text-white d-flex align-items-center justify-content-center">
              <font-awesome-icon icon="list" class="h2 mb-0" />
          </b-col>
          <b-col class="p-3 bg-danger text-white d-flex align-items-center">
              <div>
                  <h4 class="mb-0"><strong><number-format-component :input_value="Number(remaining_balance)"/></strong></h4>
                  <small class="text-muted text-uppercase font-weight-bold">REMAINING CA BALANCE</small>
              </div>
          </b-col>
      </b-row>

      <b-tabs content-class="mt-3">
          <b-tab title="Cash Advances" active>
              <table class="table table-bordered">
                  <thead>
                  <tr>
                      <th>
                          Date
                      </th>
                      <th>
                          Check Number
                      </th>
                      <th>
                          Voucher Number
                      </th>
                      <th>
                          Amount
                      </th>
                      <th>
                          Details
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(row_cash_advances, index) in result.cash_advances">
                      <td>{{row_cash_advances.transaction_date}}</td>
                      <td>{{row_cash_advances.check_number}}</td>
                      <td>{{row_cash_advances.voucher_number}}</td>
                      <td><number-format-component :input_value="Number(row_cash_advances.amount)"/></td>
                      <td>{{row_cash_advances.details}}</td>
                  </tr>
                  </tbody>
              </table>
          </b-tab>
          <b-tab title="Payments">
              <table class="table table-bordered">
                  <thead>
                  <tr>
                      <th>
                          Payroll Coverage
                      </th>
                      <th>
                          Amount Paid
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(row_payment, index) in result.payments">
                      <td><b-badge>{{row_payment.date_from}}</b-badge> to <b-badge>{{row_payment.date_to}}</b-badge></td>
                      <td><number-format-component :input_value="Number(row_payment.ca_payment)"/></td>
                  </tr>
                  </tbody>
              </table>
          </b-tab>
          <b-tab title="Duty Records">
              <table class="table table-bordered">
                  <thead>
                  <tr>
                      <th>
                          Date
                      </th>
                      <th>
                          Position
                      </th>
                      <th>
                          Rate
                      </th>
                      <th>
                          Regular Hours
                      </th>
                      <th>
                          OT Hours
                      </th>
                      <th>
                          Total Rate
                      </th>
                      <th>
                          Project/ Item
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(row_log, index) in result.logs">
                      <td><b-badge>{{row_log.transaction_date}}</b-badge></td>
                      <td>{{row_log.description}}</td>
                      <td><number-format-component :input_value="Number(row_log.daily_rate)"/></td>
                      <td>{{row_log.regular_hours}}</td>
                      <td>{{row_log.ot_hours}}</td>
                      <td><number-format-component :input_value="Number(row_log.total)"/></td>

                      <th>
                          {{row_log.project_description}} | {{row_log.location_description}} | {{row_log.structure_description}} | {{row_log.item_description}}
                      </th>
                  </tr>
                  </tbody>
              </table>
          </b-tab>
      </b-tabs>
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
          result:{},
          is_saving:false
        }
      },
        computed: {
            remaining_balance(){
                let ca = this.result.cash_advances.reduce((total, value)=>{
                    return total + Number(value.amount);
                },0);

                let payment = this.result.payments.reduce((total, value)=>{
                    return total + Number(value.ca_payment);
                },0);

                return Number(ca-payment);
            },
        },
      created(){
          this.get();
      },
      methods: {
        get(){
          this.is_saving=true;
          this.axios.get('maintenance/manpowers/get-records',{params:{id:this.$route.params.id}}).then(response => {
              this.result=response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
      }
    }
</script>
