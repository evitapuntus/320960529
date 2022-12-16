const Users = [{
        id: 1,
        username: "אביטה פונטוס",
        email: "evita@gmail.com",
        password: "12345",
        age: 21,
        city: "דימונה",
        male: false,
        img: ""
    },
    {
        id: 2,
        username: "יוסי גבני",
        email: "yosi@gmail.com",
        password: "123456",
        age: 25,
        city: "תל אביב",
        male: true,
        img: ""
    }
]

let currentUser = null
    // const currentUser = Users[0]

const Dogs = [{
        id: 1,
        name: "לאקי",
        kind: "ג'ק ראסל",
        age: 4,
        protections: "טטנוס, בקטוס,תולעים, משולש",
        male: true,
        images: ["./images/1.png", "./images/2.png", "./images/3.png", "./images/4.png"],
        ownerId: 1
    },
    {
        id: 2,
        name: "בוני",
        kind: "פודל",
        age: 2,
        protections: "תולעים, משולש",
        male: true,
        images: ["./images/2.png", "./images/3.png", "./images/2.png", "./images/4.png"],
        ownerId: 1
    },
    {
        id: 3,
        name: "דובי",
        kind: "בולדוג",
        age: 6,
        protections: "טטנוס",
        male: false,
        images: ["./images/3.png", "./images/1.png", "./images/4.png", "./images/6.png"],
        ownerId: 1
    },
    {
        id: 4,
        name: "סקאי",
        kind: "לוורדור",
        age: 5,
        protections: "תולעים",
        male: false,
        images: ["./images/4.png", "./images/4.png", "./images/5.png", "./images/1.png"],
        ownerId: 1
    },
    {
        id: 5,
        name: "בולט",
        kind: "האסקי",
        age: 4,
        protections: "",
        male: true,
        images: ["./images/1.png", "./images/3.png", "./images/6.png", "./images/4.png"],
        ownerId: 1
    },
    {
        id: 6,
        name: "אריה",
        kind: "פיטבול",
        age: 7,
        protections: "טטנוס, משולש",
        male: true,
        images: ["./images/3.png", "./images/5.png", "./images/1.png", "./images/3.png"],
        ownerId: 2
    },
    {
        id: 7,
        name: "יוס",
        kind: "דוברמן",
        age: 5,
        protections: "טטנוס, משולש",
        male: true,
        images: ["./images/5.png", "./images/5.png", "./images/4.png", "./images/3.png"],
        ownerId: 2
    },
    {
        id: 8,
        name: "לאסי",
        kind: "מעורבת",
        age: 11,
        protections: "טטנוס, בקטוס,תולעים, משולש",
        male: false,
        images: ["./images/6.png", "./images/4.png", "./images/2.png", "./images/1.png"],
        ownerId: 2
    }
]

if (currentUser) {
    renderMainPage()
} else {
    renderLoginPage()
}


let filterByCityValue = ""
let filterByKindValue = ""
let filterByOwnerAgeValue = ""
let filterByDogAgeValue = ""
let filterByProtectionsValue = false

function generateCarousel(dogs = Dogs) {
    document.querySelector('.carousel').innerHTML = ``
    dogs.forEach(dog => {
        document.querySelector('.carousel').innerHTML += `
            <div>
                <div class="card">
                    <img class="dog-image-meetme" src="${dog.images[0]}" />
                    <button class="meetme-button" onclick="renderDogPage(${dog.id})"> :) הכר האותי</button>
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
    return Dogs.filter((dog) => {
        const owner = Users.find(u => u.id == dog.ownerId);

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