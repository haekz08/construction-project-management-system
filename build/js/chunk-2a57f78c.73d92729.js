(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a57f78c"],{"24d3":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-form",{on:{submit:t.save}},[a("b-form-group",{attrs:{label:"Material Name:",description:"This field is required"}},[a("b-form-input",{attrs:{type:"text",required:""},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("b-form-group",{attrs:{label:"Material Unit:",description:"This field is required"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.material_unit_id,expression:"form.material_unit_id"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form,"material_unit_id",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("Please Select")]),t._l(t.material_units,(function(e){return a("option",{domProps:{value:e.id}},[t._v(" "+t._s(e.description)+" ")])}))],2)]),a("div",{staticClass:"text-right"},[a("router-link",{attrs:{to:"/maintenance/materials/all"}},[-1!=t.form.id?a("b-button",{staticClass:"mr-1",attrs:{variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"chevron-left"}}),t._v(" Back")],1):t._e()],1),a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1)],1)],1)},n=[],s=a("73e4"),r={mixins:[s["a"]],data:function(){return{form:{id:-1,name:"",material_unit_id:""},material_units:[],form_copy:{},is_saving:!1}},created:function(){this.form_copy=JSON.parse(JSON.stringify(this.form)),"undefined"!==typeof this.$route.params.id&&this.get(),this.getFields()},methods:{get:function(){var t=this;this.is_saving=!0,this.axios.get("maintenance/materials/get",{params:{id:this.$route.params.id}}).then((function(e){t.form=e.data,t.is_saving=!1})).catch((function(t){return console.log(t)}))},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){e.value&&(t.is_saving=!0,t.axios.post("maintenance/materials/save",t.form).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,-1==t.form.id&&(t.form=JSON.parse(JSON.stringify(t.form_copy)))})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1})))}))},getFields:function(){var t=this;this.is_saving=!0,this.axios.get("maintenance/material_units/all").then((function(e){t.material_units=e.data,t.is_saving=!1})).catch((function(t){return console.log(t)}))}}},o=r,l=a("2877"),c=Object(l["a"])(o,i,n,!1,null,null,null);e["a"]=c.exports},"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},e70d:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"p-0",attrs:{sm:"4"}},[a("div",{staticClass:"card bg-light mb-3"},[a("div",{staticClass:"card-header bg-dark text-white"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"edit"}}),t._v(" Update Record")],1)]),a("div",{staticClass:"card-body position-relative"},[a("form-component")],1)])])],1)],1)},n=[],s=a("24d3"),r={components:{FormComponent:s["a"]},data:function(){return{}},created:function(){},methods:{}},o=r,l=a("2877"),c=Object(l["a"])(o,i,n,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2a57f78c.73d92729.js.map