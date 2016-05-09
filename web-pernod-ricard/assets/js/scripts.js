/* ============================================================
 * Custom js
 * Initialize plugins
 * ============================================================ */
(function($) {

    'use strict';

$.ajaxSetup({
    success: function(data) {
      if(data.error){
        $('.alert-danger').removeClass('hidden')
      }
    }
});
    // Initialize record table
    var initRecordTable = function(data) {
        var table = $('#recordTable'),
            players = new Array(),
            leagues = [],
            leagueSelect = $('#league'),
            settings = {};

        if (data) {

            $.each(data, function( key, value ) {
                var player = new Array();
                $.each(value.Attributes, function( key, attr ) {
                    if (attr.Name == 'Jugador') {
                        player[0] = attr.Value;
                    } else if (attr.Name == 'Liga') {
                        player[1] = attr.Value;
                        if (leagues.indexOf(attr.Value) === -1 && attr.Value !== "") {
                          leagues.push(attr.Value);
                        }
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
            if (leagueSelect.data('loaded') !== true) {
              for (var i=0, ll = leagues.length; i < ll; i++) {
                leagueSelect.append('<option value="'+leagues[i]+'">'+leagues[i]+'</option>');
              }
              leagueSelect.data('loaded', true);
              $('#league-ranking').html(leagueSelect.html());
            }
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
        if (!data) {
            settings.oLanguage.sEmptyTable = '<img src="/img/ajax-loader.gif" alt="Cargando" /><br> Espere, por favor...';
        }
        table.DataTable(settings);
    }

  /*Filters dtatable on envent change of the select
  Params: @tableElement: you must pass the table element
          @inputId: without '#' character
          @tableColumn: number of the column you are filtering
   */
    var filterTableOnSelectChange= function(tableElement, inputId, tableColumn) {
      $('#'+inputId).on('input', function() {
        var filter = $(this).val();
        tableElement.DataTable().column(tableColumn)
          .search(filter ? '^' + filter + '$' : '', true, false)
          .draw();
      });
    }

  /*Filters dtatable on envent change of the select
  Params: @tableElement: you must pass the table element
          @inputId: without '#' character
          @tableColumn: number of the column you are filtering
   */
    var filterTable= function(tableElement, inputId, tableColumn) {
      $('#'+inputId).on('input', function() {
        var filter = $(this).val();
        tableElement.DataTable().column(tableColumn)
          .search(filter)
          .draw();
      });
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
    table.DataTable(settings);
    filterTableOnSelectChange(table,"league-ranking",2)
    }

  /**Params:
   * @thisElement: elementButton Jquery selected ej: $(this)
   */
    var getRowData = function(tableElement, thisElement) {
      return tableElement.row( thisElement.parents('tr') ).data();
    }

  //Binds click element to edit button class
    var editRowMenu = function (editButtonClass, tableElement, useData) {
      $("."+editButtonClass).on("click", function(event){
        var data = getRowData(tableElement, $(this));
        useData(data);
      });
    }
  //Binds click element to delete button class
    var deleteRow = function (deleteButtonClass, tableElement, useData) {
      $("."+deleteButtonClass).on("click", function(event){
         var data = getRowData(tableElement, $(this));
         useData(data);
      });
    }

  // Initialize users table
    var initUsersTable = function(data) {
      var table = $('#usersTable'),
          users = new Array(),
          settings = {},
          leagues = [],
          leagueSelect= $('#league-userManagement');

          if (data) {

              $.each(data, function( key, value ) {
                  var user = new Array();
                  $.each(value.Attributes, function( key, attr ) {
                      if (attr.Name == 'Nombre') {
                          user[0] = attr.Value;
                      } else if (attr.Name == 'Apellidos') {
                          user[1] = attr.Value;
                      } else if (attr.Name == 'Nombre_Liga') {
                          user[2] = attr.Value;
                          if (leagues.indexOf(attr.Value) === -1 && attr.Value !== "") {
                            leagues.push(attr.Value);
                          }
                      }else if (attr.Name == 'Password') {
                          user[3] = attr.Value;
                      } else if (attr.Name == 'Email_Usuario') {
                          user[4] = attr.Value;
                      } else if (attr.Name == 'Email_Fijo') {
                          user[5] = attr.Value;
                      } else if (attr.Name == 'Email_Jefe') {
                          user[6] = attr.Value;
                          user[7] = value.Name;
                      }
                  });
                  if (user.length < 7) {
                    for (var i=user.length; i<7; i++) {
                      user[i] = '';
                    }
                  }
                  users.push(user);
              });
              if (leagueSelect.data('loaded') !== true) {
                leagues.forEach(function(league) {
                  leagueSelect.append('<option value="'+league+'">'+league+'</option>');
                })
                leagueSelect.data('loaded', true);
              }
          }


      settings = {
          "data": users,
          "dom": '<"table-responsive"<"pr-table-info pull-right"i><"export-options-container pull-right m-b-5"T><"clear-fix"><"center-margin full-width"t>><"center-margin full-width text-center"p>',
          "searching": true,
          "bPaginate": false,
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
              {"bSortable": false},
              {"bSortable": false},
              {
              "className": 'datatable-button--container',
              "orderable": false,
              "data": null,
              "defaultContent": "<button class='btn btn-default datatable-button edit-user--button type='button' name='button' data-toggle='modal' data-target='#editUserModal''><i class='fa fa-pencil-square-o fa-1x'></i></button>"+
              "<br><button class='btn btn-default datatable-button delete-user--button' data-toggle='modal' data-target='#deleteUserModal'><i class='fa fa-trash-o fa-1x'></i></button>"
              }
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
        if (!data) {
            settings.oLanguage.sEmptyTable = '<img src="/img/ajax-loader.gif" alt="Cargando" /><br> Espere, por favor...';
        }
      var tableElement = table.DataTable(settings);
      filterTable(table,"name-userManagement",0)
      filterTable(table,"surname-userManagement",1)
      filterTableOnSelectChange(table,"league-userManagement",2)

      editRowMenu("edit-user--button", tableElement, function(rowData) {
        var suitableLeaguesArray= setSuitableLeaguesSelect("edit-league-userManagement");
        $("#edit-name-userManagement").val(rowData[0])
        $("#edit-surname-userManagement").val(rowData[1])
        $("#edit-password-userManagement").val(rowData[3])
        $("#edit-user_email-userManagement").val(rowData[4])
        $("#edit-official_email-userManagement").val(rowData[5])
        $("#edit-boss_email-userManagement").val(rowData[6])
        $("#edit-item_name-userManagement").val(rowData[7])

        $("#edit-league-userManagement-hidden").val(rowData[2])
        $("#edit-league-userManagement").val(rowData[2])
        $("#edit-league-userManagement").attr('disabled',leagueNameIsInActivesLeaguesArray(suitableLeaguesArray, rowData[2]))
      });

      deleteRow("delete-user--button", tableElement, function (rowData) {
        $("#delete-item_name-userManagement").val(rowData[7])
      })
    }

    $("#edit-league-userManagement").on('change',function(){
        var selectVal=$(this).val()
        $("#edit-league-userManagement-hidden").val(selectVal)
    })


    // Inits leagues table
    var initLeaguesTable = function (data) {
      var table = $('#leaguesTable'),
          leagues = [],
          settings = {},
          leaguesFilter = [],
          leagueSelect= $('#league-leagueManagement');

          if (data) {
            createLeaguesObject(data, leagues);
            getAllLeaguesNameArray(leagues, leaguesFilter);
            appendOptionInTargetSelect(leagueSelect, leaguesFilter);
          }


      settings = {
          "data": leagues,
          "dom": '<"table-responsive"<"pr-table-info pull-right"i><"export-options-container pull-right m-b-5"T><"clear-fix"><"center-margin full-width"t>><"center-margin full-width text-center"p>',
          "searching": true,
          "bPaginate": false,
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
              {
              "className": 'datatable-button--container',
              "orderable": false,
              "data": null,
              "defaultContent": "<button class='btn btn-default datatable-button edit-league--button  type='button' name='button' data-toggle='modal' data-target='#editLeagueModal'><i class='fa fa-pencil-square-o fa-1x'></i></button>"+
              "<br><button class='btn btn-default datatable-button delete-league--button' data-toggle='modal' data-target='#deleteLeagueModal'><i class='fa fa-trash-o fa-1x'></i></button>"
              }
          ],
          "iDisplayLength": 20,
          "oTableTools": {
              "sSwfPath": "js/dependencies/plugins/jquery-datatable/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
              "aButtons": [
              {
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

      var tableElement = table.DataTable(settings);

      filterTableOnSelectChange(table,"league-leagueManagement",0)
      var activesLeagues = getActiveLeagues(leagues);
      disableTableButtonIfLeagueIsActive (tableElement, activesLeagues)
      editRowMenu("edit-league--button", tableElement, function(rowData) {
        $("#edit-league_name-leagueManagement").val(rowData[0])
        $("#edit-init_date-leagueManagement").val(formatStringDate(rowData[1], 'DD/M/YY', 'DD/MM/YYYY'))
        $("#edit-end_date-leagueManagement").val(formatStringDate(rowData[2], 'DD/M/YY', 'DD/MM/YYYY'))
        $("#edit-item_name-leagueManagement").val(rowData[3])
        var oldleague = rowData[0];
        bindEditLeagueButton (oldleague);
      })

      deleteRow("delete-league--button", tableElement, function (rowData) {
        var leagueName = rowData[0];
        $("#delete-item_name-leagueManagement").val(rowData[3])
        bindDeleteLeagueButton(leagueName) ;
      })

    }
    //Returns an array with active leagues from a leagues array
    var getActiveLeagues = function(leagues) {
      var activesLeaguesArray = [];
      for(var i=0; i<leagues.length;i++){
        var league =leagues[i]
        if(leagueIsActive(league)) {
          activesLeaguesArray.push(league)
        }
      }
      return activesLeaguesArray;
    }

    //Return boolean value if  league is active
    var leagueIsActive = function(league) {
      var isAnActiveleague = false,
          currentTimeStamp = new Date(),
          initLeagueMoment = moment(league[1],'DD/M/YY').toDate(),
          endLeagueMoment = moment(league[2],'DD/M/YY').toDate();

        if ((currentTimeStamp.getTime() < endLeagueMoment.getTime()) && (currentTimeStamp.getTime() > initLeagueMoment.getTime())){
          isAnActiveleague = true;
        }
      return isAnActiveleague;
    }

    //Return true if the name of the league is in the array and this league is active
    var leagueNameIsInActivesLeaguesArray = function(leaguesArray,leagueName) {
      var selectedLeague =[],
          isLeagueActive= false;
      if (leagueName == "" || leagueName == undefined) {
        isLeagueActive = false;
      }else {
        leaguesArray.forEach(function(league) {
          if (league[0]===leagueName){
            selectedLeague = league;
          }
        })
      isLeagueActive = leagueIsActive(selectedLeague);
    }
    return isLeagueActive;
  }

  var disableTableButtonIfLeagueIsActive = function (tableElement, activesLeagues) {
    $("#leaguesTable").find("button").each(function() {
      var data = getRowData(tableElement, $(this));
      $(this).attr('disabled', leagueNameIsInActivesLeaguesArray(activesLeagues,data[0]))
    })
  }

    var formatStringDate = function(stringDate, currentFormat, desiredFormat) {
      var date = moment(stringDate,currentFormat).toDate()
      return moment(date).format(desiredFormat)
    }


    var initDatePicker = function() {
      $('.datepicker-component').datepicker({
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

    var createUser = function (executeOnSuccess) {
      jQuery.ajax({
          type: 'POST',
          url: '/createUser/',
          data: $('#create-user-form').serialize(),
          success: function(data) {
            if(data.error){
              $('.alert-danger').removeClass('hidden')
            }else if(executeOnSuccess){
              executeOnSuccess();
            }
          }
      });
    }

    var updateUser = function (serializedform, executeOnSuccess) {
     jQuery.ajax({
        type: 'POST',
        url: '/updateUser/',
        data: serializedform,
        success : function(data) {
            if(data.error){
              $('.alert-danger').removeClass('hidden')
            }else if(executeOnSuccess){
              executeOnSuccess();
            }
        }
     });
    }

    var deleteUser = function(executeOnSuccess) {
     jQuery.ajax({
        type: 'POST',
        url: '/deleteUser/',
        data: $('#delete-user-form').serialize(),
        success : function() {
            if(data.error){
              $('.alert-danger').removeClass('hidden')
            }else if(executeOnSuccess){
              executeOnSuccess();
            }
        }
      });
    }

    var createLeague = function (executeOnSuccess) {
      jQuery.ajax({
          type: 'POST',
          url: '/createLeague/',
          data: $('#create-league-form').serialize(),
          success: function(data) {
            if(data.error){
              $('.alert-danger').removeClass('hidden')
            }else if(executeOnSuccess){
              executeOnSuccess();
            }
          }
      });
    }

    var updateLeague = function (executeOnSuccess) {
         jQuery.ajax({
            type: 'POST',
            url: '/updateLeague/',
            data: $('#edit-league-form').serialize(),
            success: function(data){
              if(data.error){
                $('.alert-danger').removeClass('hidden')
              }else if(executeOnSuccess){
                executeOnSuccess();
              }
            }
        });
    }

    var deleteLeague = function(executeOnSuccess) {
       jQuery.ajax({
        type: 'POST',
        url: '/deleteLeague/',
        data: $('#delete-league-form').serialize()
      });
    }




    var initData = function() {
        var allLeagues =  getLeagues;
        allLeagues.success(function(data) {
            initLeaguesTable(data.leagues.Items);
        });

        var initUsers = getUsers;
        initUsers.success(function(data) {
            initUsersTable(data.users.Items);
        })

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


  /**Params:
   * @data: DB response from leagues domain query
   * @leagues: should be an empty Array to fill
   */
    var createLeaguesObject = function(data, leagues) {
      $.each(data, function(key, value) {
        var league = new Array();
        $.each(value.Attributes, function(key, attr) {
          if (attr.Name == 'Nombre_Liga') {
            league[0] = attr.Value;
          } else if (attr.Name == 'Fecha_Inicio') {
            league[1] = attr.Value;
          } else if (attr.Name == 'Fecha_Fin') {
            league[2] = attr.Value;
            league[3] = value.Name;
          }
        });
        if (league.length < 4) {
          for (var i=league.length; i<4; i++) {
            league[i] = '';
          }
        }
        leagues.push(league);
      });
    }

    /**Params:
     * @leagues: full array of leagues
     * @leaguesFilter: should be an empty Array to fill
     */
    var getAllLeaguesNameArray = function(leagues, leaguesFilter) {
      if (leagues){
        leagues.forEach(function(league){
          if (leaguesFilter.indexOf(league[0]) === -1 && league[0] !== "") {
            leaguesFilter.push(league[0]);
          }
        });
        return leaguesFilter;
      }else {
        console.log("leagues has no object inside!");
      }
    }

    //Ajax call returning a json with the suitable leagues
    var getSuitableLeagues = function() {
      var suitableLeagues = new Array;
      var getAllLeagues = getLeagues;
      getAllLeagues.success(function (data) {
        var leagues = new Array,
            currentTimeStamp = new Date();
        createLeaguesObject (data.leagues.Items, leagues)

        leagues.forEach(function(league) {
          var leagueEndDate = moment(league[2],'DD/M/YY').toDate();
          if (currentTimeStamp.getTime() < new Date(leagueEndDate).getTime()){
            suitableLeagues.push(league)
          }
        })
      });
      return suitableLeagues;
    }

    //Creates the suitable leagues select
    var setSuitableLeaguesSelect = function (selectId) {
      var arraySuitableLeagueNames= [];
      var suitableLeagues = getSuitableLeagues();
      var leaguesSelect = $('#'+selectId);
      suitableLeagues.forEach(function(league){
        arraySuitableLeagueNames.push(league[0]);
      })
      appendOptionInTargetSelect (leaguesSelect, arraySuitableLeagueNames);
      return suitableLeagues;
    }

    /**Params:
     * @selectElement: the select ELEMENT (not Id) where options are going to be appended
     * @leaguesFilter: full array of league names
     */
    var appendOptionInTargetSelect = function (selectElement, leaguesFilter){
      if (leaguesFilter.length>0) {
        if (selectElement.data('loaded') !== true) {
          leaguesFilter.forEach(function(leagueOpt) {
            selectElement.append('<option value="'+leagueOpt+'">'+leagueOpt+'</option>');
          })
          selectElement.data('loaded', true);
        }
      }
    }



  //Call a select * leagues API method
    var getLeagues = jQuery.ajax({
              type: 'GET',
              url: '/league/',
              dataType: "json"
        });

  //Call a select * users API method
    var getUsers = jQuery.ajax({
        type: 'GET',
        url: '/user/',
        dataType: "json"
    });

    var getUsersFilteredByLeague =  function(oldleague, newLeague, executeOnSuccess) {
      if(oldleague!==newLeague){
         jQuery.ajax({
          type: 'GET',
          url: '/usersByLeague/',
          data:'league='+oldleague,
          dataType: "json"
        }).success(function(data){
         changeUserLeague(newLeague,data.users.Items, executeOnSuccess);
        });
      }
    };

    //Edit button from the modal
    var bindEditLeagueButton = function (oldleague){
      $('#btn-edit-league').click(function (e) {
        e.preventDefault();
        var newleague = $('#edit-league_name-leagueManagement').val()
        var initDate=$('#edit-init_date-leagueManagement').val()
        $('#edit-init_date-leagueManagement').val(formatStringDate(initDate, 'DD/MM/YYYY', 'DD/M/YY'))
        var endDate=$('#edit-end_date-leagueManagement').val()
        $('#edit-end_date-leagueManagement').val(formatStringDate(endDate, 'DD/MM/YYYY', 'DD/M/YY'))
        var form = $('#edit-league-form')
        form.parsley().validate();
        if (form.parsley().isValid()){
          updateLeague(function () {
            if(oldleague!==newleague) {
              getUsersFilteredByLeague(oldleague,newleague, function() {
                location.reload()
              })
            }else{
              location.reload()
            }
          });
         }
      });
    }

    //Delete button from the modal
    var bindDeleteLeagueButton = function(league){
      $('#btn-delete-league').click(function (e) {
        getUsersFilteredByLeague(league,"", function() {
          $.when(deleteLeague()).then(function() {
            location.reload()
          })
        })
      })
    }

    var changeUserLeague = function(newLeague, data , executeAtEnd) {
      if (data){
        $.each(data, function( key, value ) {
          var params="";
          $.each(value.Attributes, function( key, attr ) {
            if (attr.Name == 'Nombre') {
                params = params + "name="+attr.Value+"&";
            } else if (attr.Name == 'Apellidos') {
                params = params + "surname="+attr.Value+"&";
            } else if (attr.Name == 'Nombre_Liga') {
                params = params + "league="+newLeague+"&";
            }else if (attr.Name == 'Password') {
                params = params + "password="+attr.Value+"&";
            } else if (attr.Name == 'Email_Usuario') {
                params = params + "user_email="+attr.Value+"&";
            } else if (attr.Name == 'Email_Fijo') {
                params = params + "official_email="+attr.Value+"&";
            } else if (attr.Name == 'Email_Jefe') {
                params = params + "boss_email="+attr.Value+"&";
                params = params + "item_name="+value.Name;
            }
          });
          updateUser(params);
        });
        if (executeAtEnd){
          executeAtEnd();
        }

      }
    }

    // Initialization and event bindings
    initData();
    initUsersTable();
    initRecordTable();
    initDatePicker();



    $('#btn-buscar').click(function(e) {
        e.preventDefault();
        submitSearch();
    });



    $('#btn-create-user').click(function(e) {
      e.preventDefault();
      var form =$('#create-user-form');
      form.parsley().validate();
      if(form.parsley().isValid()){
        createUser(function () {
          location.reload()
        });
      }

    })

    $('#btn-edit-user').click(function (e) {
      e.preventDefault();
      var form = $('#edit-user-form');
      form.parsley().validate();
      if(form.parsley().isValid()){
       updateUser($('#edit-user-form').serialize(), function () {
          location.reload();
        });
     }
    })

    $('#btn-delete-user').click(function (e) {
      e.preventDefault();
      $.when(deleteUser()).then(function () {
        location.reload();
      });
    })

    $('#btn-create-league').click(function(e) {
      e.preventDefault();
      var initDate=$('#create-init_date-leagueManagement').val()
      $('#create-init_date-leagueManagement').val(formatStringDate(initDate, 'DD/MM/YYYY', 'DD/M/YY'))
      var endDate=$('#create-end_date-leagueManagement').val()
      $('#create-end_date-leagueManagement').val(formatStringDate(endDate, 'DD/MM/YYYY', 'DD/M/YY'))
      var form = $('#create-league-form')
      form.parsley().validate();
      if(form.parsley().isValid()){
         createLeague(function () {
          location.reload();
        });
      }

    })

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      $('table').each(function() {
        var oTableTools = TableTools.fnGetInstance(this);
        if (oTableTools && oTableTools.fnResizeRequired()) {
            oTableTools.fnResizeButtons();
        }
      });
    });

//Fills select of leagues on he user creation modal
    $('.create-user--button').click(function (e) {
      e.preventDefault();
      setSuitableLeaguesSelect("create-league-userManagement");
    });

    $(".alert-warning button.close-alert-warning").click(function (e) {
        $(this).parent().slideUp();
    });


//Function to add massive amount of users
/*$('#btn-chargeUsers').click(function(e) {
    e.preventDefault();
    chargeUsers();
});
var chargeUsers = function() {
  var userString = '[{"email_usuario":"paco.recuero@pernod-ricard.com","password":"10772","nombre":"Paco","apellidos":"Recuero Licencin","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"aitor.ruedaocejo@pernod-ricard.com","password":"10565","nombre":"Rueda","apellidos":"Aitor","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"pedro.casablancagutierrez@pernod-ricard.com","password":"15470","nombre":"Pedro","apellidos":"Casablanca Gutierrez","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"antonio.lillotorres@pernod-ricard.com","password":"21162","nombre":"Antonio","apellidos":"Lillo Torres","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"eric.laborde@pernod-ricard.com","password":"23162","nombre":"Eric","apellidos":"Laborde","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"bertrand.estevez@pernod-ricard.com","password":"281072","nombre":"Bertrand","apellidos":"Estevez","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"jean-francois.collobert@pernod-ricard.com","password":"1234","nombre":"Jean François","apellidos":"Collobert","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"christian.barre@pernod-ricard.com","password":"26463","nombre":"Christian","apellidos":"Barré","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"miriam.eceolaza@pernod-ricard.com","password":"18374","nombre":"Miriam","apellidos":"Eceolaza Zabalza","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"gabriel.egana@pernod-ricard.com","password":"6767","nombre":"Gabriel","apellidos":"Egaña Dorronsoro","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"philippe.ortega@pernod-ricard.com","password":"25764","nombre":"Philippe","apellidos":"Ortega Alloggia","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"francisco.soler@pernod-ricard.com","password":"24457","nombre":"Francisco","apellidos":"Soler Lorente","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"thomas.daboville@pernod-ricard.com","password":"18780","nombre":"Thomas","apellidos":"Daboville","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"fernando.pozo@pernod-ricard.com","password":"31553","nombre":"Fernando","apellidos":"Pozo","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ainhoa.gorostidi@pernod-ricard.com","password":"211168","nombre":"Ainhoa","apellidos":"Gorostidi Barandiarán","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"elena.adell@pernod-ricard.com","password":"251158","nombre":"Elena","apellidos":"Adell San Pedro","email_fijo":"Marta.Asensio@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo@gameonlab.com","password":"1234","nombre":"Ricardo","apellidos":"Pernod","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"lide.aguirrezabalagaunamuno@pernod-ricard.com","password":"19041989","nombre":"Lide","apellidos":"Aguirrezabalaga","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"marta.asensio@pernod-ricard.com","password":"1234","nombre":"Marta","apellidos":"Asensio","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"constanza.bertorello@pernod-ricard.com","password":"ricardoenamerica","nombre":"Constanza","apellidos":"Bertorello","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"liliana.leon@pernod-ricard.com","password":"ricardoenamerica","nombre":"Liliana","apellidos":"León","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juan.cabrera@pernod-ricard.com","password":"ricardoenamerica","nombre":"Juan Felipe ","apellidos":"Cabrera","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"cedric.ramat@pernod-ricard.com","password":"ricardoenamerica","nombre":"Cedric Ramat","apellidos":"Ramat","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo01@gameonlab.com","password":"1234","nombre":"Jugador","apellidos":"Uno","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo02@gameonlab.com","password":"1234","nombre":"Jugador","apellidos":"Dos","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo03@gameonlab.com","password":"1234","nombre":"Jugador","apellidos":"Tres","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo04@gameonlab.com","password":"1234","nombre":"Jugador","apellidos":"Cuatro","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo05@gameonlab.com","password":"1234","nombre":"Jugador","apellidos":"Cinco","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo06@gameonlab.com","password":"1234","nombre":"Jugador","apellidos":"Seis","email_fijo":"support@gameonlab.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juanpedro.villarpuerto@pernod-ricard.com","password":"10223","nombre":"JUAN PEDRO","apellidos":"VILLAR PUERTO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"adolfo.sola-sertdealbert@pernod-ricard.com","password":"8479","nombre":"ADOLFO","apellidos":"SOLA-SERT DE ALBERT","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"antonio.eiroprieto@pernod-ricard.com","password":"9976","nombre":"ANTONIO","apellidos":"EIRO PRIETO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"joseantonio.vazquezlopez@pernod-ricard.com","password":"9532","nombre":"JOSE ANTONIO","apellidos":"VAZQUEZ LOPEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"jesus.mingoalonso@pernod-ricard.com","password":"5688","nombre":"JESUS","apellidos":"MINGO ALONSO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"miguelangel.jimenezandreu@pernod-ricard.com","password":"10355","nombre":"MIGUEL ANGEL","apellidos":"JIMENEZ ANDREU","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"rafael.garciapuig@pernod-ricard.com","password":"20184","nombre":"RAFAEL","apellidos":"GARCIA PUIG","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juan.dominguezramirez@pernod-ricard.com","password":"20142","nombre":"JUAN","apellidos":"DOMINGUEZ RAMIREZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"carmen.delriocantero@pernod-ricard.com","password":"10032","nombre":"MARIA DEL CARMEN","apellidos":"DEL RIO CANTERO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Raffaele.Cusenza@pernod-ricard.com","password":"10530","nombre":"RAFFAELE","apellidos":"CUSENZA ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"olegario.sanchezbriones@pernod-ricard.com","password":"8118","nombre":"OLEGARIO","apellidos":"SANCHEZ BRIONES","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"alvaro.estradablan@pernod-ricard.com","password":"10519","nombre":"ALVARO","apellidos":"ESTRADA BLAN","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"borja.carroquinolarraz@pernod-ricard.com","password":"10553","nombre":"FRANCISCO BORJA","apellidos":"CARROQUINO LARRAZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"fernando.alvarezalvaro@pernod-ricard.com","password":"10331","nombre":"FERNANDO","apellidos":"ALVAREZ ALVARO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"jorge.mantillamorato@pernod-ricard.com","password":"9939","nombre":"JORGE","apellidos":"MANTILLA MORATO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juan.saezcomet@pernod-ricard.com","password":"10316","nombre":"JUAN","apellidos":"SAEZ COMET","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Marie.Benech@pernod-ricard.com","password":"10539","nombre":"MARIE DELPHINE","apellidos":"BENECH ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"miguel.gutierrezmarcos@pernod-ricard.com","password":"10450","nombre":"MIGUEL","apellidos":"GUTIERREZ MARCOS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"barbara.fernandez-ochoavargas@pernod-ricard.com","password":"10557","nombre":"BARBARA","apellidos":"FERNANDEZ VARGAS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"gorka.madridcoello@pernod-ricard.com","password":"10008","nombre":"GORKA","apellidos":"MADRID COELLO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"carlos.reijaparadela@pernod-ricard.com","password":"20022","nombre":"JOSE CARLOS","apellidos":"REIJA PARADELA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"maria.leismayan@pernod-ricard.com","password":"10346","nombre":"MARIA","apellidos":"LEIS MAYAN","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ana.gonzalezpayo@pernod-ricard.com","password":"10015","nombre":"ANA","apellidos":"GONZALEZ PAYO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"pedro.lopezcontreras@pernod-ricard.com","password":"10445","nombre":"PEDRO","apellidos":"LOPEZ CONTRERAS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"melanie.delavegaalfaro@pernod-ricard.com","password":"9954","nombre":"MELANIE","apellidos":"DE LA VEGA ALFARO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"antonio.crousbellido@pernod-ricard.com","password":"10576","nombre":"ANTONIO","apellidos":"CROUS BELLIDO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"maria.pradosalvarez@pernod-ricard.com","password":"10246","nombre":"MARIA","apellidos":"PRADOS ALVAREZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"augustin.robinne@pernod-ricard.com","password":"10466","nombre":"AUGUSTIN ANTOINE","apellidos":"ROBINNE ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"miguelangel.pascualnombela@pernod-ricard.com","password":"10513","nombre":"MIGUEL ANGEL","apellidos":"PASCUAL NOMBELA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"marisa.carrionlorenzo@pernod-ricard.com","password":"10505","nombre":"MARIA LUISA","apellidos":"CARRION DE LORENZO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"andres.salazarcuevas@pernod-ricard.com","password":"20093","nombre":"ANDRES ENRIQUE","apellidos":"SALAZAR CUEVAS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"eduardo.alvarezgarcia@pernod-ricard.com","password":"20154","nombre":"EDUARDO","apellidos":"ALVAREZ GARCIA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"rafael.sanchezpodadera@pernod-ricard.com","password":"20106","nombre":"RAFAEL","apellidos":"SANCHEZ PODADERA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"josemanuel.montillasanchez@pernod-ricard.com","password":"20197","nombre":"JOSE MANUEL","apellidos":"MONTILLA SANCHEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"enrique.carballasdorrego@pernod-ricard.com","password":"20172","nombre":"JOSE ENRIQUE","apellidos":"CARBALLAS DORREGO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"manuel.camarenarosa@pernod-ricard.com","password":"1565","nombre":"MANUEL","apellidos":"CAMARENA ROSA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"victor.rodriguez-marquesbasanta@pernod-ricard.com","password":"9985","nombre":"VICTOR","apellidos":"RODRIGUEZ-MARQUES BASANTA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"joseignacio.osbornevergara@pernod-ricard.com","password":"20156","nombre":"JOSE IGNACIO","apellidos":"OSBORNE VERGARA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"andrew.christensen@pernod-ricard.com","password":"1830","nombre":"ANDREW ERIC","apellidos":"CHRISTENSEN ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juanrafael.fernandezbevia@pernod-ricard.com","password":"20059","nombre":"JUAN RAFAEL","apellidos":"FERNANDEZ BEVIA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"joseluis.puertaslejeune@pernod-ricard.com","password":"10495","nombre":"JOSE LUIS","apellidos":"PUERTAS LEJEUNE","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"jorge.jimenezmaroto@pernod-ricard.com","password":"9996","nombre":"JORGE","apellidos":"JIMENEZ MAROTO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"fernandojesus.perezlara@pernod-ricard.com","password":"20196","nombre":"FERNANDO JESUS","apellidos":"PEREZ LARA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"JoseMiguel.RegalonExposito@pernod-ricard.com","password":"10420","nombre":"JOSE MIGUEL","apellidos":"REGALON EXPOSITO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"josemiguel.munozaguilar@pernod-ricard.com","password":"10168","nombre":"JOSE MIGUEL","apellidos":"MUÑOZ AGUILAR","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"joseluis.noratcacabelos@pernod-ricard.com","password":"10281","nombre":"JOSE LUIS","apellidos":"NORAT CACABELOS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"raul.ruzescobar@pernod-ricard.com","password":"10348","nombre":"RAUL","apellidos":"RUZ ESCOBAR","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"mateo.seguivanrell@pernod-ricard.com","password":"9944","nombre":"MATEO","apellidos":"SEGUI VANRELL","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricard.romerovinaches@pernod-ricard.com","password":"10520","nombre":"RICARD","apellidos":"ROMERO VINACHES","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juan.blau@pernod-ricard.com","password":"10573","nombre":"JUAN","apellidos":"BLAU ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"jose.subiasrando@pernod-ricard.com","password":"8576","nombre":"JOSE","apellidos":"SUBIAS RANDO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"daniel.calinradu@pernod-ricard.com","password":"10320","nombre":"BOGDAN RADU","apellidos":"CALIN RADU","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Gema.PerezPorras@pernod-ricard.com","password":"10426","nombre":"GEMA","apellidos":"PEREZ PORRAS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"antonio.blancocortezon@pernod-ricard.com","password":"20033","nombre":"ANTONIO","apellidos":"BLANCO CORTEZON","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"oscar.criadocarrera@pernod-ricard.com","password":"10216","nombre":"OSCAR FRANCISCO","apellidos":"CRIADO CARRERA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"fernando.delvisoperez@pernod-ricard.com","password":"20187","nombre":"FERNANDO","apellidos":"DEL VISO PEREZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"jose.garciagonzalez@pernod-ricard.com","password":"3784","nombre":"JOSE","apellidos":"GARCIA GONZALEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"alejandro.rivasdelaserna@pernod-ricard.com","password":"10043","nombre":"ALEJANDRO","apellidos":"RIVAS DE LA SERNA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"xavier.lopeteguiayerbe@pernod-ricard.com","password":"9972","nombre":"XABIER","apellidos":"LOPETEGUI AYERBE","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"endika.larranagamoyano@pernod-ricard.com","password":"10102","nombre":"ENDIKA","apellidos":"LARRAÑAGA MOYANO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"luismiguel.maiquesrascon@pernod-ricard.com","password":"10342","nombre":"LUIS MIGUEL","apellidos":"MAIQUES RASCON","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"eduardo.redecillailarraz@pernod-ricard.com","password":"10221","nombre":"EDUARDO","apellidos":"REDECILLA ILARRAZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"josemanuel.verdiarodriguez@pernod-ricard.com","password":"20161","nombre":"JOSE MANUEL","apellidos":"VERDIA RODRIGUEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"xavier.navarrogarcia@pernod-ricard.com","password":"10193","nombre":"XAVIER","apellidos":"NAVARRO GARCIA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Joan.garridoreig@pernod-ricard.com","password":"400006","nombre":"JOAN","apellidos":"GARRIDO ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"vicens.campostomas@pernod-ricard.com","password":"400001","nombre":"VICENÇ","apellidos":"CAMPOS ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Josep.BlanchEsmerats@pernod-ricard.com","password":"400011","nombre":"JOSEP","apellidos":"BLANCH","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Laura.MuinosMartin@pernod-ricard.com","password":"10359","nombre":"LAURA","apellidos":"MUIÑOS MARTIN","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"isabel.apalateguimuga@pernod-ricard.com","password":"10240","nombre":"ISABEL","apellidos":"APALATEGUI MUGA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Ignacio.ParraGomez-Acebo@pernod-ricard.com","password":"10578","nombre":"IGNACIO","apellidos":"PARRA GOMEZ-ACEBO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"eduardo.morillasmartinez@pernod-ricard.com","password":"20247","nombre":" EDUARDO","apellidos":"MORILLAS MARTINEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Francisco.alonsomiguel@pernod-ricard.com","password":"10177","nombre":"FRANCISCO JAVIER","apellidos":"ALONSO MIGUEL","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo.zafraperez@pernod-ricard.com","password":"10571","nombre":"RICARDO","apellidos":"ZAFRA PEREZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ximena.bocarandaparedes@pernod-ricard.com","password":"10373","nombre":"XIMENA","apellidos":"BOCARANDA PAREDES","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"pedro.gomezchicote@pernod-ricard.com","password":"10227","nombre":"PEDRO JULIAN","apellidos":"GOMEZ CHICOTE","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"vicente.caffarenalopezhermida@pernod-ricard.com","password":"20114","nombre":"VICENTE","apellidos":"CAFFARENA LOPEZ-HERMIDA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"alberto.matagutierrezdelasolana@pernod-ricard.com","password":"10118","nombre":"ALBERTO","apellidos":"MATA GUTIERREZ DE LA SOLA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"jose.pardomoreno-manzanaro@pernod-ricard.com","password":"10524","nombre":"JOSE","apellidos":"PARDO MORENO-MANZANARO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"pedro.pugalopez@pernod-ricard.com","password":"10411","nombre":"PEDRO","apellidos":"PUGA LOPEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"JoseAntonio.BuzonQuijada@pernod-ricard.com","password":"10435","nombre":"JOSE ANTONIO","apellidos":"BUZON QUIJADA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"javier.demiguelariz-navarreta@pernod-ricard.com","password":"10297","nombre":"JAVIER","apellidos":"MIGUEL ARIZ NAVARRETA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juanluis.casadomartinez@pernod-ricard.com","password":"1626","nombre":"JUAN LUIS","apellidos":"CASADO MARTINEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Almudena.Blancogarcia@pernod-ricard.com","password":"10105","nombre":"ALMUDENA","apellidos":"BLANCO GARCIA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"gabriel.ramonsebastian@pernod-ricard.com","password":"10288","nombre":"GABRIEL","apellidos":"RAMON SEBASTIAN","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"pedroluis.garciamartin@pernod-ricard.com","password":"10386","nombre":"PEDRO LUIS","apellidos":"GARCIA MARTIN","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"pablo.martinezmengod@pernod-ricard.com","password":"10552","nombre":"PABLO","apellidos":"MARTINEZ MENGOD","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"mariajesus.benitosanchez@pernod-ricard.com","password":"10083","nombre":"MARIA JESUS","apellidos":"BENITO SANCHEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"fermin.roblesrodriguez@pernod-ricard.com","password":"10338","nombre":"FERMIN","apellidos":"ROBLES RODRIGUEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"guadalupe.gonzalezargeles@pernod-ricard.com","password":"10301","nombre":"GUADALUPE","apellidos":"GONZALEZ ARGELES","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"luisalberto.moreralianez@pernod-ricard.com","password":"10285","nombre":"LUIS ALBERTO","apellidos":"MORERA LIANEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"HoracioEduardo.Campano@pernod-ricard.com","password":"10325","nombre":"HORACIO EDUARDO","apellidos":"CAMPANO ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"angela.richclemente@pernod-ricard.com","password":"10394","nombre":"ANGELA","apellidos":"RICH CLEMENTE","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"raquel.alonsomovilla@pernod-ricard.com","password":"10344","nombre":"RAQUEL","apellidos":"ALONSO MOVILLA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"maria.soutodominguez@pernod-ricard.com","password":"10233","nombre":"MARIA AMALIA","apellidos":"SOUTO DOMINGUEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"virginie.desaintpierre@pernod-ricard.com","password":"10296","nombre":"VIRGINIE","apellidos":"DE SAINT PIERRE ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"patricia.garcia-martinblanco@pernod-ricard.com","password":"10403","nombre":"PATRICIA","apellidos":"GARCIA-MARTIN BLANCO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"teresa.maranonczernin-kinsky@pernod-ricard.com","password":"10370","nombre":"MARIA TERESA","apellidos":"MARAÑON CZERNIN-KINSKY","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"sofia.ingunzaaguirre@pernod-ricard.com","password":"10098","nombre":"SOFIA","apellidos":"INGUNZA AGUIRRE","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"belen.aguirrerueda@pernod-ricard.com","password":"10321","nombre":"BELEN","apellidos":"AGUIRRE RUEDA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"carlos.lauretalonso@pernod-ricard.com","password":"20044","nombre":"CARLOS","apellidos":"LAURET ALONSO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"juanandres.parejaavila@pernod-ricard.com","password":"20153","nombre":"JUAN ANDRES","apellidos":"PAREJA AVILA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ignacio.vallsgross@pernod-ricard.com","password":"20070","nombre":"IGNACIO","apellidos":"VALLS GROSS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"miguelfrancisco.ruizfandila@pernod-ricard.com","password":"20216","nombre":"MIGUEL FRANCISCO","apellidos":"RUIZ FANDILA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"francisco.alcaldeguiles@pernod-ricard.com","password":"20122","nombre":"FRANCISCO","apellidos":"ALCALDE GUILES","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"mariadelcarmen.bareahermida@pernod-ricard.com","password":"20212","nombre":"MARIA CARMEN","apellidos":"BAREA HERMIDA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"joseramon.fernandezserrano@pernod-ricard.com","password":"10189","nombre":"JOSE RAMON","apellidos":"FERNANDEZ SERRANO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"javier.fernandezavisbal@pernod-ricard.com","password":"10279","nombre":"FRANCISCO JAVIER","apellidos":"FERNANDEZ AVISBAL","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"joseramon.guerrarana@pernod-ricard.com","password":"9950","nombre":"JOSE RAMON","apellidos":"GUERRA RAÑA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"felix.garciabarrios@pernod-ricard.com","password":"20200","nombre":"FELIX","apellidos":"GARCIA BARRIOS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Fernando.NoblejasMartin@pernod-ricard.com","password":"20036","nombre":"FERNANDO","apellidos":"NOBLEJAS MARTIN","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"eutiquio.gutierrezavalos@pernod-ricard.com","password":"20035","nombre":"EUTIQUIO","apellidos":"GUTIERREZ AVALOS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"beatriz.fernandezconde@pernod-ricard.com","password":"10558","nombre":"BEATRIZ","apellidos":"FERNANDEZ CONDE","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"inmaculada.diezdiez@pernod-ricard.com","password":"20050","nombre":"INMACULADA","apellidos":"DIEZ DIEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"gemamaria.castellanoscuevas@pernod-ricard.com","password":"20302","nombre":"GEMA MARIA","apellidos":"CASTELLANOS CUEVAS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"josefernando.gilortega@pernod-ricard.com","password":"20032","nombre":"JOSE FERNANDO","apellidos":"GIL-ORTEGA UBEDA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"angel.cordobabravo@pernod-ricard.com","password":"10031","nombre":"ANGEL","apellidos":"CORDOBA BRAVO","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"luiscarlos.villalbabermudez@pernod-ricard.com","password":"10158","nombre":"LUIS CARLOS","apellidos":"VILLALBA BERMUDEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"marta.villanuevagonzalez@pernod-ricard.com","password":"10121","nombre":"MARTA MARIA","apellidos":"VILLANUEVA GONZALEZ","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"hectorjose.gonzalezfolgueira@pernod-ricard.com","password":"10387","nombre":"HECTOR JOSE","apellidos":"GONZALEZ FOLGUEIRA","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"mariano.ayalaarnaldo@pernod-ricard.com","password":"10140","nombre":"MARIANO","apellidos":"AYALA ARNALDOS","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"Jacob.WahnonBunan@pernod-ricard.com","password":"10431","nombre":"JACOB","apellidos":"WAHNON BUNAN","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"eduardo.mendes@pernod-ricard.com","password":"taleo","nombre":"EDUARDO","apellidos":"MENDES","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ramon.aguirresarobe@pernod-ricard.com","password":"220772","nombre":"Ramón","apellidos":"Aguirresarobe Solano","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"joseignacio.fernandez@pernod-ricard.com","password":"170274","nombre":"José Ignacio","apellidos":"Fernández Rodríguez","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"javier.abrisqueta@pernod-ricard.com","password":"50174","nombre":"Javier ","apellidos":"Abrisqueta Sabas","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"JaimeRiojaZuazu@pernod-ricard.com","password":"280882","nombre":"Jaime","apellidos":"Rioja Zuazu","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"vanessa.veracue@pernod-ricard.com","password":"40980","nombre":"Vanessa ","apellidos":"Vera Cue","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"jorge.navarro@pernod-ricard.com","password":"271176","nombre":"Jorge","apellidos":"Navarro Dols","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"etienne.godin@pernod-ricard.com","password":"280479","nombre":"Etienne","apellidos":"Godin","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"javier.alcibar@pernod-ricard.com","password":"220971","nombre":"Javier ","apellidos":"Alcibar Gallego","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"iñigo.erauso@pernod-ricard.com","password":"141172","nombre":"Iñigo","apellidos":"Erauso Velasco","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"iñaki.sesma@pernod-ricard.com","password":"101275","nombre":"Iñaki","apellidos":"Sesma Arnaiz","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"raquel.valentin@pernod-ricard.com","password":"10372","nombre":"Raquel","apellidos":"Valentín-Fernández","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"ruben.garcia@pernod-ricard.com","password":"200658","nombre":"Rubén","apellidos":"García Esteban","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"diego.seron@pernod-ricard.com","password":"270875","nombre":"Diego","apellidos":"Serón Resa","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"victor.pascualzarate@pernod-ricard.com","password":"180677","nombre":"Víctor","apellidos":"Pascual Zarate","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"mario.ezquerro@pernod-ricard.com","password":"80468","nombre":"Mario ","apellidos":"Ezquerro Palacios","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"mikel.dominguez@pernod-ricard.com","password":"111079","nombre":"Mikel","apellidos":"Domínguez Vizcaíno","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"jose.jimenez@pernod-ricard.com","password":"310574","nombre":"José","apellidos":"Jimenez Peris","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"ainhoa.pena@pernod-ricard.com","password":"100574","nombre":"Ainhoa","apellidos":"Peña Jauregi","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"mar.martinez@pernod-ricard.com","password":"211270","nombre":"Mar","apellidos":"Martínez Macián","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"roberto.vicente@pernod-ricard.com","password":"160382","nombre":"Roberto","apellidos":"Vicente Miguel","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"raul.arias@pernod-ricard.com","password":"240380","nombre":"Raúl","apellidos":"Arias Casares","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"ruth.chocarro@pernod-ricard.com","password":"170476","nombre":"Ruth","apellidos":"Chocarro Melgosa","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"marta.gomezlusa@pernod-ricard.com","password":"101167","nombre":"Marta","apellidos":"Gómez Lusa","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"virginia.almagro@pernod-ricard.com","password":"121267","nombre":"Virginia","apellidos":"Almagro Mugica","email_fijo":"marta.asensio@pernod-ricard.com","email_jefe":"","nombre_liga":"Winemakers"},{"email_usuario":"pablo.sanchez@pernod-ricard.com","password":"ricardoenamerica","nombre":"Pablo","apellidos":"Sánchez","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"norma.rodriguez@pernod-ricard.com","password":"ricardoenamerica","nombre":"Norma","apellidos":"Rodríguez","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"mariapaz.magnere@pernod-ricard.com","password":"ricardoenamerica","nombre":"María Paz","apellidos":"Magnere","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo01@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo02@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo03@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo04@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo05@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo06@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo07@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo08@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo09@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo10@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo11@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo12@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo13@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo14@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo15@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo16@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo17@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo18@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo19@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo20@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo21@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo22@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo23@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo24@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""},{"email_usuario":"ricardo25@pernod-ricard.com","password":"1234","nombre":"Jugador","apellidos":"Ricardo","email_fijo":"laguirre@pernod-ricard.com","email_jefe":"","nombre_liga":""}]';
  var userJson = JSON.parse(userString);
  var chargeUserJson = function(user) {
          jQuery.ajax({
          type: 'POST',
          url: '/createUser/',
          data: user
      });
  }
   userJson.forEach(function(user) {
      var params ="name="+user.nombre+"&surname="+user.apellidos+"&password="+user.password+"&user_email="+user.email_usuario+"&official_email="+user.email_fijo+"&boss_email="+user.email_jefe
      chargeUserJson(params)
    });
}*/

})(window.jQuery);
