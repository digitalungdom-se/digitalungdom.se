'use strict';

const fs = require('fs')
const pack = require('./package.json')
const path = require('path')

const choice = process.argv[2]
const choices = [['prod', 'production'], ['dev', 'development', 'developer']]
const files = ["node_modules", 'package.json', 'package-lock.json', 'yarn-error.log', 'yarn.lock']

function change(choice) {
	if(choice === pack.type) {
		console.error("Error: You are already in " + choice + " mode")
		return false
	}
	choices.forEach(aliasList => {
		if(aliasList.indexOf(choice) !== -1) {
			files.forEach(file => {
				let first = [path.join(__dirname, file), path.join(__dirname, pack.type + "_" + file)]
				console.log(first[0].padEnd(75, " "), first[1])
				fs.renameSync(first[0], first[1])
				// , err => {
				// 	if(err) {
				// 		console.error(err)
				// 		return false
				// 	}
				// })
				let second = [path.join(__dirname, aliasList[0] + "_" + file), path.join(__dirname, file)]
				console.log(second[0].padEnd(75, " "), second[1])
				fs.renameSync(second[0], second[1])
				// , err => {
				// 	if(err) {
				// 		console.error(err)
				// 		return false
				// 	}
				// })
			})
		}
	})
}

change(choice)
