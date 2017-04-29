import styles from './beachViewPage.css';
import {
  MONTH_LIST,
  QUALIFICATION_LIST,
  DELIVERY_MODE_LIST,
  STUDY_MODE_LIST,
  PROVIDER_LIST,
  CATEGORY_LIST
} from '../components/constants/FormData';

const DEFAULTMINMONTHS = 6;
const DEFAULTMAXMONTHS = 19;

if (Meteor.isClient) {
  Session.setDefault("slider", DEFAULTMINMONTHS);
  Template.HoursDurationFilter.rendered = function () {
    this.$("#slider").noUiSlider({
      start: DEFAULTMINMONTHS,
      step: 1, // Slider moves in increments of '10'
      // margin: 20, // Handles must be more than '20' apart
      behaviour: 'tap-drag', // Move handle on tap, bar is draggable
      tooltips: true,
      connect: "lower",
      range: {
        'min': DEFAULTMINMONTHS,
        'max': DEFAULTMAXMONTHS
      },
      format: wNumb({
        decimals: 0
      })
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      Session.set('slider', val);
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      Session.set('slider', val);
    })
  };

  Template.HoursDurationFilter.helpers({
    slider: function () {
      var sliderString = Session.get("slider");
      sliderString = sliderString > 12 ? (sliderString - 12) + " pm" : (sliderString == 12 ? sliderString + " pm" : sliderString + " am");
      return sliderString;
    }
  });
  Template.beachViewPage.helpers({
    styles: styles
  });

  Template.beachViewPage.onRendered(function () {
  });

  Template.beachViewPage.events({
  });
}
