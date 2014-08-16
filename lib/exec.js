var spawn = require('child_process').spawn;
var temp = require('temp');
var fs = require('fs');
var Q = require('q');

temp.track();

var tempOpen = function (name) {
  var defer = Q.defer();

  temp.open('exec_out', function (err, tmp) {
    if (err) {
      defer.reject();
    } else {
      defer.resolve(tmp);
    }
  });

  return defer.promise;
};

var tempClose = function (tmp) {
  var defer = Q.defer();

  fs.close(tmp.fd, function (err) {
    if (err) {
      defer.reject();
    } else {
      defer.resolve(tmp);
    }
  });

  return defer.promise;
};

var tempRead = function (tmp) {
  var defer = Q.defer();

  fs.readFile(tmp.path, { encoding: 'utf-8' }, function (err, out) {
    if (err) {
      defer.reject();
    } else {
      defer.resolve(out);
    }
  });

  return defer.promise;
};

// workaround to get full stdout output in Windows
var exec = function (command, args, options, callback) {

  Q.all([
    tempOpen('exec_out'),
    tempOpen('exec_err')

  ]).spread(function (tempOut, tempErr) {
    var defer = Q.defer();

    options.stdio = ['ignore', tempOut.fd, tempErr.fd];
    spawn(command, args, options).on('close', function (code) {
      defer.resolve({
        tempOut: tempOut,
        tempErr: tempErr,
        code: code
      });
    });

    return defer.promise;

  }).then(function (result) {
    var tempOut = result.tempOut;
    var tempErr = result.tempErr;
    var code = result.code;

    return Q.all([
      tempClose(tempOut),
      tempClose(tempErr),
      code
    ]);

  }).spread(function (tempOut, tempErr, code) {
    return Q.all([
      tempRead(tempOut),
      tempRead(tempErr),
      code
    ]);

  }).spread(function (out, err, code) {
    callback(code, out, err);
  });
};

module.exports = exec;
