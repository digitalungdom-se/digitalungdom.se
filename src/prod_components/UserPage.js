import React from 'react'
import { Row, Col, Card, Avatar, Skeleton } from 'antd'
import Loading from '@components/Loading'
import ProfilePicture from '@components/ProfilePicture'

const userColor = "pink";

function UserPage({ user, loading }) {
	if (loading) return <Loading />
	return (
		<div>

			<Row
			type="flex"
			justify="center"
			style={{marginTop: 30}}>

				<Col
				xs={{ span: 22 }}
				sm={{ span: 22 }}
				md={{ span: 20 }}
				lg={{ span: 18 }}
				xl={{ span: 16 }}>

					<Row
					style={{width: "100%"}}
					type = "flex"
					justify="space-between">

						<Col
						xs={{span: 0}}
						sm={{span: 0}}
						md={{span: 7}}
						lg={{span: 7}}
						type = "flex" justify="center">
							<Col
								style={{
									background: "white",
									border:'1px solid rgba(0,0,0,0.1)',
									borderRadius: 8,
								}}
							>
								<Row
								type="flex"
								justify="start"
									style={{
										background: userColor,
										padding: 10,
										borderTopRightRadius: 8,
										borderTopLeftRadius: 8,
										textAlign: 'center',
										height: 80,
										marginBottom: 20,
										paddingTop: 20,
										paddingLeft: 30,
									}}>
									<Col>
										<ProfilePicture style={{position: 'absolute'}} username={user.details.username} size={80}/>
									</Col>
								</Row>

								<div style={{padding: 16, paddingLeft: 30, paddingRight: 30, fontSize: 14}}>
									<h2 style={{margin: 0}}>
										{user.details.name}
									</h2>

									<span style={{fontSize:14, paddingTop: 4}}>
										@{user.details.username}
									</span>

									<p style={{ marginTop: 12, marginBottom: 16, color: 'rgba(0,0,0,0.7)', fontSize: 14}}>
										Jag heter Kelvin wHats up yo, Jag heter Kelvin wHats up yo, Jag heter Kelvin wHats up yo
									</p>

									<div>Medlem sedan {(new Date(parseInt(user._id.substring(0, 8), 16) * 1000)).toISOString().substring(0, 10)}</div>
								</div>
							</Col>
						</Col>

            <Col
            xs={{ span: 22 }}
            sm={{ span: 22 }}
            md={{ span: 16 }}
            lg={{ span: 16 }}>

              <div>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
                <Card>
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
              </div>

            </Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}

export default UserPage
