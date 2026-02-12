// makeInterface.js

function makeInterface()
{
    let mainDiv = ce('div');
    ba(mainDiv);

    //-//

    mainDiv.append(makeTitleOfApp());

    //-//
    
    mainDiv.append(ce('hr'));
    
    //-//

    let errorMessageDiv = ce('div');
    errorMessageDiv.textContent = '';
    errorMessageDiv.id = 'errorMessageDiv';
    mainDiv.append(errorMessageDiv);

    //-//

    let pressureReadingDiv = ce('div');
    pressureReadingDiv.id = 'pressure-reading-display';
    pressureReadingDiv.textContent = 'Barometer Reading';
    pressureReadingDiv.style.fontWeight = 'bold';
    mainDiv.append(pressureReadingDiv);

    //-//

    let barometerStartBtn = ce('button');
    barometerStartBtn.onclick = function()
    {
        //startBarometer(); // experimental
        getPressureFromInternet();
    };
    barometerStartBtn.textContent = 'Barometer';
    mainDiv.append(barometerStartBtn);

    //-//

    mainDiv.append(ce('hr'));

    //-//

    let motionDetails = ce('details');
    mainDiv.append(motionDetails);

    let motionSummary = ce('summary');
    motionSummary.textContent = 'Motion Sensor';
    motionDetails.append(motionSummary);

    //-//

    let motionContainer = ce('div');
    motionDetails.append(motionContainer);

    //-//

    let mainTitle = ce('h1');
    mainTitle.textContent = "Motion Tracking";
    motionContainer.append(mainTitle);

    //-//

    // X Axis Display
    let xLabel = ce('div');
    xLabel.textContent = "X - Side Tilt";
    xLabel.className = 'axisLabel';
    motionContainer.append(xLabel);

    let xOut = ce('div');
    xOut.id = 'xOut';
    xOut.className = 'valueBox';
    xOut.textContent = '0.00';
    motionContainer.append(xOut);

    //-//

    // Y Axis Display
    let yLabel = ce('div');
    yLabel.textContent = "Y - Front Tilt";
    yLabel.className = 'axisLabel';
    motionContainer.append(yLabel);

    let yOut = ce('div');
    yOut.id = 'yOut';
    yOut.className = 'valueBox';
    yOut.textContent = '0.00';
    motionContainer.append(yOut);

    //-//

    // Z Axis Display
    let zLabel = ce('div');
    zLabel.textContent = "Z - Gravity";
    zLabel.className = 'axisLabel';
    motionContainer.append(zLabel);

    let zOut = ce('div');
    zOut.id = 'zOut';
    zOut.className = 'valueBox';
    zOut.textContent = '0.00';
    motionContainer.append(zOut);

    //-//

    // activation button
    let startBtn = ce('button');
    startBtn.id = "startBtn";
    startBtn.textContent = "Initialize Sensors";
    startBtn.onclick = function()
    {
        requestMotionPermission();
    };
    motionContainer.append(startBtn);
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting
