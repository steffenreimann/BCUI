//import moment from 'moment';


const tables = document.querySelectorAll('table');
var header

tables.forEach(table => {
    const headerCells = table.querySelectorAll('th');

    headerCells.forEach(headerCell => {

        const resizeBar = document.createElement('resizebar');
        headerCell.appendChild(resizeBar)

        resizeBar.addEventListener('mousedown', startResize);
    });


});

function startResize(e) {
    header = e.currentTarget.parentElement;



    const startX = e.clientX;
    document.addEventListener('mousemove', moveResize);
    document.addEventListener('mouseup', stopResize);

    function moveResize(e) {

        header.style.width = e.clientX - header.offsetLeft - 8
        var colIndex = header.getAttribute('colIndex')

        var colstoupdate = document.querySelectorAll('[colindex="' + colIndex + '"]')
        colstoupdate.forEach(coltoupdate => {
            coltoupdate.style.width = e.clientX - header.offsetLeft - 8
        });

    }

    function stopResize() {
        document.removeEventListener('mousemove', moveResize);
        document.removeEventListener('mouseup', stopResize);
    }
}



function renderTable(HTMLElement, data) {

    HTMLElement.style.display = 'grid';

    var cols = Object.keys(data[0].table).length

    var colWidth = 100;
    if (cols <= 5) {
        colWidth = HTMLElement.offsetWidth / cols;
    } else {
        colWidth = HTMLElement.offsetWidth / 5;
    }

    colWidth -= 15

    var tablerow = document.createElement('tablerow');
    var colIndex = 0;
    for (const key in data[0].table) {
        if (Object.hasOwnProperty.call(data[0].table, key)) {
            const element = data[0].table[key];


            var tableheader = document.createElement('tableheader');
            tableheader.innerHTML = element.caption;
            tableheader.setAttribute("colIndex", colIndex);
            tableheader.style.width = `${colWidth}px`;
            const resizeBar = document.createElement('resizebar');
            tableheader.appendChild(resizeBar)

            resizeBar.addEventListener('mousedown', startResize);

            tablerow.appendChild(tableheader);
            HTMLElement.appendChild(tablerow)
            colIndex++
        }
    }

    colIndex = 0;


    data.forEach(element => {
        //Zeile 
        var tablerow = document.createElement('tablerow');

        for (const key in element.table) {
            if (Object.hasOwnProperty.call(element.table, key)) {
                //Zeilendaten 
                const element1 = element.table[key];

                var tabledata = document.createElement('tabledata');
                tabledata.setAttribute("colIndex", colIndex);


                var field
                //console.log(element1);
                switch (element1.type) {
                    case 'String':
                        field = document.createElement('input');
                        field.type = 'text';
                        field.classList.add('form');
                        field.value = element1.value;
                        break;
                    case 'Option':
                        field = document.createElement('select');
                        // field.type = 'text';
                        field.classList.add('form');

                        options[element1.options].forEach(option => {
                            var optionsHTML = document.createElement('option');
                            optionsHTML.innerHTML = option
                            field.appendChild(optionsHTML)
                        });

                        field.value = element1.value;
                        break;

                    default:
                        field = document.createElement('input');
                        field.type = 'text';
                        field.classList.add('form');
                        field.value = element1.value;
                        break;
                }

                field.setAttribute("colIndex", colIndex);

                tabledata.appendChild(field);

                tabledata.style.width = `${colWidth}px`;
                tablerow.appendChild(tabledata);
            }
            colIndex++
        }
        colIndex = 0
        HTMLElement.appendChild(tablerow)
    })
}





function createPastFutureArray(startMoment, stepsPast, stepsFuture, interval = 'day') {
    const timeArray = [];

    // Zeitpunkte in die Vergangenheit
    for (let i = stepsPast; i > 0; i--) {
        timeArray.push(startMoment.clone().subtract(i, interval));
    }

    // Startzeitpunkt
    timeArray.push(startMoment);

    // Zeitpunkte in die Zukunft
    for (let i = 1; i <= stepsFuture; i++) {
        timeArray.push(startMoment.clone().add(i, interval));
    }

    return timeArray;
}




function renderTimeline(HTMLElement, data) {


    /*     data.forEach(element => {
            element.timeline.forEach(timelineElement => {
            });
        }); */


}





class Gantt {

    constructor(data) {
        this.DaysBeforePointer = data.DaysBeforePointer || 4;
        this.DaysAfterPointer = data.DaysAfterPointer || 4;
        this.TimeUnit = data.TimeUnit || 'day';
        this.Pointer = data.Pointer || moment();
        this.HTMLElement = data.HTMLElement;

        this.timeline = this.HTMLElement.querySelector('timeline');
        this.timeline.header = this.timeline.querySelector('header');
        this.timeline.lines = this.timeline.querySelector('lines');
        this.table = this.HTMLElement.querySelector('bctable');

        this.data = data.data;

        this.DOMElements = {
            table: [],
            timeline: []
        };

        this.times = {}

    }

    renderNextLine(element) {
        //console.log(data);
        // data.forEach(element => {
        //Zeile 
        var tablerow = document.createElement('tablerow');
        var timelinerow = document.createElement('tablerow');

        this.DOMElements.table.push(tablerow)
        this.DOMElements.timeline.push(timelinerow)

        this.timeline.lines.appendChild(timelinerow);

        //console.log(pastFutureArray);
        this.pastFutureArray.forEach(time => {

            for (let index = 1; index < 25; index++) {

                var tabledata = document.createElement('tabledata');
                tabledata.setAttribute("date", time.format('DD.MM.YY'));
                tabledata.setAttribute("colIndex", index);
                tabledata.setAttribute("lineIndex", element.index);

                console.log(element);
                console.log(time);
                // tabledata.innerHTML = index;
                timelinerow.appendChild(tabledata);
            }
        });


        tablerow.onmouseover = (event) => {
            tablerow.classList.add('hover');
            timelinerow.classList.add('hover');
        };

        tablerow.onmouseleave = (event) => {
            tablerow.classList.remove('hover');
            timelinerow.classList.remove('hover');
        };

        timelinerow.onmouseover = (event) => {
            tablerow.classList.add('hover');
            timelinerow.classList.add('hover');
        };


        timelinerow.onmouseleave = (event) => {
            tablerow.classList.remove('hover');
            timelinerow.classList.remove('hover');
        };






        for (const key in element.table) {
            if (Object.hasOwnProperty.call(element.table, key)) {
                //Zeilendaten 
                const element1 = element.table[key];

                var tabledata = document.createElement('tabledata');
                //tabledata.setAttribute("colIndex", colIndex);


                var field
                //console.log(element1);
                switch (element1.type) {
                    case 'String':
                        field = document.createElement('input');
                        field.type = 'text';
                        field.classList.add('form');
                        field.value = element1.value;
                        break;
                    case 'Option':
                        field = document.createElement('select');
                        // field.type = 'text';
                        field.classList.add('form');

                        options[element1.options].forEach(option => {
                            var optionsHTML = document.createElement('option');
                            optionsHTML.innerHTML = option
                            field.appendChild(optionsHTML)
                        });

                        field.value = element1.value;
                        break;

                    default:
                        field = document.createElement('input');
                        field.type = 'text';
                        field.classList.add('form');
                        field.value = element1.value;
                        break;
                }

                //field.setAttribute("colIndex", colIndex);

                tabledata.appendChild(field);

                tabledata.style.width = `${this.colWidth}px`;
                tablerow.appendChild(tabledata);
            }
            //colIndex++
        }
        //colIndex = 0
        this.table.appendChild(tablerow)
        //  })
    }



    render() {

        var that = {}

        that.table = this.table
        that.timeline = this.timeline



        this.table.style.display = 'grid';

        var cols = Object.keys(data[0].table).length

        this.colWidth = 100;
        if (cols <= 5) {
            this.colWidth = this.table.offsetWidth / cols;
        } else {
            this.colWidth = this.table.offsetWidth / 5;
        }


        this.colWidth -= 15

        var tablerow = document.createElement('tablerow');


        var colIndex = 0;
        for (const key in data[0].table) {
            if (Object.hasOwnProperty.call(data[0].table, key)) {
                const element = data[0].table[key];
                //console.log(key, element);

                var tableheader = document.createElement('tableheader');
                tableheader.innerHTML = element.caption;
                tableheader.setAttribute("colIndex", colIndex);
                tableheader.style.width = `${this.colWidth}px`;
                const resizeBar = document.createElement('resizebar');
                tableheader.appendChild(resizeBar)

                resizeBar.addEventListener('mousedown', startResize);

                tablerow.appendChild(tableheader);
                this.table.appendChild(tablerow)
                colIndex++
            }
        }





        // Beispiel: Startpunkt heute, 5 Schritte in die Vergangenheit, 5 in die Zukunft
        //const today = moment().add(3, 'hour');
        this.pastFutureArray = createPastFutureArray(this.Pointer, this.DaysBeforePointer, this.DaysAfterPointer);

        // Ausgabe (formatiert für bessere Lesbarkeit)
        this.pastFutureArray.forEach(time => {

            var div = document.createElement('timeunitwrapper');
            var timeunit = document.createElement('timeunit');
            timeunit.innerHTML = time.format('DD.MM.YY');
            div.appendChild(timeunit);


            for (let index = 1; index < 25; index++) {

                var timeitem = document.createElement('timeitem');
                timeitem.innerHTML = index;
                div.appendChild(timeitem);
            }

            this.timeline.header.appendChild(div);

        });


        /*     this.timeline = this.HTMLElement.querySelector('timeline');
            this.timeline.header = this.timeline.querySelector('timeline');
            this.timeline.lines = this.timeline.querySelector('lines'); */


        var test = getComputedStyle(this.HTMLElement)

        var visableLines = this.HTMLElement.offsetHeight / 42


        console.log(this.HTMLElement.offsetHeight);
        //console.log(test);
        console.log(test.width);
        console.log(test.height);
        console.log(visableLines);
        // console.log(getComputedStyle(this.HTMLElement));

        colIndex = 0;


        this.timeline.onscroll = function (ev) {
            var offset = Number(ev.target.scrollTop / 40).toFixed(0)
            console.log('offset', offset);
            that.table.scrollTop = ev.target.scrollTop;

            //this.renderNextLine(element)

        };

        this.table.onscroll = function (ev) {
            console.log('ev.target.scrollTop', ev.target.scrollTop);
            that.timeline.scrollTop = ev.target.scrollTop;




        };

        var times = {}

        this.timeline.querySelector('lines').onclick = function (ev) {
            // this.timeline.onclick = function (ev) {
            var line = ev.target.getAttribute('lineindex')
            var hour = ev.target.getAttribute('colindex')
            var date = ev.target.getAttribute('date')
            var jsonkey = `${date},${hour},${line}`
            var htmlkey = `[date="${date}"][colindex="${hour}"][lineindex="${line}"]`
            var HTMLE = document.querySelector(htmlkey)
            console.log(htmlkey)
            console.log(jsonkey)

            console.log(ev.target);
            console.log(ev.target.parentElement);
            console.log(HTMLE);
            console.log();



            console.log(times[line]);


            if (times[line] == undefined) {
                console.log('Set Start');

                times[line] = { start: new Point(ev.target, line, hour, date, 0) }
            } else {
                if (times[line].end == undefined) {
                    console.log('Set End');
                    times[line].end = new Point(ev.target, line, hour, date, 0)


                    //times[line].start.compare(times[line].end)
                    times[line].elementsline = []

                    times[line].elementsline.push(times[line].start)

                    //times[line].end.hour == times[line].end.date




                    var start = times[line].start
                    var end = times[line].end

                    var starttime = moment(start.date)
                    var endtime = moment(end.date)


                    console.log(times[line]);
                    console.log(starttime);
                    console.log(endtime);
                    console.log(endtime.isBefore(starttime));


                    if (endtime.isBefore(starttime)) {
                        //change start and end
                        var temp = times[line].start
                        console.log(temp);
                        console.log(times[line].start);
                        console.log(times[line].end);
                        times[line].start = times[line].end
                        times[line].end = temp
                    }

                    console.log(times[line]);

                    var currentElemnt = times[line].start.html;
                    currentElemnt.style.backgroundColor = 'red';

                    while (currentElemnt != times[line].end.html) {

                        currentElemnt = currentElemnt.nextSibling
                        //console.log(currentElemnt);
                        currentElemnt.style.backgroundColor = 'red';
                    }

                } else {
                    times[line] = { start: new Point(ev.target, line, hour, date, 0) }
                }

            }


            console.log(times[line]);


        }




        for (let index = 0; index < visableLines + 1; index++) {
            const element = data[index];
            element.index = index;
            this.renderNextLine(element)
        }


    }
}


function Next(params) {

}

class Point {
    constructor(html, line, hour, date, minute) {
        this.html = html;
        this.line = line;
        this.hour = hour;
        this.date = date;
        this.minute = minute;

    }
    GetDateTime() {
        return moment(`${this.date} ${this.hour}:${this.minute}}`);
    }

}

function getControlAddin(params) {
    return document.getElementById('controlAddIn');
}

function Init(params) {
    document.getElementById('controlAddIn').insertAdjacentHTML('beforeend', html)

}



var data = [
    {
        table: {
            id: { value: 1, caption: 'ID', type: 'String' },
            age: { value: 25, caption: 'Alter' },
            city: { value: 'Hamburg', caption: 'City', type: 'Option', options: 'cities' },
            test: { value: 'DE', caption: 'Land' }
        },
        timeline: [
            {
                start: '2024-06-03',
                end: '2024-06-14',
                name: 'TEST',
                desc: 'TEST',
                id: 'key1'
            },
            {
                start: '2024-06-03',
                end: '2024-06-14',
                name: 'TEST',
                desc: 'TEST',
                id: 'key1'
            }
        ]
    },
    {
        table: {
            id: { value: 2, caption: 'ID' },
            age: { value: 35, caption: 'Alter' },
            city: { value: 'Hamburg', type: 'Option', options: 'cities' },
            test: { value: 'Hamburg' }
        },
        timeline: {
            start: '2024-06-03',
            end: '2024-06-14',
            name: 'TEST',
            desc: 'TEST',
            id: 'key1'
        }
    },
    {
        table: {
            id: { value: 3 },
            age: { value: 30 },
            city: { value: 'Hamburg', type: 'Option', options: 'cities' },
            test: { value: 'New York' }
        },
        timeline: {
            start: '2024-06-03',
            end: '2024-06-14',
            name: 'TEST',
            desc: 'TEST',
            id: 'key1'
        }
    }
]

var options = {
    cities: ['London', 'Hamburg', 'New York']
}

//new Date('2024-06-03 19:23:11')

let jobs = [
    {
        start: '2024-06-03',
        end: '2024-06-14',
        name: 'TEST',
        desc: 'TEST',
        id: 'key1',
        subjobs: [
            {
                start: '2024-06-03',
                end: '2024-06-14',
                name: 'TEST',
                desc: 'TEST',
                id: 'key2',
                subjobs: [

                ]
            }
        ]
    }
]

function RenderGantt(params) {


    for (let index = 0; index < 40; index++) {


        var testdata = {
            table: {
                id: { value: 3 },
                age: { value: 30 },
                city: { value: 'Hamburg', type: 'Option', options: 'cities' },
                test: { value: 'New York' }
            },
            timeline: {
                start: '2024-06-03',
                end: '2024-06-14',
                name: 'TEST',
                desc: 'TEST',
                id: 'key1'
            }
        }

        data.push(testdata)


    }


    var diag = document.querySelector('bcgantt')

    // diag.querySelector('left')

    //renderTable(document.getElementById('testtable'), data)
    //renderTable(diag.querySelector('bctable'), data)
    //renderTimeline(diag.querySelector('timeline'), data)

    var gantt = new Gantt({ HTMLElement: diag, Pointer: moment(), DaysBeforePointer: 4, DaysAfterPointer: 4, TimeUnit: 'day', data: jobs });
    gantt.render();


}

RenderGantt()