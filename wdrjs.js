window.onload = function()
{
    //setup svg area, make the right height and grab the namespace for later construction of elements
    var svg = document.getElementById("svgarea");
    svg.setAttribute("height", window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var ns = "http://www.w3.org/2000/svg";

    //setup column functionality
    document.getElementById("methoddropdown");

    //set up default settings
    



    function randomsquare()
    {
        let deadzones = [
            {x: 2, y: 1},
            {x: 2, y: 8},
            {x: 5, y: 1},
            {x: 6, y: 1},
            {x: 7, y: 1},
            {x: 8, y: 1},
            {x: 8, y: 2},
            {x: 8, y: 3},
            {x: 8, y: 4}
        ]
        let currect = document.getElementById("dropsquare");
        let deadzone = true;
        let row, col = 0;
        while(deadzone)
        {
            row = 1 + Math.floor(Math.random()*8);
            col = 2 + Math.floor(Math.random()*7);
            if(!deadzones.map(x => x.x + (x.y*10)).includes((row*10)+col)) deadzone = false;
        }
        let x = 8 + 98.4*col;
        let y = 8 + 98.4*row;

        let square = document.createElementNS(ns, "rect");
        square.setAttribute('width', 97.4);
        square.setAttribute('height', 97.4);
        square.setAttribute('x', x);
        square.setAttribute('y', y);
        square.setAttribute('fill', "rgba(255,298,10,0.2)");
        square.setAttribute('stroke', "rgb(255,198,10)");
        square.setAttribute('stroke-width', 2);
        square.id = "dropsquare";

        if(currect != undefined) svg.removeChild(currect);
        svg.appendChild(square);
    }

    document.getElementById("roll").addEventListener("click", () => {
        randomsquare();
        /* 
        //for testing
        for(let i = 0; i < 100; i++)
        {
            randomsquare();
        }*/
    });
}