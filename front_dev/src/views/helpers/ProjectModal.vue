<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="search" /> Project Search</h6>
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

          <div  v-if="project_location_structure_items.length>0" class="card bg-light mb-0 mt-2"  v-for="project_location_structure_item in project_location_structure_items">
            <div class="card-header bg-secondary text-dark d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><font-awesome-icon icon="map-marker" /> {{project_location_structure_item.project_title}}</h6>
            </div>
            <div class="card-body bg-light position-relative p-2">
              <div class="card-group mb-0">
                <div class="card">
                  <div class="card-block p-3">
                    <div class="h1 text-muted text-right mb-2">
                      <font-awesome-icon icon="list" class="text-info"/>
                    </div>
                    <div class="h5 mb-0">{{project_location_structure_item.location_description}}</div>
                    <small class="text-muted text-uppercase font-weight-bold">location</small>
                    <div class="progress progress-xs mt-1 mb-0">
                      <div class="progress-bar bg-info" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-block p-3">
                    <div class="h1 text-muted text-right mb-2">
                      <font-awesome-icon icon="list" class="text-success"/>
                    </div>
                    <div class="h5 mb-0">{{project_location_structure_item.structure_description}}</div>
                    <small class="text-muted text-uppercase font-weight-bold">structure</small>
                    <div class="progress progress-xs mt-1 mb-0">
                      <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-block p-3">
                    <div class="h1 text-muted text-right mb-2">
                      <font-awesome-icon icon="list" class="text-warning"/>
                    </div>
                    <div class="h5 mb-0">{{project_location_structure_item.item_description}}</div>
                    <small class="text-muted text-uppercase font-weight-bold">item</small>
                    <div class="progress progress-xs mt-1 mb-0">
                      <div class="progress-bar bg-warning" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-right mt-2">
                <b-button type="submit" variant="dark" size="sm" @click="select(project_location_structure_item)"><font-awesome-icon icon="check" /> SELECT</b-button>
              </div>
            </div>
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
          project_location_structure_items:[]
        }
      },
      watch: {
        search_key:{
            immediate: true,
            handler(){
                if(this.search_key!='')
                this.getProjects();
            }
        }
      },
      created(){
      },
      methods: {
        getProjects(){
            this.axios.get('project/location/structure/items/search?search=' + this.search_key).then(response => {
                this.project_location_structure_items=response.data
            }).catch(error => console.log(error));
        },
        select(project_location_structure_item){
            let item = project_location_structure_item;
            item.project_location_structure = {
              project_location:{
                project:{
                  title:project_location_structure_item.project_title
                }
              }
            }
            this.$emit('select',item);
        }
      }
    }
</script>
