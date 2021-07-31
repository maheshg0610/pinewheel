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
    searchEseal: baseUrl + "/api/search-sealno?vendorId=2&sealNo=Seal1",
    notification: baseUrl + "/api/notifications?userId=6&sealStatus=Tempered&viewStatus=unseen",
    updateNotification: baseUrl + "/api/update-notification?notificationId=1&userId=2",
    tackSeal:"/api/track-eseal?sealId=4"
}

export const status = {
    "SUCCESS" : "SUCCESS",
    "FAILED":"FAILED"
}