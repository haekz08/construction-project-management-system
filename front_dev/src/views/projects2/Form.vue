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
        label="Project Title:"
        description="This field is required"
      >
        <b-form-input
          v-model="form.title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Description:"
        description="This field is required"
      >
        <b-form-input
          v-model="form.description"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Contractor:"
        description="This field is optional"
      >
        <b-form-input
          v-model="form.contractor"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Manager:"
        description="This field is optional"
      >
        <b-form-input
          v-model="form.manager"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Location:"
        description="This field is optional"
      >
        <b-form-input
          v-model="form.location"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Starting Date:"
        description="This field is optional"
      >
        <b-form-input
          v-model="form.starting_date"
          type="date"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Ending Date:"
        description="This field is optional"
      >
        <b-form-input
          v-model="form.ending_date"
          type="date"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Extension Date:"
        description="This field is optional"
      >
        <b-form-input
          v-model="form.extension"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Project Price:"
        description="This field is optional"
      >
        <b-form-input
          v-model="form.price"
          type="number"
          step="any"
        ></b-form-input>
      </b-form-group>


      <div class="text-right">
        <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save</b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    export default {
      mixins:[SwalMixin],
      props:{
          project: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          form: {
            id:-1,
            title: '',
            description: '',
            contractor: '',
            manager: '',
            location: '',
            starting_date: '',
            ending_date: '',
            extension: '',
            price: ''
          },
          is_saving:false
        }
      },
      watch: {
        project:{
            immediate: true,
            deep:true,
            handler(){
              if(typeof this.project !== 'undefined')
                this.get();
            }
        }
      },
      created(){
        if(typeof this.project !== 'undefined')
          this.get();
      },
      methods: {
        get(){
          this.is_saving=true;
          let data = JSON.parse(JSON.stringify(this.project));
          data.price = data.price.default;
          this.form = data;
          this.is_saving=false;
        },
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('projects/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    if(this.form.id==-1){
                      this.$router.push('/projects/'+response.data.id);
                    }
                    
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        },
      }
    }
</script>
