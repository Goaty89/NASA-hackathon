import styles from './cheratingBeachViewPage.css';
import {
  CHERATING_DATA
} from '../components/constants/FormData';

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 22;

if (Meteor.isClient) {

  Session.setDefault("slider", DEFAULTMINMONTHS);
  Session.setDefault("date", 'date1');
  Template.cheratingBeachViewPage.helpers({
    styles: styles,
    'isRain': function () {
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].isRain;
    },
    'isSun': function () {
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].isSun;
    }
  });

  Template.cheratingBeachViewPage.onRendered(function () {
  });

  Template.cheratingBeachViewPage.events({
    "change #date1": function() {
      Session.set("date", 'date1');
    },
    "change #date2": function() {
      Session.set("date", 'date2');
    },
    "change #date3": function() {
      Session.set("date", 'date3');
    }
  });
}
