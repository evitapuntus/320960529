let username = ""
let email = ""
let password = ""
let age = ""
let city = ""
let male = true
let userImage = "./images/register-image.png"

function renderRegister() {
    document.querySelector('#main-container-div').innerHTML = `
    <div class="reg-page">
        <div class="reg-image-place">
            <input type="file" class="custom-file-input" accept="image/*" onchange="change_preview(this)"
                id="userImage">
            <img id="reg_image" src=${userImage}>
        </div>
        <div class="reg-area">
            <div class="reg-logo"><img class="reg-img-logo" src="./images/logo.png"></div>
            <div class="reg-form">
                <div class="user-details">פרטי משתמש</div>
                <form onsubmit="checkRegister()">
                    <div class="form-group">
                        <input required type="text" class="form-control-register" id="InputUsername" placeholder="שם משתמש">
                    </div>
                    <div class="form-group">
                        <input required type="email" class="form-control-register" id="InputEmail" placeholder="אימייל">
                    </div>
                    <div class="form-group">
                        <input required type="password" class="form-control-register" id="InputPassword" placeholder="סיסמה">
                    </div>
                    <div class="form-group">
                        <input required type="number" class="form-control-register" id="InputAge" placeholder="גיל">
                    </div>
                    <div class="form-group">
                        <input required type="text" class="form-control-register" id="InputCity" placeholder="עיר">
                    </div>
                    <div class="last-submit-line">
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="MaleRadios" id="MaleRadioButton"
                                    value=true checked>
                                <label class="form-check-label fe-male-radio" for="MaleRadioButton">
                                    זכר
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="MaleRadios" id="FemaleRadioButton"
                                    value=false>
                                <label class="form-check-label fe-male-radio" for="FemaleRadioButton">
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

function change_preview(input) {
    userImage = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    document.getElementById('reg_image').src = userImage;
}

async function checkRegister() {
    username = document.getElementById('InputUsername').value
    email = document.getElementById('InputEmail').value
    password = document.getElementById('InputPassword').value
    age = document.getElementById('InputAge').value
    city = document.getElementById('InputCity').value
    male = document.querySelector('input[name="MaleRadios"]:checked').value;
    userImage = userImage

    const Users = getFromLocalStorage('users')
    const user = Users.find((user) => {
        return (user.username == username)
    })
    if (!user) {
        const newUser = {
            // id: Users.length + 1,
            username: username,
            email: email,
            password: password,
            age: age,
            city: city,
            male: male,
            img: userImage
        };
        await addUser(newUser)

        // Users.push(newUser);
        // currentUser = newUser;
        // renderRegisterDog()
    } else {
        alert("שם המשתמש קיים במערכת")
    }
}