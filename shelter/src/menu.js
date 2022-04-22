const menu = document.querySelector('.nav');

menu.addEventListener('click', (e) => {
	let link = e.target.closest('a');
	if (!link) return;
	let links = menu.querySelectorAll('.nav__link');
	links.forEach(l => l.classList.contains('nav__link_active') ? l.classList.remove('nav__link_active') : l);
	link.classList.add('nav__link_active');
})