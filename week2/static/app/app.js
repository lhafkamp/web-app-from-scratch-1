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
                'male-female?:id': function(id) {
                    sections.toggle(location.hash)
                },
                'male?:id': function(id) {
                    sections.toggle(location.hash)
                },
                'female?:id': function(id) {
                    sections.toggle(location.hash);
                },
                '*': function() {
                    showUserInformation(location.hash);
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
            .then(data => resetAndAppendPeopleToSection(data.results, hashURL.replace('#', '')))
    }


    function clearSection(section) {
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }
    }

    function hideSections(sectionID) {
        articlesByGender = Array.from(document.getElementById("gender-groups").getElementsByTagName("article"));
        articlesByGender.map(article => {
            article.id === sectionID ? article.classList.remove("hide") : article.classList.add("hide")})
    }

    function resetSections(section ,sectionID) {
        clearSection(section);
        hideSections(sectionID);
    }

        function appendPeople(section, randomPersons) {
        randomPersons.forEach(person => {
            "use strict";
            let imgNode = document.createElement("img");
            imgNode.src = person.picture.large;

            let linkNode = document.createElement("a");
            linkNode.href = "#" + person.login.username;
            linkNode.appendChild(imgNode);
            section.appendChild(linkNode);
        });
    }

    function resetAndAppendPeopleToSection(randomPersons, sectionID) {
        const section = document.getElementById(sectionID);
        resetSections(section, sectionID);
        appendPeople(section, randomPersons);
    }

    function getUserAPIurl(hashURL) {
        return "https://randomuser.me/api/?results=1&inc=name,location&username=" + hashURL.replace('#', '');
    }

    function createProfile(personInfo) {
        console.log(personInfo);
        const subjects = ["name","location"];
        const userPage =  document.getElementById("gender-groups");


        let tbl = document.createElement("table");
        tbl.classList.add("table-fill");
        let tblbody = document.createElement("tbody");

        for (var term in subjects) {

            let tblHead = document.createElement("th");
            tblHead.colSpan = "2";
            let cellText = document.createTextNode(subjects[term].toUpperCase());
            tblHead.appendChild(cellText);
            tblbody.appendChild(tblHead);
            for (var key in personInfo[subjects[term]]) {
                const tblRow = document.createElement("tr");
                let tblCell = document.createElement("td");
                cellText = document.createTextNode(key);
                tblCell.appendChild(cellText);
                tblRow.appendChild(tblCell);
                tblCell = document.createElement("td");
                cellText = document.createTextNode(personInfo[subjects[term]][key]);
                tblCell.appendChild(cellText);
                tblRow.appendChild(tblCell);
                tblbody.appendChild(tblRow);
            }
            tbl.appendChild(tblbody);
        }
        userPage.appendChild(tbl);
    }

    function downloadUserInformation(apiURL) {
        fetch(apiURL)
            .then(data => data.json())
            .then(data => createProfile(data.results[0]));
    }

    function showUserInformation(hashURL) {
        if( hashURL ) { //check of het empty is
            downloadUserInformation(getUserAPIurl(hashURL));
        }
    };

    let sections = {
        toggle: function (hashURL) {
            loadJSON(createURL(hashURL), hashURL);
        }
    };
    app.init();

}());




























