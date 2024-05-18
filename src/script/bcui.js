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
        city: { value: 'Hamburg', caption: 'Stadt' },
        test: { value: 'Hamburg', caption: 'Stadt' }
    },
    {
        id: { value: 3, caption: 'ID' },
        age: { value: 30, caption: 'Alter' },
        city: { value: 'New York', caption: 'Stadt' },
        test: { value: 'New York', caption: 'Stadt' }
    }
]


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

    colWidth -= 100

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
        var tablerow = document.createElement('tablerow');
        //console.log(element);


        for (const key in data[0]) {
            if (Object.hasOwnProperty.call(data[0], key)) {
                const element = data[0][key];
                //console.log(key, element);

                var tabledata = document.createElement('tabledata');
                tabledata.setAttribute("colIndex", colIndex);
                tabledata.innerHTML = element.value;
                tabledata.style.width = `${colWidth}px`;
                tablerow.appendChild(tabledata);
            }
            colIndex++
        }
        colIndex = 0
        HTMLElement.appendChild(tablerow)
    })




    // HTMLElement.

}

renderTable(document.getElementById('testtable'), data)

