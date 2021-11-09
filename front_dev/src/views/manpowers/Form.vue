<template>
  <div>
    <b-row align-v="center" class="loader" v-if="is_saving">
        <b-col>
            <b-spinner></b-spinner>
            <br><br>
            <strong>Loading</strong>
        </b-col>
    </b-row>
    <b-form @submit="save">
      <b-form-group
        label="First Name:"
        description="This field is required"
      >
        <b-form-input
          v-model="form.first_name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Middle Name:"
        description="This field is required"
      >
        <b-form-input
          v-model="form.middle_name"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Last Name:"
        description="This field is required"
      >
        <b-form-input
          v-model="form.last_name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Job Description:"
        description="This field is required"
      >
        <select class="form-control" v-model="form.job_description_id" required>
            <option value="">Please Select</option>
            <option v-for="job_description in job_descriptions" :value="job_description.id">
                {{job_description.description}} ({{job_description.daily_rate.other_formats.format_1}})
            </option>
        </select>
      </b-form-group>

      <div class="text-right">
        <router-link to="/manpowers/all">
          <b-button v-if="form.id!=-1" variant="dark" size="sm" class="mr-1">
            <font-awesome-icon icon="chevron-left" /> Back</b-button>
        </router-link>
        <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    export default {
      mixins:[SwalMixin],
      data() {
        return {
          form: {
            id:-1,
            first_name: '',
            middle_name: '',
            last_name: '',
            job_description_id: ''
          },
          job_descriptions:[],
          form_copy:{},
          is_saving:false
        }
      },
      created(){
        this.form_copy=JSON.parse(JSON.stringify(this.form));
        if(typeof this.$route.params.id !== 'undefined')
          this.get();
        this.getFields();
        
      },
      methods: {
        get(){
          this.is_saving=true;
          this.axios.get('maintenance/manpowers/get',{params:{id:this.$route.params.id}}).then(response => {
              this.form=response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('maintenance/manpowers/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    if(this.form.id==-1){
                      this.form=JSON.parse(JSON.stringify(this.form_copy));
                    }
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
          this.axios.get('maintenance/job_descriptions/all').then(response => {
              this.job_descriptions = response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
      }
    }
</script>
