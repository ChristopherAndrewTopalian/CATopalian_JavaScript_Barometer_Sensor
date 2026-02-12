// requestMotionPermission.js

function requestMotionPermission()
{
    // handle iOS requirement for permission
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function')
    {
        DeviceMotionEvent.requestPermission()
            .then(function(permissionState)
            {
                if (permissionState === 'granted')
                {
                    startMotionTracking();
                }
            })
            .catch(function(err)
            {
                cl("Permission Error: " + err);
            });
    }
    else
    {
        // Android or PC usually doesn't need explicit pop-up permission
        startMotionTracking();
    }
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

