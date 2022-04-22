

const body = document.querySelector('body');
export function generateRandomNumbers(number) {
	const nums = new Set();
	while (nums.size !== number) {
		nums.add(Math.floor(Math.random() * number));
	}
	return nums;
}


export function createOverlay() {
	const overlay = document.createElement('div');
	overlay.classList.add('overlay');	
	body.insertAdjacentElement('beforeend', overlay);
return overlay;
}

export function deleteOverlay( ) {
	const overlay = document.querySelector('.overlay');
	if(overlay){
		body.removeChild(overlay);
	}
}

export function addOverlayListener(overlay, callback){
	overlay.addEventListener('click', callback);
}



export const trapFocus = (element) => {
	const focusableEls = element.querySelectorAll(
	  'a[href]:not([disabled]), .test, .logo, button:not([disabled])'
	);
	console.log(focusableEls);
	const firstFocusableEl = focusableEls[0];
	const lastFocusableEl = focusableEls[focusableEls.length - 1];
	const KEYCODE_TAB = 9;
	let activeElementIndex = 0;
	
	body.addEventListener('keydown', (e) => {
	//	debugger;
		const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
		if (!isTabPressed) {
			return;
		}
		e.preventDefault();
		//	debugger;
		//firstFocusableEl.focus();
		focusableEls[activeElementIndex].focus();
		console.log(focusableEls[activeElementIndex]);
		console.log(activeElementIndex);
		activeElementIndex = (activeElementIndex+1)%focusableEls.length;
 
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