import React, {Fragment} from 'react'
import {NormalPage, make_nav} from '../app'

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
    return (
        <svg width="14" height="19">
            <rect width="14" height="14" style={{fill:COLOR[seen]}}/>
        </svg>
    )
}

function SP(key) {
    return <Fragment key={key}> </Fragment>
}

function make_film_picks(year)
{
    const tbl = [];

    FILMS.forEach(film => {
        const date = film.date.split('-');

        if (date.length == 3 && date[0] === year) {
            const poster = film.poster ? <img src={film.poster} width="96"/> : null;

            const links = [];
            if (film.imdb) {
                links.push(<a key="imdb" href={'http://www.imdb.com/title/'+film.imdb}><img src={IMG.imdb} height="16"/></a>);
                links.push(SP("imdb_"))
            }
            if (film.youtube) {
                links.push(<a key="youtube" href={'https://www.youtube.com/watch?v='+film.youtube}><img src={IMG.youtube} height="16"/></a>);
                links.push(SP("youtube_"))
            }
            if (film.tomato) {
                links.push(<a key="tomato" href={'https://www.rottentomatoes.com/m/'+film.tomato}><img src={IMG.tomato} height="16"/></a>);
                links.push(SP("tomato_"))
            }
            if (film.zooqle) {
                links.push(<a key="zooqle" href={'https://zooqle.com/movie/'+film.zooqle+'.html'}><img src={IMG.zooqle} height="18"/></a>);
                links.push(SP("zooqle_"))
            }
            if (film.netflix) {
                links.push(<a key="netflix" href={'http://unogs.com/video/?v='+film.netflix}><img src={IMG.netflix} width="46"/></a>);
                links.push(SP("netflix_"))
            }
            //if (film.paradiso) {
            //    links.push(`<a href="https://www.cinemaparadiso.co.uk/rentals/${film.paradiso}.html"><img src="${IMG.paradiso}" width="46"></a>`);
            //}

            let title = <a href={film.link}><i>{film.title}</i></a>;

            if (film.lang) {
                if (film.lang === 'jp') {
                    title = <td>{title} <img style={{verticalAlign: 'baseline', paddingLeft: '5px'}} src={IMG.jp} height="13"/> {film[film.lang+'_title'] || ''}</td>;
                }
                else {
                    title = <td>{title} <img style={{verticalAlign: 'baseline', paddingLeft: '5px'}} src={IMG[film.lang]} height="13"/> <i>{film[film.lang+'_title'] || ''}</i></td>;
                }
            }
            else {
                title = <td>{title}</td>;
            }

            const seen = film.seen ? rate(film.seen) : null;
            const note = film.note ? <p className="small" dangerouslySetInnerHTML={{__html: `<i>${film.note}</i>`}}></p> : null;

            tbl.push(
                <tr key={film.title+' #1'}>
                    <td nowrap="true">{MONTH[Number(date[1])-1]} {Number(date[2])}</td>
                    <td rowSpan="2">{poster}</td>
                    {title}
                    <td nowrap="true" style={{textAlign: 'right'}}>{film.series} {seen}</td>
                </tr>);
            tbl.push(
                <tr key={film.title+' #2'} style={{height: '100%'}}>
                    <td className="links">{links}</td>
                    <td colSpan="2"><p className="small" dangerouslySetInnerHTML={{__html: film.text || ''}}></p>{note}</td>
                </tr>);
        }
    });

    return tbl
}
//                <dt><img src="${IMG.paradiso}" width="45"></dt>
//                <dd>Goes to a UK site that rents out DVDs and Blu-rays. Operates in same way as LoveFilm did before Amazon closed it.</dd>


class FilmPickPage extends NormalPage {
    constructor(app,year) {
        const sub = make_nav([
            {href:"/film-2016", text:"2016", key:'2016'},
            {href:"/film-2017", text:"2017", key:'2017'},
            {href:"/film-2018", text:"2018", key:'2018'},
        ])
        super(app, '/film-'+year, "Martin's Film Picks - "+year, '2018-03-03', 'film-pick', sub, {year})
    }

    main() {
        return (
            <Fragment>
                <h1>{this.props.year} Film Picks</h1>
                <p>This is my selection of films I might want to watch. It is <i>not</i> any sort of value judgment or recommendation. Here is a key to
                        the links in the left-hand column:</p>
                <dl className="films">
                    <dt><img src={IMG.imdb} height="16"/></dt>
                    <dd>Goes to film's page at IMDB.</dd>
                    <dt><img src={IMG.youtube} height="16"/></dt>
                    <dd>Goes to a trailer on YouTube.</dd>
                    <dt><img src={IMG.tomato} height="16"/></dt>
                    <dd>Goes to film’s page at Rotten Tomatoes.</dd>
                    <dt><img src={IMG.netflix} width="46"/></dt>
                    <dd>Goes to a site that tell’s you in which counties the film is available on Netflix.</dd>
                    <dt><img src={IMG.zooqle} height="18"/></dt>
                    <dd>Goes to a site listing bitTorrents of the film. Caution: You should know what you're doing if you use this. <i>Never</i> use the direct download links!</dd>
                </dl>
                <p>Once I've seen a film I record my reaction like this: {rate('love')}=love, {rate('like')}=like, {rate('ok')}=ok, {rate('dislike')}=dislike, {rate('hate')}=hate.
                     Sometimes I add a note about my reaction.</p>
                <table className="films">
                    <tbody>
                        {make_film_picks(this.props.year)}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}


export default function(app) {
    new FilmPickPage(app,'2016')
    new FilmPickPage(app,'2017')
    new FilmPickPage(app,'2018')
}
