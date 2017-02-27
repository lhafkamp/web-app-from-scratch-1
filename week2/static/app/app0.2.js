/**
 * Created by Diego Staphorst on 23-2-2017.
 */
(function () {
    const $apiCache = {
        settings : {
            url: "https://randomuser.me/api/?results=30",
            gender: "both"
        },
        downloadApiData: () => {
            "use strict";
            fetch($apiCache.settings.url) //Kan dit niet met this?
                .then(data => data.json())
                .then(data => data.results)
                .then(data => data.filter((user) => "both" === $apiCache.settings.gender ? true: user.gender === $apiCache.settings.gender))
                .then(data => data.slice(0, 6))
                .then(data => $userData.userInformation = data)
                .then(data => $userData.setUsers())
        },
    };


    const $userData = {
        setUsers : () => {
            fillTemplate($userData.userInformation, "users", "profile-picture")
        },
        showUser : (id) => {
            fillTemplate($userData.userInformation.filter((user) => user.login.username === id), "user-information", "user-info")
        },
        clearUserInfo : () => {
            "use strict";
            const userInformationElement = document.getElementById("user-information");
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
        elementToFill.insertAdjacentHTML('afterbegin', htmlForElement);
    };


    const app = {
        init: function() {
            "use strict";
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
                $apiCache.downloadApiData();
            }
        },
};
    app.init();
}());