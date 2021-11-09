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
          <log-details-table
                  :fields="table_settings.fields"
                  :api_url="table_settings.api_url"
                  :delete_url="table_settings.delete_url"
                  :material="material"
                  ref="displayTable"
          />
      </div>
    </div>

      <b-modal v-model="log_details_modal" centered size="xl" body-class="p-0" :hide-footer="true" :hide-header="true">
          <log-details :material="material" />
      </b-modal>
  </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import {bus} from '@/main.js';
    import LogDetailsTable from './LogDetailsTable.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,LogDetailsTable},
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
            table_settings:{
                api_url:'project/location/structure/items/log-details',
                delete_url:'maintenance/warehouses/delete',
                fields:[
                    {key: 'remarks', label:'Remarks'},
                    {key: 'price', label:'Price'},
                    {key: 'in', label:'IN',class:'text-center'},
                    {key: 'out', label:'OUT',class:'text-center'},
                    {key: 'balance', label:'BALANCE',class:'text-center'},
                    {key: 'logs.create_details.date_time.other_formats.format_1', label:'DATE ENCODED',class:'text-center'},
                ]
            },
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
          //this.get();
      },
      methods: {
          get(){
              this.is_saving=true;
              this.axios.get('maintenance/warehouses/get-log-details',{params:{id:this.$route.params.id}}).then(response => {
                  this.form=response.data.details;
                  this.materials=response.data.materials;
                  this.is_saving=false;
              }).catch(error => console.log(error));
          },
      }
    }
</script>
