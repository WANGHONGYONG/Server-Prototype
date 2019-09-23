module.exports = {
    server_port: 3001,
    db_url: 'mongodb://localhost:27017/local',
    route_info: [
        //{file:'./coffeeshop', path:'/process/addcoffeeshop', method:'add', type:'post'}
        {file: './addGeoInfo', path: '/process/addGeoInfo', method: 'add', type: 'post'},
        {file: './searchGeoInfo', path: '/process/searchGeoInfo', method: 'list', type: 'post'},
        {file: './nearGeoInfo', path: '/process/findNearGeoInfo', method: 'findNear2', type: 'post'},
        {file: './withinGeoInfo', path: '/process/findWithinGeoInfo', method: 'findWithin2', type: 'post'},
    ],
    db_schemas: [
        { file : './geo_schema', collection : 'geoInfo', schemaName : 'geoInfo', modelName : 'GeoInfoModel'},
    ]
}