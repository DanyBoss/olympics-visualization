
// global variables
var selectedNode = null,
    currentLevel = 0,   // defines the deepness we're seeing in the vis (All = 0, Sport = 1; Discipline = 2; Event = 3)
    countryFilter = ["USA"],
    countryLineIdentifier = [[null , 0],[null , 1],[null , 2],[null , 3]]
    countryName = "United States"
    sportFilter = "All",
    disciplineFilter = "All",
    eventFilter = "All",
    initialYearFilter = 1896,
    endYearFilter = 2012,
    currentFilterKeyword = "Sport"
    dictionary = null;

// colors used throughout the visualization
var color,
    color_old = d3.scaleOrdinal(d3.schemeSet3),
    colorAlt = d3.scaleOrdinal(d3.schemeCategory20),
    colorArray = ["#96caff", "#faff16", "#fda899", "#13fcbb", "#f7fef7", "#eba6ff", "#bcca83", "#57e502", "#feaf23", "#c6c0cb", "#38f1fd", "#9ccfbe", "#f9feae", "#a6fe8e", "#bfcd03", "#ebd3b6", "#fec0df", "#c2eefc", "#cac2fc", "#bcfcd6", "#f4e5ff", "#f9dc56", "#80da93", "#ebb678", "#b1fb27", "#30dfc8", "#8dd0df", "#1ff479", "#cedbd8", "#d2e6b8", "#85feea", "#97db5c", "#deb7b7", "#cad5ef", "#d0eb6d", "#fe9fe1", "#bdc7ad", "#fcdadf", "#d9bae2", "#dac05a", "#ecda91", "#fef5d0", "#ffa4bc", "#43d9fd", "#d2fcf5", "#b1c7d0", "#e6f0fb", "#83e5bd", "#b2e598", "#fdfb73", "#73fd58", "#a6cfa2", "#a1e3e1", "#e4e21c", "#8ef8b0", "#e2c30e", "#fdc7ff", "#cefeb9", "#0be597", "#d4c491", "#fdc5b5", "#e4fdde", "#d5ccc7", "#acdaf8", "#e4c9da", "#fdc664", "#badfc5", "#bbd15f", "#fdf1f7", "#b4c3ed", "#93e8fd", "#ddd9e3", "#e5e5d7", "#98e116", "#e0d0fb", "#fccd95", "#aafdfe", "#5cd9de", "#deba9d", "#dce994", "#d6b2fb", "#c5bedd", "#bec4c3", "#feab79", "#82ea7f", "#fed7f3", "#8affd2", "#d6fc50", "#e8aed9", "#f7b7c2", "#2bf4e5", "#ffad53", "#11ff13", "#d3fe94", "#c2e530", "#aef161", "#fee5d4", "#a3d378", "#dad351", "#fec328", "#a4e3b3", "#a9efd9", "#feeb8a", "#85d4cd", "#e0b4c9", "#55e358", "#bddbe1", "#48ffa0", "#d6eee1", "#fee3b0", "#ff99fd", "#3fe0b0", "#84d7fe", "#7be9d3", "#1bf3cd", "#d4d4af", "#d6d278", "#70fffe", "#aac8e1", "#ffb0fe", "#b5ccbf", "#c6ccd5", "#ccd9c5", "#feee3e", "#cdc0ab", "#58e182", "#e9b8f8", "#f7bc97", "#b4e275", "#bee8e1", "#e1e3ff", "#ebebb2", "#8fd4af", "#c0d3a2", "#e7c67d", "#6ceba9", "#d8cde4", "#eacdc6", "#d4eef1", "#e7e8e9", "#7deaec", "#88f31d", "#c0efbe", "#75d8be", "#a0d1d3", "#fdacd4", "#09f64f", "#c4dc8c", "#d0d1fc", "#ecccf1", "#f7d517", "#d0dde8", "#e7dadc", "#78fe8b", "#e6e373", "#cde5fd", "#b1fead", "#e7fec5", "#e9fdfd", "#b9c3d9", "#cebec1", "#eab3a4", "#edb84a", "#8aea52", "#bad5fd", "#a7ddea", "#f9c9d5", "#f2deec", "#fbf4e7", "#b3d8cf", "#feb9ed", "#96e89d", "#d5d99c", "#efd16f", "#ecfb92", "#d0bbd2", "#89d97b", "#cdc47c", "#acd345", "#21e0f4", "#9ed693", "#9adfcd", "#ccdc4c", "#e3e3c2", "#d8f003", "#e7f158", "#b8fff2", "#cdb9e9", "#faa8ae", "#cac75c", "#d7d119", "#eccb48", "#bbd7ea", "#a0f3c1", "#cbeaa6", "#c5f4e0", "#ede9f5", "#b8bffd", "#97cced", "#70dba6", "#72dbf2", "#e6bddd", "#ddc2fe", "#b8ddb0", "#e7d29e", "#c7ec8c", "#d1edce", "#c8fb75", "#f9ffe8", "#e9abeb", "#b5d1b3", "#feb6af", "#ffba6e", "#92f772", "#e8f4cb", "#ffeda8", "#e5ff77", "#f6f8fe", "#c4c699", "#c5ca3f", "#e9bb29", "#19e2dc", "#d9bfb4", "#c6cabf", "#e6c091", "#bcd0d0", "#d5cbd3", "#aae346", "#d0d2d3", "#f1c7ab", "#72ef95", "#cdda6f", "#d9d5c0", "#a2eb81", "#72f3cc", "#91efe6", "#fed284", "#a6edf6", "#4bfee0", "#9bfb4f", "#c1f3f6", "#e0f9ab", "#d4ffd2", "#fffac1", "#a9c5fd", "#f0acc4", "#7adf34", "#a8d516", "#86dade", "#6cdfd7", "#a7d5b9", "#b4d899", "#f1c0bf", "#a9e8c7", "#e6e04c", "#fcd4bf", "#67feb6", "#ddfeee", "#f5af92", "#a7cddc", "#c7cae9", "#e1c2c9", "#06f6a4", "#64f36c", "#ffd056", "#e9d3ea", "#94f595", "#eadbcc", "#acf2b2", "#a2fde0", "#f5e5c6", "#f7eb67", "#f1e9e6", "#e2efdb", "#fbfd52", "#aacac8", "#6fdf6e", "#23e83d", "#d6c33e", "#edbb66", "#96d8f1", "#d9c9a7", "#30ef8c", "#66ed41", "#eabeed", "#c3dbce", "#d6d6e9", "#f8c6ee", "#d5d9d1", "#96f0cc", "#c7ef56", "#8ef6ff", "#aff0e8", "#b7f593", "#dee7e0", "#bdff5c", "#eff01a", "#d7f0fe", "#bdfdc3", "#f0ef9c", "#d3fe14", "#bec0ea", "#c6c2be", "#eab1b3"]

// years in which olympics occored
var years = [1896, 1900, 1904, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012]

// animation variables
var animationTime = 750;

//set a reload function on window resize
window.onresize = function(){ location.reload(); }

// call first vis drawing
$(document).ready(function() {
    loadDictionary();

    genTimeSlider();
    genBubblechart(false, -1);
    genLinechart();
    genWorldMap();
    genScatterplot();
});

// AUXILIARY FUNCTIONS //
function loadDictionary(){
    d3.csv("csv/dictionary.csv", function(error, data){
        if (error) throw error;
        
        color = d3.scaleOrdinal()
        .domain(data)
        .range(colorArray);

        dictionary = data;
    })
};

// return the country ID if it exists in the dictionary
// -1 if it doesn't exit
function getCountryIDinDB(countryName){
    return dictionary.findIndex(i => i.CountryName === countryName);
}

function getCountryIDinDBByCode(iocCode){
    return dictionary.findIndex(i => i.CountryCode === iocCode);
}

// converts a country name to the IOC code
function convertNameToIOCCode(countryName){
    return dictionary[getCountryIDinDB(countryName)].CountryCode;
}
// converts a IOC code to the country name
function convertIOCCodeToName(iocCode){
    return dictionary[getCountryIDinDBByCode(iocCode)].CountryName;
}

function changeCountry(country){
    countryFilter = [String(country)];
    countryName = convertIOCCodeToName(country);


    genBubblechart(true, 0);
    updateLinechart(true);
    genScatterplot(true);
};

function addCountryToSelection(country){
    
    countryFilter.push(String(country));

    genBubblechart(true, 0);
    updateLinechart();
    genScatterplot(true);
}

function removeCountryFromSelection(country){

    countryFilter.splice(countryFilter.indexOf(String(country)), 1);
    removeLineID(country);

    genBubblechart(true, 0);
    updateLinechart();
    genScatterplot(true);

}

function clearLineIDArray(){
    for(i = 0; i < countryLineIdentifier.length; i++){
        countryLineIdentifier[i][0] = null;
        hideLine(i);
    }
}

function getLineID(country){
    for(i = 0; i < countryLineIdentifier.length; i++){
        if(countryLineIdentifier[i][0] === country){
            return i;
        }
    }
    return -1;
}

function setNextFreeLineID(country){
    for(i = 0; i < countryLineIdentifier.length; i++){
        if(countryLineIdentifier[i][0] === null){
            setLineID(country, i);
            showLine(i);
            return i;
        }
    }
    return -1;
}

function removeLineID(country){
    hideLine(getLineID(country));
    countryLineIdentifier[getLineID(country)][0] = null;
}

function setLineID(country, id){
    countryLineIdentifier[id] = [country, id]
}


function changeTimeline(begin, end){
    //check if a update is necessary
    if(initialYearFilter != years[Math.round(begin)] || endYearFilter != years[Math.round(end)] ){
        initialYearFilter = years[Math.round(begin)];
        endYearFilter = years[Math.round(end)];
    
        genBubblechart(true, 0);
        updateLinechart();
        genScatterplot(true);
    }
};

function checkIfTimelineIsBetween(begin, end){
    return (begin <= initialYearFilter && end >= initialYearFilter && begin <= endYearFilter &&  end >= endYearFilter);
}

//function assumes we never use a year outside of year array
function checkIfYearInInterval(year){
    return (year >= initialYearFilter && year <= endYearFilter);
};

//function to get a CSS variable from the CSS
function getCSSColor(variable){
    return getComputedStyle(document.body).getPropertyValue(variable);
};

// descending filter compararation function
function descending(a,b) { return a.key - b.key };