import { useEffect } from 'react'

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
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/70 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="bg-white dark:bg-neutral-900 dark:text-neutral-100 p-6 sm:p-8 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 min-w-[320px] flex flex-col gap-4 transition-colors duration-200 mx-4"
				onClick={(e) => e.stopPropagation()}
			>
				{title && <h2 className="text-xl font-semibold mb-2 dark:text-white">{title}</h2>}
				{children}
			</div>
		</div>
	)
}
