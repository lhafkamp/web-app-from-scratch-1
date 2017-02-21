/***
 * cmdaan.js
 *   Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
 *   zijn tijdens het techniek college in week 5.
 *
 *   Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
 *   Credit: Dive into html5, geo.js, Nicholas C. Zakas
 *
 *   Copyleft 2012, all wrongs reversed.
 *
 *   Edited by: Diego for assignment 4
 */


(function () {
    "use strict";
    var defaultSettings = {
        sandbox: "SANDBOX",
        lineair: "LINEAIR",
        gpsAvailable: "GPS_AVAILABLE",
        gpsUnavailable: "GPS_UNAVAILABLE",
        positionUpdated: "POSITION_UPDATED",
        refreshRate: 1000,
        currentPosition: false,
        customDebugging: false,
        debugId: false,
        map: false,
        interval: false,
        intervalCounter: 0,
        updateMap: false,
        locatieRij: [],
        markerRij: []
    };
    var EventTarget = {
        listeners = {},
        EventTarget.prototype = {
            constructor: EventTarget, addListener: function (a, c) {
                this.listeners[a] === [] && "undefined" === typeof this.listeners[a];
                this.listeners[a].push(c);
            }, fire: function (a) {
                "string" === typeof a && (a = {type: a});
                a.target || (a.target = this);
                if (!a.type) {
                    throw Error("Event object missing 'type' property.");
                }
                if (this.listeners[a.type] instanceof Array) {
                    for (var c = this.listeners[a.type], b = 0, d = c.length; b < d; b++) {
                        c[b].call(this, a);
                    }
                }
            }, removeListener: function (a, c) {
                if (this.listeners[a] instanceof Array) {
                    for (var b = this.listeners[a], d = 0, e = b.length; d < e; d++) {
                        if (b[d] === c) {
                            b.splice(d, 1);
                            break;
                        }
                    }
                }
            }
        };
}
    var ET = new EventTarget();
    var gpsSettings = {
        init : function() {
            debugMessage("Controleer of GPS beschikbaar is...");
            ET.addListener(defaultSettings.gpsAvailable, startInterval());
            ET.addListener(defaultSettings.gpsUnavailable, function () {
                debugMessage("GPS is niet beschikbaar.");
            });

            (geo_position_js.init()) ? ET.fire(defaultSettings.gpsAvailable) : ET.fire(defaultSettings.gpsUnavailable);
        },
        startInterval : function(event) {
            ("GPS is beschikbaar, vraag positie.");
            updatePosition();
            defaultSettings.interval = self.setInterval(updatePosition, defaultSettings.refreshRate);
            ET.addListener(defaultSettings.positionUpdated, check);
        },
        updatePosition: function() {
            defaultSettings.intervalCounter++;
            geo_position_js.getCurrentPosition(setPostion, geoErrorHandler, {enableHighAccuracy: true});
        },
        setPostion : function (position) {
            defaultSettings.currentPosition = position;
            ET.fire("POSITION_UPDATED");
            debugMessage(intervalCounter + " positie lat:" + position.coords.latitude + " long:" + position.coords.longitude);
        },
        check :function (event) {
            for (var i = 0; i < locations.length; i++) {
                var location = {coords: {latitude: locations[i][3], longitude: locations[i][4]}};
                if (calculateDistance(location, currentPosition) < locations[i][2]) {
                    if (window.location != locations[i][1] && localStorage[locations[i][0]] == "false") {
                        try {
                            (localStorage[locations[i][0]] == "false") ? localStorage[locations[i][0]] = 1 : localStorage[locations[i][0]]++;
                        } catch (error) {
                            debugMessage("Localstorage kan niet aangesproken worden: " + error);
                        }
                        window.location = locations[i][1];
                        debugMessage("Speler is binnen een straal van " + locations[i][2] + " meter van " + locations[i][0]);
                    }
                }
            }
        },
        calculateDistance: function(p1, p2) {
            var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
            var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
            return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
        }
    };

    function generateMap (myOptions, canvasID) {
        debugMessage("Genereer een Google Maps kaart en toon deze in #" + canvasId);
        var map = new google.maps.Map(document.getElementById(canvasId), myOptions);
        var routeList = [];
        debugMessage("Locaties intekenen, tourtype is: " + tourType);
        for (var i = 0; i < locaties.length; i++) {
            try {
                (localStorage.visited == undefined || isNumber(localStorage.visited)) ? localStorage[locaties[i][0]] = false : null;
            } catch (error) {
                debugMessage("Localstorage kan niet aangesproken worden: " + error);
            }

            var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
            routeList.push(markerLatLng);

            markerRij[i] = {};
            for (var attr in locatieMarker) {
                markerRij[i][attr] = locatieMarker[attr];
            }
            markerRij[i].scale = locaties[i][2] / 3;

            var marker = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                icon: markerRij[i],
                title: locaties[i][0]
            });
        }
        if (tourType == LINEAIR) {
            // Trek lijnen tussen de punten
            debugMessage("Route intekenen");
            var route = new google.maps.Polyline({
                clickable: false,
                map: map,
                path: routeList,
                strokeColor: "Black",
                strokeOpacity: .6,
                strokeWeight: 3
            });

        }
        var currentPositionMarker = new google.maps.Marker({
            position: kaartOpties.center,
            map: map,
            icon: positieMarker,
            title: "U bevindt zich hier"
        });

        ET.addListener(POSITION_UPDATED, update_positie);

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        function update_positie(event) {
            var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
            map.setCenter(newPos);
            currentPositionMarker.setPosition(newPos);
        };
    }
    var debuggerHandlers = {
        geoErrorHandler : function (code, message) {
            debugMessage("geo.js error " + code + ": " + message);
        },
        debugMessage : function(message) {
            (customDebugging && debugId) ? document.getElementById(debugId).innerHTML : console.log(message);
        },
        setCustomDebugging : function(debugId) {
            debugId = this.debugId;
            customDebugging = true;
        }
    }
}());

//Google maps api
//Debugger
//Event


