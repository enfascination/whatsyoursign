/*jshint esversion: 6 */
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
 ** DEFINE globals
\** * * * * * * * * * * **/
const ephemerisURL = 'https://enfascination.com/swissephemeris/repo/swetest.php';

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
        x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0'); // jshint ignore:line
        x.open(data ? 'POST' : 'GET', url, 1);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.onreadystatechange = function () {
            return x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.send(data);
    } catch (e) {
        window.console && console.log(e); // jshint ignore:line
    }
}

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
};
const zodiacUTF = {
    10: '♑︎',
    11: '♒︎',
    12: '♓︎',
    1:  '♈︎',
    2:  '♉︎',
    3:  '♊',
    4:  '♋︎',
    5:  '♌︎',
    6:  '♍︎',
    7:  '♎︎',
    8:  '♏︎',
    9: '♐︎',
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
};

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



function drawTick(el, angle, color='#000', thickness='1') {
    el.setAttribute('x1', '300');
    el.setAttribute('y1', '160');
    el.setAttribute('x2', '300');
    el.setAttribute('y2', '150');
    el.setAttribute('transform', 'rotate(' + (angle/2/Math.PI*360 - 90) + ' 300 300)');
    el.setAttribute('stroke', color);
    el.setAttribute('stroke-width', thickness);
    return( el );
}
for(var i = 0; i < 32; i++) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    el = drawTick(el, (i*2*Math.PI/32));
    document.querySelector('svg.illustration .astro-supporting-elements').appendChild(el);
}
const cardinalDirs = ['E', 'W', 'S', 'N'];
for(var i = 0; i < 4; i++) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.textContent = cardinalDirs[i];
    //el.setAttribute('fill', 'white');
    el.setAttribute('fill', '#866fa4');
    document.querySelector('svg.illustration .astro-supporting-elements').appendChild(el);
    placeRadially(el, 300-7, 300+6, 160, i*Math.PI/2);
}



/** * * * * * * * * * * **\
 ** SETUP page: semantic elements
\** * * * * * * * * * * **/

// dictionary of characteristics
//  sources: https://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html
const d = {
    baby : {
        name : 'baby',
        sname : 'a baby',
        mass : 3.5, //kg
        dist : 0,
        type : 'earthbound',
    }, 
    sun : {
        name : 'sun',
        sname : 'the Sun',
        mass : 1.989e30, //kg
        smass : '300,000 Earths',
        dist : 146e9, //meters
        sdist : '93 million miles',
        force : 0.0217,
        sforce : 'the weight of a playing card',
        type : 'cosmic',
        counter : 'skyscraper',
    },
    moon : {
        name : 'moon',
        sname : 'the moon',
        mass : 0.07346e24, //kg
        smass : '1/100 Earth',
        dist : 378000000, //meters
        sdist : '378,000km',
        type : 'cosmic',
        counter : 'watertower',
    },
    mercury : {
        name : 'mercury',
        sname : 'Mercury',
        mass : 0.33e24, //kg
        smass : '1/20 Earth',
        dist : 150e9, //meters
        sdist : '150 million km',
        type : 'cosmic',
        counter : 'deer',
    },
    venus : {
        name : 'venus',
        sname : 'Venus',
        mass : 4.87e24, //kg
        smass : '80% of Earth',
        dist : 100e9, //meters
        sdist : '100 million km',
        type : 'cosmic',
        counter : 'rhinoceros',
    },
    /*earth : {
        name : 'earth',
        sname : 'Earth',
        dist : 0+6300000, //meters
        mass : 5.97e24, //kg
        smass : '1 Earth',
        sdist : '6300km from the center',
        type : 'cosmic',
    },*/
    mars : {
        name : 'mars',
        sname : 'Mars',
        mass : 0.642e24, //kg
        smass : '1/10 Earth',
        dist : 200e9, //meters
        sdist : '200 million km',
        type : 'cosmic',
        counter : 'mom',
    },
    jupiter : {
        name : 'jupiter',
        sname : 'Jupiter',
        mass : 1898e24, //kg
        smass : '318 Earths',
        dist : 750e9, //meters
        sdist : '750 million km',
        type : 'cosmic',
        counter : 'motorhome',
    },
    saturn : {
        name : 'saturn',
        sname : 'Saturn',
        mass : 568e24, //kg
        smass : '95.1 Earths',
        dist : 1500e9, //meters
        sdist : '1.5 billion km',
        type : 'cosmic',
        counter : 'walrus',
    },
    uranus : {
        name : 'uranus',
        sname : 'Uranus',
        mass : 86.8e24, //kg
        smass : '14.5 Earths',
        dist : 2750e9, //meters
        sdist : '2.75 billion km',
        type : 'cosmic',
        counter : 'toilet',
    },
    neptune : {
        name : 'neptune',
        sname : 'Neptune',
        mass : 102e24, //kg
        smass : '17.1 Earths',
        dist : 4500e9, //meters
        sdist : '4.3 billion km',
        type : 'cosmic',
        counter : 'luggage',
    },
    pluto : {
        name : 'pluto',
        sname : 'Pluto',
        mass : 0.0146e24, //kg
        smass : '1/500 Earth',
        dist : 5000e9, //meters
        sdist : '7.5 billion km',
        type : 'cosmic',
        counter : 'penny',
    },
    //a medium ship is 1 million kg
    //50 story skycraper is 220 million kg
    //golden gate bridge is 800 million kg
    //hoover dam is 6 billion kg (2.5 million m^3)
    //its water (35 million m^3) is 35 billion kg
    skyscraper : {
        name : 'skyscraper',
        sname : 'a 50-story skyscraper',
        mass : 226796185, //kg
        smass : '250,000 tons',
        dist : 1.55, //meters
        sdist : '1.5m',
        force : 0.0217,
        sforce : 'the weight of a playing card',
        type : 'earthbound',
        counter: 'sun',
    },
    deer : {
        name : 'deer',
        sname : 'a deer',
        mass : 60, //kg
        smass : '60kg',
        dist : 2.022, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'mercury',
    },
    rhinoceros : {
        name : 'rhinoceros',
        sname : 'a rhinoceros',
        mass : 2000, //kg
        smass : '2000kg',
        dist : 2.026, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'venus',
    },
    watertower: {
        name : 'watertower',
        sname : 'a water tower',
        mass : 2000000, //kg
        smass : '2 million kg',
        dist : 2, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'moon',
    },
    mom : {
        name : 'mom',
        sname : 'a mom',
        mass : 77, //kg
        smass : '77kg',
        dist : 2.19, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'mars',
    },
    motorhome: {
        name : 'motorhome',
        sname : 'a motorhome',
        mass : 13500, //kg
        smass : '13500kg',
        dist : 2, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'jupiter',
    },
    walrus: {
        name : 'walrus',
        sname : 'a walrus',
        mass : 1000, //kg
        smass : '1000kg',
        dist : 2, //meters
        sdist : '2kg',
        type: 'earthbound',
        counter: 'saturn',
    },
    toilet : {
        name : 'toilet',
        sname : 'a toilet',
        mass : 40, //kg
        smass : '40kg',
        dist : 1.87, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'uranus',
    },
    luggage: {
        name : 'luggage',
        sname : 'packed luggage',
        mass : 22, //kg
        smass : '22kg',
        dist : 2.09, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'neptune',
    },
    penny: {
        name : 'penny',
        sname : 'a penny',
        mass : 0.0025, //kg
        smass : '2.5 grams',
        dist : 2.07, //meters
        sdist : '2m',
        type: 'earthbound',
        counter: 'pluto',
    },
};
const G = 6.67408e-11; // 6.67408 × 10-11 m3 kg-1 s-2
/*
 * given large object m and d, and baby's m, what d should an object of  small m have to have the same pull.  First solves for F given large mass and baby, then solves for d2, given small mass, baby, and F.
 * Units are kg and m
 *
 * F = G*m_1*m_2/(r^2)
 * (therefore
 *   r = ((G * m_1 * m_2) / F)^0.5
 *   m_2 = (F * r^2) / (G * m_1)
 * )
 *
 *
 */
function gravitySolveForce( obj1, obj2) {
    //units: F =
    //         m^3 kg^-1 s^-2 kg kg m^-2
    //         kg m s^-2 = Newton
    var F = (G * obj1.mass * obj2.mass) / (obj2.dist**2);
    return F;
}
function gravitySolveD2( baby, objbig, masssmall) {
    var F = gravitySolveForce(baby, objbig);
    var d2 = ((G * baby.mass * masssmall) / F) ** 0.5;
    return d2;
}
function gravitySolveM2( baby, objbig, distsmall) {
    var F = gravitySolveForce(baby, objbig);
    var m2 = (F * distsmall**2) / (G * baby.mass);
    return m2;
}
//console.log(d, d.sun, d.sun.dist + 2, gravitySolveD2(d.baby, d.sun));

/*
 * science tab has a table with comparisons
 * */
function populateMassTable(tab, objs) {
    // table has a single template row.
    // take that, copy it, popultate it, append it, repeat
    /*
    <tr> <td> The pull of </td>
    <td> <img class="cosmic-image tooltipped" height="40" src="assets/sun.svg" title="<span class='cosmic-name'>the sun</span><br><span class='cosmic-mass'>(at XXX(0.3?) Earths</span><br><span class='cosmic-dist'>and XXX km)</span>"> </td>
    <td> equals the pull of </td>
    <td> <img class="earthbound-image  tooltipped" height="40" src="assets/bowling_ball.svg" title="<span class='earthbound-name'>the sun</span><br><span class='earthbound-mass'>(at XXX(0.3?) Earths</span><br><span class='earthbound-dist'>and XXX km)</span>"> </td>
    <td> at 2m.  </td>
    </tr>
    */
    //console.log(tab.querySelector(".template-row"));
    var row = tab.querySelector(".template-row");
    row.remove();
    //tab.querySelector("tbody").appendChild( arow );
    //console.log(arow);
    //console.log(tab.querySelector("tbody"));
    var arow, cosmic, counter, imgCounter, imgCosmic, infoCosmic, infoCounter;
    var parser = new DOMParser();
    for (var name in objs) {
        cosmic = objs[name];
        if (cosmic.type == 'cosmic') {
            counter = objs[cosmic.counter];
            arow = row.cloneNode(true);
            arow.classList.remove("template-row");
            arow.querySelector(".cosmic-name").textContent = cosmic.sname;
            arow.querySelector(".earthbound-name").textContent = counter.sname;
            imgCosmic = arow.querySelector(".cosmic-image");
            imgCounter = arow.querySelector(".earthbound-image");
            imgCosmic.setAttribute("src", "assets/"+cosmic.name+".svg");
            imgCounter.setAttribute("src", "assets/"+counter.name+".svg");
            infoCosmic = imgCosmic.getAttribute("title");
            infoCosmic = infoCosmic.replace('___cosmic-name___', cosmic.sname);
            infoCosmic = infoCosmic.replace('___cosmic-mass___', cosmic.smass);
            infoCosmic = infoCosmic.replace('___cosmic-dist___', cosmic.sdist);
            imgCosmic.setAttribute("title", infoCosmic);
            infoCounter = imgCounter.getAttribute("title");
            infoCounter = infoCounter.replace('___earthbound-name___', counter.sname);
            infoCounter = infoCounter.replace('___earthbound-mass___', counter.smass);
            infoCounter = infoCounter.replace('___earthbound-dist___', counter.sdist);
            imgCounter.setAttribute("title", infoCounter);
            //console.log(infoCosmic);

            //console.log(arow);
            tab.querySelector("tbody").appendChild( arow );
        }
    }
}
populateMassTable(document.querySelector('#mass-table'), d);

/** * * * * * * * * * * **\
 ** SETUP page: key elements
\** * * * * * * * * * * **/


///interactive elements of SVG

//Link counterbalanced entities
// a la https://codepen.io/anon/pen/BOowqg https://github.com/atomiks/tippyjs/issues/283
var elCounterSun = document.querySelector("#counter-sun");
var elSun = document.querySelector("#mass-sun");
var elSimulatedSun = document.querySelector("#simulated-sun");
var elDesiredSun = document.querySelector("#desired-sun");
var elCounterSunLabel = document.querySelector("#template-counter-sun-label");
var elSunLabel = document.querySelector("#template-mass-sun-label");
var elSimulatedSunLabel = document.querySelector("#template-simulated-sun-label");

// supporting elements
var elCenter = document.querySelector(".astrological-output #placard");
var elNoChangeLabel = document.querySelector("#template-no-change-sign-label");
var elEraseLabel = document.querySelector("#template-erase-sign-label");
var elDefaultLabel = document.querySelector("#template-default-sign-label");
var elReplaceLabel = document.querySelector("#template-replace-sign-label");

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


// and the more generic tooltips
tippy('.tooltipped', {
    delay: 0,
    duration: 0,
    placement: 'top',
    theme: 'hbwys',
});
tippy('#mass-table .tooltipped', {
    delay: 0,
    duration: 0,
    placement: 'top',
    size: 'large',
    theme: 'hbwystable',
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
    omoment = moment(sdate+stime, moment.HTML5_FMT.DATE+moment.HTML5_FMT.TIME).format();
    omoment = moment.tz(omoment, tzlookup(slat, slon));
    stimeutc = omoment.utc().format('HH:mm:00');
    inDesiredSunSign = el.querySelector("#desiredsign > .active > input").value;
    sdate = omoment.format('D.M.YYYY');

        //https://devhints.io/moment
    //console.log(omoment.format(), omoment.utc().format(), omoment.format('D.M.YYYY'), omoment.utc().format('HH:mm:00'));

    var iday = +omoment.format('D');
    var imonth = +omoment.format('M');
    var iyear = +omoment.format('YYYY');
    currentSunSign = getZodiacSign(iday, imonth);
    var signDiff = (inDesiredSunSign - +currentSunSign ).mod( 12 );

    // assemble and submit request to cancel current sign, and define code that handles response text.
    var astroUrlUndoSun = ephemerisURL + "?" +
        "b="+ encodeURIComponent(sdate) +
        "&p=0" + "&emos" + "&f=PjLBRsGg" +
        "&house=" + encodeURIComponent(slon) + "%2C" +
        encodeURIComponent(slat) + "%2CN" +
        "&ut=" + encodeURIComponent(stimeutc) + "%3A00";

    //reset image
    removeElementsByClass( 'compass-tick' );
    removeElementsByClass( 'sign-brand' );

    if (signDiff === 0) {
        // if they do pick their current sign, nothing should happen
        // visible illustrations shold be decativated
        activateIllustration( sunCurrentSVG[0], deactivate=true);
        activateIllustration( sunDesiredSVG[0], deactivate=true);
        // label prep: interpolate sign and manually show
        prepareLabels(  elNoChangeLabel, null, currentSunSign, sdesiredsign=null, sentityname='placard');
        //addBrand(currentSunSign);
        replaceTemplate(elCenter, elNoChangeLabel);

    // still some cases to consider: did user click "no sign" (one object) or some sign besides their current sign (2 objects)
    } else if (inDesiredSunSign !== "null") {
        //  clean up after one of the other conditions
        prepareLabels(  elReplaceLabel, null, currentSunSign, inDesiredSunSign, sentityname='placard');
        replaceTemplate(elCenter, elReplaceLabel);

        // cancel out current sign
        console.log("call to", astroUrlUndoSun);
        //ajax("https://cors-anywhere.herokuapp.com/"+astroUrlUndoSun
        ajax(astroUrlUndoSun, function(dat) {
            postSubmit(dat , sunCurrentSVG);
        }, null, null);

        // prep to simulate other sign
        //console.log("got in here", inDesiredSunSign );
        var desiredMoment = omoment.add((30*signDiff), 'days');
        var sDesiredMoment = desiredMoment.format('D.M.YYYY');
        //console.log(slat, slon, omoment, stime, inDesiredSunSign);
        //console.log(inDesiredSunSign, omoment, "ASDF",desiredMoment, "ASDF", sDesiredMoment, signDiff);

        // assemble and submit request to simulate other sign, and define code that handles response text.
        var astroUrlNewSun = ephemerisURL + "?" +
            "b="+ encodeURIComponent(sDesiredMoment) +
            "&p=0" + "&emos" + "&f=PjLBRsGg" +
            "&house=" + encodeURIComponent(slon) + "%2C" +
            encodeURIComponent(slat) + "%2CN" +
            "&ut=" + encodeURIComponent(stimeutc) + "%3A00";
        console.log("call to", astroUrlNewSun);
        ajax(astroUrlNewSun, function(dat) {
                postSubmit(dat , sunDesiredSVG, mode="simulate");
                }, null, null);
        //addBrand(inDesiredSunSign);
    } else {
        // if they do pick "no sign", be sure to disappear the other objects

        //  clean up after one of the other conditions
        prepareLabels(  elEraseLabel, null, currentSunSign, null, sentityname='placard');
        replaceTemplate(elCenter, elEraseLabel);


        // first cancel out current sign
        console.log("call to", astroUrlUndoSun);
        //ajax("https://cors-anywhere.herokuapp.com/"+astroUrlUndoSun
            ajax(astroUrlUndoSun, function(dat) {
                postSubmit(dat , sunCurrentSVG);
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
    var sunAngle = angles.sunAngle;
    var ascendant = angles.ascendant;
    var meridian = angles.meridian;
    var sunSign = angles.sunSign;

    //console.log("postSubmit", angles);

    // Position object into SVG using output
    //  compute angle to send to image
    var astroAngle = imageAngleFromAstroAngle(ascendant, meridian, sunAngle);

    // PREPARE labels (tooltips) for each obejct (dynamic content)
    if (mode == "counter") {
        elsvg[2].classList.remove("invisible");
        elsvg[2].classList.add("visible");
        elsvg[3].classList.remove("invisible");
        elsvg[3].classList.add("visible");
        prepareLabels(elsvg[2], (astroAngle - Math.PI), sunSign, sdesiredsign=null, sentityname='skyscraper');
        prepareLabels(elsvg[3], astroAngle, null,  sdesiredsign=null, sentityname='sun');
    } else if (mode == "simulate") {
        prepareLabels(elsvg[2], astroAngle, sunSign, sdesiredsign=null, sentityname='skyscraper');
        elsvg[2].classList.remove("invisible");
        elsvg[2].classList.add("visible");
    }
    // edit HTML
    var angleOffset = (mode == "counter") ? Math.PI : 0; // are we cancelling out or simulating a heavenly body?
    positionObjectInSVG(elsvg[0], radius, astroAngle + angleOffset);
    positionObjectInSVG(elsvg[1], radius, astroAngle);
    // PREPARE ticks on radius for guides
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    el = drawTick(el, Math.PI + astroAngle + angleOffset, '#558B95', thickness=3);
    el.classList.add('compass-tick');
    document.querySelector('svg.illustration .astro-supporting-elements').appendChild(el);

    activateIllustration(elsvg[0]);

}
// from https://stackoverflow.com/questions/4777077/removing-elements-by-class-name
function removeElementsByClass(className){
        var elements = document.getElementsByClassName(className);
        while(elements.length > 0){
                    elements[0].parentNode.removeChild(elements[0]);
                }
}
function parseAstroResponse( sAstroShell ) {
    // vestigates fromwhen I was scraping from http://www.astro.com/swisseph/swetest.htm
    // useful for making html in strings easily manipulable
    var parser = new DOMParser();
    var htmlAstro = parser.parseFromString(sAstroData, "text/html");
    console.log(htmlAstro);
    sAstroShell = htmlAstro.querySelector("pre > font").innerText;
    console.log( sAstroShell);
    return sAstroShell;
}

function getAngles(sAstroShell) {
    var sunAngle, sunSign, meridian, ascendant;
    // now use regexes to search the printout for the right digits.
    //  according to the math team, we need angles for the sun, AC and MC.
    //console.log(sAstroShell);
    //the regexes below works as follows:
    //   capture three lines, the sun, acendant,a nd meridian
    //   first group of hthe sun line gives the sun sign. 
    //   second group gives angle off acendsant, in degrees.  thidr and fourth and fifth give minutes and seconds  and remaining fractions of that angle.
    //   the ascendant line also has to parse the sun sign group, but doesn't capture it.
    //       same with meridian, which I don't actually use anymore.
    //   one problem is that different complilations/downloads fo the emphemeris binary either do or don't put he sun sign ont he ascendent line, meaning this regex has to not match those first digists in the ascenddant's regex line for this to work in those other versions.  the binary packages with the standalone branch shouldn't have this problem, but i don't understand the rpboelm or how I fixed it, so this is a note to self.
    sunAngle = sAstroShell.match(
        /\bSun\s+([0-9\.]+)\s+(\d{1,3})°\s?(\d\d?)'\s?(\d\d?).(\d{4})\s+/
    );
    sunSign = Math.floor(+(sunAngle[1]));
    sunAngle = sunAngle[2];
    ascendant = sAstroShell.match(/\bAscendant\s+[0-9\.]+\s+(\d{1,3})°\s?(\d\d?)'\s?(\d\d?).(\d{4})\s+/)[1];
    meridian = sAstroShell.match(/\bMC\s+[0-9\.]+\s+(\d{1,3})°\s?(\d\d?)'\s?(\d\d?).(\d{4})\s+/)[1];
    // convert to radians
    sunAngle = (sunAngle / 360) * 2 * Math.PI;
    ascendant = (ascendant / 360) * 2 * Math.PI;
    meridian = (meridian / 360) * 2 * Math.PI;
    var angles = {
        "sunAngle" : sunAngle,
        "ascendant" : ascendant,
        "meridian" : meridian,
        "sunSign" : sunSign,
    };
    return(angles);
}

function imageAngleFromAstroAngle(ascendant, meridian, sunAngle) {
    // use sun angle, AC and MC to calculate position of object relative to baby
    //minuteAngle = sunAngle;
    minuteAngle = 360 * sunAngle / 60;
    var secAngle = 360 * date.getSeconds() / 60; //really just here for testing
    var astroAngle = -( //negate because mirror image from looking down instead of up
        //Math.PI //to counterbalance mass
        0 - // to show the planetary body, not its opposite
        (2*Math.PI - ascendant) - //to get the ascendant zeroed to the east (substracting distance from spring equinox)
        meridian + // to add the effect of being at noon
        (meridian - sunAngle) //to get actual hour of day
    ) % (2*Math.PI);
    var astroAngle2 = -( //negate because mirror image from looking down instead of up
        //Math.PI //to counterbalance mass
        0 + // to show the planetary body, not its opposite
        (ascendant - sunAngle) //to get angle from east facing
    ) % (2*Math.PI);
    astroAngle = astroAngle.mod( 2*Math.PI );
    astroAngle2 = astroAngle2.mod( 2*Math.PI );
    //console.log((astroAngle/(Math.PI*2)*360), (astroAngle2/(Math.PI*2)*360) );
    return(astroAngle);
}

function addBrand(sign) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.textContent = zodiacUTF[sign];
    el.classList.add('special');
    el.classList.add('sign-brand');
    el.setAttribute('fill', 'black');
    el.setAttribute('x',300-80);
    el.setAttribute('y',300-60);
    el.setAttribute('font-size',28);
    document.querySelector('svg.illustration .astro-supporting-elements').appendChild(el);
}

function positionObjectInSVG(mass, radius, astroAngle) {
    var cx = 300;
    var cy = 300;
    placeRadially(mass, cx-50, cy-50, radius, astroAngle);
}
function placeRadially(svgel, xcenter, ycenter, radius, angle) {
    svgel.setAttribute('x',xcenter + radius*Math.cos(angle));  // the 75 is half the width/height of the bridge image, because its 0 point is in its upper left corner, not in its center.
    svgel.setAttribute('y',ycenter + radius*Math.sin(angle));
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

function prepareLabels(labelTemplate, astroAngle, sSign , sdesiredsign, sentityname) {
    // (popoulate labels with caluclated content)
    // INJECT entity name info
    var thename = labelTemplate.querySelector(".body-name");
    if ((thename !== null) && (sentityname in d)) {
        thename.innerText = d[sentityname].sname;
    }
    // INJECT angle info
    var sAstroAngle = '' + ((astroAngle + Math.PI/2) / (2*Math.PI) * 360).mod( 360 ).toFixed(0) + 'º';
    var templateAngle = labelTemplate.querySelector(".body-angle");
    if (templateAngle !== null) {
        templateAngle.innerText = sAstroAngle;
    }
    // INJECT sign info
    var templateSign = labelTemplate.querySelector(".body-sign");
    if (templateSign !== null) {
        templateSign.innerText = zodiacSignsInv[sSign];
    }
    // INJECT desired sign info
    var templateDesiredSign = labelTemplate.querySelector(".body-sign-to");
    if (templateDesiredSign !== null) {
        templateDesiredSign.innerText = zodiacSignsInv[sdesiredsign];
    }
    // INJECT distance info
    var distance = labelTemplate.querySelector(".body-distance");
    if ((distance !== null) && (sentityname in d)) {
        distance.innerText = d[sentityname].sdist;
    }
    //console.log(templateAngle);
}

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

/*
 * I have a box that I'm constantly switching different nodes in and out of, and sometimes emptying completely. 
 * when there is no second input, element is compeltely emptied
 */
function replaceTemplate(eparent, echild=null) {
    if (eparent.hasChildNodes()) {
        eparent.removeChild(eparent.childNodes[0]);
        echild.classList.remove("visible");
        echild.classList.add("invisible");
    }
    if (echild !== null) {
        eparent.appendChild(echild);
        echild.classList.remove("invisible");
        echild.classList.add("visible");
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
replaceTemplate(elCenter, elDefaultLabel);
