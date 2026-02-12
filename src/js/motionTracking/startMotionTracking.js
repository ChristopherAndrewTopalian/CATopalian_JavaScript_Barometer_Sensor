// startMotionTracking.js

function startMotionTracking()
{
    // hide button once sensors are active
    ge('startBtn').style.display = 'none';

    window.addEventListener('devicemotion', function(event)
    {
        // get the data
        let x = event.accelerationIncludingGravity.x || 0;
        let y = event.accelerationIncludingGravity.y || 0;
        let z = event.accelerationIncludingGravity.z || 0;

        // update the screen
        ge('xOut').textContent = x.toFixed(2);
        ge('yOut').textContent = y.toFixed(2);
        ge('zOut').textContent = z.toFixed(2);

        /*
        // dynamic bg Color (visual feedback)
        // we multiply by 15 to make the color change noticeable
        let r = Math.floor(Math.abs(x) * 15);
        let g = Math.floor(Math.abs(y) * 15);
        let b = Math.floor(Math.abs(z) * 5);
        
        document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        */
    });
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2026
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

