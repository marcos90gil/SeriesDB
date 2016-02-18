module.exports = function (grunt) {
	// Configuración de Grunt
	var settings = {
		less: {
			style: {
				files: { // archivos a compilar
					"style.css": "less/style.less"
				}
			}
		},
		watch: {
			styles: {
				files: ["less/*.less"], // observar cualquier archivo less
				tasks: ["less"], // ejecuta la compilación less
				options: {
					spawn: false // para que no se quede tostado (creo)
				}
			}
		}
	};

	// Cargamos configuración de Grunt
	grunt.initConfig(settings);

	// Cargamos los plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Cargamos las tareas que necesitamos
	grunt.registerTask('default', ['less', 'watch']);
	grunt.registerTask('production', ['less']);
	// Serparamos una tarea por defecto que compile el less primero y luego se ponga a observar
};