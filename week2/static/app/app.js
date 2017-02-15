/**
 * Created by Diego on 13-02-17.
 */

/**
* Using API's

 *
 *  With this this I'll ask the end-user to put a location in the input textfield. With this information input the api
 *  wunderground is used for weather prediction.
* */
// Example filter, map and reduce
// console.log(
//     [1,2,3,4,5]
//         .filter((el) => {return el < 5;})
//         .map((el) => {return "<h1>" + el + "<h1>\r\n";})
//         .reduce((buffer, el) => {return buffer + el;})
// );



(function () {
    let app = {
        init: function() {
            routes.init();
        }
    };

    let routes = {
        init: function () {
            routie({
                'male_female': function() {
                    sections.toggle(location.hash)
                },
                'male': function() {
                    sections.toggle(location.hash)
                },
                'female': function() {
                    sections.toggle(location.hash);
                }
            })
        }
    };

    function createURL(hashURL) {
        return "https://randomuser.me/api/?results=5&gender=" + hashURL.replace('#', '');

    }

    function loadJSON(apiURL, hashURL) {
        fetch(apiURL)
            .then(data => data.json())
            .then(data => appendPeople(data.results, hashURL.replace('#', '')))
    }


    function clearSection(section) {
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }
    }

    function hideSections(sectionID) {
        articlesByGender = Array.from(document.getElementById("gender-groups").getElementsByTagName("article"));
        articlesByGender.forEach(article => {
            "use strict";
            article.id == sectionID ? article.classList.remove("hide") : article.classList.add("hide");
        })
    }


    function appendPeople(randomPeople, sectionID) {
        const section = document.getElementById(sectionID);
        clearSection(section);
        hideSections(sectionID);
        randomPeople.forEach(person => {
            let imgNode = document.createElement("img");
            imgNode.src = person.picture.large;
            if (imgNode != null) {
                section.appendChild(imgNode);
            }
        }
    )};

    let sections = {
        toggle: function (hashURL) {
            loadJSON(createURL(hashURL), hashURL);
        }
    };
    app.init();

}());




























