import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import app /* Horrible hack!! */, {NormalPage} from 'app'

//------------------------------------------------------------------------------
//import AWS from 'aws-sdk'
//
//AWS.config.update({
//    region: "eu-west-2",
//    credentials: new AWS.CognitoIdentityCredentials({
//        IdentityPoolId: 'eu-west-2:ea25abac-af76-46c7-9ea7-ad61b0a778ac',
//    })
//})
//
////const admin = "4u('tLedsL"
////const guest = "6t5L)pf(uM"
//
//const CACHE = false
//
//// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
//async function fetch_films(year) {
//    return new Promise((resolve, reject) => {
//        let films = CACHE ? sessionStorage.getItem('films') : null
//        if (films) {
//            resolve(JSON.parse(films))
//        }
//        else {
//            const docClient = new AWS.DynamoDB.DocumentClient()
//            docClient.scan({TableName:'films'}, (err,data) => {
//                if (err) {
//                    console.log(err);
//                    reject(err)
//                }
//                else {
//                    if (CACHE) {
//                        sessionStorage.setItem('films', JSON.stringify(data.Items))
//                    }
//                    resolve(select(data.Items,year))
//                }
//            });
//        }
//    })
//}
//
//function select(films, year) {
//    films = films.filter(film => film.date.startsWith(year) && !film.hide)
//    films.sort((a,b) => {
//        if (a.date < b.date) return -1;
//        if (a.date > b.date) return 1;
//        return 0;
//    })
//    return films
//}


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

//------------------------------------------------------------------------------

function Rate({seen}) {
    if (seen) {
        return (
            <svg width="14" height="19">
                <rect width="14" height="14" style={{fill:COLOR[seen]}}/>
            </svg>
        )
    }

    return null
}

function ImgLink({kind,href,...props}) {
    return <a target="_blank" href={href}><img src={IMG[kind]} style={{paddingRight: '4px'}} {...props}/></a>
}

class FilmPicks extends Component {
    componentWillMount() {
        this.props.fetch(this.props.year)
    }

    render() {
        const {data, loading, error} = this.props.films

        if (loading) {
            return <div className="container"><h3>Loading...</h3></div>
        }
        else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        let updated = ''
        data.forEach(film => {
            if (film.created && film.created > updated) {
                updated = film.created
            }
            if (film.updated && film.updated > updated) {
                updated = film.updated
            }
        })

        const picks = data.filter(film => !film.hide).map(film => {
            const date = film.date.split('-');
            const poster = film.poster ? <img src={film.poster} width="96" height="142"/> : null;
            const links = [];

            links.push(<ImgLink key="imdb" kind="imdb" href={'http://www.imdb.com/title/'+film.id} height="16"/>);

            if (film.youtube) {
                links.push(<ImgLink key="youtube" kind="youtube" href={'https://www.youtube.com/watch?v='+film.youtube} height="16"/>);
            }
            if (film.tomato) {
                links.push(<ImgLink key="tomato" kind="tomato" href={'https://www.rottentomatoes.com/m/'+film.tomato} height="16"/>);
            }
            if (film.zooqle) {
                links.push(<ImgLink key="zooqle" kind="zooqle" href={'https://zooqle.com/movie/'+film.zooqle+'.html'} height="18"/>);
            }
            if (film.netflix) {
                links.push(<ImgLink key="netflix" kind="netflix" href={'http://unogs.com/video/?v='+film.netflix} width="46"/>);
            }
            //if (film.paradiso) {
            //    links.push(`<a href="https://www.cinemaparadiso.co.uk/rentals/${film.paradiso}.html"><img src="${IMG.paradiso}" width="46"></a>`);
            //}

            let title = <Fragment>
                    <div style={{float:'right'}}>{film.series} <Rate seen={film.seen}/></div>
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
                    <td style={{width:'74px'}}>{MONTH[Number(date[1])-1]}&nbsp;{Number(date[2])}<br/>{links}</td>
                    <td>{poster}</td>
                    <td>{title}<p className="small" dangerouslySetInnerHTML={{__html: film.text || ''}}></p>{note}</td>
                </tr>);
        });

        return (
            <Fragment>

                <p>{updated ? `Last data update: ${updated.substr(0,10)}` : null}</p>
                <table className="films">
                    <tbody>
                        {picks}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}


//------------------------------------------------------------------------------

class FilmPickPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            help: false,
        }
    }

    render() {
        const year = this.props.match.params.year

        const style = {
            help: {
                btn: {
                    float:'right',
                    color: 'rgb(54,50,65)',
                    background: 'rgb(173,167,228)',
                    padding: '2px 6px',
                    fontSize: '13px',
                    fontFamily: 'Lato, sans-serif',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    borderRadius: '9px',
                },
                text: {
                    padding: '2px 6px',
                    background: 'rgb(64,60,75)',
                    borderRadius: '9px',
                }
            }
        }

        return (
            <NormalPage title={"Martin's Film Picks - "+year} date="2018-05-19" ident="film-pick">
                <h1>{year} Film Picks</h1>
                <p>This is my selection of films I might want to watch. It is <i>not</i> any sort of value judgment or recommendation. </p>
                <span style={style.help.btn} onClick={e => this.setState({help: !this.state.help})}>{this.state.help ? 'Hide' : 'Show'} Help</span>

                {this.state.help
                    ? <div style={style.help.text} className="help">
                    <p>Here is a key to the links in the left-hand column:</p>
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
                    <p>Once I've seen a film I record my reaction like this: <Rate seen="love"/>=love, <Rate seen="like"/>=like, <Rate seen="ok"/>=ok, <Rate seen="dislike"/>=dislike, <Rate seen="hate"/>=hate.
                         Sometimes I add a note about my reaction.</p>
                    </div>
                    : null}

                <Films key={year} year={year}/>
            </NormalPage>
        )
    }
}

//------------------------------------------------------------------------------
// Actions

function get(path) {
    return fetch('https://uamrc1iiak.execute-api.eu-west-2.amazonaws.com/dev/'+path)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Network response was not ok.')
        })
}

function films_fetch(year) {
    console.log(`films_fetch(${year})`)
    return {
        type: 'FILMS_FETCH',
        payload: new Promise((resolve, reject) => {
            get('films/'+year)
                .then(response => resolve(response.Items))
                .catch(e => reject(e))
        })}
}

function films_fetchSuccess(films) {
    console.log(`films_fetchSuccess(${films.length})`)
    return {type: 'FILMS_FETCH_SUCCESS', films}
}

function films_fetchFailure(error) {
    console.log(`films_fetchFailure(${error})`)
    return {type: 'FILMS_FETCH_FAILURE', error}
}


//------------------------------------------------------------------------------
// Container

const state2props = state => {
    return {
        films: state.films.list
    }
}

const dispatch2props = dispatch => {
    return {
        fetch: year => {
            //console.log('films',`dispatch(fetch(${year}))`)
            dispatch(films_fetch(year)).payload
                .then(data => {
                    dispatch(films_fetchSuccess(data))
                    app.update_sticky() // Horrible hack!!
                })
                .catch(err => dispatch(films_fetchFailure(err)))
        }
    }
}

const Films = connect(state2props, dispatch2props)(FilmPicks)


//------------------------------------------------------------------------------
// Reducer

const INITIAL_STATE = {
    list: {data: [], error: null, loading: false}
}

function reducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case 'FILMS_FETCH':         return {...state, list: {data: [], error: null, loading: true}}
        case 'FILMS_FETCH_SUCCESS': return {...state, list: {data: action.films, error:null, loading: false}}
        case 'FILMS_FETCH_FAILURE': return {...state, list: {data: [], error: action.error, loading: false}}
        case 'FILMS_RESET':         return {...state, list: {data: [], error: null, loading: false}}
        default: return state;
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
