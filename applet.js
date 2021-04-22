const requestOptions = {
	method: 'GET'
};
const domain = window.location.hostname;

function applyStyle(css) {
	var s = document.createElement('style');
	s.appendChild(document.createTextNode(css));
	document.head.appendChild(s);
}

function checkDomain(reg) {
	if (reg.domains)
		return (reg.domains.filter(dom => domain.includes(dom))).length;
	return false;
}

function checkRegExp(reg) {
	if (reg.regexps)
		return (reg.regexps.filter(el => RegExp(el).test(domain))).length;
	return false;
}

function parseStyles(styles) {
	styles.filter(val => val.sections)
		.forEach(val =>
			val.sections.filter(reg => checkDomain(reg) || checkRegExp(reg))
			.forEach(el => applyStyle(el.code))
		);
}

fetch("URLs", requestOptions) // <- Eventually replace this with your URL!
	.then(response => response.json())
	.then(response => parseStyles(response))
	.catch(error => console.log('error', error, error.line));

completion();