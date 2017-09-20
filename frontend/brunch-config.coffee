isDevelopment = true
host = 'http://127.0.0.1:3000'
if process.env.NODE_ENV is 'production'
  isDevelopment = false
  host = 'http://api-stockerize.jgefroh.com';

exports.config =
  modules:
    definition: false
    wrapper: false
  npm:
    enabled: false
  plugins:
    compress: {}
    assetsmanager:
      copyTo:
        '/': ['app/modules/**/*.html']
        '/data': ['app/data/*.*']
    replace:
      encoding: 'utf8'
      log: true
      mappings:
        'is_development': isDevelopment
        'api_host': host
      paths: [
        'public/js/app.js'
      ]
      replacePrefix: '{!'
      replaceSuffix: '!}'
    sass:
      options:
        includePaths: [
          'bower_components/bourbon/app/assets/stylesheets',
          'bower_components/neat/app/assets/stylesheets'
        ]

  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/,
        'js/vendor.js':  /^(?!app)/
      order:
        before: [
          /^bower_components(\/|\\)jquery(\/|\\)dist(\/|\\)jquery.js$/,
          /^bower_components(\/|\\)angular(\/|\\)angular.js$/
          /^app(\/|\\)modules(\/|\\)(.+)(\/|\\)(.+)-module.js$/,
          /^app(\/|\\)modules(\/|\\)(.+)(\/|\\)(.+).js$/,
          'app/app.js'
        ]
    stylesheets:
      joinTo:
        'css/app.css': /^(app\/scss\/app.scss|vendor|bower_components)/
    templates:
      joinTo: 'js/app.js'
