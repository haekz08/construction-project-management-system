<template>
  <div>
    <b-row class="m-0">
      <b-col sm="12" class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add Equipment</h6>
          </div>
          <div class="card-body p-2">
            <b-form @submit.prevent="save">
              <b-form-group
                label="Equipment Code:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.code"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              
              <b-form-group
                label="Hourly Rate:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.hourly_rate"
                  type="number"
                  step="any"
                  required
                ></b-form-input>
              </b-form-group>

              <b-alert show>
                <b-form-checkbox switch size="lg" v-model="form.is_company_owned">Is this a company property</b-form-checkbox>
              </b-alert>
              

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
          equipment_form: {
              type: Object,
              default: () => {}
          },
          current_equipments: {
              type: [Array, Object],
              default: () => []
          }
      },
      data() {
        return {
          form: {}
        }
      },
      created(){
        this.form=JSON.parse(JSON.stringify(this.equipment_form));
      },
      methods: {
        save(){
          if(!this.validate())
          this.$emit('saveEquipment',this.form);
        },
        validate(){
          if(this.current_equipments.find((x,index) => x.code === this.form.code && !x.is_deleted && this.equipment_form.index_id!=index ) )
          {
            this.swal_transaction_error_data.text="Code entered is already taken."
            this.swalRequestError();
            return true;
          }
        }
      }
    }
</script>
