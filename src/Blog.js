import React, { Component } from 'react'
import { Row, Col } from 'antd'
import ReactMarkdown from 'react-markdown'

let input = `

Hej

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

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)


`

input = `
Hej

\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`
`

const posts = [
	{
		user: 'Douglas Bengtsson',
		date: new Date(),
		text: input,
		title: 'Hello, world!'
	}
]

class Blog extends Component {
	formatDate(date) {
	  var monthNames = [
	    "januari", "februari", "mars",
	    "april", "maj", "juni", "juli",
	    "augusti", "september", "oktober",
	    "november", "december"
	  ];

	  let day = date.getDate();
	  let monthIndex = date.getMonth();
	  let year = date.getFullYear();

	  return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	render() {
		const sizes = {
			style: { padding: 40 },
			lg: { span: 12 },
			md: { span: 18 },
			sm: { span: 24 },
			xs: { span: 24 },
		}
		return posts.map(post => (
			<Row
				type="flex"
				justify="center"
				key={post.date}
			>
				<Col
					{...sizes}
					className="window blog-post"
				>
					<code
						className="date"
					>
						{this.formatDate(post.date)}
					</code>
					<h1
						className="title"
					>
						{post.title}
					</h1>
					<h4
						className="user"
					>
						{post.user}
					</h4>
					<ReactMarkdown source={post.text} />
				</Col>
			</Row>
			))
	}
}

export default Blog
