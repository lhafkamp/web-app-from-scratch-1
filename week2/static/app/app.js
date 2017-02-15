/**
 * Created by Diego on 13-02-17.
 */

/**
* Using API's

 *
 *  With this this I'll ask the end-user to put a location in the input textfield. With this information input the api
 *  wunderground is used for weather prediction.
* */

(function () {
    var app = {
        init: function() {
            routes.init();
        }
    };

    var routes = {
        init: function () {
            routie({
                'male_female': function() {
                    sections.toggle("")
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

    function loadJSON(apiURL) {
        let randomPeople = [];
        fetch(apiURL)
            .then(data => data.json())
            .then(data => randomPeople.push(...data.results));
        return randomPeople;
    }

    function setElements(randomUsers) {
        console.log(randomUsers);
    }

    var sections = {
        toggle: function (hashURL) {
            setElements(loadJSON(createURL(hashURL)));
        }
    };
    app.init();

}());




























