window.onload = function()
{
    //setup svg area, make the right height and grab the namespace for later construction of elements
    var svg = document.getElementById("svgarea");
    svg.setAttribute("height", window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var ns = "http://www.w3.org/2000/svg";

    function makemethod1()
    {
        let method = {};
        method.name = 'Map Cell';
        method.deadzones = [];
        method.settings = {};
        method.animations = [];

        method.random = function randomsquare()
        {
            let mapmarkers = document.querySelectorAll(".marker");
            let deadzone = true;
            let row, col = 0;
            while(deadzone)
            {
                row = 1 + Math.floor(Math.random()*8);
                col = 2 + Math.floor(Math.random()*7);
                if(!method.deadzones.map(x => x.x + (x.y*10)).includes((row*10)+col)) deadzone = false;
            }
            let x = 8 + 98.4*col;
            let y = 8 + 98.4*row;

            let marker = document.createElementNS(ns, "rect");
            marker.setAttribute('width', 97.4);
            marker.setAttribute('height', 97.4);
            marker.setAttribute('x', x);
            marker.setAttribute('y', y);
            marker.setAttribute('fill', "rgba(255,298,10,0.2)");
            marker.setAttribute('stroke', "rgb(255,198,10)");
            marker.setAttribute('stroke-width', 2);
            marker.setAttribute('class', "marker");

            if(mapmarkers != undefined)
            {
                for(let i = 0; i < mapmarkers.length; i++)
                {
                    svg.removeChild(mapmarkers[i]);
                }
            }
            svg.appendChild(marker);
        }

        //add animations to my random function, my defaults and as a property of the object

        method.defaults = {
            deadzones: [
                {x: 2, y: 1},
                {x: 2, y: 8},
                {x: 5, y: 1},
                {x: 6, y: 1},
                {x: 7, y: 1},
                {x: 8, y: 1},
                {x: 8, y: 2},
                {x: 8, y: 3},
                {x: 8, y: 4}
            ],
            settings: {
                granularity: 1
            }
        }

        method.deadzones = method.defaults.deadzones;
        method.settings = method.defaults.settings;

        method.dom = document.getElementById('methodsquare');
        method.show = () => {method.dom.classList.remove('hidden');}
        method.hide = () => {method.dom.classList.add('hidden');}
        method.toggle = () => {method.dom.classList.toggle('hidden');}
        return method;
    }

    function makemethod2()
    {
        let method = {};
        method.name = 'Coordinate';
        method.deadzones = [];
        method.settings = {};
        method.animations = [];

        method.random = function randompoint()
        {
            let mapmarkers = document.querySelectorAll(".marker");
            let x = 0, y = 0;
            x = 106.4 + Math.floor(Math.random()*(1000-212.8));
            y = 106.4 + Math.floor(Math.random()*(1000-212.8));

            let marker = document.createElementNS(ns, "circle");
            marker.setAttribute('r', method.defaults.settings.size);
            marker.setAttribute('cx', x);
            marker.setAttribute('cy', y);
            marker.setAttribute('fill', "rgba(255,298,10,0.2)");
            marker.setAttribute('stroke', "rgb(255,198,10)");
            marker.setAttribute('stroke-width', 2);
            marker.setAttribute('class', "marker");

            if(mapmarkers != undefined)
            {
                for(let i = 0; i < mapmarkers.length; i++)
                {
                    svg.removeChild(mapmarkers[i]);
                }
            }
            svg.appendChild(marker);
        }

        //add animations to my random function, my defaults and as a property of the object

        method.defaults = {
            deadzones: [],
            settings: {
                size: 60
            }
        }

        method.deadzones = method.defaults.deadzones;
        method.settings = method.defaults.settings;
        method.dom = document.getElementById('methodcircle');
        method.show = () => {method.dom.classList.remove('hidden');}
        method.hide = () => {method.dom.classList.add('hidden');}
        method.toggle = () => {method.dom.classList.toggle('hidden');}
        return method;
    }
    
    var methods = [];
    methods.push(makemethod1());
    methods.push(makemethod2());
    let defaultmethod = methods[0];
    var currentmethod = defaultmethod;

    //setup column functionality
    let dropdown = document.getElementById("methoddropdown");
    let dropdowncontent = dropdown.children[0];
    let dropwdownlist = dropdown.children[1];
    for(let i = 0, children = dropwdownlist.children; i < children.length; i++)
    {
        children[i].addEventListener('click', () => {
            currentmethod.toggle();
            currentmethod = methods[i];
            currentmethod.toggle();
            dropdowncontent.textContent = currentmethod.name;
        });
    }


    document.getElementById("roll").addEventListener("click", () => {
        currentmethod.random();
        /* 
        //for testing
        for(let i = 0; i < 100; i++)
        {
            randomsquare();
        }*/

    });
}