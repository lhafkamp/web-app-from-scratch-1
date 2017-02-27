/**
 * Created by Diego Staphorst on 27-02-2017.
 */
(function () {
    const $apiCache = {
        settings : {
            url: "https://randomuser.me/api/?results=100",
            gender: "both"
        },
        downloadApiData: () => {
            "use strict";
            fetch($apiCache.settings.url) //Kan dit niet met this?
                .then(data => data.json())
                .then(data => data.results)
                .then(data => localStorage.setItem("users", JSON.stringify(data)))
        },
    };


    const $userData = {
        showPersonsByGender : () => {
            let users = JSON.parse(localStorage.getItem("users")).filter((user) => user.gender === $apiCache.settings.gender || $apiCache.settings.gender === "both");
            fillTemplate(users, "users", "profile-picture")
        },
        filterByCountry : (e) => {
            "use strict";
            console.log($apiCache.settings.gender);
            console.log($apiCache.settings.gender !== 'both');
            if ($apiCache.settings.gender !== 'both') {
                fillTemplate(JSON.parse(localStorage.getItem("users")).filter((user) => $apiCache.settings.gender === user.gender && user.nat === e.target.getAttribute("country").toUpperCase()), "users", "profile-picture")
            } else {
                fillTemplate(JSON.parse(localStorage.getItem("users")).filter((user) =>  user.nat === e.target.getAttribute("country").toUpperCase()), "users", "profile-picture")
            }
        },
        showUser : (id) => {
            fillTemplate(JSON.parse(localStorage.getItem("users")).filter((user) => user.login.username === id), "user-information", "user-info")
        },
        clearUserInfo : () => {
            "use strict";
            const userInformationElement = document.getElementById("user-information");
            console.log(userInformationElement);
            const userPictureElement = document.getElementById("users");
            userPictureElement.innerHTML = "";
            userInformationElement.innerHTML = "";
        }
    };


    function fillTemplate(data, element, templateID) {
        const elementToFill = document.getElementById(element);
        const templateToFill = document.getElementById(templateID).innerHTML;
        const renderer = Handlebars.compile(templateToFill);
        let htmlForElement = data.reduce((html, user) => {return html + renderer(user)}, "");
        elementToFill.innerHTML = htmlForElement;
    };


    function initiateCountryLinks() {
        const countryFilter = Array.from(document.getElementsByClassName("flag"));
        countryFilter.forEach((country) => {country.addEventListener("click", $userData.filterByCountry)});
    }

    const app = {
        init: function() {
            "use strict";
            $apiCache.downloadApiData();
            initiateCountryLinks();
            routes.init();
        }
    };


    const routes = {
        init: function () {
            "use strict";
            routie({
                "*/" :  (gender) => {
                    sections.toggle(gender);
                },
                "*/:id" :  (gender, id) => {
                    sections.toggle(gender, id);
                },
            })
        }
    };


    const sections = {
        toggle: function (gender, id) {
            "use strict";
            $apiCache.settings.gender = gender;
            if (id) {
                $userData.showUser(id);
            } else {
                $userData.clearUserInfo();
                $userData.showPersonsByGender();
            }
        },
    };
    app.init();
}());