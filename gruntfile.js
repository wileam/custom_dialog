module.exports = function(grunt) {

  // LiveReload的默认端口号，你也可以改成你想要的端口号
  var lrPort = 35728;
  // 使用connect-livereload模块，生成一个与LiveReload脚本
  // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
  var lrSnippet = require('connect-livereload')({
      port: lrPort
  });
  // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  var lrMiddleware = function(connect, options) {
    return [
      // 把脚本，注入到静态文件中
      lrSnippet,
      // 静态文件服务器的路径
      connect.static(String(options.base)),
      // 启用目录浏览(相当于IIS中的目录浏览)
      connect.directory(String(options.base))
    ];
  };

    // 项目配置
    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      uglify: {
        build: {
          files: [{
            expand: true,
            cwd: 'js/',
            src: '*.js',
            dest: 'js/',
            ext: '-min.js'
          }],
          options: {
            banner: '/*! Creat by <%= pkg.author %> @<%= grunt.template.today("yyyy-mm-dd") %> */\n'
          }
        }
      },

      cssmin: {
        compress: {
          files: [{
            expand: true,
            cwd: 'css/',
            src: ['*.css'],
            dest: 'css/',
            ext: '-min.css'
          }],
          options: {
            banner: '/*! Creat by <%= pkg.author %> @<%= grunt.template.today("yyyy-mm-dd") %> */\n'
          }
        }
      },

      htmlhint: {
        build: {
          options: {
            'tag-pair': true,
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'spec-char-escape': true,
            'id-unique': true,
            'head-script-disabled': true,
          },
          src: ['*.html']
        }
      },

      // for livereload
      connect: {
        options: {
          // 服务器端口号
          port: 3030,
          hostname: 'localhost',
          base: '.'
        },
        livereload: {
          options: {
              // 通过LiveReload脚本，让页面重新加载。
              middleware: lrMiddleware
          }
        }
      },

      less: {
        options: {
          paths: ['css/less/']
        },
        files: {
          expand: true,
          cwd: 'css/less/',
          src: ['*.less','!_*.less'],
          dest: 'css/',
          ext: '.css'
        }
      },
      // 监控文件变化, 然后 打包/刷新浏览器
      watch: {
        html: {
          files: ['*.html']
        },
        less: {
          files: ['css/less/*.less'],
          tasks: ['less']
        },
        js: {
          files: ['js/*.js'],
          // tasks: ['newer:jshint']
        },
        livereload: {
          // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
          options: {
            livereload: lrPort
          },
          // '**' 表示包含所有的子目录
          // '*' 表示包含所有的文件
          files: ['*.html','js/*','css/*'],
        }
      }
  });

  // 加载提供任务的插件
  // livereload
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //sass编译-compass
  // grunt.loadNpmTasks('grunt-contrib-compass');
  // less编译
  grunt.loadNpmTasks('grunt-contrib-less');
  //html语法检查
  grunt.loadNpmTasks('grunt-htmlhint');

  // livereload, 监控文件修改, 然后刷新浏览器
  grunt.registerTask('default', ['connect', 'watch']);
};
