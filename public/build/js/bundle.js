var prospectDateFilterStart="",prospectDateFilterEnd="";$(document).ready(function(){var e=$("body");e.on("click",".btnEditProspect",function(){var e=$(this).parents("tr").attr("id");melisCoreTool.hideAlert("#prospectupdateformalert"),toolProspects.getProspectDataById(e)}),e.on("click",".btnProspectDelete",function(){var e=$(this).parents("tr").attr("id");toolProspects.deleteProspectData(e)}),e.on("apply.daterangepicker","#dt_bsdatepicker",function(e,t){toolProspects.setDatePickerData(),$(toolProspects.table()).DataTable().ajax.reload()}),e.on("click",".btnMelisProspectExport",function(){var e=$("input[type='search'][aria-controls='tableToolProspect']").val(),t=$("#prosTypeSelect").val(),s=$("#prosSiteSelect").val(),o={};o.filter=e,o.pros_site_id=s,o.pros_type=t,o.startDate=prospectDateFilterStart,o.endDate=prospectDateFilterEnd;var r=$.param(o);melisCoreTool.exportData("/melis/MelisCmsProspects/ToolProspects/exportToCsv?"+r)}),e.on("click","#id_MelisCmsProspects_tool_prospects_modal .tooltabmodal .mce-btn",function(){$("#mce-modal-block").length&&($("#mce-modal-block").css("z-index",1059),$(".mce-floatpanel.mce-window").css("z-index",1060))}),e.on("click",".prospectRefreshTable",function(){toolProspects.refreshTable()}),e.on("change","#prosSiteSelect",function(){var e=$(this).parents().eq(6).find("table").attr("id");$("#"+e).DataTable().ajax.reload()}),e.on("change","#prosTypeSelect",function(){var e=$(this).parents().eq(6).find("table").attr("id");$("#"+e).DataTable().ajax.reload()})}),window.initProspectEditor=function(){melisTinyMCE.createTinyMCE("tool","textarea#id_pros_message",{height:200})},window.initDatePickerFilter=function(e){e.startDate=prospectDateFilterStart,e.endDate=prospectDateFilterEnd,$(document).on("init.dt",function(e,t){toolProspects.setDatePickerData()}),$("#prosSiteSelect").length&&(e.pros_site_id=$("#prosSiteSelect").val()),$("#prosTypeSelect").length&&(e.pros_type=$("#prosTypeSelect").val())},window.initSiteList=function(e){$("#prosSiteSelect").length&&(e.pros_site_id=$("#prosSiteSelect").val())},window.initProsTypeList=function(e){$("#prosTypeSelect").length&&(e.pros_type=$("#prosTypeSelect").val())};var toolProspects={table:function(){return"#tableToolProspect"},initTool:function(){melisCoreTool.initTable(toolProspects.table())},refreshTable:function(){prospectDateFilterStart="",prospectDateFilterEnd="",melisHelper.zoneReload("id_MelisCmsProspects_tool_prospects","MelisCmsProspects_tool_prospects")},updateProspectData:function(){var e=$("#idformprospectdata").serializeArray();e=$.param(e),melisCoreTool.pending("#btnProspectUpdate"),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ToolProspects/updateProspectData",data:e,dataType:"json",encode:!0}).done(function(e){e.success?(toolProspects.refreshTable(),$(".modal").modal("hide"),melisCoreTool.resetLabels("#idformprospectdata"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):(melisCoreTool.alertDanger("#prospectupdateformalert","",e.textMessage),melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"idformprospectdata")),melisCore.flashMessenger(),melisCoreTool.done("#btnProspectUpdate")})},deleteProspectData:function(e){melisCoreTool.confirm(translations.tr_meliscore_common_yes,translations.tr_meliscore_common_no,translations.tr_prospect_manager_fm_delete_data_title,translations.tr_tool_text_prospect_manager_delete_confirm,function(){$.ajax({type:"GET",url:"/melis/MelisCmsProspects/ToolProspects/removeProspectData?id="+e,dataType:"json",encode:!0,success:function(e){melisCoreTool.pending(".btn-danger"),e.success?(toolProspects.refreshTable(),melisHelper.melisOkNotification(e.textTitle,e.textMessage,"#72af46")):melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCore.flashMessenger(),melisCoreTool.done(".btn-danger")}})})},initProspectsDataTable:function(){function e(e,t){prospectDateFilterStart=e.format(melisDateFormat),prospectDateFilterEnd=t.format(melisDateFormat)}prospectDateFilterStart="",prospectDateFilterEnd="";var t=translations.tr_meliscore_datepicker_today,s=translations.tr_meliscore_datepicker_yesterday,o=translations.tr_meliscore_datepicker_last_7_days,r=translations.tr_meliscore_datepicker_last_30_days,a=translations.tr_meliscore_datepicker_this_month,i=translations.tr_meliscore_datepicker_last_month,l={};l[t]=[moment(),moment()],l[s]=[moment().subtract(1,"days"),moment().subtract(1,"days")],l[o]=[moment().subtract(6,"days"),moment()],l[r]=[moment().subtract(29,"days"),moment()],l[a]=[moment().startOf("month"),moment().endOf("month")],l[i]=[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],$(".toolprospect-date-filter #dt_bsdatepicker").daterangepicker({locale:{format:melisDateFormat,applyLabel:translations.tr_meliscore_datepicker_apply,cancelLabel:translations.tr_meliscore_datepicker_cancel,customRangeLabel:translations.tr_meliscore_datepicker_custom_range},ranges:l},e)},setDatePickerData:function(){var e='<i class="glyphicon glyphicon-calendar fa fa-calendar"></i> ',t="";t=0==prospectDateFilterStart.length&&0==prospectDateFilterEnd.length?translations.tr_meliscore_datepicker_select_date+e+' <b class="caret"></b>':translations.tr_meliscore_datepicker_select_date+e+"<span class='sdate'>"+prospectDateFilterStart+" - "+prospectDateFilterEnd+'</span> <b class="caret"></b>',$("#tableToolProspect_wrapper #dt_bsdatepicker .dt_dateInfo").html(t)},getProspectDataById:function(e){zoneId="id_MelisCmsProspects_tool_prospects_update_modal_content",melisKey="MelisCmsProspects_tool_prospects_update_modal_content",modalUrl="melis/MelisCmsProspects/ToolProspects/renderToolProspectsModalContainer",melisHelper.createModal(zoneId,melisKey,!1,{prospectId:e},modalUrl,function(){})}};window.setThemeId=function(e){var t=parseInt(activeTabId.split("_")[0]);e.themeId=t},$(function(){var e=$("body"),t="id_MelisCmsProspects_tool_themes_modal_content",s="MelisCmsProspects_tool_themes_modal_content",o="/melis/MelisCmsProspects/ProspectThemes/toolModalContainer";e.on("click","button#btn_prospect_theme_add",function(){melisCoreTool.pending("button#btn_prospect_theme_add"),melisHelper.createModal(t,s,!0,{},o,function(){melisCoreTool.done("button#btn_prospect_theme_add")})}),e.on("click","button.btn_prospects_theme_edit",function(){var e=$(this).parents("tr").attr("id");melisCoreTool.pending("button#btn_prospects_theme_edit"),melisHelper.createModal(t,s,!1,{id:e},o,function(){melisCoreTool.pending("button#btn_prospects_theme_edit")})}),e.on("submit","form#prospects_theme_form",function(e){var t="form#"+$(this).attr("id"),s=$(this).serializeArray(),o=$(t+" input#pros_theme_id").val();s.push({name:"pros_theme_id",value:o}),$(t+" input, button").not("input#pros_theme_id").attr("disabled","disabled"),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemes/save",data:$.param(s),dataType:"json",encode:!0}).done(function(e){e.success?($(".modal").modal("hide"),$("a.melis-refreshTable").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):(melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"prospects_theme_form")),melisCore.flashMessenger(),$(t+" input, button").not("input#pros_theme_id").removeAttr("disabled")}),e.preventDefault()}),e.on("click","button.btn_prospects_theme_items",function(){var e=$(this).parents("tr").attr("id"),t=$(this).parents("tr").find("td:nth-child(2)").html();melisHelper.tabOpen(translations.tr_melis_cms_prospects_theme+" / "+t,"fa-edit",e+"_id_MelisCmsProspects_tool_theme_items","MelisCmsProspects_tool_theme_items",{id:e})}),e.on("click","button.btn_prospects_theme_delete",function(){var e=$(this).parents("tr").attr("id");$("button").attr("disabled","disabled"),melisCoreTool.confirm(translations.tr_meliscore_common_yes,translations.tr_meliscore_common_no,translations.tr_melis_cms_prospects_theme,translations.tr_melis_cms_prospects_theme_delete_confirm,function(){$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemes/remove",data:{id:e},dataType:"json",encode:!0}).done(function(e){e.success?($("a.melis-refreshTable").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCore.flashMessenger()})}),$("button").removeAttr("disabled")})}),$(function(){var e=$("body"),t="id_MelisCmsProspects_tool_theme_items_modal_content",s="MelisCmsProspects_tool_theme_items_modal_content",o="/melis/MelisCmsProspects/ProspectThemeItems/toolModalContainer";e.on("click","button#btn_prospect_theme_items_add",function(){melisHelper.createModal(t,s,!0,{},o,function(){})}),e.on("click","div.tool-prospect-theme-items-refresh > a.melis-refreshTableThemeItem",function(){var e=parseInt(activeTabId.split("_")[0]),t=$(this).parents(".container-level-a").data("meliskey");$(this).parents(".container-level-a").attr("id");melisHelper.zoneReload(activeTabId,t,{id:e})}),e.on("click","button#btn-save-theme-items",function(){var e=$("#id_MelisCmsProspects_tool_theme_items_modal_content form"),t=[],s=0,o=0;t.push({name:"themeId",value:parseInt(activeTabId.split("_")[0])}),e.each(function(){var e=$(this).serializeArray();for(len=e.length,j=0;j<len;j++)t.push({name:"forms["+s+"]["+e[j].name+"]",value:e[j].value});s++,o++}),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemeItems/saveItem",data:t,dataType:"json",encode:!0}).done(function(e){e.success?($(".modal").modal("hide"),$("a.melis-refreshTableThemeItem").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):(melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"prospects_theme_item_form")),melisCore.flashMessenger()})}),e.on("submit","form#prospects_theme_item_code_form",function(e){var r="form#"+$(this).attr("id"),a=$(this).serializeArray(),i=$(r+" input#pros_theme_item_id").val(),l=parseInt(activeTabId.split("_")[0]);a.push({name:"pros_theme_item_id",value:i}),a.push({name:"pros_theme_id",value:l}),$(r+" input button").not("input#pros_theme_item_id").attr("disabled","disabled"),$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemeItems/saveCode",data:$.param(a),dataType:"json",encode:!0}).done(function(e){if(e.success){$(".modal").modal("hide"),$("a.melis-refreshTableThemeItem").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage);var a=parseInt(activeTabId.split("_")[0]),i=$("input#pros_theme_item_code").val();melisHelper.createModal(t,s,!0,{themeId:a,code:i},o)}else melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCoreTool.highlightErrors(e.success,e.errors,"prospects_theme_item_code_form");melisCore.flashMessenger(),$(r+" input button").not("input#pros_theme_item_id").attr("disabled","disabled")}),e.preventDefault()}),e.on("click","button.btn_prospects_theme_items_edit",function(e){var r=(parseInt(activeTabId.split("_")[0]),$(this).parents("tr").attr("id"));$(this).attr("disabled","disabled"),melisHelper.createModal(t,s,!0,{itemId:r},o,function(){$("button.btn_prospects_theme_items_edit").removeAttr("disabled")})}),e.on("click","button.btn_prospects_theme_items_delete",function(){var e=$(this).parents("tr").attr("id");$("button").attr("disabled","disabled"),melisCoreTool.confirm(translations.tr_meliscore_common_yes,translations.tr_meliscore_common_no,translations.tr_melis_cms_prospects_theme_items,translations.tr_melis_cms_prospects_theme_item_delete_confirm,function(){$.ajax({type:"POST",url:"/melis/MelisCmsProspects/ProspectThemeItems/remove",data:{itemId:e},dataType:"json",encode:!0}).done(function(e){e.success?($("a.melis-refreshTableThemeItem").trigger("click"),melisHelper.melisOkNotification(e.textTitle,e.textMessage)):melisHelper.melisKoNotification(e.textTitle,e.textMessage,e.errors,0),melisCore.flashMessenger()})}),$("button").removeAttr("disabled")})}),$(document).ready(function(){$("body").on("change",".cms-pros-dash-chart-line",function(){cmsProsDashLineGraphInit($(this))}),"undefined"!=typeof charts&&(charts.cmsProsDashLineGraph={data:{d1:[]},plot:null,options:{grid:{color:"#dedede",borderWidth:1,borderColor:"#eee",clickable:!0,hoverable:!0,labelMargin:20},series:{lines:{show:!0,fill:!1,lineWidth:2,steps:!1},points:{show:!0,radius:5,lineWidth:3,fill:!0,fillColor:"#000"}},xaxis:{mode:"time",tickColor:"#eee"},yaxis:{show:!0,tickColor:"#eee",min:0,tickDecimals:0},legend:{position:"nw",noColumns:2,backgroundColor:null,backgroundOpacity:0},shadowSize:0,tooltip:!0,tooltipOpts:{content:"%y %s - %x",shifts:{x:-30,y:-50},defaultTheme:!1}},placeholder:".cms-pros-dash-chart-line-graph",init:function(){null==this.plot&&cmsProsDashLineGraphInit()}},window.cmsProsDashLineGraphInit=function(e){var t="",s="";void 0===e?(s="daily",t=null==melisDashBoardDragnDrop.getCurrentPlugin()?charts.cmsProsDashLineGraph.placeholder:"#"+melisDashBoardDragnDrop.getCurrentPlugin().find(".cms-pros-dash-chart-line-graph").attr("id")):(s=e.val(),t="#"+e.closest(".tab-pane").find(".cms-pros-dash-chart-line-graph").attr("id")),$.ajax({type:"POST",url:"/melis/dashboard-plugin/MelisCmsProspectsStatisticsPlugin/getDashboardStats",data:{chartFor:s},dataType:"json",encode:!0}).success(function(e){for(var o=e.values,r=o.length,a=[],i=null,l=0;l<r;l++){var n=new Date(o[l][0]),c=n.getMonth(),p=n.getFullYear(),m=new Date(p,c,1.5),d=new Date(p,0,2);"daily"==s?i=n.getTime():"monthly"==s?i=m.getTime():"yearly"==s&&(i=d.getTime()),a.push([i,o[l][1]])}$(t).each(function(){charts.cmsProsDashLineGraph.plot=$.plot($(this),[{label:translations.tr_melistoolprospects_tool_prospects,data:a,color:successColor,lines:{fill:.2},points:{fillColor:"#fff"}}],charts.cmsProsDashLineGraph.options)})}).error(function(e,t,s){console.log("ERROR !! Status = "+t+"\n Error = "+s+"\n xhr = "+e.statusText)})},setTimeout(function(){cmsProsDashLineGraphInit()},3e3))}),$(document).ready(function(){$("body").on("change",".cms-pros-dash-chart-bar",function(){cmsProsDashBarGraphInit($(this))}),"undefined"!=typeof charts&&(charts.cmsProsDashBarGraph={data:{d1:[]},plot:null,options:{grid:{color:"#dedede",borderWidth:1,borderColor:"#eee",clickable:!0,hoverable:!0,labelMargin:20},series:{bars:{show:!0,barWidth:62208e3,fill:!0,align:"center"},shadowSize:0},xaxis:{mode:"time",timeformat:"%b %d",position:"bottom",tickColor:"#eee"},yaxis:{show:!0,tickColor:"#eee",tickDecimals:0,min:0},legend:{position:"nw",noColumns:2,backgroundColor:null,backgroundOpacity:0},shadowSize:0,tooltip:!0,tooltipOpts:{content:"%y %s - %x",shifts:{x:-30,y:-50},defaultTheme:!1}},placeholder:".cms-pros-dash-chart-bar-graph",init:function(){null==this.plot&&cmsProsDashBarGraphInit()}},window.cmsProsDashBarGraphInit=function(e,t){void 0===e?(chartFor="daily",placeholder=t):(chartFor=e.val(),placeholder="#"+e.closest(".tab-pane").find(".cms-pros-dash-chart-bar-graph").attr("id")),$.ajax({type:"POST",url:"/melis/dashboard-plugin/MelisCmsProspectsStatisticsPlugin/getDashboardStats",data:{chartFor:chartFor},dataType:"json",encode:!0}).success(function(e){var t=charts.cmsProsDashBarGraph.options;switch(chartFor){case"daily":t.xaxis.timeformat="%b %d",t.series.bars.barWidth=62208e3;break;case"monthly":t.xaxis.timeformat="%b",t.series.bars.barWidth=15552e5;break;case"yearly":t.xaxis.timeformat="%Y",t.series.bars.barWidth=1741824e4}for(var s=e.values,o=s.length,r=[],a=null,i=0;i<o;i++){var l=new Date(s[i][0]),n=(new Date,l.getMonth()),c=l.getFullYear(),p=new Date(c,n,1.5),m=new Date(c,0,2);"daily"==chartFor?a=l.getTime():"monthly"==chartFor?a=p.getTime():"yearly"==chartFor&&(a=m.getTime()),r.push([a,s[i][1]])}charts.cmsProsDashBarGraph.plot=$.plot($(placeholder),[{label:translations.tr_melistoolprospects_tool_prospects,data:r,color:successColor}],charts.cmsProsDashBarGraph.options)}).error(function(e,t,s){console.log("ERROR !! Status = "+t+"\n Error = "+s+"\n xhr = "+e.statusText)})},$("body").on("shown.bs.tab",".chart-simple-lines-tab",function(e){targetDevId="#"+$($(this).attr("href")).find(".cms-pros-dash-chart-bar-graph").attr("id");var t=$(targetDevId).data("plot");null!=charts.cmsProsDashBarGraph.plot&&void 0!==t||cmsProsDashBarGraphInit(void 0,targetDevId)}))});