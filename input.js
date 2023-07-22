class Input {
    /** @type {[{name:string, pc_key:string, joypad_button:string, touch_element_query:string}]} */
    static keymaps = [];
    /** @type {[{name:string, events:[function(Event)]}]} */
    static events = [];
    static instance;
    
    constructor() {
        Input.instance = this;
        
        Input.addKeyMap(
            'up',
            'w',
            '.input-up'
        )
        Input.addKeyMap(
            'down',
            's',
            '.input-down'
        )
        Input.addKeyMap(
            'left',
            'a',
            '.input-left'
        )
        Input.addKeyMap(
            'right',
            'd',
            '.input-right'
        )
    }
    
    static addKeyMap(name, pc_key=null, touch_element_query=null, joypad_button=null) {
        let keymap = {
            'name' : name,
            'pc_key' : pc_key,
            'joypad_button' : joypad_button,
            'touch_element_query' : touch_element_query,
        }
        Input.keymaps.push(keymap);
    }
    
    static setInputEvents() {
        Input.keymaps.forEach(keymap=> {
            document.querySelectorAll(keymap.touch_element_query)
                .forEach(elm=> {
                    elm.addEventListener('touchstart', ev=> {
                        Input.dispatchEvent(keymap.name, ev);
                    });
                });
        });
    }
    
    static addEventListener(name, func) {
        let i = Input.events.findIndex(v=>v.name==name);
        if (i == -1) {
            i = Input.events.length;
            Input.events.push({name: name, events: []});
        }
        Input.events[i].events.push(func);
    }
    static removeEventListener(name) {
        Input.events = Input.events.filter(v=>v.name!=name);
    }
    /**
     * @param {string} name input name
     * @param {Event} event event object
     */
    static dispatchEvent(name, event) {
        Input.events
            .filter(v=>v.name==name)
            .forEach(inp=> 
                inp.events.forEach(f=> f(event))
            );
    }
}

setTimeout(_=> input = new Input(),1);