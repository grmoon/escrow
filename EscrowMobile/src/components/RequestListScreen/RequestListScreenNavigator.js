import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createRequestListScreenController} from './RequestListScreenController';

const Tab = createBottomTabNavigator();

function RequestListScreenNavigator() {
  const IncomingRequestsListController = createRequestListScreenController({
    direction: 'incoming',
  });

  const OutgoingRequestsListController = createRequestListScreenController({
    direction: 'outgoing',
  });

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="IncomingRequests"
        component={IncomingRequestsListController}
      />
      <Tab.Screen
        name="OutoingRequests"
        component={OutgoingRequestsListController}
      />
    </Tab.Navigator>
  );
}

export default RequestListScreenNavigator;
