
/**
 * 
 * @param {Element} add hidden 클래스를 추가할 요소
 */
const hiddenClassAdd = function(add) {
    add.classList.add('hidden');
}
/**
 * 
 * @param {Element} remove hidden 클래스를 제거할 요소
 */
const hiddenClassRemove = function(remove) {
    remove.classList.remove('hidden');
}

const navMenuBtn = document.querySelector('.navMenuBtn');
const navLogin = document.querySelector('.navLogin');
// const signupBtn = document.querySelector('.signup');
const loginBox = document.querySelector('.loginBox');
// const signupBox = document.querySelector('.signupBox');

navMenuBtn.addEventListener('click', function(){
    const navMenu = document.querySelector('.navMenuContainer');
    navMenu.classList.toggle('active');
});

navLogin.addEventListener('click', function(){
    const mainContainer = document.querySelector('.mainContainer');
    const loginContainer = document.querySelector('.loginContainer');

    hiddenClassAdd(mainContainer);
    // hiddenClassAdd(signupBox);
    hiddenClassRemove(loginContainer);
    hiddenClassRemove(loginBox);
})

const navTutorial = document.querySelectorAll('.navTutorial');

navTutorial.forEach(function(e) {
    e.addEventListener('click', function() {
        const mainContainer = document.querySelector('.mainContainer');
        const loginContainer = document.querySelector('.loginContainer');
        const tutorialContainer = document.querySelector('.tutorialContainer');
        const tutorialSquatBox = document.querySelector('.tutorialSquatBox');
        const tutoriaSideLungeBox = document.querySelector('.tutoriaSideLungeBox');
        const tutorialPlankBox = document.querySelector('.tutorialPlankBox');
        const tutorialShoulderPressBox = document.querySelector('.tutorialShoulderPressBox');

        hiddenClassAdd(mainContainer);
        hiddenClassAdd(loginContainer);
        hiddenClassRemove(tutorialContainer);

        if(e.classList.contains('tutorialSquat')) {

            hiddenClassRemove(tutorialSquatBox);
            document.querySelector('.tutorialSquatBox iframe').classList.remove('visibilityHidden');
            hiddenClassAdd(tutoriaSideLungeBox);
            document.querySelector('.tutoriaSideLungeBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutorialPlankBox);
            document.querySelector('.tutorialPlankBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutorialShoulderPressBox);
            document.querySelector('.tutorialShoulderPressBox iframe').classList.add('visibilityHidden');

        } else if(e.classList.contains('tutoriaSideLunge')) {

            hiddenClassRemove(tutoriaSideLungeBox);
            document.querySelector('.tutoriaSideLungeBox iframe').classList.remove('visibilityHidden');
            hiddenClassAdd(tutorialSquatBox);
            document.querySelector('.tutorialSquatBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutorialPlankBox);
            document.querySelector('.tutorialPlankBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutorialShoulderPressBox);
            document.querySelector('.tutorialShoulderPressBox iframe').classList.add('visibilityHidden');

        } else if(e.classList.contains('tutorialPlank')) {

            hiddenClassRemove(tutorialPlankBox); 
            document.querySelector('.tutorialPlankBox iframe').classList.remove('visibilityHidden');
            hiddenClassAdd(tutorialSquatBox);
            document.querySelector('.tutorialSquatBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutoriaSideLungeBox);
            document.querySelector('.tutoriaSideLungeBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutorialShoulderPressBox);
            document.querySelector('.tutorialShoulderPressBox iframe').classList.add('visibilityHidden');

        } else if(e.classList.contains('tutorialShoulderPress')) {

            hiddenClassRemove(tutorialShoulderPressBox);
            document.querySelector('.tutorialShoulderPressBox iframe').classList.remove('visibilityHidden');
            hiddenClassAdd(tutorialSquatBox);
            document.querySelector('.tutorialSquatBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutoriaSideLungeBox);
            document.querySelector('.tutoriaSideLungeBox iframe').classList.add('visibilityHidden');
            hiddenClassAdd(tutorialPlankBox);
            document.querySelector('.tutorialPlankBox iframe').classList.add('visibilityHidden');

        } else {
            
            hiddenClassRemove(tutorialSquatBox);
            document.querySelector('.tutorialSquatBox iframe').classList.remove('visibilityHidden');
            hiddenClassRemove(tutoriaSideLungeBox);
            document.querySelector('.tutoriaSideLungeBox iframe').classList.remove('visibilityHidden');
            hiddenClassRemove(tutorialPlankBox);
            document.querySelector('.tutorialPlankBox iframe').classList.remove('visibilityHidden');
            hiddenClassRemove(tutorialShoulderPressBox);
            document.querySelector('.tutorialShoulderPressBox iframe').classList.remove('visibilityHidden');
        }
    });
});