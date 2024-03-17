var Pname = document.querySelector("#Pname");
var Pprice = document.querySelector("#Pprice");
var Pcatagory = document.querySelector("#Pcatagory");
var Pcondition = document.querySelector("#Pcondition");
var table = document.getElementById('itemTable');
var btn1 = document.querySelector("#btn1");
var clr = document.querySelector("#clr");
var div = document.querySelector("#div");





Pname.addEventListener("keydown", downchange);
function downchange() {
    var inpVal = Pname.value.trim();
    var firstLetter = inpVal[0];
    if (firstLetter !== firstLetter?.toUpperCase()) {
        div.innerHTML = "first letter must be UpperCase";
        div.style.color = "red";
    } else {
        div.innerHTML = "";
    }
}



btn1.addEventListener("click", addItem);

function addItem() {
    if (Pname.value == "" && Pprice.value == "") {
        alert("Fill all inputs");
        return;
    }
    var obj = {
        Pname: Pname.value,
        Pprice: Pprice.value,
        Pcatagory: Pcatagory.value,
        Pcondition: Pcondition.value,
    };
    var data = localStorage.getItem("Products") ? JSON.parse(localStorage.getItem("Products")) : [];
    data.push(obj);
    localStorage.setItem("Products", JSON.stringify(data));
    Pname.value = '';
    Pprice.value = '';
    showValue();
}




function showValue() {
    table.innerHTML = '<tr><th>Index</th><th>Name</th><th>Price</th><th>Category</th><th>Condition</th><th>Actions</th></tr>';
    var data = JSON.parse(localStorage.getItem('Products'));
    if (data == null) {
    } else {
        data.map((ele, index) => {
            var newclass;
            if (ele.Pcondition == 'Excellent') {
                newclass = 'bg-green-500';
            } else if (ele.Pcondition == 'Good') {
                newclass = 'bg-yellow-500';
            } else {
                newclass = 'bg-red-500';
            }
            table.innerHTML += `<tr>
            <td>${index}</td>
            <td>${ele.Pname}</td>
            <td>${ele.Pprice}</td>
            <td>${ele.Pcatagory}</td>
            <td class="${newclass}">${ele.Pcondition}</td>
            <td>
                <button onclick='handleEdit(${index})'><i class="fa-solid fa-pen text-yellow-400 "></i></button>  
                <button onclick='handledel(${index})'><i class="fa-solid fa-trash text-red-700 ml-2"></i></button> 
            </td>
        </tr>`;
        });
    }
}


showValue();

function handledel(i) {
    console.log(i, "test here the index");
    var data = JSON.parse(localStorage.getItem('Products'));
    data.splice(i, 1);
    console.log(data, "test here code ");
    localStorage.setItem('Products', JSON.stringify(data));
    showValue();
}

var myIndex;
var updateBtn = document.querySelector('#update');

function handleEdit(i) {
    var data = JSON.parse(localStorage.getItem("Products"));
    Pname.value = data[i].Pname;
    Pprice.value = data[i].Pprice;
    Pcatagory.value = data[i].Pcatagory;
    Pcondition.value = data[i].Pcondition;
    myIndex = i;
    updateBtn.classList.remove('hide');
    btn1.classList.add('hide');
}

function handleUpdate() {
    var data = JSON.parse(localStorage.getItem("Products"));
    data[myIndex].Pname = Pname.value;
    data[myIndex].Pprice = Pprice.value;
    data[myIndex].Pcatagory = Pcatagory.value;
    data[myIndex].Pcondition = Pcondition.value;

    localStorage.setItem('Products', JSON.stringify(data));
    showValue();
    updateBtn.classList.add('hide');
    btn1.classList.remove('hide');
    Pname.value = '';
    Pprice.value = '';
}

var showinp = document.querySelector("#showinp");

function showclk() {
    var searchTerm = showinp.value
    var data = JSON.parse(localStorage.getItem("Products"));

    var filteredData = data.filter((ele) => {
        return ele.Pname.includes(searchTerm);
    });

    table.innerHTML = '<tr><th>Index</th><th>Name</th><th>Price</th><th>Category</th><th>Condition</th><th>Actions</th></tr>';
    filteredData.map((ele, index) => {
        var newclass;
        if (ele.Pcondition == 'Excellent') {
            newclass = 'bg-green-500';
        } else if (ele.Pcondition == 'Good') {
            newclass = 'bg-yellow-500';
        } else {
            newclass = 'bg-red-500';
        }

        table.innerHTML += `<tr>
            <td>${index}</td>
            <td>${ele.Pname}</td>
            <td>${ele.Pprice}</td>
            <td>${ele.Pcatagory}</td>
            <td class="${newclass}">${ele.Pcondition}</td>
            <td>
                <button onclick='handleEdit(${index})'><i class="fa-solid fa-pen text-yellow-400 "></i></button>  
                <button onclick='handledel(${index})'><i class="fa-solid fa-trash text-red-700 ml-2"></i></button> 
            </td>
        </tr>`;
    });
}






function handleclr() {
    localStorage.removeItem('Products');
    table.innerHTML = "";
    showinp.value = ""
    showValue()
}












