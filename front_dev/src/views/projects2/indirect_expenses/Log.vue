<template>
    <div>
        <server-side-paginated-table
                :fields="table_settings.fields"
                :api_url="table_settings.api_url"
                :delete_url="table_settings.delete_url"
                :project_id="project.id"
                ref="displayTable"
                :top_right_btn_redirect="false"
                @serverSidePaginatedTableTopRightBtnClicked="serverSidePaginatedTableTopRightBtnClicked"
                @serverSidePaginatedTableDbClick="serverSidePaginatedTableDbClick"
        />

        <b-modal v-model="modal" centered size="xl" body-class="p-0" modal-class="xxl-modal" :hide-footer="true"
                 :hide-header="true">
            <log-modal :project="project" :indirect_daily_log_id="indirect_daily_log_id" @save="save()"/>
        </b-modal>
    </div>
</template>
<script>
    import {bus} from '@/main.js'
    import SwalMixin from '@/views/mixins/Swal.js'
    import ServerSidePaginatedTable from './IndirectServerSidePaginatedTable';
    import FormComponent from './Form.vue';
    import LogModal from './LogModal.vue';

    export default {
        components: {FormComponent, ServerSidePaginatedTable, LogModal},
        mixins: [SwalMixin],
        props: {
            project: {
                type: Object,
                default: () => {
                },
                required: false
            }
        },
        data() {
            return {
                modal: false,
                table_settings: {
                    api_url: 'indirect_daily_logs/get_by_item',
                    delete_url: 'indirect_daily_logs/delete',
                    fields: [
                        {key: 'transaction_date.other_formats.format_1', label: 'Transaction Date'},
                        {key: 'labor', label: 'Labor', class: 'text-center'},
                        {key: 'total', label: 'Total', class: 'text-center'},
                        {key: 'action', label: 'Action', class: 'text-center'},
                    ]
                },
                indirect_expense: {},
                indirect_daily_log_id: -1
            }
        },
        watch: {
            project: {
                immediate: true,
                deep: true,
                handler() {
                }
            }
        },
        created() {

        },
        methods: {
            refresh() {
                this.modal = false;
                bus.$emit('reloadIndirectExpenseTable');
                bus.$emit('refreshComputations');
            },
            resetForm() {
                this.indirect_expense = {};
            },
            save() {
                bus.$emit('refreshComputations');
            },
            serverSidePaginatedTableTopRightBtnClicked(data) {
                this.modal = true;
            },
            serverSidePaginatedTableDbClick(data) {
                this.viewItem(data.id);
            },
            viewItem(indirect_daily_log_id) {
                this.indirect_daily_log_id = indirect_daily_log_id;
                this.modal = true;
            },
        }
    }
</script>
