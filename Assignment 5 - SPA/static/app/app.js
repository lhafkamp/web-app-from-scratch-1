/**
 * Created by Diego on 08-02-17.
 */

"use strict";


(function () {
    var app = {
        init: function() {
            routes.init();
        }
    };

    var routes = {
        init: function () {
            window.onhashchange = function () {
                sections.toggle(window.location.hash);
            };
        }
    };

    var sections = {
        toggle: function (route) {
            var getHashNumber = route.slice(-1);
            var allSectionElements = document.querySelectorAll("section");
            allSectionElements.forEach(function (section) {
                if (!section.classList.contains("section" + getHashNumber)) {
                    section.classList.remove("hide");
                } else {
                    section.classList.add("hide");
                }
            });
        }
    }
    app.init();

}());