<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Material Inventory Adjustment</h6>
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
                    <small class="text-muted">Total Adjusted Amount</small>
                      <input  type="text" 
                              class="form-control text-right bg-white" 
                              placeholder="Total Delivery Amount" 
                              required
                              v-model="'P '+total.toLocaleString('en-US',{ minimumFractionDigits: 2 })"
                              readonly
                            />
                  </b-col>
              </b-row>
            </b-col>
          </b-row>

          <div class="card bg-light mb-0 mt-3">
            <div class="card-header bg-secondary d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><font-awesome-icon icon="list" /> Materials</h6>
                <b-button variant="dark" size="sm" @click="material_modal=true" v-if="editable && form.project_location_structure_item_id!=-1">
                    <font-awesome-icon icon="plus" /> Add Material
                </b-button>
            </div>
            <div class="card-body bg-white position-relative p-2">
              <table class="table border mb-0">
                <thead class="bg-light text-dark">
                  <tr>
                    <th scope="col">Material</th>
                    <th scope="col" class="text-center">Price</th>
                    <th scope="col" class="text-center">System Count</th>
                    <th scope="col" class="text-center">Actual Count</th>
                    <th scope="col" class="text-center">Adjusted (+/-)</th>
                      <th scope="col" class="text-center">Actual Total</th>
                      <th scope="col" class="text-center">Adjusted Total</th>
                    <th scope="col" class="text-center" v-if="editable">Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(material_delivery_detail, index) in form.material_adjustment_details">
                    <th scope="row">{{material_delivery_detail.material.name}}</th>
                    <td class="text-right">
                        <number-format-component :input_value="Number(material_delivery_detail.price)"/>
                    </td>
                    <td class="text-right">
                        <number-format-component :currency="false" :input_value="Number(material_delivery_detail.system_count)"/>
                    </td>
                    
                    <td>
                      <b-form-input
                        v-model="material_delivery_detail.physical_count"
                        type="number"
                        step="any"
                        min="0"
                        required
                        class="text-right"
                      ></b-form-input>
                    </td>
                    <td class="text-right">
                      <number-format-component :input_value="Number(material_delivery_detail.adjustment)" :currency="false"/>
                    </td>
                      <td class="text-right">
                          <number-format-component :input_value="Number(material_delivery_detail.physical_total)"/>
                      </td>
                      <td class="text-right">
                          <number-format-component :input_value="Number(material_delivery_detail.total_adjustment)"/>
                      </td>
                    <td class="text-center" v-if="editable">
                      <b-button size="sm" variant="danger" @click="deleteMaterial(index)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-light text-dark">
                  <tr>
                    <th scope="col" class="text-right" colspan="6">TOTAL ADJUSTED AMOUNT</th>
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
      <b-modal v-model="material_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
          <material-modal @select="selectMaterial" :project_location_structure_item_id="form.project_location_structure_item_id"/>
      </b-modal>
      <b-modal v-model="project_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
          <project-modal @select="selectItem"/>
      </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import ProjectModal from '@/views/helpers/ProjectModal.vue';
    import MaterialModal from '@/views/helpers/MaterialPerLocationModal.vue';
    export default {
      mixins:[SwalMixin],
        components: {NumberFormatComponent,ProjectModal,MaterialModal},
      props:{
          material_adjustment: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
          material_modal:false,
            project_modal:false,
          form:{
            id:-1,
            reference_number:'',
              project_location_structure_item:{},
              project_location_structure_item_id:-1,
            transaction_date:'',
            remarks:'',
            total:0,
            material_adjustment_details:[],
          },
          editable:true,
        }
      },
      watch: {
        material_adjustment:{
            immediate: true,
            handler(){
              if(typeof this.material_adjustment.id != 'undefined')
                this.form = this.material_adjustment;
            }
        },
        form:{
            immediate: true,
            deep:true,
            handler(){
              this.editable = (this.form.id!=-1) ? false:true;

              this.form.material_adjustment_details.forEach((value, index) => {
                  value.adjustment = value.physical_count - value.system_count;
                  value.physical_total = value.price * value.physical_count;
                  value.total_adjustment = value.price * value.adjustment;
              });
            }
        }
      },
      computed: {
          total(){
              return this.form.material_adjustment_details.reduce((total, value)=>{
                return total + Number(value.total_adjustment);
              },0);
          },
      },
      created(){
      },
      methods: {
        save(){
          if(this.form.project_location_structure_item_id==-1){
            this.swal_transaction_error_data.text = "Please select a warehouse";
            this.swalRequestError();
            return
          }
          if(this.form.material_adjustment_details.length<=0){
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
              this.axios.post('inventory/adjustments/save',this.form).then(response => {
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
              this.form.material_withdrawal_details = [];
              this.project_modal=false;
          },
        selectMaterial(material){
          if(this.form.material_adjustment_details.find(x => (x.material_id === material.id && Number(x.price) === Number(material.price))))
          {
              this.swal_transaction_error_data.text = "Material already exist.";
              this.swalRequestError();
              return;
          }
          let data = {
            id:-1,
            material:material,
              material_adjustment_id:-1,
            material_id:material.material_id,
              price:material.price,
              system_count:material.balance,
              physical_count:0,
              adjustment:0,
              physical_total:0,
              total_adjustment:0,
          }
          this.form.material_adjustment_details.push(data);
          this.material_modal=false;
        },
        deleteMaterial(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.form.material_adjustment_details.splice(index, 1);
              }
          });
        }
      }
    }
</script>
