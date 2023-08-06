document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });

function init() {
    new Input();
    Input.addEventListener('up',   (ev, key) => console.log('up',   ev, key));
    Input.addEventListener('down', (ev, key) => console.log('down', ev, key));
    Input.addEventListener('left', (ev, key) => console.log('left', ev, key));
    Input.addEventListener('right',(ev, key) => console.log('right',ev, key));
    Input.setInputEvents();

    GameObject.parentElem = document.querySelector('#scene');
    
    player = new GameObject({
        name: 'player',
        type: GameObjectType.Player,
        images: ['https://cdn-icons-png.flaticon.com/512/149/149769.png'],
    })
}

setTimeout(init, 1);