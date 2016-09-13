var NginxConfFile = require('nginx-conf').NginxConfFile;

var parse = function(data, doing){
  if(Array.isArray(data)){
    for(var index in data){
      data[index] = parse(data[index], doing);
    }
  }
  else{
    console.log(data);
    data = doing(data);
    //console.log(data);
  }
  return data;
}

NginxConfFile.create('default.conf', function(err, conf) {
  if (err) {
    console.log(err);
    return;
  }

  var attrs = ['listen', 'return', 'location'];
  var outputs = {};

  for(var index in conf.nginx.server){
    var server = conf.nginx.server[index];
    if(index === '19'){
      if(typeof server.server_name !== 'undefined'){
        var server_name = index + '----' +server.server_name.toString().replace('server_name ', '').replace(';\n', '');
        outputs[server_name] = {};
        for(var key in server){
          if(key.substring(0, 1) !== '_' && attrs.indexOf(key) !== -1){
            //console.log(key);
            //console.log(server[key]);
            //console.log(server[key].toString().replace(key + ' ', ''));
            outputs[server_name][key] = {};
            outputs[server_name][key] = parse(server[key], function(data){
              return data.toString().replace(key + ' ', '').replace('\n', '');
            });
            // for(var attributeIndex in server[key]){
            //   outputs[server_name][key][attributeIndex] = server[key][attributeIndex].toString().replace(key + ' ', '').replace('\n', '');
            // }
          }
        }
      }

      //console.log(server);
    }
  }
  var json = JSON.stringify(outputs);
  //console.log(json);
  //console.log(conf.nginx.server[0]['server_name'].toString());
});