import React, {Fragment, Component} from 'react'
import {NormalPage} from '../app'

//------------------------------------------------------------------------------
import AWS from 'aws-sdk'

AWS.config.update({
    region: "eu-west-2",
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-2:ea25abac-af76-46c7-9ea7-ad61b0a778ac',
    })
})

//const admin = "4u('tLedsL"
//const guest = "6t5L)pf(uM"

const CACHE = true

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
async function fetch_films() {
    return new Promise(resolve => {
        let films = CACHE ? sessionStorage.getItem('films') : null
        if (films) {
            resolve(JSON.parse(films))
        }
        else {
            const docClient = new AWS.DynamoDB.DocumentClient()
            docClient.scan({TableName:'films'}, (err,data) => {
                if (err) {
                    console.log(err);
                    resolve([])
                }
                else {
                    if (CACHE) {
                        sessionStorage.setItem('films', JSON.stringify(data.Items))
                    }
                    resolve(data.Items)
                }
            });
        }
    })
}

//------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------

class FilmPicks extends Component {
    constructor(props) {
        super(props)
        this.state = {films:[]}
    }

    setStateAsync(state) {
        return new Promise(resolve => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        let films = await fetch_films()
        films = films.filter(film => film.date.startsWith(this.props.year))
        films.sort((a,b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        })
        await this.setStateAsync({films})
    }

    render() {
        const picks = [];

        this.state.films.forEach(film => {
            const date = film.date.split('-');
            const poster = film.poster ? <img src={film.poster} width="96"/> : null;
            const links = [];

            links.push(<a key="imdb" href={'http://www.imdb.com/title/'+film.id}><img src={IMG.imdb} height="16"/></a>);
            links.push(SP("imdb_"))

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

            const seen = film.seen ? rate(film.seen) : null;
            let title = <Fragment>
                    <div style={{float:'right'}}>{film.series} {seen}</div>
                    <a href={film.link}><i>{film.title}</i></a>
                </Fragment>


            if (film.lang) {
                if (film.lang === 'jp') {
                    title = <Fragment>{title} <img style={{verticalAlign: 'baseline', paddingLeft: '5px'}} src={IMG.jp} height="13"/> {film[film.lang+'_title'] || ''}</Fragment>;
                }
                else {
                    title = <Fragment>{title} <img style={{verticalAlign: 'baseline', paddingLeft: '5px'}} src={IMG[film.lang]} height="13"/> <i>{film[film.lang+'_title'] || ''}</i></Fragment>;
                }
            }

            const note = film.note ? <p className="small" dangerouslySetInnerHTML={{__html: `<i>${film.note}</i>`}}></p> : null;

            picks.push(
                <tr key={film.id}>
                    <td style={{width:'70px'}}>{MONTH[Number(date[1])-1]}&nbsp;{Number(date[2])}<br/>{links}</td>
                    <td>{poster}</td>
                    <td>{title}<p className="small" dangerouslySetInnerHTML={{__html: film.text || ''}}></p>{note}</td>
                </tr>);
        });

        return (
            <table className="films">
                <tbody>
                    {picks}
                </tbody>
            </table>
        )
    }
}


//------------------------------------------------------------------------------

class FilmPickPage extends NormalPage {
    constructor(app, context) {
        super(app, context, "Martin's Film Picks - "+context.params.year, '2018-03-03', 'film-pick')
    }

    main() {
        return (
            <Fragment>
                <h1>{this.context.params.year} Film Picks</h1>
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
                <FilmPicks key={this.context.params.year} year={this.context.params.year}/>
            </Fragment>
        )
    }
}

//------------------------------------------------------------------------------

export default function(app) {
    app.menu.push({key:'film-pick', text:'Film Picks', href:"/film-pick/2018", sub:[
        {href:"/film-pick/2016", text:"2016", key:'2016'},
        {href:"/film-pick/2017", text:"2017", key:'2017'},
        {href:"/film-pick/2018", text:"2018", key:'2018'},
    ]})
    app.add_page('/film-pick/:year', FilmPickPage)
    app.redirect('/film-2016', '/film-pick/2016')
    app.redirect('/film-2017', '/film-pick/2017')
    app.redirect('/film-2018', '/film-pick/2018')
}
