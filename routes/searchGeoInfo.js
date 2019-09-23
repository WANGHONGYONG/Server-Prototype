var list = function(req, res){
    console.log('지도 정보 리스트 나열 호출됨');

    var database = req.app.get('database');

    if(database.db){
        database.GeoInfoModel.findAll(function(err, results){
            if(err){
                console.error('리스트 조회 중 오류 발생 : ' + err.stack);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h1>리스트 조회 중 오류 발생</h1>');
                res.write('<h2>' + err.stack + '</h2>');
                res.end();
                return;
            }

            if(results){
                console.dir(results);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h1>지도 정보 리스트</h1>');
                res.write('<div><ul>');
                for( var i = 0; i < results.length; i++) {
                    var curName = results[i]._doc.name;
                    var curAddress = results[i]._doc.address;
                    var curLongitude = results[i].geometry.coordinates[0];
                    var curLatitude = results[i].geometry.coordinates[1];

                    res.write('<li>#' + i + ' : ' + curName + ' ' + curAddress + ' '
                        + curLongitude + ' ' + curLatitude + '</li>');
                }
                    res.write('</ul></div>');
                    res.write("<a href='/public/main.html'>메인화면으로 되돌아가기</a>");
                    res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h1>지도 정보 조회 실패</h1>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
        res.write('<h1>데이터 베이스 연결 실패 정보 조회 실패</h1>');
        res.end();
    }
};

module.exports.list = list;