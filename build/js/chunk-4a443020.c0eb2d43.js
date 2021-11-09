(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a443020"],{"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},f703:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("server-side-paginated-table",{ref:"displayTable",attrs:{fields:t.table_settings.fields,api_url:t.table_settings.api_url,delete_url:t.table_settings.delete_url,top_right_btn_redirect:!1}}),a("b-modal",{attrs:{centered:"",size:"md","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"list"}}),t._v(" Choose Project")],1)]),a("div",{staticClass:"card-body bg-white position-relative"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-form",{on:{submit:function(e){return e.preventDefault(),t.generate(e)}}},[a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"map-marker"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Project")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.project_id,expression:"form.project_id"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form,"project_id",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("Please Select")]),t._l(t.projects,(function(e){return a("option",{domProps:{value:e.id}},[t._v(" "+t._s(e.title)+" ")])}))],2)])],1),a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"calendar"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("From Date")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.date_from,expression:"form.date_from"}],staticClass:"form-control",attrs:{type:"date",placeholder:"Transaction Date",required:""},domProps:{value:t.form.date_from},on:{input:function(e){e.target.composing||t.$set(t.form,"date_from",e.target.value)}}})])],1),a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"calendar"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("To Date")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.date_to,expression:"form.date_to"}],staticClass:"form-control",attrs:{type:"date",placeholder:"Transaction Date",required:""},domProps:{value:t.form.date_to},on:{input:function(e){e.target.composing||t.$set(t.form,"date_to",e.target.value)}}})])],1),a("b-button",{attrs:{type:"submit",block:"",variant:"info",size:"md"}},[a("font-awesome-icon",{attrs:{icon:"check-circle"}}),t._v(" Generate Payroll")],1)],1)],1)])])],1)},i=[],r=a("56d7"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-3"},[a("div",{staticClass:"card-header bg-dark text-white"},[a("b-row",[a("b-col",[t.loading?a("div",[a("strong",[t._v(" Fetching result... ")])]):a("div",[a("font-awesome-icon",{attrs:{icon:"database"}}),a("strong",[t._v(" "+t._s(t.list.total)+" ")]),a("small",[t._v("Result/s found")])],1)]),a("b-col",{staticClass:"text-right"},[t.top_right_btn_redirect?a("router-link",{attrs:{to:"add"}},[a("b-button",{attrs:{variant:"secondary",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),t._v(" Process Payroll ")],1)],1):a("b-button",{attrs:{variant:"secondary",size:"sm"},on:{click:t.clickTopRightBtn}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),t._v(" Process Payroll ")],1)],1)],1)],1),a("div",{staticClass:"card-body bg-white mb-0"},[a("b-row",{staticClass:"mb-3"},[a("b-col",{attrs:{sm:"2"}},[a("b-form-select",{attrs:{options:t.options,size:"sm"},on:{change:t.changeDisplayNo},model:{value:t.selected_display_no,callback:function(e){t.selected_display_no=e},expression:"selected_display_no"}})],1),a("b-col",{attrs:{sm:"6","offset-sm":"4"}},[a("b-input-group",[a("b-input-group-prepend",[a("b-input-group-text",{staticClass:"bg-dark text-white"},[a("font-awesome-icon",{attrs:{icon:"search"}})],1)],1),a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_term,callback:function(e){t.search_term=e},expression:"search_term"}}),a("b-input-group-append",[a("b-button",{staticClass:"bg-dark text-white px-4",attrs:{variant:"dark",size:"sm",disabled:""==t.search_term},on:{click:t.clearSearch}},[a("font-awesome-icon",{attrs:{icon:"times"}})],1)],1)],1)],1)],1),a("b-table",{attrs:{selectable:"",selectedVariant:"info","select-mode":"single",dark:t.dark,hover:t.hover,striped:t.striped,bordered:t.bordered,fixed:t.fixed,responsive:"sm",items:t.table_items,fields:t.captions,busy:t.loading,"show-empty":"","head-variant":"dark"},on:{"row-dblclicked":t.rowDbClicked},scopedSlots:t._u([{key:"cell(action)",fn:function(e){return[a("div",{staticClass:"text-center"},[a("b-button",{attrs:{variant:"danger",size:"sm"},on:{click:function(a){return t.deleteRow(e.item.id)}}},[a("font-awesome-icon",{attrs:{icon:"minus-circle"}}),t._v(" Delete ")],1)],1)]}},{key:"cell(date_from_to)",fn:function(e){return[a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.item.project.title))]),a("div",{staticClass:"small text-muted"},[t._v(" "+t._s(e.item.date_from.other_formats.format_1)+" - "+t._s(e.item.date_to.other_formats.format_1)+" ")])]}},{key:"cell(remarks)",fn:function(e){return[a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.item.authorized.full_name))]),a("div",{staticClass:"small text-muted"},[t._v(" "+t._s(e.item.remarks)+" ")])]}}])},[a("div",{staticClass:"text-center my-2",attrs:{slot:"table-busy"},slot:"table-busy"},[a("br"),a("b-spinner",{staticClass:"align-middle",attrs:{small:""}}),a("br"),a("br"),a("strong",[t._v("Loading")])],1)]),t.list.total>0?a("nav",[a("b-pagination",{staticClass:"mb-0",attrs:{disabled:t.loading,align:"right","total-rows":t.total_rows,"per-page":t.per_page},on:{input:t.getAll},model:{value:t.list.current_page,callback:function(e){t.$set(t.list,"current_page",e)},expression:"list.current_page"}})],1):t._e()],1)])])},n=[],l=a("73e4"),c={name:"server-side-paginated-table",inheritAttrs:!1,mixins:[l["a"]],props:{hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!0},small:{type:Boolean,default:!0},fixed:{type:Boolean,default:!0},fields:{type:[Array,Object],default:function(){return[]}},dark:{type:Boolean,default:!1},api_url:{type:String,required:!0},delete_url:{type:String,required:!0},top_right_btn:{type:String,default:"",required:!1},top_right_btn_redirect:{type:Boolean,default:!0,required:!1}},data:function(){return{selected:[],list:{data:[],from:1,to:0,current_page:1,total:0,per_page:1},result:[],loading:!0,searchTimeout:function(){return{type:Function,default:function(){return{}}}},search_term:"",options:[{value:10,text:"Display 10 records"},{value:25,text:"Display 25 records"},{value:50,text:"Display 50 records"},{value:100,text:"Display 100 records"}],selected_display_no:10}},computed:{table_items:function(){return this.list.data},per_page:function(){return parseInt(this.list.per_page)},total_rows:function(){return parseInt(this.list.total)},captions:function(){return this.fields},total_selected:function(){return parseInt(this.selected.length)}},mounted:function(){this.getAll()},watch:{search_term:{immediate:!0,handler:function(){""!=this.search_term&&(this.loading=!0),this.list.current_page=1,this.getAll()}}},methods:{getAll:function(){var t=this;this.loading=!0,this.axios.get(this.api_url+"?page="+this.list.current_page+"&per_page="+this.selected_display_no+"&search="+this.search_term).then((function(e){var a=e.data;t.list=a,t.loading=!1})).catch((function(t){return console.log(t)}))},clickTopRightBtn:function(){r["bus"].$emit("serverSidePaginatedTableTopRightBtnClicked")},rowDbClicked:function(t){r["bus"].$emit("serverSidePaginatedTableDbClick",t)},clearSearch:function(){this.search_term="",this.getAll()},changeDisplayNo:function(){this.loading=!0,this.list.current_page=1,this.getAll()},deleteRow:function(t){var e=this;this.swalConfirmDelete((function(a){a.value&&(e.loading=!0,e.axios.delete(e.delete_url,{data:{id:t}}).then((function(t){e.getAll(),e.swal_transaction_completed_data.text="Record successfully deleted.",e.swalTransactionCompleted(),e.loading=!1})).catch((function(t){e.swalRequestError(),e.loading=!1})))}))}}},d=c,u=a("2877"),m=Object(u["a"])(d,o,n,!1,null,null,null),f=m.exports,p={components:{ServerSidePaginatedTable:f},data:function(){return{table_settings:{api_url:"payroll/all",delete_url:"maintenance/manpowers/delete_cash_advance",fields:[{key:"date_from_to",label:"Details"},{key:"voucher_number",label:"Voucher Number"},{key:"check_number",label:"Check Number"},{key:"remarks",label:"Remarks"}]},modal:!1,cash_advance:{},form:{project_id:"",date_from:"",date_to:""},projects:[],is_saving:!1}},created:function(){var t=this;r["bus"].$on("serverSidePaginatedTableTopRightBtnClicked",(function(e){t.modal=!0})),r["bus"].$on("serverSidePaginatedTableDbClick",(function(e){t.$router.push("/manpowers/payroll/"+e.id)})),this.getFields()},methods:{get:function(){this.$refs.displayTable.getAll()},generate:function(){this.$router.push("/manpowers/payroll/"+this.form.project_id+"/"+this.form.date_from+"/"+this.form.date_to)},getFields:function(){var t=this;this.is_saving=!0,this.axios.get("projects/all").then((function(e){t.projects=e.data,t.is_saving=!1})).catch((function(t){return console.log(t)}))}}},_=p,h=Object(u["a"])(_,s,i,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-4a443020.c0eb2d43.js.map