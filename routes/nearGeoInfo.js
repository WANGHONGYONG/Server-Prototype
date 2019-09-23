var findNear2 = function(req, res){
    console.log('nearGeoInfo 안의 near 호출됨');

    var maxDistance = 1000;

    var paramLongitude = req.body.longitude || req.query.longitude;
    var paramLatitude = req.body.latitude || req.query.latitude;

    console.log('요청 파라미터 : ' + paramLongitude + ' ' + paramLatitude);

    var database = req.app.get('database');

    if(database.db){
        database.GeoInfoModel.findNear(paramLongitude, paramLatitude, maxDistance,
            function(err, results){
                if(err) {
                    console.log('위치 검색 중 오류 발생 : ' + err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>위치 검색 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();
                    return;
                }

                if(results){
                    if(results.length > 0){
                        res.render('near2.ejs', {
                            result: results[0]._doc,
                            paramLatitude: paramLatitude,
                            paramLongitude: paramLongitude});
                    } else {
                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>가까운 위치에 대한 데이터가 없습니다</h2>');
                        res.end();
                    }
                } else {
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>가까운 위치에 대한 조회 실패</h2>');
                    res.end();
                }
            });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터 베이스 연결 실패</h2>');
        res.end();
    }
}

var findNear = function(req, res) {
    var maxDistance = 1000;

    var paramLongitude = req.body.longitude || req.query.longitude;
    var paramLatitude = req.body.latitude || req.query.latitude;

    console.log('요청 파라미터 : ' + paramLongitude + ', ' + paramLatitude);

    // 데이터베이스 객체 참조
    var database = req.app.get('database');

    // 데이터베이스 객체가 초기화된 경우
    if (database.db) {
        // 1. 가까운 위치 검색

        database.GeoInfoModel.findNear(paramLongitude, paramLatitude, maxDistance, function(err, results) {
            if (err) {
                console.error('위치 검색 중 에러 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>위치 검색 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }

            if (results) {
                console.dir(results);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>가까운 위치</h2>');
                res.write('<div><ul>');

                for (var i = 0; i < results.length; i++) {
                    var curName = results[i]._doc.name;
                    var curAddress = results[i]._doc.address;
                    var curTel = results[i]._doc.tel;
                    var curLongitude = results[i]._doc.geometry.coordinates[0];
                    var curLatitude = results[i]._doc.geometry.coordinates[1];

                    res.write('    <li>#' + i + ' : ' + curName + ', ' + curAddress + ', ' + curTel + ', ' + curLongitude + ', ' + curLatitude + '</li>');
                }

                res.write('</ul></div>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>가까운 위치 조회 실패</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }

};

module.exports.findNear2 = findNear2;
module.exports.findNear = findNear;