var prospectDateFilterStart="",prospectDateFilterEnd="";$(function(){var e=$("body");e.on("click",".btnEditProspect",function(){var e=$(this),t=e.parents("tr").attr("id");melisCoreTool.hideAlert("#prospectupdateformalert"),toolProspects.getProspectDataById(t)}),e.on("click",".btnProspectDelete",function(){var e=$(this),t=e.parents("tr").attr("id");toolProspects.deleteProspectData(t)}),e.on("apply.daterangepicker","#dt_bsdatepicker",function(e,t){toolProspects.setDatePickerData(),$(toolProspects.table()).DataTable().ajax.reload()}),e.on("click",".btnMelisProspectExport",function(){var e=$("input[type='search'][aria-controls='tableToolProspect']").val(),t=$("#prosTypeSelect").val(),s=$("#prosSiteSelect").val(),o={};o.filter=e,o.pros_site_id=s,o.pros_type=t,o.startDate=prospectDateFilterStart,o.endDate=prospectDateFilterEnd;var r=$.param(o);melisCoreTool.exportData("/melis/MelisCmsProspects/ToolProspects/exportToCsv?"+r)}),e.on("click","#id_MelisCmsProspects_tool_prospects_modal .tooltabmodal .mce-btn",function(){$("#mce-modal-block").length&&($("#mce-modal-block").css("z-index",1059),$(".mce-floatpanel.mce-window").css("z-index",1060))}),e.on("click",".prospectRefreshTable",function(){toolProspects.refreshTable()}),e.on("change","#prosSiteSelect",function(){var e=$(this),t=e.parents().eq(6).find("table").attr("id");$("#"+t).DataTable().ajax.reload()})}),window.initProspectEditor=function(){melisTinyMCE.createTinyMCE("tool","textarea#id_pros_message",{height:200})},window.initDatePickerFilter=function(e){e.startDate=prospectDateFilterStart,e.endDate=prospectDateFilterEnd,$(document).on("init.dt",function(e,t){toolProspects.setDatePickerData()}),$("#prosSiteSelect").length&&(e.pros_site_id=$("#prosSiteSelect").val()),$("#prosTypeSelect").length&&(e.pros_type=$("#prosTypeSelect").val())},window.initSiteList=function(e){$("#prosSiteSelect").length&&(e.pros_site_id=$("#prosSiteSelect").val())},window.initProsTypeList=function(e){$("#prosTypeSelect").length&&(e.pros_type=$("#prosTypeSelect").val())};var toolProspects={table:function(){return"#tableToolProspect"},initTool:function(){melisCoreTool.initTable(toolProspects.table())},refreshTable:function(){prospectDateFilterStart="",prospectDateFilterEnd="",melisHelper.zoneReload("id_MelisCmsProspects_tool_prospects","MelisCmsProspects_tool_prospects")},updateProspectData:function(){var e=$("#idformprospectdata").serializeArray();e=$.param(e),melisCoreTool.pending("#btnProspectUpdate"),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ToolProspects/updateProspectData",data:e,dataType:"json",encode:!0}).done(function(e){e.success?(toolProspects.refreshTable(),$(".modal").modal("hide"),melisCoreTool.resetLabels("#idformprospectdata"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):(melisCoreTool.alertDanger("#prospectupdateformalert","",e.textMessage),melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"idformprospectdata")),melisCore.flashMessenger(),melisCoreTool.done("#btnProspectUpdate")})},deleteProspectData:function(e){melisCoreTool.confirm(translations.tr_meliscore_common_yes,translations.tr_meliscore_common_no,translations.tr_prospect_manager_fm_delete_data_title,translations.tr_tool_text_prospect_manager_delete_confirm,function(){$.ajax({type:"GET",url:"/melis/MelisCmsProspects/ToolProspects/removeProspectData?id="+e,dataType:"json",encode:!0}).done(function(e){melisCoreTool.pending(".btn-danger"),e.success?(toolProspects.refreshTable(),melisHelper.melisOkNotification(e.textTitle,e.textMessage,"#72af46")):melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCore.flashMessenger(),melisCoreTool.done(".btn-danger")}).fail(function(){alert(translations.tr_meliscore_error_message)})})},initProspectsDataTable:function(){function e(e,t){prospectDateFilterStart=e.format(melisDateFormat),prospectDateFilterEnd=t.format(melisDateFormat)}prospectDateFilterStart="",prospectDateFilterEnd="";var t=translations.tr_meliscore_datepicker_today,s=translations.tr_meliscore_datepicker_yesterday,o=translations.tr_meliscore_datepicker_last_7_days,r=translations.tr_meliscore_datepicker_last_30_days,a=translations.tr_meliscore_datepicker_this_month,i=translations.tr_meliscore_datepicker_last_month,l={};l[t]=[moment(),moment()],l[s]=[moment().subtract(1,"days"),moment().subtract(1,"days")],l[o]=[moment().subtract(6,"days"),moment()],l[r]=[moment().subtract(29,"days"),moment()],l[a]=[moment().startOf("month"),moment().endOf("month")],l[i]=[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],$(".toolprospect-date-filter #dt_bsdatepicker").daterangepicker({locale:{format:melisDateFormat,applyLabel:translations.tr_meliscore_datepicker_apply,cancelLabel:translations.tr_meliscore_datepicker_cancel,customRangeLabel:translations.tr_meliscore_datepicker_custom_range},ranges:l},e)},setDatePickerData:function(){var e='<i class="glyphicon glyphicon-calendar fa fa-calendar"></i> ',t="";t=0==prospectDateFilterStart.length&&0==prospectDateFilterEnd.length?translations.tr_meliscore_datepicker_select_date+e+' <b class="caret"></b>':translations.tr_meliscore_datepicker_select_date+e+"<span class='sdate'>"+prospectDateFilterStart+" - "+prospectDateFilterEnd+'</span> <b class="caret"></b>',$("#tableToolProspect_wrapper #dt_bsdatepicker .dt_dateInfo").html(t)},getProspectDataById:function(e){zoneId="id_MelisCmsProspects_tool_prospects_update_modal_content",melisKey="MelisCmsProspects_tool_prospects_update_modal_content",modalUrl="melis/MelisCmsProspects/ToolProspects/renderToolProspectsModalContainer",melisHelper.createModal(zoneId,melisKey,!1,{prospectId:e},modalUrl,function(){})}};window.setThemeId=function(e){var t=parseInt(activeTabId.split("_")[0]);e.themeId=t},$(function(){var e=$("body"),t="id_MelisCmsProspects_tool_themes_modal_content",s="MelisCmsProspects_tool_themes_modal_content",o="/melis/MelisCmsProspects/ProspectThemes/toolModalContainer",r="id_MelisCmsProspects_tool_theme_items_modal_content",a="MelisCmsProspects_tool_theme_items_modal_content",i="/melis/MelisCmsProspects/ProspectThemeItems/toolModalContainer";e.on("click","button#btn_prospect_theme_add",function(){melisCoreTool.pending("button#btn_prospect_theme_add"),melisHelper.createModal(t,s,!0,{},o,function(){melisCoreTool.done("button#btn_prospect_theme_add")})}),e.on("click","button.btn_prospects_theme_edit",function(){var e=$(this),r=e.parents("tr").attr("id");melisCoreTool.pending("button#btn_prospects_theme_edit"),melisHelper.createModal(t,s,!1,{id:r},o,function(){melisCoreTool.pending("button#btn_prospects_theme_edit")})}),e.on("submit","form#prospects_theme_form",function(e){var t=$(this),s="form#"+t.attr("id"),o=t.serializeArray(),r=$(s+" input#pros_theme_id").val();o.push({name:"pros_theme_id",value:r}),$(s+" input, button").not("input#pros_theme_id").attr("disabled","disabled"),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemes/save",data:$.param(o),dataType:"json",encode:!0}).done(function(e){e.success?($(".modal").modal("hide"),$("a.melis-refreshTable").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):(melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"prospects_theme_form")),melisCore.flashMessenger(),$(s+" input, button").not("input#pros_theme_id").removeAttr("disabled")}).fail(function(){alert(translations.tr_meliscore_error_message)}),e.preventDefault()}),e.on("click","button.btn_prospects_theme_items",function(){var e=$(this),t=e.parents("tr").attr("id"),s=e.parents("tr").find("td:nth-child(2)").html();melisHelper.tabOpen(translations.tr_melis_cms_prospects_theme+" / "+s,"fa-edit",t+"_id_MelisCmsProspects_tool_theme_items","MelisCmsProspects_tool_theme_items",{id:t})}),e.on("click","button.btn_prospects_theme_delete",function(){var e=$(this),t=e.parents("tr").attr("id");$("button").attr("disabled","disabled"),melisCoreTool.confirm(translations.tr_meliscore_common_yes,translations.tr_meliscore_common_no,translations.tr_melis_cms_prospects_theme,translations.tr_melis_cms_prospects_theme_delete_confirm,function(){$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemes/remove",data:{id:t},dataType:"json",encode:!0}).done(function(e){e.success?($("a.melis-refreshTable").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCore.flashMessenger()})}),$("button").removeAttr("disabled")}),e.on("click","button#btn_prospect_theme_items_add",function(){melisHelper.createModal(r,a,!0,{},i,function(){})}),e.on("click","div.tool-prospect-theme-items-refresh > a.melis-refreshTableThemeItem",function(){var e=$(this),t=parseInt(activeTabId.split("_")[0]),s=e.parents(".container-level-a").data("meliskey");e.parents(".container-level-a").attr("id");melisHelper.zoneReload(activeTabId,s,{id:t})}),e.on("click","button#btn-save-theme-items",function(){var e=$("#id_MelisCmsProspects_tool_theme_items_modal_content form"),t=[],s=0,o=0;t.push({name:"themeId",value:parseInt(activeTabId.split("_")[0])}),e.each(function(){var e=$(this),r=e.serializeArray();for(len=r.length,j=0;j<len;j++)t.push({name:"forms["+s+"]["+r[j].name+"]",value:r[j].value});s++,o++}),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemeItems/saveItem",data:t,dataType:"json",encode:!0}).done(function(e){e.success?($(".modal").modal("hide"),$("a.melis-refreshTableThemeItem").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):(melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"prospects_theme_item_form")),melisCore.flashMessenger()}).fail(function(){alert(translations.tr_meliscore_error_message)})}),e.on("submit","form#prospects_theme_item_code_form",function(e){var t=$(this),s="form#"+t.attr("id"),o=t.serializeArray(),l=$(s+" input#pros_theme_item_id").val(),n=parseInt(activeTabId.split("_")[0]);o.push({name:"pros_theme_item_id",value:l}),o.push({name:"pros_theme_id",value:n}),$(s+" input button").not("input#pros_theme_item_id").attr("disabled","disabled"),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemeItems/saveCode",data:$.param(o),dataType:"json",encode:!0}).done(function(e){if(e.success){$(".modal").modal("hide"),$("a.melis-refreshTableThemeItem").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage);var t=parseInt(activeTabId.split("_")[0]),o=$("input#pros_theme_item_code").val();melisHelper.createModal(r,a,!0,{themeId:t,code:o},i)}else melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"prospects_theme_item_code_form");melisCore.flashMessenger(),$(s+" input button").not("input#pros_theme_item_id").attr("disabled","disabled")}).fail(function(){alert(translations.tr_meliscore_error_message)}),e.preventDefault()}),e.on("click","button.btn_prospects_theme_items_edit",function(e){var t=$(this),s=(parseInt(activeTabId.split("_")[0]),t.parents("tr").attr("id"));t.attr("disabled","disabled"),melisHelper.createModal(r,a,!0,{itemId:s},i,function(){$("button.btn_prospects_theme_items_edit").removeAttr("disabled")})}),e.on("click","button.btn_prospects_theme_items_delete",function(){var e=$(this),t=e.parents("tr").attr("id");$("button").attr("disabled","disabled"),melisCoreTool.confirm(translations.tr_meliscore_common_yes,translations.tr_meliscore_common_no,translations.tr_melis_cms_prospects_theme_items,translations.tr_melis_cms_prospects_theme_item_delete_confirm,function(){$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemeItems/remove",data:{itemId:t},dataType:"json",encode:!0}).done(function(e){e.success?($("a.melis-refreshTableThemeItem").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCore.flashMessenger()}).fail(function(){alert(translations.tr_meliscore_error_message)})}),$("button").removeAttr("disabled")})});var prospectsDashboardLineChart=function(e,t){function s(){"undefined"!=typeof charts&&(charts.cmsProsDashLineGraph={data:{d1:[]},plot:null,options:{grid:{color:"#dedede",borderWidth:1,borderColor:"#eee",clickable:!0,hoverable:!0,labelMargin:20},series:{lines:{show:!0,fill:!1,lineWidth:2,steps:!1},points:{show:!0,radius:5,lineWidth:3,fill:!0,fillColor:"#000"}},xaxis:{mode:"time",tickColor:"#eee"},yaxis:{show:!0,tickColor:"#eee",min:0,tickDecimals:0},legend:{position:"nw",noColumns:2,backgroundColor:null,backgroundOpacity:0},shadowSize:0,tooltip:!0,tooltipOpts:{content:"%y %s - %x",shifts:{x:-30,y:-50},defaultTheme:!1}},placeholder:".cms-pros-dash-chart-line-graph",init:function(){null==this.plot&&o()}})}function o(t){var o="",r="";s(),void 0===t?(r="daily",o=null==melisDashBoardDragnDrop.getCurrentPlugin()?charts.cmsProsDashLineGraph.placeholder:"#"+melisDashBoardDragnDrop.getCurrentPlugin().find(".cms-pros-dash-chart-line-graph").attr("id")):(r=t.val(),o="#"+t.closest(".tab-pane").find(".cms-pros-dash-chart-line-graph").attr("id")),e.ajax({type:"POST",url:"/melis/dashboard-plugin/MelisCmsProspectsStatisticsPlugin/getDashboardStats",data:{chartFor:r},dataType:"json",encode:!0}).done(function(t){for(var s=t.values,a=s.length,i=[],l=null,n=0;n<a;n++){var c=new Date(s[n][0]),p=c.getMonth(),m=c.getFullYear(),d=new Date(m,p,1.5),h=new Date(m,0,2);"daily"==r?l=c.getTime():"monthly"==r?l=d.getTime():"yearly"==r&&(l=h.getTime()),i.push([l,s[n][1]])}e(o).each(function(){charts.cmsProsDashLineGraph.plot=e.plot(e(this),[{label:translations.tr_melistoolprospects_tool_prospects,data:i,color:successColor,lines:{fill:.2},points:{fillColor:"#fff"}}],charts.cmsProsDashLineGraph.options)})}).fail(function(e,t,s){console.log("ERROR !! Status = "+t+"\n Error = "+s+"\n xhr = "+e.statusText)})}function r(){o()}return{loadChart:r,cmsProsDashLineGraphInit:o}}($,window);$(function(){var e=$("body"),t=$("#"+activeTabId);e.on("change",".cms-pros-dash-chart-line",function(){prospectsDashboardLineChart.cmsProsDashLineGraphInit($(this))}),"undefined"==typeof melisUserTabs&&"meliscore_dashboard"===t.data("meliskey")&&t.find(".cms-pros-dash-chart-line-graph").length>0&&prospectsDashboardLineChart.loadChart()}),$(function(){var e=$("body");e.on("change",".cms-pros-dash-chart-bar",function(){cmsProsDashBarGraphInit($(this))}),"undefined"!=typeof charts&&(charts.cmsProsDashBarGraph={data:{d1:[]},plot:null,options:{grid:{color:"#dedede",borderWidth:1,borderColor:"#eee",clickable:!0,hoverable:!0,labelMargin:20},series:{bars:{show:!0,barWidth:62208e3,fill:!0,align:"center"},shadowSize:0},xaxis:{mode:"time",timeformat:"%b %d",position:"bottom",tickColor:"#eee"},yaxis:{show:!0,tickColor:"#eee",tickDecimals:0,min:0},legend:{position:"nw",noColumns:2,backgroundColor:null,backgroundOpacity:0},shadowSize:0,tooltip:!0,tooltipOpts:{content:"%y %s - %x",shifts:{x:-30,y:-50},defaultTheme:!1}},placeholder:".cms-pros-dash-chart-bar-graph",init:function(){null==this.plot&&cmsProsDashBarGraphInit()}},window.cmsProsDashBarGraphInit=function(e,t){void 0===e?(chartFor="daily",placeholder=t):(chartFor=e.val(),placeholder="#"+e.closest(".tab-pane").find(".cms-pros-dash-chart-bar-graph").attr("id")),$(placeholder).css("width","100%"),$.ajax({type:"POST",url:"/melis/dashboard-plugin/MelisCmsProspectsStatisticsPlugin/getDashboardStats",data:{chartFor:chartFor},dataType:"json",encode:!0}).done(function(e){var t=charts.cmsProsDashBarGraph.options;switch(chartFor){case"daily":t.xaxis.timeformat="%b %d",t.series.bars.barWidth=62208e3;break;case"monthly":t.xaxis.timeformat="%b",t.series.bars.barWidth=15552e5;break;case"yearly":t.xaxis.timeformat="%Y",t.series.bars.barWidth=1741824e4}for(var s=e.values,o=s.length,r=[],a=null,i=0;i<o;i++){var l=new Date(s[i][0]),n=(new Date,l.getMonth()),c=l.getFullYear(),p=new Date(c,n,1.5),m=new Date(c,0,2);"daily"==chartFor?a=l.getTime():"monthly"==chartFor?a=p.getTime():"yearly"==chartFor&&(a=m.getTime()),r.push([a,s[i][1]])}charts.cmsProsDashBarGraph.plot=$.plot($(placeholder),[{label:translations.tr_melistoolprospects_tool_prospects,data:r,color:successColor}],charts.cmsProsDashBarGraph.options)}).fail(function(e,t,s){alert("ERROR !! Status = "+t+"\n Error = "+s+"\n xhr = "+e.statusText)})},e.on("shown.bs.tab",".chart-simple-lines-tab",function(e){targetDevId="#"+$($(this).attr("href")).find(".cms-pros-dash-chart-bar-graph").attr("id");var t=$(targetDevId).data("plot");null!=charts.cmsProsDashBarGraph.plot&&void 0!==t||cmsProsDashBarGraphInit(void 0,targetDevId)}))});