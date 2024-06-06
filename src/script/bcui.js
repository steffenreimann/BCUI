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


    // console.log(HTMLElement);
    console.log(HTMLElement);
    console.log(HTMLElement.offsetWidth);
    console.log(getComputedStyle(HTMLElement).width);

    var colWidth = 100;
    if (cols <= 5) {
        colWidth = HTMLElement.offsetWidth / cols;
    } else {
        colWidth = HTMLElement.offsetWidth / 5;
    }

    console.log(colWidth);
    colWidth -= 15

    console.log(colWidth);

    var tablerow = document.createElement('tablerow');
    var colIndex = 0;
    for (const key in data[0].table) {
        if (Object.hasOwnProperty.call(data[0].table, key)) {
            const element = data[0].table[key];
            //console.log(key, element);

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

    //console.log(data);
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

        this.header = this.HTMLElement.querySelector('header');
        this.table = this.HTMLElement.querySelector('bctable');

        this.data = data.data;
    }

    render() {

        console.log('dpsoijfgoisjdgoipsdfjgoi');


        this.table.style.display = 'grid';

        var cols = Object.keys(data[0].table).length


        // console.log(HTMLElement);
        console.log(this.table);
        console.log(this.table.offsetWidth);
        console.log(getComputedStyle(this.table).width);

        var colWidth = 100;
        if (cols <= 5) {
            colWidth = this.table.offsetWidth / cols;
        } else {
            colWidth = this.table.offsetWidth / 5;
        }

        console.log(colWidth);
        colWidth -= 15

        console.log(colWidth);

        var tablerow = document.createElement('tablerow');
        var colIndex = 0;
        for (const key in data[0].table) {
            if (Object.hasOwnProperty.call(data[0].table, key)) {
                const element = data[0].table[key];
                //console.log(key, element);

                var tableheader = document.createElement('tableheader');
                tableheader.innerHTML = element.caption;
                tableheader.setAttribute("colIndex", colIndex);
                tableheader.style.width = `${colWidth}px`;
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
        const pastFutureArray = createPastFutureArray(this.Pointer, this.DaysBeforePointer, this.DaysAfterPointer);

        // Ausgabe (formatiert für bessere Lesbarkeit)
        pastFutureArray.forEach(time => {
            console.log(time.format('DD.MM.YYYY HH'));

            var div = document.createElement('tableheader');
            var timeunit = document.createElement('timeunit');
            timeunit.innerHTML = time.format('DD.MM.YY');
            div.appendChild(timeunit);


            for (let index = 1; index < 25; index++) {

                var timeitem = document.createElement('timeitem');
                timeitem.innerHTML = index;
                div.appendChild(timeitem);
            }

            tablerow.appendChild(div);

        });









        colIndex = 0;

        //console.log(data);
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
            this.table.appendChild(tablerow)
        })




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


    console.log(moment().format());

    var diag = document.querySelector('bcgantt')

    // diag.querySelector('left')

    //renderTable(document.getElementById('testtable'), data)
    //renderTable(diag.querySelector('bctable'), data)
    //renderTimeline(diag.querySelector('timeline'), data)

    var gantt = new Gantt({ HTMLElement: diag, Pointer: moment('2024-06-03'), DaysBeforePointer: 4, DaysAfterPointer: 4, TimeUnit: 'day', data: jobs });
    gantt.render();


}

RenderGantt()