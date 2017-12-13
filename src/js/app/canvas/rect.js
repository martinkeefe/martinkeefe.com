import Path from './path'

export default class Rect extends Path {
	constructor(context, args) {
		super(context,args);
        this.w = this.get(args[2], 0);
        this.h = this.get(args[3], 0);
        this.mk_path();
    }

    mk_path() {
    	this.reset();
    	this.rect(0,0,this.w, this.h);
    }

	get w() {return this._w || 0}
	set w(v) {this._w = v; this.mk_path()}

	get h() {return this._h || 0}
	set h(v) {this._h = v; this.mk_path()}
}
