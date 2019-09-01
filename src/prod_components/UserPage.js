import React, { useState } from 'react'
import { Button, Row, Col, Card, Avatar, Skeleton, Icon, Dropdown, Menu } from 'antd'
import Loading from '@components/Loading'
import UserEditingForm from '@components/userEditingForm'
import FileSelector from '@components/fileSelector'
import ProfilePicture from 'containers/ProfilePicture'
import ProfilePictureViewer from '@components/profilePictureViewer'

import { useDispatch } from 'react-redux'


const menu = (
  <Menu>
    <Menu.Item>
      <FileSelector/>
    </Menu.Item>
    <Menu.Item>
      Ta bort nuvarande profilbild
    </Menu.Item>
  </Menu>
);

function editingButton( setEditing, canEdit ) {
  if ( !canEdit ) {
    return (
      <Button
  			ghost
  			onClick={()=> {
  				setEditing(true)
  				}
  			}
  			style={{color: "rgba(0,0,0,0.5)", width: '100%', marginTop: 20, border: "1px solid rgba(0,0,0,0.2)"}}
			>
				Redigera profil
			</Button>
    )
  }
}

function editPictureButton( setEditing, canEdit ) {
  if ( !canEdit ) {
    return (
      <a
        style={{
          color: "rgba(0,0,0,0.6)",
          position: 'absolute',
          top: 100,
        }}
      >
        <Dropdown
          overlay={menu}
        >
          <Row
            type="flex"
            gutter={6}
          >
            <Col>
              <Icon
              type="edit"
              style={{ color: "rgba(0,0,0,0.6)" }}
              />
            </Col>

            <Col>
              Redigera profilbild
            </Col>
          </Row>
        </Dropdown>
      </a>
    )
  }
}


function renderProfile( user, canEdit, edit, userColour, setUserColour ) {
  const [ editing, setEditing ] = useState( false );

  if ( editing === false ) {
    return (
      <div>
				<p
          style={{
            marginTop: 8,
            marginBottom: 24,
            color: 'rgba(0,0,0,0.9)',
            fontSize: 18
          }}
        >
					{user.profile.bio}
				</p>

				<p style={{fontSize: 13, margin: "6px 0px"}}>
					<a
					href={user.profile.url}
					target="_blank"
					>
						{
							user.profile.url?
							(
								<Row
								type="flex"
								gutter={6}
								>
									<Col>
										<Icon
										type="paper-clip"
										style={{ color: 'rgba(0,0,0,.25)' }}
										/>
									</Col>
									<Col>
									{user.profile.url}
									</Col>
								</Row>
							):
							null
						}
					</a>
				</p>

				<p style={{fontSize: 13, margin: "6px 0px"}}>
					{
						user.details.email?
						(
							<Row
							type="flex"
							gutter={6}
							>
								<Col>
									<Icon
									type="mail"
									style={{ color: 'rgba(0,0,0,.25)' }}
									/>
								</Col>
								<Col>
								{user.details.email}
								</Col>
							</Row>
						):
						null
					}
				</p>

				<Row
				style={{fontSize: 13, margin: "6px 0px"}}
				type="flex"
				gutter={6}
				>
					<Col>
						<Icon
						type="clock-circle"
						style={{ color: 'rgba(0,0,0,.25)', marginLeft: -3}}
						/>
					</Col>
					<Col>
						Medlem sedan {(new Date(parseInt(user._id.substring(0, 8), 16) * 1000)).toISOString().substring(0, 10)}
					</Col>
				</Row>

        {editingButton(setEditing, canEdit)}

			</div>
    )
  } else {
    return (
      <div>
        {editPictureButton(setEditing, canEdit)}

        <UserEditingForm
  				user={user}
  				cancel={()=> {
  					setEditing(false);
  					setUserColour(user.profile.colour)
  				}}
          submit={()=> {
            setEditing(false);
          }}
  				setUserColour={setUserColour}
  				userColour={userColour}
          edit={edit}
  			/>
      </div>
    )
  }
}

function UserPage( { user, loading, canEdit, edit } ) {
  if ( loading || !user.profile ) return <Loading spin card />
  const [ userColour, setUserColour ] = useState( user.profile.colour ? user.profile.colour : '#83aef2' );

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
							xs={{span: 22}}
							sm={{span: 22}}
							md={{span: 9}}
							lg={{span: 8}}
							type = "flex"
							justify="center"
            >

							<Col
								style={{
									background: "white",
									border:'1px solid rgba(0,0,0,0.1)',
									borderRadius: 8,
									marginBottom: 16,
								}}
							>

								<Row
									type="flex"
									justify="start"
                  class="du-background"
									style={{
										background: userColour,
										padding: 10,
										borderTopRightRadius: 8,
										borderTopLeftRadius: 8,
										textAlign: 'center',
										height: 80,
										marginBottom: 20,
										paddingTop: 20,
										paddingLeft: 30,
									}}
                >
									<Col>
                    <a>
  										<ProfilePicture
  											style={{position: 'absolute'}}
  											id={user._id}
                        size={80}
  										/>
                    </a>
                    <ProfilePictureViewer
                    id={user._id}
                    />
									</Col>
								</Row>

								<div
									style={{
                    padding: "16px 30px",
                    fontSize: 14
                  }}
								>

									<h2
										style={{
                      margin: 0,
                      fontWeight: 'bold'
                    }}
									>
										{user.details.name}
									</h2>

									<p
										style={{fontSize:16, marginTop: -4}}
									>
										<span
                      class="du-colour"
                      style={{color:userColour}}>
                      @{user.details.username}
                    </span>
                      <span>{user.profile.status ? ` - ${user.profile.status}` : ''}</span>
									</p>
									{
										renderProfile(user, canEdit, edit,userColour, setUserColour)
									}

								</div>
							</Col>
						</Col>

            <Col
            xs={{ span: 22 }}
            sm={{ span: 22 }}
            md={{ span: 14 }}
            lg={{ span: 15 }}>

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
