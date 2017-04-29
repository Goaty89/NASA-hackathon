import styles from './cenangBeachViewPage.css';
import {
  MONTH_LIST,
  QUALIFICATION_LIST,
  DELIVERY_MODE_LIST,
  STUDY_MODE_LIST,
  PROVIDER_LIST,
  CATEGORY_LIST
} from '../components/constants/FormData';

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 22;

if (Meteor.isClient) {
  Session.setDefault("slider", DEFAULTMINMONTHS);
  
  Template.cenangBeachViewPage.helpers({
    styles: styles
  });

  Template.cenangBeachViewPage.onRendered(function () {
  });

  Template.cenangBeachViewPage.events({
  });
}
