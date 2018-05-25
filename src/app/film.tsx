import * as React from 'react'
import { connect } from 'react-redux'
import app /* Horrible hack!! */, { NormalPage } from '../app'
import { FloatProperty, CursorProperty, TextTransformProperty } from 'csstype';

//------------------------------------------------------------------------------

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const IMG = {
    imdb: require('img/icons8-imdb-48.png'),
    youtube: require('img/icons8-play-button-48.png'),
    tomato: require('img/icons8-tomato-48.png'),
    netflix: require('img/icons8-netflix-48.png'),
    zooqle: require('img/zq-logo.png'),
    //paradiso: require('img/paradiso.png'),
    fr: require('img/icons8-france-48.png'),
    de: require('img/icons8-germany-48.png'),
    it: require('img/icons8-italy-48.png'),
    jp: require('img/icons8-japan-48.png'),
}
const COLOR = {
    love: '#0FB',
    like: '#0A0',
    ok: '#BB0',
    dislike: '#F80',
    hate: '#D00',
}

//------------------------------------------------------------------------------

interface RateProps {
    seen? : string,
}

function Rate(props: RateProps) {
    if (props.seen) {
        return (
            <svg width="14" height="19">
                <rect width="14" height="14" style={{ fill: COLOR[props.seen] }} />
            </svg>
        )
    }

    return null
}


function ImgLink({ kind, href, ...props }) {
    return <a target="_blank" href={href}><img src={IMG[kind]} style={{ paddingRight: '4px' }} {...props} /></a>
}

// ImgLink.propTypes = {
//     kind: PropTypes.string.isRequired,
//     href: PropTypes.string.isRequired,
// }

interface Film {
    id: string,
    created?: string,
    updated?: string,
    hide?: boolean,
    date: string,
    title: string,
    poster?: string,
    youtube?: string,
    tomato?: string,
    zooqle?: string,
    netflix?: string,
    seen?: string,
    series?: string,
    link: string,
    lang?: string,
    text?: string,
    note?: string,
}

interface FilmsState {
    data: Film[],
    loading: boolean,
    error: any
}
interface FilmPicksProps {
    year: string,
    fetch: (string) => void,
    films: FilmsState,
}

class FilmPicks extends React.Component<FilmPicksProps> {
    table: React.RefObject<HTMLTableElement> = React.createRef()

    constructor(props) {
        super(props)
        props.fetch(props.year)
    }

    render() {
        const { data, loading, error } = this.props.films

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
            const date = film.date.split('-')
            const poster = film.poster ? <img src={film.poster} width="96" height="142" /> : null
            const links = []

            links.push(<ImgLink key="imdb" kind="imdb" href={'http://www.imdb.com/title/' + film.id} height="16" />)

            if (film.youtube) {
                links.push(<ImgLink key="youtube" kind="youtube" href={'https://www.youtube.com/watch?v=' + film.youtube} height="16" />)
            }
            if (film.tomato) {
                links.push(<ImgLink key="tomato" kind="tomato" href={'https://www.rottentomatoes.com/m/' + film.tomato} height="16" />)
            }
            if (film.zooqle) {
                links.push(<ImgLink key="zooqle" kind="zooqle" href={'https://zooqle.com/movie/' + film.zooqle + '.html'} height="18" />)
            }
            if (film.netflix) {
                links.push(<ImgLink key="netflix" kind="netflix" href={'http://unogs.com/video/?v=' + film.netflix} width="46" />)
            }
            //if (film.paradiso) {
            //    links.push(`<a href="https://www.cinemaparadiso.co.uk/rentals/${film.paradiso}.html"><img src="${IMG.paradiso}" width="46"></a>`);
            //}

            let title = <React.Fragment>
                <div style={{ float: 'right' }}>{film.series} <Rate seen={film.seen} /></div>
                <a href={film.link}><i>{film.title}</i></a>
            </React.Fragment>


            if (film.lang) {
                if (film.lang === 'jp') {
                    title = <React.Fragment>{title} <img style={{ verticalAlign: 'baseline', paddingLeft: '5px' }} src={IMG.jp} height="13" /> {film[film.lang + '_title'] || ''}</React.Fragment>
                }
                else {
                    title = <React.Fragment>{title} <img style={{ verticalAlign: 'baseline', paddingLeft: '5px' }} src={IMG[film.lang]} height="13" /> <i>{film[film.lang + '_title'] || ''}</i></React.Fragment>
                }
            }

            const text = film.text ? <p className="small" dangerouslySetInnerHTML={{ __html: film.text || '' }}></p> : null
            const note = film.note ? <p className="small" dangerouslySetInnerHTML={{ __html: `<i>${film.note}</i>` }}></p> : null

            //console.log(this.table)
            /*return this.props.isBound('mobile')
                ? (<tr key={film.id}>
                    <td>{MONTH[Number(date[1])-1]}&nbsp;{Number(date[2])}<br/>{poster}<br/>{links}</td>
                    <td>{title}{text}{note}</td>
                </tr>)
                :*/
            return (
                <tr key={film.id}>
                    <td style={{ width: '74px' }}>{MONTH[Number(date[1]) - 1]}&nbsp;{Number(date[2])}<br />{links}</td>
                    <td>{poster}</td>
                    <td>{title}{text}{note}</td>
                </tr>)
        })

        return (
            <React.Fragment>
                <p>{updated ? `Last data update: ${updated.substr(0, 10)}` : null}</p>
                <table ref={this.table} className="films">
                    <tbody>
                        {picks}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}


//------------------------------------------------------------------------------

interface PageProps {
    match: {params: {year: string}},
}
interface PageState {
    help: boolean,
}

class FilmPickPage extends React.Component<PageProps,PageState> {
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
                    float: 'right' as FloatProperty,
                    color: 'rgb(54,50,65)',
                    background: 'rgb(173,167,228)',
                    padding: '2px 6px',
                    fontSize: '13px',
                    fontFamily: 'Lato, sans-serif',
                    cursor: 'pointer' as CursorProperty,
                    textTransform: 'uppercase' as TextTransformProperty,
                    borderRadius: '9px',
                    marginLeft: '6px',
                },
                text: {
                    padding: '2px 6px',
                    background: 'rgb(64,60,75)',
                    borderRadius: '9px',
                }
            }
        }

        return (
            <NormalPage title={'Martin’s Film Picks - ' + year} date='2018-05-19' ident='film-pick'>
                <h1>{year} Film Picks</h1>
                <p>This is my selection of films I might want to watch. It is <i>not</i> any sort of value judgment or recommendation. </p>
                <span style={style.help.btn} onClick={() => this.setState({ help: !this.state.help })}>{this.state.help ? 'Hide' : 'Show'} Help</span>

                {this.state.help
                    ? <div style={style.help.text} className="help">
                        <p>Here is a key to the links in the left-hand column:</p>
                        <dl className="films">
                            <dt><img src={IMG.imdb} height="16" /></dt>
                            <dd>Goes to film’s page at IMDB.</dd>
                            <dt><img src={IMG.youtube} height="16" /></dt>
                            <dd>Goes to a trailer on YouTube.</dd>
                            <dt><img src={IMG.tomato} height="16" /></dt>
                            <dd>Goes to film’s page at Rotten Tomatoes.</dd>
                            <dt><img src={IMG.netflix} width="46" /></dt>
                            <dd>Goes to a site that tell’s you in which counties the film is available on Netflix.</dd>
                            <dt><img src={IMG.zooqle} height="18" /></dt>
                            <dd>Goes to a site listing bitTorrents of the film. Caution: You should know what you’re doing if you use this. <i>Never</i> use the direct download links!</dd>
                        </dl>
                        <p>Once I’ve seen a film I record my reaction like this: <Rate seen="love" />=love, <Rate seen="like" />=like, <Rate seen="ok" />=ok, <Rate seen="dislike" />=dislike, <Rate seen="hate" />=hate.
                         Sometimes I add a note about my reaction.</p>
                    </div>
                    : null}

                <Films key={year} year={year} />
            </NormalPage>
        )
    }
}

//------------------------------------------------------------------------------
// Actions

function get(path) {
    return fetch('https://uamrc1iiak.execute-api.eu-west-2.amazonaws.com/dev/' + path)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Network response was not ok.')
        })
}

function films_fetch(year) {
    console.log(`films_fetch(${year})`)
    return { type: 'FILMS_FETCH', payload: get('films/' + year) }
}

function films_fetchSuccess(response) {
    console.log(`films_fetchSuccess(${response})`)
    return { type: 'FILMS_FETCH_SUCCESS', films: response.Items }
}

function films_fetchFailure(error) {
    console.log(`films_fetchFailure(${error})`)
    return { type: 'FILMS_FETCH_FAILURE', error }
}


//------------------------------------------------------------------------------
// Container

interface StateFromProps {
    films: FilmsState,
}
interface DispatchFromProps {
    fetch: (string) => void,
}


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
                .then(response => {
                    dispatch(films_fetchSuccess(response))
                    app.update_sticky() // Horrible hack!!
                })
                .catch(error => dispatch(films_fetchFailure(error)))
        }
    }
}

const Films = connect<StateFromProps, DispatchFromProps, { year: string }>(state2props, dispatch2props)(FilmPicks)


//------------------------------------------------------------------------------
// Reducer

const INITIAL_STATE = {
    list: { data: [], error: null, loading: false }
}

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'FILMS_FETCH': return { ...state, list: { data: [], error: null, loading: true } }
        case 'FILMS_FETCH_SUCCESS': return { ...state, list: { data: action.films, error: null, loading: false } }
        case 'FILMS_FETCH_FAILURE': return { ...state, list: { data: [], error: action.error, loading: false } }
        case 'FILMS_RESET': return { ...state, list: { data: [], error: null, loading: false } }
        default: return state
    }
}


//------------------------------------------------------------------------------

export default function (app) {
    app.add_route('/film-pick/:year', FilmPickPage)

    app.add_nav({
        ident: 'film-pick', text: 'Film Picks', href: '/film-pick/2018', sub: [
            { href: '/film-pick/2016', text: '2016', ident: '2016' },
            { href: '/film-pick/2017', text: '2017', ident: '2017' },
            { href: '/film-pick/2018', text: '2018', ident: '2018' },
        ]
    })

    app.redirect('/film-2016', '/film-pick/2016')
    app.redirect('/film-2017', '/film-pick/2017')
    app.redirect('/film-2018', '/film-pick/2018')

    app.add_reducer('films', reducer)
}
