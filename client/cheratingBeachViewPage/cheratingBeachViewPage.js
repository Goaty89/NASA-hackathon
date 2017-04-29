import styles from './cheratingBeachViewPage.css';
import {
  MONTH_LIST,
  QUALIFICATION_LIST,
  DELIVERY_MODE_LIST,
  STUDY_MODE_LIST,
  PROVIDER_LIST,
  CATEGORY_LIST
} from '../components/constants/FormData';

const dataSet = {
  '6': {
    'uvLevel': 0,
    'isRain': false,
    'isSun': true
  },
  '7': {
    'uvLevel': 0,
    'isRain': false,
    'isSun': true
  },
  '8': {
    'uvLevel': 0,
    'isRain': false,
    'isSun': true
  },
  '9': {
    'uvLevel': 2,
    'isRain': true,
    'isSun': false
  },
  '10': {
    'uvLevel': 5,
    'isRain': false,
    'isSun': true
  },
  '11': {
    'uvLevel': 8,
    'isRain': false,
    'isSun': true
  },
  '12': {
    'uvLevel': 11,
    'isRain': false,
    'isSun': true
  },
  '13': {
    'uvLevel': 11,
    'isRain': true,
    'isSun': false
  },
  '14': {
    'uvLevel': 11,
    'isRain': true,
    'isSun': false
  },
  '15': {
    'uvLevel': 9,
    'isRain': false,
    'isSun': true
  },
  '16': {
    'uvLevel': 6,
    'isRain': true,
    'isSun': false
  },
  '17': {
    'uvLevel': 3,
    'isRain': true,
    'isSun': false
  },
  '18': {
    'uvLevel': 1,
    'isRain': false,
    'isSun': true
  },
  '19': {
    'uvLevel': 0,
    'isRain': false,
    'isSun': true
  },
  '20': {
    'uvLevel': 0,
    'isRain': false,
    'isSun': true
  },
  '21': {
    'uvLevel': 0,
    'isRain': false,
    'isSun': true
  },
  '22': {
    'uvLevel': 0,
    'isRain': false,
    'isSun': true
  }
}

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 22;

function getScreamFactor() {
  if (dataSet[Session.get("slider")].uvLevel >= 7) {
    return "30";
  } else if (dataSet[Session.get("slider")].uvLevel >= 4) {
    return "20";
  } else if (dataSet[Session.get("slider")].uvLevel >= 3) {
    return "10";
  } else { return "0"; }
}

if (Meteor.isClient) {
  Session.setDefault("slider", DEFAULTMINMONTHS);
  Template.cheratingBeachViewPage.helpers({
    styles: styles,
    'isRain': function () {
      return dataSet[Session.get("slider")].isRain;
    },
    'isSun': function () {
      return dataSet[Session.get("slider")].isSun;
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
    }
  });

  Template.cheratingBeachViewPage.onRendered(function () {
  });

  Template.cheratingBeachViewPage.events({
  });
}
