(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9c856112"],{1157:function(t,e,a){},"64c3":function(t,e,a){"use strict";var s=a("1157"),i=a.n(s);i.a},"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},"74fd":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("bread-crumbs"),a("b-card",{attrs:{"no-body":""}},[a("b-tabs",{attrs:{pills:"",card:"",vertical:"","nav-class":"bg-secondary p-2","active-nav-item-class":"bg-dark text-white","nav-wrapper-class":"nav-wrapper-custom-width"}},[a("b-tab",{attrs:{"title-item-class":"mb-2"}},[a("template",{slot:"title"},[a("h6",{staticClass:"mb-0 p-2 d-flex justify-content-between align-items-center"},[a("span",[t._v("Location Details")]),a("div",{staticClass:"text-center",staticStyle:{width:"25px"}},[a("font-awesome-icon",{attrs:{icon:"edit"}})],1)])]),a("b-card-text",{staticClass:"w-50"},[a("project-location-form-component",{attrs:{project_location:t.project_location}})],1)],2),a("b-tab",{attrs:{"title-item-class":"mb-0",active:""}},[a("template",{slot:"title"},[a("h6",{staticClass:"mb-0 p-2 d-flex justify-content-between align-items-center"},[a("span",[t._v("Structures")]),a("div",{staticClass:"text-center",staticStyle:{width:"25px"}},[a("font-awesome-icon",{attrs:{icon:"map-marker"}})],1)])]),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"p-0"},[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"map-marker"}}),t._v(" Structures")],1),a("b-button",{attrs:{variant:"secondary",size:"sm"},on:{click:function(e){t.add_project_location_structure_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),t._v(" Add New Structure ")],1)],1),a("div",{staticClass:"card-body bg-white"},["undefined"!=typeof t.project_location.labor_est?a("CRow",[a("CCol",[a("CWidgetBrand",{staticClass:"w-100 custom-font",attrs:{color:"info",rightHeader:t.project_location.labor_est.other_formats.format_1,rightFooter:"ESTIMATE",leftHeader:t.project_location.labor.other_formats.format_1,leftFooter:"USAGE"}},[a("div",{staticClass:"p-4"},[a("font-awesome-icon",{staticClass:"h1 mb-0",attrs:{icon:"users"}})],1)])],1),a("CCol",[a("CWidgetBrand",{staticClass:"w-100 custom-font",attrs:{color:"success",rightHeader:t.project_location.equipment_est.other_formats.format_1,rightFooter:"ESTIMATE",leftHeader:t.project_location.equipment.other_formats.format_1,leftFooter:"USAGE"}},[a("div",{staticClass:"p-4"},[a("font-awesome-icon",{staticClass:"h1 mb-0",attrs:{icon:"truck"}})],1)])],1),a("CCol",[a("CWidgetBrand",{staticClass:"w-100 custom-font",attrs:{color:"warning",rightHeader:t.project_location.material_est.other_formats.format_1,rightFooter:"ESTIMATE",leftHeader:t.project_location.material.other_formats.format_1,leftFooter:"USAGE"}},[a("div",{staticClass:"p-4"},[a("font-awesome-icon",{staticClass:"h1 mb-0",attrs:{icon:"cubes"}})],1)])],1),a("CCol",[a("CWidgetBrand",{staticClass:"w-100 custom-font",attrs:{color:"primary",rightHeader:"NA",rightFooter:"ESTIMATE",leftHeader:t.project_location.other_expense.other_formats.format_1,leftFooter:"USAGE"}},[a("div",{staticClass:"p-4"},[a("font-awesome-icon",{staticClass:"h1 mb-0",attrs:{icon:"list-ol"}})],1)])],1)],1):t._e(),a("table",{staticClass:"table border mb-0"},[a("thead",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Structure Description")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Manpower Expenses")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Equipment Expenses")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Material Expenses")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Other Expenses")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Action")])])]),a("tbody",t._l(t.project_location.project_location_structures,(function(e,s){return a("tr",[a("th",{attrs:{scope:"row"}},[t._v(t._s(e.description))]),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.labor.default)}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.equipment.default)}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.material.default)}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.other_expense.default)}})],1),a("td",{staticClass:"text-center"},[a("router-link",{attrs:{to:{path:String(e.id)},append:""}},[a("b-button",{staticClass:"mr-2",attrs:{type:"submit",size:"sm",variant:"info"}},[a("font-awesome-icon",{attrs:{icon:"edit"}}),t._v(" View")],1)],1),a("b-button",{attrs:{type:"submit",size:"sm",variant:"danger"},on:{click:function(a){return t.deleteRow(e.id)}}},[a("font-awesome-icon",{attrs:{icon:"minus-circle"}}),t._v(" Remove")],1)],1)])})),0)])],1)])])],1)],2),a("b-tab",{attrs:{"title-item-class":"mb-2"}},[a("template",{slot:"title"},[a("h6",{staticClass:"mb-0 p-2 d-flex justify-content-between align-items-center"},[a("span",[t._v("Reports")]),a("div",{staticClass:"text-center",staticStyle:{width:"25px"}},[a("font-awesome-icon",{attrs:{icon:"chart-pie"}})],1)])]),a("b-card-text",{staticClass:"w-50"},[a("reports",{attrs:{project_location:t.project_location}})],1)],2)],1)],1),a("b-modal",{attrs:{centered:"",size:"md","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.add_project_location_structure_modal,callback:function(e){t.add_project_location_structure_modal=e},expression:"add_project_location_structure_modal"}},[a("project-location-structure-form-component",{on:{addProjectLocationStructure:t.addProjectLocationStructure}})],1)],1)},i=[],o=a("56d7"),r=a("73e4"),n=a("c124"),c=a("d474"),l=a("86db"),u=a("edf9"),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"p-0"},[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"chart-pie"}}),t._v(" Reports")],1)]),a("div",{staticClass:"card-body bg-white"},[a("div",{staticClass:"list-group"})])])])],1)],1)},m=[],p={mixins:[r["a"]],props:{project_location:{type:Object,default:function(){},required:!1}},data:function(){return{}},watch:{project_location:{immediate:!0,deep:!0,handler:function(){}}},created:function(){},methods:{workAccomplishment:function(){var t=this.$router.resolve({path:"/reports/work-accomplishment-per-structure/"+this.project_location.id});window.open(t.href,"_blank")}}},_=p,f=a("2877"),h=Object(f["a"])(_,d,m,!1,null,null,null),b=h.exports,v={mixins:[r["a"]],components:{ProjectLocationFormComponent:n["a"],ProjectLocationStructureFormComponent:c["a"],NumberFormatComponent:l["a"],BreadCrumbs:u["a"],Reports:b},data:function(){return{project_location:{description:"",project_location_structures:[]},is_saving:!1,add_project_location_structure_modal:!1}},created:function(){var t=this;this.get(),o["bus"].$on("refreshComputations",(function(){t.get()}))},methods:{addProjectLocationStructure:function(){this.add_project_location_structure_modal=!1,this.get()},get:function(){var t=this;this.is_saving=!0,this.axios.get("project/locations/get",{params:{id:this.$route.params.project_location_id}}).then((function(e){t.project_location=e.data,t.is_saving=!1})).catch((function(t){return console.log(t)}))},deleteRow:function(t){var e=this;this.swalConfirmDelete((function(a){a.value&&(e.is_saving=!0,e.axios.delete("project/location/structures/delete",{data:{id:t}}).then((function(t){e.swalTransactionCompleted(),e.is_saving=!1,o["bus"].$emit("refreshComputations")})).catch((function(t){e.swal_transaction_error_data.text=t.response.data,e.swalRequestError(),e.is_saving=!1})))}))}}},w=v,g=(a("64c3"),Object(f["a"])(w,s,i,!1,null,null,null));e["default"]=g.exports},"86db":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-inline text-nowrap"},[t.currency?[t._v("₱ ")]:t._e(),t._v(t._s(t.input_value.toLocaleString("en-US",{minimumFractionDigits:t.decimal}))+" ")],2)},i=[],o={props:{input_value:{type:[Number,String],default:0,required:!0},decimal:{type:Number,default:2,required:!1},currency:{type:Boolean,default:!0,required:!1}},data:function(){return{}},created:function(){},methods:{}},r=o,n=a("2877"),c=Object(n["a"])(r,s,i,!1,null,null,null);e["a"]=c.exports},c124:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"p-0"},[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Add New Location")],1)]),a("div",{staticClass:"card-body bg-white"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-form",{on:{submit:t.save}},[a("b-form-group",{attrs:{label:"Location Name:",description:"This field is required"}},[a("b-form-input",{attrs:{type:"text",required:""},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),a("div",{staticClass:"text-right"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1)],1)],1)])])],1)],1)},i=[],o=a("73e4"),r={mixins:[o["a"]],props:{project_location:{type:Object,default:function(){},required:!1}},data:function(){return{form:{id:-1,description:"",project_id:this.$route.params.id},is_saving:!1}},watch:{project_location:{immediate:!0,deep:!0,handler:function(){"undefined"!==typeof this.project_location&&this.get()}}},created:function(){"undefined"!==typeof this.project_location&&this.get()},methods:{get:function(){this.is_saving=!0,this.form=this.project_location,this.is_saving=!1},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){e.value&&(t.is_saving=!0,t.axios.post("project/locations/save",t.form).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,t.$emit("addProjectLocation")})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1})))}))}}},n=r,c=a("2877"),l=Object(c["a"])(n,s,i,!1,null,null,null);e["a"]=l.exports},d474:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"p-0"},[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Add New Structure")],1)]),a("div",{staticClass:"card-body bg-white"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-form",{on:{submit:t.save}},[a("b-form-group",{attrs:{label:"Structure Name:",description:"This field is required"}},[a("b-form-input",{attrs:{type:"text",required:""},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),a("div",{staticClass:"text-right"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1)],1)],1)])])],1)],1)},i=[],o=a("73e4"),r={mixins:[o["a"]],props:{project_location_structure:{type:Object,default:function(){},required:!1}},data:function(){return{form:{id:-1,description:"",project_location_id:this.$route.params.project_location_id},is_saving:!1}},watch:{project_location_structure:{immediate:!0,deep:!0,handler:function(){"undefined"!==typeof this.project_location_structure&&this.get()}}},created:function(){"undefined"!==typeof this.project_location_structure&&this.get()},methods:{get:function(){this.is_saving=!0,this.form=this.project_location_structure,this.is_saving=!1},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){e.value&&(t.is_saving=!0,t.axios.post("project/location/structures/save",t.form).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,t.$emit("addProjectLocationStructure")})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1})))}))}}},n=r,c=a("2877"),l=Object(c["a"])(n,s,i,!1,null,null,null);e["a"]=l.exports},edf9:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("nav",{staticClass:"bg-white",attrs:{"aria-label":"breadcrumb"}},[a("ol",{staticClass:"breadcrumb"},[t.is_saving?a("li",{staticClass:"breadcrumb-item text-dark"},[t._v("Loading...")]):t._l(t.crumbs,(function(e){return a("li",{staticClass:"breadcrumb-item"},[a("router-link",{attrs:{to:e.link}},[t._v(" "+t._s(e.label)+" ")])],1)}))],2)])])},i=[],o=(a("56d7"),{data:function(){return{crumbs:[{label:"",link:""}],is_saving:!1}},created:function(){this.setCrumbs()},methods:{setCrumbs:function(){var t=this;this.is_saving=!0,"undefined"!=typeof this.$route.params.project_location_id&&"undefined"==typeof this.$route.params.project_location_structure_id?this.axios.get("crumbs/generate_from_location",{params:{id:this.$route.params.project_location_id}}).then((function(e){t.crumbs=[],t.crumbs.push({label:e.data.location_description,link:"/projects/"+e.data.id+"/"+e.data.location_id}),t.is_saving=!1})).catch((function(t){return console.log(t)})):"undefined"!=typeof this.$route.params.project_location_structure_id&&"undefined"==typeof this.$route.params.project_location_structure_item_id?this.axios.get("crumbs/generate_from_structure",{params:{id:this.$route.params.project_location_structure_id}}).then((function(e){t.crumbs=[],t.crumbs.push({label:e.data.location_description,link:"/projects/"+e.data.id+"/"+e.data.location_id}),t.crumbs.push({label:e.data.structure_description,link:"/projects/"+e.data.id+"/"+e.data.location_id+"/"+e.data.structure_id}),t.is_saving=!1})).catch((function(t){return console.log(t)})):"undefined"!=typeof this.$route.params.project_location_structure_item_id&&this.axios.get("crumbs/generate_from_item",{params:{id:this.$route.params.project_location_structure_item_id}}).then((function(e){t.crumbs=[],t.crumbs.push({label:e.data.location_description,link:"/projects/"+e.data.id+"/"+e.data.location_id}),t.crumbs.push({label:e.data.structure_description,link:"/projects/"+e.data.id+"/"+e.data.location_id+"/"+e.data.structure_id}),t.crumbs.push({label:e.data.item_description,link:"/projects/"+e.data.id+"/"+e.data.location_id+"/"+e.data.structure_id+"/"+e.data.item_id}),t.is_saving=!1})).catch((function(t){return console.log(t)}))}}}),r=o,n=a("2877"),c=Object(n["a"])(r,s,i,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-9c856112.614131b3.js.map