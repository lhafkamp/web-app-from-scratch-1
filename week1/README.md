# Web App From Scratch
Course from the minor Web Development 1617 at the Hogeschool van Amsterdam. During this course I'll learn to make a webapp without using JavaScript frameworks or libraries, just HTML, CSS and Native JavaScript. In this repository you'll find schoolwork that was made during this course.

## Assignment 2: 
### Pros and cons, Native Javascript VS libraries/frameworks
For this assigment I had to search for the pros and cons between Barebones/Native Javascript and Javascript libraries/frameworks. Because I don't use Javascript I'll give a brief introduction about what Javascript is, so I'll know what i'm talking about.

JavaScript is a scripting langauge that as is able to change HTML elements. It is able to manipulate HTML elements by adding/editing attributes. With those changes web pages can be interactive. Javascript is supported into all major web browers, including Internet Explorer, Firefox, Chrome and Safari. __Javascript adds behaviour to a website.__

*Stephen Chapman	JavaScript Expert. (2016, July 25). What is JavaScript Used For? Retrieved February 07, 2017, from http://javascript.about.com/od/reference/a/javascriptpurpose.html*
#### What is native JavaScript? and what are the pros and cons.
Native JavaScript is plain JavaScript, the way the company delivers it. It doesn't have a abstract layer on it. Native JavaScript is included in all major web browsers. So no additional files have to be downloaded to run your website, this improves the performance. So when you are just making a small webapp, all the functionalities of a framework/library are not needed. If downloading matters the size of a library/framework could be a problem. Another pro is if you are using diffrent kind of libraries, you are able to just use native JavaScript to send data to one from the other, like a coupling step. 

*P. Darveau, F. (n.d.). You SHOULD Learn Vanilla JavaScript Before JS Frameworks. Retrieved February 07, 2017, from https://snipcart.com/blog/learn-vanilla-javascript-before-using-js-frameworks*
#### What are JavaScript libraries/frameworks? and what are the pros and cons.
JavaScript frameworks and libraries are made on top off Javascript. It creates an abstract layer where the developer can create the behaviour for his website with. Frameworks and libraries have easier learning curves, because like the example below it's much more readable in jQuery than in vanilla JS. The quality of code is also a pro with libraries and frameworks, because in your own code it will be just fadeIn (see example below). Some cons of using libraries are that they are build on top of JavaScript. If you don't know that happens under the roof of the abstract layer you don't know if your'e using the right method. Is the method from the library efficient enough or does it add things that are not needed, so it decreases the websites performance. Another problem is that libraries/frameworks come and go so when a new library comes along you'll have to learn a whole new syntax specific for the library, with vanilla JS you'll just have to learn new methods that come with new releases.

##### jQuery
    $(el).fadeIn();
##### JavaScript
    function fadeIn(el) {
    el.style.opacity = 0;
    
    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();
    
        if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) ||     setTimeout(tick, 16);
        }
    };
    
    tick();
    }
    
    fadeIn(el);


*You might not need jQuery. (n.d.). Retrieved February 07, 2017, from http://youmightnotneedjquery.com/*

*What is the difference between a JavaScript framework and a library? (n.d.). Retrieved February 07, 2017, from http://stackoverflow.com/questions/11576018/what-is-the-difference-between-a-javascript-framework-and-a-library*

*H. (2016, January 25). JavaScript Frameworks: To Use or Not To Use? Retrieved February 07, 2017, from http://www.noupe.com/development/javascript-frameworks-94897.html*
* * * 
## Assignment 3: 
### Pros and cons, Single page webapp
SPA's, Single Page Applications are applications which are made for the internet. It's a method to get functionalities like in computer applications on the web. They are accesible like other websites but much more interactive. They do not refresh as much as normal websites and are only refreshed when the enduser forces it in the browser.

pros:
    - Only the parts that need to change, change.
    - Less is loaded. Pages do not get reloaded all the time when clicking on a link. Only data that matters gets loaded.
    - There is only one programming langauge needed which is JavaScript. Traditional web applications were of use in the backend. But now its also possible to do with JavaScript
    
cons:
    - Client side scripts can get slow when the computer can not handle the way code was written. So performance matters. You'll have to find ways to improve the performance of your writter scripts.
    - Client side script errors are not logged in the server. There needs to be an alternative way to send them to the developers.


*M. (2013, January 04). Single Page Web Applications: JavaScript End-to-End (The Hard Stuff). Retrieved February 07, 2017, from https://www.youtube.com/watch?v=OrIFaWJ9Glo*
*Making a Single Page App Without a Framework. (n.d.). Retrieved February 07, 2017, from http://tutorialzine.com/2015/02/single-page-app-without-a-framework/*
*Single-page Applications. (n.d.). Retrieved February 07, 2017, from https://www.codeschool.com/beginners-guide-to-web-development/single-page-applications*
* * * 
