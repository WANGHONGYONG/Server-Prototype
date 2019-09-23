var Schema = {};

Schema.createSchema = function(mongoose) {
    var GeoSchema = mongoose.Schema({
        name: {type: String, index: 'hashed', 'default' : ''},
        address: {type: String, index: 'hashed', 'default': ''},
        geometry: {
            'type': {type: String, 'default': 'Point'},
            coordinates: [{type: 'Number'}]
        }
    });

    GeoSchema.index({geometry : '2dsphere'});

    GeoSchema.static('findAll', function(callback){
        return this.find({}, callback);
    });

    // 가장 가까운 위치 조회
    GeoSchema.static('findNear', function(longitude, latitude, maxDistance, callback) {
        this.find().where('geometry').near({center:{type:'Point', coordinates:[parseFloat(longitude), parseFloat(latitude)]}, maxDistance:maxDistance}).limit(3).exec(callback);
    });

    // 사각형 안의 위치 조회
    GeoSchema.static('findWithin', function(topleft_longitude, topleft_latitude, bottomright_longitude, bottomright_latitude, callback) {
        this.find().where('geometry').within({box:[[parseFloat(topleft_longitude), parseFloat(topleft_latitude)], [parseFloat(bottomright_longitude), parseFloat(bottomright_latitude)]]}).exec(callback);
    });

    return GeoSchema;
};

module.exports = Schema;