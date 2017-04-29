import styles from './safetyInformationPage.css';

if (Meteor.isClient) {
  Template.safetyInformationPage.helpers({
    styles: styles
  });

  Template.safetyInformationPage.onRendered(function () {
  });

  Template.safetyInformationPage.events({
  });
}
