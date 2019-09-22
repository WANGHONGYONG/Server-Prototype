var add = function(req, res){
    console.log('addGeoInfo 모듈 안의 add 호출');

    var paramName = req.body.name || req.query.name;
    var paramAddress = req.body.address || req.query.address;
    var paramLongitude = req.body.longitude || req.query.longitude;
    var paramLatitude = req.body.latitude || req.query.latitude;

    console.log('요청 파라미터 : ' + paramName + ' ' + paramAddress + ' ' +
                    paramLongitude + ' ' + paramLatitude);

    var database = req.app.get('database');

    if(database.db){
        addGeoInfo(database, paramName, paramAddress, paramLongitude, paramLatitude, function(err, result){
            if(err){
                console.error('지도 정보 추가 중 오류 발생 ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h1>지도 정보 추가 중 오류 발생</h1>');
                res.write('<h2>' + err.stack + '</h2>');
                res.end();
                return;
            }

            if(result){
                //console.dir(result);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h1>지도 정보 추가 성공</h1>');
                res.write('<h2>' + result._doc.paramLongitude + ' ' + result._doc.paramLatitude +'</h2>')
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h1>지도 정보 추가 실패</h1>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
        res.write('<h2>데이터 베이스 연결 실패</h2>');
        res.end();
    }
};

var addGeoInfo = function(database, name, address, longitude, latitude, callback){
    console.log('addGeoInfo 모듈 안의 addGeoInfo 호출');

    var geo = new database.GeoInfoModel({
        name : name, address : address, geometry : { type : 'Point', coordinates : [longitude, latitude]
        }
    });

    geo.save(function(err){
        if(err) {
            callback(err, null);
            return;
        }

        console.log('위치 정보 추가 성공');
        callback(null, geo);
    });
}

module.exports.add = add;