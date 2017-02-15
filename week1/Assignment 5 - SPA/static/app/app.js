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
            sections.toggle(window.location.hash);
            window.onhashchange = function () {
                sections.toggle(location.hash);
            };
        },
    };

    var sections = {
        toggle: function (route) {
            var getHashNumber = route.slice(-1);
            var allSectionElements = document.querySelectorAll("section");
            allSectionElements.forEach(function (section) {
                if (section.id === ("section" + getHashNumber)) {
                    section.classList.remove("hide");
                } else if (getHashNumber === "") {
                    allSectionElements[0].classList.remove("hide");
                } else {
                    section.classList.add("hide");
                }
            });
        }
    }
    app.init();

}());