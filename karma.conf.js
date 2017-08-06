// Karma configuration
// Generated on Sat Aug 05 2017 11:02:31 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["browserify", "mocha"],

    // list of files / patterns to load in the browser
    files: [
			'config/*.js',
			'tests/*.js',
			'*.html'
		],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.js": ["browserify"],
      "**/*.js": ["env"],
			// "**/*.js": ["eslint"],
      '**/*.html': ['html2js']
		},
		
		// html2js preprocessing options
html2JsPreprocessor: {
      // strip this from the file path 
      stripPrefix: 'public/',
 
      // prepend this to the file path 
      prependPrefix: 'served/',
 
      // or define a custom transform function 
      processPath: function(filePath) {
        // Drop the file extension 
        return filePath.replace(/\.html$/, '');
      }
    },
    // eslint options
    // eslint: {
    //   errorThreshold: 1000,
    //   stopAboveErrorThreshold: true,
    //   stopOnError: false,
    //   stopOnWarning: true,
		// 	showWarnings: true,
		// 	engine: {

    //   configFile: 'client/.eslintrc'
		// 	}
    // },

    // karma-env-preprocessor
    envPreprocessor: [
      "DATABASE_URL",
      "JAWSDB_URL",
      "AWS_ACCESS_KEY_ID",
      "AWS_SECRET_ACCESS_KEY",
      "S3_BUCKET",
      "AZURE_SUBSCRIPTION_ID",
      "AZURE_SPEAKER_RECOGNITION_KEY1",
      "AZURE_SPEAKER_RECOGNITION_KEY2"
    ],
    // browserify
    // add additional browserify configuration properties here
    // such as transform and/or debug=true to generate source maps
    browserify: {
      debug: true,
      transform: ["brfs"]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome", "Firefox"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
