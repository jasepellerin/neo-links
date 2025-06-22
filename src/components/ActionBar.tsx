import { PaperAirplaneIcon, TrashIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'

export const ActionBar = ({
	selectedCount,
	onMove,
	onDelete,
	onEdit,
	onDone
}: {
	selectedCount: number
	onMove?: () => void
	onDelete?: () => void
	onEdit?: () => void
	onDone: () => void
}) => {
	if (selectedCount === 0) {
		return (
			<div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-2 flex items-center gap-4 animate-fadein border border-neutral-200 dark:border-neutral-700">
				<button
					onClick={onDone}
					className="px-4 py-2 rounded-md text-neutral-800 dark:text-neutral-200 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition cursor-pointer"
					title="Done"
				>
					Done
				</button>
			</div>
		)
	}

	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg shadow-lg p-2 flex flex-col items-center gap-4 animate-fadein border border-neutral-200 dark:border-neutral-700">
			<button
				onClick={onDone}
				className="absolute top-1.5 right-1.5 p-1 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
				title="Done"
			>
				<XMarkIcon className="w-5 h-5" />
			</button>
			<div className="font-bold px-2 whitespace-nowrap">{selectedCount} selected</div>
			<div className="flex items-center gap-2">
				{selectedCount === 1 && onEdit && (
					<button
						onClick={onEdit}
						className="flex items-center gap-2 p-2 rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition cursor-pointer"
						title="Edit Selected Link"
					>
						<PencilIcon className="w-5 h-5" />
						<span>Edit</span>
					</button>
				)}
				{onMove && (
					<button
						onClick={onMove}
						className="flex items-center gap-2 p-2 rounded-md bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition cursor-pointer"
						title="Move Selected Links"
					>
						<PaperAirplaneIcon className="w-5 h-5" />
						<span>Move</span>
					</button>
				)}
				{onDelete && (
					<button
						onClick={onDelete}
						className="flex items-center gap-2 p-2 rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition cursor-pointer"
						title="Delete Selected Links"
					>
						<TrashIcon className="w-5 h-5" />
						<span>Delete</span>
					</button>
				)}
			</div>
		</div>
	)
}
