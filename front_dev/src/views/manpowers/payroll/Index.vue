    <template>
  <div>
    <server-side-paginated-table
            :fields="table_settings.fields"
            :api_url="table_settings.api_url"
            :delete_url="table_settings.delete_url"
            :top_right_btn_redirect="false"
            ref="displayTable"
    />
    
    <b-modal v-model="modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
      <div class="card bg-light mb-0">
        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h6 class="mb-0"><font-awesome-icon icon="list" /> Choose Project</h6>
        </div>
        <div class="card-body bg-white position-relative">
            <b-row align-v="center" class="loader" v-if="is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
            <b-form @submit.prevent="generate">
            <b-row class="m-0 mb-3">
                <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="map-marker" class="h3 mb-0" />
                </b-col>
                <b-col class="p-2 bg-light">
                  <small class="text-muted">Project</small>
                  <select class="form-control" v-model="form.project_id" required>
                    <option value="">Please Select</option>
                    <option v-for="project in projects" :value="project.id">
                        {{project.title}}
                    </option>
                  </select>
                </b-col>
            </b-row>
                <b-row class="m-0 mb-3">
                    <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                        <font-awesome-icon icon="map-marker" class="h3 mb-0" />
                    </b-col>
                    <b-col class="p-2 bg-light">
                        <small class="text-muted">Payroll Type</small>
                        <select class="form-control" v-model="form.payroll_type" required>
                            <option value="">Please Select</option>
                            <option value="1">Direct</option>
                            <option value="2">Indirect</option>
                        </select>
                    </b-col>
                </b-row>
            <b-row class="m-0 mb-3">
                <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="calendar" class="h3 mb-0" />
                </b-col>
                <b-col class="p-2 bg-light">
                  <small class="text-muted">From Date</small>
                  <input  type="date" 
                          class="form-control" 
                          placeholder="Transaction Date" 
                          required
                          v-model="form.date_from"
                        />
                </b-col>
            </b-row>
            <b-row class="m-0 mb-3">
                <b-col cols="1" class="text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center">
                  <font-awesome-icon icon="calendar" class="h3 mb-0" />
                </b-col>
                <b-col class="p-2 bg-light">
                  <small class="text-muted">To Date</small>
                  <input  type="date" 
                          class="form-control" 
                          placeholder="Transaction Date" 
                          required
                          v-model="form.date_to"
                        />
                </b-col>
            </b-row>
            <b-button type="submit" block variant="info" size="md"><font-awesome-icon icon="check-circle" /> Generate Payroll</b-button>
          </b-form>
        </div>
      </div>
    </b-modal>
    
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import ServerSidePaginatedTable from './ServerSidePaginatedTable.vue';
    export default {
      components: {ServerSidePaginatedTable},
      data: () => {
          return {
              table_settings:{
                  api_url:'payroll/all',
                  delete_url:'maintenance/manpowers/delete_cash_advance',
                  fields:[
                      {key: 'date_from_to', label:'Details'},
                      {key: 'voucher_number', label:'Voucher Number'},
                      {key: 'check_number', label:'Check Number'},
                      {key: 'remarks', label:'Remarks'},
                      {key: 'payroll_type', label:'Payroll Type'},
                      {key: 'action', label:'Action'},
                      // {key: 'action', label:'Action',class:'text-center'},
                  ]
              },
              modal:false,
              cash_advance:{},
              form:{
                payroll_type:'',
                project_id:'',
                date_from:'',
                date_to:''
              },
              projects:[],
              is_saving:false
          }
      },
      created(){
        bus.$on('serverSidePaginatedTableTopRightBtnClicked', (data)=>{
            this.modal = true;
        });
        bus.$on('serverSidePaginatedTableDbClick', (data)=>{
          this.$router.push('/manpowers/payroll/'+data.id);
        });
        this.getFields();
      },
      methods: {
        get(){
          this.$refs.displayTable.getAll();
        },
        generate(){
          this.$router.push('/manpowers/payroll/'+this.form.payroll_type+'/'+this.form.project_id+'/'+this.form.date_from+'/'+this.form.date_to);
        },
        getFields(){
          this.is_saving=true;
          this.axios.get('projects/all').then(response => {
              this.projects = response.data;
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
      }
    }
</script>
