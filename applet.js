function applyStyle(css) {
    var s = document.createElement('style');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
    completion();
}

function getData(url) {
    fetch(url)
    .then(response => response.text())
    .then(function(res) {
        applyStyle(res.replace(/^@-moz-document.*$/m, ''));
    });
}

var darkModes = Contents of URL // Replace this with the appropriate element
var domain = window.location.hostname.replace("www.","");
for(current in darkModes){
    if(domain.includes(current) || domain == current){
        getData(darkModes[current]);
    }
}

// Call completion to finish
completion();