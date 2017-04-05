// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import styles from './index.css'

const Html = ({ content, state }) => (
  <html styleName='html'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no' />
      <link rel="stylesheet" href="/public/bundle.css" />
      <script async type='text/javascript' src='/public/bundle.js' />
    </head>
    <body styleName='body'>
      <div id='root' styleName='root' dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`
      }} />
    </body>
  </html>
)

export default cssModules(Html, styles)
