(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba962572"],{"73e4":function(t,e,a){"use strict";e["a"]={data:function(){return{swal_confirm_submit_data:{title:"Please confirm your submission.",text:"Your changes will be saved after this process.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!",cancelButtonText:"Wait, im not done yet!"},swal_confirm_delete_data:{title:"Are you sure you want to delete this record?",text:"Note: This action will not be undone.",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete!",cancelButtonText:"No, I dont want to delete it!"},swal_transaction_completed_data:{title:"Transaction Completed!",text:"Data Successfully Saved.",icon:"success",showConfirmButton:!1,timer:1e3},swal_transaction_warning_data:{title:"Warning!",text:"Complete all necessary fields!",icon:"warning"},swal_transaction_error_data:{title:"Error!",text:"Please contact your Administrator.",icon:"error"}}},methods:{swalConfirmSubmit:function(t){this.$swal(this.swal_confirm_submit_data).then((function(e){t(e)}))},swalFieldsRequired:function(){this.$swal.fire("Error!","Please fill out all required fields","error")},swalRequestError:function(){this.$swal.fire(this.swal_transaction_error_data)},swalTransactionCompleted:function(){this.$swal.fire(this.swal_transaction_completed_data)},swalConfirmDelete:function(t){this.$swal(this.swal_confirm_delete_data).then((function(e){t(e)}))},swalTransactionWarning:function(){this.$swal.fire(this.swal_transaction_warning_data)}}}},"86db":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-inline text-nowrap"},[t.currency?[t._v("₱ ")]:t._e(),t._v(t._s(t.input_value.toLocaleString("en-US",{minimumFractionDigits:t.decimal}))+" ")],2)},i=[],r={props:{input_value:{type:[Number,String],default:0,required:!0},decimal:{type:Number,default:2,required:!1},currency:{type:Boolean,default:!0,required:!1}},data:function(){return{}},created:function(){},methods:{}},o=r,n=a("2877"),c=Object(n["a"])(o,s,i,!1,null,null,null);e["a"]=c.exports},a599:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Material Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t.results.length>0?a("div",{staticClass:"list-group bg-white mt-2",staticStyle:{"max-height":"260px","overflow-y":"auto"}},t._l(t.results,(function(e){return a("a",{staticClass:"list-group-item list-group-item-action",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.select(e)}}},[t._v(" "+t._s(e.name)),a("br"),a("small",[t._v("Balance : "),a("number-format-component",{attrs:{currency:!1,input_value:Number(e.balance)}}),t._v(" "+t._s(e.description)+" | Price : "),a("number-format-component",{attrs:{input_value:Number(e.price)}}),t._v("/"+t._s(e.description))],1)])})),0):t._e()],1)])])},i=[],r=a("73e4"),o=a("86db"),n={mixins:[r["a"]],components:{NumberFormatComponent:o["a"]},props:{project_location_structure_item_id:Number},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",results:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.search()}}},created:function(){},methods:{search:function(){var t=this;this.axios.get("maintenance/materials/search-per-location?project_location_structure_item_id="+this.project_location_structure_item_id+"&search="+this.search_key).then((function(e){t.results=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},c=n,l=a("2877"),u=Object(l["a"])(c,s,i,!1,null,null,null);e["a"]=u.exports},af67:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("server-side-paginated-table",{ref:"displayTable",attrs:{fields:t.table_settings.fields,api_url:t.table_settings.api_url,delete_url:t.table_settings.delete_url,top_right_btn_redirect:!1}}),a("b-modal",{attrs:{centered:"",size:"xl","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[a("adjustment-modal",{attrs:{material_adjustment:t.material_adjustment},on:{save:t.save}})],1)],1)},i=[],r=a("56d7"),o=a("73e4"),n=a("86db"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"plus-circle"}}),t._v(" Material Inventory Adjustment")],1)]),a("div",{staticClass:"card-body bg-white position-relative"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-form",{on:{submit:function(e){return e.preventDefault(),t.save(e)}}},[a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"text-center p-2 bg-info text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h2 mb-0",attrs:{icon:"map-marker"}})],1),a("b-col",{staticClass:"p-2 bg-white d-flex align-items-center border"},[a("div",[a("h6",{staticClass:"mb-0 text-muted"},[t._v("Project")]),a("h2",{staticClass:"mb-0"},[a("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.editable&&(t.project_modal=!0)}}},["-1"==t.form.project_location_structure_item_id?a("strong",[t._v("....")]):a("strong",[t._v(t._s(t.form.project_location_structure_item.project_location_structure.project_location.project.title))])])])])])],1),a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"p-0 pr-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"calendar"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Transaction Date")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.transaction_date,expression:"form.transaction_date"}],staticClass:"form-control",attrs:{type:"date",placeholder:"Transaction Date",required:""},domProps:{value:t.form.transaction_date},on:{input:function(e){e.target.composing||t.$set(t.form,"transaction_date",e.target.value)}}})])],1)],1),a("b-col",{staticClass:"p-0 pl-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"list"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Reference Number")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.reference_number,expression:"form.reference_number"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Reference Number",required:""},domProps:{value:t.form.reference_number},on:{input:function(e){e.target.composing||t.$set(t.form,"reference_number",e.target.value)}}})])],1)],1)],1),a("b-row",{staticClass:"m-0 mb-3"},[a("b-col",{staticClass:"p-0 pr-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-dark text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Remarks")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.remarks,expression:"form.remarks"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Remarks",required:""},domProps:{value:t.form.remarks},on:{input:function(e){e.target.composing||t.$set(t.form,"remarks",e.target.value)}}})])],1)],1),a("b-col",{staticClass:"p-0 pl-1"},[a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"check-circle"}})],1),a("b-col",{staticClass:"p-2 bg-light"},[a("small",{staticClass:"text-muted"},[t._v("Total Adjusted Amount")]),a("input",{directives:[{name:"model",rawName:"v-model",value:"P "+t.total.toLocaleString("en-US",{minimumFractionDigits:2}),expression:"'P '+total.toLocaleString('en-US',{ minimumFractionDigits: 2 })"}],staticClass:"form-control text-right bg-white",attrs:{type:"text",placeholder:"Total Delivery Amount",required:"",readonly:""},domProps:{value:"P "+t.total.toLocaleString("en-US",{minimumFractionDigits:2})},on:{input:function(e){e.target.composing||t.$set("P "+t.total,"toLocaleString('en-US',{ minimumFractionDigits: 2 })",e.target.value)}}})])],1)],1)],1),a("div",{staticClass:"card bg-light mb-0 mt-3"},[a("div",{staticClass:"card-header bg-secondary d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"list"}}),t._v(" Materials")],1),t.editable&&-1!=t.form.project_location_structure_item_id?a("b-button",{attrs:{variant:"dark",size:"sm"},on:{click:function(e){t.material_modal=!0}}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),t._v(" Add Material ")],1):t._e()],1),a("div",{staticClass:"card-body bg-white position-relative p-2"},[a("table",{staticClass:"table border mb-0"},[a("thead",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Material")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Price")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("System Count")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Actual Count")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Adjusted (+/-)")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Actual Total")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Adjusted Total")]),t.editable?a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Action ")]):t._e()])]),a("tbody",t._l(t.form.material_adjustment_details,(function(e,s){return a("tr",[a("th",{attrs:{scope:"row"}},[t._v(t._s(e.material.name))]),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.price)}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{currency:!1,input_value:Number(e.system_count)}})],1),a("td",[a("b-form-input",{staticClass:"text-right",attrs:{type:"number",step:"any",min:"0",required:""},model:{value:e.physical_count,callback:function(a){t.$set(e,"physical_count",a)},expression:"material_delivery_detail.physical_count"}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.adjustment),currency:!1}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.physical_total)}})],1),a("td",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(e.total_adjustment)}})],1),t.editable?a("td",{staticClass:"text-center"},[a("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(e){return t.deleteMaterial(s)}}},[a("font-awesome-icon",{attrs:{icon:"minus-circle"}}),t._v(" Remove")],1)],1):t._e()])})),0),a("tfoot",{staticClass:"bg-light text-dark"},[a("tr",[a("th",{staticClass:"text-right",attrs:{scope:"col",colspan:"6"}},[t._v("TOTAL ADJUSTED AMOUNT")]),a("th",{staticClass:"text-right",attrs:{scope:"col"}},[a("number-format-component",{attrs:{input_value:Number(t.total)}})],1),t.editable?a("th",{staticClass:"text-center",attrs:{scope:"col"}}):t._e()])])])])]),t.editable?a("div",{staticClass:"text-right mt-3"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"save"}}),t._v(" Save")],1)],1):t._e()],1)],1)]),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.material_modal,callback:function(e){t.material_modal=e},expression:"material_modal"}},[a("material-modal",{attrs:{project_location_structure_item_id:t.form.project_location_structure_item_id},on:{select:t.selectMaterial}})],1),a("b-modal",{attrs:{centered:"",size:"lg","body-class":"p-0","hide-footer":!0,"hide-header":!0},model:{value:t.project_modal,callback:function(e){t.project_modal=e},expression:"project_modal"}},[a("project-modal",{on:{select:t.selectItem}})],1)],1)},l=[],u=a("d668"),d=a("a599"),m={mixins:[o["a"]],components:{NumberFormatComponent:n["a"],ProjectModal:u["a"],MaterialModal:d["a"]},props:{material_adjustment:{type:Object,default:function(){},required:!1}},data:function(){return{is_saving:!1,material_modal:!1,project_modal:!1,form:{id:-1,reference_number:"",project_location_structure_item:{},project_location_structure_item_id:-1,transaction_date:"",remarks:"",total:0,material_adjustment_details:[]},editable:!0}},watch:{material_adjustment:{immediate:!0,handler:function(){"undefined"!=typeof this.material_adjustment.id&&(this.form=this.material_adjustment)}},form:{immediate:!0,deep:!0,handler:function(){this.editable=-1==this.form.id,this.form.material_adjustment_details.forEach((function(t,e){t.adjustment=t.physical_count-t.system_count,t.physical_total=t.price*t.physical_count,t.total_adjustment=t.price*t.adjustment}))}}},computed:{total:function(){return this.form.material_adjustment_details.reduce((function(t,e){return t+Number(e.total_adjustment)}),0)}},created:function(){},methods:{save:function(){var t=this;return-1==this.form.project_location_structure_item_id?(this.swal_transaction_error_data.text="Please select a warehouse",void this.swalRequestError()):this.form.material_adjustment_details.length<=0?(this.swal_transaction_error_data.text="Please select a material/s.",void this.swalRequestError()):void this.swalConfirmSubmit((function(e){t.editable&&e.value&&(t.is_saving=!0,t.form.total=t.total,t.axios.post("inventory/adjustments/save",t.form).then((function(e){t.swalTransactionCompleted(),t.is_saving=!1,t.$emit("save")})).catch((function(e){t.swal_transaction_error_data.text=e.response.data,t.swalRequestError(),t.is_saving=!1})))}))},selectItem:function(t){this.form.project_location_structure_item=t,this.form.project_location_structure_item_id=t.id,this.form.material_withdrawal_details=[],this.project_modal=!1},selectMaterial:function(t){if(this.form.material_adjustment_details.find((function(e){return e.material_id===t.id&&Number(e.price)===Number(t.price)})))return this.swal_transaction_error_data.text="Material already exist.",void this.swalRequestError();var e={id:-1,material:t,material_adjustment_id:-1,material_id:t.material_id,price:t.price,system_count:t.balance,physical_count:0,adjustment:0,physical_total:0,total_adjustment:0};this.form.material_adjustment_details.push(e),this.material_modal=!1},deleteMaterial:function(t){var e=this;this.swalConfirmDelete((function(a){a.value&&e.form.material_adjustment_details.splice(t,1)}))}}},_=m,p=a("2877"),h=Object(p["a"])(_,c,l,!1,null,null,null),b=h.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-3"},[a("div",{staticClass:"card-header bg-dark text-white"},[a("b-row",[a("b-col",[t.loading?a("div",[a("strong",[t._v(" Fetching result... ")])]):a("div",[a("font-awesome-icon",{attrs:{icon:"database"}}),a("strong",[t._v(" "+t._s(t.list.total)+" ")]),a("small",[t._v("Result/s found")])],1)]),a("b-col",{staticClass:"text-right"},[t.top_right_btn_redirect?a("router-link",{attrs:{to:"add"}},[a("b-button",{attrs:{variant:"secondary",size:"sm"}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),t._v(" Add New Record ")],1)],1):a("b-button",{attrs:{variant:"secondary",size:"sm"},on:{click:t.clickTopRightBtn}},[a("font-awesome-icon",{attrs:{icon:"plus"}}),t._v(" Add New Record ")],1)],1)],1)],1),a("div",{staticClass:"card-body bg-white mb-0"},[a("b-row",{staticClass:"mb-3"},[a("b-col",{attrs:{sm:"2"}},[a("b-form-select",{attrs:{options:t.options,size:"sm"},on:{change:t.changeDisplayNo},model:{value:t.selected_display_no,callback:function(e){t.selected_display_no=e},expression:"selected_display_no"}})],1),a("b-col",{attrs:{sm:"6","offset-sm":"4"}},[a("b-input-group",[a("b-input-group-prepend",[a("b-input-group-text",{staticClass:"bg-dark text-white"},[a("font-awesome-icon",{attrs:{icon:"search"}})],1)],1),a("b-form-input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Search",autocomplete:"off",size:"sm"},nativeOn:{keypress:function(e){return t.searching(e)},keyup:function(e){return t.search(e)}},model:{value:t.search_term,callback:function(e){t.search_term=e},expression:"search_term"}}),a("b-input-group-append",[a("b-button",{staticClass:"bg-dark text-white px-4",attrs:{variant:"dark",size:"sm",disabled:""==t.search_term},on:{click:t.clearSearch}},[a("font-awesome-icon",{attrs:{icon:"times"}})],1)],1)],1)],1)],1),a("b-table",{attrs:{selectable:"",selectedVariant:"info","select-mode":"single",dark:t.dark,hover:t.hover,striped:t.striped,bordered:t.bordered,fixed:t.fixed,responsive:"sm",items:t.table_items,fields:t.captions,busy:t.loading,"show-empty":"","head-variant":"dark"},on:{"row-dblclicked":t.rowDbClicked},scopedSlots:t._u([{key:"cell(action)",fn:function(e){return[a("div",{staticClass:"text-center"},[a("b-button",{attrs:{variant:"danger",size:"sm"},on:{click:function(a){return t.deleteRow(e.item.id)}}},[a("font-awesome-icon",{attrs:{icon:"minus-circle"}}),t._v(" Delete ")],1)],1)]}},{key:"cell(project)",fn:function(e){return[a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.item.project_location_structure_item.project_location_structure.project_location.project.title))]),a("div",{staticClass:"small text-muted"},[t._v(" "+t._s(e.item.project_location_structure_item.project_location_structure.project_location.description)+" | "+t._s(e.item.project_location_structure_item.project_location_structure.description)+" | "+t._s(e.item.project_location_structure_item.description)+" ")])]}},{key:"cell(total)",fn:function(t){return[a("h6",{staticClass:"text-right"},[a("number-format-component",{attrs:{input_value:Number(t.item.total)}})],1)]}}])},[a("div",{staticClass:"text-center my-2",attrs:{slot:"table-busy"},slot:"table-busy"},[a("br"),a("b-spinner",{staticClass:"align-middle",attrs:{small:""}}),a("br"),a("br"),a("strong",[t._v("Loading")])],1)]),t.list.total>0?a("nav",[a("b-pagination",{staticClass:"mb-0",attrs:{disabled:t.loading,align:"right","total-rows":t.total_rows,"per-page":t.per_page},on:{input:t.getAll},model:{value:t.list.current_page,callback:function(e){t.$set(t.list,"current_page",e)},expression:"list.current_page"}})],1):t._e()],1)])])},v=[],g={name:"server-side-paginated-table",components:{NumberFormatComponent:n["a"]},inheritAttrs:!1,mixins:[o["a"]],props:{hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!0},small:{type:Boolean,default:!0},fixed:{type:Boolean,default:!0},fields:{type:[Array,Object],default:function(){return[]}},dark:{type:Boolean,default:!1},api_url:{type:String,required:!0},delete_url:{type:String,required:!0},top_right_btn:{type:String,default:"",required:!1},top_right_btn_redirect:{type:Boolean,default:!0,required:!1}},data:function(){return{selected:[],list:{data:[],from:1,to:0,current_page:1,total:0,per_page:1},result:[],loading:!0,searchTimeout:function(){return{type:Function,default:function(){return{}}}},search_term:"",options:[{value:10,text:"Display 10 records"},{value:25,text:"Display 25 records"},{value:50,text:"Display 50 records"},{value:100,text:"Display 100 records"}],selected_display_no:10}},computed:{table_items:function(){return this.list.data},per_page:function(){return parseInt(this.list.per_page)},total_rows:function(){return parseInt(this.list.total)},captions:function(){return this.fields},total_selected:function(){return parseInt(this.selected.length)}},mounted:function(){this.getAll()},methods:{getAll:function(){var t=this;this.loading=!0,this.axios.get(this.api_url+"?page="+this.list.current_page+"&per_page="+this.selected_display_no+"&search="+this.search_term).then((function(e){var a=e.data;t.list=a,t.loading=!1})).catch((function(t){return console.log(t)}))},clickTopRightBtn:function(){r["bus"].$emit("serverSidePaginatedTableTopRightBtnClicked")},rowDbClicked:function(t){r["bus"].$emit("serverSidePaginatedTableDbClick",t)},searching:function(){this.loading=!0,clearTimeout(this.searchTimeout)},search:function(){var t=this;this.searchTimeout=setTimeout((function(){t.list.current_page=1,t.getAll(),clearTimeout(t.searchTimeout)}),1e3)},clearSearch:function(){this.search_term="",this.getAll()},changeDisplayNo:function(){this.loading=!0,this.list.current_page=1,this.getAll()},deleteRow:function(t){var e=this;this.swalConfirmDelete((function(a){a.value&&(e.loading=!0,e.axios.delete(e.delete_url,{data:{id:t}}).then((function(t){e.getAll(),e.swal_transaction_completed_data.text="Record successfully deleted.",e.swalTransactionCompleted(),e.loading=!1})).catch((function(t){e.swalRequestError(),e.loading=!1})))}))}}},C=g,w=Object(p["a"])(C,f,v,!1,null,null,null),x=w.exports,y={mixins:[o["a"]],components:{NumberFormatComponent:n["a"],AdjustmentModal:b,ServerSidePaginatedTable:x},data:function(){return{is_saving:!1,modal:!1,result:[],table_settings:{api_url:"inventory/adjustments/all",delete_url:"inventory/adjustments/delete",fields:[{key:"project",label:"Project"},{key:"transaction_date.other_formats.format_1",label:"Date"},{key:"reference_number",label:"Reference Number"},{key:"total",label:"Total Adjustment Amount"},{key:"action",label:"Action",class:"text-center"}]},material_adjustment:{}}},created:function(){var t=this;r["bus"].$on("serverSidePaginatedTableTopRightBtnClicked",(function(e){t.modal=!0})),r["bus"].$on("serverSidePaginatedTableDbClick",(function(e){var a=JSON.parse(JSON.stringify(e));a.transaction_date=a.transaction_date.default,t.material_adjustment=a,t.modal=!0}))},methods:{get:function(){this.$refs.displayTable.getAll(),this.modal=!1},save:function(){this.get()}}},j=y,k=Object(p["a"])(j,s,i,!1,null,null,null);e["default"]=k.exports},d668:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card bg-light mb-0"},[a("div",{staticClass:"card-header bg-dark text-white d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"search"}}),t._v(" Project Search")],1)]),a("div",{staticClass:"card-body bg-white position-relative p-2"},[t.is_saving?a("b-row",{staticClass:"loader",attrs:{"align-v":"center"}},[a("b-col",[a("b-spinner"),a("br"),a("br"),a("strong",[t._v("Loading")])],1)],1):t._e(),a("b-row",{staticClass:"m-0"},[a("b-col",{staticClass:"text-center p-1 bg-success text-white d-flex align-items-center justify-content-center",attrs:{cols:"1"}},[a("font-awesome-icon",{staticClass:"h3 mb-0",attrs:{icon:"search"}})],1),a("b-col",{staticClass:"p-2 bg-white border"},[a("b-form-input",{attrs:{type:"text",debounce:"500",placeholder:"Search...",autocomplete:"off"},model:{value:t.search_key,callback:function(e){t.search_key=e},expression:"search_key"}})],1)],1),t._l(t.project_location_structure_items,(function(e){return t.project_location_structure_items.length>0?a("div",{staticClass:"card bg-light mb-0 mt-2"},[a("div",{staticClass:"card-header bg-secondary text-dark d-flex justify-content-between align-items-center"},[a("h6",{staticClass:"mb-0"},[a("font-awesome-icon",{attrs:{icon:"map-marker"}}),t._v(" "+t._s(e.project_location_structure.project_location.project.title))],1)]),a("div",{staticClass:"card-body bg-light position-relative p-2"},[a("div",{staticClass:"card-group mb-0"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-info",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.project_location_structure.project_location.description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("location")]),t._m(0,!0)])]),a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-success",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.project_location_structure.description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("structure")]),t._m(1,!0)])]),a("div",{staticClass:"card"},[a("div",{staticClass:"card-block p-3"},[a("div",{staticClass:"h1 text-muted text-right mb-2"},[a("font-awesome-icon",{staticClass:"text-warning",attrs:{icon:"list"}})],1),a("div",{staticClass:"h5 mb-0"},[t._v(t._s(e.description))]),a("small",{staticClass:"text-muted text-uppercase font-weight-bold"},[t._v("item")]),t._m(2,!0)])])]),a("div",{staticClass:"text-right mt-2"},[a("b-button",{attrs:{type:"submit",variant:"dark",size:"sm"},on:{click:function(a){return t.select(e)}}},[a("font-awesome-icon",{attrs:{icon:"check"}}),t._v(" SELECT")],1)],1)])]):t._e()}))],2)])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-info",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-success",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"progress progress-xs mt-1 mb-0"},[a("div",{staticClass:"progress-bar bg-warning",staticStyle:{width:"100%"},attrs:{role:"progressbar","aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"}})])}],r=a("73e4"),o=a("86db"),n={mixins:[r["a"]],components:{NumberFormatComponent:o["a"]},data:function(){return{is_saving:!1,project_modal:!1,search_key:"",project_location_structure_items:[]}},watch:{search_key:{immediate:!0,handler:function(){""!=this.search_key&&this.getProjects()}}},created:function(){},methods:{getProjects:function(){var t=this;this.axios.get("project/location/structure/items/search?search="+this.search_key).then((function(e){t.project_location_structure_items=e.data})).catch((function(t){return console.log(t)}))},select:function(t){this.$emit("select",t)}}},c=n,l=a("2877"),u=Object(l["a"])(c,s,i,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=chunk-ba962572.ccbd4e21.js.map