import CameraScreenController from '../components/CameraScreen/CameraScreenController';
import CreateRequestScreenController from '../components/CreateRequestScreen/CreateRequestScreenController';
import CreateResponseScreenController from '../components/CreateResponseScreen/CreateResponseScreenController';
import HomeScreenController from '../components/HomeScreen/HomeScreenController';
import PayloadScreenController from '../components/PayloadScreen/PayloadScreenController';
import RequestDetailScreenController from '../components/RequestDetailScreen/RequestDetailScreenController';
import RequestListScreenNavigator from '../components/RequestListScreen/RequestListScreenNavigator';

export const APP_SCREENS = [
  {
    name: 'Home',
    component: HomeScreenController,
  },
  {
    name: 'CreateRequest',
    component: CreateRequestScreenController,
  },
  {
    name: 'RequestDetail',
    component: RequestDetailScreenController,
  },
  {
    name: 'RequestList',
    component: RequestListScreenNavigator,
  },
  {
    name: 'CreateResponse',
    component: CreateResponseScreenController,
  },
  {
    name: 'Camera',
    component: CameraScreenController,
  },
  {
    name: 'Payload',
    component: PayloadScreenController,
  },
];
