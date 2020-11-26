import React from 'react';

export const configs = {
    testing: {
        userlogin: 'http://localhost:8080/conf/user',
        getcases: 'http://localhost:8080/getcases',
        getpeople: 'http://localhost:8080/getstudents',
        usecors: true
    },
    production: {
        userlogin: '/conf/user',
        getcases: '/getcases',
        getpeople: '/getstudents',
        usecors: false
    }
}

export const ApiContext = React.createContext(configs.testing);
