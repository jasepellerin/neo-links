import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export const Section = ({ section, getLinkId, Link, onAddLink }) => (
	<div>
		<div className="flex items-center justify-between mb-2">
			<h2 className="text-2xl font-semibold">{section.title}</h2>
			<button
				onClick={onAddLink}
				className="ml-2 p-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center"
				title="Add Link"
			>
				<span className="text-xl leading-none">＋</span>
			</button>
		</div>
		<Droppable droppableId={section.title} direction="horizontal">
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className={`flex gap-2 p-3 rounded-lg mb-4 min-h-[80px] transition border shadow-sm
					bg-gray-50 border-gray-200
					dark:bg-neutral-800 dark:border-neutral-700
					${snapshot.isDraggingOver ? 'bg-blue-50 border-blue-400 dark:bg-blue-900 dark:border-blue-500' : ''}`}
				>
					{section.links.map((link, idx) => (
						<Draggable key={getLinkId(link)} draggableId={getLinkId(link)} index={idx}>
							{(dragProvided, dragSnapshot) => (
								<div
									ref={dragProvided.innerRef}
									{...dragProvided.draggableProps}
									{...dragProvided.dragHandleProps}
									className={`select-none rounded-md min-w-[120px] m-[2px] transition shadow
									${
										dragSnapshot.isDragging
											? 'bg-blue-100 border-2 border-blue-400 shadow-lg dark:bg-blue-950 dark:border-blue-500 dark:text-neutral-100 text-neutral-900'
											: 'bg-white border border-gray-200 text-neutral-900 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100'
									}
									`}
									style={dragProvided.draggableProps.style}
								>
									<Link {...link} />
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	</div>
)

Section.DragDropContext = DragDropContext
