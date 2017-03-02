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


    const $userDataController = {
        filterUsersByGender : () => {
            let users = JSON.parse(localStorage.getItem("users")).filter((user) => user.gender === $apiCache.settings.gender || $apiCache.settings.gender === "both");
            userDataView.fillTemplate(users, "users", "profile-picture")
        },
        filterUsersByCountry : (e) => {
            "use strict";
            $userDataController.clearUserInfo();
            if ($apiCache.settings.gender !== 'both') {
                userDataView.fillTemplate(JSON.parse(localStorage.getItem("users")).filter((user) => $apiCache.settings.gender === user.gender && user.nat === e.target.getAttribute("country").toUpperCase()), "users", "profile-picture")
            } else {
                userDataView.fillTemplate(JSON.parse(localStorage.getItem("users")).filter((user) =>  user.nat === e.target.getAttribute("country").toUpperCase()), "users", "profile-picture")
            }
            $userDataController.sortByUserName();
        },
        showSpecificUser : (id) => {
            userDataView.fillTemplate(JSON.parse(localStorage.getItem("users")).filter((user) => user.login.username === id), "user-information", "user-info")
        },
        sortByUserName() {
            "use strict";
            const sortParentElement = document.getElementById("sorter");
            const sortUsersCheckbox = document.getElementById("sorter-checkbox");
            if (sortUsersCheckbox.checked) {
                console.log("hey");
                sortParentElement.style.backgroundColor = "#313e3e";
                const allUsersShown = Array.from(document.querySelectorAll('#users div'));
                const orderedUsersNames = allUsersShown.sort((a, b) => a.innerText > b.innerText ? 1 : -1);
                let orderedUsersData = [];

                orderedUsersNames.map((orderedUser) => {
                    JSON.parse(localStorage.getItem("users")).map((allUser) => {
                        if (allUser.login.username === orderedUser.innerText.trim()) orderedUsersData.push(allUser);
                    });
                });
                userDataView.fillTemplate(orderedUsersData, "users", "profile-picture");
            } else {
                sortParentElement.style.backgroundColor = "#485A5A";
            }
        },
        clearUserInfo : () => {
            "use strict";
            const userInformationElement = document.getElementById("user-information");
            const userPictureElement = document.getElementById("users");
            userPictureElement.innerHTML = "";
            userInformationElement.innerHTML = "";
        }
    };

    const userDataView = {
        fillTemplate : (data, element, templateID) => {
            "use strict";
            console.log(data);
            const elementToFill = document.getElementById(element);
            const templateToFill = document.getElementById(templateID).innerHTML;
            const renderer = Handlebars.compile(templateToFill);
            let htmlForElement = data.reduce((html, user) => {return html + renderer(user)}, "");
            elementToFill.innerHTML = htmlForElement;
        },
        initiateCountryFilters : () => {
            "use strict";
            const countryFilter = Array.from(document.getElementsByClassName("flag"));
            countryFilter.map((country) => {country.addEventListener("click", $userDataController.filterUsersByCountry)});
        },
        initiateSort : () => {
            "use strict";
            const sortFilter = document.getElementById("sorter-checkbox");
            sortFilter.addEventListener("click", $userDataController.sortByUserName)
        }
    };


    const app = {
        init: function() {
            "use strict";
            if (!localStorage.getItem("users")) {
                $apiCache.downloadApiData();
            }
            routes.init();
            userDataView.initiateCountryFilters(); // Misschien op andere manier
            userDataView.initiateSort(); // Misschien op andere manier
        }
    };


    const routes = {
        init: function () {
            "use strict";
            routie({
                "" : (gender) => {
                    sections.toggle("both");
                },
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
                $userDataController.clearUserInfo();
                $userDataController.filterUsersByGender();
                $userDataController.showSpecificUser(id);
                $userDataController.sortByUserName();

            } else {
                $userDataController.clearUserInfo();
                $userDataController.filterUsersByGender();
                $userDataController.sortByUserName();

            }
        },
    };
    app.init();
}());