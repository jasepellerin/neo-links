import { Modal } from './Modal'

export const MoveLinksModal = ({ open, onClose, sections, onMoveLinks }) => {
	return (
		<Modal open={open} onClose={onClose} title="Move links to...">
			<div className="flex flex-col gap-2 min-w-[300px]">
				{sections.map((sectionTitle) => (
					<button
						key={sectionTitle}
						onClick={() => onMoveLinks(sectionTitle)}
						className="w-full px-3 py-2 rounded text-center bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
					>
						{sectionTitle}
					</button>
				))}
			</div>
		</Modal>
	)
}
