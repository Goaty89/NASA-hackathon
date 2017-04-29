import styles from './cheratingBeachViewPage.css';
import {
  CHERATING_DATA
} from '../components/constants/FormData';

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 22;
const PREVIEWTIME = [
  { key: "90", label: "1 hour 30 min" },
  { key: "60", label: "1 hour" },
  { key: "45", label: "45 min" },
  { key: "30", label: "30 min" },
  { key: "15", label: "15 min" }
];

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
    'isWind': function () {
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].isWind;
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
    'providerTimeLists': function () {
      return PREVIEWTIME;
    },
    'isSafetyRecommendationsDisplay': function () {
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 3 ? true : false;
    },
    'sunBathTimeSuggestion': function () {
      var returnValue = '1 Hours';
      var UVIndex = CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel;
      if (UVIndex >= 3 && UVIndex <= 4) {
        returnValue = '45 mins'
      } else if (UVIndex >= 5 && UVIndex <= 6) {
        returnValue = '30 min'
      } else if (UVIndex >= 7 && UVIndex <= 9) {
        returnValue = '15 min'
      } else if (UVIndex >= 10) {
        returnValue = '< 10 min'
      }
      return returnValue;
    },

    'needSunglass': function () {
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 3;
    },
    'needHat': function () {
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 6;
    },
    'needShades': function () {
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 8;
    },
    'warningMessage': function () {
      if (CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 11) {
        return styles.showWarningMessage;
      }
    },
    'skinResult':function(){
      return Session.get('skinDamage');
    }
  });

  Template.cheratingBeachViewPage.onRendered(function () {
  });

  Template.cheratingBeachViewPage.events({
    "change #date1": function () {
      Session.set("date", 'date1');
    },
    "change #date2": function () {
      Session.set("date", 'date2');
    },
    "change #date3": function () {
      Session.set("date", 'date3');
    },
    "change #dropDownTime": function () {
      var timeValue = $("#dropDownTime").val();
      var UVIndex = CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel;
      if (UVIndex >= 3 && UVIndex <= 4) {
        if (timeValue >= 45 && timeValue < 60) {
          $("#imgToast").attr("src", "/images/toast-yellow.png");
          return Session.set('skinDamage','Good and Enjoy');
        }
        else if (timeValue >= 60) {
          $("#imgToast").attr("src", "/images/toast-dark.png");
          return Session.set('skinDamage','Skin burnt');
        }
        else {
          $("#imgToast").attr("src", "/images/toast-white.png");
        }
      } else if (UVIndex >= 5 && UVIndex <= 6) {
        if (timeValue >= 30 && timeValue < 45) {
          $("#imgToast").attr("src", "/images/toast-yellow.png");
          return Session.set('skinDamage','Good and Enjoy');
        }
        else if (timeValue >= 45 && timeValue < 60) {
          $("#imgToast").attr("src", "/images/toast-dark.png");
          return Session.set('skinDamage','Skin burnt');
        }
        else if (timeValue >= 60) {
          $("#imgToast").attr("src", "/images/toast-dark-sweat.png");
          return Session.set('skinDamage','Aww.. skin hurt');
        }
        else {
          $("#imgToast").attr("src", "/images/toast-white.png");
        }
      } else if (UVIndex >= 7 && UVIndex <= 9) {
        returnValue = '15 min'
        if (timeValue >= 15 && timeValue < 30) {
          $("#imgToast").attr("src", "/images/toast-yellow.png");
          return Session.set('skinDamage','Good and Enjoy');
        }
        else if (timeValue >= 30 && timeValue < 45) {
          $("#imgToast").attr("src", "/images/toast-dark.png");
          return Session.set('skinDamage','Skin burnt');
        }
        else if (timeValue >= 45) {
          $("#imgToast").attr("src", "/images/toast-dark-sweat.png");
          return Session.set('skinDamage','Aww.. skin hurt');
        }
        else {
          $("#imgToast").attr("src", "/images/toast-white.png");
        }
      } else if (UVIndex >= 10) {
        returnValue = '< 10 min'
        if (timeValue >= 10 && timeValue < 15) {
          $("#imgToast").attr("src", "/images/toast-yellow.png");
          return Session.set('skinDamage','Good and Enjoy');
        }
        else if (timeValue >= 15 && timeValue < 30) {
          $("#imgToast").attr("src", "/images/toast-dark.png");
          return Session.set('skinDamage','Skin burnt');
        }
        else if (timeValue >= 30) {
          $("#imgToast").attr("src", "/images/toast-dark-sweat.png");
          return Session.set('skinDamage','Aww.. skin hurt');
        }
        else {
          $("#imgToast").attr("src", "/images/toast-white.png");
        }
      } else {
        $("#imgToast").attr("src", "/images/toast-white.png");
      }
    }
  });
}
