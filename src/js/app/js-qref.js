import {$i,$,$one,get_csv} from './lib'

let ttl;

function render(data) {
    var el = $i('body');
    var dl = $one('<dl></dl>');

    el.appendChild($one('<h2>' + ttl + '</h2>'));
    el.appendChild(dl);

    data.forEach(function(d) {
        dl.appendChild($one(
            `<dt class="syntax">
                <span class="es${d.es}">${d.es}</span>
                <a href="${d.href}" target="MDN ">${d.syntax}</a>
            </dt>`));
        dl.appendChild($one(`<dd>${d.txt}</dd>`));
    });
}

export default function(name) {
    ttl = name;
    get_csv('/data/js-qref/' + name + '.csv').then(render);
}
