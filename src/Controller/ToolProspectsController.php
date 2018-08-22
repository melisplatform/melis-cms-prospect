<?php

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCmsProspects\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use MelisCore\Service\MelisCoreRightsService;
use Zend\Session\Container;

/**
 * This controller handles the display of the Prospect Tool
 */
class ToolProspectsController extends AbstractActionController
{
    const ToolProspectsAppConfigPath = 'melistoolprospects/tools/melistoolprospects_tool_prospects';
    const TOOL_KEY = 'melistoolprospects_tool_prospects';
    
    /**
     * Renders the View file of this controller
     * @return \Zend\View\Model\ViewModel
     */
    public function renderProspectsAction()
    {
        
        $translator = $this->getServiceLocator()->get('translator');
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $noAccessPrompt = '';
        
        if(!$this->hasAccess($this::TOOL_KEY)) {
            $noAccessPrompt = $translator->translate('tr_tool_no_access');
        }
        
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('melistoolprospects', 'melistoolprospects_tool_prospects');
        

    	$view = new ViewModel();
    	$view->title = $melisTool->getTitle();
    	$view->melisKey = $melisKey;
    	
    	return $view;
    }
    
    /**
     * Renders to the Tool Header Title
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsHeaderAction()
    {
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $zoneConfig = $this->params()->fromRoute('zoneconfig', array());
        
        $melisTool->setMelisToolKey('melistoolprospects', 'melistoolprospects_tool_prospects');
        
        $view = new ViewModel();
        $view->title = $melisTool->getTitle();
        $view->melisKey = $melisKey;
        
        return $view;
        
    }
    
    /**
     * Renders the Widget Container
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsWidgetsContentAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
    
        $view = new ViewModel();
        $view->melisKey = $melisKey;
    
        return $view;
    }
    
    /**
     * Renders the Number of Prospects
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsWidgetNumProspectsAction()
    {
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisKey = $this->params()->fromRoute('melisKey', '');
        
        $melisProspectsService = $this->getServiceLocator()->get('MelisProspectsService');
        $numPropects = $melisProspectsService->getProspectsDataForWidgets('numPropects');
        
        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->numPropects = $numPropects;
        
        return $view;
    
    }
    
    /**
     * Renders the Prospect Widget for Number of CurrentProspects Month
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsWidgetNumProspectsThisMonthAction()
    {
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisKey = $this->params()->fromRoute('melisKey', '');
        
        $melisProspectsService = $this->getServiceLocator()->get('MelisProspectsService');
        $numPropectsMonth = $melisProspectsService->getWidgetProspects('curMonth');
        
        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->numPropectsMonth = $numPropectsMonth;
        
        return $view;
    }
    
    /**
     * Renders the Prospect Widget for Number of CurrentProspects Month
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsWidgetProspectsAveragePerMonthAction()
    {
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisKey = $this->params()->fromRoute('melisKey', '');
        
        $melisProspectsService = $this->getServiceLocator()->get('MelisProspectsService');
        $numPropectsMonthAvg = $melisProspectsService->getWidgetProspects('avgMonth');
        
        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->numPropectsMonthAvg = (float)$numPropectsMonthAvg['average'];
        
        return $view;
    }
    
    /**
     * Renders the Refresh Button of the tool
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsHeaderRefreshAction()
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        
        $view = new ViewModel();
        $view->melisKey = $melisKey;
        
        return $view;
    }
    
    /**
     * Renders to the overall content of the tool (table, modals and tool buttons)
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsContentAction()
    {
        $translator = $this->getServiceLocator()->get('translator');
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('melistoolprospects', 'melistoolprospects_tool_prospects');
        
        $container = new Container('meliscore');
        $locale = $container['melis-lang-locale'];
        
        $columns = $melisTool->getColumns();
        // pre-add Action Columns
        $columns['actions'] = array('text' => $translator->translate('tr_meliscore_global_action'), 'width' => '10%');

        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->tableColumns = $columns;
        $view->getToolDataTableConfig = $melisTool->getDataTableConfiguration('#tableToolProspect', true, false, array('order' => '[[ 0, "desc" ]]'));
        
        return $view;
    }
    
    /**
     * Renders to the date filter plugin in the filter bar inside the datatable
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsContentFiltersDateAction()
    {
        return new ViewModel();
    }
    
    /**
     * Renders to the limit selection in the filter bar inside the datatable
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsContentFiltersLimitAction()
    {
        return new ViewModel();
    }
    
    /**
     * Renders to the search input in the filter bar inside the datatable
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsContentFiltersSearchAction()
    {
        return new ViewModel();
    }
    
    /**
     * Renders to the refresh button in the filter bar inside the datatable
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsContentFiltersRefreshAction()
    {
        return new ViewModel();
    }
    
    public function renderToolProspectsContentFiltersExportAction()
    {
        return new ViewModel();
    }
    
    
    /**
     * Renders to modal container
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsModalContainerAction() {
        
        $id = $this->params()->fromQuery('id');
        $view = new ViewModel();
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $view->melisKey = $melisKey;
        $view->id = $id;
        $view->setTerminal(true);
        return $view;
    }
    
    /**
     * Renders the update form content for the modal
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectUpdateFormAction()
    {
        $prospectId = (int) $this->params()->fromQuery('prospectId', '');
        
        $melisCoreConfig = $this->serviceLocator->get('MelisCoreConfig');
        $appConfigForm = $melisCoreConfig->getFormMergedAndOrdered('melistoolprospects/tools/melistoolprospects_tool_prospects/forms/melistoolprospects_tool_prospects_update','melistoolprospects_tool_prospects_update');
        $factory = new \Zend\Form\Factory();
        $formElements = $this->serviceLocator->get('FormElementManager');
        $factory->setFormElementManager($formElements);
        $form = $factory->createForm($appConfigForm);
        
        $prospectTable = $this->getServiceLocator()->get('MelisProspects');
        $themeTable = $this->getServiceLocator()->get('MelisCmsProspectsThemeTable');
        $themeItemTable = $this->getServiceLocator()->get('MelisCmsProspectsThemeItemTable');
        $container = new Container('meliscore');
        
        if(!empty($prospectId)){
            
           $prospect =  $prospectTable->getEntryById($prospectId)->current();
           
           if(!empty($prospect)){
               
               $theme  =  $themeItemTable->getEntryById($prospect->pros_theme)->current();
               
               if(!empty($theme)){
                   
                   $temp  =  $themeItemTable->getItemByThemeId($theme->pros_theme_id, (int) $container['melis-lang-id'], true);
                   $data = array();
                   
                   foreach($temp as $item){
                       $i = $item;
                       if(empty($item->item_trans_text)){
                           $i = $themeItemTable->getItemById(
                               $item->pros_theme_item_id,
                               null,
                               true
                               )->current();
                       }
                       $data[] = $i;
                   }
                  
                   $form->get('pros_theme')->loadValueOptions($data);
               }else{
                   
                   $load[] = array(
                       'pros_theme_item_id' => $prospect->pros_theme,
                       'pros_theme_name' => $prospect->pros_theme
                    );
                   
                   $form->get('pros_theme')->loadValueOptions($load);
               }
               $form->setData((array)$prospect);
           }
        }
        
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $view = new ViewModel();
        $view->melisKey = $melisKey;
        $view->form = $form;
        $view->title = "tr_prospect_manager_fm_delete_update_title";
        return $view;
    }
    
    public function renderToolProspectsActionEditAction() 
    {
        $view = new ViewModel();
        
        return $view;
    }
    
    public function renderToolProspectsActionDeleteAction() 
    {
        $view = new ViewModel();
        
        return $view;
    }

    public function renderToolProspectsModalUpdateContentAction() 
    {
        $melisKey = $this->params()->fromRoute('melisKey', '');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('melistoolprospects', 'melistoolprospects_tool_prospects');
        
        $view = new ViewModel();
        $view->prospectsModal = $melisTool->getModal('melistoolprospects_tool_prospects_update_modal');
        $view->melisKey = $melisKey;
        
        return $view;
    }
    
    public function renderToolProspectsModalEmptyContentAction() 
    {
        $view = new ViewModel();
        
        return $view; 
    }

    /**
     * renders the coupon list content prospects filter site
     * @return \Zend\View\Model\ViewModel
     */
    public function renderToolProspectsContentFiltersSiteAction()
    {
        $tableSite = $this->getServiceLocator()->get('MelisEngineTableSite');
        $translator = $this->getServiceLocator()->get('translator');
        $sites = $tableSite->fetchAll();
        $siteId = $this->getRequest()->getPost('pros_site_id');

        $options = '<option  value="">'.$translator->translate('tr_meliscmsliderdetails_common_label_choose').'</option>';
        foreach($sites as $site){
            $selected  = ($site->site_id == $siteId)? 'selected' : '';
            $options .= '<option value="'.$site->site_id.'" '.$selected.'>'.$site->site_name .'</option>';
        }

        $view =  new ViewModel();
        $view->options = $options;
        return $view;
    }

    /**
     * Returns all prospect data in JSON format
     * @return \Zend\View\Model\JsonModel
     */
    public function getToolProspectDataAction()
    {
        $prospectTable = $this->getServiceLocator()->get('MelisProspects');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('melistoolprospects', 'melistoolprospects_tool_prospects');
        $melisTranslation = $this->getServiceLocator()->get('MelisCoreTranslation');
        $container = new Container('meliscore');
        $locale = $container['melis-lang-locale'];
        
        $colId = array();
        $dataCount = 0;
        $draw = 0;
        $tableData = array();
        if($this->getRequest()->isPost())
        {
            $colId = array_keys($melisTool->getColumns());

            $pros_site_id = $this->getRequest()->getPost('pros_site_id');
            $pros_site_id = !empty($pros_site_id)? $pros_site_id : null;

            $sortOrder = $this->getRequest()->getPost('order');
            $sortOrder = $sortOrder[0]['dir'];
            
            $selCol = $this->getRequest()->getPost('order');
            $selCol = $colId[$selCol[0]['column']];
            
            $draw = $this->getRequest()->getPost('draw');
            
            $start = $this->getRequest()->getPost('start');
            $length =  $this->getRequest()->getPost('length');
            
            $search = $this->getRequest()->getPost('search');
            $search = $search['value'];
            
            $dataCount = $prospectTable->getTotalData();

            $getData = $prospectTable->getData($search, $pros_site_id, $melisTool->getSearchableColumns(), $selCol, $sortOrder, $start, $length);

            $themeItemTable = $this->getServiceLocator()->get('MelisCmsProspectsThemeItemTable');
            
            // store fetched Object Data into array so we can apply any string modifications
            $tableData = $getData->toArray();
            for($ctr = 0; $ctr < count($tableData); $ctr++)
            {
                // apply text limits
                foreach($tableData[$ctr] as $vKey => $vValue)
                {
                    $tableData[$ctr][$vKey] = $melisTool->sanitize($melisTool->limitedText($vValue));
                }
                
                // manually modify value of the desired row
                $tableData[$ctr]['DT_RowId'] = $tableData[$ctr]['pros_id'];
                $tableData[$ctr]['pros_contact_date'] = strftime($melisTranslation->getDateFormatByLocate($locale), strtotime($tableData[$ctr]['pros_contact_date']));
                $itemName = '';
                if(is_numeric($tableData[$ctr]['pros_theme'])){
                    
                    $themeItem = $themeItemTable->getItemById($tableData[$ctr]['pros_theme'], (int) $melisTool->getCurrentLocaleID(), true)->current();
                    
                    if(empty($themeItem)){
                        $themeItem =  $themeItemTable->getItemById($tableData[$ctr]['pros_theme'], null, true)->current();
                    }
                    
                    $itemName = !empty($themeItem) ? $themeItem->pros_theme_name . ' / ' . $themeItem->item_trans_text : '';
                }
                
                $tableData[$ctr]['pros_theme'] = !empty($itemName) ? $itemName : $translator->translate($tableData[$ctr]['pros_theme']);

                $tableData[$ctr]['pros_message'] = strip_tags($tableData[$ctr]['pros_message']);

            }
        }

        return new JsonModel(array(
            'draw' => (int) $draw,
            'recordsTotal' => $dataCount,
            'recordsFiltered' =>  $prospectTable->getTotalFiltered(),
            'data' => $tableData,
        ));
    }
    
    public function exportToCsvAction()
    {
        $prospectTable = $this->getServiceLocator()->get('MelisProspects');
        $translator = $this->getServiceLocator()->get('translator');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('melistoolprospects', 'melistoolprospects_tool_prospects');

            
        $searched = $this->getRequest()->getQuery('filter');
        $columns  = $melisTool->getSearchableColumns();

        //remove the sitename from the where clause to avoid error since it doesn't exist in the template table
        for($i = 0; $i < sizeof($columns); $i++)
        {
            if($columns[$i] == 'site_name'){
                unset($columns[$i]);
            }
        }

        $data = $prospectTable->getDataForExport($searched, $columns);

        return $melisTool->exportDataToCsv($data->toArray());
    }

    
    /**
     * Removed a specific prospect data in the database table
     * @return \Zend\View\Model\JsonModel
     */
    public function removeProspectDataAction()
    {
    	$response = array();
    	$this->getEventManager()->trigger('meliscmsprospects_toolprospects_delete_start', $this, $response);
        
    	$translator = $this->getServiceLocator()->get('translator');
        $prospectTable = $this->getServiceLocator()->get('MelisProspects');
        $id = $this->params()->fromRoute('id', $this->params()->fromQuery('id', ''));
        
        $prospectTable->deleteById($id);

        $response = array(
            'textTitle' => 'tr_melistoolprospects_tool_prospects',
            'textMessage' => 'tr_prospect_manager_fm_delete_data_content',
            'success' => true,
        );
        
        $this->getEventManager()->trigger('meliscmsprospects_toolprospects_delete_end', $this, array_merge($response, array('typeCode' => 'CMS_PROSPECTS_DELETE', 'itemId' => $id)));
        
        return new JsonModel($response);
    }
    
    /**
     * returns the prospect data from the ID provided
     * @return \Zend\View\Model\JsonModel
     */
    public function retrieveProspectDataByIdAction()
    {
        $prospectTable = $this->getServiceLocator()->get('MelisProspects');
        $id = $this->params()->fromRoute('id', $this->params()->fromQuery('id', ''));
        
        return new JsonModel($prospectTable->getEntryById($id));
    }
    
    /**
     * Updates an specific information of Prospect Data 
     * @return \Zend\View\Model\JsonModel
     */
    public function updateProspectDataAction()
    {
    	$response = array();
    	$this->getEventManager()->trigger('meliscmsprospects_toolprospects_save_start', $this, $response);
    	$id = null;
        $success = 0;
        $errors  = array();
        $textTitle = 'tr_melistoolprospects_tool_prospects';
        $textMessage = '';
        // for event logging
        $translator = $this->getServiceLocator()->get('translator');
        $prospectTable = $this->getServiceLocator()->get('MelisProspects');
        $melisTool = $this->getServiceLocator()->get('MelisCoreTool');
        $melisTool->setMelisToolKey('melistoolprospects', 'melistoolprospects_tool_prospects');
        $prospectForm = $melisTool->getForm('melistoolprospects_tool_prospects_update');
        
        if($this->getRequest()->isPost())
        {
            $postValues = get_object_vars($this->getRequest()->getPost());
            $postValues = $melisTool->sanitizePost($postValues, array('pros_message'));
            $id = $this->getRequest()->getPost('pros_id');
            $prospectForm->setData($postValues);
            
            if($prospectForm->isValid())
            {
                $data = $prospectForm->getData();
                // get the current data
                
                $curData = $prospectTable->getEntryById($id);
                $curData = $curData->current();
                
                $data['pros_contact_date'] = $curData->pros_contact_date;
                $data['pros_type'] = $curData->pros_type;
                
                $prospectTable->save($data, $id);
                
                // add event to Flash messenger
                $textMessage = $translator->translate('tr_prospect_manager_fm_update_data_content');
                $success = 1;
            }
            else {
                $textMessage = $translator->translate('tr_prospect_manager_fm_update_data_content_error');
                $errors = $prospectForm->getMessages();
            }
            
            $melisMelisCoreConfig = $this->serviceLocator->get('MelisCoreConfig');
            $appConfigForm = $melisMelisCoreConfig->getItem('melistoolprospects/tools/melistoolprospects_tool_prospects/forms/melistoolprospects_tool_prospects_update');
            $appConfigForm = $appConfigForm['elements'];
            
            foreach ($errors as $keyError => $valueError)
            {
                foreach ($appConfigForm as $keyForm => $valueForm)
                {
                    if ($valueForm['spec']['name'] == $keyError &&
                        !empty($valueForm['spec']['options']['label']))
                        $errors[$keyError]['label'] = $valueForm['spec']['options']['label'];
                }
            }
        }

        $response = array(
            'success' => $success,
            'textTitle' => $textTitle,
            'textMessage' => $textMessage,
            'errors' => $errors
        );
        
        $this->getEventManager()->trigger('meliscmsprospects_toolprospects_save_end', $this, array_merge($response, array('typeCode' => 'CMS_PROSPECTS_UPDATE', 'itemId' => $id)));
         
        return new JsonModel($response);
        
    }
    
    /**
     * Checks wether the user has access to this tools or not
     * @return boolean
     */
    private function hasAccess($key)
    {
        $melisCoreAuth = $this->getServiceLocator()->get('MelisCoreAuth');
        $melisCoreRights = $this->getServiceLocator()->get('MelisCoreRights');
        $xmlRights = $melisCoreAuth->getAuthRights();
    
        $isAccessible = $melisCoreRights->isAccessiblecanAccess($key);
    
        return $isAccessible;
    }
    public function removeAllProspectDataAction()
    {
        $response = array();
        $this->getEventManager()->trigger('meliscmsprospects_toolprospects_delete_start', $this, $response);

        $translator = $this->getServiceLocator()->get('translator');
        $prospectTable = $this->getServiceLocator()->get('MelisProspects');
        $id = $this->params()->fromRoute('id', $this->params()->fromQuery('id', ''));



        return new JsonModel($response);
    }
}
