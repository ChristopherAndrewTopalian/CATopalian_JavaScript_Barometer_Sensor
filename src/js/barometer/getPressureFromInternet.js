// getPressureFromInternet.js

function getPressureFromInternet()
{
    // get Location
    if ("geolocation" in navigator)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            
            cl("Got location: " + lat.toFixed(2) + ", " + lon.toFixed(2));

            // Ask Open-Meteo for the pressure at this location
            // 'surface_pressure' is the raw reading (like a barometer), 'sealevel_pressure' is adjusted.
            // For a sensor replacement, surface_pressure is usually what you want.
            let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Open-Meteo returns data structure: data.current.surface_pressure
                    if (data.current && data.current.surface_pressure)
                    {
                        let pressure = data.current.surface_pressure;
                        
                        cl("Internet Pressure: " + pressure + " hPa");

                        ge('pressure-reading-display').textContent = "Internet Pressure: " + pressure + " hPa";
                        
                        if (pressureDisplay)
                        {
                            pressureDisplay.innerText = pressure + " hPa (Web)";
                            // Clear the error because we fixed it with data!
                            ge('errorMessageDiv').textContent = ""; 
                        }
                    }
                })
                .catch(function(err)
                {
                    console.error("Internet fetch failed:", err);
                    ge('errorMessageDiv').textContent = "Could not get pressure from Hardware OR Internet.";
                });
        }, 
        function(error) {
            console.error("Geolocation denied:", error);
            ge('errorMessageDiv').textContent = "Need Location access to get weather data.";
        });
    }
    else
    {
        ge('errorMessageDiv').textContent = "Geolocation not supported.";
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

