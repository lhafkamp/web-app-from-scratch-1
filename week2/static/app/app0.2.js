/**
 * Created by Diego Staphorst on 23-2-2017.
 */
(function () {
    let $apiCache = {
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

    let $userData = {
        setUsers : () => {
            const userPictureElement = document.getElementById("users");
            const profileTemplate = document.getElementById("profile-picture").innerHTML;
            let renderer = Handlebars.compile(profileTemplate);
            let userPictures = $userData.userInformation.reduce((html, user) => {return html + renderer(user)}, "");
            userPictureElement.innerHTML = userPictures;
        },
        showUser : (id) => {
            const userInformationElement = document.getElementById("user-information");
            const userTableTemplate = document.getElementById("user-info").innerHTML;
            userInfo = $userData.userInformation.filter((user) => user.login.username === id)
            let renderer = Handlebars.compile(userTableTemplate);
            let userTableFilled = userInfo.reduce((html, user) => {return html + renderer(user)}, "");
            userInformationElement.innerHTML = userTableFilled;
        }
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
                "" : () => {
                    console.log("main");
                },
                "*/" :  (gender) => {
                    sections.toggle(gender);
                },
                "*/:id" :  (gender ,id) => {
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
                $apiCache.downloadApiData();
            }
        },
};
    app.init();
}());