import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'
const menu = [
    {
        id: 1,
        label: 'Dashboard',
        path: '/',
        icon: HiOutlineViewGrid
    },
    {
        id: 2,
        label: 'Leads',
        path: '/leads',
        icon: HiOutlineCube,
    },
    {
        id: 5,
        label: 'Employees',
        path: '/employees',
        icon: HiOutlineShoppingCart
    },
    {
        id: 6,
        label: 'Add Employee',
        path: '/add-employee',
        icon: HiOutlineUsers
    },
    {
        id: 7,
        label: 'Transactions',
        path: '/transactions',
        icon: HiOutlineDocumentText
    },
    {
        id: 8,
        label: 'Messages',
        path: '/messages',
        icon: HiOutlineAnnotation
    },
    {
        id: 9,
        label: 'Leave',
        path: '/leave',
        icon: HiOutlineAnnotation
    }
]


export const managerMenu = [
    {
        id: 1,
        label: 'Dashboard',
        path: '/',
        icon: HiOutlineViewGrid
    },
    {
        id: 2,
        label: 'Leads',
        path: '/leads',
        icon: HiOutlineCube,
    },
    {
        id: 2,
        label: 'Employees',
        path: '/employees',
        icon: HiOutlineShoppingCart
    },
    {
        id: 9,
        label: 'Leave',
        path: '/leave',
        icon: HiOutlineAnnotation
    }
]

export const hrMenu = [
    {
        id: 1,
        label: 'Dashboard',
        path: '/',
        icon: HiOutlineViewGrid
    },
    {
        id: 2,
        label: 'Employees',
        path: '/employees',
        icon: HiOutlineShoppingCart
    },
    {
        id: 3,
        label: 'Leave',
        path: '/leave',
        icon: HiOutlineAnnotation
    }
]

export const saleExecutiveMenu = [
    {
        id: 1,
        label: 'Dashboard',
        path: '/',
        icon: HiOutlineViewGrid
    },
    {
        id: 2,
        label: 'Leads',
        path: '/leads',
        icon: HiOutlineCube,
    },
    {
        id: 3,
        label: 'Leave',
        path: '/leave',
        icon: HiOutlineAnnotation
    }
]

export const internMenu = [
    {
        id: 1,
        label: 'Leads',
        path: '/leads',
        icon: HiOutlineCube,
    },
    {
        id: 2,
        label: 'Leave',
        path: '/leave',
        icon: HiOutlineAnnotation
    }
]

export default menu;