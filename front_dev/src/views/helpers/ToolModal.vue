<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="search" /> Tool Search</h6>
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
                <b-form-input v-model="search_key" type="text" debounce="500" placeholder="Search..." autocomplete="off"></b-form-input>
            </b-col>
        </b-row>
        <div class="list-group bg-white mt-2" style="max-height:260px;overflow-y: auto;" v-if="results.length>0">
            <a href="#" class="list-group-item list-group-item-action" v-for="result in results" @click.prevent="select(result)">{{result.tool_type.description}} - {{result.code}}</a>
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
            this.axios.get('maintenance/tools/search?search=' + this.search_key).then(response => {
                this.results=response.data
            }).catch(error => console.log(error));
        },
        select(result){
          this.$emit('select',result);
        }
      }
    }
</script>
