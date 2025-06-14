import { useEffect } from 'react'

const modalStyle = {
	position: 'fixed' as const,
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	background: 'rgba(0,0,0,0.25)',
	zIndex: 1000,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}
const modalBoxStyle = {
	background: '#fff',
	padding: '32px',
	borderRadius: '10px',
	boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
	minWidth: '320px',
	display: 'flex',
	flexDirection: 'column' as const,
	gap: '12px'
}

export const Modal = ({ open, onClose, title, children }) => {
	useEffect(() => {
		if (!open) return
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler)
	}, [open, onClose])
	if (!open) return null
	return (
		<div style={modalStyle} onClick={onClose}>
			<div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
				{title && <h2>{title}</h2>}
				{children}
			</div>
		</div>
	)
}
