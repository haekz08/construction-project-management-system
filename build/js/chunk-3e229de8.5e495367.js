(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e229de8"],{"64e8":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"list"}}),t._v(" Payroll View")],1)]),a("div",{staticClass:"card-body bg-white position-relative"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-form",{on:{submit:function(e){return e.preventDefault(),t.confirm(e)}}},["undefined"!=typeof t.payroll.project.title?a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"p-0 pr-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-2 bg-info text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h2 mb-0",attrs:{icon:"map-marker"}})],1),a("b-col",{staticClass:"p-2 bg-white d-flex align-items-center border"},[a("div",[a("h6",{staticClass:"mb-0 text-muted"},[t._v("Project")]),a("h6",{staticClass:"mb-0"},[a("strong",[t._v(t._s(t.payroll.project.title))])])])])],1)],1),a("b-col",{staticClass:"p-0 px-1",attrs:{cols:"3"}},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-2 bg-info text-white d-flex align-items-center justify-content-center",attrs:{cols:"2"}},[a("font-awesome-icon",{staticClass:"h2 mb-0",attrs:{icon:"calendar"}})],1),a("b-col",{staticClass:"p-2 bg-white d-flex align-items-center border"},[a("div",[a("h6",{staticClass:"mb-0 text-muted"},[t._v("Date")]),a("h6",{staticClass:"mb-0"},[a("strong",[t._v(t._s(t.payroll.date_from.other_formats.format_3)+" - "+t._s(t.payroll.date_to.other_formats.format_3))])])])])],1)],1),a("b-col",{staticClass:"p-0 pl-1",attrs:{cols:"3"}},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-2 bg-info text-white d-flex align-items-center justify-content-center",attrs:{cols:"2"}},[a("font-awesome-icon",{staticClass:"h2 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-white d-flex align-items-center border"},[a("div",[a("h6",{staticClass:"mb-0 text-muted"},[t._v("Total")]),a("h6",{staticClass:"mb-0"},[a("strong",[a("number-format-component",{attrs:{input_value:Number(t.total)}})],1)])])])],1)],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"p-0 pr-1",attrs:{cols:"6"}},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Remarks")]),a("h6",{staticClass:"mb-0"},[a("strong",[t._v(t._s(t.payroll.remarks))])])])],1)],1),a("b-col",{staticClass:"p-0 px-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"2"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Voucher Number")]),a("h6",{staticClass:"mb-0"},[a("strong",[t._v(t._s(t.payroll.voucher_number))])])])],1)],1),a("b-col",{staticClass:"p-0 pl-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"2"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Check Number")]),a("h6",{staticClass:"mb-0"},[a("strong",[t._v(t._s(t.payroll.check_number))])])])],1)],1)],1),a("table",{staticClass:"table table-bordered mb-0 mt-3"},[a("thead",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{attrs:{scope:"col",rowspan:"2"}},[t._v("Employee")]),a("th",{staticClass:"text-center",attrs:{scope:"col",colspan:"2"}},[t._v("Hours")]),a("th",{staticClass:"text-center",attrs:{scope:"col",rowspan:"2"}},[t._v("Days")]),a("th",{staticClass:"text-center",attrs:{scope:"col",rowspan:"2"}},[t._v("Cost")]),a("th",{staticClass:"text-center",attrs:{scope:"col",rowspan:"2"}},[t._v("CA Balance")]),a("th",{staticClass:"text-center",attrs:{scope:"col",colspan:"2"}},[t._v("Deductions")]),a("th",{staticClass:"text-center",attrs:{scope:"col",rowspan:"2"}},[t._v("Remarks")]),a("th",{staticClass:"text-center",attrs:{scope:"col",rowspan:"2"}},[t._v("Total Payout")]),a("th",{staticClass:"text-center",attrs:{scope:"col",rowspan:"2"}},[t._v("Signature")])]),a("tr",[a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Regular")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("OT")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("CA Payment")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("OTHERS")])])]),a("tbody",t._l(t.payroll.payroll_details,(function(e,s){return a("tr",[a("td",[t._v(" "+t._s(e.manpower.full_name)+" ")]),a("td",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.total_regular_hours),currency:!1,decimal:1}})],1),a("td",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.total_ot_hours),currency:!1,decimal:1}})],1),a("td",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.total_days),currency:!1,decimal:1}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.initial_payout),currency:!1}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.previous_ca_balance),currency:!1}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.ca_payment),currency:!1}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.other_payment),currency:!1}})],1),a("td",{staticClass:"text-right"},[t._v(" "+t._s(e.remarks)+" ")]),a("td",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.total_payout)}})],1),a("td")])})),0),a("tfoot",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{staticClass:"text-right",attrs:{scope:"col",colspan:"9"}},[t._v("GRAND TOTAL PAYOUT")]),a("th",{staticClass:"text-right",attrs:{scope:"col"}},[a("number-format-component",{attrs:{input_value:Number(t.total)}})],1),a("th")])])])],1)],1)])])},r=[],o=(a("56d7"),a("73e4")),c=a("86db"),n={mixins:[o["a"]],components:{NumberFormatComponent:c["a"]},data:function(){return{payroll:{project:{},payroll_details:[]},is_saving:!1}},watch:{payroll:{immediate:!0,deep:!0,handler:function(){this.payroll.payroll_details.forEach((function(t,e){t.total_payout=Number(t.initial_payout)-(Number(t.ca_payment)+Number(t.sss_payment)+Number(t.philhealth_payment)+Number(t.pagibig_payment)+Number(t.other_payment))}))}}},computed:{total:function(){return this.payroll.payroll_details.reduce((function(t,e){return t+Number(e.total_payout)}),0)}},created:function(){var t=this;this.is_saving=!0;var e={id:this.$route.params.id};this.axios.get("payroll/get",{params:e}).then((function(e){t.payroll=e.data,t.is_saving=!1})).catch((function(t){return console.log(t)}))},methods:{}},l=n,i=a("2877"),u=Object(i["a"])(l,s,r,!1,null,null,null);e["default"]=u.exports},"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},"86db":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-inline text-nowrap"},[t.currency?[t._v("₱ ")]:t._e(),t._v(t._s(t.input_value.toLocaleString("en-US",{minimumFractionDigits:t.decimal}))+" ")],2)},r=[],o={props:{input_value:{type:[Number,String],default:0,required:!0},decimal:{type:Number,default:2,required:!1},currency:{type:Boolean,default:!0,required:!1}},data:function(){return{}},created:function(){},methods:{}},c=o,n=a("2877"),l=Object(n["a"])(c,s,r,!1,null,null,null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-3e229de8.5e495367.js.map