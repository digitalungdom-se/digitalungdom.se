import React from 'react'
import Agorize from '@components/agorize'
import { agorizePost as agorize_post, agorizeComment as agorize_comment } from 'actions/agora'
import { useSelector, useDispatch } from 'react-redux'

export function agorizePost({ hypagora = "general", id, ...props }){

	const dispatch = useDispatch()
	const me = useSelector(state => state.Auth.profile.details._id)
	const dispatchAgorize = (info) => dispatch(agorize_post(info, me))
	const availableHypagoras = useSelector(state => state.Agora.availableHypagoras)
	const agorizing = useSelector(state => state.Agora.agorizing.indexOf(id) !== -1)
	const agorized = useSelector(state => state.Agora.agorized.indexOf(id) !== -1)

	return (
		<Agorize
			agorize={dispatchAgorize}
			hypagora={hypagora}
			availableHypagoras={availableHypagoras}
			id={id}
			agorizing={agorizing}
			agorized={agorized}
			{...props}
		/>
	)
}

export function agorizeComment({ hypagora = "general", id, ...props }){

	const dispatch = useDispatch()
	const me = useSelector(state => state.Auth.profile.details._id)
	const dispatchAgorize = (info) => dispatch(agorize_comment(info, me))
	const availableHypagoras = useSelector(state => state.Agora.availableHypagoras)
	const agorizing = useSelector(state => state.Agora.agorizing.indexOf(id) !== -1)
	const agorized = useSelector(state => state.Agora.agorized.indexOf(id) !== -1)

	return (
		<Agorize
			agorize={dispatchAgorize}
			hypagora={hypagora}
			availableHypagoras={availableHypagoras}
			id={id}
			agorizing={agorizing}
			agorized={agorized}
			{...props}
		/>
	)
}
