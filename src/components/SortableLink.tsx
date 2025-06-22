import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Link } from './Link'
import { Bars3Icon } from '@heroicons/react/24/solid'

export const SortableLink = ({ id, link, disabled, organizeMode, onDelete, className }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id
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
			className="select-none w-[22%] min-w-[80px] transition p-1 rounded-lg group relative"
		>
			<Link
				{...link}
				className={className}
				disabled={disabled}
				deleteMode={organizeMode}
				onDelete={onDelete}
			/>
			{organizeMode && (
				<div
					{...attributes}
					{...listeners}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
				>
					<Bars3Icon className="w-8 h-8 text-white" />
				</div>
			)}
		</div>
	)
}
