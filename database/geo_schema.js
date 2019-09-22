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

    // 가장 가까운 커피숍 조회
    GeoSchema.static('near', function(longitude, latitude, maxDistance, callback) {
        this.find().where('geometry').near({center:{type:'Point', coordinates:[parseFloat(longitude), parseFloat(latitude)]}, maxDistance:maxDistance}).limit(1).exec(callback);
    });

    return GeoSchema;
};

module.exports = Schema;