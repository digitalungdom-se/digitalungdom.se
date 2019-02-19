import React, { Component } from 'antd'
import { InputNumber } from 'antd'

class Personnummer extends Component {

  validatePersonnummer = (rule, value, callback) => {
	  if(value > Math.pow(10,11)) {
	    let sum = ''
	    for(let i = 2; i < (value + '').length - 1; i++) {
	      let b = (i % 2) ? 1 : 2
	      sum += b*((value + '')[i]) + ''
	    }
	    let a = 0
	    for(var i = 0; i < sum.length; i++) a += parseInt(sum[i])
	    let p = (10 - (a % 10)) % 10
	    if(value % 10 !== p) {
	      callback('Ogiltigt personnummer')
	    } else callback()
	  }
	  callback('Ogiltigt personnummer')
	}

	render() {
		return (
			<InputNumber
				placeholder="YYYYMMDDXXXX"
				style={{width: '100%'}}
				type="personnummer"
				onBlur={this.handleConfirmBlur}
			/>
		)
	}	
}