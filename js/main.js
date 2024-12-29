let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totle = document.getElementById("totle");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let myInputs = document.querySelectorAll("input");
let mood = "create";
let witnesIndex;

//get totle
function getTotle() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    totle.innerHTML = result;
    totle.style.backgroundColor = "#080";
  } else {
    totle.innerHTML = "";
    totle.style.backgroundColor = "#f00";
  }
}

// add prodect
let prodectContainer;
if (localStorage.getItem("prodects")) {
  prodectContainer = JSON.parse(localStorage.getItem("prodects"));
} else {
  prodectContainer = [];
}
submit.addEventListener("click", () => {
  let prodect = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    totle: totle.innerHTML,
    category: category.value,
    count: count.value,
  };

  if (
    title.value !== "" &&
    price.value !== "" &&
    category.value !== "" &&
    prodect.count < 5
  ) {
    //create prodect
    if (mood === "create") {
      if (prodect.count > 1) {
        for (let i = 0; i < prodect.count; i++) {
          prodectContainer.push(prodect);
        }
      } else {
        prodectContainer.push(prodect);
      }
      //update prodect
    } else {
      prodectContainer[witnesIndex] = prodect;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "Create";
    }
    myInputs.forEach((e) => (e.value = ""));
  }

  localStorage.setItem("prodects", JSON.stringify(prodectContainer));
  displayProdect();
  getTotle();
});

function displayProdect() {
  let proIteam = "";
  for (let i = 0; i < prodectContainer.length; i++) {
    proIteam += `
        <tr>
            <td>${i + 1}</td>
            <td>${prodectContainer[i].title}</td>
            <td>${prodectContainer[i].price}</td>
            <td>${prodectContainer[i].taxes}</td>
            <td>${prodectContainer[i].ads}</td>
            <td>${prodectContainer[i].discount}</td>
            <td>${prodectContainer[i].totle}</td>
            <td>${prodectContainer[i].category}</td>
            <td><button onclick= 'updateData(${i})' class="fas fa-pen-to-square btn btn-success"></button></td>
            <td><button onclick='deleteItem(${i})' class="fas fa-xmark btn btn-danger"></button></td>
        </tr>
    `;
  }
  document.getElementById("showData").innerHTML = proIteam;

  let btnDeleteAll = document.getElementById("btnDelete");
  if (prodectContainer.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick='deleteAll()'>Delete All (${prodectContainer.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
displayProdect();

// deleteItem
function deleteItem(index) {
  prodectContainer.splice(index, 1);
  localStorage.setItem("prodects", JSON.stringify(prodectContainer));
  displayProdect();
}
//deleteAll
function deleteAll() {
  localStorage.clear();
  prodectContainer.splice(0);
  displayProdect();
}

// update Data
function updateData(index) {
  title.value = prodectContainer[index].title;
  price.value = prodectContainer[index].price;
  taxes.value = prodectContainer[index].taxes;
  ads.value = prodectContainer[index].ads;
  discount.value = prodectContainer[index].discount;
  category.value = prodectContainer[index].category;
  getTotle();
  mood = "update";
  witnesIndex = index;
  count.style.display = "none";
  submit.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search Data
let searchMood = "title";
function getSearchMood(id) {
  if (id === "searchtitle") {
    searchMood = "title";
  } else {
    searchMood = "Categury";
  }
  search.focus();
  search.placeholder = `Search By  ${searchMood}`;
  search.value = "";
  displayProdect();
}

function dataSearch(value) {
  let proIteam = "";
  for (let i = 0; i < prodectContainer.length; i++) {
    if (searchMood == "title") {
      if (
        prodectContainer[i].title.toLowerCase().includes(value.toLowerCase())
      ) {
        proIteam += `
            <tr>
                <td>${i + 1}</td>
                <td>${prodectContainer[i].title}</td>
                <td>${prodectContainer[i].price}</td>
                <td>${prodectContainer[i].taxes}</td>
                <td>${prodectContainer[i].ads}</td>
                <td>${prodectContainer[i].discount}</td>
                <td>${prodectContainer[i].totle}</td>
                <td>${prodectContainer[i].category}</td>
                <td><button onclick= 'updateData(${i})' class="fas fa-pen-to-square btn btn-success"></button></td>
                <td><button onclick='deleteItem(${i})' class="fas fa-xmark btn btn-danger"></button></td>
            </tr>
        `;
      }
    } else {
      if (
        prodectContainer[i].category.toLowerCase().includes(value.toLowerCase())
      ) {
        proIteam += `
            <tr>
                <td>${i + 1}</td>
                <td>${prodectContainer[i].title}</td>
                <td>${prodectContainer[i].price}</td>
                <td>${prodectContainer[i].taxes}</td>
                <td>${prodectContainer[i].ads}</td>
                <td>${prodectContainer[i].discount}</td>
                <td>${prodectContainer[i].totle}</td>
                <td>${prodectContainer[i].category}</td>
                <td><button onclick= 'updateData(${i})' class="fas fa-pen-to-square btn btn-success"></button></td>
                <td><button onclick='deleteItem(${i})' class="fas fa-xmark btn btn-danger"></button></td>
            </tr>
        `;
      }
    }
  }
  document.getElementById("showData").innerHTML = proIteam;
}
