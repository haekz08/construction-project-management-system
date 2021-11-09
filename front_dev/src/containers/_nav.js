export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Settings',
        route: '/maintenance',
        icon: 'cil-settings',
        items: [
          {
            name: 'Materials',
            to: '/maintenance/materials',
          },
          {
            name: 'Material Units',
            to: '/maintenance/material-units',
          },
          {
            name: 'Item Units',
            to: '/maintenance/item-units',
          },
          {
            name: 'Job Descriptions',
            to: '/maintenance/job-descriptions',
          },
          {
            name: 'Maintenance Descriptions',
            to: '/maintenance/maintenance-descriptions',
          },
          {
            name: 'Other Expense Descriptions',
            to: '/maintenance/other-expenses',
          },
          {
            name: 'Suppliers',
            to: '/maintenance/suppliers',
          },
          {
            name: 'Equipments',
            to: '/maintenance/equipments',
          },
          {
            name: 'Tools',
            to: '/maintenance/tools',
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Employees',
        route: '/manpowers',
        icon: 'cil-people',
        items: [
          {
            name: 'Add New',
            to: '/manpowers/add',
          },
          {
            name: 'Display All',
            to: '/manpowers/all',
          },
          {
            name: 'Cash Advances',
            to: '/manpowers/cash-advance',
          },
          {
            name: 'Payrolls',
            to: '/manpowers/payroll',
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Projects',
        route: '/projects',
        icon: 'cil-list',
        items: [
          {
            name: 'Add New',
            to: '/projects/add',
          },
          {
            name: 'Display All',
            to: '/projects/all',
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Material Inventories',
        route: '/inventories',
        icon: 'cil-folder',
        items: [
          {
            name: 'Requests',
            to: '/inventories/requests',
          },
          {
            name: 'Purchases',
            to: '/inventories/purchases',
          },
          {
            name: 'Deliveries',
            to: '/inventories/deliveries',
          },
          {
            name: 'Transfers',
            to: '/inventories/transfers',
          },
          {
            name: 'Issuances',
            to: '/inventories/issuances',
          },
          {
            name: 'Withdrawals',
            to: '/inventories/withdrawals',
          },
          {
            name: 'Adjustments',
            to: '/inventories/adjustments',
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Maintenance',
        route: '/maintenance-items',
        icon: 'cil-layers',
        items: [
          {
            name: 'Add New',
            to: '/maintenance-items/add',
          },
          {
            name: 'Display All',
            to: '/maintenance-items/all',
          }
        ]
      },
    ]
  }
]