import {createContext} from 'react';

export const configs = {
    testing: {
        userlogin: 'http://localhost:8080/conf/user',
        getcases: 'http://localhost:8080/getcases',
        getpeople: 'http://localhost:8080/getstudents',
        addcase: 'http://localhost:8080/addcase',
        editcase: 'http://localhost:8080/editcase/',
        updatecase: 'http://localhost:8080/updatecase',
        getsecondarys: 'http://localhost:8080/getsecondarys',
        addsecondary: 'http://localhost:8080/addsecondary',
        editsecondary: 'http://localhost:8080/editsecondary/',
        deletesecondary: 'http://localhost:8080/deletesecondary',
        urgentxlsx: 'http://localhost:8080/urgentcases/urgent.xlsx',
        openxlsx: 'http://localhost:8080/opencases/open.xlsx',
        blockedxlsx: 'http://localhost:8080/blockedcases/blocked.xlsx',
        awaitingxlsx: 'http://localhost:8080/awaitingcases/awaiting.xlsx',
        overviewxlsx: 'http://localhost:8080/caseoverview/cases.xlsx',
        exposedxlsx: 'http://localhost:8080/exposedoverview/exposed.xlsx',
        crosssite: true
    },
    production: {
        userlogin: '/conf/user',
        getcases: '/getcases',
        getpeople: '/getstudents',
        addcase: '/addcase',
        editcase: '/editcase/',
        updatecase: '/updatecase',
        getsecondarys: '/getsecondarys',
        addsecondary: '/addsecondary',
        editsecondary: '/editsecondary/',
        deletesecondary: '/deletesecondary',
        urgentxlsx: '/urgentcases/urgent.xlsx',
        openxlsx: '/opencases/open.xlsx',
        blockedxlsx: '/blockedcases/blocked.xlsx',
        awaitingxlsx: '/awaitingcases/awaiting.xlsx',
        overviewxlsx: '/caseoverview/cases.xlsx',
        exposedxlsx: '/exposedoverview/exposed.xlsx',
        crosssite: false
    }
}

export const ApiContext = createContext(configs.testing);
