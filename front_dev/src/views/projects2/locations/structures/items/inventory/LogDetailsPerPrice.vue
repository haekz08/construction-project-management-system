<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Log Details</h6>
      </div>
      <div class="card-body bg-white position-relative min-height-300">
          <b-row align-v="center" class="loader" v-if="is_saving">
              <b-col>
                  <b-spinner></b-spinner>
                  <br><br>
                  <strong>Loading</strong>
              </b-col>
          </b-row>
          <table class="table border-bottom">
              <thead class="thead-dark">
              <tr>
                  <th scope="col">Material</th>
                  <th scope="col">Price</th>
                  <th scope="col" class="text-center">Qty Left</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(material, index) in materials">
                  <tr>
                      <th scope="row">{{material.name}}</th>
                      <td>P {{material.price}}</td>
                      <td class="text-right">
                          <a href="#" @click="show_log_details(material)">
                              <number-format-component :input_value="Number(material.balance)" :currency="false"/> {{material.description}}
                          </a>
                      </td>
                  </tr>
              </template>
              </tbody>
          </table>
      </div>
    </div>

      <b-modal v-model="log_details_modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
          <log-details :material="selected_material" />
      </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import {bus} from '@/main.js';
    import LogDetails from './LogDetails.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,LogDetails},
      props:{
          material: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
          materials:[],
          log_details_modal:false,
            selected_material:{},
        }
      },
      watch: {
          material:{
            immediate: true,
            handler(){

            }
        }
      },
      created(){
          this.get();
      },
      methods: {
          get(){
              this.is_saving=true;
              this.axios.get('project/location/structure/items/log-details-per-price',{params:{id:this.material.material_id}}).then(response => {
                  this.materials=response.data;
                  this.is_saving=false;
              }).catch(error => console.log(error));
          },

          show_log_details(material){
              this.log_details_modal=true;
              this.selected_material=material;
          }
      }
    }
</script>
