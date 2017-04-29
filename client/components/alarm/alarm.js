import styles from './alarm.css';

var countdown = new ReactiveCountdown(30);
var song = new Audio('/music/song.mp3');

Template.alarm.onRendered(function () {
    Session.set("done", false);
    Session.set("finish", true);
});

Template.alarm.helpers({
    styles: styles,
    getCountdown: function() {
        if(countdown.get() != 0)
            return countdown.get();
        else
            return "DONE";
    },
    done: function() {
        return Session.get("done");
    },
    finish: function() {
        return Session.get("finish");
    }
});
Template.alarm.events({
    "click #turnAlarm": function() {
        song.pause();
        Session.set("done", false);
        countdown.start(function() {
            song.play();
            Session.set("done", true);
        });
    },
    "click #doneAlarm": function() {
        song.pause();
        Session.set("finish", true);
    },
    "click #start": function() {
        countdown.start(function() {
            song.play();
            Session.set("done", true);
        });
        Session.set("finish", false);
    },
    "change #skin1": function() {
        countdown.add(10);
        console.log(countdown.get());
    },
    "change #skin2": function() {
        countdown.add(20);
        console.log(countdown.get());
    },
    "change #skin3": function() {
        countdown.add(30);
        console.log(countdown.get());
    }
});

