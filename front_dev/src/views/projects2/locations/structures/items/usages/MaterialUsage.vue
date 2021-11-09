<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h6 class="mb-0"><font-awesome-icon icon="list" /> Material Usage</h6>
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
              <b-row>
                  <b-col>
                    <div class="input-group">
                      <input type="text" class="form-control bg-white" placeholder="Material's Description" readonly v-model="form.material.name">
                      <div class="input-group-append">
                        <button class="btn btn-secondary" type="button" @click="modal=true"><font-awesome-icon icon="search" /> Search</button>
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="2">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Price</span>
                      </div>
                      <input type="number" step="any" class="form-control" required v-model="form.price">
                    </div>
                  </b-col>
                  <b-col cols="2">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Qty Used</span>
                      </div>
                      <input type="number" step="any" class="form-control" required v-model="form.qty">
                    </div>
                  </b-col>
                  <b-col cols="1">
                    <button class="btn btn-secondary btn-block" type="submit"><font-awesome-icon icon="plus-circle" /> Add</button>
                  </b-col>
              </b-row>
            </b-form>
            
            <table class="table table-bordered mb-0 mt-3">
              <thead class="bg-light text-dark">
                <tr>
                  <th scope="col">Material</th>
                  <th scope="col" class="text-center">Price</th>
                  <th scope="col" class="text-center">Quantity</th>
                  <th scope="col" class="text-center">Total</th>
                  <th scope="col" class="text-center">Action </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(material_usage, index) in material_usages">
                  <th scope="row">{{material_usage.material.name}}</th>
                  <td class="text-right"><number-format-component :input_value="Number(material_usage.price)"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(material_usage.qty)" :currency="false"/></td>
                  <td class="text-right"><number-format-component :input_value="Number(material_usage.total)"/></td>
                  <td class="text-center">
                    <b-button type="submit" size="sm" variant="danger" @click="deleteItem(material_usage.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-light text-dark">
                <tr>
                  <th scope="col" class="text-right" colspan="3">TOTAL</th>
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
      <material-search @select="select" />
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import MaterialSearch from '@/views/helpers/MaterialSearch.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,MaterialSearch},
      props:{
          material_usages: {
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
              return this.material_usages.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      data() {
        return {
          form:{
            id:-1,
            daily_log_id:this.daily_log_id,
            material_id:-1,
            material:{},
            price:'',
            qty:'',
            total:'',
          },
          form_copy:{},
          is_saving:false,
          modal:false,
        }
      },
      watch: {
        material_usages:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        },
      },
      created(){
        this.form_copy = JSON.parse(JSON.stringify(this.form));
      },
      methods: {
        save(){
          event.preventDefault();
          if(this.form.material_id==-1){
            this.swal_transaction_error_data.text = "Please select material.";
            this.swalRequestError();
            return
          }
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('daily_log/material_usages/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.form = JSON.parse(JSON.stringify(this.form_copy));
                    this.is_saving=false;
                    this.$emit('addMaterial');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.modal_is_saving=false;
                });
              }
          });
        },
        deleteItem(id){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.delete('daily_log/material_usages/delete',{ data: {id:id} }).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addMaterial');
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
            this.form.material_id=material.id;
            this.modal=false;
        },
      }
    }
</script>
