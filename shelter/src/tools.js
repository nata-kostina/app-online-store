const body = document.querySelector('body');
export function generateRandomNumbers(numNumber, limit, exclude = []) {	
	const nums = new Set();
	while (nums.size !== numNumber) {
		let randomNum = (Math.floor(Math.random() * limit));
		if (!exclude.includes(randomNum)) { nums.add(randomNum); }
	}
	return nums;
}


export function createOverlay() {
	const overlay = document.createElement('div');
	overlay.classList.add('overlay');
	body.insertAdjacentElement('beforeend', overlay);
	return overlay;
}

export function deleteOverlay() {
	const overlay = document.querySelector('.overlay');
	if (overlay) {
		body.removeChild(overlay);
	}
}

export function addOverlayListener(overlay, callback) {
	overlay.addEventListener('click', callback);
}

export function addOverlayMouseEnterListener(overlay, callback) {
	overlay.addEventListener('mouseover', (e) => callback(e));
}

export function addOverlayListener1(event,overlay, callback) {
	console.log('hi')
	overlay.addEventListener(event, callback);
}



export const trapFocus = (element) => {
	const focusableEls = element.querySelectorAll(
		'a[href]:not([disabled]), .test, .logo, button:not([disabled])'
	);
	const firstFocusableEl = focusableEls[0];
	const lastFocusableEl = focusableEls[focusableEls.length - 1];
	const KEYCODE_TAB = 9;
	let activeElementIndex = 0;

	body.addEventListener('keydown', (e) => {
		const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
		if (!isTabPressed) {
			return;
		}
		e.preventDefault();

		focusableEls[activeElementIndex].focus();
		activeElementIndex = (activeElementIndex + 1) % focusableEls.length;

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableEl) {
				activeElementIndex = 0;
				e.preventDefault();
			}
		}
	})
};

export function insertNewElement(tag, parent, classes = [], place) {
	const el = document.createElement(tag);
	classes.map(c => el.classList.add(c));
	parent.insertAdjacentElement(place, el);
	return el;
}