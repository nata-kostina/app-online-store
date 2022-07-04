import { generateRandomNumbers, insertNewElement } from './tools.js';
import { petsArray, petsNumber } from './data.js';
import * as breakpoint from './breakpointCheck.js';
import { Modal } from './pop-up.js';
let cards_per_slide = 3;
let exclude = [];

let init_index = 0;
const NEXT = 'next';
const ACTIVE = 'active';
const PREVIOUS = 'previous';
const slideContainer = document.querySelector('.slide-container');
const slideMovingBox = document.querySelector('.slide-moving-box');

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
	let randomNums = [...generateRandomNumbers(cards_per_slide, petsNumber, exclude)];
	exclude = [...randomNums];

	const slide = document.createElement("div");
	slide.classList.add('slide');
	switch (status) {
		case ACTIVE:
			slide.classList.add('displayed', 'active', `layout-${cards_per_slide}-col`);
			break;
		case NEXT:
			init_index = (init_index + cards_per_slide) % (petsNumber);
			slide.classList.add('next', `layout-${cards_per_slide}-col`);
			break;
		case PREVIOUS:
			init_index = (petsNumber + (init_index - cards_per_slide)) % (petsNumber);
			slide.classList.add('prev', `layout-${cards_per_slide}-col`);
			break;
	}
	let cards = [];

	for (let i = 0; i < cards_per_slide; i++) {
		let index = randomNums[i];
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

export function initializeSlider() {
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
	if (activeSlide) { slideMovingBox.removeChild(activeSlide); }
	slideMovingBox.appendChild(createSlide(cards_per_slide, ACTIVE));
}

/*==========================================
Handle Slider
============================================*/
const btns = document.querySelectorAll('.button_arrow');

const btnSliderRight = document.querySelector('.button_arrow_right');
btnSliderRight.addEventListener('click', handleRightBtnClick);

const btnSliderLeft = document.querySelector('.button_arrow_left');
btnSliderLeft.addEventListener('click', handleLeftBtnClick);

function handleRightBtnClick() {

	btns.forEach((b) => b.disabled = true);
	const gap = insertNewElement('div', slideMovingBox, ["gap-40"], 'beforeend');

	const nextSlide = createSlide(cards_per_slide, NEXT);
	nextSlide.style.display = 'flex';
	slideMovingBox.insertAdjacentElement('beforeend', nextSlide);

	const activeSlide = document.querySelector('.slide.active');
	slideMovingBox.classList.add('move-to-left');
	setTimeout(() => {
		slideMovingBox.removeChild(activeSlide);
		slideMovingBox.removeChild(gap);
		slideMovingBox.classList.remove('move-to-left');
		nextSlide.classList.remove('next');
		nextSlide.classList.add('active');
		btns.forEach((b) => b.disabled = false);
	}, 1510);
}

function handleLeftBtnClick() {
	btns.forEach((b) => b.disabled = true);
	const prevSlide = createSlide(cards_per_slide, PREVIOUS);
	prevSlide.style.display = 'flex';
	const activeSlide = document.querySelector('.slide.active');

	slideMovingBox.insertAdjacentElement('afterbegin', prevSlide);
	slideMovingBox.classList.add('move-to-right');

	setTimeout(() => {
		slideMovingBox.removeChild(activeSlide);
		slideMovingBox.classList.remove('move-to-right');
		prevSlide.classList.remove('prev');
		prevSlide.classList.add('active');
		btns.forEach((b) => b.disabled = false);
	}, 1510);
}

slideContainer.addEventListener('click', (e) => {

	let card = e.target.closest('.card__item');
	if (card) {
		const modal = new Modal(card.dataset.id);
		modal.createModal();
	}
})
