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
        method.cells = {
            domcells: [],
            swap: function (cell){
                cell.deadzone = !cell.deadzone;
                cell.marker = !cell.marker
            },
            visible: false,
            toggle: () => {
                method.cells.visible = !method.cells.visible;
                for(let i = 0, cells = method.cells.domcells; i < cells.length; i++)
                {
                    if(!cells[i].marker) cells[i].toggle('hidden');
                }
            }
        }
        method.settings = {};
        method.animations = [];

        function shuffle(array)
        {
            var currentIndex = array.length, temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
        }

        method.random = function randomsquare()
        {
            let mapmarkers = document.querySelectorAll(".marker");
            let possiblecells = method.cells.domcells.filter((item) => {
                return !item.deadzone;
            });
            if(possiblecells.length <= 0)
            {
                alert("No Possible Dropzone, please adjust deadzones");
                return;
            }
            shuffle(possiblecells);
            //can choose multiple later
            for(i = 0, amount = 1; i < amount; i++)
            {
                let cell= possiblecells[i];
                cell.toggle('marker');
                cell.off('hidden');
            }

            if(mapmarkers != undefined)
            {
                for(let i = 0; i < mapmarkers.length; i++)
                {
                    mapmarkers[i].toggle('marker');
                    if(!method.cells.visible) mapmarkers[i].on('hidden');
                }
            }
        }

        //add animations to my random function, my defaults and as a property of the object

        method.defaults = {
            deadzones: [0,1,4,5,6,7,8,15,16,23,24,31,32,40,48,56,57],
            settings: {
                granularity: 1
            }
        }

        method.settings = method.defaults.settings;

        method.makescells = () => {
            for(let i = 0; i < 64; i++)
            {
                let x = (((i%8)+1)*98.4)+8;
                let y = ((Math.floor(i/8)+1)*98.4)+8;
                let cell = document.createElementNS(ns, "rect");
                cell.setAttribute('width', 97.4);
                cell.setAttribute('height', 97.4);
                cell.setAttribute('x', x);
                cell.setAttribute('y', y);
                cell.setAttribute('class', 'hidden cell');
                cell.deadzone = false;
                cell.marker = false;
                cell.hidden = false;
                cell.toggle = (prop) => {
                    cell[prop] = !cell[prop]
                    cell.classList.toggle(prop);
                }
                cell.on = (prop) => {
                    cell[prop] = true;
                    cell.classList.add(prop);
                }
                cell.off = (prop) => {
                    cell[prop] = false;
                    cell.classList.remove(prop);
                }
                cell.addEventListener('click', () => {
                    cell.toggle("deadzone");
                    cell.off('marker');
                })
                svg.appendChild(cell);
                if(method.defaults.deadzones.includes(i)) cell.toggle("deadzone");
                method.cells.domcells.push(cell);
            }
        }

        method.makescells();
        return method;
    }

    function makemethod2()
    {
        let method = {};
        method.name = 'Coordinate';
        method.displaydeadzones = false;
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
    let toggles = document.querySelectorAll('.toggle');
    for(let i = 0; i < toggles.length; i++)
    {
        toggles[i].addEventListener('mousedown', () => {
            toggles[i].classList.toggle('checked');
            currentmethod.cells.toggle()
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