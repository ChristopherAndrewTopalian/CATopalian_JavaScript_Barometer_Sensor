// startBarometer.js

let pressureSensor = null;
let pressureDisplay = ge("pressure-reading-display");

function startBarometer()
{
    // THE PRE-CHECK FAIL
    if (!("PressureSensor" in window))
    {
        ge('errorMessageDiv').textContent = "PressureSensor API not supported by this browser.";
        cl("PressureSensor API not supported.");
        if (pressureDisplay) pressureDisplay.innerText = "N/A";
        return; // Stop here, no point continuing
    }

    try
    {
        // create the sensor
        pressureSensor = new PressureSensor({ frequency: 1 });

        // define what happens when we get a reading
        pressureSensor.addEventListener("reading", function()
        {
            let pressureValue = pressureSensor.pressure;
            cl("Current Pressure:", pressureValue, "hPa");

            if (pressureDisplay)
            {
                pressureDisplay.innerText = pressureValue.toFixed(2) + ' hPa';
                // Clear error message if it starts working!
                ge('errorMessageDiv').textContent = ""; 
            }
        });

        // THE RUNTIME FAIL (Hardware or Permission issues)
        pressureSensor.addEventListener("error", function (event)
        {
            // By default, assume generic error
            let msg = "Sensor Error: " + event.error.name;

            if (event.error.name === "NotAllowedError")
            {
                msg = "Barometer permission denied.";
            }
            else if (event.error.name === "NotReadableError")
            {
                msg = "Barometer hardware not found on this device.";
            }

            ge('errorMessageDiv').textContent = msg;
            console.warn(msg);
            
            if(pressureDisplay) pressureDisplay.innerText = "Error";
        });

        // start the sensor
        pressureSensor.start();
        cl("Barometer started...");
    }
    catch(err)
    {
        // THE STARTUP FAIL (Code crashed or Security blocked it immediately)
        let failMsg = "Could not start sensor: " + err.message;
        ge('errorMessageDiv').textContent = failMsg;
        console.error(failMsg);
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

