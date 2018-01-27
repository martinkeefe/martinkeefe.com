import html from 'choo/html'
import raw from 'choo/html/raw'
import {default_page,make_nav} from './lib'
import FILMS from '../../data/films'

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const IMG = {
    imdb: require('../../img/icons8-imdb-48.png'),
    youtube: require('../../img/icons8-play-button-48.png'),
    tomato: require('../../img/icons8-tomato-48.png'),
    netflix: require('../../img/icons8-netflix-48.png'),
    zooqle: require('../../img/zq-logo.png'),
    //paradiso: require('../../img/paradiso.png'),
    fr: require('../../img/icons8-france-48.png'),
    de: require('../../img/icons8-germany-48.png'),
    it: require('../../img/icons8-italy-48.png'),
    jp: require('../../img/icons8-japan-48.png'),
};
const COLOR = {
    love: "#0FB",
    like: "#0A0",
    ok: "#BB0",
    dislike: "#F80",
    hate: "#D00",
}

function rate(seen) {
    return html`
        <svg width="14" height="19">
            <rect width="14" height="14" style="fill:${COLOR[seen]}" />
        </svg>`
}

function make_film_picks(year)
{
    const tbl = html`<table class="films"></table>`;

    FILMS.forEach(film => {
        const date = film.date.split('-');

        if (date.length == 3 && date[0] === year) {
            const poster = film.poster ? html`<img src="${film.poster}" width="96">` : '';

            const links = [];
            //if (film.link) {
            //  links.push(`<a href="${film.link}"><i class="fab fa-wikipedia-w"></i></a>`);
            //}
            if (film.imdb) {
                //links.push(`<a href="http://www.imdb.com/title/${film.imdb}/"><i class="fab fa-imdb"></i></a>`);
                links.push(`<a href="http://www.imdb.com/title/${film.imdb}/"><img src="${IMG.imdb}" height="16"></a>`);
            }
            if (film.youtube) {
                //links.push(`<a href="${film.trailer}"><i class="fab fa-youtube"></i></a>`);
                links.push(`<a href="https://www.youtube.com/watch?v=${film.youtube}"><img src="${IMG.youtube}" height="16"></a>`);
            }
            if (film.tomato) {
                //const rt = film.tomato.split('|');
                links.push(`<a href="https://www.rottentomatoes.com/m/${film.tomato}"><img src="${IMG.tomato}" height="16"></a>`);
            }
            if (film.zooqle) {
                links.push(`<a href="https://zooqle.com/movie/${film.zooqle}.html"><img src="${IMG.zooqle}" height="18"></a>`);
            }
            if (film.netflix) {
                links.push(`<a href="http://unogs.com/video/?v=${film.netflix}"><img src="${IMG.netflix}" width="46"></a>`);
            }
            //if (film.paradiso) {
            //    links.push(`<a href="https://www.cinemaparadiso.co.uk/rentals/${film.paradiso}.html"><img src="${IMG.paradiso}" width="46"></a>`);
            //}

            let title = html`<a href="${film.link}"><i>${film.title}</i></a>`;

            if (film.lang) {
                if (film.lang === 'jp') {
                    title = html`<td>${title} <img style="vertical-align: baseline;padding-left:5px" src="${IMG.jp}" height="13"> ${film[film.lang+'_title'] || ''}</td>`;
                }
                else {
                    title = html`<td>${title} <img style="vertical-align: baseline;padding-left:5px" src="${IMG[film.lang]}" height="13"> <i>${film[film.lang+'_title'] || ''}</i></td>`;
                }
            }
            else {
                title = html`<td>${title}</td>`;
            }

            const seen = film.seen ? rate(film.seen) : '';
            const note = film.note ? html`<p class="small"><i>${film.note}</i></p>` : '';

            tbl.appendChild(html`
                <tr>
                    <td nowrap>${MONTH[Number(date[1])-1]} ${Number(date[2])}</td>
                    <td rowspan="2">${poster}</td>
                    ${title}
                    <td nowrap style="text-align: right">${film.series} ${seen}</td>
                </tr>`);
            tbl.appendChild(html`
                <tr style="height: 100%">
                    <td class="links">${raw(links.join(' '))}</td>
                    <td colspan="2"><p class="small">${raw(film.text || '')}</p>${note}</td>
                </tr>`);
        }
    });

    return default_page(
        make_nav('/film-'+year, [
            ['/mnm-09',      "Monday Night Martin"],
            ['/maths-links', "Maths"],
            ['/pub-watch',   "Pub Watch"],
            ['', "Film Picks", make_nav('/film-'+year, [
                    ['/film-2016', "2016"],
                    ['/film-2017', "2017"],
                    ['/film-2018', "2018"],
                ])
            ],
        ]),
        [   html`<h1>${year} Film Picks</h1>`,
            html`<p>This is my selection of films I might want to watch. It is <i>not</i> any sort of value judgment or recommendation. Here is a key to
                    the links in the left-hand column:</p>`,
            html`<dl class="films">
                    <dt><img src="${IMG.imdb}" height="16"></dt>
                    <dd>Goes to film's page at IMDB.</dd>
                    <dt><img src="${IMG.youtube}" height="16"></dt>
                    <dd>Goes to a trailer on YouTube.</dd>
                    <dt><img src="${IMG.tomato}" height="16"></dt>
                    <dd>Goes to film’s page at Rotten Tomatoes.</dd>
                    <dt><img src="${IMG.netflix}" width="46"></dt>
                    <dd>Goes to a site that tell’s you in which counties the film is available on Netflix.</dd>
                    <dt><img src="${IMG.zooqle}" height="18"></dt>
                    <dd>Goes to a site listing bitTorrents of the film. Caution: You should know what you're doing if you use this. <i>Never</i> use the direct download links!</dd>
                </dl>`,
            html`<p>Once I've seen a film I record my reaction like this: ${rate('love')}=love, ${rate('like')}=like, ${rate('ok')}=ok, ${rate('dislike')}=dislike, ${rate('hate')}=hate.
                 Sometimes I add a note about my reaction.</p>`,
            tbl
        ],
        '2018-01-23')
}
//                <dt><img src="${IMG.paradiso}" width="45"></dt>
//                <dd>Goes to a UK site that rents out DVDs and Blu-rays. Operates in same way as LoveFilm did before Amazon closed it.</dd>

export default function(app) {
    ['2016', '2017', '2018'].forEach(year => {
        app.route('/film-'+year, (state,emit) => {
            emit('DOMTitleChange', "Martin’s Film Pick - "+year)
            return make_film_picks(year)
        })
    })
}
