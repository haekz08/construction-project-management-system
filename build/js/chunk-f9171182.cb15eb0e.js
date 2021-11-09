(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f9171182"],{"0651":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Employee Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t.results.length>0?a("div",{staticClass:"list-group bg-white mt-2",staticStyle:{"max-height":"260px","overflow-y":"auto"}},t._l(t.results,(function(e){return a("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.select(e)}}},[t._v(t._s(e.full_name))])})),0):t._e()],1)])])},i=[],n=a("73e4"),o=a("86db"),r={mixins:[n["a"]],components:{NumberFormatComponent:o["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",results:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.search()}}},created:function(){},methods:{search:function(){var t=this;this.axios.get("maintenance/manpowers/search?search="+this.search_key).then((function(e){t.results=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},c=r,l=a("2877"),u=Object(l["a"])(c,s,i,!1,null,null,null);e["a"]=u.exports},"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},"86db":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-inline text-nowrap"},[t.currency?[t._v("₱ ")]:t._e(),t._v(t._s(t.input_value.toLocaleString("en-US",{minimumFractionDigits:t.decimal}))+" ")],2)},i=[],n={props:{input_value:{type:[Number,String],default:0,required:!0},decimal:{type:Number,default:2,required:!1},currency:{type:Boolean,default:!0,required:!1}},data:function(){return{}},created:function(){},methods:{}},o=n,r=a("2877"),c=Object(r["a"])(o,s,i,!1,null,null,null);e["a"]=c.exports},d668:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Project Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t._l(t.project_location_structure_items,(function(e){return t.project_location_structure_items.length>0?a("div",{staticClass:"card bg-light mb-0 mt-2"},[a("div",{staticClass:"card-header bg-secondary text-dark d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"map-marker"}}),t._v(" "+t._s(e.project_title))],1)]),a("div",{staticClass:"card-body bg-light position-relative p-2"},[a("div",{staticClass:"card-group mb-0"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-info",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.location_description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("location")]),t._m(0,!0)])]),a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-success",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.structure_description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("structure")]),t._m(1,!0)])]),a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-warning",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.item_description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("item")]),t._m(2,!0)])])]),a("div",{staticClass:"text-right mt-2"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"},on:{click:function(a){return t.select(e)}}},[a("font-awesome-icon",{attrs:{icon:"check"}}),t._v(" SELECT")],1)],1)])]):t._e()}))],2)])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-info",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-success",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-warning",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}],n=a("73e4"),o=a("86db"),r={mixins:[n["a"]],components:{NumberFormatComponent:o["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",project_location_structure_items:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.getProjects()}}},created:function(){},methods:{getProjects:function(){var t=this;this.axios.get("project/location/structure/items/search?search="+this.search_key).then((function(e){t.project_location_structure_items=e.data})).catch((function(t){return console.log(t)}))},select:function(t){var e=t;e.project_location_structure={project_location:{project:{title:t.project_title}}},this.$emit("select",e)}}},c=r,l=a("2877"),u=Object(l["a"])(c,s,i,!1,null,null,null);e["a"]=u.exports},dd84:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",[a("b-col",{attrs:{cols:"3"}},[a("b-form",{on:{submit:t.save}},[a("b-form-group",{attrs:{label:"Transaction Date:",description:"This field is required"}},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"date",required:"",readonly:-1!=t.form.id},model:{value:t.form.transaction_date,callback:function(e){t.$set(t.form,"transaction_date",e)},expression:"form.transaction_date"}})],1),a("b-form-group",{attrs:{label:"Transaction Time:",description:"This field is required"}},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"time",required:"",readonly:-1!=t.form.id},model:{value:t.form.transaction_time,callback:function(e){t.$set(t.form,"transaction_time",e)},expression:"form.transaction_time"}})],1),a("b-form-group",{attrs:{label:"Voucher Number:",description:"This field is required"}},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",required:"",readonly:-1!=t.form.id},model:{value:t.form.voucher_number,callback:function(e){t.$set(t.form,"voucher_number",e)},expression:"form.voucher_number"}})],1),a("b-form-group",{attrs:{label:"Check Number:",description:"This field is required"}},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",required:"",readonly:-1!=t.form.id},model:{value:t.form.check_number,callback:function(e){t.$set(t.form,"check_number",e)},expression:"form.check_number"}})],1),a("b-form-group",{attrs:{label:"Details:",description:"This field is required"}},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",required:"",readonly:-1!=t.form.id},model:{value:t.form.details,callback:function(e){t.$set(t.form,"details",e)},expression:"form.details"}})],1),a("div",{staticClass:"text-right"},[a("router-link",{attrs:{to:"/maintenance-items/all"}},[-1!=t.form.id?a("b-button",{staticClass:"mr-1",attrs:{variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"chevron-left"}}),t._v(" Back")],1):t._e()],1),a("b-button",{attrs:{type:"submit",disabled:-1!=t.form.id,variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1)],1)],1),a("b-col",[a("maintenance-table",{attrs:{maintenance_details:t.form.maintenance_details,is_editable:-1==t.form.id}})],1)],1)],1)},i=[],n=a("73e4"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("div",{staticClass:"card bg-light"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"list"}}),t._v(" Details")],1),t.is_editable?a("b-button",{staticClass:"mr-2",attrs:{type:"submit",size:"sm",variant:"info"},on:{click:function(e){t.maintenance_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Add")],1):t._e()],1),a("div",{staticClass:"card-body bg-white"},[a("table",{staticClass:"table table-bordered mb-0 table-sm"},[a("thead",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{staticClass:"text-center",attrs:{scope:"col"}}),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Type")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Incharge")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Amount")]),t.is_editable?a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Action")]):t._e()])]),a("tbody",[t._l(t.maintenance_details,(function(e,s){return[a("tr",[a("td",{staticClass:"text-center"},[a("b-button",{attrs:{variant:"info"},on:{click:function(t){e.show_details=!e.show_details}}},[a("font-awesome-icon",{attrs:{icon:"info-circle"}})],1)],1),a("td",{attrs:{scope:"row"}},[1==e.type?a("strong",[t._v(t._s(e.equipment.equipment_type.description+" - "+e.equipment.code))]):a("strong",[t._v(t._s(e.tool.tool_type.description+" - "+e.tool.code))]),a("small",{staticClass:"d-block"},[t._v(" "+t._s(1==e.type?"Equipment":"Tool")+" "),e.is_indirect?[t._v(" | "),a("b-badge",{staticClass:"cursor-pointer",attrs:{variant:"danger"}},[t._v("Indirect Expense")])]:t._e()],2)]),a("td",[a("strong",{staticClass:"d-block"},[t._v(t._s(e.maintenance_description.description))]),a("small",[t._v("Incharge : "+t._s(e.manpower.full_name))])]),a("td",{staticClass:"text-right"},[a("strong",[a("number-format-component",{attrs:{input_value:Number(e.total)}})],1),a("small",{staticClass:"d-block"},[a("number-format-component",{attrs:{input_value:Number(e.qty),currency:!1}}),t._v("@ "),a("number-format-component",{attrs:{input_value:Number(e.amount)}})],1)]),t.is_editable?a("td",{staticClass:"text-center"},[a("b-button",{attrs:{type:"submit",size:"sm",variant:"danger"},on:{click:function(e){return t.deleteItem(s)}}},[a("font-awesome-icon",{attrs:{icon:"minus-circle"}}),t._v(" Remove")],1)],1):t._e()]),a("tr",{directives:[{name:"show",rawName:"v-show",value:e.show_details,expression:"detail.show_details"}]},[a("td",{attrs:{colspan:"5"}},[a("b-collapse",{attrs:{accordion:"my-accordion",role:"tabpanel"},model:{value:e.show_details,callback:function(a){t.$set(e,"show_details",a)},expression:"detail.show_details"}},[a("b-card-body",[null!==e.project_location_structure_item?[a("h6",[t._v("Project : "),a("strong",[t._v(t._s(e.project_location_structure_item.project_location_structure.project_location.project.title))])]),a("h6",[t._v("Location : "),a("strong",[t._v(t._s(e.project_location_structure_item.project_location_structure.project_location.description))])]),a("h6",[t._v("Structure : "),a("strong",[t._v(t._s(e.project_location_structure_item.project_location_structure.description))])]),a("h6",[t._v("Item : "),a("strong",[t._v(t._s(e.project_location_structure_item.description))])])]:[a("strong",[t._v("Main Office")])],a("hr"),a("h6",[a("strong",[t._v("Details:")])]),t._v(" "+t._s(e.remarks)+" ")],2)],1)],1)])]}))],2),a("tfoot",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{staticClass:"text-right",attrs:{colspan:"3"}},[t._v(" TOTAL AMOUNT ")]),a("th",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(t.total)}})],1),t.is_editable?a("th"):t._e()])])])])]),a("b-modal",{attrs:{centered:"",size:"md","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.maintenance_modal,callback:function(e){t.maintenance_modal=e},expression:"maintenance_modal"}},[a("maintenance-modal",{on:{save:t.addMaintenance}})],1)],1)},r=[],c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"p-0",attrs:{sm:"12"}},[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Maintenance Details")],1)]),a("div",{staticClass:"card-body p-3"},[a("b-form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[a("b-row",[a("b-col",[a("b-row",[a("b-col",{attrs:{cols:"4"}},[a("b-form-group",{attrs:{label:"Type:",description:"This field is required"}},[a("b-input-group",{attrs:{size:"sm"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.form.type,expression:"form.type"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.form,"type",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"1"}},[t._v("Equipment")]),a("option",{attrs:{value:"2"}},[t._v("Tool")])])])],1)],1),a("b-col",[1==t.form.type?a("b-form-group",{attrs:{label:"Equipment Description:",description:"This field is required"}},[a("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[a("b-button",{attrs:{type:"button",variant:"facebook",size:"sm"},on:{click:function(e){t.equipment_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Select")],1)]},proxy:!0}],null,!1,547171828)},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{value:"undefined"!=typeof t.form.equipment.equipment_type?t.form.equipment.equipment_type.description+" - "+t.form.equipment.code:"",type:"text",readonly:"",required:"",size:"sm"}})],1)],1):t._e(),2==t.form.type?a("b-form-group",{attrs:{label:"Tool Description:",description:"This field is required"}},[a("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[a("b-button",{attrs:{type:"button",variant:"facebook",size:"sm"},on:{click:function(e){t.tool_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Select")],1)]},proxy:!0}],null,!1,300716134)},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{value:"undefined"!=typeof t.form.tool.tool_type?t.form.tool.tool_type.description+" - "+t.form.tool.code:"",type:"text",required:"",size:"sm",readonly:""}})],1)],1):t._e()],1)],1),a("b-form-group",{attrs:{label:"Person Incharge:",description:"This field is required"}},[a("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[a("b-button",{attrs:{type:"button",variant:"facebook",size:"sm"},on:{click:function(e){t.manpower_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Select")],1)]},proxy:!0}])},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",required:"",size:"sm",readonly:""},model:{value:t.form.manpower.full_name,callback:function(e){t.$set(t.form.manpower,"full_name",e)},expression:"form.manpower.full_name"}})],1)],1),a("b-form-group",{attrs:{label:"Charge to Project:",description:"This field is required"}},[a("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[a("b-button",{attrs:{type:"button",variant:"facebook",size:"sm"},on:{click:function(e){t.project_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Select")],1)]},proxy:!0},"undefined"!=typeof t.form.project_location_structure_item.id?{key:"prepend",fn:function(){return[a("b-button",{attrs:{variant:"info",id:"popover-button-open",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"info-circle"}})],1),a("b-popover",{attrs:{target:"popover-button-open",title:"Location Details",placement:"left"}},[a("h6",[t._v("Project : "),a("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.project_location.project.title))])]),a("h6",[t._v("Location : "),a("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.project_location.description))])]),a("h6",[t._v("Structure : "),a("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.description))])])])]},proxy:!0}:null],null,!0)},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",size:"sm",readonly:""},model:{value:t.form.project_location_structure_item.description,callback:function(e){t.$set(t.form.project_location_structure_item,"description",e)},expression:"form.project_location_structure_item.description"}})],1)],1),a("b-alert",{staticClass:"d-flex align-items-center",attrs:{show:""}},[a("label",{staticClass:"c-switch-sm c-switch-pill c-switch-success mb-0"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.is_indirect,expression:"form.is_indirect"}],staticClass:"c-switch-input",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.form.is_indirect)?t._i(t.form.is_indirect,null)>-1:t.form.is_indirect},on:{change:function(e){var a=t.form.is_indirect,s=e.target,i=!!s.checked;if(Array.isArray(a)){var n=null,o=t._i(a,n);s.checked?o<0&&t.$set(t.form,"is_indirect",a.concat([n])):o>-1&&t.$set(t.form,"is_indirect",a.slice(0,o).concat(a.slice(o+1)))}else t.$set(t.form,"is_indirect",i)}}}),a("span",{staticClass:"c-switch-slider"})]),a("span",{staticClass:"ml-2"},[t._v("Mark as Indirect Expense")])]),a("b-form-group",{attrs:{label:"Maintenance Description:",description:"This field is required"}},[a("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[a("b-button",{attrs:{type:"button",variant:"facebook",size:"sm"},on:{click:function(e){t.maintenance_description_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Select")],1)]},proxy:!0}])},[a("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",required:"",size:"sm",readonly:""},model:{value:t.form.maintenance_description.description,callback:function(e){t.$set(t.form.maintenance_description,"description",e)},expression:"form.maintenance_description.description"}})],1)],1),a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"Amount:",description:"This field is required"}},[a("b-form-input",{attrs:{type:"number",required:"",step:"any"},model:{value:t.form.amount,callback:function(e){t.$set(t.form,"amount",e)},expression:"form.amount"}})],1)],1),a("b-col",[a("b-form-group",{attrs:{label:"Qty:",description:"This field is required"}},[a("b-form-input",{attrs:{type:"number",required:"",step:"any"},model:{value:t.form.qty,callback:function(e){t.$set(t.form,"qty",e)},expression:"form.qty"}})],1)],1),a("b-col",[a("b-form-group",{attrs:{label:"Total:",description:"Total Amount"}},[a("b-form-input",{staticClass:"bg-white text-dark text-right",attrs:{type:"number",readonly:"",step:"any"},model:{value:t.total,callback:function(e){t.total=e},expression:"total"}})],1)],1)],1),a("b-form-group",{attrs:{label:"Details:",description:"This field is required"}},[a("b-form-textarea",{attrs:{id:"textarea",placeholder:"Enter something...",rows:"3","max-rows":"6",size:"sm"},model:{value:t.form.remarks,callback:function(e){t.$set(t.form,"remarks",e)},expression:"form.remarks"}})],1),a("div",{staticClass:"text-right"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1)],1)],1)],1)],1)])])],1),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.project_modal,callback:function(e){t.project_modal=e},expression:"project_modal"}},[a("project-modal",{on:{select:t.selectItem}})],1),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.manpower_modal,callback:function(e){t.manpower_modal=e},expression:"manpower_modal"}},[a("manpower-modal",{on:{select:t.selectManpower}})],1),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.maintenance_description_modal,callback:function(e){t.maintenance_description_modal=e},expression:"maintenance_description_modal"}},[a("maintenance-description-modal",{on:{select:t.selectMaintenanceDescription}})],1),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.equipment_modal,callback:function(e){t.equipment_modal=e},expression:"equipment_modal"}},[a("equipment-modal",{on:{select:t.selectEquipment}})],1),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.tool_modal,callback:function(e){t.tool_modal=e},expression:"tool_modal"}},[a("tool-modal",{on:{select:t.selectTool}})],1)],1)},l=[],u=a("d668"),m=a("0651"),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Maintenance Description Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[a("b-button",{attrs:{type:"button",disabled:""==t.search_key,variant:"facebook",size:"sm"},on:{click:function(e){return t.save()}}},[a("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Add New")],1)]},proxy:!0}])},[a("b-form-input",{attrs:{type:"text",size:"sm",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1)],1),t.results.length>0?a("div",{staticClass:"list-group bg-white mt-2",staticStyle:{"max-height":"260px","overflow-y":"auto"}},t._l(t.results,(function(e){return a("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.select(e)}}},[t._v(t._s(e.description))])})),0):t._e()],1)])])},p=[],_=a("86db"),f={mixins:[n["a"]],components:{NumberFormatComponent:_["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",results:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.search()}}},created:function(){},methods:{search:function(){var t=this;this.axios.get("maintenance/maintenance_descriptions/search?search="+this.search_key).then((function(e){t.results=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){if(e.value){t.is_saving=!0;var a={id:-1,description:t.search_key};t.axios.post("maintenance/maintenance_descriptions/save",a).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,t.$emit("select",e.data)})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1}))}}))}}},h=f,b=a("2877"),v=Object(b["a"])(h,d,p,!1,null,null,null),g=v.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Equipment Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t.results.length>0?a("div",{staticClass:"list-group bg-white mt-2",staticStyle:{"max-height":"260px","overflow-y":"auto"}},t._l(t.results,(function(e){return a("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.select(e)}}},[t._v(t._s(e.equipment_type.description)+" - "+t._s(e.code))])})),0):t._e()],1)])])},y=[],x={mixins:[n["a"]],components:{NumberFormatComponent:_["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",results:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.search()}}},created:function(){},methods:{search:function(){var t=this;this.axios.get("maintenance/equipments/search?search="+this.search_key).then((function(e){t.results=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},C=x,k=Object(b["a"])(C,w,y,!1,null,null,null),j=k.exports,q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Tool Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t.results.length>0?a("div",{staticClass:"list-group bg-white mt-2",staticStyle:{"max-height":"260px","overflow-y":"auto"}},t._l(t.results,(function(e){return a("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.select(e)}}},[t._v(t._s(e.tool_type.description)+" - "+t._s(e.code))])})),0):t._e()],1)])])},S=[],$={mixins:[n["a"]],components:{NumberFormatComponent:_["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",results:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.search()}}},created:function(){},methods:{search:function(){var t=this;this.axios.get("maintenance/tools/search?search="+this.search_key).then((function(e){t.results=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},T=$,z=Object(b["a"])(T,q,S,!1,null,null,null),E=z.exports,N={mixins:[n["a"]],components:{ProjectModal:u["a"],ManpowerModal:m["a"],MaintenanceDescriptionModal:g,EquipmentModal:j,ToolModal:E},props:{equipment:{type:Object,default:function(){}}},data:function(){return{form:{id:-1,type:1,project_location_structure_item_id:"",project_location_structure_item:{},manpower:{},manpower_id:-1,maintenance_description:{},maintenance_description_id:-1,equipment:{},equipment_id:-1,tool:{},tool_id:-1,transaction_date:"",transaction_time:"",remarks:"",amount:"",qty:"",is_deleted:!1,is_indirect:!1},project_modal:!1,manpower_modal:!1,maintenance_description_modal:!1,equipment_modal:!1,tool_modal:!1,is_saving:!1}},watch:{equipment:{immediate:!0,deep:!0,handler:function(){}}},computed:{total:function(){return Number(this.form.amount)*Number(this.form.qty)}},created:function(){},methods:{selectItem:function(t){this.form.project_location_structure_item=t,this.form.project_location_structure_item_id=t.id,this.project_modal=!1},selectManpower:function(t){this.form.manpower=t,this.form.manpower_id=t.id,this.manpower_modal=!1},selectMaintenanceDescription:function(t){this.form.maintenance_description=t,this.form.maintenance_description_id=t.id,this.maintenance_description_modal=!1},selectEquipment:function(t){this.form.equipment=t,this.form.equipment_id=t.id,this.form.tool={},this.form.tool_id=-1,this.equipment_modal=!1},selectTool:function(t){this.form.tool=t,this.form.tool_id=t.id,this.form.equipment={},this.form.equipment_id=-1,this.tool_modal=!1},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){e.value&&(t.form.total=t.total,t.$emit("save",t.form))}))}}},D=N,M=Object(b["a"])(D,c,l,!1,null,null,null),A=M.exports,O={components:{MaintenanceModal:A,NumberFormatComponent:_["a"]},mixins:[n["a"]],props:{maintenance_details:{type:Array,default:function(){return[]},required:!1},is_editable:{type:Boolean,default:!0,required:!1}},watch:{maintenance_details:{immediate:!0,deep:!0,handler:function(){}}},data:function(){return{is_saving:!1,maintenance_modal:!1}},computed:{total:function(){return this.maintenance_details.reduce((function(t,e){return t+Number(e.total)}),0)}},methods:{addMaintenance:function(t){this.maintenance_details.push(t),this.maintenance_modal=!1},deleteItem:function(t){var e=this;this.swalConfirmDelete((function(a){a.value&&e.maintenance_details.splice(t,1)}))}}},B=O,L=Object(b["a"])(B,o,r,!1,null,null,null),P=L.exports,I={components:{MaintenanceTable:P},mixins:[n["a"]],data:function(){return{form:{id:-1,voucher_number:"",check_number:"",details:"",transaction_date:"",transaction_time:"",maintenance_details:[]},form_copy:{},is_saving:!1}},computed:{total:function(){return this.form.maintenance_details.reduce((function(t,e){return t+Number(e.total)}),0)}},created:function(){this.form_copy=JSON.parse(JSON.stringify(this.form)),"undefined"!==typeof this.$route.params.id&&this.get()},methods:{get:function(){var t=this;this.is_saving=!0,this.axios.get("maintenance_items/get",{params:{id:this.$route.params.id}}).then((function(e){var a=e.data;a.transaction_date=a.transaction_date.default,a.transaction_time=a.transaction_time.default,a.maintenance_details=[],a.equipment_maintenances.forEach((function(t,e){t.tool={},t.tool_id=-1,t.type=1,t.show_details=!1,a.maintenance_details.push(t)})),a.tool_maintenances.forEach((function(t,e){t.equipment={},t.equipment_id=-1,t.type=2,t.show_details=!1,a.maintenance_details.push(t)})),t.form=e.data,t.is_saving=!1})).catch((function(t){return console.log(t)}))},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){e.value&&(t.is_saving=!0,t.form.total=t.total,t.axios.post("maintenance_items/save",t.form).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,t.$router.push("/maintenance-items/all")})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1})))}))}}},F=I,R=Object(b["a"])(F,s,i,!1,null,null,null);e["a"]=R.exports}}]);
//# sourceMappingURL=chunk-f9171182.cb15eb0e.js.map