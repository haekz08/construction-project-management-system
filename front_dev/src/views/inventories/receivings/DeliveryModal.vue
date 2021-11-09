<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Material Purchase</h6>
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
            <b-col cols="1" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                <font-awesome-icon icon="map-marker" class="h2 mb-0" />
            </b-col>
            <b-col class="p-2 bg-white d-flex align-items-center border">
                <div>
                <h6 class="mb-0 text-muted">Delivery Number</h6>
                <h2 class="mb-0">
                  <a href="#" @click.prevent="(editable) ? material_delivery_modal=true : ''">
                    <strong v-if="form.material_delivery_id=='-1'">....</strong>
                    <strong v-else>{{form.material_delivery.delivery_number}}</strong>
                  </a>
                </h2>
                </div>
            </b-col>
          </b-row>

          <b-row class="m-0 mb-3">
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
                    <font-awesome-icon icon="list" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                      <small class="text-muted">Reference Number</small>
                      <input  type="text" 
                              class="form-control" 
                              placeholder="Reference Number" 
                              required
                              v-model="form.reference_number"
                            />
                  </b-col>
              </b-row>
            </b-col>
          </b-row>

          <b-row class="m-0 mb-3">
            <b-col class="p-0 pr-1">
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
            <b-col class="p-0 pl-1">
              <b-row class="m-0">
                  <b-col cols="1" class="text-center p-1 bg-success text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="check-circle" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                    <small class="text-muted">Total Received Amount</small>
                      <input  type="text" 
                              class="form-control text-right bg-white" 
                              placeholder="Total Delivery Amount" 
                              required
                              v-model="'P '+total_received.toLocaleString('en-US',{ minimumFractionDigits: 2 })"
                              readonly
                            />
                  </b-col>
                  <b-col cols="1" class="text-center p-1 bg-danger text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="times-circle" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                    <small class="text-muted">Total Rejected Amount</small>
                      <input  type="text" 
                              class="form-control text-right bg-white" 
                              placeholder="Total Rejected Amount" 
                              required
                              v-model="'P '+total_rejected.toLocaleString('en-US',{ minimumFractionDigits: 2 })"
                              readonly
                            />
                  </b-col>
              </b-row>
            </b-col>
          </b-row>

          <div class="card bg-light mb-0 mt-3">
            <div class="card-header bg-secondary d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><font-awesome-icon icon="list" /> Materials</h6>
                <b-button variant="dark" size="sm" @click="material_modal=true" v-if="editable">
                    <font-awesome-icon icon="plus" /> Add Material
                </b-button>
            </div>
            <div class="card-body bg-white position-relative p-2">
              <table class="table border mb-0">
                <thead class="bg-light text-dark">
                  <tr>
                    <th scope="col">Material</th>
                    <th scope="col" class="text-center">Price</th>
                    <th scope="col" class="text-center">Qty Received</th>
                    <th scope="col" class="text-center">Qty Rejected</th>
                    <th scope="col" class="text-center">Total Received</th>
                    <th scope="col" class="text-center">Total Rejected</th>
                    <th scope="col" class="text-center" v-if="editable">Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(material_delivery_detail, index) in form.material_receiving_details">
                    <th scope="row">{{material_delivery_detail.material.name}}</th>
                    <td>
                      <b-form-input
                        v-model="material_delivery_detail.price"
                        type="number"
                        step="any"
                        min="1"
                        required
                      ></b-form-input>
                    </td>
                    <td>
                      <b-form-input
                        v-model="material_delivery_detail.qty_received"
                        type="number"
                        step="any"
                        min="1"
                        required
                      ></b-form-input>
                    </td>
                    
                    <td>
                      <b-form-input
                        v-model="material_delivery_detail.qty_rejected"
                        type="number"
                        step="any"
                        min="1"
                        required
                      ></b-form-input>
                    </td>
                    <td class="text-right">
                      <number-format-component :input_value="Number(material_delivery_detail.total_received)"/>
                    </td>
                    <td class="text-right">
                      <number-format-component :input_value="Number(material_delivery_detail.total_rejected)"/>
                    </td>
                    <td class="text-center" v-if="editable">
                      <b-button size="sm" variant="danger" @click="deleteMaterial(index)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-light text-dark">
                  <tr>
                    <th scope="col" class="text-right" colspan="4">TOTAL</th>
                    <th scope="col" class="text-right"><number-format-component :input_value="Number(total_received)"/></th>
                    <th scope="col" class="text-right"><number-format-component :input_value="Number(total_rejected)"/></th>
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
    <b-modal v-model="material_delivery_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <material-delivery-modal @select="selectDeliveryNumber"/>
    </b-modal>
    <b-modal v-model="material_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <material-modal @select="selectMaterial"/>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import MaterialDeliveryModal from './MaterialDeliveryModal.vue';
    import MaterialModal from '@/views/helpers/MaterialModal.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,MaterialModal,MaterialDeliveryModal},
      props:{
          material_receive: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
          material_delivery_modal:false,
          material_modal:false,
          form:{
            id:-1,
            transaction_date:'',
            reference_number:'',
            material_delivery:{},
            material_delivery_id:-1,
            material_receiving_details:[],
            total_received:0,
            total_rejected:0
          },
          editable:true,
        }
      },
      watch: {
        material_receive:{
            immediate: true,
            handler(){
              if(typeof this.material_receive.id != 'undefined')
                this.form = this.material_receive;
            }
        },
        form:{
            immediate: true,
            deep:true,
            handler(){
              this.editable = (this.form.id!=-1) ? false:true;

              this.form.material_receiving_details.forEach((value, index) => {
                  value.total_received = value.price * value.qty_received;
                  value.total_rejected = value.price * value.qty_rejected;
              });
            }
        }
      },
      computed: {
          total_received(){
              return this.form.material_receiving_details.reduce((total, value)=>{
                return total + Number(value.total_received);
              },0);
          },
          total_rejected(){
              return this.form.material_receiving_details.reduce((total, value)=>{
                return total + Number(value.total_rejected);
              },0);
          },
      },
      created(){
      },
      methods: {
        save(){
          if(this.form.material_delivery_id==-1){
            this.swal_transaction_error_data.text = "Please select a purchase order.";
            this.swalRequestError();
            return
          }
          if(this.form.material_receiving_details.length<=0){
            this.swal_transaction_error_data.text = "Please select a material/s.";
            this.swalRequestError();
            return
          }
          this.swalConfirmSubmit((data)=>{
            if(!this.editable)
            return;
            
            if (data.value) {
              this.is_saving=true;
              this.form.total_received = this.total_received;
              this.form.total_rejected = this.total_rejected;
              this.axios.post('inventory/receivings/save',this.form).then(response => {
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
        selectDeliveryNumber(material_delivery){
          this.form.material_delivery = material_delivery;
          this.form.material_delivery_id = material_delivery.id;
          this.material_delivery_modal=false;
        },
        selectMaterial(material){
          if(this.form.material_receiving_details.find(x => (x.material_id === material.id)))
          {
              this.swal_transaction_error_data.text = "Material already exist.";
              this.swalRequestError();
              return;
          }
          let data = {
            id:-1,
            material:material,
            material_receiving_id:-1,
            material_id:material.id,
            qty_received:1,
            qty_rejected:0,
            price:0,
            total_received:0,
            total_rejected:0
          }
          this.form.material_receiving_details.push(data);
          this.material_modal=false;
        },
        deleteMaterial(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.form.material_receiving_details.splice(index, 1);
              }
          });
        }
      }
    }
</script>
