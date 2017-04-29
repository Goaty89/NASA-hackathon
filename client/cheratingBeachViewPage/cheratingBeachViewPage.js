import styles from './cheratingBeachViewPage.css';
import {
  MONTH_LIST,
  QUALIFICATION_LIST,
  DELIVERY_MODE_LIST,
  STUDY_MODE_LIST,
  PROVIDER_LIST,
  CATEGORY_LIST
} from '../components/constants/FormData';

const dataSet ={
  'date1':{
    '6':{
      'isRain':false,
      'isSun':true
    },
    '7':{
      'isRain':false,
      'isSun':true
    },
    '8':{
      'isRain':false,
      'isSun':true
    },
    '9':{
      'isRain':true,
      'isSun':false
    },
    '10':{
      'isRain':false,
      'isSun':true
    },
    '11':{
      'isRain':false,
      'isSun':true
    },
    '12':{
      'isRain':false,
      'isSun':true
    },
    '13':{
      'isRain':true,
      'isSun':false
    },
    '14':{
      'isRain':true,
      'isSun':false
    },
    '15':{
      'isRain':false,
      'isSun':true
    },
    '16':{
      'isRain':true,
      'isSun':false
    },
    '17':{
      'isRain':true,
      'isSun':false
    },
    '18':{
      'isRain':false,
      'isSun':true
    },
    '19':{
      'isRain':false,
      'isSun':true
    },
    '20':{
      'isRain':false,
      'isSun':true
    },
    '21':{
      'isRain':false,
      'isSun':true
    },
    '22':{
      'isRain':false,
      'isSun':true
    }
  },
  'date2':{
    '6':{
      'isRain':true,
      'isSun':false
    },
    '7':{
      'isRain':true,
      'isSun':false
    },
    '8':{
      'isRain':false,
      'isSun':true
    },
    '9':{
      'isRain':true,
      'isSun':false
    },
    '10':{
      'isRain':false,
      'isSun':true
    },
    '11':{
      'isRain':true,
      'isSun':false
    },
    '12':{
      'isRain':false,
      'isSun':true
    },
    '13':{
      'isRain':false,
      'isSun':true
    },
    '14':{
      'isRain':true,
      'isSun':false
    },
    '15':{
      'isRain':false,
      'isSun':true
    },
    '16':{
      'isRain':false,
      'isSun':true
    },
    '17':{
      'isRain':true,
      'isSun':false
    },
    '18':{
      'isRain':true,
      'isSun':false
    },
    '19':{
      'isRain':false,
      'isSun':true
    },
    '20':{
      'isRain':false,
      'isSun':true
    },
    '21':{
      'isRain':true,
      'isSun':false
    },
    '22':{
      'isRain':false,
      'isSun':true
    }
  },
  'date3':{
    '6':{
      'isRain':false,
      'isSun':true
    },
    '7':{
      'isRain':false,
      'isSun':true
    },
    '8':{
      'isRain':false,
      'isSun':true
    },
    '9':{
      'isRain':true,
      'isSun':false
    },
    '10':{
      'isRain':false,
      'isSun':true
    },
    '11':{
      'isRain':false,
      'isSun':true
    },
    '12':{
      'isRain':false,
      'isSun':true
    },
    '13':{
      'isRain':true,
      'isSun':false
    },
    '14':{
      'isRain':true,
      'isSun':false
    },
    '15':{
      'isRain':false,
      'isSun':true
    },
    '16':{
      'isRain':true,
      'isSun':false
    },
    '17':{
      'isRain':true,
      'isSun':false
    },
    '18':{
      'isRain':false,
      'isSun':true
    },
    '19':{
      'isRain':false,
      'isSun':true
    },
    '20':{
      'isRain':false,
      'isSun':true
    },
    '21':{
      'isRain':false,
      'isSun':true
    },
    '22':{
      'isRain':false,
      'isSun':true
    }
  }

}

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 22;

if (Meteor.isClient) {
  Session.setDefault("slider", DEFAULTMINMONTHS);
  Session.setDefault("date", 'date1');
  Template.cheratingBeachViewPage.helpers({
    styles: styles,
    'isRain': function () {
      return dataSet[Session.get("date")][Session.get("slider")].isRain;
    },
    'isSun': function () {
      return dataSet[Session.get("date")][Session.get("slider")].isSun;
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
