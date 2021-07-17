let baseUrl = "http://ec2-3-13-20-24.us-east-2.compute.amazonaws.com:8081";
export const endPoints = {
    auth_user: baseUrl + '/api/login/',
    install_eseal: baseUrl + '/api/install-eseal',

    logout: baseUrl + '/logout',
}

export const status = {
    "SUCCESS" : "SUCCESS",
    "FAILED":"FAILED"
}