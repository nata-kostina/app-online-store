import { petsNumber, petsArray } from './data.js';
const randomNums = [...generateRandomNumbers(petsNumber)];
let init_index = 0;
const NEXT = 'next';
const ACTIVE = 'active';
const PREVIOUS = 'previous';
let cards_per_slide = 3;
const slideContainer = document.querySelector('.slide-container');
const mobile = window.matchMedia('(max-width: 767px)');
const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
const desktop = window.matchMedia('(min-width: 1280px)');

/*==========================================
Follow Breakpoint Changes
============================================*/

function breakpointMobileCheck() {
	if (mobile.matches) {
		cards_per_slide = 1;
		rerenderSlider();
	}
}

function breakpointTabletCheck() {
	if (tablet.matches) {
		cards_per_slide = 2;
		rerenderSlider();
	}
}

function breakpointDesktopCheck() {
	if (desktop.matches) {
		cards_per_slide = 3;
		rerenderSlider();
	}
}

mobile.addEventListener('change', breakpointMobileCheck);
tablet.addEventListener('change', breakpointTabletCheck);
desktop.addEventListener('change', breakpointDesktopCheck);

/*==========================================
Prepare Cards for Slider
============================================*/
function generateRandomNumbers(petsNumber) {
	const nums = new Set();
	while (nums.size !== petsNumber) {
		nums.add(Math.floor(Math.random() * petsNumber));
	}
	return nums;
}

function createSlide(cards_per_slide, status) {
	const slide = document.createElement("div");
	slide.classList.add('slide');
	switch (status) {
		case ACTIVE:
			slide.classList.add('displayed', 'active');
			break;
		case NEXT:
			init_index = (init_index + cards_per_slide) % (petsNumber);
			break;
		case PREVIOUS:
			init_index = (petsNumber + (init_index - cards_per_slide)) % (petsNumber);
			break;
	}
	const cards = [];
	for (let i = 0; i < cards_per_slide; i++) {
		//  debugger;
		let index = randomNums[(init_index + i) % (petsNumber)];
		//const card = `<div style="font-size: 32px">${index}</div>`;
		const card = `
		<div class="card__item" data-id=${petsArray[index]["id"]}>
			<div class="img-container">
				<img src=${petsArray[index]["img"]} alt="${petsArray[index]["type"]} ${petsArray[index]["name"]}"}>
			</div>
			<h4>${petsArray[index]["name"]}</h4>
			<button class="button button_secondary button_more">Learn more</button>
		</div>
		`;
		cards.push(card);
	}
	slide.insertAdjacentHTML('beforeend', cards.join(''));
	return slide;
}

const initializeSlider = () => {
	if (mobile.matches) {
		cards_per_slide = 1;
	}
	if (tablet.matches) {
		cards_per_slide = 2;
	}
	if (desktop.matches) {
		cards_per_slide = 3;
	}
	rerenderSlider();
}

initializeSlider();

function rerenderSlider() {
	const activeSlide = document.querySelector('.slide.active');
	if (activeSlide) { slideContainer.removeChild(activeSlide); }
	slideContainer.appendChild(createSlide(cards_per_slide, ACTIVE));
}

/*==========================================
Handle Slider
============================================*/
const btnSliderRight = document.querySelector('.button_arrow_right');
btnSliderRight.addEventListener('click', handleRightBtnClick);

const btnSliderLeft = document.querySelector('.button_arrow_left');
btnSliderLeft.addEventListener('click', handleLeftBtnClick);

function handleRightBtnClick() {
	const nextSlide = createSlide(cards_per_slide, NEXT);
	const activeSlide = document.querySelector('.slide.active');
	slideContainer.removeChild(activeSlide);
	slideContainer.appendChild(nextSlide);
	nextSlide.classList.add('active', 'displayed');
}

function handleLeftBtnClick() {
	const prevSlide = createSlide(cards_per_slide, PREVIOUS);
	const activeSlide = document.querySelector('.slide.active');
	slideContainer.removeChild(activeSlide);
	slideContainer.appendChild(prevSlide);
	prevSlide.classList.add('active', 'displayed');
}

/*==========================================
Handle Menu Burger
============================================*/
const btnBurger = document.querySelector('#menu-burger');
const burgerContainer = document.querySelector('.burger-container');
const menu = document.querySelector('#menu');

function closeMenu(){
	menu.classList.remove('open');
	burgerContainer.classList.remove('open');
	overlay.style.display = 'none';
	overlay.removeAttribute('data-type');
}

function openMenu(){
	menu.classList.add('open');
		burgerContainer.classList.add('open');
		overlay.style.display = 'block';
		overlay.setAttribute('data-type', 'menu');
}
btnBurger.addEventListener('click', () => {
	if (menu.classList.contains('open')) {
		closeMenu();
	}
	else {
		openMenu();
	}
})

menu.addEventListener('click', (e) => {
	let link = e.target.closest('a');
	if (!link) return;
	if (menu.classList.contains('open')) {
		closeMenu();
	}
})

/*==========================================
Handle Pop UP
============================================*/

const overlay = document.querySelector('.overlay');
let body = document.querySelector('body');

body.addEventListener('click', (e) => {
	if(e.target.closest('.overlay')){	
		if (e.target.closest('.overlay').dataset.type == 'modal') {
			deleteModal();
		}
		else
		if (e.target.closest('.overlay').dataset.type == 'menu') {
			closeMenu();			
		}		 
	}
	if (e.target.closest('.button_modal')) {
		deleteModal();
	}
})

function deleteModal() {
	const modal = document.querySelector('.modal');
	overlay.style.display = 'none';
	body.removeChild(modal);
	if (body.classList.contains('scroll-hidden')){
		body.classList.remove('scroll-hidden');
	}
	overlay.removeAttribute('data-type');
}


function createModal(petID) {
	const pet = petsArray.find((p) => p["id"] == petID.toString());

	const modal = `	<div class="modal">
<button class="button button_modal">
	<img src="../../assets/images/modal/cross.svg" alt="close button">
</button>
<div class="modal__inner">
	<div class="modal__img">
		<div class="img-container">
			<img src=${pet["img"]} alt="${pet["type"]} ${pet["name"]}">
		</div>
	</div>

	<div class="modal__content">
		<h3>${pet["name"]}</h3>
		<h4>${pet["type"]} - ${pet["breed"]}</h4>
		<h5 class="description">${pet["description"]}</h5>
		<ul>
			<li>
				<h5><b>Age:</b> ${pet["age"]}</h5>
			</li>
			<li>
				<h5><b>Inoculations:</b> ${pet["inoculations"]}</h5>
			</li>
			<li>
				<h5><b>Diseases:</b> ${pet["diseases"]}</h5>
			</li>
			<li>
				<h5><b>Parasites:</b> ${pet["parasites"]}</h5>
			</li>
		</ul>
	</div>
</div>
</div>
`;
	body.insertAdjacentHTML('beforeend', modal);
	if (!body.classList.contains('scroll-hidden')){
		body.classList.add('scroll-hidden');
	}
}

slideContainer.addEventListener('click', (e) => {
	let btn = e.target.closest('button');
	if (btn && btn.classList.contains('button_more')) {
		overlay.style.display = 'block';
		overlay.setAttribute('data-type', 'modal');
		if (e.target.closest('.card__item')) {
			const card = e.target.closest('.card__item');
			createModal(card.dataset.id);
		};
	}
	else
		return;
})


/*==========================================
Handle Menu
============================================*/

// const menu = document.querySelector('.nav');
// menu.addEventListener('click', (e) => {
// 	if (!e.target.closest('.nav__link'))
// 		return;
// })
