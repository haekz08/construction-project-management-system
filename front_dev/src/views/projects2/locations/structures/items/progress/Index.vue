<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="check-square" /> Progress Report</h6>
          <b-button variant="secondary" size="sm" @click="modal=true">
              <font-awesome-icon icon="plus-circle" /> Add Monthly Estimate
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
        <b-row class="m-0 mb-3">
          <b-col class="p-0">
              <b-row class="m-0 border">
                <b-col cols="2" class="text-center p-2 bg-primary text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="check-circle" class="h2 mb-0" />
                </b-col>
                <b-col class="p-3 bg-white d-flex align-items-center">
                    <div>
                    <h4 class="mb-0"><strong><number-format-component :input_value="Number(project_location_structure_item.qty)" :currency="false"/></strong></h4>
                    <small class="text-muted text-uppercase font-weight-bold">ITEM QUANTITY</small>
                    </div>
                </b-col>
            </b-row>
          </b-col>
          <b-col class="p-0 pl-3">
              <b-row class="m-0 h-100 border">
                <b-col cols="2" class="text-center p-2 bg-warning text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="check-circle" class="h2 mb-0" />
                </b-col>
                <b-col class="p-3 bg-white d-flex align-items-center">
                    <div>
                    <h4 class="mb-0"><strong><number-format-component :input_value="Number(project_location_structure_item.progress_estimate)" :currency="false"/></strong></h4>
                    <small class="text-muted text-uppercase font-weight-bold">TOTAL ESTIMATE</small>
                    </div>
                </b-col>
            </b-row>
          </b-col>
          <b-col class="p-0 pl-3">
              <b-row class="m-0 h-100 border">
                <b-col cols="2" class="text-center p-2 bg-success text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="check-circle" class="h2 mb-0" />
                </b-col>
                <b-col class="p-3 bg-white d-flex align-items-center">
                    <div>
                    <h4 class="mb-0"><strong><number-format-component :input_value="Number(project_location_structure_item.progress_accomplishment)" :currency="false"/></strong></h4>
                    <small class="text-muted text-uppercase font-weight-bold">TOTAL ACCOMPLISHMENT</small>
                    </div>
                </b-col>
            </b-row>
          </b-col>
          <b-col class="p-0 pl-3">
              <b-row class="m-0 h-100 border">
                <b-col cols="2" class="text-center p-2 bg-danger text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="check-circle" class="h2 mb-0" />
                </b-col>
                <b-col class="p-3 bg-white d-flex align-items-center">
                    <div>
                    <h4 class="mb-0"><strong><number-format-component :input_value="Number(project_location_structure_item.progress_balance)" :currency="false"/></strong></h4>
                    <small class="text-muted text-uppercase font-weight-bold">TOTAL BALANCE</small>
                    </div>
                </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
            <b-col class="px-3">
              <table class="table table-bordered mb-0">
                <thead class="bg-light text-dark">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col" class="text-center">Estimated Qty</th>
                    <th scope="col" class="text-center">Accomplishment</th>
                    <th scope="col" class="text-center">Balance</th>
                    <th scope="col" class="text-center">Details</th>
                    <th scope="col" class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(progress, index) in project_location_structure_item.progresses">
                    <th scope="row">{{progress.transaction_date.other_formats.format_1}}</th>
                    <td class="text-right">
                      <number-format-component :input_value="Number(progress.qty)" :currency="false"/>
                    </td>
                    <td class="text-right">
                      <number-format-component :input_value="Number(progress.usage)" :currency="false"/>
                    </td>
                    <td class="text-right">
                      <number-format-component :input_value="Number(progress.balance)" :currency="false"/>
                    </td>
                    <td>
                      {{progress.details}}
                    </td>
                    <td class="text-center">
                      <b-button type="button" size="sm" variant="info" class="mr-2" @click="selectProgress(progress)"><font-awesome-icon icon="edit" /> View</b-button>
                      <b-button type="submit" size="sm" variant="danger" @click="deleteProgress(progress.id)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
        </b-row>
      </div>
    </div>
    <b-modal v-model="modal" centered size="xl" body-class="p-0" modal-class="xxl-modal" :hide-footer="true" :hide-header="true" @hidden="refresh()">
      <form-component :progress_id="selected_progress.id"/>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import FormComponent from './Form.vue';
    // import Modal from './Modal.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,FormComponent},
      props:{
          project_location_structure_item: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
          modal:false,
          selected_progress:{}
        }
      },
      watch: {
        project_location_structure_item:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        },
      },
      created(){
      },
      methods: {
        deleteProgress(id){
          this.swalConfirmDelete((data)=>{
            if (data.value) {
              this.is_saving_details=true;
              this.axios.delete('progresses/delete',{ data: {id:id} }).then(response => {
                  this.swalTransactionCompleted();
                  this.is_saving_details=false;
                  this.refresh();
              }).catch(error => {
                  this.swal_transaction_error_data.text = error.response.data;
                  this.swalRequestError();
                  this.is_saving_details=false;
              });
            }
          });
        },
        selectProgress(progress){
          let data = JSON.parse(JSON.stringify(progress));
          data.transaction_date = progress.transaction_date.default;
          this.selected_progress = data;
          this.modal=true
        },
        refresh(){
          this.selected_progress={};
          this.$emit('refresh');
        }
      }
    }
</script>
