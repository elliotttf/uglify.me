var UglifyJS = require('uglify-js');

var Uglify = exports;

Uglify.attach = function(options) {
  this.uglify = function(code, options) {
    options = options || {};
    if (typeof options.fromString === 'undefined') {
      options.fromString = true;
    }
    options.output = options.output || {};
    if (typeof options.output.comments === 'undefined') {
      options.output.comments = /((@?license|copyright)|^!|@preserve|@cc_on)/i;
    }
    var res = UglifyJS.minify(code, options);
    return res.code;
  };
};

Uglify.init = function(done) {
  done();
};

