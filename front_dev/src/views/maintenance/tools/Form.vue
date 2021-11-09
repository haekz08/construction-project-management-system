<template>
  <div>
    <b-row align-v="center" class="loader" v-if="is_saving">
        <b-col>
            <b-spinner></b-spinner>
            <br><br>
            <strong>Loading</strong>
        </b-col>
    </b-row>
    <b-row class="bg-white m-0 border">
      <b-col cols="3" class="border-right p-3">
        <b-form @submit.prevent="save">
          <b-form-group
            label="Name:"
            description="This field is required"
          >
            <b-form-input
              v-model="form.description"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <div class="text-right">
            <router-link to="/maintenance/tools/all">
              <b-button v-if="form.id!=-1" variant="dark" size="sm" class="mr-1">
                <font-awesome-icon icon="chevron-left" /> Back</b-button>
            </router-link>
              <b-button type="submit" variant="dark" size="sm"><font-awesome-icon icon="save" /> Save Tool</b-button>
          </div>
        </b-form>
      </b-col>
      <b-col class="p-2">
        <b-button type="submit" size="sm" class="float-right mb-2" @click="addTool()"><font-awesome-icon icon="plus-circle" /> Add Tool</b-button>
        <table class="table border-bottom">
          <thead class="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Code</th>
              <th scope="col" class="text-center">Hourly Rate</th>
              <th scope="col" class="text-center">Company Property</th>
              <th scope="col" class="text-center">Designated To</th>
              <th scope="col" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(tool, index) in form.tools" v-if="!tool.is_deleted">
            <tr>
              <td class="text-center">
                <b-button size="sm" variant="info" @click="tool.show_details=!tool.show_details"><font-awesome-icon icon="info-circle" /></b-button>
              </td>
              <th scope="row">{{tool.code}}</th>
              <td class="text-right"><number-format-component :input_value="Number(tool.hourly_rate)"/></td>
              <td class="text-center">
                  {{(tool.is_company_owned) ? 'YES' : 'NO'}}
              </td>
              <td class="text-center">
                <template v-if="tool.id==-1">
                  <b-badge variant="danger" class="cursor-pointer">No Designation Yet | Please save your data.</b-badge>
                </template>
                <template v-else>
                  <b-badge variant="danger" class="cursor-pointer" v-if="tool.tool_designation==null" @click="designate(tool)">No Designation Yet</b-badge>
                  <b-badge variant="success" class="cursor-pointer" v-else @click="designate(tool)">{{tool.tool_designation.manpower.full_name}}</b-badge>
                </template>
              </td>
              <td class="text-center">
                <b-button type="submit" size="sm" variant="info" class="mr-2" @click="updateTool(index,tool)"><font-awesome-icon icon="edit" /> Edit</b-button>
                <b-button type="submit" size="sm" variant="danger" @click="deleteTool(index)"><font-awesome-icon icon="minus-circle" /> Remove</b-button>
              </td>
            </tr>
            
            <tr v-show="tool.show_details" v-if="tool.tool_designation !== null">
              <td colspan="6">
                <b-collapse v-model="tool.show_details" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <template v-if="tool.tool_designation.project_location_structure_item !== null">
                      <h6>Project : <strong>{{tool.tool_designation.project_location_structure_item.project_location_structure.project_location.project.title}}</strong></h6>
                      <h6>Location : <strong>{{tool.tool_designation.project_location_structure_item.project_location_structure.project_location.description}}</strong></h6>
                      <h6>Structure : <strong>{{tool.tool_designation.project_location_structure_item.project_location_structure.description}}</strong></h6>
                      <h6>Item : <strong>{{tool.tool_designation.project_location_structure_item.description}}</strong></h6>
                    </template>
                    <template v-else>
                      <strong>Main Office</strong>
                    </template>
                    <hr>
                    <h6><strong>Details:</strong></h6>
                    {{tool.remarks}}
                    </b-card-body>
                </b-collapse>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <!-- START OF TOOL MODAL -->
      <b-modal v-model="add_tool_modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
              <add-tool-component :tool_form="default_tool_form" :current_tools="form.tools"  @saveTool="saveTool" />
      </b-modal>
      <!-- END OF TOOL MODAL -->

      <!-- START OF DESIGNATION MODAL -->
      <b-modal v-model="designation_modal" centered size="xl" body-class="p-0" modal-class="xxl-modal" :hide-footer="true" :hide-header="true" @hide="get()">
          <designation :tool="selected_tool" @save="designation_modal=false" />
      </b-modal>
      <!-- END OF DESIGNATION MODAL -->
  </div>
</template>
<script>
    import AddToolComponent from './AddToolComponent.vue';
    import Designation from './Designation.vue';
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import SwalMixin from '@/views/mixins/Swal.js'
    export default {
      mixins:[SwalMixin],
      components: {AddToolComponent,NumberFormatComponent,Designation},
      data() {
        return {
          form: {
            id:-1,
            description: '',
            tools:[]
          },
          form_copy:{},
          default_tool_form: {
            index_id:-1,
            id:-1,
            code: '',
            hourly_rate: '',
            is_company_owned: false,
            is_deleted:false,
            tool_designation:null,
            tool_designations:null,
          },
          is_saving:false,
          add_tool_modal:false,
          designation_modal:false,
          selected_tool:{},
          maintenance_modal:false
        }
      },
      watch: {
        form:{
            immediate: true,
            deep:true,
            handler(){
              
            }
        }
      },
      created(){
        this.form_copy=JSON.parse(JSON.stringify(this.form));
        if(typeof this.$route.params.id !== 'undefined')
        this.get();
      },
      methods: {
        get(){
          this.is_saving=true;
          this.axios.get('maintenance/tool_types/get',{params:{id:this.$route.params.id}}).then(response => {
              this.form.tools = [];
              this.form.id=response.data.id;
              this.form.description=response.data.description;
              response.data.tools.forEach((e) => {
                let tool = e;
                tool.is_deleted=false;
                tool.show_details=false;
                this.form.tools.push(tool);
              });
              this.is_saving=false;
          }).catch(error => console.log(error));
        },
        save(){
          event.preventDefault()
          this.swalConfirmSubmit((data)=>{
              if (data.value) {
                this.is_saving=true;
                this.axios.post('maintenance/tool_types/save',this.form).then(response => {
                    this.swalTransactionCompleted();
                    this.is_saving=false;
                    if(this.form.id==-1){
                      this.form=JSON.parse(JSON.stringify(this.form_copy));
                    }else{
                      this.get();
                    }
                }).catch(error => {
                    this.swal_transaction_error_data.text = error.response.data;
                    this.swalRequestError();
                    this.is_saving=false;
                });
              }
          });
        },
        addTool(){
          let form = {
            index_id:-1,
            id:-1,
            code: '',
            hourly_rate: '',
            is_company_owned: false,
            is_deleted:false,
            tool_designation:null,
            tool_designations:[]
          }
          this.default_tool_form = form;
          this.add_tool_modal=true;
        },
        updateTool(index,tool){
          this.default_tool_form = tool;
          this.default_tool_form.index_id = index;
          this.add_tool_modal = true;
        },
        saveTool(tool){
          if(tool.index_id==-1){
            tool.tool_type_id = this.form.id;
            this.form.tools.push(tool);
          }else{
            this.form.tools[tool.index_id]=tool;
          }
          
          this.add_tool_modal=false;
        },
        deleteTool(index){
          this.swalConfirmDelete((data)=>{
              if (data.value) {
                this.form.tools[index].is_deleted = true;
              }
          });
          
        },
        designate(tool){
          this.designation_modal=true;
          this.selected_tool = tool;
        },
        maintenance(tool){
          this.maintenance_modal=true;
          this.selected_tool = tool;
        }
      }
    }
</script>
