import { petsArray } from './data.js';
import { addOverlayListener, createOverlay, deleteOverlay, trapFocus, addOverlayMouseEnterListener,addOverlayListener1 } from './tools.js';
/*==========================================
Handle Pop UP
============================================*/
const body = document.querySelector('body');
export class Modal {
	constructor(petID) {
		this.pet = petsArray.find((p) => p["id"] == petID.toString());
	}

	createModal() {
		const modal = document.createElement('div');
		modal.classList.add('modal')
		modal.insertAdjacentHTML("afterbegin", `	
	<button class="button button_modal">
		<img src="../../assets/images/modal/cross.svg" alt="close button">
	</button>
	<div class="modal__inner">
		<div class="modal__img">
			<div class="img-container">
				<img src=${this.pet["img"]} alt="${this.pet["type"]} ${this.pet["name"]}">
			</div>
		</div>
	
		<div class="modal__content">
			<h3>${this.pet["name"]}</h3>
			<h4>${this.pet["type"]} - ${this.pet["breed"]}</h4>
			<h5 class="description">${this.pet["description"]}</h5>
			<ul>
				<li>
					<h5><b>Age:</b> ${this.pet["age"]}</h5>
				</li>
				<li>
					<h5><b>Inoculations:</b> ${this.pet["inoculations"]}</h5>
				</li>
				<li>
					<h5><b>Diseases:</b> ${this.pet["diseases"]}</h5>
				</li>
				<li>
					<h5><b>Parasites:</b> ${this.pet["parasites"]}</h5>
				</li>
			</ul>
		</div>
	</div>

	`);
		body.insertAdjacentElement('beforeend', modal);
		if (!body.classList.contains('scroll-hidden')) {
			body.classList.add('scroll-hidden');
		}

		const overlay = createOverlay();

		addOverlayListener1('click', overlay, this.deleteModal);
		addOverlayListener1('mouseenter', overlay, this.hoverBtnClose);
		addOverlayListener1('mouseout', overlay, this.unhoverBtnClose);

		const btnClose = document.querySelector('.button_modal');
		btnClose.addEventListener('click', this.deleteModal);
		trapFocus(modal);
	}

	deleteModal() {
		deleteOverlay();
		const modal = document.querySelector('.modal');
		body.removeChild(modal);
		if (body.classList.contains('scroll-hidden')) {
			body.classList.remove('scroll-hidden');
		}
	}

	hoverBtnClose() {
		
		const btnClose = document.querySelector('.button_modal');
		if (!btnClose.classList.contains('active')) { btnClose.classList.add('active'); }
	}

	unhoverBtnClose() {		
		const btnClose = document.querySelector('.button_modal');
		if (btnClose.classList.contains('active')) { btnClose.classList.remove('active'); }
	}
}