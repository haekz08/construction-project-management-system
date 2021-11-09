<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="search" /> Maintenance Description Search</h6>
      </div>
      <div class="card-body bg-white position-relative p-2">
        <b-row align-v="center" class="loader" v-if="is_saving">
            <b-col>
                <b-spinner></b-spinner>
                <br><br>
                <strong>Loading</strong>
            </b-col>
        </b-row>
          
        <b-row class="m-0">
            <b-col cols="1" class="text-center p-1 bg-success text-white d-flex align-items-center justify-content-center">
              <font-awesome-icon icon="search" class="h3 mb-0" />
            </b-col>
            <b-col class="p-2 bg-white border">
              <b-input-group size="sm">
                <template v-slot:append>
                  <b-button @click="save()" type="button" :disabled="search_key==''" variant="facebook" size="sm"><font-awesome-icon icon="plus-circle" /> Add New</b-button>
                </template>
                <b-form-input v-model="search_key" type="text" size="sm" debounce="500" placeholder="Search..." autocomplete="off"></b-form-input>
              </b-input-group>
            </b-col>
        </b-row>
        <div class="list-group bg-white mt-2" style="max-height:260px;overflow-y: auto;" v-if="results.length>0">
            <a href="#" class="list-group-item list-group-item-action" v-for="result in results" @click.prevent="select(result)">{{result.description}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent},
      data() {
        return {
          is_saving:false,
          project_modal:false,
          search_key:'',
          results:[]
        }
      },
      watch: {
        search_key:{
            immediate: true,
            handler(){
                if(this.search_key!='')
                this.search();
            }
        }
      },
      created(){
      },
      methods: {
        search(){
            this.axios.get('maintenance/maintenance_descriptions/search?search=' + this.search_key).then(response => {
                this.results=response.data
            }).catch(error => console.log(error));
        },
        select(result){
          this.$emit('select',result);
        },
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                let form={
                  id:-1,
                  description:this.search_key
                }
                this.axios.post('maintenance/maintenance_descriptions/save',form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    this.$emit('select',response.data);
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
