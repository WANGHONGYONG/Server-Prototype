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

    return GeoSchema;
};

module.exports = Schema;