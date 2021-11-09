<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="search" /> Search</h6>
      </div>
      <div class="card-body bg-white position-relative p-2">
        <loader :status="is_saving" />
        <b-row class="m-0">
            <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
            <font-awesome-icon icon="search" class="h3 mb-0" />
            </b-col>
            <b-col class="p-2 bg-white border">
                <b-form-input v-model="search_key" type="text" debounce="500" placeholder="Search..." autocomplete="off"></b-form-input>
            </b-col>
        </b-row>
        <div class="list-group mt-3" v-if="results.length>0">
          <button type="button" class="list-group-item list-group-item-action" v-for="result in results" @click="select(result)">
            {{result.name}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import Loader from '@/views/helpers/LoaderComponent.vue';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,Loader},
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
                this.get();
            }
        }
      },
      created(){
      },
      methods: {
        get(){
            this.axios.get('maintenance/materials/search?search=' + this.search_key).then(response => {
                this.results=response.data
            }).catch(error => console.log(error));
        },
        select(result){
            this.$emit('select',result);
        }
      }
    }
</script>
