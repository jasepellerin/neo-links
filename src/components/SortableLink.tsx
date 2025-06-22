import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Link } from './Link'
import { Bars3Icon } from '@heroicons/react/24/solid'

export const SortableLink = ({
	id,
	link,
	editMode,
	onDelete,
	className,
	isSelected,
	onToggleSelect
}) => {
	const isMoveMode = editMode === 'move'
	const isDeleteMode = editMode === 'delete'
	const isOrganizeMode = isMoveMode || isDeleteMode

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id,
		disabled: !isMoveMode
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`select-none w-[22%] min-w-[80px] transition p-1 rounded-lg group relative ${
				isSelected ? 'ring-2 ring-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' : ''
			}`}
		>
			<div
				className={`w-full h-full ${isOrganizeMode ? 'cursor-pointer' : ''}`}
				onClick={() => {
					if (isOrganizeMode) {
						onToggleSelect()
					}
				}}
			>
				<Link
					{...link}
					className={className}
					disabled={isOrganizeMode}
					deleteMode={isDeleteMode}
					onDelete={onDelete}
				/>
			</div>
			{isMoveMode && (
				<div
					{...attributes}
					{...listeners}
					className="absolute top-1 right-1 p-2 rounded-full bg-neutral-500/10 hover:bg-neutral-500/30 cursor-grab touch-none"
					onClick={(e) => {
						e.stopPropagation()
					}}
				>
					<Bars3Icon className="w-5 h-5 text-neutral-800 dark:text-neutral-100" />
				</div>
			)}
		</div>
	)
}
