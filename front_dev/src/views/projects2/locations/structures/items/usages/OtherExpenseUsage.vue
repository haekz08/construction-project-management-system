<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Other Expenses</h6>
              <b-button variant="secondary" size="sm" @click="modal=true">
                  <font-awesome-icon icon="plus" /> Add New
              </b-button>
          </div>
          <div class="card-body bg-white position-relative">
            <b-row align-v="center" class="loader" v-if="is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <table class="table table-bordered mb-0">
              <thead class="bg-light text-dark">
                <tr>
                  <th scope="col">Expense Description</th>
                  <th scope="col" class="text-center">Details</th>
                  <th scope="col" class="text-center">Voucher Number</th>
                  <th scope="col" class="text-center">Check Number</th>
                  <th scope="col" class="text-center">Amount</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(other_expense_usage, index) in other_expense_usages">
                  <th scope="row">{{other_expense_usage.other_expense.description}}</th>
                  <th scope="row">{{other_expense_usage.details}}</th>
                  <th scope="row">{{other_expense_usage.voucher_number}}</th>
                  <th scope="row">{{other_expense_usage.check_number}}</th>
                  <td class="text-right"><number-format-component :input_value="Number(other_expense_usage.amount)" :currency="false"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(other_expense_usage.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-light text-dark">
                <tr>
                  <th scope="col" class="text-right" colspan="4">TOTAL</th>
                  <th scope="col" class="text-right"><number-format-component :input_value="Number(total_usage)"/></th>
                  <th scope="col" class="text-center"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal v-model="modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
      <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Labor Estimates</h6>
          </div>
          <div class="card-body bg-white position-relative">
            <b-row align-v="center" class="loader" v-if="modal_is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <b-row class="m-0 border">
              <b-col cols="6" class="p-2 bg-dark">
                  <b-row class="m-0">
                      <b-col cols="1" class="text-center p-1 bg-success text-white d-flex align-items-center justify-content-center">
                      <font-awesome-icon icon="search" class="h3 mb-0" />
                      </b-col>
                      <b-col class="p-2 bg-white">
                        <b-input-group>
                            <template v-slot:append>
                                <b-button variant="info" @click="addOtherExpense()">New Record</b-button>
                            </template>
                            <b-form-input v-model="search_key" type="text" debounce="500" placeholder="Search..." autocomplete="off"></b-form-input>
                        </b-input-group>
                      </b-col>
                  </b-row>
                  <div class="list-group bg-white mt-2 flex-grow-1" style="max-height:424px;overflow-y: auto;">
                      <a href="#" class="list-group-item list-group-item-action" v-for="other_expense in other_expenses" @click.prevent="select(other_expense)">{{other_expense.description}}</a>
                  </div>
              </b-col>
              
              <b-col class="p-3">
                <b-form @submit="save">
                  <b-row class="m-0 border mb-3">
                      <b-col cols="2" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                          <font-awesome-icon icon="list" class="h2 mb-0" />
                      </b-col>
                      <b-col class="p-2 bg-white d-flex align-items-center">
                          <div>
                          <h6 class="mb-0 text-muted">Description</h6>
                          <h2 class="mb-0">
                              <strong>
                                <template v-if="typeof form.other_expense.description != 'undefined'">
                                  {{form.other_expense.description}}
                                </template>
                                <template v-else>
                                  NA
                                </template>
                              </strong>
                            </h2>
                          </div>
                      </b-col>
                  </b-row>

                  <b-form-group
                    label="Voucher Number:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.voucher_number"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Check Number:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.check_number"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Amount:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.amount"
                      type="number"
                      step="any"
                      required
                    ></b-form-input>
                  </b-form-group>
                  
                  <b-form-group
                    label="Details:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.details"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>


                  <div class="text-right">
                    <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
                  </div>
                </b-form>
              </b-col>
            </b-row>
          </div>
        </div>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent},
      props:{
          other_expense_usages: {
              type: Array,
              default: () => [],
              required:false
          },
          daily_log_id: {
              type: Number,
              required:false
          }
      },
      computed: {
          total_usage(){
              return this.other_expense_usages.reduce((total, value)=>{
                return total + Number(value.amount);
              },0);
          },
      },
      data() {
        return {
          form:{
            id:-1,
            daily_log_id:this.daily_log_id,
            other_expense_id:-1,
            other_expense:{},
            voucher_number:'',
            check_number:'',
            amount:'',
            details:''
          },
          is_saving:false,
          modal_is_saving:false,
          other_expenses:[],
          modal:false,
          search_key:'',
        }
      },
      watch: {
        other_expense_usages:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        },
        search_key:{
            immediate: true,
            handler(){
                if(this.search_key!='')
                this.getDescriptions();
            }
        }
      },
      created(){
      },
      methods: {
        save(){
          event.preventDefault();
          if(this.form.other_expense_id==-1){
            this.swal_transaction_error_data.text = "Please select an expense description.";
            this.swalRequestError();
            return
          }
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.modal_is_saving=true;
                this.axios.post('daily_log/other_expense_usages/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.modal_is_saving=false;
                    this.modal=false;
                    this.$emit('addOtherExpense');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.modal_is_saving=false;
                });
              }
          });
        },
        getDescriptions(){
            this.axios.get('maintenance/other_expenses/search?search=' + this.search_key).then(response => {
                this.other_expenses=response.data
            }).catch(error => console.log(error));
        },
        deleteItem(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('daily_log/other_expense_usages/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addOtherExpense');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
          
        },
        select(other_expense){
            this.form.other_expense=other_expense;
            this.form.other_expense_id=other_expense.id;
        },
        addOtherExpense(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                let form = {
                  id:-1,
                  description:this.search_key
                }
                this.axios.post('maintenance/other_expenses/save',form).then(response => {
                    this.swalTransactionCompleted();
                    this.select(response.data);
                    this.is_saving=false;
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        }
      }
    }
</script>
