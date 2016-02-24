$(document).ready(function(){ // Cuando la página esté cargada

	// Ponemos el foco en el primer input
	$(".auto-focus").focus();

	$("form").on("submit", function(){ // Cuando se envíe el formulario

		// validación del título
		var title = $.trim( $("#title").val() );
		if ( title == "") {
			alert("El título no puede estar vacío");
			return false;
		}

		// validación de URL
		var url = $.trim( $("#cover_url").val() );
		var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;
		if (url != "" && false == pattern.test(url)) {
			alert("La URL de la carátula no es válida");
			return false;
		}

		// validación de categorías
		var selectedCategories = $('input[name=category]:checked');
		if (selectedCategories.length == 0) {
			alert("Selecciona al menos una categoría");
			return false;
		}

		return true;

	});

});