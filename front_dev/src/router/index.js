import Vue from 'vue'
import Router from 'vue-router'

// Containers
const PrintContainer = () => import('@/containers/PrintContainer')
const LoginContainer = () => import('@/containers/LoginContainer')
const TheContainer = () => import('@/containers/TheContainer')
const ReportsContainer = () => import('@/containers/ReportsContainer')


const Maintenance = () => import('@/views/maintenance/Index')

const OtherExpenses = () => import('@/views/maintenance/other_expenses/Index')
const OtherExpensesAdd = () => import('@/views/maintenance/other_expenses/Add')
const OtherExpensesUpdate = () => import('@/views/maintenance/other_expenses/Update')
const OtherExpensesAll = () => import('@/views/maintenance/other_expenses/All')

const Materials = () => import('@/views/maintenance/materials/Index')
const MaterialsAdd = () => import('@/views/maintenance/materials/Add')
const MaterialsUpdate = () => import('@/views/maintenance/materials/Update')
const MaterialsAll = () => import('@/views/maintenance/materials/All')

const MaterialUnits = () => import('@/views/maintenance/material_units/Index')
const MaterialUnitsAdd = () => import('@/views/maintenance/material_units/Add')
const MaterialUnitsUpdate = () => import('@/views/maintenance/material_units/Update')
const MaterialUnitsAll = () => import('@/views/maintenance/material_units/All')

const ItemUnits = () => import('@/views/maintenance/item_units/Index')
const ItemUnitsAdd = () => import('@/views/maintenance/item_units/Add')
const ItemUnitsUpdate = () => import('@/views/maintenance/item_units/Update')
const ItemUnitsAll = () => import('@/views/maintenance/item_units/All')

const JobDescriptions = () => import('@/views/maintenance/job_descriptions/Index')
const JobDescriptionsAdd = () => import('@/views/maintenance/job_descriptions/Add')
const JobDescriptionsUpdate = () => import('@/views/maintenance/job_descriptions/Update')
const JobDescriptionsAll = () => import('@/views/maintenance/job_descriptions/All')

const MaintenanceDescriptions = () => import('@/views/maintenance/maintenance_descriptions/Index')
const MaintenanceDescriptionsAdd = () => import('@/views/maintenance/maintenance_descriptions/Add')
const MaintenanceDescriptionsUpdate = () => import('@/views/maintenance/maintenance_descriptions/Update')
const MaintenanceDescriptionsAll = () => import('@/views/maintenance/maintenance_descriptions/All')

const Suppliers = () => import('@/views/maintenance/suppliers/Index')
const SuppliersAdd = () => import('@/views/maintenance/suppliers/Add')
const SuppliersUpdate = () => import('@/views/maintenance/suppliers/Update')
const SuppliersAll = () => import('@/views/maintenance/suppliers/All')

const Equipments = () => import('@/views/maintenance/equipments/Index')
const EquipmentsAdd = () => import('@/views/maintenance/equipments/Add')
const EquipmentsUpdate = () => import('@/views/maintenance/equipments/Update')
const EquipmentsAll = () => import('@/views/maintenance/equipments/All')

const Tools = () => import('@/views/maintenance/tools/Index')
const ToolsAdd = () => import('@/views/maintenance/tools/Add')
const ToolsUpdate = () => import('@/views/maintenance/tools/Update')
const ToolsAll = () => import('@/views/maintenance/tools/All')

const Manpowers = () => import('@/views/manpowers/Index')
const ManpowersAdd = () => import('@/views/manpowers/Add')
const ManpowersUpdate = () => import('@/views/manpowers/Update')
const ManpowersAll = () => import('@/views/manpowers/All')
const CashAdvance = () => import('@/views/manpowers/cash_advance/Index')
const Payroll = () => import('@/views/manpowers/payroll/Index')
const PayrollDraft = () => import('@/views/manpowers/payroll/Draft')
const PayrollView = () => import('@/views/manpowers/payroll/View')
const PayrollPrint = () => import('@/views/manpowers/payroll/PrintPayroll')
const PayrollPrintPerItem = () => import('@/views/manpowers/payroll/PrintPayrollPerItem')

const Projects = () => import('@/views/projects2/Index')
const ProjectsAdd = () => import('@/views/projects2/Add')
const ProjectsUpdate = () => import('@/views/projects2/Update')
const ProjectsAll = () => import('@/views/projects2/All')
const ProjectDetails = () => import('@/views/projects2/View')
const ProjectLocationDetails = () => import('@/views/projects2/locations/View')
const ProjectLocationStructureDetails = () => import('@/views/projects2/locations/structures/View')
const ProjectLocationStructureItemDetails = () => import('@/views/projects2/locations/structures/items/View')

const Inventories = () => import('@/views/inventories/Index')
const Requests = () => import('@/views/inventories/requests/Index')
const Purchases = () => import('@/views/inventories/purchases/Index')
const Deliveries = () => import('@/views/inventories/deliveries/Index')
const Receivings = () => import('@/views/inventories/receivings/Index')
const Transfers = () => import('@/views/inventories/transfers/Index')
const Issuances = () => import('@/views/inventories/issuances/Index')
const Withdrawals = () => import('@/views/inventories/withdrawals/Index')
const Adjustments = () => import('@/views/inventories/adjustments/Index')

const MaintenanceItems = () => import('@/views/maintenance_items/Index')
const MaintenanceItemsAdd = () => import('@/views/maintenance_items/Add')
const MaintenanceItemsUpdate = () => import('@/views/maintenance_items/Update')
const MaintenanceItemsAll = () => import('@/views/maintenance_items/All')


const Progress = () => import('@/views/projects2/locations/structures/items/reports/Progress')
const BillOfMaterials = () => import('@/views/projects2/locations/structures/items/reports/BillOfMaterials')
const DetailedEstimate = () => import('@/views/projects2/locations/structures/items/reports/DetailedEstimate')
const MaterialInventory = () => import('@/views/projects2/locations/structures/items/reports/MaterialInventory')
const WorkAccomplishmentPerItem = () => import('@/views/projects2/locations/structures/reports/WorkAccomplishment')
const WorkAccomplishmentPerStructure = () => import('@/views/projects2/locations/reports/WorkAccomplishment')
const ProjectBudget = () => import('@/views/projects2/locations/structures/reports/ProjectBudget')
const MonthlyCostForecastPerItem = () => import('@/views/projects2/locations/structures/reports/MonthlyCostForecast')

Vue.use(Router)

export default new Router({
  //base:'/',
  base:'/franco_construction_v2/build/',
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
      {
          path: '/login',
          name: 'Login',
          component: LoginContainer
      },
      {
          path: '/print',
          name: 'Print',
          component: PrintContainer,
          children: [
              {
                  path: '/print/payroll/:id',
                  name: 'PayrollPrint',
                  component:PayrollPrint,
              },
              {
                  path: '/print/payroll-per-item/:id',
                  name: 'PayrollPrintPerItem',
                  component:PayrollPrintPerItem,
              },
          ]
      },
      {
          path: '/reports',
          name: 'Reports',
          component: ReportsContainer,
          children: [
            {
                path: '/reports/progress/:id',
                name: 'Progress',
                component:Progress,
            },
            {
                path: '/reports/bill-of-materials/:id',
                name: 'BillOfMaterials',
                component:BillOfMaterials,
            },
            {
                path: '/reports/detailed-estimate/:id',
                name: 'DetailedEstimate',
                component:DetailedEstimate,
            },
              {
                  path: '/reports/material-inventory/:id',
                  name: 'MaterialInventory',
                  component:MaterialInventory,
              },
              {
                  path: '/reports/work-accomplishment-per-item/:id',
                  name: 'WorkAccomplishmentPerItem',
                  component:WorkAccomplishmentPerItem,
              },
              {
                  path: '/reports/work-accomplishment-per-structure/:id',
                  name: 'WorkAccomplishmentPerStructure',
                  component:WorkAccomplishmentPerStructure,
              },
              {
                  path: '/reports/project-budget/:id',
                  name: 'ProjectBudget',
                  component:ProjectBudget,
              },
              {
                  path: '/reports/monthly-cost-forecast-per-item/:id',
                  name: 'WorkAccomplishmentPerItem',
                  component:MonthlyCostForecastPerItem,
              },
          ]
      },
      {
          path: '/',
          redirect: '/maintenance',
          name: 'Home',
          component: TheContainer,
          children: [
            {
                path: '/maintenance',
                redirect: '/maintenance/material-units',
                name: 'Settings',
                component:Maintenance,
                children: [
                  {
                    path: '/maintenance/materials',
                    name: 'Materials',
                    component: Materials,
                    redirect: '/maintenance/materials/all',
                    children: [
                        {
                          path: '/maintenance/materials/add',
                          name: 'Add',
                          component: MaterialsAdd
                        },
                        {
                          path: '/maintenance/materials/update/:id',
                          name: 'Update',
                          component: MaterialsUpdate
                        },
                        {
                          path: '/maintenance/materials/all',
                          name: 'All',
                          component: MaterialsAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/material-units',
                    name: 'Material Units',
                    component: MaterialUnits,
                    redirect: '/maintenance/material-units/all',
                    children: [
                        {
                          path: '/maintenance/material-units/add',
                          name: 'Add',
                          component: MaterialUnitsAdd
                        },
                        {
                          path: '/maintenance/material-units/update/:id',
                          name: 'Update',
                          component: MaterialUnitsUpdate
                        },
                        {
                          path: '/maintenance/material-units/all',
                          name: 'All',
                          component: MaterialUnitsAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/item-units',
                    name: 'Item Units',
                    component: ItemUnits,
                    redirect: '/maintenance/item-units/all',
                    children: [
                        {
                          path: '/maintenance/item-units/add',
                          name: 'Add',
                          component: ItemUnitsAdd
                        },
                        {
                          path: '/maintenance/item-units/update/:id',
                          name: 'Update',
                          component: ItemUnitsUpdate
                        },
                        {
                          path: '/maintenance/item-units/all',
                          name: 'All',
                          component: ItemUnitsAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/job-descriptions',
                    name: 'Job Descriptions',
                    component: JobDescriptions,
                    redirect: '/maintenance/job-descriptions/all',
                    children: [
                        {
                          path: '/maintenance/job-descriptions/add',
                          name: 'Add',
                          component: JobDescriptionsAdd
                        },
                        {
                          path: '/maintenance/job-descriptions/update/:id',
                          name: 'Update',
                          component: JobDescriptionsUpdate
                        },
                        {
                          path: '/maintenance/job-descriptions/all',
                          name: 'All',
                          component: JobDescriptionsAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/maintenance-descriptions',
                    name: 'Maintenance Descriptions',
                    component: MaintenanceDescriptions,
                    redirect: '/maintenance/maintenance-descriptions/all',
                    children: [
                        {
                          path: '/maintenance/maintenance-descriptions/add',
                          name: 'Add',
                          component: MaintenanceDescriptionsAdd
                        },
                        {
                          path: '/maintenance/maintenance-descriptions/update/:id',
                          name: 'Update',
                          component: MaintenanceDescriptionsUpdate
                        },
                        {
                          path: '/maintenance/maintenance-descriptions/all',
                          name: 'All',
                          component: MaintenanceDescriptionsAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/other-expenses',
                    name: 'Other Expense Descriptions',
                    component: OtherExpenses,
                    redirect: '/maintenance/other-expenses/all',
                    children: [
                        {
                          path: '/maintenance/other-expenses/add',
                          name: 'Add',
                          component: OtherExpensesAdd
                        },
                        {
                          path: '/maintenance/other-expenses/update/:id',
                          name: 'Update',
                          component: OtherExpensesUpdate
                        },
                        {
                          path: '/maintenance/other-expenses/all',
                          name: 'All',
                          component: OtherExpensesAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/suppliers',
                    name: 'Suppliers',
                    component: Suppliers,
                    redirect: '/maintenance/suppliers/all',
                    children: [
                        {
                          path: '/maintenance/suppliers/add',
                          name: 'Add',
                          component: SuppliersAdd
                        },
                        {
                          path: '/maintenance/suppliers/update/:id',
                          name: 'Update',
                          component: SuppliersUpdate
                        },
                        {
                          path: '/maintenance/suppliers/all',
                          name: 'All',
                          component: SuppliersAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/equipments',
                    name: 'Equipments',
                    component: Equipments,
                    redirect: '/maintenance/equipments/all',
                    children: [
                        {
                          path: '/maintenance/equipments/add',
                          name: 'Add',
                          component: EquipmentsAdd
                        },
                        {
                          path: '/maintenance/equipments/update/:id',
                          name: 'Update',
                          component: EquipmentsUpdate
                        },
                        {
                          path: '/maintenance/equipments/all',
                          name: 'All',
                          component: EquipmentsAll
                        }
                      ]
                  },
                  {
                    path: '/maintenance/tools',
                    name: 'Tools',
                    component: Tools,
                    redirect: '/maintenance/tools/all',
                    children: [
                        {
                          path: '/maintenance/tools/add',
                          name: 'Add',
                          component: ToolsAdd
                        },
                        {
                          path: '/maintenance/tools/update/:id',
                          name: 'Update',
                          component: ToolsUpdate
                        },
                        {
                          path: '/maintenance/tools/all',
                          name: 'All',
                          component: ToolsAll
                        }
                      ]
                  }
                ]
            },
            {
              path: '/manpowers',
              redirect: '/manpowers/all',
              name: 'Employees',
              component:Manpowers,
              children: [
                {
                  path: '/manpowers/add',
                  name: 'Add',
                  component: ManpowersAdd
                },
                {
                  path: '/manpowers/update/:id',
                  name: 'Update',
                  component: ManpowersUpdate
                },
                {
                  path: '/manpowers/all',
                  name: 'All',
                  component: ManpowersAll
                },
                {
                  path: '/manpowers/cash-advance',
                  name: 'Cash Advance',
                  component: CashAdvance
                },
                {
                  path: '/manpowers/payroll',
                  name: 'Payroll',
                  component: Payroll
                },
                {
                  path: '/manpowers/payroll/:payroll_type/:project_id/:date_from/:date_to',
                  name: 'Payroll Draft',
                  component: PayrollDraft
                },
                {
                  path: '/manpowers/payroll/:id',
                  name: 'Payroll View',
                  component: PayrollView
                }
              ]
            },
            {
              path: '/projects',
              redirect: '/projects/all',
              name: 'Projects',
              component:Projects,
              children: [
                {
                  path: '/projects/add',
                  name: 'Add',
                  component: ProjectsAdd
                },
                {
                  path: '/projects/all',
                  name: 'All',
                  component: ProjectsAll
                },
                {
                  path: '/projects/:id',
                  name: 'Update',
                  component: ProjectsUpdate,
                  redirect: '/projects/:id',
                  children: [
                    {
                      path: '/projects/:id',
                      component: ProjectDetails
                    },
                    {
                      path: '/projects/:id/:project_location_id',
                      component: ProjectLocationDetails,
                    },
                    {
                      path: '/projects/:id/:project_location_id/:project_location_structure_id',
                      component: ProjectLocationStructureDetails,
                    },
                    {
                      path: '/projects/:id/:project_location_id/:project_location_structure_id/:project_location_structure_item_id',
                      component: ProjectLocationStructureItemDetails, 
                    },
                  ]
                }
              ]
            },
            {
              path: '/inventories',
              redirect: '/inventories/requests',
              name: 'Inventories',
              component:Inventories,
              children: [
                {
                  path: '/inventories/requests',
                  name: 'Requests',
                  component: Requests
                },
                {
                  path: '/inventories/purchases',
                  name: 'Purchases',
                  component: Purchases
                },
                {
                  path: '/inventories/deliveries',
                  name: 'Deliveries',
                  component: Deliveries
                },
                {
                  path: '/inventories/receivings',
                  name: 'Receivings',
                  component: Receivings
                },
                {
                  path: '/inventories/transfers',
                  name: 'Transfers',
                  component: Transfers
                },
                  {
                      path: '/inventories/issuances',
                      name: 'Issuances',
                      component: Issuances
                  },
                  {
                      path: '/inventories/withdrawals',
                      name: 'Withdrawals',
                      component: Withdrawals
                  },
                  {
                      path: '/inventories/adjustments',
                      name: 'Adjustments',
                      component: Adjustments
                  },
              ]
            },
            {
              path: '/maintenance-items',
              redirect: '/maintenance-items/all',
              name: 'Maintenance',
              component:MaintenanceItems,
              children: [
                {
                  path: '/maintenance-items/add',
                  name: 'Add',
                  component: MaintenanceItemsAdd
                },
                {
                  path: '/maintenance-items/update/:id',
                  name: 'Update',
                  component: MaintenanceItemsUpdate
                },
                {
                  path: '/maintenance-items/all',
                  name: 'All',
                  component: MaintenanceItemsAll
                }
              ]
            },

          ]
      },
      
  ]
}

