document.onload()
{
    var svg = document.getElementById("svgarea");
    var ns = "http://www.w3.org/2000/svg";
    function randomsquare()
    {
        let currect = document.getElementById("dropsquare");
        let x = 8 + 98.4*Math.floor(Math.random()*10);
        let y = 8 + 98.4*Math.floor(Math.random()*10);
    ​
        let square = document.createElementNS(ns, "rect");
        square.setAttribute('width', 97.4);
        square.setAttribute('height', 97.4);
        square.setAttribute('x', x);
        square.setAttribute('y', y);
        square.setAttribute('fill', "rgba(255,298,10,0.2)");
        square.setAttribute('stroke', "rgb(255,198,10)");
        square.setAttribute('stroke-width', 2);
        square.id = "dropsquare";
    ​
        if(currect != undefined) svg.removeChild(currect);
        svg.appendChild(square);
    }

    document.getElementById("roll").addEventListener("click", () => {
        randomsquare();
    });
}