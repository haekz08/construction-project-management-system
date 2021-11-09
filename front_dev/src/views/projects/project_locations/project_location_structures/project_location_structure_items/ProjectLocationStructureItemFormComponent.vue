<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add New Item</h6>
          </div>
          <div class="card-body bg-white">
            <b-row align-v="center" class="loader" v-if="is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <b-form @submit="save">
              <b-form-group
                label="Item Name:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.description"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Item Unit:"
                description="This field is required"
              >
                <select class="form-control" v-model="form.item_unit_id" required>
                    <option value="">Please Select</option>
                    <option v-for="item_unit in item_units" :value="item_unit.id">
                        {{item_unit.description}}
                    </option>
                </select>
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

              <b-form-group
                label="Estimated Hours:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.estimated_hours"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Estimated Days:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.estimated_days"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Estimated Budget:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.estimated_budget"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>


              <div class="text-right">
                <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
              </div>
            </b-form>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    export default {
      mixins:[SwalMixin],
      props:{
          project_location_structure_item: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          form: {
            id:-1,
            description: '',
            project_location_structure_id:this.$route.params.project_location_structure_id,
            item_unit_id:'',
            qty:'',
            estimated_hours:'',
            estimated_days:'',
            estimated_budget:''
          },
          is_saving:false,
          item_units:[]
        }
      },
      watch: {
        project_location_structure_item:{
            immediate: true,
            deep:true,
            handler(){
              if(typeof this.project_location_structure_item !== 'undefined')
                this.get();
            }
        }
      },
      created(){
        if(typeof this.project_location_structure_item !== 'undefined')
          this.get();
        this.getFields();
      },
      methods: {
        get(){
          this.is_saving=true;
          this.form = this.project_location_structure_item;
          this.is_saving=false;
        },
        save(){
          event.preventDefault();
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('project/location/structure/items/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addProjectLocationStructureItem');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        },
        getFields(){
          this.is_saving=true;
          this.axios.get('maintenance/item_units/all').then(response => {
              this.item_units = response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
      }
    }
</script>
