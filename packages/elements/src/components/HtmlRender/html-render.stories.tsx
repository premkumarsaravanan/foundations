import React from 'react'
import { storiesOf } from '@storybook/react'
import { HTMLRender } from '.'

const html = `
    <h1>heading h1</h1>
    <h2>heading h2</h2>
    <div>
        <b>bold</b>
    </div>
    <div><i>italic</i></div>
    <div><u>underline</u></div>
    <pre>pre tag</pre>
    <strike>strike</strike>
    <div>
        <ul>
            <li>bullet points</li>
            <li>bullet points</li>
        </ul>
    </div>
`

storiesOf('HTMLRender', module).add('Usage', () => (
  <section className="section">
    <HTMLRender html={html} />
  </section>
))
