import styles from './cheratingBeachViewPage.css';
import {
  CHERATING_DATA
} from '../components/constants/FormData';

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 22;

function getScreamFactor() {
  if (CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 7) {
    return "30";
  } else if (CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 4) {
    return "20";
  } else if (CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 3) {
    return "10";
  } else { return "0"; }
}

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
    },
    'suncreamFactor': function () {
      // if (dataSet[Session.get("slider")].uvLevel >= 11) {
      //   return "extreme";
      // } else if (dataSet[Session.get("slider")].uvLevel >= 8) {
      //   return "very high";
      // } else if (dataSet[Session.get("slider")].uvLevel >= 6) {
      //   return "high";
      // } else if (dataSet[Session.get("slider")].uvLevel >= 3) {
      //   return "moderate";
      // } else if (dataSet[Session.get("slider")].uvLevel >= 0) {
      //   return "low";
      // }
      return getScreamFactor();
    },
    'suncreamFactorIs': function (factor) {
      return getScreamFactor() === factor;
    },
    'UVI':function(){
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel;
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
