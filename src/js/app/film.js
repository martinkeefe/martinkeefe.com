import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import app /* Horrible hack!! */, {NormalPage} from '../app'

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

const CACHE = false

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
//async
function fetch_films(year) {
    return new Promise((resolve, reject) => {
        let films = CACHE ? sessionStorage.getItem('films') : null
        if (films) {
            resolve(JSON.parse(films))
        }
        else {
            const docClient = new AWS.DynamoDB.DocumentClient()
            docClient.scan({TableName:'films'}, (err,data) => {
                if (err) {
                    console.log(err);
                    reject(err)
                }
                else {
                    if (CACHE) {
                        sessionStorage.setItem('films', JSON.stringify(data.Items))
                    }
                    resolve(select(data.Items,year))
                }
            });
        }
    })
}

function select(films, year) {
    films = films.filter(film => film.date.startsWith(year))
    films.sort((a,b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    })
    return films
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
    componentWillMount() {
        this.props.fetch(this.props.year)
    }

    //compponentDidUpdate() {
    //    console.log('FilmPicks','compponentDidUpdate')
    //    app.page.update()
    //}

    render() {
        const {data, loading, error} = this.props.films

        if (loading) {
            return <div className="container"><h3>Loading...</h3></div>
        }
        else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        const picks = data.map(film => {
            const date = film.date.split('-');
            const poster = film.poster ? <img src={film.poster} width="96" height="142"/> : null;
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

            return (
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

const FilmPickPage = props => {
    return (
        <NormalPage title={"Martin's Film Picks - "+props.match.params.year} date="2018-03-03" ident="film-pick">
            <h1>{props.match.params.year} Film Picks</h1>
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
            <Films key={props.match.params.year} year={props.match.params.year}/>
        </NormalPage>
    )
}

//------------------------------------------------------------------------------
// Actions

const FETCH = 'FILMS_FETCH'
const FETCH_SUCCESS = 'FILMS_FETCH_SUCCESS'
const FETCH_FAILURE = 'FILMS_FETCH_FAILURE'
const RESET = 'FILMS_RESET'

function fetch(year) {
    return {
        type: FETCH,
        payload: fetch_films(year)
    };
}

function fetchSuccess(films) {
    return {
        type: FETCH_SUCCESS,
        payload: films
    };
}

function fetchFailure(error) {
    return {
        type: FETCH_FAILURE,
        payload: error
    };
}


//------------------------------------------------------------------------------
// Container

const mapStateToProps = state => {
    return {
        films: state.films.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch: year => {
            dispatch(fetch(year)).payload
                .then(data => {
                    dispatch(fetchSuccess(data))
                    app.update_sticky() // Horrible hack!!
                })
                .catch(err => dispatch(fetchFailure(err)))
        }
    }
}

const Films = connect(mapStateToProps, mapDispatchToProps)(FilmPicks)


//------------------------------------------------------------------------------
// Reducer

const INITIAL_STATE = {list: {data: [], error: null, loading: false}}

function reducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH:
            // start fetching data and set loading = true
            return {...state, list: {data: [], error: null, loading: true}}

        case FETCH_SUCCESS:
            // return data and make loading = false
            return {...state, list: {data: action.payload, error:null, loading: false}}

        case FETCH_FAILURE:
            // return error and make loading = false
            //let error = action.payload || {message: action.payload.message}; //2nd one is network or server down errors
            return {...state, list: {data: [], error: action.payload, loading: false}}

        case RESET:
            // reset data to initial state
            return {...state, list: {data: [], error: null, loading: false}}

        default:
            return state;
    }
}


//------------------------------------------------------------------------------

export default function(app) {
    app.add_route('/film-pick/:year', FilmPickPage)

    app.add_nav({ident:'film-pick', text:'Film Picks', href:"/film-pick/2018", sub:[
        {href:"/film-pick/2016", text:"2016", ident:'2016'},
        {href:"/film-pick/2017", text:"2017", ident:'2017'},
        {href:"/film-pick/2018", text:"2018", ident:'2018'},
    ]})

    app.redirect('/film-2016', '/film-pick/2016')
    app.redirect('/film-2017', '/film-pick/2017')
    app.redirect('/film-2018', '/film-pick/2018')

    app.add_reducer('films', reducer)
}
