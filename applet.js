const requestOptions = {
	method: 'GET'
};
const domain = window.location.hostname.replace("www.","");

function applyStyle(css) {
	var s = document.createElement('style');
	s.appendChild(document.createTextNode(css));
	document.head.appendChild(s);
}

function checkDomain(reg) {
	if (reg.domains)
		return reg.domains.filter(reg => domain.includes(reg)).length;
	return false;
}

function checkRegExp(reg) {
	if (reg.regexps)
		return reg.regexps.filter(reg => RegExp(reg).test(domain)).length;
	return false;
}

function parseStyles(styles) {
	styles.filter(val => val.sections)
		.forEach(val =>
			val.sections.filter(reg => checkDomain(reg) || checkRegExp(reg))
			.forEach(el => applyStyle(el.code))
		);
}

fetch("https://raw.githubusercontent.com/domenicoblanco/Safari-mobile-dark-mode/master/stylus.json", requestOptions) // <- Stylus backup to change!
	.then(response => response.json())
	.then(response => parseStyles(response))
	.catch(error => console.log('Error at ' + error.line, error));

completion();