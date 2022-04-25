import { generateRandomNumbers } from './tools.js';
import { petsArray, petsNumber } from './data.js';
import * as breakpoint from './breakpointCheck.js';
import { Modal } from './pop-up.js';
/*==========================================
Handle Pagination
============================================*/
const randomNums = generateNumbersForPagination();

const pageStatus = { last: 'last', only: 'only', current: 'current', first: 'first' }

const paginationControl = document.querySelector('.pagination');

const btnFirst = document.querySelector('.button_paginator.first');
const btnPrev = document.querySelector('.button_paginator.previous');
const btnActive = document.querySelector('.button_paginator.active');
const btnNext = document.querySelector('.button_paginator.next');
const btnLast = document.querySelector('.button_paginator.last');

const totalCardsNum = 48;
let cardsPerPage = 8;
let currentStartIndex = 0;
let activePageNum = 1;

const cardsContainer = document.querySelector('.card-container');
breakpoint.mobile.addEventListener('change', breakpointMobileCheck);
breakpoint.tablet.addEventListener('change', breakpointTabletCheck);
breakpoint.desktop.addEventListener('change', breakpointDesktopCheck);


cardsContainer.addEventListener('click', (e) => {	
	let card = e.target.closest('.card__item');
	if (card){
		const modal = new Modal(card.dataset.id);
		modal.createModal();
	}
})

function getLastPageNum() {
	return Math.ceil(totalCardsNum / cardsPerPage);
}

function breakpointMobileCheck() {
	if (breakpoint.mobile.matches) {
		updateActivePageNum();
		updateCurrentStartIndex();
		cardsPerPage = 3;
		clearPage();
		generatePage();
	}
}

function breakpointTabletCheck() {
	if (breakpoint.tablet.matches) {
		cardsPerPage = 6;
		updateActivePageNum();
		updateCurrentStartIndex();
		clearPage();
		generatePage();
	}
}

function breakpointDesktopCheck() {
	if (breakpoint.desktop.matches) {
		cardsPerPage = 8;
		updateActivePageNum();
		updateCurrentStartIndex();
		clearPage();
		generatePage();
	}
}

paginationControl.addEventListener('click', (e) => {
	let btn = e.target.closest('.button_paginator');
	if (!btn)
		return;
	if (btn.classList.contains('first')) {
		goToFirstPage();
	}
	else
		if (btn.classList.contains('next')) {
			goToNextPage();
		}
		else
			if (btn.classList.contains('last')) {
				goToLastPage();
			}
			else
				if (btn.classList.contains('previous')) {
					goToPrevPage();
				}
})

function getPageStatus() {
	let status;
	let lastPageNum = getLastPageNum();
	if (activePageNum == lastPageNum && activePageNum == 1) { status = pageStatus.only }
	else
		if (activePageNum == lastPageNum) { status = pageStatus.last }
		else
			if (activePageNum == 1) { status = pageStatus.first }
			else
				status = pageStatus.current;
	return status;
}

function goToFirstPage() {
	currentStartIndex = 0;
	activePageNum = 1;
	clearPage();
	generatePage();
}

function goToNextPage() {
	currentStartIndex += cardsPerPage;
	activePageNum++;
	clearPage();
	generatePage();
}

function goToLastPage() {
	let lastPageNum = getLastPageNum();
	currentStartIndex = lastPageNum * cardsPerPage - cardsPerPage;
	activePageNum = lastPageNum;
	clearPage();
	generatePage();
}
function goToPrevPage() {
	currentStartIndex -= cardsPerPage;
	activePageNum--;
	clearPage();
	generatePage();
}

function handleControlDisplay() {
	let status = getPageStatus();
	switch (status) {
		case pageStatus.first:
			if (!btnFirst.classList.contains('button_paginator_inactive')) {
				btnFirst.setAttribute('disabled', '');
				btnFirst.classList.add('button_paginator_inactive');
			}
			if (!btnPrev.classList.contains('button_paginator_inactive')) {
				btnPrev.setAttribute('disabled', '');
				btnPrev.classList.add('button_paginator_inactive');
			}
			if (btnNext.classList.contains('button_paginator_inactive')) {
				btnNext.removeAttribute('disabled');
				btnNext.classList.remove('button_paginator_inactive');
			}
			if (btnLast.classList.contains('button_paginator_inactive')) {
				btnLast.removeAttribute('disabled');
				btnLast.classList.remove('button_paginator_inactive');
			}

			break;
		case pageStatus.last:

			if (!btnNext.classList.contains('button_paginator_inactive')) {
				btnNext.setAttribute('disabled', '');
				btnNext.classList.add('button_paginator_inactive');
			}
			if (!btnLast.classList.contains('button_paginator_inactive')) {
				btnLast.setAttribute('disabled', '');
				btnLast.classList.add('button_paginator_inactive');
			}
			if (btnFirst.classList.contains('button_paginator_inactive')) {
				btnFirst.removeAttribute('disabled');
				btnFirst.classList.remove('button_paginator_inactive');
			}
			if (btnPrev.classList.contains('button_paginator_inactive')) {
				btnPrev.removeAttribute('disabled');
				btnPrev.classList.remove('button_paginator_inactive');
			}
			break;

		case pageStatus.only:

			if (!btnLast.classList.contains('button_paginator_inactive')) {
				btnLast.setAttribute('disabled', '');
				btnLast.classList.add('button_paginator_inactive');
			}
			if (!btnPrev.classList.contains('button_paginator_inactive')) {
				btnPrev.setAttribute('disabled', '');
				btnPrev.classList.add('button_paginator_inactive');
			}
			if (!btnNext.classList.contains('button_paginator_inactive')) {
				btnNext.setAttribute('disabled', '');
				btnNext.classList.add('button_paginator_inactive');
			}
			if (!btnLast.classList.contains('button_paginator_inactive')) {
				btnLast.setAttribute('disabled', '');
				btnLast.classList.add('button_paginator_inactive');
			}
			break;

		case pageStatus.current:
			if (btnFirst.classList.contains('button_paginator_inactive')) {
				btnFirst.removeAttribute('disabled');
				btnFirst.classList.remove('button_paginator_inactive');
			}
			if (btnPrev.classList.contains('button_paginator_inactive')) {
				btnPrev.removeAttribute('disabled');
				btnPrev.classList.remove('button_paginator_inactive');
			}
			if (btnNext.classList.contains('button_paginator_inactive')) {
				btnNext.removeAttribute('disabled');
				btnNext.classList.remove('button_paginator_inactive');
			}
			if (btnLast.classList.contains('button_paginator_inactive')) {
				btnLast.removeAttribute('disabled');
				btnLast.classList.remove('button_paginator_inactive');
				break;
			}
	}
}


function updateActivePageNum() {
	activePageNum = Math.floor(currentStartIndex / cardsPerPage) + 1;
	btnActive.innerHTML = activePageNum;
}

function updateCurrentStartIndex() {
	currentStartIndex = activePageNum * cardsPerPage - cardsPerPage;
}

function clearPage() {
	cardsContainer.innerHTML = '';
}

export function generatePage() {
	updateActivePageNum();
	updateCurrentStartIndex();
	let cards = [];
	
	cardsContainer.dataset.cards =cardsPerPage;

	for (let i = 0; i < cardsPerPage; i++) {
		let index = (currentStartIndex + i);
		if (index == totalCardsNum) {
			break;
		}

		index = randomNums[(currentStartIndex + i) % randomNums.length];

		const card = `
		<div class="card__item" data-id = "${index}">
								<div class="img-container">
									<img src="${petsArray[index]['img']}" alt="${petsArray[index]['type']}">
								</div>
								<h4>${petsArray[index]['name']}</h4>
								<button class="button button_secondary">Learn more</button>
							</div>
		`;
		cards.push(card);
	}
	cardsContainer.insertAdjacentHTML('beforeend', cards.join(""));
	handleControlDisplay();
}

function generateNumbersForPagination() {
	const times = 6;
	const nums = [];
	for (let i = 0; i < times; i++) {
		nums.push(...generateRandomNumbers(petsNumber, petsNumber));
	}

	return nums;
}
export function initializePagination() {
	const width = document.documentElement.clientWidth;
	if (width < 768) { cardsPerPage = 3; }
	if (width >= 768 && width < 1280) { cardsPerPage = 6; }
	if (width >= 1280) { cardsPerPage = 8; }
	cardsContainer.setAttribute('data-cards', cardsPerPage);

	generatePage();
}