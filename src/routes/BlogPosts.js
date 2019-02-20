import React, { Component } from 'react'
import { Row, Col, Affix, Card, Button } from 'antd'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'


let input = `Digital Ungdom har i veckan
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
},
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
},
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
},
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
}
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
},
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
},
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
},
{
	user: 'Douglas Bengtsson',
	date: new Date('2019-02-18'),
	text: input,
	title: 'Digitalt rådslag!'
}
`

const posts = [
	{
		user: 'Douglas Bengtsson',
		date: new Date('2019-02-18'),
		text: input,
		title: 'Digitalt rådslag!'
	},
	{
		user: 'Douglas Bengtsson',
		date: new Date('2019-02-18'),
		text: input,
		title: 'Digitalt rådslag!'
	},
	{
		user: 'Douglas Bengtsson',
		date: new Date('2019-02-18'),
		text: input,
		title: 'Digitalt rådslag!'
	},
	{
		user: 'Douglas Bengtsson',
		date: new Date('2019-02-18'),
		text: input,
		title: 'Digitalt rådslag!'
	}
]

class BlogPosts extends Component {

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
		const changedPosts = posts.map(post => (
			<Row
				// type="flex"
				// justify="center"
				key={post.date}
			>
				<Col style={{marginTop: 40}}>
					<Card style={{padding: 20}} >
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
					</Card>
				</Col>
			</Row>
		))
		return (
			<Row>
				<Col
					// {...sizes}
					lg={{ span: 12, offset: 6 }}
					md={{ span: 18, offset: 0 }}
					sm={{ span: 24 }}
					xs={{ span: 24 }}
					style={{overflowY: 'scroll', height: '73vh'}}
					// pull={8}
				>
					{
						changedPosts
					}
				</Col>
				<Col
					sm={{span: 0}}
					md={{span: 6}}
					lg={{span: 6}}
					style={{padding: 10}}
				>
						<Card>
							<h1>Hem</h1>
							<Link to="/blog/skapa-inlagg">
								<Button
									style={{width: '100%'}}
									type="primary"
								>
									Skapa inlägg
								</Button>
							</Link>
						</Card>
				</Col>
			</Row>
		)
	}
}


export default BlogPosts
