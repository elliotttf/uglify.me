var flatiron = require('flatiron'),
    path = require('path'),
    fs = require('fs'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);
app.use(flatiron.plugins.static, {
  root: path.join(__dirname, 'static'),
  dir: path.join(__dirname, 'static')
});
app.use(require('./lib/uglify'));

// WAT? Need to figure out how to route this correctly to the static file.
app.router.get('/', function() {
  var self = this;
  fs.readFile(path.join(__dirname, 'static', 'index.html'), 'utf8', function(err, data) {
    if (!err) {
      self.res.end(data);
    }
  });
});

app.router.post('/uglify', function() {
  var code = this.req.chunks.toString();
  try {
    var uglified = app.uglify(code);
    this.res.end(uglified);
    app.log.info('Uglified ' + code.length + ' bytes to ' + uglified.length + ' bytes.');
  }
  catch (e) {
    this.res.writeHead(500);
    this.res.end();
    app.log.error(e.message);
  }
});

app.start(app.config.get('port') || 3000);
