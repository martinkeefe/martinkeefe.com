import Base from './base'

export default class Text extends Base {
	constructor(context, args) {
		super(context,args);
        this.txt = this.get(args[2], '');
        this.style = this.get(args[3], {});
        //this.measure();
    }

	measure() {
		this.context.save();
		this.context.font = '16px Arial';
		var metrics = this.context.measureText(this.txt);
        this.context.restore();
        this.width = metrics.width;
	}

    draw() {
		this.context.font = '16px Arial';
		this.context.textBaseline = 'alphabetic';
		this.context.textAlign = 'left';
    	this.apply_style();
		if (this.style.fill) this.context.fillText(this.txt, this.x, this.y);
        if (this.style.stroke) this.context.strokeText(this.txt, this.x, this.y);
    }
}
