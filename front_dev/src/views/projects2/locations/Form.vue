<template>
  <div>
    <b-row class="m-0">
      <b-col class="p-0">
        <div class="card bg-light mb-0">
          <div class="card-header bg-dark text-white">
              <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Add New Location</h6>
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
                label="Location Name:"
                description="This field is required"
              >
                <b-form-input
                  v-model="form.description"
                  type="text"
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
          project_location: {
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
            project_id:this.$route.params.id
          },
          is_saving:false
        }
      },
      watch: {
        project_location:{
            immediate: true,
            deep:true,
            handler(){
              if(typeof this.project_location !== 'undefined')
                this.get();
            }
        }
      },
      created(){
        if(typeof this.project_location !== 'undefined')
          this.get();
      },
      methods: {
        get(){
          this.is_saving=true;
          this.form = this.project_location;
          this.is_saving=false;
        },
        save(){
          event.preventDefault();
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('project/locations/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('addProjectLocation');
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
