var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);
app.use(require('./lib/uglify'));

app.router.get('/', function () {
  this.res.json({ 'Post your JS file to /uglify to receive the uglified version!' })
});

app.router.post('/uglify', function() {
  var code = this.req.chunks.toString();
  var uglified = app.uglify(code);
  this.res.end(uglified);
});

app.start(3000);
