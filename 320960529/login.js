
function renderLoginPage() {
    document.querySelector('#main-container-div').innerHTML = `
    <div class="login-page">
        <div class="login-image-place">
            <img id="login_image" src="./images/login-img.png">
        </div>
        <div class="login-area">
            <div class="login-form">
                <div class="login-logo"><img class="login-img-logo" src="./images/logo.png"></div>
                <form onsubmit="checkLogin()">
                    <div class="form-group">
                        <input required type="text" class="form-control form-control-login" id="loginUserName" placeholder="שם משתמש">
                    </div>
                    <div class="form-group">
                        <input required type="password" class="form-control form-control-login" id="loginPassword" placeholder="סיסמא">
                    </div> 
                    <div class="login-buttons-div">
                        <button type="submit" class="btn btn-light login-buttons">התחברות</button>
                        <button type="button" onclick="renderRegister()" class="btn btn-success login-buttons">צור משתמש</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}

function checkLogin() {
    const username = document.getElementById('loginUserName').value
    const password = document.getElementById('loginPassword').value
    const user = Users.find((user) => {
        return (user.username == username && user.password == password)
    })
    if (user) {
        currentUser = user;
        renderMainPage()
    } else {
        alert("שגיאה בפרטי ההתחברות")
    }
}