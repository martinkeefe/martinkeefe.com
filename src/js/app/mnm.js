import {$i,$one,strerp,get_csv} from './lib'

var mnm_num;
var items;
var index;
var audio = $one('<audio controls></audio>')

function play() {
	console.log(' play', index);
	if (index < items.length) {
		var src = strerp('http://s3-eu-west-1.amazonaws.com/raiment57/mnm{{mnm_num}}/{{trk_num}}.mp3', items[index]);
		items[index].item.classList.add('active');
    	items[index].item.appendChild(audio);
    	audio.setAttribute('src', src);
    	audio.play();
    }
}

function stop() {
	console.log(' stop', index);
	if (index < items.length) {
		items[index].item.classList.remove('active');
		items[index].item.removeChild(audio);
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

	mnm_num = num = ('0' + num).substr(-2);
    get_csv('/data/mnm/mnm'+num+'.csv', ['art_name', 'trk_name', '', 'alb_name', '', 'alb_year'])
    	.then(recs => {
		    var playlist = $i('playlist');
		    var template =
		    		`<div class="item">
						<img src="http://s3-eu-west-1.amazonaws.com/raiment57/mnm{{mnm_num}}/{{trk_num}}.jpg">
						<div class="data">
							<p><big>{{trk_num}}</big></p>
							<p><b>{{art_name}}</b></p>
							<p>&ldquo;{{trk_name}}&rdquo;</p>
							<p><i>{{alb_name}}</i>, {{alb_year}}</p>
						</div>
					</div>`

			$i('title').textContent = recs[0].art_name
			$i('intro').innerHTML = recs[0].trk_name || ''

		    items = [];
		    playlist.innerHTML = ''
			recs.forEach(function(rec, i) {
				if (i > 0) {
					var info = {
						mnm_num: mnm_num,
						trk_num: ('0' + i).substr(-2),
						art_name: rec.art_name,
						trk_name: rec.trk_name,
						alb_name: rec.alb_name,
						alb_year: rec.alb_year,
					};
					info.item = $one(strerp(template, info))
					info.item.addEventListener('click', function() {
						go_to(i-1);
					});
					items.push(info);
					playlist.appendChild(info.item);
				}
			});

		    index = 0;
			play();
    	})
};
