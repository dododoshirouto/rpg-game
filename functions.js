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
    
    clone() { return new Vector2(this.x, this.y); }
    add(vec) { this.x += vec.x; this.y += vec.y; return this; }
    mul(n) { this.x *= n; this.y *= n; return this; }
    inv() { return mul(-1); }
    mag() { return Vector2.dist(this, Vector2.zero); }
    
    static dist(v1, v2) {
        let dx = v2.x - v1.x;
        let dy = v2.y - v1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /** 内積 */
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    
    /** 外積 */
    static cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    
    /** ベクトルの正規化 */
    normalize() {
        let mag = this.mag();
        if (mag > 0) {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }
    
    /** ベクトルの角度を取得する */
    angle() {
        return Math.atan2(this.y, this.x);
    }
    
    /** ベクトルの回転 */
    rotate(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        let x = this.x * cos - this.y * sin;
        let y = this.x * sin + this.y * cos;
        this.x = x;
        this.y = y;
        return this;
    }
    
    /** ベクトルの線形補間 */
    static lerp(vec1, vec2, t) {
        let x = vec1.x + (vec2.x - vec1.x) * t;
        let y = vec1.y + (vec2.y - vec1.y) * t;
        return new Vector2(x, y);
    }
    
    /** 2つのベクトルがなす角度を取得する */
    static angleBetween(v1, v2) {
        let dot = Vector2.dot(v1, v2);
        let mag1 = v1.magnitude();
        let mag2 = v2.magnitude();
        let cos = dot / (mag1 * mag2);
        return Math.acos(cos);
    }
    
    /** 2つのベクトルが等しいかどうかを判定する */
    static equal(vec1, vec2) {
        return Math.abs(vec1.x - vec2.x) < 0.000001 && Math.abs(vec1.y - vec2.y) < 0.000001;
    }
    
    /** ベクトルを文字列に変換する */
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
    
    debug(title = 'Vector2', elem = null) {
        Debug.display(title, this, elem);
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