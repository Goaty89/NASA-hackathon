var map;
var geocoder;
var HomeIcon = "../Styles/Images/Home_30x39.png";
var BeachIcon = "../Styles/Images/beach.png";
var DataXMLSource = "../beach.xml"; //"../data.xml";

function initialize() {
  var mapOptions = {
    //center: new google.maps.LatLng(lat, lng),
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    draggable: true
  };

  map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

  console.log('==> what is my map?', map);

  geocoder = new google.maps.Geocoder();
  getLocation();
  //TestAJAX();
  GetMarkersFromXML();
  //var marker = new google.maps.Marker({
  //  position: { lat: 3.204531, lng: 101.736072 },
  //  map: map
  //});
}

function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  var currentPosition = new google.maps.LatLng(lat, lng);
  //var currentPosition = new google.maps.
  console.log(currentPosition);
  //var myLatlng = new google.maps.LatLng(37.4419, -122.1419);

  map.setCenter(currentPosition);
  //map.setCenter(myLatlng);

  //AddMarker(lat, lng, map);
  //AddMarker(lat-1, lng-1, map, HomeIcon);
  //AddMarker(2.940984,101.808876,map,HomeIcon);
  //var marker = new google.maps.Marker({
  //  position: { lat: lat, lng: lng },
  //  map: map
  //});
}

function AddMarker(lat, lng, map) {
  return new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: "You are here!",
    //animation: google.maps.Animation.BOUNCE,
  });
}

function AddMarker(lat, lng, title, icon) {
  //var iconMarker = {
  //  url: icon, // url
  //  scaledSize: new google.maps.Size(80, 80)
  //};

  return new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: title,
    icon: icon
  });
}

function CodeAddress(address) {
  var address = document.getElementById('address').value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      //var marker = new google.maps.Marker({
      //	map: map,
      //	position: results[0].geometry.location
      //});
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function GetMarkersFromXML() {
  // For more information on doing XMLHR with jQuery, see these resources:
  // http://net.tutsplus.com/tutorials/javascript-ajax/use-jquery-to-retrieve-data-from-an-xml-file/
  // http://marcgrabanski.com/article/jquery-makes-parsing-xml-easy
  jQuery.get(DataXMLSource, {}, function (data) {
    jQuery(data).find("marker").each(function () {
      var marker = jQuery(this);
      //var latlng = new google.maps.LatLng(parseFloat(marker.attr("lat")),
      //                            parseFloat(marker.attr("lng")));
      //var marker = new google.maps.Marker({position: latlng, map: map});

      var dataMarker = AddMarker(parseFloat(marker.attr("lat")), parseFloat(marker.attr("lng")), marker.attr("title"), BeachIcon);

      var infowindow = new google.maps.InfoWindow(
        {
          content: "<a target='blank' href='" + marker.attr("link") + "'>" + marker.attr("title") + "</a>" + "<br />",
          //+ marker.attr("lat") + "," + marker.attr("lng"),
          size: new google.maps.Size(50, 50)
        });
      //{
      //	//content: "<a target='blank' href='" + marker.attr("link") + "'>" + marker.attr("title") + "</a>",
      //	content: marker.attr("title"),
      //	size: new google.maps.Size(50, 50)
      //});

      //infowindow.open(map, dataMarker);

      google.maps.event.addListener(dataMarker, 'click', function () {
        map.setZoom(10);
        map.setCenter(dataMarker.getPosition());
        infowindow.open(map, dataMarker)
      });
    });
  })
    .fail(function () {
      alert("error");
    });
}

function TestAJAX() {
  // Assign handlers immediately after making the request,
  // and remember the jqxhr object for this request
  var jqxhr = $.get("../data.xml", function () {
    alert("success");
  })
    .done(function () {
      alert("second success");
    })
    .fail(function () {
      alert("error");
    })
    .always(function () {
      alert("finished");
    });

  //Perform other work here ...

  // Set another completion function for the request above
  jqxhr.always(function () {
    alert("second finished");
  });
}

console.log('==> trying to load map');
google.maps.event.addDomListener(window, 'load', initialize);