import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/solid'

export const ActionBar = ({ selectedCount, onMove, onDelete }) => {
	return (
		<div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-neutral-800 text-white rounded-lg shadow-lg p-2 flex items-center gap-4 animate-fadein">
			<div className="font-bold px-2 whitespace-nowrap">{selectedCount} selected</div>
			{onMove && (
				<button
					onClick={onMove}
					className="flex items-center gap-2 p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
					title="Move Selected Links"
				>
					<PaperAirplaneIcon className="w-5 h-5" />
					<span>Move</span>
				</button>
			)}
			{onDelete && (
				<button
					onClick={onDelete}
					className="flex items-center gap-2 p-2 rounded-md bg-red-600 hover:bg-red-700 transition"
					title="Delete Selected Links"
				>
					<TrashIcon className="w-5 h-5" />
					<span>Delete</span>
				</button>
			)}
		</div>
	)
}
