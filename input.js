class Input {
    /** @type {[KeyMap]} */
    static keymaps = [];
    /** @type {[{name:string, events:[function(Event, KeyMap)]}]} */
    static events = [];
    static instance;

    constructor() {
        Input.instance = this;

        Input.addKeyMap('up', KeyCode.W, '.input-up');
        Input.addKeyMap('down', KeyCode.S, '.input-down');
        Input.addKeyMap('left', KeyCode.A, '.input-left');
        Input.addKeyMap('right', KeyCode.D, '.input-right');

        Input.setEventListenerForPCKey();
    }

    static setEventListenerForPCKey() {
        document.body.addEventListener('keydown', (ev) => {
            let keymap = this.keymaps.find((key) => key.pc_key.code == ev.code);
            if (!keymap) return;
            let event = this.events.find((v) => v.name == keymap.name);
            if (!event) return;
            event.events.forEach((f) => f(ev, keymap));
        });
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
    /** @type {KeyCode} */
    pc_key;
    /** @type {string} */
    touch_element_query;
    /** @type {string} */
    joypad_button;

    /**
     * @param {string} name input name
     * @param {KeyCode} pc_key pc key
     * @param {string} joypad_button joypad button
     * @param {string} touch_element_query touch element query selector
     */
    constructor(name, pc_key, touch_element_query, joypad_button) {
        this.name = name;
        this.pc_key = pc_key;
        this.touch_element_query = touch_element_query;
        this.joypad_button = joypad_button;
    }
}

/**
 * @enum {string} Key Code.
 */
class KeyCode {
    static Undefined = new KeyCode('');
    static Alt = new KeyCode('AltLeft');
    static AltLeft = new KeyCode('AltLeft');
    static AltRight = new KeyCode('AltRight');
    static Down = new KeyCode('ArrowDown');
    static Left = new KeyCode('ArrowLeft');
    static Right = new KeyCode('ArrowRight');
    static Up = new KeyCode('ArrowUp');
    static AudioVolumeDown = new KeyCode('AudioVolumeDown');
    static AudioVolumeMute = new KeyCode('AudioVolumeMute');
    static AudioVolumeUp = new KeyCode('AudioVolumeUp');
    static Backquote = new KeyCode('Backquote');
    static Backslash = new KeyCode('Backslash');
    static Backspace = new KeyCode('Backspace');
    static BracketLeft = new KeyCode('BracketLeft');
    static BracketRight = new KeyCode('BracketRight');
    static BrowserBack = new KeyCode('BrowserBack');
    static BrowserFavorites = new KeyCode('BrowserFavorites');
    static BrowserForward = new KeyCode('BrowserForward');
    static BrowserHome = new KeyCode('BrowserHome');
    static BrowserRefresh = new KeyCode('BrowserRefresh');
    static BrowserSearch = new KeyCode('BrowserSearch');
    static BrowserStop = new KeyCode('BrowserStop');
    static CapsLock = new KeyCode('CapsLock');
    static Comma = new KeyCode('Comma');
    static ContextMenu = new KeyCode('ContextMenu');
    static Control = new KeyCode('ControlLeft');
    static ControlLeft = new KeyCode('ControlLeft');
    static ControlRight = new KeyCode('ControlRight');
    static Convert = new KeyCode('Convert');
    static Copy = new KeyCode('Copy');
    static Cut = new KeyCode('Cut');
    static Delete = new KeyCode('Delete');
    static D0 = new KeyCode('Digit0');
    static D1 = new KeyCode('Digit1');
    static D2 = new KeyCode('Digit2');
    static D3 = new KeyCode('Digit3');
    static D4 = new KeyCode('Digit4');
    static D5 = new KeyCode('Digit5');
    static D6 = new KeyCode('Digit6');
    static D7 = new KeyCode('Digit7');
    static D8 = new KeyCode('Digit8');
    static D9 = new KeyCode('Digit9');
    static Eject = new KeyCode('Eject');
    static End = new KeyCode('End');
    static Enter = new KeyCode('Enter');
    static Equal = new KeyCode('Equal');
    static Escape = new KeyCode('Escape');
    static F1 = new KeyCode('F1');
    static F2 = new KeyCode('F2');
    static F3 = new KeyCode('F3');
    static F4 = new KeyCode('F4');
    static F5 = new KeyCode('F5');
    static F6 = new KeyCode('F6');
    static F7 = new KeyCode('F7');
    static F8 = new KeyCode('F8');
    static F9 = new KeyCode('F9');
    static F10 = new KeyCode('F10');
    static F11 = new KeyCode('F11');
    static F12 = new KeyCode('F12');
    static F13 = new KeyCode('F13');
    static F14 = new KeyCode('F14');
    static F15 = new KeyCode('F15');
    static F16 = new KeyCode('F16');
    static F17 = new KeyCode('F17');
    static F18 = new KeyCode('F18');
    static F19 = new KeyCode('F19');
    static F20 = new KeyCode('F20');
    static F21 = new KeyCode('F21');
    static F22 = new KeyCode('F22');
    static F23 = new KeyCode('F23');
    static F24 = new KeyCode('F24');
    static Help = new KeyCode('Help');
    static Home = new KeyCode('Home');
    static Insert = new KeyCode('Insert');
    static IntlBackslash = new KeyCode('IntlBackslash');
    static IntlRo = new KeyCode('IntlRo');
    static IntlYen = new KeyCode('IntlYen');
    static KanaMode = new KeyCode('KanaMode');
    static A = new KeyCode('KeyA');
    static B = new KeyCode('KeyB');
    static C = new KeyCode('KeyC');
    static D = new KeyCode('KeyD');
    static E = new KeyCode('KeyE');
    static F = new KeyCode('KeyF');
    static G = new KeyCode('KeyG');
    static H = new KeyCode('KeyH');
    static I = new KeyCode('KeyI');
    static J = new KeyCode('KeyJ');
    static K = new KeyCode('KeyK');
    static L = new KeyCode('KeyL');
    static M = new KeyCode('KeyM');
    static N = new KeyCode('KeyN');
    static O = new KeyCode('KeyO');
    static P = new KeyCode('KeyP');
    static Q = new KeyCode('KeyQ');
    static R = new KeyCode('KeyR');
    static S = new KeyCode('KeyS');
    static T = new KeyCode('KeyT');
    static U = new KeyCode('KeyU');
    static V = new KeyCode('KeyV');
    static W = new KeyCode('KeyW');
    static X = new KeyCode('KeyX');
    static Y = new KeyCode('KeyY');
    static Z = new KeyCode('KeyZ');
    static Lang1 = new KeyCode('Lang1');
    static Lang2 = new KeyCode('Lang2');
    static Lang3 = new KeyCode('Lang3');
    static Lang4 = new KeyCode('Lang4');
    static LaunchApp1 = new KeyCode('LaunchApp1');
    static LaunchApp2 = new KeyCode('LaunchApp2');
    static LaunchMail = new KeyCode('LaunchMail');
    static MediaPlayPause = new KeyCode('MediaPlayPause');
    static MediaSelect = new KeyCode('MediaSelect');
    static MediaStop = new KeyCode('MediaStop');
    static MediaTrackNext = new KeyCode('MediaTrackNext');
    static MediaTrackPrevious = new KeyCode('MediaTrackPrevious');
    static MetaLeft = new KeyCode('MetaLeft');
    static MetaRight = new KeyCode('MetaRight');
    static Minus = new KeyCode('Minus');
    static NonConvert = new KeyCode('NonConvert');
    static NumLock = new KeyCode('NumLock');
    static N0 = new KeyCode('Numpad0');
    static N1 = new KeyCode('Numpad1');
    static N2 = new KeyCode('Numpad2');
    static N3 = new KeyCode('Numpad3');
    static N4 = new KeyCode('Numpad4');
    static N5 = new KeyCode('Numpad5');
    static N6 = new KeyCode('Numpad6');
    static N7 = new KeyCode('Numpad7');
    static N8 = new KeyCode('Numpad8');
    static N9 = new KeyCode('Numpad9');
    static NumpadAdd = new KeyCode('NumpadAdd');
    static NumpadComma = new KeyCode('NumpadComma');
    static NumpadDecimal = new KeyCode('NumpadDecimal');
    static NumpadDivide = new KeyCode('NumpadDivide');
    static NumpadEnter = new KeyCode('NumpadEnter');
    static NumpadEqual = new KeyCode('NumpadEqual');
    static NumpadMultiply = new KeyCode('NumpadMultiply');
    static NumpadSubtract = new KeyCode('NumpadSubtract');
    static PageDown = new KeyCode('PageDown');
    static PageUp = new KeyCode('PageUp');
    static Paste = new KeyCode('Paste');
    static Pause = new KeyCode('Pause');
    static Pause = new KeyCode('Pause');
    static Period = new KeyCode('Period');
    static Power = new KeyCode('Power');
    static PrintScreen = new KeyCode('PrintScreen');
    static Quote = new KeyCode('Quote');
    static ScrollLock = new KeyCode('ScrollLock');
    static Semicolon = new KeyCode('Semicolon');
    static ShiftLeft = new KeyCode('ShiftLeft');
    static ShiftRight = new KeyCode('ShiftRight');
    static Slash = new KeyCode('Slash');
    static Sleep = new KeyCode('Sleep');
    static Space = new KeyCode('Space');
    static Tab = new KeyCode('Tab');
    static Undo = new KeyCode('Undo');
    static WakeUp = new KeyCode('WakeUp');

    constructor(code) {
        this.code = code;
    }
}
