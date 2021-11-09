<template>
  <div>

      <table class="table border-bottom">
          <thead class="thead-dark">
          <tr>
              <th scope="col">Material</th>
              <th scope="col" class="text-center">Qty</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(material, index) in inventory">
              <tr>
                  <th scope="row">{{material.name}}</th>
                  <td class="text-right">
                      <a href="#" @click="show_log_details(material)">
                          <number-format-component :input_value="Number(material.balance)" :currency="false"/> {{material.description}}
                      </a>
                  </td>
              </tr>
          </template>
          </tbody>
      </table>
      <b-modal v-model="log_details_modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
          <log-details :material="material" />
      </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import LogDetails from './LogDetailsPerPrice.vue';
    // import Modal from './Modal.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,LogDetails},
      props:{
          inventory: {
              type: Object,
              default: () => {},
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
            log_details_modal:false,
            material:{},
        }
      },
      watch: {
          inventory:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        }
      },
      created(){
      },
      methods: {
          show_log_details(material){
              this.log_details_modal=true;
              this.material=material;
          }
      }
    }
</script>
