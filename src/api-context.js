import {createContext} from 'react';

export const configs = {
    testing: {
        userlogin: 'http://localhost:8080/conf/user',  // POST
        getcases: 'http://localhost:8080/getcases',  // GET
        getpeople: 'http://localhost:8080/getstudents',  // GET
        addcase: 'http://localhost:8080/addcase',  // PUT
        editcase: 'http://localhost:8080/editcase/',  // PUT
        updatecasedata: 'http://localhost:8080/updatecasedata',  // PUT
        deletecase: 'http://localhost:8080/deletecase/',  // DELETE
        getsecondarys: 'http://localhost:8080/getsecondarys',  // GET
        addsecondary: 'http://localhost:8080/addsecondary',  // PUT
        editsecondary: 'http://localhost:8080/editsecondary/',  // PUT
        deletesecondary: 'http://localhost:8080/deletesecondary',  // DELETE
        urgentxlsx: 'http://localhost:8080/urgentcases/urgent.xlsx',  // GET
        openxlsx: 'http://localhost:8080/opencases/open.xlsx',  // GET
        blockedxlsx: 'http://localhost:8080/blockedcases/blocked.xlsx',  // GET
        awaitingxlsx: 'http://localhost:8080/awaitingcases/awaiting.xlsx',  // GET
        overviewxlsx: 'http://localhost:8080/caseoverview/cases.xlsx',  // GET
        exposedxlsx: 'http://localhost:8080/exposedoverview/exposed.xlsx', // GET
        crosssite: true
    },
    production: {
        userlogin: '/conf/user',
        getcases: '/getcases',
        getpeople: '/getstudents',
        addcase: '/addcase',
        editcase: '/editcase/',
        updatecase: '/updatecasedata',
        deletecase: '/deletecase/',
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

export const ApiContext = createContext(configs.production);
