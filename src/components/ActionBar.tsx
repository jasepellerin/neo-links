import { PaperAirplaneIcon, TrashIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'

export const ActionBar = ({
	selectedCount,
	onMove,
	onDelete,
	onEdit,
	onDone
}: {
	selectedCount: number
	onMove: () => void
	onDelete: () => void
	onEdit: () => void
	onDone: () => void
}) => {
	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-neutral-800 text-white rounded-lg shadow-lg p-2 flex flex-col items-center gap-4 animate-fadein">
			<button
				onClick={onDone}
				className="absolute top-1.5 right-1.5 p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
				title="Done"
			>
				<XMarkIcon className="w-5 h-5" />
			</button>
			<div className="font-bold px-2 whitespace-nowrap">{selectedCount} selected</div>
			<div className="flex items-center gap-2">
				{selectedCount === 1 && onEdit && (
					<button
						onClick={onEdit}
						className="flex items-center gap-2 p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
						title="Edit Selected Link"
					>
						<PencilIcon className="w-5 h-5" />
						<span>Edit</span>
					</button>
				)}
				<button
					onClick={onMove}
					className="flex items-center gap-2 p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer"
					title="Move Selected Links"
				>
					<PaperAirplaneIcon className="w-5 h-5" />
					<span>Move</span>
				</button>
				<button
					onClick={onDelete}
					className="flex items-center gap-2 p-2 rounded-md bg-red-600 hover:bg-red-700 transition cursor-pointer"
					title="Delete Selected Links"
				>
					<TrashIcon className="w-5 h-5" />
					<span>Delete</span>
				</button>
			</div>
		</div>
	)
}
