<template>
  <div>
    <b-form @submit.prevent="save">
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white">
          <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add Indirect Expense</h6>
      </div>
      <div class="card-body bg-white">
              <b-row>
                <b-col cols="3">
                  <b-form-group
                    label="Transaction Date:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        v-model="form.transaction_date"
                        type="date"
                        required
                        size="sm"
                        class="bg-white text-dark"
                        :readonly="(form.id!=-1)"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group
                    label="Voucher Number:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        v-model="form.voucher_number"
                        type="text"
                        required
                        size="sm"
                        :readonly="(form.id!=-1)"
                        class="bg-white text-dark"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group
                    label="Check Number:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        v-model="form.check_number"
                        type="text"
                        required
                        size="sm"
                        :readonly="(form.id!=-1)"
                        class="bg-white text-dark"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group
                    label="Details:"
                    description="This field is required"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        v-model="form.details"
                        type="text"
                        required
                        size="sm"
                        :readonly="(form.id!=-1)"
                        class="bg-white text-dark"
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Details</h6>
              <b-button variant="secondary" size="sm" @click="addRow" v-if="(form.id==-1)">
                  <font-awesome-icon icon="plus-circle" /> Add Row
              </b-button>
          </div>
          <div class="card-body bg-white">
            <table class="table table-bordered table-sm mb-0">
              <thead>
                <tr>
                  <th>
                    Expense Description
                  </th>
                  <th class="text-center">
                    Details
                  </th>
                  <th class="text-center">
                    Amount
                  </th>
                  <th class="text-center" v-if="(form.id==-1)">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-if="form.indirect_other_expense_usages.length>0">
                <tr v-for="(indirect_other_expense_usage,index) in form.indirect_other_expense_usages">
                  <td>
                    <b-input-group size="sm">
                      <template v-slot:append v-if="(form.id==-1)">
                        <b-button @click="openExpenseModal(index)" type="button" variant="facebook" size="sm"><font-awesome-icon icon="search" /> Select</b-button>
                      </template>
                      <b-form-input
                        :value="(typeof indirect_other_expense_usage.other_expense.description!='') ? indirect_other_expense_usage.other_expense.description : ''"
                        type="text"
                        required
                        size="sm"
                        readonly
                        class="bg-white text-dark"
                      ></b-form-input>
                    </b-input-group>
                  </td>
                  <td>
                    <b-form-input
                        v-model="indirect_other_expense_usage.details"
                        type="text"
                        required
                        size="sm"
                        :readonly="(form.id!=-1)"
                        class="bg-white text-dark"
                      ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                        v-model="indirect_other_expense_usage.amount"
                        type="number"
                        required
                        size="sm"
                        step="any"
                        :readonly="(form.id!=-1)"
                        class="bg-white text-dark text-right"
                      ></b-form-input>
                  </td>
                  <td class="text-center" v-if="(form.id==-1)">
                    <b-button type="button" @click="removeExpense(index)" variant="danger" size="sm"><font-awesome-icon icon="times" /></b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="3" class="text-right">
                    <number-format-component :input_value="Number(total)"/>
                  </th>
                  <th v-if="(form.id==-1)">
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="text-right mt-3" v-if="(form.id==-1)">
          <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
        </div>
      </div>
    </div>
    
    </b-form>
    <b-modal v-model="expense_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <other-expense-modal @select="selectExpense"/>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import OtherExpenseModal from '@/views/helpers/OtherExpenseModal.vue';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      components: {OtherExpenseModal,NumberFormatComponent},
      mixins:[SwalMixin],
      props:{
          project: {
              type: Object,
              default: () => {},
              required:false
          },
          indirect_expense: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      computed: {
          total(){
              return this.form.indirect_other_expense_usages.reduce((total, value)=>{
                return total + Number(value.amount);
              },0);
          },
      },
      data() {
        return {
          form: {
            id:-1,
            transaction_date:'',
            voucher_number: '',
            check_number: '',
            details: '',
            indirect_other_expense_usages:[]
          },
          details_form:{
            other_expense_id:'',
            other_expense: {},
            amount: '',
            details: '',
          },
          is_saving:false,
          modal:false,
          expense_modal:false,
          selected_index:-1
        }
      },
      watch: {
        project:{
            immediate: true,
            deep:true,
            handler(){
              // if(typeof this.project !== 'undefined')
              //   this.get();
            }
        },
        indirect_expense:{
            immediate: true,
            deep:true,
            handler(){
              // if(typeof this.project !== 'undefined')
              //   this.get();
            }
        }
      },
      created(){
        if(typeof this.indirect_expense.id !== 'undefined')
          this.form = this.indirect_expense;
      },
      methods: {
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.form.total=this.total;
                this.form.project_id=this.project.id;
                this.axios.post('indirect_expenses/save',this.form).then(response => {
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
        addRow(){
          let new_row = JSON.parse(JSON.stringify(this.details_form));
          this.form.indirect_other_expense_usages.push(new_row);
        },
        openExpenseModal(index){
          this.selected_index=index;
          this.expense_modal=true
        },
        selectExpense(data){
          this.form.indirect_other_expense_usages[this.selected_index].other_expense = data;
          this.form.indirect_other_expense_usages[this.selected_index].other_expense_id = data.id;
          this.selected_index=-1;
          this.expense_modal=false
        },
        removeExpense(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.form.indirect_other_expense_usages.splice(index,1);
              }
          });
        }
      }
    }
</script>
