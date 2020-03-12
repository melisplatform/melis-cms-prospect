<?php

/**
 * Melis Technology (http://www.melistechnology.com)
 *
 * @copyright Copyright (c) 2016 Melis Technology (http://www.melistechnology.com)
 *
 */

namespace MelisCmsProspects\Listener;

use Zend\EventManager\EventManagerInterface;
use Zend\EventManager\ListenerAggregateInterface;
use MelisCore\Listener\MelisCoreGeneralListener;

class MelisCmsProspectsTableColumnDisplayListener extends MelisCoreGeneralListener implements ListenerAggregateInterface
{
    public function attach(EventManagerInterface $events)
    {
        $sharedEvents      = $events->getSharedManager();

        $this->listeners[] = $sharedEvents->attach(
            '*',
            'melis_toolcreator_col_display_options',
            function ($e) {

                $sm = $e->getTarget()->getServiceLocator();
                $params = $e->getParams();
                $params['valueOptions']['prospect_name'] = $sm->get('translator')->translate('tr_melistoolprospects_tool_prospects');
            }
        );

        $this->listeners[] = $sharedEvents->attach(
            '*',
            'melis_tool_column_display_prospect_name',
            function($e){

                $sm = $e->getTarget()->getServiceLocator();
                $params = $e->getParams();

                $name = $params['data'];

                $prospectTbl    = $sm->get('MelisProspects');
                $prosData = $prospectTbl->getEntryById($params['data'])->current();
                if ($prosData)
                    $name = $prosData->pros_name;

                $params['data'] = $name;
            }
        );
    }
}