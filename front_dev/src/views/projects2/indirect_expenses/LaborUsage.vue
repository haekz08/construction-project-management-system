<template>
    <div>
        <b-row class="m-0">
            <b-col class="p-0">
                <div class="card bg-light mb-0">
                    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">
                            <font-awesome-icon icon="list"/>
                            Labor Usage
                        </h6>
                        <b-button variant="secondary" size="sm" @click="modal=true">
                            <font-awesome-icon icon="plus"/>
                            Add New
                        </b-button>
                    </div>
                    <div class="card-body bg-white position-relative">
                        <b-row align-v="center" class="loader" v-if="is_saving">
                            <b-col>
                                <b-spinner></b-spinner>
                                <br><br>
                                <strong>Loading</strong>
                            </b-col>
                        </b-row>
                        <table class="table table-bordered mb-0">
                            <thead class="bg-light text-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col" class="text-center">Job Description</th>
                                <th scope="col" class="text-center">Daily Rate</th>
                                <th scope="col" class="text-center">Regular Hours</th>
                                <th scope="col" class="text-center">OT Hours</th>
                                <th scope="col" class="text-center">Total</th>
                                <th scope="col" class="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(manpower_usage, index) in manpower_usages">
                                <th scope="row">{{manpower_usage.manpower.full_name}}</th>
                                <th scope="row">{{manpower_usage.job_description.description}}</th>
                                <td class="text-right">
                                    <number-format-component :input_value="Number(manpower_usage.daily_rate)"/>
                                </td>
                                <td class="text-right">
                                    <number-format-component :input_value="Number(manpower_usage.regular_hours)"
                                                             :currency="false"/>
                                </td>
                                <td class="text-right">
                                    <number-format-component :input_value="Number(manpower_usage.ot_hours)"
                                                             :currency="false"/>
                                </td>
                                <td class="text-right">
                                    <number-format-component :input_value="Number(manpower_usage.total)"/>
                                </td>
                                <td class="text-center">
                                    <b-button type="submit" size="sm" variant="danger"
                                              @click="deleteItem(manpower_usage.id)">
                                        <font-awesome-icon icon="minus-circle"/>
                                        Remove
                                    </b-button>
                                </td>
                            </tr>
                            </tbody>
                            <tfoot class="bg-light text-dark">
                            <tr>
                                <th scope="col" class="text-right" colspan="5">TOTAL</th>
                                <th scope="col" class="text-right">
                                    <number-format-component :input_value="Number(total_usage)"/>
                                </th>
                                <th scope="col" class="text-center"></th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-modal v-model="manpower_modal" centered size="lg" body-class="p-0" :hide-footer="true" :hide-header="true">
            <manpower-modal @select="selectManpower"/>
        </b-modal>


        <b-modal v-model="modal" centered size="md" body-class="p-0" :hide-footer="true" :hide-header="true">
            <div class="card bg-light mb-0">
                <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">
                        <font-awesome-icon icon="plus-circle"/>
                        Indirect Manpower Logs
                    </h6>
                </div>
                <div class="card-body bg-white position-relative">
                    <b-row align-v="center" class="loader" v-if="modal_is_saving">
                        <b-col>
                            <b-spinner></b-spinner>
                            <br><br>
                            <strong>Loading</strong>
                        </b-col>
                    </b-row>
                    <b-input-group prepend="Employee" size="sm" class="mb-3">
                        <b-form-input v-model="form.manpower.full_name"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="info" @click="manpower_modal=true">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-form-group
                            label="Job Description:"
                            description="This field is required"
                    >

                            <select class="form-control form-control-sm mb-2" v-model="form.job_description_id" required>
                                <option value="">Please Select</option>
                                <option v-for="job_description in job_descriptions" :value="job_description.id">
                                    {{job_description.description}}
                                </option>
                            </select>
                    </b-form-group>
                    <b-form-group
                            label="Daily Rate:"
                            description="This field is required"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    v-model="form.daily_rate"
                                    type="number"
                                    required
                                    size="sm"
                                    class="bg-white text-dark"
                            ></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group
                            label="Regular Hours:"
                            description="This field is required"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    v-model="form.regular_hours"
                                    type="number"
                                    required
                                    size="sm"
                                    class="bg-white text-dark"
                            ></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group
                            label="OT Hours:"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    v-model="form.ot_hours"
                                    type="number"
                                    size="sm"
                                    class="bg-white text-dark"
                            ></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <div class="text-right">
                        <b-button type="submit" variant="dark" size="sm" @click="save()">
                            <font-awesome-icon icon="save"/>
                            Save
                        </b-button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import SwalMixin from '@/views/mixins/Swal.js'
    import NumberFormatComponent from '@/views/helpers/NumberFormatComponent.vue';
    import ManpowerModal from '@/views/helpers/ManpowerModal.vue';

    export default {
        mixins: [SwalMixin],
        components: {NumberFormatComponent, ManpowerModal},
        props: {
            manpower_usages: {
                type: Array,
                default: () => [],
                required: false
            },
            indirect_daily_log_id: {
                type: Number,
                required: false
            }
        },
        computed: {
            total_usage() {
                return this.manpower_usages.reduce((total, value) => {
                    return total + Number(value.total);
                }, 0);
            },
        },
        data() {
            return {
                is_saving: false,
                modal_is_saving: false,
                job_descriptions: [],
                modal: false,
                manpower_modal: false,
                form: {
                    id:-1,
                    manpower:{
                        id:-1,
                        full_name:'',
                    },
                    manpower_id:-1,
                    daily_rate:0,
                    regular_hours:8,
                    ot_hours:0,
                    total:0,
                    job_description_id:''
                }
            }
        },
        watch: {
            manpower_usages: {
                immediate: true,
                deep: true,
                handler() {
                    //this.get();
                }
            }
        },
        created() {
            this.getFields();
        },
        methods: {
            save() {
                event.preventDefault();
                this.swalConfirmSubmit((data) => {
                    if (data.value) {
                        this.modal_is_saving = true;
                        let form = this.form;
                        form.indirect_daily_log_id = this.indirect_daily_log_id;
                        this.axios.post('indirect_daily_log/manpower_usages/save', form).then(response => {
                            this.swalTransactionCompleted();
                            this.modal_is_saving = false;
                            this.modal = false;
                            this.$emit('addLabor');
                        }).catch(error => {
                            this.swal_transaction_error_data.text = error.response.data;
                            this.swalRequestError();
                            this.modal_is_saving = false;
                        });
                    }
                });
            },
            getFields() {
                this.is_saving = true;
                this.axios.get('maintenance/job_descriptions/all').then(response => {
                    this.job_descriptions = response.data;
                    this.is_saving = false;
                }).catch(error => console.log(error));
            },
            deleteItem(id) {
                this.swalConfirmDelete((data) => {
                    if (data.value) {
                        this.is_saving = true;
                        this.axios.delete('indirect_daily_log/manpower_usages/delete', {data: {id: id}}).then(response => {
                            this.swalTransactionCompleted();
                            this.is_saving = false;
                            this.$emit('addLabor');
                        }).catch(error => {
                            this.swal_transaction_error_data.text = error.response.data;
                            this.swalRequestError();
                            this.is_saving = false;
                        });
                    }
                });

            },
            selectManpower(manpower) {

                this.form.manpower=manpower;
                this.form.manpower_id=manpower.id;
                this.form.job_description_id=manpower.job_description_id;
                this.form.daily_rate=manpower.job_description.daily_rate.default;
                this.manpower_modal=false;
            }
        }
    }
</script>
