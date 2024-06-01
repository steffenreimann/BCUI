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

var data = [
    {
        id: { value: 1, caption: 'ID', type: 'String' },
        age: { value: 25, caption: 'Alter' },
        city: { value: 'London', caption: 'Stadt' },
        test: { value: 'London', caption: 'Stadt' }
    },
    {
        id: { value: 2, caption: 'ID' },
        age: { value: 35, caption: 'Alter' },
        city: { value: 'Hamburg', caption: 'Stadt', type: 'Option', options: 'cities' },
        test: { value: 'Hamburg', caption: 'Stadt' }
    },
    {
        id: { value: 3, caption: 'ID' },
        age: { value: 30, caption: 'Alter' },
        city: { value: 'New York', caption: 'Stadt' },
        test: { value: 'New York', caption: 'Stadt' }
    }
]

var options = {
    cities: ['London', 'Hamburg', 'New York']
}


function renderTable(HTMLElement, data) {

    HTMLElement.style.display = 'grid';

    var cols = Object.keys(data).length


    console.log(HTMLElement);
    console.log(HTMLElement.offsetWidth);
    console.log(HTMLElement.clientWidth);

    var colWidth = 100;
    if (cols <= 5) {
        colWidth = HTMLElement.offsetWidth / cols;
    } else {
        colWidth = HTMLElement.offsetWidth / 5;
    }

    console.log(colWidth);
    colWidth -= 300

    console.log(colWidth);

    var tablerow = document.createElement('tablerow');
    var colIndex = 0;
    for (const key in data[0]) {
        if (Object.hasOwnProperty.call(data[0], key)) {
            const element = data[0][key];
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
    data.forEach(element => {
        //Zeile 
        var tablerow = document.createElement('tablerow');
        //console.log(element);


        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                //Zeilendaten 
                const element1 = element[key];
                //console.log(key, element);

                var tabledata = document.createElement('tabledata');
                tabledata.setAttribute("colIndex", colIndex);


                var field
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

function getControlAddin(params) {
    return document.getElementById('controlAddIn');
}

function Init(params) {
    document.getElementById('controlAddIn').insertAdjacentHTML('beforeend', html)
}



//renderTable(document.getElementById('testtable'), data)