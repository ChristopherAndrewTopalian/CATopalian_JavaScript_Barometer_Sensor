// getPressureWithLocationData.js

function getPressureWithLocationData()
{
    // get Location
    if ("geolocation" in navigator)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            
            cl("Got location: " + lat.toFixed(4) + ", " + lon.toFixed(4));

            // show Coordinates Immediately
            // We verify the div exists first to avoid errors
            if (ge('lonLatDiv')) 
            {
                // toFixed(4) is standard for GPS precision (street level)
                ge('lonLatDiv').innerText = "Lat: " + lat.toFixed(4) + "  Lon: " + lon.toFixed(4);
            }

            // get The Address (Async)
            // We use BigDataCloud's free client API (No Key Needed)
            let geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

            fetch(geoUrl)
                .then(response => response.json())
                .then(data => {
                    // It returns a lot of info, we just want City/Locality and State
                    let city = data.city || data.locality || "Unknown Location";
                    let region = data.principalSubdivision || ""; // State/Province
                    let countryCode = data.countryCode || "";

                    if (ge('addressDiv'))
                    {
                        ge('addressDiv').innerText = `${city}, ${region} (${countryCode})`;
                    }
                })
                .catch(err => {
                    console.error("Address lookup failed:", err);
                    if (ge('addressDiv')) ge('addressDiv').innerText = "Address Not Found";
                });

            // get the Pressure (Open-Meteo)
            let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure`;
            
            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.current && data.current.surface_pressure)
                    {
                        let pressure = data.current.surface_pressure;
                        
                        cl("Internet Pressure: " + pressure + " hPa");

                        // update the display
                        if (ge('pressure-reading-display'))
                        {
                            ge('pressure-reading-display').innerText = pressure + " hPa (Web)";
                            // clear error div because we succeeded
                            ge('errorMessageDiv').textContent = ""; 
                        }
                    }
                })
                .catch(function(err)
                {
                    console.error("Internet weather fetch failed:", err);
                    ge('errorMessageDiv').textContent = "Could not get pressure data.";
                });
        }, 
        function(error)
        {
            console.error("Geolocation denied:", error);
            ge('errorMessageDiv').textContent = "Need Location access for data.";
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

