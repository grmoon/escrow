import React from 'react';
import {
  Avatar,
  Subheading,
  Button,
  Text,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';

import {format, formatDistanceToNow} from 'date-fns';

function renderViewButton(props) {
  const {request, incoming} = props;
  const payload = incoming ? request.payload : request.response.payload;

  return <Button onPress={() => props.onViewPress(payload)}>View</Button>;
}

function renderRespondButton(props) {
  const {request, incoming} = props;

  return incoming ? (
    <Button onPress={() => props.onRespondPress(request)}>Respond</Button>
  ) : (
    <Text>Awaiting Response</Text>
  );
}

function renderButton(props) {
  const {request} = props;

  return request.response === null
    ? renderRespondButton(props)
    : renderViewButton(props);
}

function RequestPreviewView(props) {
  const {request} = props;
  const createdAt = new Date(request.created_at);

  const distanceToNow = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });
  const formattedDate = format(createdAt, 'PPPPpppp');

  return (
    // <View>
    //   <Text>From: {request.sender} </Text>
    //   <Text>Description: {request.description}</Text>
    //   {renderButton(props)}
    // </View>
    <Card key={request.id}>
      {/* <Card.Title
        title="Card Title"
        subtitle="Card Subheading"
        left={props => <Avatar.Icon {...props} icon="folder" />}
      /> */}
      <Card.Content>
        <Title>{request.description}</Title>
        <Subheading>{distanceToNow}</Subheading>
        <Paragraph>{request.sender}</Paragraph>
      </Card.Content>
      {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
      <Card.Actions>{renderButton(props)}</Card.Actions>
    </Card>
  );
}

export default RequestPreviewView;
