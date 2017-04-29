import styles from './safetyLocationPage.css';

if (Meteor.isClient) {
  Template.safetyLocationPage.helpers({
    styles: styles
  });

  Template.safetyLocationPage.onRendered(function () {
  });

  Template.safetyLocationPage.events({
  });
}
