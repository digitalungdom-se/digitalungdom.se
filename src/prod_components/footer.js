import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Icon } from 'antd'
import { withTranslation } from 'react-i18next'
import { withRouter, NavLink } from 'react-router-dom'
import './footer.css'

export default () => {
  const size = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6
    // style:{background: 'red'}
  }
  return (
    <Row
      type="flex"
      justify="center"
      gutter={20}
      style={{width: '100%', padding: 24, margin: 0, background: "#05379c", color: "white"}}
    >
      <Col
        {...size}
      >
        <h3>
          Om oss
        </h3>
        <p>
          Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och datavetenskap samt hur detta kan användas.
        </p>
      </Col>
      <Col
        {...size}
      >
        <h3>
          Kontakt
        </h3>
        <p>
          E-post: <a href="mailto:styrelse@digitalungdom.se">styrelse@digitalungdom.se</a>
        </p>
        <p>
          Telefonnummer: <a href="tel:+45709447003">+46709447003</a>
        </p>
        <p>
          Discord-server: <a href="https://discord.gg/J4JhCWH">https://discord.gg/J4JhCWH</a>
        </p>
      </Col>
    </Row>
  )
}

// export default () => (
//   <div style={{ color: '#e3e3e3', fontSize: 13, background: "darkblue"}}>
//     <Row type="flex" justify="space-between" style ={{marginBottom: 30, textAlign: 'left'}}>
//       <Col span={8}>
//         <div className="footerContainer">
//           <h3>
//             Om oss
//           </h3>

//           <Row style={{height:12}}/>

//           <p>
//             Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och datavetenskap, samt hur detta kan användas.
//           </p>
//         </div>
//       </Col>
//       <Col span={7}>
//         <h3>
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
//         <h3>
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
//         <p>
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
