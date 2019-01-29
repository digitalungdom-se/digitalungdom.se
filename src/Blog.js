import React, { Component } from 'react'
import { Row, Col } from 'antd'
import ReactMarkdown from 'react-markdown'

const input = `
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

kelvoifsdifs

# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>
# Kelvin
## How about some code?
Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)


`

const posts = [
	{
		user: 'Douglas Bengtsson',
		date: Date.now(),
		text: input,
		title: 'Hello, world!'
	}
]

class Blog extends Component {
	render() {
		const sizes = {
			lg: {span: 12},
			style: {padding: 40}
		}
		return (
			<Row
				type="flex"
				justify="center"
			>
			{
				posts.map(post => (
					<Col
						{...sizes}
						className="window"
					>
						<h1>{post.title}</h1>
						<ReactMarkdown source={post.text} />
					</Col>
				))
			}
				<Col
					{...sizes}
					className="window"
				>
					<ReactMarkdown source={input} />
				</Col>
			</Row>
		)
	}
}

export default Blog
