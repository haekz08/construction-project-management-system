<template>
  <div>
    <b-row align-v="center" class="loader" v-if="is_saving">
        <b-col>
            <b-spinner></b-spinner>
            <br><br>
            <strong>Loading</strong>
        </b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
        <b-form @submit="save">
          <b-form-group
            label="Transaction Date:"
            description="This field is required"
          >
            <b-form-input
              v-model="form.transaction_date"
              type="date"
              required
              class="bg-white text-dark"
              :readonly="form.id!=-1"
            ></b-form-input>
          </b-form-group>
          
          <b-form-group
            label="Transaction Time:"
            description="This field is required"
          >
            <b-form-input
              v-model="form.transaction_time"
              type="time"
              required
              class="bg-white text-dark"
              :readonly="form.id!=-1"
            ></b-form-input>
          </b-form-group>
          
          <b-form-group
            label="Voucher Number:"
            description="This field is required"
          >
            <b-form-input
              v-model="form.voucher_number"
              type="text"
              required
              class="bg-white text-dark"
              :readonly="form.id!=-1"
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
              class="bg-white text-dark"
              :readonly="form.id!=-1"
            ></b-form-input>
          </b-form-group>
          
          <b-form-group
            label="Details:"
            description="This field is required"
          >
            <b-form-input
              v-model="form.details"
              type="text"
              required
              class="bg-white text-dark"
              :readonly="form.id!=-1"
            ></b-form-input>
          </b-form-group>

          <div class="text-right">
            <router-link to="/maintenance-items/all">
              <b-button v-if="form.id!=-1" variant="dark" size="sm" class="mr-1">
                <font-awesome-icon icon="chevron-left" /> Back</b-button>
            </router-link>
            <b-button type="submit" :disabled="form.id!=-1" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
          </div>
        </b-form>
      </b-col>
      <b-col>
        <maintenance-table :maintenance_details="form.maintenance_details" :is_editable="(form.id==-1)"/>
      </b-col>
    </b-row>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import MaintenanceTable from './MaintenanceTable.vue';
    export default {
      components: {MaintenanceTable},
      mixins:[SwalMixin],
      data() {
        return {
          form: {
            id:-1,
            voucher_number: '',
            check_number: '',
            details: '',
            transaction_date: '',
            transaction_time: '',
            maintenance_details:[]
          },
          form_copy:{},
          is_saving:false,
        }
      },
      computed: {
          total(){
              return this.form.maintenance_details.reduce((total, value)=>{
                return total + Number(value.total);
              },0);
          },
      },
      created(){
        this.form_copy=JSON.parse(JSON.stringify(this.form));
        if(typeof this.$route.params.id !== 'undefined')
        this.get();
      },
      methods: {
        get(){
          this.is_saving=true;
          this.axios.get('maintenance_items/get',{params:{id:this.$route.params.id}}).then(response => {
              let data = response.data;
              data.transaction_date = data.transaction_date.default;
              data.transaction_time = data.transaction_time.default;
              data.maintenance_details = [];
              data.equipment_maintenances.forEach((value, index) => {
                value.tool={};
                value.tool_id=-1;
                value.type=1;
                value.show_details=false;
                data.maintenance_details.push(value);
              });
              data.tool_maintenances.forEach((value, index) => {
                value.equipment={};
                value.equipment_id=-1;
                value.type=2;
                value.show_details=false;
                data.maintenance_details.push(value);
              });
              this.form=response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.form.total = this.total;
                this.axios.post('maintenance_items/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$router.push('/maintenance-items/all');
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        }
      }
    }
</script>
