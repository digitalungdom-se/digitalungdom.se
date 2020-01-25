import React from 'react'
import { Col, Row, Icon } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import './footer.css'

export default () => {
  const size = {
    xs: 24,
    sm: 12,
    md: 10,
    lg: 6
  }

  return (
    //temporär fix medans denna inte är i boiler som Wrapper.Footer
    <Row type = "flex" justify="space-around" style={{background: "#05379c", color: "white", paddingBottom: 10,}}>
      <Col
        type="flex"
        justify="center"
  			xs={{ span: 22 }}
  			sm={{ span: 22 }}
  			md={{ span: 20 }}
  			lg={{ span: 18 }}
  			xl={{ span: 16 }}
      >
        <Row
          type="flex"
          justify="start"
          gutter={10}
          style ={{paddingTop: 30, paddingBottom: 20,}}
        >
          <Col
            {...size}
          >
            <h3 style = {{marginBottom: 18}}>
              Om oss
            </h3>
            <p style={{marginBottom: 6}}>
              Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och datavetenskap samt hur detta kan användas.
            </p>
          </Col>
          <Col
            {...size}
          >
            <h3 style = {{marginBottom: 18}}>
              Kontakt
            </h3>
            <p style={{marginBottom: 6}}>
              <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:styrelse@digitalungdom.se"
              className="topFooterLink"
              >
                <Icon type="mail" style={{marginRight: 6}}/>
                styrelse@digitalungdom.se
              </a>
            </p>
            <p style={{marginBottom: 6}}>
              <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/J4JhCWH"
              className="topFooterLink"
              >
                <FontAwesomeIcon style={{marginRight: 6}} icon={faDiscord} />
                Discord
              </a>
            </p>
          </Col>
          <Col
            {...size}
          >
            <h3 style = {{marginBottom: 18}}>
              Utveckla
            </h3>
            <p style={{marginBottom: 6}}>
              <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/digitalungdom-se/digitalungdom.se"
              className="topFooterLink"
              >
                <Icon type="github" style={{marginRight: 6}}/>
                GitHub
              </a>
            </p>
            <p style={{marginBottom: 6}}>
              <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/digitalungdom-se/digitalungdom.se/issues"
              className="topFooterLink"
              >
                <Icon type="issues-close" style={{marginRight: 6}}/>
                Issues
              </a>
            </p>
          </Col>
        </Row>

        <Row type='flex' style={{borderTop: '1px solid white', paddingTop: 12, opacity: 0.7, fontSize: 12}}>
         <Col>
           <p style={{marginBottom: 6}}>
            Digital Ungdom 2020
           </p>
         </Col>
         <Col style={{marginLeft: 20}}>
           <a className='footerLink' href="stadgar.pdf">
            Stadgar
           </a>
         </Col>
       </Row>
     </Col>
   </Row>
  )
}

// export default () => (
//   <div style={{ color: '#e3e3e3', fontSize: 13, background: "darkblue"}}>
//     <Row type="flex" justify="space-between" style ={{marginBottom: 30, textAlign: 'left'}}>
//       <Col span={8}>
//         <div className="footerContainer">
//           <h3 style = {{marginBottom: 18}}>
//             Om oss
//           </h3>

//           <Row style={{height:12}}/>

//           <p style={{marginBottom: 6}}>
//             Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och datavetenskap, samt hur detta kan användas.
//           </p>
//         </div>
//       </Col>
//       <Col span={7}>
//         <h3 style = {{marginBottom: 18}}>
//           Kontakt
//         </h3>
//         <Row style={{height:12}}/>
//           <Row>
//             <div className ="linkWrapper">
//               E-post: styrelse@digitalungdom.se
//             </div>
//           </Row>
//         <Row style={{height:4}}/>
//         <Row>
//           <div className ="linkWrapper">
//             Telefonnummer: +4670 944 70 03
//           </div>
//         </Row>
//       </Col>
//       <Col span={6}>
//         <h3 style = {{marginBottom: 18}}>
//           Community
//         </h3>
//         <Row style={{height:12}}/>
//           <Row>
//             <a className='footerLink' href = 'https://discord.gg/J4JhCWH'>
//               Discord
//             </a>
//           </Row>
//           <Row style={{height:4}}/>
//             <Row>
//               <a href="https://www.facebook.com/Digital-Ungdom-103007371056520" className='footerLink'>
//                 Facebook <Icon type="facebook" />
//               </a>
//             </Row>
//           <Row style={{height:4}}/>
//           <Row>
//             <a href="https://www.instagram.com/digital_ungdom/" className='footerLink'>
//                Instagram <Icon type="instagram" />
//             </a>
//           </Row>
//           <Row style={{height:4}}/>
//             <Row>
//               <a href="https://twitter.com/digital_ungdom" className='footerLink'>
//                  Twitter <Icon type="twitter" />
//               </a>
//             </Row>
//       </Col>
//     </Row>
//     <Row type='flex' style={{borderTop: '1px solid white', paddingTop: 12, opacity: 0.7, fontSize: 12}}>
//       <Col>
//         <p style={{marginBottom: 6}}>
//          Digital Ungdom ©2019
//         </p>
//       </Col>
//       <Col style={{marginLeft: 20}}>
//         <a className='footerLink' href="stadgar.pdf">
//          Stadgar
//         </a>
//       </Col>
//     </Row>
//   </div>
// )
