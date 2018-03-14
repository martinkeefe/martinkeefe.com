import React from 'react'

// * variations follow.
// (.) you may prepare the dish ahead of time up to this point, then complete the recipe later.

let SYS = 'us'
let PRESS = false

export function Master(props) {
	return <abbr title="master recipe, variations follow">*</abbr>
}

export function Pause(props) {
	return <abbr title="you may prepare the dish ahead of time up to this point, then complete the recipe later">◊</abbr>
}

export function Pressure(props) {
	if (PRESS) {
		return props.children
	}
	return props.alt || null
}

export function quart(n1,n2) {
	switch(SYS) {
		case 'us':
			if (n2) {
				return `${n1}- to ${n2}-quart`
			}
			return `${n1}-quart`
		case 'uk':
			if (n2) {
				return `${n1*2}- to ${n2*2}-pint`
			}
			return `${n1*2}-pint`
		default:
			if (n2) {
				return `${n1}- to ${n2}-litre`
			}
			return `${n1}-litre`
	}
}
export function quarts(n1,n2) {
	switch(SYS) {
		case 'us':
			if (n2) {
				return `${n1} to ${n2} quarts`
			}
			return `${n1} quarts`
		case 'uk':
			if (n2) {
				return `${n1*2} to ${n2*2} pints`
			}
			return `${n1*2} pints`
		default:
			if (n2) {
				return `${n1} to ${n2} litres`
			}
			return `${n1} litres`
	}
}
