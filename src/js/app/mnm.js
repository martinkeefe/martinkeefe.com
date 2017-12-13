import {$i,$one} from './lib'

let items;
let index;
const audio = $one('<audio controls></audio>')

function play() {
	console.log(' play', index);
	if (index < items.length) {
		items[index].classList.add('active');
    	items[index].appendChild(audio);
    	audio.setAttribute('src', items[index].src);
    	audio.play();
    }
}

function stop() {
	console.log(' stop', index);
	if (index < items.length) {
		items[index].classList.remove('active');
		items[index].removeChild(audio);
	}
}

function next(e) {
	console.log('next');
	stop();
	index++;
	play();
}

function go_to(idx) {
	if (idx !== index) {
    	stop();
	   	index = idx;
	   	play();
	}
}

export default function(num) {
	audio.addEventListener("ended", next);

	const mnm_num = ('0' + num).substr(-2);
    const recs = require('../../data/mnm/mnm'+mnm_num+'.csv')
    const playlist = $i('playlist');

	$i('title').textContent = recs[0].art_name
	$i('intro').innerHTML = recs[0].trk_name || ''

    items = [];
    playlist.innerHTML = ''
	recs.slice(1).forEach((rec, i) => {
		const trk_num = ('0' + (i+1)).substr(-2);
	    const s3_src = `http://s3-eu-west-1.amazonaws.com/raiment57/mnm${mnm_num}/${trk_num}`
		const item = $one(
			`<div class="item">
				<img src="${s3_src}.jpg">
				<div class="data">
					<p><big>${trk_num}</big></p>
					<p><b>${rec.art_name}</b></p>
					<p>&ldquo;${rec.trk_name}&rdquo;</p>
					<p><i>${rec.alb_name}</i>, ${rec.alb_year}</p>
				</div>
			</div>`)
		item.src = s3_src + '.mp3';
		item.addEventListener('click', () => go_to(i));
		items.push(item);
		playlist.appendChild(item);
	});

    index = 0;
	play();
}
