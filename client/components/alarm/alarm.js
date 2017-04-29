import styles from './alarm.css';
var song = new Audio('/music/song.mp3');
Template.alarm.onRendered(function () {
  Session.set("done", false);
  Session.set("finish", true);
  Session.set("timer",30);
  var countdown = new ReactiveCountdown(30);
  Session.set("countDown", countdown);
});

Template.alarm.helpers({
  styles: styles,
  getCountdown: function () {
    if (countdown.get() != 0)
      return countdown.get();
    else
      return "DONE";
  },
  done: function () {
    return Session.get("done");
  },
  finish: function () {
    return Session.get("finish");
  }
});
Template.alarm.events({
  "click #turnAlarm": function () {
    song.pause();
    Session.set("done", false);
    var countDown = Session.get("countDown");
    countDown.start(function () {
      song.play();
      Session.set("done", true);
    });
  },
  "click #doneAlarm": function () {
    song.pause();
    Session.set("finish", true);
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
  },
  "change #skin2": function () {
    Session.set("timer",20);
  },
  "change #skin3": function () {
    Session.set("timer",30);
  }
});

