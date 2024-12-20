// start of header nav line
let iconUp = document.querySelector(".nav-icon");
let list = document.querySelector(".header-links");
let iconChild = Array.from(document.querySelectorAll(".nav-icon div"));

iconUp.onclick = function appear() {
    list.classList.toggle('links-active');
    this.classList.toggle('show');
}
// end of header nav line


// copyright year

const copyrightYear = document.getElementById("copyright-year");

const currentYear = new Date().getFullYear();

copyrightYear.textContent = currentYear;

// end of copyright year