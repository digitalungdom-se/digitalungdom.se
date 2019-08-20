import React, { useState } from 'react'
import { Button, Row, Col, Card, Avatar, Skeleton, Form, Select, Icon, Input } from 'antd'
import Loading from '@components/Loading'
import UserEditingForm from '@components/userEditingForm'
import ProfilePicture from 'containers/ProfilePicture'

const userColor = "pink";

const handleSubmit = ( e ) => {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll( ( err, values ) => {
    if ( !err ) {
      console.log( 'Received values of form: ', values );
      this.props.register( {
        ...values,
        birthdate: values.birthdate.format( 'YYYY-MM-DD' )
      } )
    }
  } );
}

function editingButton( setEditing, canEdit ) {
  if ( canEdit ) {
    return ( <Button
 				ghost
 				onClick={()=> {
 					setEditing(true)
 					}
 				}
 				style={{color: "rgba(0,0,0,0.5)", width: '100%', marginTop: 20, border: "1px solid rgba(0,0,0,0.2)"}}
 				>
 					Redigera profil
 				</Button> )
  }
}

function renderProfile( user, canEdit ) {

  const [ editing, setEditing ] = useState( false );

  if ( editing === false ) {
    return (
      <div>
				<p style={{ marginTop: 12, marginBottom: 16, color: 'rgba(0,0,0,0.9)', fontSize: 16}}>
					{user.profile.bio}
				</p>

				<div
				style={{fontSize:12}}>
					Medlem sedan {(new Date(parseInt(user._id.substring(0, 8), 16) * 1000)).toISOString().substring(0, 10)}
				</div>
        {editingButton(setEditing, canEdit)}
			</div>
    )
  } else {

    return <UserEditingForm user={user} cancel={()=> setEditing(false)}/>

  }
}

function UserPage( { user, loading, canEdit } ) {

  if ( loading || !user.profile ) return <Loading />
  return (
    <div>

			<Row
				type="flex"
				justify="center"
				style={{marginTop: 30}}
			>

				<Col
					xs={{ span: 22 }}
					sm={{ span: 22 }}
					md={{ span: 20 }}
					lg={{ span: 18 }}
					xl={{ span: 16 }}
				>

					<Row
						style={{width: "100%"}}
						type = "flex"
						justify="space-between"
					>

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
										background: user.profile.colour ? user.profile.colour: '#83aef2',
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
										<ProfilePicture
											style={{position: 'absolute'}}
											id={user._id} size={80}
										/>
									</Col>
								</Row>

								<div
									style={{ padding: "16px 30px", fontSize: 14}}
								>

									<h2
										style={{margin: 0, fontWeight: 'bold'}}
									>
										{user.details.name}
									</h2>

									<p
										style={{fontSize:16, marginTop: -4}}
									>
										<span
                      style={{color:user.profile.colour ? user.profile.colour: '#83aef2'}}>
                      @{user.details.username}
                    </span>
                      <span>{user.profile.status ? ` - ${user.profile.status}` : ''}</span>
									</p>
									{
										renderProfile(user, canEdit)
									}

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
