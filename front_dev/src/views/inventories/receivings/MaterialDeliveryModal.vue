<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="search" /> Material Delivery Search</h6>
      </div>
      <div class="card-body bg-white position-relative p-2">
          
        <b-row class="m-0">
            <b-col cols="1" class="text-center p-1 bg-success text-white d-flex align-items-center justify-content-center">
            <font-awesome-icon icon="search" class="h3 mb-0" />
            </b-col>
            <b-col class="p-2 bg-white border">
                <b-form-input v-model="search_key" type="text" debounce="500" placeholder="Search..." autocomplete="off"></b-form-input>
            </b-col>
        </b-row>

        <div class="position-relative">
          <template  v-if="results.length>0">
          <b-row align-v="center" class="loader" v-if="is_saving">
              <b-col>
                  <b-spinner></b-spinner>
                  <br><br>
                  <strong>Loading</strong>
              </b-col>
          </b-row>
          <div class="card bg-light mb-0 mt-2"  v-for="result in results">
            <div class="card-header bg-secondary text-dark d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><font-awesome-icon icon="map-marker" /> {{result.starting_inventory.project_location_structure_item.project_location_structure.project_location.project.title}}</h6>
            </div>
            <div class="card-body bg-light position-relative p-2">
              <b-row class="m-0 mb-2">
                <b-col cols="1" class="text-center p-2 bg-info text-white d-flex align-items-center justify-content-center">
                    <font-awesome-icon icon="map-marker" class="h2 mb-0" />
                </b-col>
                <b-col class="p-2 bg-white d-flex align-items-center border">
                    <div>
                    <h6 class="mb-0 text-muted">Delivery Number</h6>
                    <h2 class="mb-0">
                      <a href="#" @click.prevent="viewDetails(result)">
                        <strong @click="viewDetails(result)">{{result.delivery_number}}</strong>
                      </a>
                    </h2>
                    </div>
                </b-col>
              </b-row>
              <div class="card-group mb-0">
                <div class="card">
                  <div class="card-block p-3">
                    <div class="h1 text-muted text-right mb-2">
                      <font-awesome-icon icon="list" class="text-info"/>
                    </div>
                    <div class="h5 mb-0">{{result.starting_inventory.project_location_structure_item.project_location_structure.project_location.description}}</div>
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
                    <div class="h5 mb-0">{{result.starting_inventory.project_location_structure_item.project_location_structure.description}}</div>
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
                    <div class="h5 mb-0">{{result.starting_inventory.project_location_structure_item.description}}</div>
                    <small class="text-muted text-uppercase font-weight-bold">item</small>
                    <div class="progress progress-xs mt-1 mb-0">
                      <div class="progress-bar bg-warning" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-right mt-2">
                <b-button type="submit" variant="dark" size="sm" @click="select(result)"><font-awesome-icon icon="check" /> SELECT</b-button>
              </div>
            </div>
          </div>
          </template>
        </div>
      </div>
    </div>
    <b-modal v-model="details_modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
      <modal :material_delivery="material_delivery"/>
    </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import Modal from '@/views/inventories/deliveries/Modal.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,Modal},
      data() {
        return {
          is_saving:false,
          search_key:'',
          results:[],
          details_modal:false,
          material_delivery:{}
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
            this.is_saving=true;
            this.axios.get('inventory/deliveries/search?search=' + this.search_key).then(response => {
                this.results=response.data;
                this.is_saving=false;
            }).catch(error => console.log(error));
        },
        select(data){
            this.$emit('select',data);
        },
        viewDetails(data){
          let material_delivery = JSON.parse(JSON.stringify(data));
          material_delivery.project_location_structure_item = material_delivery.starting_inventory.project_location_structure_item;
          material_delivery.transaction_date = material_delivery.transaction_date.default;
          material_delivery.project_location_structure_item_id = material_delivery.starting_inventory.project_location_structure_item_id;
          this.material_delivery = material_delivery;
          this.details_modal=true;
        }
      }
    }
</script>
