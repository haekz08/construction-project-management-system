//LOCAL SET UP
// let server_url="http://127.0.0.1:8000";
// let backend_url=server_url+'';
// let assets_url='http://localhost:8080/';
// let server_client_secret="jH4nVdYZfkkXg7imAK6jdvt1y5TohLP0RzDoD3NI";

//LOCAL SET UP BUILD
// let server_url="http://192.168.1.3";
// let backend_url=server_url+'/franco_construction_v2/back_dev/public';
// let assets_url='http://192.168.1.3/franco_construction_v2/build/';
// let server_client_secret="jH4nVdYZfkkXg7imAK6jdvt1y5TohLP0RzDoD3NI";

//LIVE SET UP
let server_url="http://192.168.0.101";
let backend_url=server_url+'/franco_construction_v2/back_dev/public';
let assets_url='http://192.168.0.101/franco_construction_v2/build/';
let server_client_secret="jH4nVdYZfkkXg7imAK6jdvt1y5TohLP0RzDoD3NI";




export const assets_path = Object.freeze({
    DEFAULT_URL: assets_url
});
export const client_details = Object.freeze({
    CLIENT_ID: "2",
    CLIENT_SECRET: server_client_secret
});
export const server_details = Object.freeze({
    SERVER_URL: backend_url+"/api/",
});