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

		$.ajax({
			method: 'post',
			url: "api/series/",
			data: JSON.stringify({
				title: title,
				url: url
			}),
			contentType: 'application/json',
			success: function(){
				reloadSeries();
				alert("Guardado con éxito");
			},
			error: function(){
				alert("Se ha producido un error");
			}

		});

		return false;

	});


	function reloadSeries() {
		console.log("Cargando series");

		$.ajax({
			url: "api/series/",
			success: function(data){
				console.log("Series recuperadas", data);
				var html = "";
				for (var i in data) {
					var id = data[i].id;
					var title = data[i].title;
					var url = data[i].url || "";
					html += "<li>";
					html += title;
					if (url.length > 0) 
						html += " (" + url + ")";
					html += ' <button data-serieid="' + id + '">Eliminar</button>';
					html += "</li>";
				}
				$("#seriesList").html(html);
			}
		});

	}

	$("#reloadSeriesButton").on("click", reloadSeries);

	$("#seriesList").on("click", "button", function(){
		
		console.log("Elimino la serie");
		
		var self = this;
		var id = $(self).data("serieid"); // cojo el valor del atributo data-serieid del botón
		
		$.ajax({
			url: "/api/series/" + id,
			method: "delete",
			success: function(){
				$(self).parent().remove();
			}
		});
		
	});

	reloadSeries();

});