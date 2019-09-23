var findWithin2 = function (req, res) {
    console.log('withinGeoInfo 모듈 안의 findWithin2 호출함');

    var paramLongitude = req.body.longitude || req.query.longitude;
    var paramLatitude = req.body.latitude || req.query.latitude;

    var paramTopLeftLongitude = req.body.topleft_longitude || req.query.topleft_longitude;
    var paramTopLeftLatitude = req.body.topleft_latitude || req.query.topleft_latitude;
    var paramBottomRightLongitude = req.body.bottomright_longitude || req.query.bottomright_longitude;
    var paramBottomRightLatitude = req.body.bottomright_latitude || req.query.bottomright_latitude;

    //var paramLongitude = (paramTopLeftLongitude + paramBottomRightLongitude) / 2;
    //var paramLatitude = (paramTopLeftLatitude + paramBottomRightLatitude ) / 2;

    console.log('요청 파라미터 : ' + paramLongitude + ' ' + paramLatitude + ' ' +
        paramTopLeftLongitude + ' ' + paramTopLeftLatitude + ' ' +
        paramBottomRightLongitude + ' ' + paramBottomRightLatitude);

    var database = req.app.get('database');

    if (database.db) {
        database.GeoInfoModel.findWithin(paramTopLeftLongitude, paramTopLeftLatitude,
            paramBottomRightLongitude, paramBottomRightLatitude, function (err, results) {
                if (err) {
                    console.log('위치 검색 중 오류 발생 ' + err.stack);

                    res.writeHead('200', {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>범위 위치 조회 중 오류 발생</h1>');
                    res.write('<h2>' + err.stack + '</h2>');
                    res.end();
                    return;
                }

                if (results) {
                    if (results.length > 0) {
                        console.log('results.length ' + results.length);

                        var saved_place = new Array();
                        for (var i = 0; i < results.length; i++) {
                            //console.log(results[i]._doc.geometry.coordinates[1] + ' ' + results[i]._doc.geometry.coordinates[0]);
                            saved_place.push(results[i]._doc.geometry.coordinates[1], results[i]._doc.geometry.coordinates[0]);
                        }
                        res.render('findwithin.ejs', {
                            saved_place: saved_place,
                            paramLongitude: paramLongitude,
                            paramLatitude: paramLatitude,
                            paramTopLeftLongitude: paramTopLeftLongitude,
                            paramTopLeftLatitude: paramTopLeftLatitude,
                            paramBottomRightLongitude: paramBottomRightLongitude,
                            paramBottomRightLatitude: paramBottomRightLatitude
                        });

                    } else {
                        res.writeHead('200', {'Content-Type': 'text/html;charset=utf-8'});
                        res.write('<h1>범위 위치 안에 데이터 없음</h1>');
                        res.end();
                    }
                } else {
                    res.writeHead('200', {'Content-Type': 'text/html;charset=utf-8'});
                    res.write('<h1>범위 위치 안에 데이터 조회 실패</h1>');
                    res.end();
                }
            });
    } else {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf-8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
}

module.exports.findWithin2 = findWithin2;