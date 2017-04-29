import styles from './cheratingBeachViewPage.css';
import {
  MONTH_LIST,
  QUALIFICATION_LIST,
  DELIVERY_MODE_LIST,
  STUDY_MODE_LIST,
  PROVIDER_LIST,
  CATEGORY_LIST
} from '../components/constants/FormData';

const DEFAULTMINMONTHS = 9;
const DEFAULTMAXMONTHS = 23;

if (Meteor.isClient) {
  Session.setDefault("slider", DEFAULTMINMONTHS);
  Template.cheratingBeachViewPage.helpers({
  });

  Template.cheratingBeachViewPage.onRendered(function () {
  });

  Template.cheratingBeachViewPage.events({
  });
}
