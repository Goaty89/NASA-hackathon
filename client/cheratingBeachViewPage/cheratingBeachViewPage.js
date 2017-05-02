import styles from './cheratingBeachViewPage.css';
import {
  CHERATING_DATA
} from '../components/constants/FormData';
var song = new Audio('/music/song.mp3');

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 22;
const PREVIEWTIME = [
  { key: "90", label: "1 hour 30 min" },
  { key: "60", label: "1 hour" },
  { key: "45", label: "45 min" },
  { key: "30", label: "30 min" },
  { key: "15", label: "15 min" }
];

const greatSkinCare = {"value":"Let's Toast a bit longer","img":"/images/toast-white.png"};
const goodSkinCare = {"value":"Perfect Toast","img":"/images/toast-yellow.png"};
const badSkinCare = {"value":"Skin Burnt a bit over Toast","img":"/images/toast-dark.png"};
const horribleSkinCare = {"value":"Aww.. Toasted badly...","img":"/images/toast-dark-sweat.png"};

const skinDamage = {
  "0":greatSkinCare,
  "1":goodSkinCare,
  "2":badSkinCare,
  "3":horribleSkinCare,
}

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
  Session.setDefault('skinTone','fair');
  Template.cheratingBeachViewPage.helpers({
    styles: styles,
    done: function () {
      return Session.get("done");
    },
    finish: function () {
      return Session.get("finish");
    },
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
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 3 ||
        CHERATING_DATA[Session.get("date")][Session.get("slider")].isRain;
    },
    'sunBathTimeSuggestion': function () {
      var returnValue = 60;
      var UVIndex = CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel;
      
      if (UVIndex >= 3 && UVIndex <= 4) {
        returnValue = 45
      } else if (UVIndex >= 5 && UVIndex <= 6) {
        returnValue = 30
      } else if (UVIndex >= 7 && UVIndex <= 9) {
        returnValue = 15
      } else if (UVIndex >= 10) {
        returnValue = 10
      }
      var skintone = Session.get('skinTone');
      if(skintone == "normal"){
        returnValue += 15;
      } else if (skintone == "dark"){
        returnValue += 30;
      }
      if(returnValue>60){
        var totalMin = returnValue;
        var Hour = parseInt(totalMin / 60);
        returnValue = Hour+" Hour";
        if(totalMin - (Hour * 60)>1){
          returnValue += totalMin - (Hour * 60) + " Min";
        }
      }
      else
      {
        returnValue = returnValue + "min";
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
      return CHERATING_DATA[Session.get("date")][Session.get("slider")].isRain || CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 8;
    },
    'warningMessage': function () {
      if (CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel >= 11) {
        return styles.showWarningMessage;
      }
    },
    'skinResult': function () {
      return Session.get('skinDamage');
    }
  });

  Template.cheratingBeachViewPage.onRendered(function () {
    Session.set("done", false);
    Session.set("finish", true);
    Session.set("timer",10);
    var countdown = new ReactiveCountdown(10);
    Session.set("countDown", countdown);
  });

  Template.cheratingBeachViewPage.events({
    "click #turnAlarm": function () {
      song.pause();
      Session.set("done", false);
      var countdown = new ReactiveCountdown(Session.get("timer"));
      countdown.start(function () {
        song.play();
        Session.set("done", true);
      });
    },
    "click #doneAlarm": function () {
      song.pause();
      Session.set("done", false);
      Session.set("finish", true);
      Session.set("timer",10);
      var countdown = new ReactiveCountdown(10);
      Session.set("countDown", countdown);
    },
    "click #start": function () {
      var countdown = new ReactiveCountdown(Session.get("timer"));
      countdown.start(function () {
        song.play();
        Session.set("done", true);
      });
      Session.set("finish", false);
    },
    "change #skin1": function () {
      Session.set("timer",10);
      Session.set('skinTone','fair');
    },
    "change #skin2": function () {
      Session.set("timer",20);
      Session.set('skinTone','normal');
    },
    "change #skin3": function () {
      Session.set("timer",30);
      Session.set('skinTone','dark');
    },
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
      function greatCare(){
        $("#imgToast").attr("src", skinDamage[0]["img"]);
        Session.set('skinDamage',skinDamage[0]["value"]);
      }
      function goodCare(){
        $("#imgToast").attr("src", skinDamage[1]["img"]);
        Session.set('skinDamage',skinDamage[1]["value"]);
      }
      function badCare(){
        $("#imgToast").attr("src", skinDamage[2]["img"]);
        Session.set('skinDamage',skinDamage[2]["value"]);
      }
      function horribleCare(){
        $("#imgToast").attr("src", skinDamage[3]["img"]);
        Session.set('skinDamage',skinDamage[3]["value"]);
      }
      var timeValue = $("#dropDownTime").val();
      var UVIndex = CHERATING_DATA[Session.get("date")][Session.get("slider")].uvLevel;
      var skintone = Session.get('skinTone');
      if(skintone == "normal"){
        timeValue -= 15;
      } else if (skintone == "dark"){
        timeValue -= 30;
      }
      if (UVIndex >= 3 && UVIndex <= 4) {
        if (timeValue >= 45 && timeValue < 60) {
          goodCare();
        }
        else if (timeValue >= 60) {
          badCare();
        }
        else {
          greatCare();
        }
      } else if (UVIndex >= 5 && UVIndex <= 6) {
        if (timeValue >= 30 && timeValue < 45) {
          goodCare();
        }
        else if (timeValue >= 45 && timeValue < 60) {
          badCare();
        }
        else if (timeValue >= 60) {
          horribleCare();
        }
        else {
          greatCare();
        }
      } else if (UVIndex >= 7 && UVIndex <= 9) {
        returnValue = '15 min'
        if (timeValue >= 15 && timeValue < 30) {
          goodCare();
        }
        else if (timeValue >= 30 && timeValue < 45) {
          badCare();
        }
        else if (timeValue >= 45) {
          horribleCare();
        }
        else {
          greatCare();
        }
      } else if (UVIndex >= 10) {
        returnValue = '< 10 min'
        if (timeValue >= 10 && timeValue < 15) {
          goodCare();
        }
        else if (timeValue >= 15 && timeValue < 30) {
          badCare();
        }
        else if (timeValue >= 30) {
          horribleCare();
        }
        else {
          greatCare();
        }
      } else {
        greatCare();
      }
    }
  });
}
