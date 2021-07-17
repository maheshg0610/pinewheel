let baseUrl = "http://ec2-3-13-20-24.us-east-2.compute.amazonaws.com:8081";

export const endPoints = {
    auth_user: baseUrl + '/api/login/',
    install_eseal: baseUrl + '/api/install-eseal',
    logout: baseUrl + '/logout',
    IDC_LIST: baseUrl + "/api/icd-list",
    POST_LIST: baseUrl +'/api/port-list',
    CHA_LIST: baseUrl + '/api/cha-list',
    CFS_LIST: baseUrl + '/api/cfs-list',
    ESEAL_REGISTER: baseUrl + '/api/eseal-registration',
    vendor_LIST: baseUrl + '/api/vendorlist',
    activate: baseUrl + '/api/activate-vendor',
    health_status: baseUrl + '/api/eseal-healthstatus-update',  
}

export const status = {
    "SUCCESS" : "SUCCESS",
    "FAILED":"FAILED"
}