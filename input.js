class Input {
    static const keymaps = [];
    static instance;
    
    constructor() {
        input.instance = this;
    }
    
    static addKeyMap(name, pc_key=null, joypad_button=null, touch_element_class=null) {
        
    }
}

input = new Input();