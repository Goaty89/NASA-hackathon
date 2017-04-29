import styles from './date.css';

Template.date.helpers({
    styles: styles,
    date: function () {
        return ["29-Apr-2017", "30-Apr-2017", "1-May-2017", "2-May-2017"]
    }
});

Template.date.events({
    "change #date-select": function (event, template) {
        var date = $(event.currentTarget).val();
        console.log("date : " + date);
        // additional code to do what you want with the category
    }
});

