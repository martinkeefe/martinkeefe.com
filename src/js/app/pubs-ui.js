import React from 'react'
import {connect} from 'react-redux'

export const COLOR = {
		open: '#4A4',
		limbo:'#F00',
		dead: '#CA0',
		gone: '#C0F',
		bone: '#66F',
	}

//------------------------------------------------------------------------------
// Presentation

function PubsUI({checked,solo,set_visible,set_solo}) {

    const click_chk = (e, status) => set_visible(status, e.target.checked)

    const click_btn = (e, status) => (solo === status) ? set_solo(null) : set_solo(status)

    const Status = ({status,text,children}) => {
		return (
			<tr>
				<td><span style={{color: COLOR[status]}}>{text}</span></td>
				<td><input type="checkbox" checked={checked[status]} disabled={!!solo} onChange={e => click_chk(e,status)}/></td>
				<td><input type="radio" name="solo" checked={solo == status} onClick={e => click_btn(e,status)} readOnly/></td>
				<td>{children}</td>
			</tr>
		)
    }

	return (
		<table className="gui">
			<tbody>
				<Status key="open" status="open" text="Alive">Currently open or being refurbished.</Status>
				<Status key="limbo" status="limbo" text="In Limbo">Closed but not converted to another use. Might reopen but on danger list.</Status>
				<Status key="dead" status="dead" text="Dead">Closed and changed use. Could conceivably be resurrected.</Status>
				<Status key="gone" status="gone" text="Gone">Demolished and/or converted to residential use. Gone forever.</Status>
				<Status key="bone" status="bone" text="Buried">Disappeared at least 40 years ago.</Status>
			</tbody>
		</table>
	)
}


//------------------------------------------------------------------------------
// Actions

function solo(status) {
    return {type: 'PUBS_SOLO', status}
}

function show(status,state) {
    return {type: 'PUBS_SHOW', status, state}
}


//------------------------------------------------------------------------------
// Container

const state2props = state => {
    return {
        solo: state.pubs.ui.solo,
        checked: state.pubs.ui.checked,
    }
}

const dispatch2props = dispatch => {
    return {
    	set_solo: status => dispatch(solo(status)),
    	set_visible: (status,state) => dispatch(show(status,state)),
    }
}

export default connect(state2props, dispatch2props)(PubsUI)


//------------------------------------------------------------------------------
// Reducer

const INITIAL_STATE = {
	solo: null,
	checked: {open:true, limbo:true, dead:true, gone:true, bone:true}
}

export function ui_reducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case 'PUBS_SOLO': return {...state, solo: action.status}
        case 'PUBS_SHOW': return {...state, checked: {...state.checked, [action.status]: action.state}}
        default: return state;
    }
}
