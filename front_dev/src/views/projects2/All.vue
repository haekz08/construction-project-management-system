<template>
  <div>
    <div class="card bg-light mb-3">
            <div class="card-header bg-dark text-white">
                <b-row>
                    <b-col>
                        <!-- <div v-if="!loading">
                            <font-awesome-icon icon="database" /><strong>&nbsp;{{list.total}}&nbsp;</strong>
                            <small>Result/s found</small>
                        </div>
                        <div v-else>
                            <strong>&nbsp;Fetching result...&nbsp;</strong>
                        </div> -->
                    </b-col>
                    <b-col class="text-right">
                        <router-link to="add">
                            <b-button variant="secondary" size="sm">
                                <font-awesome-icon icon="plus" /> Add New Project
                            </b-button>
                        </router-link>
                    </b-col>
                </b-row>
                
            </div>
            <div class="card-body bg-white mb-0">
                <b-row class="mb-3">
                    <b-col sm="2">
                        <b-form-select v-model="selected_display_no" :options="options" size="sm"></b-form-select>
                    </b-col>
                    <b-col sm="6" offset-sm="4">
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-input-group-text class="bg-dark text-white"><font-awesome-icon icon="search" /></b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input v-model="search_term" type="text" debounce="500" placeholder="Search..." autocomplete="off"></b-form-input>
                            <b-input-group-append>
                                    <b-button @click="search_term=''" variant="dark" class="bg-dark text-white px-4" size="sm" :disabled="search_term==''">
                                        <font-awesome-icon icon="times" />
                                    </b-button>
                                    <!--<i class="fa fa-close"></i>-->
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                
                
              <b-table
                show-empty
                stacked="md"
                :items="items"
                :fields="table_settings.fields"
                :filter="search_term"
                bordered
                striped
                head-variant="dark"
                selectable
                selectedVariant="info"
                select-mode="single"
                @row-dblclicked="rowDbClicked"
                :per-page="selected_display_no"
                :current-page="current_page"
                @filtered="filter"
              >
              </b-table>
              <nav v-if="total_rows>0">
                <b-pagination
                        
                        align="right"
                        :total-rows="total_rows"
                        :per-page="selected_display_no"
                        v-model="current_page"
                        class="mb-0"
                >
                </b-pagination>
              </nav>
            </div>
        </div>
    <!-- <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group> -->
  </div>
</template>
<script>
    import {bus} from '@/main.js';
    import ServerSidePaginatedTable from '@/views/helpers/ServerSidePaginatedTable.vue';
    export default {
      components: {ServerSidePaginatedTable},
      data: () => {
          return {
              table_settings:{
                  api_url:'projects/all',
                  delete_url:'maintenance/manpowers/delete',
                  fields:[
                      {key: 'title', label:'Project Title'},
                      {key: 'labor.other_formats.format_1', label:'Labor',class:'text-right'},
                      {key: 'equipment.other_formats.format_1', label:'Equipments',class:'text-right'},
                      {key: 'material.other_formats.format_1', label:'Materials',class:'text-right'},
                      {key: 'other_expense.other_formats.format_1', label:'Other Expenses',class:'text-right'},
                      {key: 'grand_total.other_formats.format_1', label:'Total',class:'text-right'},
                      {key: 'price.other_formats.format_1', label:'Contract Price',class:'text-right'},
                      // {key: 'action', label:'Action',class:'text-center'},
                  ]
              },
              items:[],
              search_term: '',
              options: [
                  { value: 10, text: 'Display 10 records' },
                  { value: 25, text: 'Display 25 records' },
                  { value: 50, text: 'Display 50 records' },
                  { value: 100, text: 'Display 100 records' }
              ],
              selected_display_no:10,
              current_page:1,
              total_rows:0
          }
      },
      created(){
        this.getAll();
      },
      methods:{
        getAll() {
            this.axios.get('projects/all').then(response => {
                let result=response.data;
                this.items=result
                this.total_rows = result.length;
                //console.log(result)
            }).catch(error => console.log(error));
        },
        rowDbClicked(data){
          this.$router.push('/projects/'+data.id);
        },
        filter(items) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.total_rows = items.length
          this.current_page = 1
        }
      }
    }
</script>
