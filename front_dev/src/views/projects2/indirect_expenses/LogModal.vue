<template>
  <div>
    <div class="card bg-light mb-0">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h6 class="mb-0"><font-awesome-icon icon="plus-circle" /> Indirect - Transaction Log</h6>
      </div>
      <div class="card-body bg-white position-relative" style="min-height:80vh">
          <b-row align-v="center" class="loader" v-if="is_saving">
                <b-col>
                    <b-spinner></b-spinner>
                    <br><br>
                    <strong>Loading</strong>
                </b-col>
            </b-row>
          <b-row class="m-0 mb-3">
            <b-col cols="3" class="p-0">
                <b-row class="m-0 h-100">
                    <b-col cols="2" class="text-center p-2 bg-dark text-white d-flex align-items-center justify-content-center">
                        <font-awesome-icon icon="list" class="h2 mb-0" />
                    </b-col>
                    <b-col class="p-3 bg-white d-flex align-items-center border">
                        <div>
                        <h4 class="mb-0"><strong>{{project.title}}</strong></h4>
                        <small class="text-muted text-uppercase font-weight-bold">PROJECT TITLE</small>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="3" class="p-0 pl-3">
                <b-row class="m-0 h-100">
                    <b-col cols="2" class="text-center p-2 bg-dark text-white d-flex align-items-center justify-content-center">
                        <font-awesome-icon icon="calendar" class="h2 mb-0" />
                    </b-col>
                    <b-col class="p-3 bg-white d-flex align-items-center border">
                        <div class="w-100">
                        <b-form-input
                            type="date"
                            required
                            v-model="daily_log.transaction_date"
                            ></b-form-input>
                        <small class="text-muted text-uppercase font-weight-bold">TRANSACTION DATE</small>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="3" class="p-0 pl-3">
                <b-row class="m-0 h-100">
                    <b-col cols="2" class="text-center p-2 bg-dark text-white d-flex align-items-center justify-content-center">
                        <font-awesome-icon icon="flag" class="h2 mb-0" />
                    </b-col>
                    <b-col class="p-3 bg-white d-flex align-items-center border">
                        <div>
                        <h4 class="mb-0"><strong><number-format-component :input_value="Number(total)"/></strong></h4>
                        <small class="text-muted text-uppercase font-weight-bold">TOTAL</small>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="3" class="p-0 pl-3 cursor-pointer">
                <b-row class="m-0 h-100" @click="save()">
                    <b-col cols="2" class="text-center p-2 bg-success text-white d-flex align-items-center justify-content-center">
                        <font-awesome-icon icon="save" class="h2 mb-0" />
                    </b-col>
                    <b-col class="p-3 bg-white d-flex align-items-center border">
                        <div>
                        <h4 class="mb-0"><strong>SAVE</strong></h4>
                        <small class="text-muted text-uppercase font-weight-bold">CLICK TO SAVE TRANSACTION</small>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <template v-if="daily_log.id!=-1">
        <hr>
        <b-tabs content-class="mt-3">
          <b-tab title="Labor" active>
            <labor-usage :manpower_usages="daily_log.manpower_usages" :indirect_daily_log_id="daily_log.id"  @addLabor="get()" />
          </b-tab>
        </b-tabs>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import LaborUsage from './LaborUsage.vue';
    export default {
      mixins:[SwalMixin],
      components: {NumberFormatComponent,LaborUsage},
      props:{
          project: {
              type: Object,
              default: () => {},
              required:false
          },
          indirect_daily_log_id: {
              type: Number,
              required:false
          }
      },
      data() {
        return {
          is_saving:false,
          modal:false,
          daily_log:{
              id:this.indirect_daily_log_id,
              transaction_date:'',
              project_id:this.$route.params.id,
              manpower_usages:[]
          }
        }
      },
      computed: {
        total() {
          return this.total_manpower_usage;
        },
        total_manpower_usage(){
            return this.daily_log.manpower_usages.reduce((total, value)=>{
              return total + Number(value.total);
            },0);
        },
      },
      watch: {
          project:{
            immediate: true,
            deep:true,
            handler(){
                //this.get();
            }
        },
        indirect_daily_log_id:{
            immediate: true,
            deep:true,
            handler(){
              if(this.indirect_daily_log_id != -1)
                this.get();
            }
        }
      },
      created(){
      },
      methods: {
        save(){
            if(this.daily_log.transaction_date==''){
                this.swal_transaction_error_data.text = 'Transaction date is required.';
                this.swalRequestError();
                return
            }
            this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                let form = JSON.parse(JSON.stringify(this.daily_log));
                form.total_labor = this.total_manpower_usage;
                form.grand_total = this.total;
                this.axios.post('indirect_daily_logs/save',form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    if(this.daily_log.id != -1){
                      this.$emit('save');
                    }else{
                      this.daily_log.id = response.data.id;
                    }
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        },
        get(){
            this.is_saving=true;
            this.axios.get('indirect_daily_logs/get',{params:{id:this.daily_log.id}}).then(response => {
              let data = response.data;
              data.transaction_date = response.data.transaction_date.default;
              bus.$emit('refreshComputations');
              this.daily_log=data;
              this.is_saving=false;
            }).catch(error => console.log(error));
          },
      }
    }
</script>
