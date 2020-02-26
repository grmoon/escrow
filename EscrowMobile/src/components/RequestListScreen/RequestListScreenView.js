import React from 'react';
import {Divider} from 'react-native-paper';
import {SafeAreaView, ScrollView, RefreshControl} from 'react-native';

import RequestPreviewController from '../RequestPreview/RequestPreviewController';

function RequestListScreenView(props) {
  const {refreshing, onRefresh, requests, incoming} = props;

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {requests.map(request => (
          <React.Fragment key={request.id}>
            <RequestPreviewController request={request} incoming={incoming} />
            <Divider />
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default RequestListScreenView;
