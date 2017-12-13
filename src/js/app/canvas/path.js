import Base from './base'

export default class Path extends Base {
	constructor(context, args) {
		super(context,args);
		this.reset();
    }

    reset() {
        this.segs = [];
        this.add('beginPath');
    }

    do_path() {
        this.context.translate(this.x, this.y);
        this.segs.forEach(function(seg) {
           	this.context[seg.type].apply(this.context, seg.args);
        }, this);
    }

    draw() {
        this.apply_style();
        this.do_path();
        if (this.style.fill) this.context.fill(this.style.fillRule);
        if (this.style.stroke) this.context.stroke();
    }

    test(pt) {
        this.do_path();
        return this.context.isPointInPath(pt.x, pt.y);
    }

    add(type) {
    	var args = Array.prototype.slice.call(arguments, 1);
        this.segs.push({type:type, args:args});
        return this;
    }

    moveTo(x, y) {
    	return this.add('moveTo', x, y);
    }

    lineTo(x, y) {
    	return this.add('lineTo', x, y);
    }

    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    	return this.add('bezierCurveTo', cp1x, cp1y, cp2x, cp2y, x, y);
    }

    quadraticCurveTo(cpx, cpy, x, y) {
    	return this.add('quadraticCurveTo', cpx, cpy, x, y);
    }

    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    	return this.add('arc', x, y, radius, startAngle, endAngle, anticlockwise);
    }

    arcTo(x1, y1, x2, y2, radius) {
    	return this.add('arcTo', x1, y1, x2, y2, radius);
    }

    rect(x, y, width, height) {
    	return this.add('rect', x, y, width, height);
    }

    close() {
    	return this.add('closePath');
    }
}
