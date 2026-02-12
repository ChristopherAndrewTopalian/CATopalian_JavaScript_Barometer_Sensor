// startBarometer.js

let pressureSensor = null;

let pressureDisplay = ge("pressure-reading-display");

// initialize the sensor
function startBarometer()
{
    // check if the browser even knows what a PressureSensor is
    if ("PressureSensor" in window)
    {
        try
        {
            // create the sensor.
            // frequency: 1 means read it once per second (1 Hz).
            // Lower frequency = better battery life.
            pressureSensor = new PressureSensor({ frequency: 1 });

            // define what happens when we get a reading
            pressureSensor.addEventListener("reading", function()
            {
                // the reading is usually in hPa (hectopascals) which is the same as millibars.
                let pressureValue = pressureSensor.pressure;

                cl("Current Pressure:", pressureValue, "hPa");

                if (pressureDisplay)
                {
                    // round it to 2 decimal places for neatness
                    pressureDisplay.innerText = pressureValue.toFixed(2) + 'hPa';
                }
            });

            // define what happens if there's an error
            pressureSensor.addEventListener("error", function (event)
            {
                if (event.error.name === "NotAllowedError")
                {
                    console.warn("Barometer permission denied by user or OS.");

                    if (pressureDisplay)
                    {
                        pressureDisplay.innerText = "Permission Denied";
                    }
                }
                else if (event.error.name === "NotReadableError")
                {
                    console.warn(
                        "Barometer hardware not available on this device.",);

                    if (pressureDisplay)
                    {
                        pressureDisplay.innerText = "No Sensor Found";
                    }
                }
                else
                {
                    console.error("Barometer error:", event.error.name);
                }
            });

            // start the sensor
            pressureSensor.start();

            cl("Barometer started...");
        }
        catch(err)
        {
            console.error(
                "Could not initialize PressureSensor. Your browser might not support it properly yet.",
                err,
            );
        }
    }
    else
    {
        console.log("PressureSensor API not supported by this browser.");

        if (pressureDisplay)
        {
            pressureDisplay.innerText = "Not Supported";
        }
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

