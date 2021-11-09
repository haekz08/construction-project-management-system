(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c77a5f6"],{"0651":function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"card bg-light mb-0"},[o("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[o("h6",{staticClass:"mb-0"},[o("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Employee Search")],1)]),o("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?o("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[o("b-col",[o("b-spinner"),o("br"),o("br"),o("strong",[t._v("Loading")])],1)],1):t._e(),o("b-row",{staticClass:"m-0"},[o("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[o("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),o("b-col",{staticClass:"p-2 bg-white border"},[o("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t.results.length>0?o("div",{staticClass:"list-group bg-white mt-2",staticStyle:{"max-height":"260px","overflow-y":"auto"}},t._l(t.results,(function(e){return o("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:"#"},on:{click:function(o){return o.preventDefault(),t.select(e)}}},[t._v(t._s(e.full_name))])})),0):t._e()],1)])])},a=[],i=o("73e4"),r=o("86db"),n={mixins:[i["a"]],components:{NumberFormatComponent:r["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",results:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.search()}}},created:function(){},methods:{search:function(){var t=this;this.axios.get("maintenance/manpowers/search?search="+this.search_key).then((function(e){t.results=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},c=n,l=o("2877"),d=Object(l["a"])(c,s,a,!1,null,null,null);e["a"]=d.exports},"4fc6":function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t.is_saving?o("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[o("b-col",[o("b-spinner"),o("br"),o("br"),o("strong",[t._v("Loading")])],1)],1):t._e(),o("b-row",{staticClass:"bg-white m-0 border"},[o("b-col",{staticClass:"border-right p-3",attrs:{cols:"3"}},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[o("b-form-group",{attrs:{label:"Name:",description:"This field is required"}},[o("b-form-input",{attrs:{type:"text",required:""},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),o("div",{staticClass:"text-right"},[o("router-link",{attrs:{to:"/maintenance/tools/all"}},[-1!=t.form.id?o("b-button",{staticClass:"mr-1",attrs:{variant:"dark",size:"sm"}},[o("font-awesome-icon",{attrs:{icon:"chevron-left"}}),t._v(" Back")],1):t._e()],1),o("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[o("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save Tool")],1)],1)],1)],1),o("b-col",{staticClass:"p-2"},[o("b-button",{staticClass:"float-right mb-2",attrs:{type:"submit",size:"sm"},on:{click:function(e){return t.addTool()}}},[o("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Add Tool")],1),o("table",{staticClass:"table border-bottom"},[o("thead",{staticClass:"thead-dark"},[o("tr",[o("th",{attrs:{scope:"col"}}),o("th",{attrs:{scope:"col"}},[t._v("Code")]),o("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Hourly Rate")]),o("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Company Property")]),o("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Designated To")]),o("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Action")])])]),o("tbody",[t._l(t.form.tools,(function(e,s){return e.is_deleted?t._e():[o("tr",[o("td",{staticClass:"text-center"},[o("b-button",{attrs:{size:"sm",variant:"info"},on:{click:function(t){e.show_details=!e.show_details}}},[o("font-awesome-icon",{attrs:{icon:"info-circle"}})],1)],1),o("th",{attrs:{scope:"row"}},[t._v(t._s(e.code))]),o("td",{staticClass:"text-right"},[o("number-format-component",{attrs:{input_value:Number(e.hourly_rate)}})],1),o("td",{staticClass:"text-center"},[t._v(" "+t._s(e.is_company_owned?"YES":"NO")+" ")]),o("td",{staticClass:"text-center"},[-1==e.id?[o("b-badge",{staticClass:"cursor-pointer",attrs:{variant:"danger"}},[t._v("No Designation Yet | Please save your data.")])]:[null==e.tool_designation?o("b-badge",{staticClass:"cursor-pointer",attrs:{variant:"danger"},on:{click:function(o){return t.designate(e)}}},[t._v("No Designation Yet")]):o("b-badge",{staticClass:"cursor-pointer",attrs:{variant:"success"},on:{click:function(o){return t.designate(e)}}},[t._v(t._s(e.tool_designation.manpower.full_name))])]],2),o("td",{staticClass:"text-center"},[o("b-button",{staticClass:"mr-2",attrs:{type:"submit",size:"sm",variant:"info"},on:{click:function(o){return t.updateTool(s,e)}}},[o("font-awesome-icon",{attrs:{icon:"edit"}}),t._v(" Edit")],1),o("b-button",{attrs:{type:"submit",size:"sm",variant:"danger"},on:{click:function(e){return t.deleteTool(s)}}},[o("font-awesome-icon",{attrs:{icon:"minus-circle"}}),t._v(" Remove")],1)],1)]),null!==e.tool_designation?o("tr",{directives:[{name:"show",rawName:"v-show",value:e.show_details,expression:"tool.show_details"}]},[o("td",{attrs:{colspan:"6"}},[o("b-collapse",{attrs:{accordion:"my-accordion",role:"tabpanel"},model:{value:e.show_details,callback:function(o){t.$set(e,"show_details",o)},expression:"tool.show_details"}},[o("b-card-body",[null!==e.tool_designation.project_location_structure_item?[o("h6",[t._v("Project : "),o("strong",[t._v(t._s(e.tool_designation.project_location_structure_item.project_location_structure.project_location.project.title))])]),o("h6",[t._v("Location : "),o("strong",[t._v(t._s(e.tool_designation.project_location_structure_item.project_location_structure.project_location.description))])]),o("h6",[t._v("Structure : "),o("strong",[t._v(t._s(e.tool_designation.project_location_structure_item.project_location_structure.description))])]),o("h6",[t._v("Item : "),o("strong",[t._v(t._s(e.tool_designation.project_location_structure_item.description))])])]:[o("strong",[t._v("Main Office")])],o("hr"),o("h6",[o("strong",[t._v("Details:")])]),t._v(" "+t._s(e.remarks)+" ")],2)],1)],1)]):t._e()]}))],2)])],1)],1),o("b-modal",{attrs:{centered:"",size:"md","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.add_tool_modal,callback:function(e){t.add_tool_modal=e},expression:"add_tool_modal"}},[o("add-tool-component",{attrs:{tool_form:t.default_tool_form,current_tools:t.form.tools},on:{saveTool:t.saveTool}})],1),o("b-modal",{attrs:{centered:"",size:"xl","body-class":"p-0","modal-class":"xxl-modal","hide-footer":!0,"hide-header":!0},on:{hide:function(e){return t.get()}},model:{value:t.designation_modal,callback:function(e){t.designation_modal=e},expression:"designation_modal"}},[o("designation",{attrs:{tool:t.selected_tool},on:{save:function(e){t.designation_modal=!1}}})],1)],1)},a=[],i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("b-row",{staticClass:"m-0"},[o("b-col",{staticClass:"p-0",attrs:{sm:"12"}},[o("div",{staticClass:"card bg-light mb-0"},[o("div",{staticClass:"card-header bg-dark text-white"},[o("h6",{staticClass:"mb-0"},[o("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Add Tool")],1)]),o("div",{staticClass:"card-body p-2"},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[o("b-form-group",{attrs:{label:"Tool Code:",description:"This field is required"}},[o("b-form-input",{attrs:{type:"text",required:""},model:{value:t.form.code,callback:function(e){t.$set(t.form,"code",e)},expression:"form.code"}})],1),o("b-form-group",{attrs:{label:"Hourly Rate:",description:"This field is required"}},[o("b-form-input",{attrs:{type:"number",step:"any",required:""},model:{value:t.form.hourly_rate,callback:function(e){t.$set(t.form,"hourly_rate",e)},expression:"form.hourly_rate"}})],1),o("b-alert",{attrs:{show:""}},[o("b-form-checkbox",{attrs:{switch:"",size:"lg"},model:{value:t.form.is_company_owned,callback:function(e){t.$set(t.form,"is_company_owned",e)},expression:"form.is_company_owned"}},[t._v("Is this a company property")])],1),o("div",{staticClass:"text-right"},[o("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[o("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1)],1)],1)])])],1)],1)},r=[],n=o("73e4"),c={mixins:[n["a"]],props:{tool_form:{type:Object,default:function(){}},current_tools:{type:[Array,Object],default:function(){return[]}}},data:function(){return{form:{}}},created:function(){this.form=JSON.parse(JSON.stringify(this.tool_form))},methods:{save:function(){this.validate()||this.$emit("saveTool",this.form)},validate:function(){var t=this;if(this.current_tools.find((function(e,o){return e.code===t.form.code&&!e.is_deleted&&t.tool_form.index_id!=o})))return this.swal_transaction_error_data.text="Code entered is already taken.",this.swalRequestError(),!0}}},l=c,d=o("2877"),u=Object(d["a"])(l,i,r,!1,null,null,null),m=u.exports,_=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("b-row",{staticClass:"m-0"},[o("b-col",{staticClass:"p-0",attrs:{sm:"12"}},[o("div",{staticClass:"card bg-light mb-0"},[o("div",{staticClass:"card-header bg-dark text-white"},[o("h6",{staticClass:"mb-0"},[o("font-awesome-icon",{attrs:{icon:"users"}}),t._v(" tool Designation")],1)]),o("div",{staticClass:"card-body p-3"},[o("b-form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[o("b-row",[o("b-col",{attrs:{cols:"3"}},[o("b-form-group",{attrs:{label:"Designate to:",description:"This field is required"}},[o("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[o("b-button",{attrs:{type:"button",variant:"facebook",size:"sm"},on:{click:function(e){t.manpower_modal=!0}}},[o("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Select Employee")],1)]},proxy:!0}])},[o("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",required:"",size:"sm",readonly:""},model:{value:t.form.manpower.full_name,callback:function(e){t.$set(t.form.manpower,"full_name",e)},expression:"form.manpower.full_name"}})],1)],1),o("b-form-group",{attrs:{label:"Current Location:",description:"This field is required"}},[o("b-input-group",{attrs:{size:"sm"},scopedSlots:t._u([{key:"append",fn:function(){return[o("b-button",{attrs:{type:"button",variant:"facebook",size:"sm"},on:{click:function(e){t.project_modal=!0}}},[o("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Select Location")],1)]},proxy:!0},"undefined"!=typeof t.form.project_location_structure_item.id?{key:"prepend",fn:function(){return[o("b-button",{attrs:{variant:"info",id:"popover-button-open",size:"sm"}},[o("font-awesome-icon",{attrs:{icon:"info-circle"}})],1),o("b-popover",{attrs:{target:"popover-button-open",title:"Location Details",placement:"left"}},[o("h6",[t._v("Project : "),o("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.project_location.project.title))])]),o("h6",[t._v("Location : "),o("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.project_location.description))])]),o("h6",[t._v("Structure : "),o("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.description))])])])]},proxy:!0}:null],null,!0)},[o("b-form-input",{staticClass:"bg-white text-dark",attrs:{type:"text",size:"sm",readonly:""},model:{value:t.form.project_location_structure_item.description,callback:function(e){t.$set(t.form.project_location_structure_item,"description",e)},expression:"form.project_location_structure_item.description"}})],1)],1),o("b-form-group",{attrs:{label:"Date:",description:"This field is required"}},[o("b-form-input",{attrs:{type:"date",required:""},model:{value:t.form.transaction_date,callback:function(e){t.$set(t.form,"transaction_date",e)},expression:"form.transaction_date"}})],1),o("b-form-group",{attrs:{label:"Time:",description:"This field is required"}},[o("b-form-input",{attrs:{type:"time",required:""},model:{value:t.form.transaction_time,callback:function(e){t.$set(t.form,"transaction_time",e)},expression:"form.transaction_time"}})],1),o("b-form-group",{attrs:{label:"Details:",description:"This field is required"}},[o("b-form-textarea",{attrs:{id:"textarea",placeholder:"Enter something...",rows:"3","max-rows":"6",size:"sm"},model:{value:t.form.remarks,callback:function(e){t.$set(t.form,"remarks",e)},expression:"form.remarks"}})],1),o("div",{staticClass:"text-right"},[o("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[o("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1)],1),o("b-col",[o("b-row",{staticClass:"m-0 border mb-3"},[o("b-col",{staticClass:"text-center p-2 bg-facebook text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[o("font-awesome-icon",{staticClass:"h2 mb-0",attrs:{icon:"wrench"}})],1),o("b-col",{staticClass:"p-3 bg-white d-flex align-items-center"},[o("div",[o("h5",{staticClass:"mb-0"},[o("strong",[t._v(t._s(t.tool.tool_type.description)+" | "+t._s(t.tool.code))])]),o("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("tool")])])])],1),o("div",{staticClass:"card bg-light mb-0"},[o("div",{staticClass:"card-header bg-dark text-white"},[o("h6",{staticClass:"mb-0"},[o("font-awesome-icon",{attrs:{icon:"list"}}),t._v(" Designation History")],1)]),o("div",{staticClass:"card-body p-3 bg-white"},[o("table",{staticClass:"table table-bordered mb-0 table-sm"},[o("thead",{staticClass:"bg-light text-dark"},[o("tr",[o("th",{attrs:{scope:"col"}}),o("th",{attrs:{scope:"col"}},[t._v("Date & Time")]),o("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Designated To")])])]),o("tbody",[t._l(t.tool_designations,(function(e,s){return[o("tr",[o("td",{staticClass:"text-center"},[o("b-button",{attrs:{size:"sm",variant:"info"},on:{click:function(t){e.show_details=!e.show_details}}},[o("font-awesome-icon",{attrs:{icon:"info-circle"}})],1)],1),o("th",{attrs:{scope:"row"}},[t._v(" "+t._s(e.transaction_date.other_formats.format_1)+" | "+t._s(e.transaction_time.other_formats.format_1)+" ")]),o("td",[t._v(" "+t._s(e.manpower.full_name)+" - "+t._s(e.show_details)+" "),1==e.is_active?[t._v(" | "),o("b-badge",{staticClass:"cursor-pointer",attrs:{variant:"success"}},[t._v("Accountable")])]:t._e()],2)]),o("tr",{directives:[{name:"show",rawName:"v-show",value:e.show_details,expression:"tool_designation.show_details"}]},[o("td",{attrs:{colspan:"4"}},[o("b-collapse",{attrs:{accordion:"my-accordion",role:"tabpanel"},model:{value:e.show_details,callback:function(o){t.$set(e,"show_details",o)},expression:"tool_designation.show_details"}},[o("b-card-body",[null!==e.project_location_structure_item?[o("h6",[t._v("Project : "),o("strong",[t._v(t._s(e.project_location_structure_item.project_location_structure.project_location.project.title))])]),o("h6",[t._v("Location : "),o("strong",[t._v(t._s(e.project_location_structure_item.project_location_structure.project_location.description))])]),o("h6",[t._v("Structure : "),o("strong",[t._v(t._s(e.project_location_structure_item.project_location_structure.description))])]),o("h6",[t._v("Item : "),o("strong",[t._v(t._s(e.project_location_structure_item.description))])])]:[o("strong",[t._v("Main Office")])],o("hr"),o("h6",[o("strong",[t._v("Details:")])]),t._v(" "+t._s(e.remarks)+" ")],2)],1)],1)])]}))],2)])])])],1)],1)],1)],1)])])],1),o("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.project_modal,callback:function(e){t.project_modal=e},expression:"project_modal"}},[o("project-modal",{on:{select:t.selectItem}})],1),o("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.manpower_modal,callback:function(e){t.manpower_modal=e},expression:"manpower_modal"}},[o("manpower-modal",{on:{select:t.selectManpower}})],1)],1)},f=[],p=o("d668"),h=o("0651"),b={mixins:[n["a"]],components:{ProjectModal:p["a"],ManpowerModal:h["a"]},props:{tool:{type:Object,default:function(){}}},data:function(){return{form:{id:-1,project_location_structure_item_id:"",project_location_structure_item:{},manpower:{},manpower_id:-1,transaction_date:"",transaction_time:"",remarks:""},project_modal:!1,manpower_modal:!1,is_saving:!1,tool_designations:[]}},watch:{tool:{immediate:!0,deep:!0,handler:function(){}}},created:function(){var t=JSON.parse(JSON.stringify(this.tool.tool_designations));t.forEach((function(t){t.show_details=!1})),this.tool_designations=t},methods:{selectItem:function(t){this.form.project_location_structure_item=t,this.form.project_location_structure_item_id=t.id,this.project_modal=!1},selectManpower:function(t){this.form.manpower=t,this.form.manpower_id=t.id,this.manpower_modal=!1},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){if(e.value){t.is_saving=!0;var o=JSON.parse(JSON.stringify(t.form));o.tool_id=t.tool.id,t.axios.post("tool_designations/save",o).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,t.$emit("save")})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1}))}}))}}},v=b,g=Object(d["a"])(v,_,f,!1,null,null,null),w=g.exports,x=o("86db"),C={mixins:[n["a"]],components:{AddToolComponent:m,NumberFormatComponent:x["a"],Designation:w},data:function(){return{form:{id:-1,description:"",tools:[]},form_copy:{},default_tool_form:{index_id:-1,id:-1,code:"",hourly_rate:"",is_company_owned:!1,is_deleted:!1,tool_designation:null,tool_designations:null},is_saving:!1,add_tool_modal:!1,designation_modal:!1,selected_tool:{},maintenance_modal:!1}},watch:{form:{immediate:!0,deep:!0,handler:function(){}}},created:function(){this.form_copy=JSON.parse(JSON.stringify(this.form)),"undefined"!==typeof this.$route.params.id&&this.get()},methods:{get:function(){var t=this;this.is_saving=!0,this.axios.get("maintenance/tool_types/get",{params:{id:this.$route.params.id}}).then((function(e){t.form.tools=[],t.form.id=e.data.id,t.form.description=e.data.description,e.data.tools.forEach((function(e){var o=e;o.is_deleted=!1,o.show_details=!1,t.form.tools.push(o)})),t.is_saving=!1})).catch((function(t){return console.log(t)}))},save:function(){var t=this;event.preventDefault(),this.swalConfirmSubmit((function(e){e.value&&(t.is_saving=!0,t.axios.post("maintenance/tool_types/save",t.form).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,-1==t.form.id?t.form=JSON.parse(JSON.stringify(t.form_copy)):t.get()})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1})))}))},addTool:function(){var t={index_id:-1,id:-1,code:"",hourly_rate:"",is_company_owned:!1,is_deleted:!1,tool_designation:null,tool_designations:[]};this.default_tool_form=t,this.add_tool_modal=!0},updateTool:function(t,e){this.default_tool_form=e,this.default_tool_form.index_id=t,this.add_tool_modal=!0},saveTool:function(t){-1==t.index_id?(t.tool_type_id=this.form.id,this.form.tools.push(t)):this.form.tools[t.index_id]=t,this.add_tool_modal=!1},deleteTool:function(t){var e=this;this.swalConfirmDelete((function(o){o.value&&(e.form.tools[t].is_deleted=!0)}))},designate:function(t){this.designation_modal=!0,this.selected_tool=t},maintenance:function(t){this.maintenance_modal=!0,this.selected_tool=t}}},y=C,j=Object(d["a"])(y,s,a,!1,null,null,null);e["a"]=j.exports},"73e4":function(t,e,o){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},"86db":function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"d-inline text-nowrap"},[t.currency?[t._v("₱ ")]:t._e(),t._v(t._s(t.input_value.toLocaleString("en-US",{minimumFractionDigits:t.decimal}))+" ")],2)},a=[],i={props:{input_value:{type:[Number,String],default:0,required:!0},decimal:{type:Number,default:2,required:!1},currency:{type:Boolean,default:!0,required:!1}},data:function(){return{}},created:function(){},methods:{}},r=i,n=o("2877"),c=Object(n["a"])(r,s,a,!1,null,null,null);e["a"]=c.exports},d668:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"card bg-light mb-0"},[o("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[o("h6",{staticClass:"mb-0"},[o("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Project Search")],1)]),o("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?o("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[o("b-col",[o("b-spinner"),o("br"),o("br"),o("strong",[t._v("Loading")])],1)],1):t._e(),o("b-row",{staticClass:"m-0"},[o("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[o("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),o("b-col",{staticClass:"p-2 bg-white border"},[o("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t._l(t.project_location_structure_items,(function(e){return t.project_location_structure_items.length>0?o("div",{staticClass:"card bg-light mb-0 mt-2"},[o("div",{staticClass:"card-header bg-secondary text-dark d-flex justify-content-between align-items-center"},[o("h6",{staticClass:"mb-0"},[o("font-awesome-icon",{attrs:{icon:"map-marker"}}),t._v(" "+t._s(e.project_location_structure.project_location.project.title))],1)]),o("div",{staticClass:"card-body bg-light position-relative p-2"},[o("div",{staticClass:"card-group mb-0"},[o("div",{staticClass:"card"},[o("div",{staticClass:"card-block p-3"},[o("div",{staticClass:"h1 text-muted text-right mb-2"},[o("font-awesome-icon",{staticClass:"text-info",attrs:{icon:"list"}})],1),o("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.project_location_structure.project_location.description))]),o("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("location")]),t._m(0,!0)])]),o("div",{staticClass:"card"},[o("div",{staticClass:"card-block p-3"},[o("div",{staticClass:"h1 text-muted text-right mb-2"},[o("font-awesome-icon",{staticClass:"text-success",attrs:{icon:"list"}})],1),o("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.project_location_structure.description))]),o("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("structure")]),t._m(1,!0)])]),o("div",{staticClass:"card"},[o("div",{staticClass:"card-block p-3"},[o("div",{staticClass:"h1 text-muted text-right mb-2"},[o("font-awesome-icon",{staticClass:"text-warning",attrs:{icon:"list"}})],1),o("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.description))]),o("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("item")]),t._m(2,!0)])])]),o("div",{staticClass:"text-right mt-2"},[o("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"},on:{click:function(o){return t.select(e)}}},[o("font-awesome-icon",{attrs:{icon:"check"}}),t._v(" SELECT")],1)],1)])]):t._e()}))],2)])])},a=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"progress progress-xs mt-1 mb-0"},[o("div",{staticClass:"progress-bar bg-info",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"progress progress-xs mt-1 mb-0"},[o("div",{staticClass:"progress-bar bg-success",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"progress progress-xs mt-1 mb-0"},[o("div",{staticClass:"progress-bar bg-warning",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}],i=o("73e4"),r=o("86db"),n={mixins:[i["a"]],components:{NumberFormatComponent:r["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",project_location_structure_items:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.getProjects()}}},created:function(){},methods:{getProjects:function(){var t=this;this.axios.get("project/location/structure/items/search?search="+this.search_key).then((function(e){t.project_location_structure_items=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},c=n,l=o("2877"),d=Object(l["a"])(c,s,a,!1,null,null,null);e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-6c77a5f6.52f66413.js.map