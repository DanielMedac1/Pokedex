function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
$(document).ready(function () {
    const verTodosButton = $('#ver-todos');
    const resultadosContainer = $('#resultados-container');

    verTodosButton.on('click', function () {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.error('Exito al obtener los datos de los Pokémon');
                mostrarResultados(data);
            },
            error: function (error) {
                if (error.status === 404) {
                    console.error('La API no puede recuperar los datos de la lista de Pokemon exitosamente.');
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'La API no puede recuperar los datos de la lista de Pokemon exitosamente.'
                    });
                } else if (error.status === 500) {
                    console.error('Error interno en el servidor. Inténtalo de nuevo más tarde.');
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error interno en el servidor. Inténtalo de nuevo más tarde.'
                    });
                } else {
                    console.error('Error desconocido:', error.responseText);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error desconocido',
                        text: 'Error desconocido: ' + error.responseText
                    });
                }
            }
        });
    });

    $(document).ready(function () {
        const verTodosButton = $('#ver-todos');
        const tipoButtons = $('.btn-header:not(#ver-todos)');
        const resultadosContainer = $('#listaPokemon');
        let resultados;

        verTodosButton.on('click', function () {
            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.error('Exito al obtener los datos de los Pokémon');
                    resultados = data;
                    mostrarResultados(resultados);
                },
                error: function (error) {
                    if (error.status === 404) {
                        console.error('La API no puede recuperar los datos de la lista de Pokemon exitosamente.');
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'La API no puede recuperar los datos de la lista de Pokemon exitosamente.'
                        });
                    } else if (error.status === 500) {
                        console.error('Error interno en el servidor. Inténtalo de nuevo más tarde.');
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error interno en el servidor. Inténtalo de nuevo más tarde.'
                        });
                    } else {
                        console.error('Error desconocido:', error.responseText);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error desconocido',
                            text: 'Error desconocido: ' + error.responseText
                        });
                    }
                }
            });
        });

        const limpiarButton = $('#borrar-todos');
        limpiarButton.on('click', function () {
            resultadosContainer.empty();
        });

        function mostrarResultados(resultados) {
            resultadosContainer.empty();

            resultados.results.forEach(function (pokemon) {
                $.ajax({
                    url: pokemon.url,
                    method: 'GET',
                    dataType: 'json',
                    success: function (detallePokemon) {
                        console.error('Exito al obtener detalles del Pokémon');
                        const pokemonElement = $('<div>').addClass('pokemon');

                        const imagenContainer = $('<div>').addClass('pokemon-imagen');
                        const imagen = $('<img>').attr('src', detallePokemon.sprites.front_default).attr('alt', detallePokemon.name);
                        imagenContainer.append(imagen);

                        const infoContainer = $('<div>').addClass('pokemon-info');
                        const nombreContainer = $('<div>').addClass('nombre-contenedor');
                        const idParagraph = $('<p>').addClass('pokemon-id').text('ID: ' + detallePokemon.id);
                        const nombreHeading = $('<h2>').addClass('pokemon-nombre').text(detallePokemon.name);

                        nombreContainer.append(idParagraph, nombreHeading);
                        infoContainer.append(nombreContainer);

                        const tiposContainer = $('<div>').addClass('pokemon-tipos');
                        detallePokemon.types.forEach(function (tipo) {
                            const tipoParagraph = $('<p>').addClass('tipo ' + tipo.type.name).text(capitalizeFirstLetter(tipo.type.name));
                            tiposContainer.append(tipoParagraph);
                        });

                        /* const statsContainer = $('<div>').addClass('pokemon-stats');
                        detallePokemon.stats.forEach(function (stat) {
                            const statParagraph = $('<p>').addClass('stat').text(stat.base_stat + ' ' + capitalizeFirstLetter(stat.stat.name));
                            statsContainer.append(statParagraph);
                        }); */

                        pokemonElement.append(imagenContainer, infoContainer, tiposContainer);
                        resultadosContainer.append(pokemonElement);
                    },
                    error: function (error) {
                        if (error.status === 404) {
                            console.error('Pokémon no encontrado en la API. Comprueba nombre o ID introducidos.');
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Pokémon no encontrado en la API. Comprueba nombre o ID introducidos.'
                            });
                        } else if (error.status === 500) {
                            console.error('Error interno en el servidor. Inténtalo de nuevo más tarde.');
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Error interno en el servidor. Inténtalo de nuevo más tarde.'
                            });
                        } else {
                            console.error('Error desconocido:', error.responseText);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error desconocido',
                                text: 'Error desconocido: ' + error.responseText
                            });
                        }
                    }
                });
            });
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const btnBuscar = $('#btnBuscar');
        const inputBusqueda = $('#inputBusqueda');

        inputBusqueda.on('keypress', function (event) {
            // 13=Enter
            if (event.which === 13) {
                event.preventDefault();

                const searchTerm = inputBusqueda.val().toLowerCase().trim();
                inputBusqueda.val(' ');

                const formatoCorrecto = /^[a-zA-Z0-9\-]+$/.test(searchTerm);

                if (searchTerm === '') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campo Vacío',
                        text: 'Por favor, ingresa un nombre o número de Pokémon antes de buscar.'
                    });
                    return;
                } else if (!formatoCorrecto) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Formato Incorrecto',
                        text: 'Por favor, ingresa un nombre o número de Pokémon válido.'
                    });
                    return;
                }

                const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

                buscarYMostrarPokemon(url);
            }
        });


        btnBuscar.on('click', function (event) {
            event.preventDefault();
            const searchTerm = $('#inputBusqueda').val().toLowerCase().trim();
            $('#inputBusqueda').val(' ');

            const formatoCorrecto = /^[a-zA-Z0-9\-]+$/.test(searchTerm);


            if (searchTerm === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Campo Vacío',
                    text: 'Por favor, ingresa un nombre o número de Pokémon antes de buscar.'
                });
                return;
            } else if (!formatoCorrecto) {
                Swal.fire({
                    icon: 'error',
                    title: 'Formato Incorrecto',
                    text: 'Por favor, ingresa un nombre o número de Pokémon válido.'
                });
                return;
            }

            const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

            buscarYMostrarPokemon(url);
        });

        function buscarYMostrarPokemon(url) {
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (detallePokemon) {
                    console.log('Detalles del Pokémon obtenido exitosamente');

                    mostrarPokemon(detallePokemon);
                },
                error: function (error) {
                    if (error.status === 404) {
                        console.error('Pokémon no encontrado en la API. Comprueba nombre o ID introducidos.');
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Pokémon no encontrado en la API. Comprueba nombre o ID introducidos.'
                        });
                    } else if (error.status === 500) {
                        console.error('Error interno en el servidor. Inténtalo de nuevo más tarde.');
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error interno en el servidor. Inténtalo de nuevo más tarde.'
                        });
                    } else {
                        console.error('Error desconocido:', error.responseText);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error desconocido',
                            text: 'Error desconocido: ' + error.responseText
                        });
                    }
                }
            });
        }

        function mostrarPokemon(detallePokemon) {
            resultadosContainer.empty();

            const pokemonElement = $('<div>').addClass('pokemon');

            const imagenContainer = $('<div>').addClass('pokemon-imagen');
            const imagen = $('<img>').attr('src', detallePokemon.sprites.front_default).attr('alt', detallePokemon.name);
            imagenContainer.append(imagen);

            const infoContainer = $('<div>').addClass('pokemon-info');
            const nombreContainer = $('<div>').addClass('nombre-contenedor');
            const idParagraph = $('<p>').addClass('pokemon-id').text('ID: ' + detallePokemon.id);
            const nombreHeading = $('<h2>').addClass('pokemon-nombre').text(detallePokemon.name);

            nombreContainer.append(idParagraph, nombreHeading);
            infoContainer.append(nombreContainer);

            const tiposContainer = $('<div>').addClass('pokemon-tipos');
            detallePokemon.types.forEach(function (tipo) {
                const tipoParagraph = $('<p>').addClass('tipo ' + tipo.type.name).text(capitalizeFirstLetter(tipo.type.name));
                tiposContainer.append(tipoParagraph);
            });

            pokemonElement.append(imagenContainer, infoContainer, tiposContainer);
            resultadosContainer.append(pokemonElement);
        }

    });

});