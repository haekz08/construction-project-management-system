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
                <h6 class="mb-0 text-muted">Project</h6>
                <h2 class="mb-0">
                  <a href="#" @click.prevent="(editable) ? project_modal=true : ''">
                    <strong v-if="form.project_location_structure_item_id=='-1'">....</strong>
                    <strong v-else>{{form.project_location_structure_item.project_location_structure.project_location.project.title}}</strong>
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
                      <small class="text-muted">Order Number</small>
                      <input  type="text" 
                              class="form-control" 
                              placeholder="Order Number" 
                              required
                              v-model="form.order_number"
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
          
          <b-row class="m-0 mb-3">
            <b-col class="p-0 pr-1">
              <b-row class="m-0">
                  <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="check-circle" class="h3 mb-0" />
                  </b-col>
                  <b-col class="p-2 bg-light">
                    <small class="text-muted">Supplier</small>
                    <select class="form-control" v-model="form.supplier_id" required>
                      <option value="">Please Select</option>
                      <option v-for="supplier in suppliers" :value="supplier.id">
                          {{supplier.name}}
                      </option>
                  </select>
                  </b-col>
              </b-row>
            </b-col>
            <b-col class="p-0 pl-1">
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
                    <th scope="col" class="text-center">Qty</th>
                    <th scope="col" class="text-center">Price</th>
                    <th scope="col" class="text-center">Total</th>
                    <th scope="col" class="text-center" v-if="editable">Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(material_purchase_detail, index) in form.material_purchase_details">
                    <th scope="row">{{material_purchase_detail.material.name}}</th>
                    <td>
                      <b-form-input
                        v-model="material_purchase_detail.qty"
                        type="number"
                        step="any"
                        min="1"
                        required
                      ></b-form-input>
                    </td>
                    <td>
                      <b-form-input
                        v-model="material_purchase_detail.price"
                        type="number"
                        step="any"
                        min="1"
                        required
                      ></b-form-input>
                    </td>
                    <td class="text-right">
                      <number-format-component :input_value="Number(material_purchase_detail.total)"/>
                    </td>
                    <td class="text-center" v-if="editable">
                      <b-button size="sm" variant="danger" @click="deleteMaterial(index)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-light text-dark">
                  <tr>
                    <th scope="col" class="text-right" colspan="3">TOTAL</th>
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
    <b-modal v-model="project_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <project-modal @select="selectItem"/>
    </b-modal>
    <b-modal v-model="material_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
      <material-modal @select="selectMaterial"/>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import ProjectModal from '@/views/helpers/ProjectModal.vue';
    import MaterialModal from '@/views/helpers/MaterialModal.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,ProjectModal,MaterialModal},
      props:{
          material_purchase: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
          project_modal:false,
          material_modal:false,
          form:{
            id:-1,
            transaction_date:'',
            supplier_id:'',
            order_number:'',
            project_location_structure_item:{},
            project_location_structure_item_id:-1,
            material_purchase_details:[],
            total:0
          },
          editable:true,
          suppliers:[]
        }
      },
      watch: {
        material_purchase:{
            immediate: true,
            handler(){
              if(typeof this.material_purchase.id != 'undefined')
                this.form = this.material_purchase;
            }
        },
        form:{
            immediate: true,
            deep:true,
            handler(){
              this.editable = (this.form.id!=-1) ? false:true;

              this.form.material_purchase_details.forEach((value, index) => {
                  value.total = value.price * value.qty;
              });
            }
        }
      },
      computed: {
          total(){
              return this.form.material_purchase_details.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      created(){
        this.getFields();
      },
      methods: {
        save(){
          if(this.form.project_location_structure_item_id==-1){
            this.swal_transaction_error_data.text = "Please select a project.";
            this.swalRequestError();
            return
          }
          if(this.form.material_purchase_details.length<=0){
            this.swal_transaction_error_data.text = "Please select a material/s.";
            this.swalRequestError();
            return
          }
          this.swalConfirmSubmit((data)=>{
            if(!this.editable)
            return;
            
            if (data.value) {
              this.is_saving=true;
              this.form.total = this.total;
              this.axios.post('inventory/purchases/save',this.form).then(response => {
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
        selectItem(project_location_structure_item){
          this.form.project_location_structure_item = project_location_structure_item;
          this.form.project_location_structure_item_id = project_location_structure_item.id;
          this.project_modal=false;
        },
        selectMaterial(material){
          if(this.form.material_purchase_details.find(x => (x.material_id === material.id)))
          {
              this.swal_transaction_error_data.text = "Material already exist.";
              this.swalRequestError();
              return;
          }
          let data = {
            id:-1,
            material:material,
            material_purchase_id:-1,
            material_id:material.id,
            qty:1,
            price:0,
            total:0
          }
          this.form.material_purchase_details.push(data);
          this.material_modal=false;
        },
        deleteMaterial(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.form.material_purchase_details.splice(index, 1);
              }
          });
        },
        getFields(){
          this.is_saving=true;
          this.axios.get('maintenance/suppliers/all').then(response => {
              this.suppliers = response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
      }
    }
</script>
