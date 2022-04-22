import { addOverlayListener, createOverlay, deleteOverlay,trapFocus } from "./tools.js";


/*==========================================
Handle Menu Burger
============================================*/
const btnBurger = document.querySelector('#menu-burger');
const burgerContainer = document.querySelector('.burger-container');
const menu = document.querySelector('#menu');
const body = document.querySelector('body');

btnBurger.addEventListener('click', () => {
	//State.prevActiveElement = State.getActiveElement();
	if (menu.classList.contains('open')) { closeMenu(); }
	else { 
		openMenu(); 
		trapFocus(menu);
	}
})


function closeMenu() {
	menu.classList.remove('open');
	burgerContainer.classList.remove('open');
	deleteOverlay();
	if (body.classList.contains('scroll-hidden')) {
		body.classList.remove('scroll-hidden');
	}
}

function openMenu() {
	menu.classList.add('open');
	burgerContainer.classList.add('open');
	const overlay = createOverlay();
	addOverlayListener(overlay, closeMenu);
	if (!body.classList.contains('scroll-hidden')) {
		body.classList.add('scroll-hidden');
	}
	
}

menu.addEventListener('click', (e) => {
	let link = e.target.closest('a');
	if (!link) return;
	let links = menu.querySelectorAll('.nav__link');
	links.forEach(l => l.classList.contains('nav__link_active') ? l.classList.remove('nav__link_active') : l);
	link.classList.add('nav__link_active');
	if (menu.classList.contains('open')) {
		closeMenu();
	}
})

