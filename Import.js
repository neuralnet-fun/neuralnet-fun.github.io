function Import(reference) {
    var script = document.createElement('script');
    script.src = reference;
    document.head.appendChild(script);
}