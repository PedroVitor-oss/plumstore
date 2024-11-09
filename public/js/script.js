const wrapper = document.querySelector('.warapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const btnPopup = document.querySelector('.btnLogin-popup');


registerLink.onclick = () => {
    wrapper.classList.add('active');
};

loginLink.onclick = () => {
    wrapper.classList.remove('active');
};

btnPopup.onclick = () => {
    wrapper.classList.add('active-popup');
};