import {$one,$q} from './lib'

function syms(elem) {
    var text = elem.innerHTML;
    var html = '<table class="centre">';
    text.split('\n').forEach(function (line) {
        html += '<tr>';
        line.split(' ').forEach(function (code) {
            if (code === '_') {
                html += '<td></td><td></td>';
            } else if (code !== '') {
                html += '<td class="sym">\\('+code+'\\)</td><td class="code"><pre><code>'+code+'</code></pre></td>';
            }
        });
        html += '</tr>';
    });
    html += '</table>';
    elem.innerHTML = html;
}

export default function(num) {
    $q('div.syms').forEach(syms);
    $q('tex').forEach(function (elem) {
        var html = elem.innerHTML
        var parent = elem.parentNode
        var new_elem = $one('<pre class="code"><code class="tex">'+html+'</code></pre>')
        parent.replaceChild(new_elem, elem)
    });

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
