
function renderDogPage(dogId) {
    const currentDog = Dogs.find(dog => dog.id == dogId);
    if (currentDog) {
        document.querySelector('#main-container-div').innerHTML = `
        <div class="dog-page">
            <header class="dog-header">
                <div class="logo"><img class="logo-image" src="./images/logo.png" onclick="renderMainPage()" /></div>
                <div class="personal-area">
                    <img class="personal-area-image" src="./images/personal-area-image.png" />
                    <span class="personal-area-text">אזור אישי</span>
                </div>
            </header>
            <div class="dog-area">
                <div class="dog-details">
                    <div class="names-with-buttons">
                        <span style="font-size: 4vw;">${currentDog.name}, ${currentDog.age}</span>
                        <button type="button" class="btn btn-light dog-buttons">הוסף לחברים</button>
                    </div>
                    <div class="names-with-buttons">
                        <span style="font-size: 2.3vw;">${(Users.find(u=>u.id==currentDog.ownerId)).username}</span>
                        <button type="button" class="btn btn-success dog-buttons">לצאת לטיול</button>
                    </div>
                    <div class="border-top"></div>
                    <br />
                    <span style="font-size: 1.3vw;">חיסונים</span>
                    <br />
                    <span style="font-size: 0.9vw;">${currentDog.protections}</span>
                    <br /><br />
                    <span style="font-size: 1.3vw;">חברים מספרים</span>
                    <br />
                    <button type="button" class="btn btn-secondary" disabled></button>
                    <button type="button" class="btn btn-secondary" disabled></button>
                    <button type="button" class="btn btn-secondary" disabled></button>
                    <button type="button" class="btn btn-secondary" disabled></button>
                    <button type="button" class="btn btn-secondary" disabled></button>
                    <br><br>
                    <span style="font-size: 1.3vw;">דעתך עליי</span><br>
                    <textarea type="textarea" class="tell-me-about" placeholder="ספרו על החוויה שלכם איתי..."
                        row="3"></textarea>
                </div>
                <div class="dog-images">
                    <img class="main-dog-image" src=${currentDog.images[0]}>
                    <div class="dog-small-images-area">
                        <img class="other-dog-images" src=${currentDog.images[1]}>
                        <img class="other-dog-images" src=${currentDog.images[2]}>
                        <img class="other-dog-images" src=${currentDog.images[3]}>
                    </div>
                </div>
            </div>
        </div>`;
    }
}