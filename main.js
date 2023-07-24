document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });

setTimeout((_) => {
    new Input();
    Input.addEventListener('up', (ev, key) => console.log('up', ev, key));
    Input.addEventListener('down', (ev, key) => console.log('down', ev, key));
    Input.addEventListener('left', (ev, key) => console.log('left', ev, key));
    Input.addEventListener('right', (ev, key) => console.log('right', ev, key));
    Input.setInputEvents();
}, 1);
