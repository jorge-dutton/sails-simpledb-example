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
                    }

                    player.push(attr.Value);
                });
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
                {"bSortable": false}
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
            },
            fnDrawCallback: function(oSettings) {
                $('.export-options-container').append($('.exportOptions'));

                $('#ToolTables_tableWithExportOptions_0').tooltip({
                    title: 'Export as CSV',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_1').tooltip({
                    title: 'Export as Excel',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_2').tooltip({
                    title: 'Export as PDF',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_3').tooltip({
                    title: 'Copy data',
                    container: 'body'
                });
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

            array = array.sort(function(a,b){return b.score - a.score});

            $.each(array, function(key, value) {
                var player = new Array();
                index ++;

                player[0] = index;
                player[1] = value.name + ' ' + value.surname;
                player[2] = value.league;
                player[3] = value.score;
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
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Mostrando <b>_START_</b> a <b>_END_</b> de _TOTAL_ resultados",
                "sEmptyTable": "No hay datos disponibles."
            },
            "aoColumns": [
                {"bSortable": true},
                {"bSortable": false},
                {"bSortable": false},
                {"bSortable": false}
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
            },
            fnDrawCallback: function(oSettings) {
                $('.export-options-container').append($('.exportOptions'));

                $('#ToolTables_tableWithExportOptions_0').tooltip({
                    title: 'Export as CSV',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_1').tooltip({
                    title: 'Export as Excel',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_2').tooltip({
                    title: 'Export as PDF',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_3').tooltip({
                    title: 'Copy data',
                    container: 'body'
                });
            }
        };
        table.dataTable(settings);
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
        })
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

})(window.jQuery);