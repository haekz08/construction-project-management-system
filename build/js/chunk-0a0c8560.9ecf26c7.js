(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a0c8560"],{"1c5b":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Material Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t.results.length>0?a("div",{staticClass:"list-group bg-white mt-2",staticStyle:{"max-height":"260px","overflow-y":"auto"}},t._l(t.results,(function(e){return a("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.select(e)}}},[t._v(t._s(e.name))])})),0):t._e()],1)])])},r=[],i=a("73e4"),o=a("86db"),c={mixins:[i["a"]],components:{NumberFormatComponent:o["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",results:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.search()}}},created:function(){},methods:{search:function(){var t=this;this.axios.get("maintenance/materials/search?search="+this.search_key).then((function(e){t.results=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},n=c,l=a("2877"),m=Object(l["a"])(n,s,r,!1,null,null,null);e["a"]=m.exports},"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},"86db":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-inline"},[t.currency?[t._v("₱ ")]:t._e(),t._v(t._s(t.input_value.toLocaleString("en-US",{minimumFractionDigits:t.decimal}))+" ")],2)},r=[],i={props:{input_value:{type:[Number,String],default:0,required:!0},decimal:{type:Number,default:2,required:!1},currency:{type:Boolean,default:!0,required:!1}},data:function(){return{}},created:function(){},methods:{}},o=i,c=a("2877"),n=Object(c["a"])(o,s,r,!1,null,null,null);e["a"]=n.exports},c50f:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Material Purchase")],1)]),a("div",{staticClass:"card-body bg-white position-relative"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"text-center p-2 bg-info text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h2 mb-0",attrs:{icon:"map-marker"}})],1),a("b-col",{staticClass:"p-2 bg-white d-flex align-items-center border"},[a("div",[a("h6",{staticClass:"mb-0 text-muted"},[t._v("Project")]),a("h2",{staticClass:"mb-0"},[a("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.editable&&(t.project_modal=!0)}}},["-1"==t.form.project_location_structure_item_id?a("strong",[t._v("....")]):a("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.project_location.project.title))])])])])])],1),a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"p-0 pr-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"calendar"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Transaction Date")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.transaction_date,expression:"form.transaction_date"}],staticClass:"form-control",attrs:{type:"date",placeholder:"Transaction Date",required:""},domProps:{value:t.form.transaction_date},on:{input:function(e){e.target.composing||t.$set(t.form,"transaction_date",e.target.value)}}})])],1)],1),a("b-col",{staticClass:"p-0 pl-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"list"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Order Number")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.order_number,expression:"form.order_number"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Order Number",required:""},domProps:{value:t.form.order_number},on:{input:function(e){e.target.composing||t.$set(t.form,"order_number",e.target.value)}}})])],1)],1)],1),a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"p-0 pr-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Voucher Number")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.voucher_number,expression:"form.voucher_number"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Voucher Number",required:""},domProps:{value:t.form.voucher_number},on:{input:function(e){e.target.composing||t.$set(t.form,"voucher_number",e.target.value)}}})])],1)],1),a("b-col",{staticClass:"p-0 pl-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Check Number")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.check_number,expression:"form.check_number"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Check Number",required:""},domProps:{value:t.form.check_number},on:{input:function(e){e.target.composing||t.$set(t.form,"check_number",e.target.value)}}})])],1)],1)],1),a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"p-0 pr-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Supplier")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.supplier_id,expression:"form.supplier_id"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form,"supplier_id",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("Please Select")]),t._l(t.suppliers,(function(e){return a("option",{domProps:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])}))],2)])],1)],1),a("b-col",{staticClass:"p-0 pl-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Remarks")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.remarks,expression:"form.remarks"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Remarks",required:""},domProps:{value:t.form.remarks},on:{input:function(e){e.target.composing||t.$set(t.form,"remarks",e.target.value)}}})])],1)],1)],1),a("div",{staticClass:"card bg-light mb-0 mt-3"},[a("div",{staticClass:"card-header bg-secondary d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"list"}}),t._v(" Materials")],1),t.editable?a("b-button",{attrs:{variant:"dark",size:"sm"},on:{click:function(e){t.material_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),t._v(" Add Material ")],1):t._e()],1),a("div",{staticClass:"card-body bg-white position-relative p-2"},[a("table",{staticClass:"table border mb-0"},[a("thead",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Material")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Qty")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Price")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Total")]),t.editable?a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Action ")]):t._e()])]),a("tbody",t._l(t.form.material_purchase_details,(function(e,s){return a("tr",[a("th",{attrs:{scope:"row"}},[t._v(t._s(e.material.name))]),a("td",[a("b-form-input",{attrs:{type:"number",step:"any",min:"1",required:""},model:{value:e.qty,callback:function(a){t.$set(e,"qty",a)},expression:"material_purchase_detail.qty"}})],1),a("td",[a("b-form-input",{attrs:{type:"number",step:"any",min:"1",required:""},model:{value:e.price,callback:function(a){t.$set(e,"price",a)},expression:"material_purchase_detail.price"}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.total)}})],1),t.editable?a("td",{staticClass:"text-center"},[a("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(e){return t.deleteMaterial(s)}}},[a("font-awesome-icon",{attrs:{icon:"minus-circle"}}),t._v(" Remove")],1)],1):t._e()])})),0),a("tfoot",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{staticClass:"text-right",attrs:{scope:"col",colspan:"3"}},[t._v("TOTAL")]),a("th",{staticClass:"text-right",attrs:{scope:"col"}},[a("number-format-component",{attrs:{input_value:Number(t.total)}})],1),t.editable?a("th",{staticClass:"text-center",attrs:{scope:"col"}}):t._e()])])])])]),t.editable?a("div",{staticClass:"text-right mt-3"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1):t._e()],1)],1)]),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.project_modal,callback:function(e){t.project_modal=e},expression:"project_modal"}},[a("project-modal",{on:{select:t.selectItem}})],1),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.material_modal,callback:function(e){t.material_modal=e},expression:"material_modal"}},[a("material-modal",{on:{select:t.selectMaterial}})],1)],1)},r=[],i=a("73e4"),o=a("86db"),c=a("d668"),n=a("1c5b"),l={mixins:[i["a"]],components:{NumberFormatComponent:o["a"],ProjectModal:c["a"],MaterialModal:n["a"]},props:{material_purchase:{type:Object,default:function(){},required:!1}},data:function(){return{is_saving:!1,project_modal:!1,material_modal:!1,form:{id:-1,transaction_date:"",supplier_id:"",order_number:"",project_location_structure_item:{},project_location_structure_item_id:-1,material_purchase_details:[],total:0},editable:!0,suppliers:[]}},watch:{material_purchase:{immediate:!0,handler:function(){"undefined"!=typeof this.material_purchase.id&&(this.form=this.material_purchase)}},form:{immediate:!0,deep:!0,handler:function(){this.editable=-1==this.form.id,this.form.material_purchase_details.forEach((function(t,e){t.total=t.price*t.qty}))}}},computed:{total:function(){return this.form.material_purchase_details.reduce((function(t,e){return t+Number(e.total)}),0)}},created:function(){this.getFields()},methods:{save:function(){var t=this;return-1==this.form.project_location_structure_item_id?(this.swal_transaction_error_data.text="Please select a project.",void this.swalRequestError()):this.form.material_purchase_details.length<=0?(this.swal_transaction_error_data.text="Please select a material/s.",void this.swalRequestError()):void this.swalConfirmSubmit((function(e){t.editable&&e.value&&(t.is_saving=!0,t.form.total=t.total,t.axios.post("inventory/purchases/save",t.form).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,t.$emit("save")})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1})))}))},selectItem:function(t){this.form.project_location_structure_item=t,this.form.project_location_structure_item_id=t.id,this.project_modal=!1},selectMaterial:function(t){if(this.form.material_purchase_details.find((function(e){return e.material_id===t.id})))return this.swal_transaction_error_data.text="Material already exist.",void this.swalRequestError();var e={id:-1,material:t,material_purchase_id:-1,material_id:t.id,qty:1,price:0,total:0};this.form.material_purchase_details.push(e),this.material_modal=!1},deleteMaterial:function(t){var e=this;this.swalConfirmDelete((function(a){a.value&&e.form.material_purchase_details.splice(t,1)}))},getFields:function(){var t=this;this.is_saving=!0,this.axios.get("maintenance/suppliers/all").then((function(e){t.suppliers=e.data,t.is_saving=!1})).catch((function(t){return console.log(t)}))}}},m=l,u=a("2877"),d=Object(u["a"])(m,s,r,!1,null,null,null);e["a"]=d.exports},d668:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Project Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t._l(t.project_location_structure_items,(function(e){return t.project_location_structure_items.length>0?a("div",{staticClass:"card bg-light mb-0 mt-2"},[a("div",{staticClass:"card-header bg-secondary text-dark d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"map-marker"}}),t._v(" "+t._s(e.project_location_structure.project_location.project.title))],1)]),a("div",{staticClass:"card-body bg-light position-relative p-2"},[a("div",{staticClass:"card-group mb-0"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-info",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.project_location_structure.project_location.description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("location")]),t._m(0,!0)])]),a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-success",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.project_location_structure.description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("structure")]),t._m(1,!0)])]),a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-warning",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("item")]),t._m(2,!0)])])]),a("div",{staticClass:"text-right mt-2"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"},on:{click:function(a){return t.select(e)}}},[a("font-awesome-icon",{attrs:{icon:"check"}}),t._v(" SELECT")],1)],1)])]):t._e()}))],2)])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-info",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-success",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-warning",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}],i=a("73e4"),o=a("86db"),c={mixins:[i["a"]],components:{NumberFormatComponent:o["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",project_location_structure_items:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.getProjects()}}},created:function(){},methods:{getProjects:function(){var t=this;this.axios.get("project/location/structure/items/search?search="+this.search_key).then((function(e){t.project_location_structure_items=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},n=c,l=a("2877"),m=Object(l["a"])(n,s,r,!1,null,null,null);e["a"]=m.exports}}]);
//# sourceMappingURL=chunk-0a0c8560.9ecf26c7.js.map