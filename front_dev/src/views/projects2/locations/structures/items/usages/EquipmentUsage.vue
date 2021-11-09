<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Equipment Usage</h6>
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
                  <th scope="col">Equipment Code</th>
                  <th scope="col" class="text-center">Equipment Type</th>
                  <th scope="col" class="text-center">Voucher Number</th>
                  <th scope="col" class="text-center">Check Number</th>
                  <th scope="col" class="text-center">Price per Hour</th>
                  <th scope="col" class="text-center">Hours Used</th>
                  <th scope="col" class="text-center">Total</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(equipment_usage, index) in equipment_usages">
                  <th scope="row">{{equipment_usage.equipment.code}}</th>
                  <th scope="row">{{equipment_usage.equipment.equipment_type.description}}</th>
                  <th scope="row">{{equipment_usage.voucher_number}}</th>
                  <th scope="row">{{equipment_usage.check_number}}</th>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_usage.price_per_hour)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_usage.hours_used)" :currency="false"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(equipment_usage.total)"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(equipment_usage.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-light text-dark">
                <tr>
                  <th scope="col" class="text-right" colspan="6">TOTAL</th>
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
                          <b-form-input v-model="search_key" type="text" debounce="500" placeholder="Search..." ></b-form-input>
                      </b-col>
                  </b-row>
                  <div class="list-group bg-white mt-2 flex-grow-1" style="max-height:424px;overflow-y: auto;">
                      <a href="#" class="list-group-item list-group-item-action" v-for="equipment in equipments" @click.prevent="select(equipment)">{{equipment.code}} - {{equipment.equipment_type.description}}</a>
                  </div>
              </b-col>
              <b-col class="p-2">
                <b-form @submit="save">
                  <b-row class="m-0 border mb-3">
                      <b-col cols="2" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                          <font-awesome-icon icon="user" class="h2 mb-0" />
                      </b-col>
                      <b-col class="p-2 bg-white d-flex align-items-center">
                          <div>
                          <h6 class="mb-0 text-muted">Equipment</h6>
                          <h2 class="mb-0">
                              <strong>
                                <template v-if="typeof form.equipment.code != 'undefined'">
                                  {{form.equipment.code}} - {{form.equipment.equipment_type.description}}
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
                    label="Price per Hour:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.price_per_hour"
                      type="number"
                      step="any"
                      required
                    ></b-form-input>
                  </b-form-group>
                  
                  <b-form-group
                    label="Number of Hour/s used:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.hours_used"
                      type="number"
                      step="any"
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
          equipment_usages: {
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
              return this.equipment_usages.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      data() {
        return {
          form:{
            id:-1,
            daily_log_id:this.daily_log_id,
            equipment_id:-1,
            equipment:{},
            voucher_number:'',
            check_number:'',
            hours_used:'',
            price_per_hour:''
          },
          is_saving:false,
          modal_is_saving:false,
          equipments:[],
          modal:false,
          search_key:'',
        }
      },
      watch: {
        equipment_usages:{
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
                this.getEquipments();
            }
        }
      },
      created(){
      },
      methods: {
        save(){
          event.preventDefault();
          if(this.form.equipment_id==-1){
            this.swal_transaction_error_data.text = "Please select an equipment.";
            this.swalRequestError();
            return
          }
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.modal_is_saving=true;
                this.axios.post('daily_log/equipment_usages/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.modal_is_saving=false;
                    this.modal=false;
                    this.$emit('addEquipment');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.modal_is_saving=false;
                });
              }
          });
        },
        getEquipments(){
            this.axios.get('maintenance/equipments/search?search=' + this.search_key).then(response => {
                this.equipments=response.data
            }).catch(error => console.log(error));
        },
        deleteItem(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('daily_log/equipment_usages/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addEquipment');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
          
        },
        select(equipment){
            this.form.equipment=equipment;
            this.form.price_per_hour=equipment.hourly_rate;
            this.form.equipment_id=equipment.id;
        },
      }
    }
</script>
