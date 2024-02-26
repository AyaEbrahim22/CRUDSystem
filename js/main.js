
var productNameInput = document.getElementById('productNameInput');

var productPriceInput = document.getElementById('productPriceInput');

var productCategoryInput = document.getElementById('productCategoryInput');

var productDescriptionInput = document.getElementById('productDescriptionInput');

var searchInput = document.getElementById('searchInput');

var addBtn = document.getElementById('addBtn');

var updateBtn = document.getElementById('updateBtn');

var productList = [];

if(localStorage.getItem("products") != null){
    productList = JSON.parse(localStorage.getItem("products"));
    displayData();
}

function addProduct(){
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value
        }

        productList.push(product);

        localStorage.setItem('products', JSON.stringify(productList));

        clearForm();

        displayData()

}

function clearForm(){
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescriptionInput.value = '';
}

function displayData(){

    var data = "";

    for(var i = 0; i < productList.length; i++){
        data += ` <tr>
        <td>${i+1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td>
        <button onclick="setData(${i})" class="btn btn-warning btn-sm">Update</button>
        <button onclick="deleteItem(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
        </tr>`
    }

    document.getElementById("tableBody").innerHTML = data;
}

function deleteItem(index){
    productList.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(productList));

    displayData();
}

function search(){

     var text = searchInput.value;

     var data = "";

     for(var i = 0; i < productList.length; i++){
       if(productList[i].name.toLowerCase().includes(text.toLowerCase())){
        data += ` <tr>
        <td>${i+1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td>
        <button class="btn btn-warning btn-sm">Update</button>
        <button onclick="deleteItem(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
        </tr>`
       }
     }
 
     document.getElementById("tableBody").innerHTML = data;

}

var indexUpdate = 0;

function setData(index){
   productNameInput.value =  productList[index].name;
   productPriceInput.value =  productList[index].price;
   productCategoryInput.value =  productList[index].category;
   productDescriptionInput.value =  productList[index].description;

   updateBtn.classList.remove('d-none');
   addBtn.classList.add('d-none');
  
   indexUpdate = index;
}

function updateItem(){
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }

    productList.splice(indexUpdate, 1, product);

    localStorage.setItem('products', JSON.stringify(productList));

    clearForm();

    displayData();

    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
}



