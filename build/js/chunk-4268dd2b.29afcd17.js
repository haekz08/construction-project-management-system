(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4268dd2b"],{"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},"86db":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-inline text-nowrap"},[t.currency?[t._v("₱ ")]:t._e(),t._v(t._s(t.input_value.toLocaleString("en-US",{minimumFractionDigits:t.decimal}))+" ")],2)},r=[],n={props:{input_value:{type:[Number,String],default:0,required:!0},decimal:{type:Number,default:2,required:!1},currency:{type:Boolean,default:!0,required:!1}},data:function(){return{}},created:function(){},methods:{}},i=n,o=a("2877"),c=Object(o["a"])(i,s,r,!1,null,null,null);e["a"]=c.exports},c6fe:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"p-2"},[a("b-row",{staticClass:"mt-2"},[a("b-col",{staticStyle:{"min-height":"300px"}},[t.is_loading?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),"undefined"!=typeof t.result.id?a("div",{staticClass:"p-2 bg-white"},[a("b-row",[a("b-col",[a("h6",[a("strong",[t._v("Project Name :")]),t._v(" "+t._s(t.result.project_location_structure.project_location.project.title))]),a("h6",[a("strong",[t._v("Location :")]),t._v(" "+t._s(t.result.project_location_structure.project_location.description))]),a("h6",[a("strong",[t._v("Structure :")]),t._v(" "+t._s(t.result.project_location_structure.description))])]),a("b-col",[a("h6",[a("strong",[t._v("Item :")]),t._v(" "+t._s(t.result.description))]),a("h6",[a("strong",[t._v("Unit :")]),t._v(" "+t._s(t.result.item_unit.description))]),a("h6",[a("strong",[t._v("Qty :")]),t._v(" "),a("number-format-component",{attrs:{input_value:Number(t.result.qty),currency:!1}})],1)])],1),a("table",{staticClass:"table table-bordered mb-0"},[a("thead",{staticClass:"thead-dark"},[a("tr",{staticClass:"text-center"},[a("th",{staticClass:"text-center",attrs:{colspan:"5"}},[t._v(" DETAILED ESTIMATE OF EQUIPMENT ")])]),a("tr",[a("th",{staticClass:"text-center"},[t._v(" Equipment Name ")]),a("th",{staticClass:"text-center"},[t._v(" Number of Equipment ")]),a("th",{staticClass:"text-center"},[t._v(" Est. Duration (Hours) ")]),a("th",{staticClass:"text-center"},[t._v(" Hourly Rate ")]),a("th",{staticClass:"text-center"},[t._v(" Total Estimated Amount ")])])]),t._l(t.result.equipment_estimates,(function(e){return a("tr",[a("th",{staticClass:"text-center"},[t._v(" "+t._s(e.equipment_type.description)+" ")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.qty),currency:!1}})],1),a("th",{staticClass:"text-center"},[t._v(" "+t._s(e.duration_in_hour)+" ")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.hourly_rate)}})],1),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.total)}})],1)])})),a("tfoot",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{colspan:"4"}},[t._v("TOTAL AMOUNT FOR EQUIPMENT")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(t.result.equipment_est.default)}})],1)])])],2),a("table",{staticClass:"table table-bordered mb-0 mt-2"},[a("thead",{staticClass:"thead-dark"},[a("tr",{staticClass:"text-center"},[a("th",{staticClass:"text-center",attrs:{colspan:"5"}},[t._v(" DETAILED ESTIMATE OF MATERIALS ")])]),a("tr",[a("th",{staticClass:"text-center"},[t._v(" Material Name ")]),a("th",{staticClass:"text-center"},[t._v(" Qty ")]),a("th",{staticClass:"text-center"},[t._v(" Unit ")]),a("th",{staticClass:"text-center"},[t._v(" Unit Cost ")]),a("th",{staticClass:"text-center"},[t._v(" Total Estimated Amount ")])])]),t._l(t.result.material_estimates,(function(e){return a("tr",[a("th",{staticClass:"text-center"},[t._v(" "+t._s(e.material.name)+" ")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.qty),currency:!1}})],1),a("th",{staticClass:"text-center"},[t._v(" "+t._s(e.material.material_unit.description)+" ")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.price)}})],1),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.total)}})],1)])})),a("tfoot",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{colspan:"4"}},[t._v("TOTAL AMOUNT FOR MATERIALS")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(t.result.material_est.default)}})],1)])])],2),a("table",{staticClass:"table table-bordered mb-0 mt-2"},[a("thead",{staticClass:"thead-dark"},[a("tr",{staticClass:"text-center"},[a("th",{staticClass:"text-center",attrs:{colspan:"5"}},[t._v(" DETAILED ESTIMATE OF LABOR ")])]),a("tr",[a("th",{staticClass:"text-center"},[t._v(" Job Description ")]),a("th",{staticClass:"text-center"},[t._v(" Hourly Rate ")]),a("th",{staticClass:"text-center"},[t._v(" Est. Duration (Hours) ")]),a("th",{staticClass:"text-center"},[t._v(" Number of Manpower ")]),a("th",{staticClass:"text-center"},[t._v(" Total Estimated Amount ")])])]),t._l(t.result.labor_estimates,(function(e){return a("tr",[a("th",{staticClass:"text-center"},[t._v(" "+t._s(e.job_description.description)+" ")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.hourly_rate)}})],1),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.duration_in_hour),currency:!1}})],1),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.qty),currency:!1}})],1),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(e.total)}})],1)])})),a("tfoot",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{colspan:"4"}},[t._v("TOTAL AMOUNT FOR LABOR")]),a("th",{staticClass:"text-center"},[a("number-format-component",{attrs:{input_value:Number(t.result.labor_est.default)}})],1)])])],2),a("table",{staticClass:"table table-bordered mb-0 mt-2"},[a("tr",[a("td",{staticClass:"text-right"},[a("h4",[t._v("TOTAL(EQUIPMENTS + MATERIALS + LABOR)")])]),a("td",{staticClass:"text-right"},[a("h4",[a("number-format-component",{attrs:{input_value:Number(t.result.grand_total_est.default)}})],1)])]),a("tr",[a("td",{staticClass:"text-right"},[a("h4",[t._v("UNIT COST")])]),a("td",{staticClass:"text-right"},[a("h4",[a("number-format-component",{attrs:{input_value:Number(t.result.grand_total_est.default)/t.result.qty}})],1)])])])],1):t._e()],1)],1)],1)},r=[],n=a("73e4"),i=a("86db"),o={mixins:[n["a"]],components:{NumberFormatComponent:i["a"]},data:function(){return{form:{id:this.$route.params.id},is_loading:!1,result:{}}},created:function(){this.get()},methods:{get:function(){var t=this;this.is_loading=!0,this.axios.get("reports/bill_of_materials",{params:this.form}).then((function(e){t.result=e.data,t.is_loading=!1})).catch((function(t){return console.log(t)}))}}},c=o,l=a("2877"),u=Object(l["a"])(c,s,r,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-4268dd2b.29afcd17.js.map