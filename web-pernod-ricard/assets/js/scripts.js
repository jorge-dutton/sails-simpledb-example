/* ============================================================
 * Custom js
 * Initialize plugins
 * ============================================================ */
(function($) {

    'use strict';

    // Initialize record table
    var initRecordTable = function(data) {
        var table = $('#recordTable'),
            players = new Array(),
            settings = {};

        if (data) {
            $.each(data, function( key, value ) {
                var player = new Array();
                $.each(value.Attributes, function( key, attr ) {
                    if (attr.Name == 'Jugador') {
                        player[0] = attr.Value;
                    } else if (attr.Name == 'Liga') {
                        player[1] = attr.Value;
                    } else if (attr.Name == 'Categoria') {
                        player[2] = attr.Value;
                    } else if (attr.Name == 'Descripcion') {
                        player[3] = attr.Value;
                    } else if (attr.Name == 'Puntos_Desempeno') {
                        player[4] = attr.Value;
                    } else if (attr.Name == 'Puntos_Compromiso') {
                        player[5] = attr.Value;
                    } else if (attr.Name == 'Dia') {
                        player[6] = attr.Value;
                    } else if (attr.Name == 'Hora') {
                        player[7] = attr.Value;
                    } else if (attr.Name == 'Fecha') {
                        player[8] = attr.Value;
                    } else if (attr.Name == 'Respuesta') {
                        player[9] = attr.Value;
                    } else if (attr.Name == 'Email') {
                        player[10] = attr.Value;
                    } else if (attr.Name == 'Contrasena') {
                        player[11] = attr.Value;
                    }
                });
                if (player.length < 12) {
                  for (var i=player.length; i<12; i++) {
                    player[i] = '';
                  }
                } 
                players.push(player);
            });
        }

        settings = {
            "data": players,
            "dom": '<"table-responsive"<"pr-table-info pull-right"i><"export-options-container pull-right m-b-5"T><"clear-fix"><"center-margin full-width"t>><"center-margin full-width text-center"p>',
            "searching": false,
            "sPaginationType": "bootstrap",
            "destroy": true,
            "scrollCollapse": true,
            "scrollX": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Mostrando <b>_START_</b> a <b>_END_</b> de _TOTAL_ resultados",
                "sEmptyTable": "No hay datos disponibles."
            },
            "aoColumns": [
                {"bSortable": true},
                {"bSortable": true},
                {"bSortable": true},
                {"bSortable": true},
                {"bSortable": true},
                {"bSortable": true},
                {"bSortable": true},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false }
            ],
            "iDisplayLength": $.Pages.isVisibleXs() ? 10 : 20,
            "oTableTools": {
                "sSwfPath": "js/dependencies/plugins/jquery-datatable/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "csv",
                    "sButtonText": "<i title='Exportar CSV' class='pg-grid'></i>"
                }, {
                    "sExtends": "xls",
                    "sButtonText": "<i class='fa fa-file-excel-o'></i>"
                }, {
                    "sExtends": "pdf",
                    "sButtonText": "<i class='fa fa-file-pdf-o'></i>"
                }, {
                    "sExtends": "copy",
                    "sButtonText": "<i class='fa fa-copy'></i>"
                }]
            }
        };
        table.dataTable(settings);
    }

    // Initialize ranking table
    var initRankingTable = function(data) {
        var table = $('#rankingTable'),
            settings = {},
            players = new Array();

        if (data) {
            var index = 0,

            array = $.map(data, function(value, index) {
                return [value];
            });

            array = array.sort(function(a, b) {
                return b.score - a.score
                || moment(a.lastUpdate, "YYYY:MM:DD:HH:mm:ss")._d  - moment(b.lastUpdate, "YYYY:MM:DD:HH:mm:ss")._d;
            });

            $.each(array, function(key, value) {
                var player = new Array();
                index ++;
                player[0] = index;
                player[1] = value.name + ' ' + value.surname;
                player[2] = value.league;
                player[3] = moment(value.lastUpdate, "YYYY:MM:DD:HH:mm:ss").format('DD/MM/YYYY, HH:mm:ss');
                player[4] = value.score;
                players.push(player);
            });
        }

        settings = {
            "data": players,
            "dom": '<"table-responsive"<"pr-table-info pull-right"i><"export-options-container pull-right m-b-5"T><"clear-fix"><"center-margin full-width"t>><"center-margin full-width text-center"p>',
            "searching": true,
            "sPaginationType": "bootstrap",
            "destroy": true,
            "scrollCollapse": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Mostrando <b>_START_</b> a <b>_END_</b> de _TOTAL_ resultados",
                "sEmptyTable": "No hay datos disponibles.",
                "sZeroRecords": "No hay datos disponibles.",
                "sInfoFiltered": "(_MAX_ resultados sin filtros)",
                "sInfoEmpty": "0 resultados"
            },
            "aoColumns": [
                {"bSortable": true},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false}
            ],
            "iDisplayLength": 20,
            "oTableTools": {
                "sSwfPath": "js/dependencies/plugins/jquery-datatable/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "csv",
                    "sButtonText": "<i title='Exportar CSV' class='pg-grid'></i>"
                }, {
                    "sExtends": "xls",
                    "sButtonText": "<i class='fa fa-file-excel-o'></i>"
                }, {
                    "sExtends": "pdf",
                    "sButtonText": "<i class='fa fa-file-pdf-o'></i>"
                }, {
                    "sExtends": "copy",
                    "sButtonText": "<i class='fa fa-copy'></i>"
                }]
            }
        };
        table.dataTable(settings);
        
        $('#league-ranking').on('change', function () {
          var filter = $(this).val();
          table.DataTable().column(2)
            .search(filter ? '^' + filter + '$' : '', true, false)
            .draw();
        });
    }

    var initDatePicker = function() {
        $('#datepicker-component').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy',
            language: 'es',
            todayHighlight: true,
            weekStart: 1
        });
    }

    var submitSearch = function() {
        jQuery.ajax({
            type: 'GET',
            url: '/search/',
            data: $('#search-form').serialize(),
            dataType: "json",
            success: function( data ) {
                initRecordTable(data.players.Items);
            }
        });
    }

    var initData = function() {
        jQuery.ajax({
            type: 'GET',
            url: '/player/',
            dataType: "json",
            success: function(data) {
                initRecordTable(data.players.Items);
            }
        });

        jQuery.ajax({
            type: 'GET',
            url: '/ranking/',
            dataType: "json",
            success: function(data) {
                initRankingTable(data.ranking);
            }
        });


    }


    // Initialize
    initData();
    initRecordTable({});
    initRankingTable({});
    initDatePicker();

    $('#btn-buscar').click(function(e) {
        e.preventDefault();
        submitSearch();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('table').each(function() {
            var oTableTools = TableTools.fnGetInstance(this);

            if (oTableTools && oTableTools.fnResizeRequired()) {
                oTableTools.fnResizeButtons();
            }
        });
    });

})(window.jQuery);