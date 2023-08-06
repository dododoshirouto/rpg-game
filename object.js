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
    constructor({name, pos, rot, scale, images, size, anchor, elem, parent, tags, type}) {
        GameObject.instances.push(this);
        this.name = name|| type|| tags?.join(',')|| this.name;
        if (!this.name) this.name = 'Game Object '+(GameObject.instances.length);
        if (pos)    this.pos = pos;
        if (rot)    this.rot = rot;
        if (scale)  this.scale = scale;
        if (images) this.images = images;
        if (size)   this.size = size;
        if (anchor) this.anchor = anchor;
        if (elem)   this.elem = elem;
        if (parent) this.parent = parent;
        if (tags)   this.tags = tags;
        if (type)   this.type = type;
        
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
        if (this.type) this.elem.classList.add('go-type-'+this.type);
        this.tags.forEach(tag => this.elem.classList.add('go-tag-'+tag));
        
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
        GameObject.instances = GameObject.instances.filter(v=>v!=this);
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