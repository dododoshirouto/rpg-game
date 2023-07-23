class Input {
    /** @type {[KeyMap]} */
    static keymaps = [];
    /** @type {[{name:string, events:[function(Event, keymap)]}]} */
    static events = [];
    static instance;

    constructor() {
        Input.instance = this;

        Input.addKeyMap('up', 'w', '.input-up');
        Input.addKeyMap('down', 's', '.input-down');
        Input.addKeyMap('left', 'a', '.input-left');
        Input.addKeyMap('right', 'd', '.input-right');
    }

    static addKeyMap(name, pc_key = null, touch_element_query = null, joypad_button = null) {
        let keymap = new KeyMap(name, pc_key, touch_element_query, joypad_button);
        Input.keymaps.push(keymap);
    }

    static setInputEvents() {
        Input.keymaps.forEach((keymap) => {
            document.querySelectorAll(keymap.touch_element_query).forEach((elm) => {
                elm.addEventListener('mousedown', (ev) => {
                    Input.dispatchEvent(keymap.name, ev, keymap);
                });
            });
        });
    }

    static addEventListener(name, func) {
        let i = Input.events.findIndex((v) => v.name == name);
        if (i == -1) {
            i = Input.events.length;
            Input.events.push({ name: name, events: [] });
        }
        Input.events[i].events.push(func);
    }
    static removeEventListener(name) {
        Input.events = Input.events.filter((v) => v.name != name);
    }
    /**
     * @param {string} name input name
     * @param {Event} event event object
     * @param {KeyMap} keymap keymap
     */
    static dispatchEvent(name, event, keymap) {
        Input.events.filter((v) => v.name == name).forEach((inp) => inp.events.forEach((f) => f(event, keymap)));
    }
}

class KeyMap {
    /** @type {string} */
    name;
    /** @type {string} */
    pc_key;
    /** @type {string} */
    touch_element_query;
    /** @type {string} */
    joypad_button;

    /**
     * @param {string} name input name
     * @param {string} pc_key pc key
     * @param {string} joypad_button joypad button
     * @param {string} touch_element_query touch element query
     */
    constructor(name, pc_key, touch_element_query, joypad_button) {
        this.name = name;
        this.pc_key = pc_key;
        this.touch_element_query = touch_element_query;
        this.joypad_button = joypad_button;
    }
}
