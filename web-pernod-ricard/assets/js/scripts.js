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

    $('#btn-chargeUsers').click(function(e) {
        e.preventDefault();
        chargeUsers();
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

})(window.jQuery);
