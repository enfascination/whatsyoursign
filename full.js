/*
Hey baby, what's your sign?
Copyright (C) 2018 Seth Frey

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/** * * * * * * * * * * **\
 **
 **
 ** FUNCTIONALITY OF WHAT'S YOUR SIGN BABY SITE
 **
 **
\** * * * * * * * * * * **/





/** * * * * * * * * * * **\
 **
 ** CHANGE basic functionality
 **
\** * * * * * * * * * * **/

// fix modulo: https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};





/** * * * * * * * * * * **\
 **
 ** DEFINE helpers
 **
\** * * * * * * * * * * **/


/** * * * * * * * * * * **\
 ** DEFINE helpers: generic
\** * * * * * * * * * * **/

/**
* from https://gist.github.com/Xeoncross/7663273
 * IE 5.5+, Firefox, Opera, Chrome, Safari XHR object
 *
 * @param string url
 * @param object callback
 * @param mixed data
 * @param null x
 */
function ajax(url, callback, data, x) {
    try {
        x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.onreadystatechange = function () {
            x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.send(data)
    } catch (e) {
        window.console && console.log(e);
    }
};

// https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
function wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
}



/** * * * * * * * * * * **\
 ** DEFINE helpers: astrological
\** * * * * * * * * * * **/

/**
 * Return zodiac sugn by month and day
 *
     * @param day
 * @param month
 * @return {string} name of zodiac sign
 */
var zodiacSigns = {
    'capricorn':10,
    'aquarius':11,
    'pisces':12,
    'aries': 1,
    'taurus': 2,
    'gemini': 3,
    'cancer': 4,
    'leo':5,
    'virgo':6,
    'libra':7,
    'scorpio':8,
    'sagittarius':9,
}
var zodiacSignsInv = {
    10: 'Capricorn',
    11: 'Aquarius',
    12: 'Pisces',
    1:  'Aries',
    2:  'Taurus',
    3:  'Gemini',
    4:  'Cancer',
    5:  'Leo',
    6:  'Virgo',
    7:  'Libra',
    8:  'Scorpio',
    9: 'Sagittarius',
}

function getZodiacSign(day, month) {

    if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
        return zodiacSigns.capricorn;
    } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        return zodiacSigns.aquarius;
    } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return zodiacSigns.pisces;
    } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        return zodiacSigns.aries;
    } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        return zodiacSigns.taurus;
    } else if((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
        return zodiacSigns.gemini;
    } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        return zodiacSigns.cancer;
    } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
        return zodiacSigns.leo;
    } else if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
        return zodiacSigns.virgo;
    } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
        return zodiacSigns.libra;
    } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
        return zodiacSigns.scorpio;
    } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        return zodiacSigns.sagittarius;
    }
}





/** * * * * * * * * * * **\
 **
 ** SETUP page
 **
\** * * * * * * * * * * **/


/** * * * * * * * * * * **\
 ** SETUP page: vestiges
\** * * * * * * * * * * **/



var cx = 300;
var cy = 300;
var radius = 200;

function shifter(val) {
    return [val, cx, cy].join(' ');
}

var date = new Date();
var hoursAngle = 360 * date.getHours() / 12 + date.getMinutes() / 2;
var minuteAngle = 360 * date.getMinutes() / 60;
var secAngle = 360 * date.getSeconds() / 60;



for(var i = 1; i <= 12; i++) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    el.setAttribute('x1', '300');
    el.setAttribute('y1', '160');
    el.setAttribute('x2', '300');
    el.setAttribute('y2', '150');
    el.setAttribute('transform', 'rotate(' + (i*360/12) + ' 300 300)');
    el.setAttribute('style', 'stroke: #ffffff;');
    document.querySelector('svg').appendChild(el);
}



/** * * * * * * * * * * **\
 ** SETUP page: key elements
\** * * * * * * * * * * **/

///interactive elements of SVG

//Link counterbalanced entities
// a la https://codepen.io/anon/pen/BOowqg https://github.com/atomiks/tippyjs/issues/283
tippy('.tooltipped');

var elCounterSun = document.querySelector("#counter-sun");
var elSun = document.querySelector("#mass-sun");
var elSimulatedSun = document.querySelector("#simulated-sun");
var elDesiredSun = document.querySelector("#desired-sun");
var elCounterSunLabel = document.querySelector("#template-counter-sun-label");
var elSunLabel = document.querySelector("#template-mass-sun-label");
var elSimulatedSunLabel = document.querySelector("#template-simulated-sun-label");

// supporting elements
var elCenter = document.querySelector("svg.illustration #center");
var elNoChangeLabel = document.querySelector("#template-no-change-label");

var sunCurrentSVG = [];
sunCurrentSVG.push(elCounterSun); //0
sunCurrentSVG.push(elSun); //1
sunCurrentSVG.push(elCounterSunLabel); //2
sunCurrentSVG.push(elSunLabel); //3
var sunDesiredSVG = [];
sunDesiredSVG.push(elSimulatedSun); //0
sunDesiredSVG.push(elDesiredSun); //1
sunDesiredSVG.push(elSimulatedSunLabel); //2



/** * * * * * * * * * * **\
 ** SETUP page: tooltips and interface
\** * * * * * * * * * * **/

var tippyCountermass = tippy.one( elCounterSun , {
    html: elCounterSunLabel,
    delay: 0,
    duration: 0,
    placement: 'top',
    theme: 'hbwys',
});
var tippyPlanet = tippy.one( elSun, {
    trigger : 'manual',
    html: elSunLabel,
    delay: 0,
    duration: 0,
    placement: 'top',
    theme: 'hbwys',
} );
var tippySimulatedMass = tippy.one( elSimulatedSun , {
    html: elSimulatedSunLabel,
    delay: 0,
    duration: 0,
    placement: 'top',
    theme: 'hbwys',
});
var tippyNoChange = tippy.one( elCenter, {
    trigger : 'manual',
    html:  elNoChangeLabel,
    delay: 0,
    duration: 0,
    hideOnClick: false,
    placement: 'top',
    theme: 'hbwys',
});

// default trigger === 'mouseenter focus'
const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];
showEvents.forEach(e => {
        elCounterSun.addEventListener(e, () => {
                tippyPlanet.show();
            });
});
hideEvents.forEach(e => {
        elCounterSun.addEventListener(e, () => {
                tippyPlanet.hide();
            });
});




/** * * * * * * * * * * **\
 ** SETUP page: helpers
\** * * * * * * * * * * **/

function populateFormWithDefaults(form) {
    /* 
        form.querySelector("#locationLat").defaultValue = "38.54";
        form.querySelector("#locationLon").defaultValue = "-121.74";
        // browser doesn't like this code: makes browser raise its security hackles.
        // https://developer.mozilla.org/en-US/docs/Web/API/Coordinates/longitude
        navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        form.querySelector("#locationLat").innerText = lat.toFixed(2);
        form.querySelector("#locationLon").innerText = long.toFixed(2);
    });
    */
    var date = new Date();
    form.querySelector("#date").defaultValue = $.datepicker.formatDate("yy-mm-dd", date);
    form.querySelector("#time").defaultValue = date.getHours().toString().padStart(2,0) + ":" + date.getMinutes().toString().padStart(2,0);

}





/** * * * * * * * * * * **\
 **
 ** MAIN function
 **
\** * * * * * * * * * * **/

var sAstroShell;
function fetchSwissAstroSun( el ) {
    var slat, slon, sdate, stime, omoment, stimeutc, currentSunSign, inDesiredSunSign;
    //console.log( el );
    // extract form's input variables
    var inCoord = el.querySelector("#locationCoordinates").value.split(', ');
    slat = inCoord[0];
    slon = inCoord[1];
    sdate = el.querySelector("#date").value;
    stime = el.querySelector("#time").value;
    omoment = moment(sdate+stime, moment.HTML5_FMT.DATE+moment.HTML5_FMT.TIME).format()
    omoment = moment.tz(omoment, tzlookup(slat, slon));
    stimeutc = omoment.utc().format('HH:mm:00');
    inDesiredSunSign = el.querySelector("#desiredsign > .active > input").value;
    sdate = omoment.format('D.M.YYYY');

        //https://devhints.io/moment
    console.log(omoment.format(), omoment.utc().format(), omoment.format('D.M.YYYY'), omoment.utc().format('HH:mm:00'));

    var iday = +omoment.format('D');
    var imonth = +omoment.format('M');
    var iyear = +omoment.format('YYYY');
    var currentSunSign = getZodiacSign(iday, imonth);
    var signDiff = (inDesiredSunSign - +currentSunSign ).mod( 12 );

    // assemble and submit request to cancel current sign, and define code that handles response text.
    var astroUrlUndoSun = "https://enfascination.com/swissephemeris/swetest.php?" +
        "b="+ encodeURIComponent(sdate) +
        "&p=0" + "&emos" + "&f=PjLBRsGg" +
        "&house=" + encodeURIComponent(slon) + "%2C" +
        encodeURIComponent(slat) + "%2CN" +
        "&ut=" + encodeURIComponent(stimeutc) + "%3A00";

    if (signDiff == 0) {
        // if they do pick their current sign, nothing should happen
        // visible illustrations shold be decativated
        activateIllustration( sunCurrentSVG[0], deactivate=true);
        activateIllustration( sunDesiredSVG[0], deactivate=true);
        // label prep: interpolate sign and manually show
        prepareLabels(  elNoChangeLabel, null, currentSunSign);
        tippyNoChange.show();

    // still some cases to consider: did user click "no sign" (one object) or some sign besides their current sign (2 objects)
    } else if (inDesiredSunSign !== "null") {
        //  clean up after one of the other conditions
        tippyNoChange.hide();

        // cancel out current sign
        console.log("call to", astroUrlUndoSun);
        //ajax("https://cors-anywhere.herokuapp.com/"+astroUrlUndoSun
        ajax(astroUrlUndoSun, function(dat) {
            postSubmit(dat , sunCurrentSVG)
        }, null, null);

        // prep to simulate other sign
        //console.log("got in here", inDesiredSunSign );
        var desiredMoment = omoment.add((30*signDiff), 'days');
        var sDesiredMoment = desiredMoment.format('D.M.YYYY');
        //console.log(slat, slon, omoment, stime, inDesiredSunSign);
        //console.log(inDesiredSunSign, omoment, "ASDF",desiredMoment, "ASDF", sDesiredMoment, signDiff);

        // assemble and submit request to simulate other sign, and define code that handles response text.
        var astroUrlNewSun = "https://enfascination.com/swissephemeris/swetest.php?" +
            "b="+ encodeURIComponent(sDesiredMoment) +
            "&p=0" + "&emos" + "&f=PjLBRsGg" +
            "&house=" + encodeURIComponent(slon) + "%2C" +
            encodeURIComponent(slat) + "%2CN" +
            "&ut=" + encodeURIComponent(stimeutc) + "%3A00";
        console.log("call to", astroUrlNewSun);
        ajax(astroUrlNewSun, function(dat) {
                postSubmit(dat , sunDesiredSVG, mode="simulate")
                }, null, null);
    } else {
        // if they do pick "no sign", be sure to disappear the other objects

        //  clean up after one of the other conditions
        tippyNoChange.hide();


        // first cancel out current sign
        console.log("call to", astroUrlUndoSun);
        //ajax("https://cors-anywhere.herokuapp.com/"+astroUrlUndoSun
            ajax(astroUrlUndoSun, function(dat) {
                postSubmit(dat , sunCurrentSVG)
            }, null, null);

        // disappear the other objects
        activateIllustration( sunDesiredSVG[0], deactivate=true);
    }

    // DISABLE current sign as an option
    //   SUPE BUGGY (event handling and disabling are interfereing with tippy
    /*
    var formSignOption = el.querySelector(`#desiredsign input[value='${currentSunSign}']`); //get option
    var formSignOptionLabel = formSignOption.parentElement;
    formSignOption.classList.add('disabled'); //disabled the input tag
    // TELL tippy about disabling (keeping in mind tha tdisabled elements don't fire events)
    formSignOptionLabel.setAttribute('title', 'This is your current sign, so if you want it, you don\'t have to do anything.');
    formSignOptionLabel.classList.add("tooltipped");
    // TELL boostrap about disabling disabled
    //   parent is the label tag which has most of the styling
    formSignOptionLabel.classList.add('disabled');
    //formSignOptionLabel.removeAttribute("onclick"); //trying to get tooltip back
    */

}



/** * * * * * * * * * * **\
 **
 ** MAIN function: helpers
 **
\** * * * * * * * * * * **/


/**
    this runs after we get the data from the other site, which should trigger lots of action.
    pull the astro printout from the return value
it comes out as a string, which we convert to a DOM object for easy searching
*/
function postSubmit(sAstroShell, elsvg, mode="counter") {
    // parse raw input
    //    (custonmize edepending on control over backend)
    //    DON't need for current backend
    // sAstroShell = parseAstroResponse( sAstroShell );

    // extract angles from parsed response
    var angles = getAngles(sAstroShell);
    var sunAngle = angles['sunAngle'];
    var ascendant = angles['ascendant'];
    var meridian = angles['meridian'];
    var sunSign = angles['sunSign'];

    //console.log("postSubmit", angles);

    // Position object into SVG using output
    //  compute angle to send to image
    var astroAngle = imageAngleFromAstroAngle(ascendant, meridian, sunAngle);
    // edit HTML
    positionObjectPairInSVG(elsvg[0], elsvg[1], radius, astroAngle, mode=mode);

    // PREPARE labels (tooltips) for each obejct (dynamic content)
    if (mode == "counter") {
        prepareLabels(elsvg[2], (astroAngle - Math.PI), sunSign);
        prepareLabels(elsvg[3], astroAngle);
    } else if (mode == "simulate") {
        prepareLabels(elsvg[2], astroAngle, sunSign);
    }

    activateIllustration(elsvg[0]);

};
function parseAstroResponse( sAstroShell ) {
    // vestigates fromwhen I was scraping from http://www.astro.com/swisseph/swetest.htm
    // useful for making html in strings easily manipulable
    var parser = new DOMParser()
    var htmlAstro = parser.parseFromString(sAstroData, "text/html");
    console.log(htmlAstro);
    sAstroShell = htmlAstro.querySelector("pre > font").innerText;
    console.log( sAstroShell);
    return sAstroShell
}

function getAngles(sAstroShell) {
    var sunAngle, sunSign, meridian, ascendant;
    // now use regexes to search the printout for the right digits.
    //  according to the math team, we need angles for the sun, AC and MC.
    sunAngle = sAstroShell.match(
        /\bSun\s+([0-9\.]+)\s+(\d{1,3})°\s?(\d\d?)'\s?(\d\d?).(\d{4})\s+/
    );
    sunSign = Math.floor(+(sunAngle[1]));
    sunAngle = sunAngle[2];
    ascendant = sAstroShell.match(/\bAscendant\s+(\d{1,3})°\s?(\d\d?)'\s?(\d\d?).(\d{4})\s+/)[1];
    meridian = sAstroShell.match(/\bMC\s+(\d{1,3})°\s?(\d\d?)'\s?(\d\d?).(\d{4})\s+/)[1];
    // convert to radians
    sunAngle = (sunAngle / 360) * 2 * Math.PI;
    ascendant = (ascendant / 360) * 2 * Math.PI;
    meridian = (meridian / 360) * 2 * Math.PI;
    var angles = {
        "sunAngle" : sunAngle,
        "ascendant" : ascendant,
        "meridian" : meridian,
        "sunSign" : sunSign,
    }
    return(angles);
};

function imageAngleFromAstroAngle(ascendant, meridian, sunAngle) {
    // use sun angle, AC and MC to calculate position of object relative to baby
    //minuteAngle = sunAngle;
    minuteAngle = 360 * sunAngle / 60;
    var secAngle = 360 * date.getSeconds() / 60; //really just here for testing
    var astroAngle = -( //negate because mirror image from looking down instead of up
        //Math.PI //to counterbalance mass
        0 // to show the planetary body, not its opposite
        - (2*Math.PI - ascendant) //to get the ascendant zeroed to the east (substracting distance from spring equinox)
        - meridian // to add the effect of being at noon
        + (meridian - sunAngle) //to get actual hour of day
    ) % (2*Math.PI);
    var astroAngle2 = -( //negate because mirror image from looking down instead of up
        //Math.PI //to counterbalance mass
        0 // to show the planetary body, not its opposite
        + (ascendant - sunAngle) //to get angle from east facing
    ) % (2*Math.PI);
    astroAngle = astroAngle.mod( 2*Math.PI );
    astroAngle2 = astroAngle2.mod( 2*Math.PI );
    console.log((astroAngle/(Math.PI*2)*360), (astroAngle2/(Math.PI*2)*360) );
    return(astroAngle);
}

function positionObjectPairInSVG(counterMass, mass, radius, astroAngle, mode="counter") {
    var angleOffset = (mode == "counter") ? Math.PI : 0; // are we cancelling out or simulating a heavenly body?
    mass.setAttribute('x',cx - 75 + radius*Math.cos(astroAngle));  // the 75 is half the width/height of the bridge image, because its 0 point is in its upper left corner, not in its center.
    mass.setAttribute('y',cy - 75 + radius*Math.sin(astroAngle));
    counterMass.setAttribute('x',cx - 75 + radius*Math.cos(astroAngle + angleOffset));  // the 75 is half the width/height of the bridge image, because its 0 point is in its upper left corner, not in its center.
    counterMass.setAttribute('y',cy - 75 + radius*Math.sin(astroAngle + angleOffset));
}

function activateIllustration(el, deactivate=false){
    // activate illustration
    // (make it visible)
    //console.log( el );
    if (!deactivate) {
        el.classList.remove("invisible");
        el.classList.add("visible");
    } else {
        el.classList.remove("visible");
        el.classList.add("invisible");
    }
}

function prepareLabels(labelTemplate, astroAngle, sSign ) {
    // (popoulate labels with caluclated content)
    var sAstroAngle = ((astroAngle + Math.PI/2) / (2*Math.PI) * 360).mod( 360 ).toFixed(0);
    var templateAngle = labelTemplate.querySelector(".body-angle");
    var templateSign = labelTemplate.querySelector(".body-sign");
    if (templateAngle !== null) {
        templateAngle.innerText = sAstroAngle;
    }
    if (templateSign !== null) {
        templateSign.innerText = zodiacSignsInv[sSign];
    }
    console.log(templateAngle);
};

function inquireSurrogate(el, direction) {
    if (true) {
        if (direction == "in") {
            el.parentElement.querySelector(".svg-obj-planetary").classList.remove("invisible");
            el.parentElement.querySelector(".svg-obj-planetary").classList.add("visible");
        } else if (direction == "out") {
            el.parentElement.querySelector(".svg-obj-planetary").classList.add("invisible");
            el.parentElement.querySelector(".svg-obj-planetary").classList.remove("visible");
        }
    }
}

function toggleActive(el){
    if (el.classList.contains("active")) {
    } else {
        el.parentElement.querySelector(".active").classList.remove("active");
        el.classList.add("active");
    }
}




/** * * * * * * * * * * **\
 **
 ** FINAL setup
 **
\** * * * * * * * * * * **/


var mainForm = document.getElementById('astro-main-form');
populateFormWithDefaults(mainForm);

// run this with default values on page load.  Then again on form submit
fetchSwissAstroSun( mainForm );



