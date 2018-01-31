import {h, render, Component} from 'preact'
//import html from 'choo/html'
//import Nanocomponent from 'nanocomponent'
//import {default_page,make_nav} from './lib'
import {$q} from './lib'
//function $i(id) { return document.getElementById(id); }
//function $c(code) { return String.fromCharCode(code); }

var n = 1;
var canvas_x = 0;
var canvas_y = 0;
var canvas_w = 0;
var canvas_h = 0;
var context;
var margin = 4;
var x,y;
var p_x,p_y;
var a = 0;
var b = 0;
var angle = Math.PI / 180 * 8;
var color = 0;
var limit1 = Math.PI * 1.5;
var limit2 = Math.PI * 1.79;
var c = new Array(6);
var d = new Array(6);
var r,e,radius;
var fade;
var prv_x,prv_y,prv_x2,prv_y2;
var timeout;
var pause = false;
var fps = 10;

document.onkeypress = key_manager;

function anim()
{
    var a1 = Math.cos(a*2);
    var a2 = Math.cos(a*4);
    var a3 = Math.cos(a);
    var a4 = Math.sin(a);

    if (b > limit1 && b < limit2) {
        r+=radius*0.02*a1;
        prv_x=x;
        prv_y=y;
        x=prv_x2+r*a3;
        y=prv_y2+r*a4;
    } else {
        prv_x=x;
        prv_y=y;
        prv_x2=x;
        prv_y2=y;
        x=(radius*c[0])*Math.cos(a*d[1])+(radius*c[2])*Math.sin(a*d[3])+(radius*c[4])*Math.sin(a*d[5]);
        y=(radius*c[5])*Math.sin(a*d[4])+(radius*c[3])*Math.cos(a*d[2])+(radius*c[1])*Math.cos(a*d[0]);
    }

    var c3 = 16 * Math.cos(a*10);
    var c1 = Math.floor(56*Math.cos(a*angle*4)+c3);
    var c2 = Math.floor(56*Math.sin(a*angle*4)-c3);

    context.lineCap = 'round';
    context.strokeStyle = 'rgba('+(192+c1)+','+(192+c2)+','+(192-c1)+','+(0.01-0.005*-a1)+')';
    context.lineWidth = e*1.4+e*0.8*a3;
    draw_line(p_x,p_y,prv_x,prv_y,x,y);

    context.lineWidth = e+e*0.8*a3;
    draw_line(p_x,p_y,prv_x,prv_y,x,y);

    context.strokeStyle = 'rgba('+(192+c1)+','+(192+c2)+','+(192-c1)+','+(0.06-0.03*-a1)+')';
    context.lineWidth = e*0.6+e*0.35*a3;
    draw_line(p_x,p_y,prv_x,prv_y,x,y);

    context.strokeStyle = 'rgba(0,0,0,0.06)';
    context.lineWidth = e*0.4+e*0.225*a3;
    draw_line(p_x,p_y,prv_x,prv_y,x,y);

    context.strokeStyle = 'rgba('+(192+c1)+','+(192+c2)+','+(192-c1)+','+(0.1-0.075*-a1)+')';
    context.lineWidth = e*0.2+e*0.1*a3;
    draw_line(p_x,p_y,prv_x,prv_y,x,y);

    context.strokeStyle = 'rgba(255,255,255,0.4)';
    context.lineWidth = e*(0.1-0.05*-a2);
    draw_line(p_x,p_y,prv_x,prv_y,x,y);

    a += angle*Math.cos(b);
    b += angle*0.1;
    //if (b > limit1) {
    //    context.fillStyle='rgba(0.2,0.2,0.27,0.08)';
    //    context.fillRect(0,0,canvas_w,canvas_h);
    //}
    if (b < limit2) {
        timeout=setTimeout(anim,fps);
    }
    else {
        //reset();
        pause = true;
    }
}

function draw_line(x,y,x1,y1,x2,y2)
{
    context.beginPath();
    context.moveTo(x+x1,y+y1);
    context.lineTo(x+x2,y+y2);
    context.moveTo(x-x1,y+y1);
    context.lineTo(x-x2,y+y2);
    context.moveTo(x-x1,y-y1);
    context.lineTo(x-x2,y-y2);
    context.moveTo(x+x1,y-y1);
    context.lineTo(x+x2,y-y2);
    context.moveTo(x+y1,y+x1);
    context.lineTo(x+y2,y+x2);
    context.moveTo(x-y1,y+x1);
    context.lineTo(x-y2,y+x2);
    context.moveTo(x-y1,y-x1);
    context.lineTo(x-y2,y-x2);
    context.moveTo(x+y1,y-x1);
    context.lineTo(x+y2,y-x2);
    context.moveTo(x,y+x2);
    context.lineTo(x,y+x1);
    context.moveTo(x,y-x2);
    context.lineTo(x,y-x1);
    context.moveTo(x+x2,y);
    context.lineTo(x+x1,y);
    context.moveTo(x-x2,y);
    context.lineTo(x-x1,y);
    context.stroke();
    context.closePath();
}

function draw_dot(x,y)
{
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+0.001,y);
    context.stroke();
    context.closePath();
}

function key_manager(evt)
{
    reset();
}

function reset()
{
    context.fillStyle='rgb(54,50,65)';
    context.fillRect(0,0,canvas_w,canvas_h);

    clearTimeout(timeout);

    a = Math.random(0,1)*angle;
    b = Math.random(0,1)*angle;
    r = 0;
    fade = 32;

    for (var i=0; i<6; i++) {
        c[i] = Math.random(0,1) / 2;
        d[i] = Math.random(0,1) / 2;
    }
    radius = Math.round((canvas_w+canvas_h)/4.5);
    e = radius * 0.2; /* 0.15 */
    p_x = Math.round(canvas_w/2);
    p_y = Math.round(canvas_h/2);
    x = (radius*c[0])*Math.cos(a*d[1])+(radius*c[2])*Math.sin(a*d[3])+(radius*c[4])*Math.sin(a*d[5]);
    y = (radius*c[5])*Math.sin(a*d[4])+(radius*c[3])*Math.cos(a*d[2])+(radius*c[1])*Math.cos(a*d[0]);
    anim();
}



export default class ShadeBob extends Component {
    constructor (props) {
        super(props)
        this.screen = null
        this.canvas = null
    }

    render() {
        console.log('render')
        return (
            <div class="body" ref={ref => this.screen = ref}>
                <canvas onClick={reset} ref={ref => this.canvas = ref}></canvas>
                <p style="text-align: center;">Tap or hit any key for a new pattern.</p>
                <div class="update">Last update: 2018-01-30</div>
            </div>
        )
    }


//    this.canvas = html`<canvas onclick=${reset}></canvas>`
//    this.screen = html`
//        <div class="body" id="front">
//            ${this.canvas}
//            <p style="text-align: center;">Tap or hit any key for a new pattern.</p>
//        </div>`
//
//    return default_page(
//        [
//            make_nav('/', [
//                ['/mnm-09',      "Monday Night Martin"],
//                ['/maths-links', "Maths"],
//                ['/pub-watch',   "Pub Watch"],
//                ['/film-2018',   "Film Picks"],
//            ]),
//            html`<hr>`,
//            html`<p style="font-size: 14px; text-align: justify;">Techie Note: This site is a simple static single page app hosted on Amazon S3.
//                If you’re curious you can browse the source code on <a href="https://github.com/martinkeefe/martinkeefe.com-webpack">GitHub</a>.</p>`,
//        ],
//        this.screen,
//        '2018-01-23')
//  }

  //update() {
  //  return false
  //}

    componentDidMount() {
        console.log('did mount')
        //const screen = $q('.shadebob')[0]
        //const canvas = $q('.shadebob canvas')[0]
        if (this.screen && this.canvas) {
            canvas_w = this.screen.clientWidth; //get_screen_size()[0];
            canvas_h = canvas_w; //get_screen_size()[1];
            this.canvas.width = canvas_w
            this.canvas.height = canvas_h
            context = this.canvas.getContext('2d')
            reset()
        }
    }
}


//export default function(state, emit) {
//    const page = new FrontPage()
//    emit('DOMTitleChange', "Martin’s Stuff")
//    return page.render()
//}
