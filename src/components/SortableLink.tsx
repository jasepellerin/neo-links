import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Link } from './Link'

export const SortableLink = ({ id, link, editMode, className, isSelected, onToggleSelect }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id,
		disabled: !editMode
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
			className={`select-none w-[18%] min-w-[45px] transition p-1 rounded-lg group relative ${
				isSelected ? 'ring-2 ring-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' : ''
			}`}
		>
			<div
				className={`w-full h-full ${editMode ? 'cursor-pointer' : ''}`}
				onClick={() => {
					if (editMode) {
						onToggleSelect()
					}
				}}
			>
				<Link
					{...link}
					className={className}
					disabled={editMode}
					editMode={editMode}
					attributes={attributes}
					listeners={listeners}
				/>
			</div>
		</div>
	)
}
