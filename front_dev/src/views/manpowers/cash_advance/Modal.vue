<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Cash Advance</h6>
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
          <b-row class="m-0">
            <b-col class="p-0 pr-1">
              <b-row class="m-0">
                  <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="calendar" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                    <small class="text-muted">Transaction Date</small>
                    <input  type="date" 
                            class="form-control" 
                            placeholder="Transaction Date" 
                            required
                            v-model="form.transaction_date"
                          />
                  </b-col>
              </b-row>
            </b-col>
            <b-col class="p-0 pl-1">
              <b-row class="m-0">
                  <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="check-circle" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                    <small class="text-muted">Total Amount</small>
                    <input  type="text" 
                            class="form-control bg-white" 
                            placeholder="Total" 
                            disabled
                            v-model="total"
                          />
                  </b-col>
              </b-row>
            </b-col>
          </b-row>
          
          <b-row class="m-0 mt-3">
            <b-col class="p-0 pr-1">
              <b-row class="m-0">
                  <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
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
                  <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
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

          <div class="card bg-light mb-0 mt-3">
            <div class="card-header bg-secondary d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><font-awesome-icon icon="list" /> Details</h6>
                <b-button variant="dark" size="sm" @click="details_modal=true" v-if="editable">
                    <font-awesome-icon icon="plus" /> Add 
                </b-button>
            </div>
            <div class="card-body bg-white position-relative p-2">
              <table class="table border mb-0">
                <thead class="bg-light text-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" class="text-center">Amount</th>
                    <th scope="col" class="text-center">Remarks</th>
                    <th scope="col" class="text-center" v-if="editable">Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cash_advance_detail, index) in form.cash_advance_details">
                    <th scope="row">{{cash_advance_detail.manpower.full_name}}</th>
                    <td>
                      <b-form-input
                        v-model="cash_advance_detail.amount"
                        type="number"
                        step="any"
                        min="1"
                        required
                      ></b-form-input>
                    </td>
                    <td>
                      <b-form-input
                        v-model="cash_advance_detail.details"
                        type="text"
                        required
                      ></b-form-input>
                    </td>
                    <td class="text-center" v-if="editable">
                      <b-button size="sm" variant="danger" @click="deleteManpower(index)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-light text-dark">
                  <tr>
                    <th scope="col" class="text-right" colspan="2">TOTAL</th>
                    <th scope="col" class="text-right"><number-format-component :input_value="Number(total)"/></th>
                    <th scope="col" class="text-center" v-if="editable"></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="text-right mt-3" v-if="editable">
            <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
          </div>
        </b-form>
      </div>
    </div>
    
    <b-modal v-model="details_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <manpower-modal @select="selectManpower"/>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import ManpowerModal from '@/views/helpers/ManpowerModal.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,ManpowerModal},
      props:{
          cash_advance: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
          details_modal:false,
          form:{
            id:-1,
            transaction_date:'',
            voucher_number:'',
            check_number:'',
            cash_advance_details:[],
            total:0
          },
          editable:true
        }
      },
      watch: {
        cash_advance:{
            immediate: true,
            handler(){
              if(typeof this.cash_advance.id != 'undefined')
                this.form = this.cash_advance;
            }
        },
        form:{
            immediate: true,
            deep:true,
            handler(){
              this.editable = (this.form.id!=-1) ? false:true;
            }
        }
      },
      computed: {
          total(){
              return this.form.cash_advance_details.reduce((total, value)=>{
                return total + Number(value.amount);
              },0);
          }
      },
      created(){
      },
      methods: {
        save(){
          if(this.form.cash_advance_details.length<=0){
            this.swal_transaction_error_data.text = "No details found.";
            this.swalRequestError();
            return
          }
          this.swalConfirmSubmit((data)=>{
            if(!this.editable)
            return;
            if (data.value) {
              this.is_saving=true;
              this.form.total = this.total;
              this.axios.post('maintenance/manpowers/cash_advance/save',this.form).then(response => {
                  this.swalTransactionCompleted();
                  this.is_saving=false;
                  this.$emit('save');
              }).catch(error => {
                  this.swal_transaction_error_data.text = error.response.data;
                  this.swalRequestError();
                  this.is_saving=false;
              });
            }
          });
        },
        selectManpower(manpower){
          if(this.form.cash_advance_details.find(x => (x.manpower_id === manpower.id)))
          {
              this.swal_transaction_error_data.text = "Record already exist.";
              this.swalRequestError();
              return;
          }
          let data = {
            id:-1,
            manpower:manpower,
            cash_advance_id:-1,
            manpower_id:manpower.id,
            amount:0,
            details:''
          }
          this.form.cash_advance_details.push(data);
          this.details_modal=false;
        },
        deleteManpower(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.form.cash_advance_details.splice(index, 1);
              }
          });
        }
      }
    }
</script>
