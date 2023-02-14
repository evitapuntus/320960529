let users = []
let filterByCityValue = ""
let filterByKindValue = ""
let filterByOwnerAgeValue = ""
let filterByDogAgeValue = ""
let filterByProtectionsValue = false

const serverUrl = 'http://localhost:8080/'

const getFromServer = async (table, params = '') => {
    let url = serverUrl + table
    // alert(`${url}?${params}`)
    let response = await fetch(`${url}?${params}`);
    // let response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result
}

const postToServer = async (table, user) => {
    if (table == 'users') {
        data = {
            "username": user.username,
            "email": user.email,
            "password": user.password,
            "age": user.age,
            "city": user.city,
            "male": Boolean(user.male),
            "img": user.img
        }
    }
    url = serverUrl + table
    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

const getFromLocalStorage = (key) => {
    if (window.localStorage.getItem(key))
        return JSON.parse(window.localStorage.getItem(key))
    return ''
}
const setLocalStorage = (key, value) => {
    return window.localStorage.setItem(key, value)
}

let currentUser = getFromLocalStorage('currentUser')

async function getAllUsers() {
    users = (await getFromServer('users')).users
    setLocalStorage('users', JSON.stringify(users));
    dogs = (await getFromServer('dogs')).dogs
    setLocalStorage('dogs', JSON.stringify(dogs));
}

async function addUser(user){
    const newUser = {
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "age": user.age,
        "city": user.city,
        "male": Boolean(user.male),
        "img": "../images/person1.jpeg"
    }
    newUserForLocalStorage = {...newUser, id: getFromLocalStorage('users').at(-1).id+1}
    setLocalStorage('currentUser', JSON.stringify(newUserForLocalStorage))
    setLocalStorage('users', JSON.stringify(users.concat([newUserForLocalStorage])));
    renderRegisterDog()
    await fetch('http://localhost:8080/users/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
}
async function registerNewDog(dog){
    const newDog = {
        "name": dog.name,
        "kind": dog.kind,
        "age": dog.age,
        "protections": dog.protections,
        "male": Boolean(dog.male),
        "images": "./images/6.jpeg",
        "ownerId": getFromLocalStorage('currentUser').id
    }
    newDogForLocalStorage = {...newDog, id: getFromLocalStorage('dogs').at(-1).id+1}
    setLocalStorage('dogs', JSON.stringify(dogs.concat([newDogForLocalStorage])));
    renderMainPage()
    await fetch('http://localhost:8080/dogs/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDog)
    })
}
async function deleteDog(dogId){
    await fetch(`${serverUrl}dogs`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id": dogId})
    });
    dogs = (await getFromServer('dogs')).dogs
    setLocalStorage('dogs', JSON.stringify(dogs));
    renderMainPage()
}

if (getFromLocalStorage('currentUser')) {
    renderMainPage()
} else {
    renderLoginPage()
}

function getSrcForImage (imageData) {
    const ll = btoa(String.fromCharCode.apply(null, new Uint8Array(imageData)));
    return `data:image/jpeg;base64,${ll}`
}

function generateCarousel(dogs = getFromLocalStorage('dogs')) {
    document.querySelector('.carousel').innerHTML = ``
    dogs.forEach(dog => {
        const imageData = getSrcForImage(dog.images?.data)
        document.querySelector('.carousel').innerHTML += `
            <div>
                <div class="card">
                    <img class="dog-image-meetme" src="${imageData}" />
                    <button class="meetme-button" onclick="renderDogPage(${dog.id})"> :) הכר אותי</button>
                </div>
            </div>
            `;
    })
}

function filterByCity(city) {
    filterByCityValue = city;
    generateCarousel(applyFilters())
}

function filterByKind(kind) {
    filterByKindValue = kind;
    generateCarousel(applyFilters())
}

function filterByOwnerAge(ownerAge) {
    filterByOwnerAgeValue = ownerAge;
    generateCarousel(applyFilters())
}

function filterByDogAge(dogAge) {
    filterByDogAgeValue = dogAge;
    generateCarousel(applyFilters())
}

function filterByProtections(protections) {
    filterByProtectionsValue = protections;
    generateCarousel(applyFilters())
}

function applyFilters() {
    return getFromLocalStorage('dogs').filter((dog) => {
        const owner = getFromLocalStorage('users').find(u => u.id == dog.ownerId);

        return ((owner.city.toLowerCase().includes(filterByCityValue.toLowerCase())) &&
            (dog.kind.toLowerCase().includes(filterByKindValue.toLowerCase())) &&
            (filterByOwnerAgeValue == "" || owner.age <= filterByOwnerAgeValue) &&
            (filterByDogAgeValue == "" || dog.age <= filterByDogAgeValue) &&
            (filterByProtectionsValue == false || dog.protections != ""))
    });
}

function getBoxSize() {
    return document.getElementsByClassName('card')[0].clientWidth + 0.025 * window.innerWidth;
}

function getSrollLevel() {
    return document.getElementById('main-dogs-id').scrollLeft
}

function onRightClick() {
    document.getElementById('main-dogs-id').scrollTo({ left: Math.min(getSrollLevel() + getBoxSize(), document.getElementById('main-dogs-id').scrollWidth - 4 * getBoxSize() - 0.02 * window.innerWidth), behavior: 'smooth' })
}

function onLeftClick() {
    document.getElementById('main-dogs-id').scrollTo({ left: getSrollLevel() - getBoxSize(), behavior: 'smooth' })
}

function renderMainPage() {
    document.querySelector('#main-container-div').innerHTML = `
    <div class="home-page">
        <header class="header">
            <div class="logo"><img class="logo-image" src="./images/logo.png" /></div>
            <div class="personal-area">
                <img class="personal-area-image" src="./images/personal-area-image.png" onclick="renderLoginPage()"  />
                <span class="personal-area-text">אזור אישי</span>
            </div>
        </header>
        <form class="search-area">
            <div class="form-group">
                <label for="formGroupExampleInput">איזור</label>
                <input value="${filterByCityValue}" onChange="filterByCity(value)" type="text" class="form-control form-control-main"
                    placeholder="חיפוש אזור">
            </div>
            <div class="border-right"></div>
            <div class="form-group">
                <label for="formGroupExampleInput">גזע</label>
                <input value="${filterByKindValue}" onChange="filterByKind(value)" type="text" class="form-control form-control-main"
                    placeholder="סוג הכלב">
            </div>
            <div class="border-right"></div>
            <div class="form-group">
                <label for="formGroupExampleInput">גיל</label>
                <input value="${filterByOwnerAgeValue}" onChange="filterByOwnerAge(value)" type="number" class="form-control form-control-main"
                    placeholder="גיל בעלי הכלב">
            </div>
            <div class="border-right"></div>
            <div class="form-group">
                <label for="formGroupExampleInput">גיל</label>
                <input value="${filterByDogAgeValue}" onChange="filterByDogAge(value)" type="number" class="form-control form-control-main"
                    placeholder="גיל הכלב">
            </div>
            <div class="border-right"></div>
            <div class="form-group">
                <label for="formGroupExampleInput">חיסונים</label>
                <input ${filterByProtectionsValue ? 'checked' : ''} onChange="filterByProtections(this.checked)" type="checkbox"
                    class="form-control form-control-main" placeholder="קיים/לא קיים">
            </div>
            <img class="search-img" src="./images/search-img.png">
        </form>
        <div class="container">
            <div id="right-arrow" class="arrowes" onclick="onRightClick()"></div>
            <main class="main-dogs" id="main-dogs-id">
                <div class="wrapper">
                    <div class="carousel">
                    </div>
                </div>
            </main>
            <div id="left-arrow" class="arrowes" onclick="onLeftClick()"></div>
        </div>
    </div>`;
    generateCarousel(applyFilters());
}