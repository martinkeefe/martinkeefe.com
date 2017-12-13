import Base from './base'

export default class Group extends Base {
	constructor(context, args) {
		super(context,args);
        this.glyphs = [];
    }

    draw() {
        var shapes = this.glyphs.slice();
        shapes.sort(function(a,b) {return a.z - b.z});

        this.context.translate(this.x, this.y);
        shapes.forEach(shape => {
	        this.context.save();
            shape.draw();
	        this.context.restore();
        });
    }

    test(pt) {
        var shapes = this.glyphs.slice();
        shapes.sort((a,b) => a.z - b.z);
        var found = null;

        this.context.translate(this.x, this.y);
        shapes.forEach(glyph => {
        	if ('test' in glyph) {
		        this.context.save();
	            if (glyph.test(pt)) {
                    found = glyph;
	            }
		        this.context.restore();
		    }
        });

        return found != null;
    }

    add(klass, ...args) {
        var glyph = new klass(this.context, args);
        this.glyphs.push(glyph);
        return glyph;
    }

	emit(...args) {
        var shapes = this.glyphs.slice();
        var done = false;

        shapes.sort((a,b) => a.z - b.z);

        shapes.forEach(shape => {
            done |= shape.emit.apply(shape, args);
        });

        return done;
	}

    get z() {
        var max = Math.max.apply(Math, this.glyphs.map(g => g.z || 0));
        return max === -Infinity ? 0 : max;
    }
}
