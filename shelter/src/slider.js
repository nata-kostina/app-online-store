import { generateRandomNumbers } from './tools.js';
import { petsArray, petsNumber } from './data.js';
import * as breakpoint from './breakpointCheck.js';
import { Modal } from './pop-up.js';
const randomNums = [...generateRandomNumbers(petsNumber)];
let init_index = 0;
const NEXT = 'next';
const ACTIVE = 'active';
const PREVIOUS = 'previous';
let cards_per_slide = 3;
const slideContainer = document.querySelector('.slide-container');

/*==========================================
Follow Breakpoint Changes
============================================*/

function breakpointMobileCheck() {
	if (breakpoint.mobile.matches) {
		cards_per_slide = 1;
		rerenderSlider();
	}
}

function breakpointTabletCheck() {
	if (breakpoint.tablet.matches) {
		cards_per_slide = 2;
		rerenderSlider();
	}
}

function breakpointDesktopCheck() {
	if (breakpoint.desktop.matches) {
		cards_per_slide = 3;
		rerenderSlider();
	}
}

breakpoint.mobile.addEventListener('change', breakpointMobileCheck);
breakpoint.tablet.addEventListener('change', breakpointTabletCheck);
breakpoint.desktop.addEventListener('change', breakpointDesktopCheck);


/*==========================================
Prepare Cards for Slider
============================================*/

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

export function initializeSlider  ()  {
	if (breakpoint.mobile.matches) {
		cards_per_slide = 1;
	}
	if (breakpoint.tablet.matches) {
		cards_per_slide = 2;
	}
	if (breakpoint.desktop.matches) {
		cards_per_slide = 3;
	}
	rerenderSlider();
}

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

slideContainer.addEventListener('click', (e) => {
	
	let card = e.target.closest('.card__item');
	if (card){
		const modal = new Modal(card.dataset.id);
		modal.createModal();
	}
})