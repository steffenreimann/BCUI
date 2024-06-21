import moment from 'moment'
import { testdata } from './testdata';

function createPastFutureArray(startMoment: moment.Moment, stepsPast: number, stepsFuture: number, interval: moment.unitOfTime.DurationConstructor) {
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


enum TimeUnits {
    Hour,
    Day,
    Week,
    Month
}

export type GanttLineItem = {
    FieldNo: string
    FieldName: string
    FieldCaption: string
    FieldType: string
    FieldValue: any
    Show: boolean
    StartEnd: string
}

export type GanttLine = Array<GanttLineItem>;
export type GanttData = Array<GanttLine>;


class Gantt {

    public DaysBeforePointer: number
    public DaysAfterPointer: number
    public TimeUnit: TimeUnits
    public Pointer: moment.Moment
    public HTMLElement: HTMLElement
    public timeline: HTMLElement | null
    public timelineHeader: HTMLElement | null
    public timelineLines: HTMLElement | null
    public table: HTMLElement | null

    public data: GanttData
    public TableElements: Array<HTMLElement | null>
    public TimelineElements: Array<HTMLElement | null>
    public PastFutureArray: moment.Moment[]


    constructor(data: GanttData, RootElement: HTMLElement, DaysBeforePointer?: number, DaysAfterPointer?: number, TimeUnit?: TimeUnits, Pointer?: moment.Moment) {
        this.DaysBeforePointer = DaysBeforePointer || 4;
        this.DaysAfterPointer = DaysAfterPointer || 4;
        this.TimeUnit = TimeUnit || TimeUnits.Hour;
        this.Pointer = Pointer || moment();
        this.HTMLElement = RootElement;

        this.timeline = this.HTMLElement.querySelector('timeline');
        this.timelineHeader = this.timeline!.querySelector('header');
        this.timelineLines = this.timeline!.querySelector('lines');
        this.table = this.HTMLElement.querySelector('bctable');



        this.data = data;
        this.TableElements = []
        this.TimelineElements = []

        this.PastFutureArray = []

    }

    renderNextLine(element: GanttLine, LineIndex: number) {
        //console.log(data);
        // data.forEach(element => {
        //Zeile 
        var tablerow = document.createElement('tablerow');
        var timelinerow = document.createElement('tablerow');

        this.TableElements.push(tablerow)
        this.TimelineElements.push(timelinerow)

        this.timelineLines!.appendChild(timelinerow);

        //console.log(pastFutureArray);
        this.PastFutureArray.forEach(time => {

            for (let index = 1; index < 25; index++) {

                var tabledata = document.createElement('tabledata');
                tabledata.setAttribute("date", time.format('DD.MM.YY'));
                tabledata.setAttribute("colIndex", index.toString());
                tabledata.setAttribute("lineIndex", LineIndex.toString());

                //console.log(element);
                //console.log(time);
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


        var colIndex = 0

        element.forEach(GanttLineItem => {

            var tabledata = document.createElement('tabledata');
            tabledata.setAttribute("colIndex", colIndex.toString());


            var field: HTMLInputElement | HTMLSelectElement
            //console.log(element1);
            switch (GanttLineItem.FieldType) {
                case 'String' || 'Code':
                    field = document.createElement('input');
                    // field.type = 'text';
                    field.inputMode = 'text'
                    field.classList.add('form');
                    field.value = GanttLineItem.FieldValue;
                    break;

                default:
                    field = document.createElement('input');
                    field.type = 'text';
                    field.classList.add('form');
                    field.value = GanttLineItem.FieldValue;
                    break;
            }

            //field.setAttribute("colIndex", colIndex);

            tabledata.appendChild(field);

            // tabledata.style.width = `${this.colWidth}px`;
            tablerow.appendChild(tabledata);
            colIndex++
        });


        colIndex = 0
        this.table!.appendChild(tablerow)
        //this.table.appendChild(tablerow)
        //  })
    }

    /*     AddGanttElement(time) {
            console.log('Add Gantt Element');
            console.log(time);
    
            time.elementsline.forEach(line => {
    
                console.log(line);
                // line.style.backgroundColor = 'gray'
                line.classList.add('picked')
    
            });
    
        }
        RemoveGanttElement(time) {
            console.log('Remove Gantt Element');
            console.log(time);
    
            time.elementsline.forEach(line => {
    
                console.log(line);
                line.classList.remove('picked')
    
            });
    
        } */

    getStartFieldInLine(Line: GanttLine): GanttLineItem | void {

        Line.forEach(LineItem => {
            if (LineItem.StartEnd.toUpperCase() == 'START') {
                return LineItem
            }
        });
    }

    getEndFieldInLine(Line: GanttLine): GanttLineItem | void {

        Line.forEach(LineItem => {
            if (LineItem.StartEnd.toUpperCase() == 'END') {
                return LineItem
            }
        });
    }

    /* onclickTimeline(ev: MouseEvent) {
        console.log('click', this);
        // this.timeline.onclick = function (ev) {
        var target: HTMLElement = ev.target as HTMLElement;
        var line: number = parseInt(target.getAttribute('lineindex')!);
        var hour = target.getAttribute('colindex')
        var date = target.getAttribute('date')
        var jsonkey = `${date},${hour},${line}`
        var htmlkey = `[date="${date}"][colindex="${hour}"][lineindex="${line}"]`
        var HTMLE = document.querySelector(htmlkey)

        var startField: GanttLineItem = this.getStartFieldInLine(this.data[line])!
        var starttime = moment(startField.FieldValue)

        if (startField.FieldValue) {


        }


        if (this.times[line] == undefined) {
            console.log('Set Start');

            this.times[line] = { start: new Point(ev.target, line, hour, date, 0) }
        } else {
            if (this.times[line].end == undefined) {
                console.log('Set End');
                this.times[line].end = new Point(ev.target, line, hour, date, 0)
                ev.target.classList.add('picked')
                this.times[line].elementsline = []

                this.times[line].elementsline.push(this.times[line].start.html)

                var start = this.times[line].start
                var end = this.times[line].end
                //moment("12-25-1995", "MM-DD-YYYY");
                var starttime = moment(start.date + ' ' + start.hour, "DD-MM-YYYY hh")
                var endtime = moment(end.date + ' ' + end.hour, "DD-MM-YYYY hh")

                if (endtime.isBefore(starttime)) {
                    console.log('End is before Start... Change Start and End');
                    var temp = this.times[line].start
                    this.times[line].start = this.times[line].end
                    this.times[line].end = temp
                }

                var currentElemnt = this.times[line].start.html;
                this.times[line].elementsline.push(currentElemnt)

                while (currentElemnt != this.times[line].end.html) {
                    console.log('push');
                    currentElemnt = currentElemnt.nextSibling
                    this.times[line].elementsline.push(currentElemnt)
                }
                console.log('End Setted');
                this.AddGanttElement(this.times[line])
            } else {
                this.RemoveGanttElement(this.times[line])

                this.times[line] = { start: new Point(ev.target, line, hour, date, 0) }
            }

        }


        console.log(this.times[line]);

    } */

    Resize(ev: MouseEvent) {

        var elem: HTMLElement = ev!.currentTarget! as HTMLElement;
        var header: HTMLElement = elem.parentElement!;

        document.addEventListener('mousemove', moveResize);
        document.addEventListener('mouseup', stopResize);

        function moveResize(e: MouseEvent) {
            header.style.width = (e.clientX - header.offsetLeft - 8).toString()
            var colIndex: string = header.getAttribute('colIndex')!
            var colstoupdate: NodeListOf<HTMLElement> = header.parentElement!.parentElement!.querySelectorAll('[colindex="' + colIndex + '"]')!

            colstoupdate.forEach(coltoupdate => {
                coltoupdate.style.width = (e.clientX - header.offsetLeft - 8).toString()
            });
        }

        function stopResize() {
            document.removeEventListener('mousemove', moveResize);
            document.removeEventListener('mouseup', stopResize);
        }
    }



    render() {

        this.table!.style.display = 'grid';

        var cols = Object.keys(this.data[0]).length

        var colWidth = 100;
        if (cols <= 5) {
            colWidth = this.table!.offsetWidth / cols;
        } else {
            colWidth = this.table!.offsetWidth / 5;
        }


        colWidth -= 15

        var tablerow = document.createElement('tablerow');


        var colIndex = 0;


        this.data[0].forEach(GanttLineItem => {
            var tableheader = document.createElement('tableheader');
            tableheader.innerHTML = GanttLineItem.FieldCaption;
            tableheader.setAttribute("colIndex", colIndex.toString());
            tableheader.style.width = `${colWidth}px`;
            const resizeBar = document.createElement('resizebar');
            tableheader.appendChild(resizeBar)

            resizeBar.addEventListener('mousedown', (ev) => {
                this.Resize(ev)
            });

            tablerow.appendChild(tableheader);
            this.table!.appendChild(tablerow)
            colIndex++
        });

        /*         for (const key in this.data[0][0]) {
                    if (Object.hasOwnProperty.call(this.data[0][0], key)) {
                        const element = this.data[0][0][key];
                        //console.log(key, element);
        
                        var tableheader = document.createElement('tableheader');
                        tableheader.innerHTML = element.Caption;
                        tableheader.setAttribute("colIndex", colIndex.toString());
                        tableheader.style.width = `${colWidth}px`;
                        const resizeBar = document.createElement('resizebar');
                        tableheader.appendChild(resizeBar)
        
                        resizeBar.addEventListener('mousedown', (ev) => {
                            this.Resize(ev)
                        });
        
                        tablerow.appendChild(tableheader);
                        this.table!.appendChild(tablerow)
                        colIndex++
                    }
                } */


        // Beispiel: Startpunkt heute, 5 Schritte in die Vergangenheit, 5 in die Zukunft
        //const today = moment().add(3, 'hour');
        this.PastFutureArray = createPastFutureArray(this.Pointer, this.DaysBeforePointer, this.DaysAfterPointer, 'day');

        // Ausgabe (formatiert für bessere Lesbarkeit)
        this.PastFutureArray.forEach(time => {

            var div = document.createElement('timeunitwrapper');
            var timeunit = document.createElement('timeunit');
            timeunit.innerHTML = time.format('DD.MM.YY');
            div.appendChild(timeunit);


            for (let index = 1; index < 25; index++) {

                var timeitem = document.createElement('timeitem');
                timeitem.innerHTML = index.toString();
                div.appendChild(timeitem);
            }

            this.timelineHeader!.appendChild(div);

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


        this.timeline!.onscroll = (ev) => {
            const target = ev.target as HTMLElement;
            var offset = Number(target.scrollTop / 40).toFixed(0)
            console.log('offset', offset);
            this.table!.scrollTop = target.scrollTop;

            //this.renderNextLine(element)

        };

        this.table!.onscroll = (ev) => {
            const target = ev.target as HTMLElement;
            console.log('ev.target.scrollTop', target.scrollTop);
            this.timeline!.scrollTop = target.scrollTop;
        };


        const lines = this.timeline!.querySelector('lines') as HTMLElement;

        lines.onclick = (ev) => {
            // this.onclickTimeline(ev);
        }



        for (let index = 0; index < visableLines + 1; index++) {
            const Ganttline = this.data[index];
            this.renderNextLine(Ganttline, index)
        }


    }
}

class Point {

    public html: HTMLElement
    public hour: number
    public date: string
    public minute: number


    constructor(html: HTMLElement, hour: number, date: string, minute: number) {
        this.html = html;
        this.hour = hour;
        this.date = date;
        this.minute = minute;

    }
    GetDateTime() {
        return moment(`${this.date} ${this.hour}:${this.minute}`);
    }

}

function getControlAddin() {
    return document.getElementById('controlAddIn');
}

function Init() {
    //document.getElementById('controlAddIn')!.insertAdjacentHTML('beforeend', html)

}



var options = {
    cities: ['London', 'Hamburg', 'New York']
}

function RenderGantt() {




    var diag: HTMLElement = document.querySelector('bcgantt')!
    var gantt = new Gantt(testdata, diag, 4, 4, TimeUnits.Day, moment());
    gantt.render();


}




RenderGantt()