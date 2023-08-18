class GameObject {
    // static globalPixelScale = 1;
    static globalGridPixels = 32;
    /** @type {[GameObject]} */
    static instances = [];
    /** @type {HTMLElement} */
    static parentElem = null;
    name = '';

    pos = Vector2.zero();
    rot = 0;
    scale = Vector2.one();

    images = [];
    size = Vector2.one();
    anchor = Vector2.zero();
    elem = null;

    /** @type {GameObject} */
    parent = null;
    /** @type {[GameObject]} */
    children = [];

    tags = [];
    /** @type {GameObjectType} */
    type = GameObjectType.None;

    /**
     * @param {string} name
     * @param {Vector2} pos
     * @param {number} rot
     * @param {Vector2} scale
     * @param {[string]} images
     * @param {Vector2} size
     * @param {Vector2} anchor
     * @param {HTMLElement} elem
     * @param {GameObject} parent
     * @param {[string]} tags
     * @param {GameObjectType} type
     */
    constructor({ name, pos, rot, scale, images, size, anchor, elem, parent, tags, type }) {
        GameObject.instances.push(this);
        this.name = name || type || tags?.join(',');
        if (!this.name) this.name = 'Game Object ' + (GameObject.instances.length);
        if (pos) this.pos = pos;
        if (rot) this.rot = rot;
        if (scale) this.scale = scale;
        if (images) this.images = images;
        if (size) this.size = size;
        if (anchor) this.anchor = anchor;
        if (elem) this.elem = elem;
        if (parent) this.parent = parent;
        if (tags) this.tags = tags;
        if (type) this.type = type;
        
        console.log(`constructor GameObject : ${this.constructor.name}`);

        this.createElement();
    }

    createElement(force = false) {
        if (this.elem && !force) return;
        if (this.elem) elem.remove();

        this.elem = document.createElement('img');
        GameObject.parentElem.appendChild(this.elem);
        if (this.images) this.elem.src = this.images[0];
        this.elem.id = `GO_${this.name}`;
        this.elem.classList.add('gameobject');
        if (this.type) this.elem.classList.add('go-type-' + this.type);
        this.tags.forEach(tag => this.elem.classList.add('go-tag-' + tag));

        this.setTransform();
    }

    setTransform() {
        let gp = GameObject.globalGridPixels;
        let pe = GameObject.parentElem;
        this.elem.style = `
width: ${this.size.x * gp}px;
height: ${this.size.y * gp}px;
left: ${this.pos.x * gp + pe.offsetLeft + pe.offsetWidth/2}px;
top:  ${this.pos.y * gp + pe.offsetTop  + pe.offsetHeight/2}px;
transform: rotate(${this.rot}rad) translate(-50%, -50%) scale(${this.scale.x}, ${this.scale.y});
        `;
    }

    draw() {

    }

    remove() {
        GameObject.instances = GameObject.instances.filter(v => v != this);
    }
}

class FillingParam {
    value = 0;
    defaultVal = 0;
    max = 1;
    maxAdd = 0;
    min = 0;
    mul = 1;
    step = 1;

    /** 
     * @param {number} value
     * @param {number} defaultVal
     * @param {number} max
     * @param {number} maxAdd
     * @param {number} min
     * @param {number} mul
     * @param {number} step
     */
    constructor(value, { defaultVal, max, maxAdd, min, mul, step }) {
        this.value = value;
        this.defaultVal = defaultVal || value;
        if (max) this.max = max;
        else this.max = value;
        if (maxAdd) this.maxAdd = maxAdd;
        if (min) this.min = min;
        if (mul) this.mul = mul;
        if (step) this.step = step;
    }

    getValue() {
        return this.value * this.mul;
    }
    
    static one() {
        return new FillingParam(1);
    }
}

/** @enum {string|boolean} */
const GameObjectType = {
    None: false,
    Player: 'Player',
    Enemy: 'Enemy',
    Ground: 'Ground',
    UI: 'UI',
}

class Enemy extends GameObject {
    
    /** @type {FillingParam} HP */
    hp;
    /** @type {FillingParam} Move speed */
    spd;
    /** @type {FillingParam} Attack */
    atk;
    /** @type {FillingParam} Attack hit rate */
    dex;
    /** @type {FillingParam} Attack speed */
    age;
    /** @type {FillingParam} Rate at reserved attack */
    def;
    /** @type {FillingParam} Hited rate */
    eva;
    
    constructor({ name, pos, rot, scale, images, size, anchor, elem, parent, tags }) {
        if (!tags) tags = [];
        tags.push('Enemy');
        
        super({ name: name, pos: pos, rot: rot, scale: scale, images: images, size: size, anchor: anchor, elem: elem, parent: parent, tags: tags });
        
        this.type = GameObjectType.Enemy;
        
        this.setParameters({force: true});
        
        // console.log(`constructor Enemy : ${this.constructor.name}`);
    }
    
    /**
     * @param {number} hp
     * @param {number} spd
     * @param {number} atk
     * @param {number} dex
     * @param {number} age
     * @param {number} def
     * @param {number} eva
    */
    setParameters({hp, spd, atk, dex, age, def, eva, force=false}) {
        if (hp) this.hp = new FillingParam(hp);
        else if(force) this.hp = FillingParam.one();
        if (spd) this.spd = new FillingParam(spd);
        else if(force) this.spd = FillingParam.one();
        if (atk) this.atk = new FillingParam(atk);
        else if(force) this.atk = FillingParam.one();
        if (dex) this.dex = new FillingParam(dex);
        else if(force) this.dex = FillingParam.one();
        if (age) this.age = new FillingParam(age);
        else if(force) this.age = FillingParam.one();
        if (def) this.def = new FillingParam(def);
        else if(force) this.def = FillingParam.one();
        if (eva) this.eva = new FillingParam(eva);
        else if(force) this.eva = FillingParam.one();
    }
}

class Player extends Enemy {
    constructor({ name, pos, rot, scale, images, size, anchor, elem, parent, tags }) {
        if (!tags) tags = [];
        tags.push('Player');

        super({ name: name, pos: pos, rot: rot, scale: scale, images: images, size: size, anchor: anchor, elem: elem, parent: parent, tags: tags });
        
        this.type = GameObjectType.Player;

        // console.log(`constructor Player : ${this.constructor.name}`);
    }
}