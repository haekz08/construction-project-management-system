<template>
  <div class="p-2">
    <b-form @submit.prevent="generate">
    <h3 class="text-center">WORK ACCOMPLISHMENT REPORT</h3>
    <div class="d-flex justify-content-center">
      <div class="input-group w-50">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Input Date Range</span>
        </div>
        <input type="date" class="form-control" placeholder="Date From" v-model="form.from">
        <input type="date" class="form-control" placeholder="Date To" v-model="form.to">
        <div class="input-group-append">
          <button class="btn btn-info" type="submit"><font-awesome-icon icon="check-circle" /> GENERATE</button>
        </div>
      </div>
    </div>
    </b-form>
    <b-row class="mt-2">
      <b-col style="min-height:300px;">
        <b-row align-v="center" class="loader" v-if="is_loading">
            <b-col>
                <b-spinner></b-spinner>
                <br><br>
                <strong>Loading</strong>
            </b-col>
        </b-row>
        
        <div class="p-2 bg-white" v-if="result.length >0">
          <table class="table table-bordered ">
            <thead>
            <tr class="	table-head-style">
              <td colspan="8">
                <div class="h5 mb-0">{{details.project_location_structure.project_location.project.title}}</div>
                <div class="small text-muted">
                  {{details.project_location_structure.project_location.description}}
                  | {{details.project_location_structure.description}}
                  | {{details.description}}
                </div>
              </td>
            </tr>
            <tr>
              <td>Material</td>
              <td>Unit</td>
              <td>Estimated</td>
              <td>
                Requested
              </td>
              <td>
                Purchased
              </td>
              <td>
                Delivered
              </td>
              <td>
                Withdrawn
              </td>
              <td>
                Issued
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in result">
              <td>{{row.name}}</td>
              <td>{{row.description}}</td>
              <td class="text-right"><number-format-component :input_value="Number(row.qty)" :currency="false"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.requested_qty)" :currency="false" v-if="row.requested_qty!=null"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.purchased_qty)" :currency="false" v-if="row.purchased_qty!=null"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.delivered_qty)" :currency="false" v-if="row.delivered_qty!=null"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.withdrawn_qty)" :currency="false" v-if="row.withdrawn_qty!=null"/></td>
              <td class="text-right"><number-format-component :input_value="Number(row.issued_qty)" :currency="false" v-if="row.issued_qty!=null"/></td>
            </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
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
          form:{
            id:this.$route.params.id,
            from:'',
            to:''
          },
          is_loading:false,
          result:[],
          details:{}
        }
      },
      created(){
      },
      computed: {
          unit_price(){
                return Number(this.result.details.grand_total_est.default) / Number(this.result.details.qty);
          },
      },
      methods: {
        generate(){
          this.is_loading=true;
          this.axios.get('reports/work-accomplishment',{params:this.form}).then(response => {
            this.result = response.data.materials;
            this.details = response.data.details;
              this.is_loading=false;
          }).catch(error => console.log(error));
        }
      }
    }
</script>
