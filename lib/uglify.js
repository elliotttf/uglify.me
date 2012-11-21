var jsp = require('uglify-js').parser;
var pro = require('uglify-js').uglify;

var Uglify = exports;

Uglify.attach = function(options) {
  this.uglify = function(code, options) {
    var ast = jsp.parse(code);
    ast = pro.ast_mangle(ast);
    ast = pro.ast_squeeze(ast);
    return pro.gen_code(ast, options);
  };
};

Uglify.init = function(done) {
  done();
};

