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
    VENDOR_REQUEST: baseUrl +'/api/vendor-eseal-request' ,
    userList: baseUrl +"/api/eseal-request-list?userId=" ,
    superAdminAccept: baseUrl + '/api/update-eseal-request',
    adminDashboard: baseUrl+"/api/admin-dashboard?userId=",
    vendorDashboard: baseUrl+"/api/vendor-dashboard?userId=",
    searchEseal: baseUrl + "/api/search-sealno?vendorId=",
    notification: baseUrl + "/api/notifications?userId=",
    updateNotification: baseUrl + "/api/update-notification?notificationId=",
    trackSeal: baseUrl+ "/api/track-eseal?sealId=",
    geoloc:'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=',
    inventory: baseUrl +"/api/addeseal-inventory",
    validateEseal: baseUrl + "/api/validate-sealnumber?sealNumber=",
    esealList: baseUrl + "/api/available-seals?adminId="
}

export const status = {
    "SUCCESS" : "SUCCESS",
    "success":"success",
    "FAILED":"FAILED"
}