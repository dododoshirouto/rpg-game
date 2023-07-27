class Vector2 {
    /** @type {number} */
    x;
    /** @type {number} */
    y;
    
    static up() { return new Vector2(0, 1); }
    static down() { return new Vector2(0, -1); }
    static left() { return new Vector2(-1, 0); }
    static right() { return new Vector2(1, 0); }
    static zero() { return new Vector2(0, 0); }
    static one() { return new Vector2(1, 1); }
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Time {
    /** @type {number} */
    static time = 0;
    /** @type {number} */
    static deltaTime = 0;
    
    static startTime = 0;
    static lastTime = 0;
    
    static scale = 1;
    static scaledTime = 0;
    static scaleStart = 0;
    static scaleStartScaled = 0;
    
    static animFrameId = -1;
    
    static start() {
        Time.main()
    }
    
    static main() {
        Time.animFrameId = requestAnimationFrame(Time.main);
        let now_s = Date.now() / 1000;
        if (Time.startTime == 0) { Time.startTime = now_s; }
        Time.time = (now_s - Time.startTime).toFixed(6)-0;
        if (Time.lastTime == 0) { Time.lastTime = now_s; return; }
        
        Time.deltaTime = (Time.time - Time.lastTime).toFixed(6)-0;
        
        Time.scaledTime = Time.scaleStartScaled + (Time.time - Time.scaleStart) * Time.scale;
        
        Time.lastTime = Time.time;
        
        // Time.debug();
    }
    
    static setScale(scale) {
        Time.scale = scale;
        Time.scaleStart = Time.time;
        Time.scaleStartScaled = Time.scaledTime;
    }
    
    /**
     * @param {HTMLElement} elem
     */
    static debug (elem = null) {
        Debug.display('Time', Time, elem);
    }
}

Time.start();

class Debug {
    /** @type {HTMLElement} */
    static defaultOutputElement = null;
    static outputConsole = true;
    
    /**
     * @param {string} title
     * @param {{}} vars
     * @param {boolean} outputConsole
     * @return {string}
     */
    static createDisplayText(title, vars, outputConsole = Debug.outputConsole) {
        let output = title + "\n";
        let keys = Object.keys(vars);
        let maxKeyLen = keys.reduce((a,b) => Math.max(a.length??0,b.length??0));
        let spaceFills = Array.from({length: maxKeyLen-1}, _=>' ').join('');
        keys.forEach(key=> {
            output += `${(key+spaceFills).slice(0, maxKeyLen)} : ${JSON.stringify(vars[key])}\n`;
        })
        output = output.trim();
        if (outputConsole) {
            console.info(output);
        }
        return output;
    }
    
    static display(title, vars, elem = Debug.defaultOutputElement, outputConsole = Debug.outputConsole) {
        let output = Debug.createDisplayText(title, vars, outputConsole);
        if (elem) {
            elem.innerText = output;
        }
    }
}