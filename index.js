const table = document.getElementById('tableBody');
let asc = true;
const pageSize = 3;
let currentPage = 1;
let data = [];

const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://reqres.in/api/users?page=2');
    xhr.responseType = "json"
    xhr.onload = () => {
        data = xhr.response.data;
        loadPage();
    }
    xhr.send();
}

const loadPage = () => {
    let rows = '';
    data.filter((row, index) => {
        let start = (currentPage-1) * pageSize;
        let end = currentPage * pageSize;
        if(index >= start && index < end) return true;
    }).forEach(rData => {
        rows += `<tr>
                        <td>${rData.id}</td>
                        <td>${rData.first_name}</td>
                        <td>${rData.last_name}</td>
                        <td>${rData.email}</td>
                    </tr>`
    })
    table.innerHTML = rows;
}

const sortData = (column) => {
    let direction = asc ? 1 : -1;
    data.sort((a,b) => {
        return a[column].toLowerCase() > b[column].toLowerCase() ? (1*direction) : (-1*direction);
    })
    loadPage();
    asc = !asc
}

const previousPage = () => {
    if(currentPage > 1){
        currentPage--;
        loadPage();
    }
}

const nextPage = () => {
    if((currentPage * pageSize) < data.length){
        currentPage++;
        loadPage();
    }
}
