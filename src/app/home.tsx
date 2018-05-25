import * as React from 'react'
import { NormalPage } from '../app'
import ShadeBob from './shadebob'


const HomePage = () => {
    const side = (
        <React.Fragment>
            <hr />
            <p style={{ fontSize: 14 + 'px', textAlign: 'justify' }}><b>Techie Note:</b> This site is a static single page app written 
            in <a href="https://www.typescriptlang.org/">TypeScript</a> using <a href="https://reactjs.org/">React</a> &amp; <a href="https://redux.js.org/">Redux</a>,
            built with <a href="https://webpack.js.org/">WebPack</a> &amp; <a href="https://babeljs.io/">Babel</a>, and hosted
            on <a href="https://aws.amazon.com/s3/">AWS S3</a> with data stored in <a href="https://aws.amazon.com/dynamodb/">AWS DynamoDB</a>.
            If you’re curious you can browse the source code on <a href="https://github.com/martinkeefe/martinkeefe.com">GitHub</a>.</p>
        </React.Fragment>
    )

    return (
        <NormalPage title="Martin's Stuff" date="2018-05-24" side={side}>
            <ShadeBob />
        </NormalPage>
    )
}


export default function (app) {
    app.add_route('/', HomePage, true)
}
