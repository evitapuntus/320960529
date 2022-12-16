let dogname = ""
let kind = ""
let dogage = ""
let protections = ""
let dogmale = true
let dogImage = "./images/register-dog-image.png"

function renderRegisterDog() {
    document.querySelector('#main-container-div').innerHTML = `
    <div class="reg-dog-page">
        <div class="reg-dog-image-place">
            <input type="file" class="custom-file-input" accept="image/*" onchange="change_dog_preview(this)"
                id="dogImage" required>
            <img id="reg_dog_image" src=${dogImage}>
        </div>
        <div class="reg-dog-area">
            <div class="reg-dog-logo"><img class="reg-dog-img-logo" src="./images/logo.png"></div>
            <div class="reg-dog-form">
                <div class="user-details">פרטי הכלב</div>
                <form onsubmit="checkRegisterDog()">
                    <div class="form-group">
                        <input required type="text" class="form-control-register-dog" id="InputDogname" placeholder="שם הכלב">
                    </div>
                    <div class="form-group">
                        <input required type="text" class="form-control-register-dog" id="InputDogKind" placeholder="סוג הכלב">
                    </div>
                    <div class="form-group">
                        <input required type="number" class="form-control-register-dog" id="InputDogAge" placeholder="גיל">
                    </div>
                    <div class="form-group">
                        <input required type="text" class="form-control-register-dog" id="InputDogProtections" placeholder="רשימת חיסונים">
                    </div>
                    <div class="last-submit-line">
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="DogMaleRadios" id="DogMaleRadioButton"
                                    value=true checked>
                                <label class="form-check-label fe-male-radio" for="DogMaleRadioButton">
                                    זכר
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="DogMaleRadios" id="DogFemaleRadioButton"
                                    value=false>
                                <label class="form-check-label fe-male-radio" for="DogFemaleRadioButton">
                                    נקבה
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="btn submit-button"><img class="submit-button-image"
                                src="./images/V.png"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}

function change_dog_preview(input) {
    dogImage = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    document.getElementById('reg_dog_image').src = dogImage;
}

function checkRegisterDog() {
    dogname = document.getElementById('InputDogname').value
    kind = document.getElementById('InputDogKind').value
    dogage = document.getElementById('InputDogAge').value
    protections = document.getElementById('InputDogProtections').value
    dogmale = document.querySelector('input[name="DogMaleRadios"]:checked').value;
    dogImage = dogImage

    const newDog = {
        id: Dogs.length + 1,
        name: dogname,
        kind: kind,
        age: dogage,
        protections: protections,
        male: dogmale,
        images: [dogImage, "./images/2.png", "./images/3.png", "./images/4.png"],
        ownerId: currentUser.id
    };
    Dogs.push(newDog);
    renderMainPage()
}