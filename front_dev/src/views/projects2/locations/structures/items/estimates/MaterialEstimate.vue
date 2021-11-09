<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <!-- <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add New Item</h6>
          </div> -->
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Equipment Estimates</h6>
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
            <table class="table border">
              <thead class="bg-light text-dark">
                <tr>
                  <th scope="col">Material Description</th>
                  <th scope="col" class="text-center">Price per Unit</th>
                  <th scope="col" class="text-center">Qty</th>
                  <th scope="col" class="text-center">Total</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(material_estimate, index) in material_estimates">
                  <th scope="row">{{material_estimate.material.name}}</th>
                  <td class="text-right"><number-format-component :input_value="Number(material_estimate.price)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(material_estimate.qty)"/> {{material_estimate.material.material_unit.description}}</td>
                  <td class="text-right"><number-format-component :input_value="Number(material_estimate.total)"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(material_estimate.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-light text-dark">
                <tr>
                  <th scope="col" class="text-right" colspan="3">TOTAL EST. AMOUNT FOR MATERIALS</th>
                  <th scope="col" class="text-right"><number-format-component :input_value="Number(total_estimate)"/></th>
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
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Material Estimates</h6>
          </div>
          <div class="card-body bg-white position-relative p-2">
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
                  <div class="list-group bg-white mt-2" style="max-height:260px;overflow-y: auto;">
                      <a href="#" class="list-group-item list-group-item-action" v-for="material in materials" @click.prevent="select(material)">{{material.name}}</a>
                  </div>
              </b-col>
              <b-col class="p-2">
                <b-form @submit="save">
                  <b-row class="m-0 border mb-3">
                      <b-col cols="2" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                          <font-awesome-icon icon="cube" class="h2 mb-0" />
                      </b-col>
                      <b-col class="p-2 bg-white d-flex align-items-center">
                          <div>
                          <h6 class="mb-0 text-muted">Material</h6>
                          <h2 class="mb-0"><strong>{{form.material.name}}</strong></h2>
                          </div>
                      </b-col>
                  </b-row>

                  <b-form-group
                    label="Price:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.price"
                      type="number"
                      step="any"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Qty:"
                    description="This field is required"
                  >
                    <b-form-input
                      v-model="form.qty"
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
          material_estimates: {
              type: Array,
              default: () => [],
              required:false
          }
      },
      computed: {
          total_estimate(){
              return this.material_estimates.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      data() {
        return {
          form: {
            id:-1,
            project_location_structure_item_id:this.$route.params.project_location_structure_item_id,
            material:{},
            material_id: '',
            price:'',
            qty:'',
            total:''
          },
          is_saving:false,
          modal_is_saving:false,
          materials:[],
          modal:false,
          search_key:'',
        }
      },
      watch: {
        material_estimates:{
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
                this.getMaterials();
            }
        }
      },
      created(){
        //this.getFields();
      },
      methods: {
        save(){
          event.preventDefault();
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.modal_is_saving=true;
                let new_form = JSON.parse(JSON.stringify(this.form));
                new_form.material_id = new_form.material.id;
                this.axios.post('material_estimates/save',new_form).then(response => {
                    this.swalTransactionCompleted();
                    this.modal_is_saving=false;
                    this.modal=false;
                    this.$emit('addMaterialEstimate');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.modal_is_saving=false;
                });
              }
          });
        },
        getMaterials(){
            this.axios.get('maintenance/materials/search?search=' + this.search_key).then(response => {
                this.materials=response.data
            }).catch(error => console.log(error));
        },
        deleteItem(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('material_estimates/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addMaterialEstimate');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
          
        },
        select(material){
            this.form.material=material;
        },
      }
    }
</script>
