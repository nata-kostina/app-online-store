const btnBurger = document.querySelector('#menu-burger');
const burgerContainer = document.querySelector('.burger-container');
const menu = document.querySelector('#menu');
btnBurger.addEventListener('click', () => {
	if (menu.classList.contains('open')) {
		menu.classList.remove('open');
		burgerContainer.classList.remove('open');
	}
	else {
		menu.classList.add('open');
		burgerContainer.classList.add('open');
	}
})

menu.addEventListener('click', (e) => {
	let link = e.target.closest('a');
	if (!link) return;
	if (menu.classList.contains('open')) {
		menu.classList.remove('open');
		burgerContainer.classList.remove('open');
	}
})