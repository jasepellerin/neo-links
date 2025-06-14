import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export const Section = ({ section, getLinkId, Link }) => (
	<div>
		<h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
		<Droppable droppableId={section.title} direction="horizontal">
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className={`flex gap-2 p-3 rounded-lg mb-4 min-h-[80px] transition border ${snapshot.isDraggingOver ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-200'}`}
				>
					{section.links.map((link, idx) => (
						<Draggable key={getLinkId(link)} draggableId={getLinkId(link)} index={idx}>
							{(dragProvided, dragSnapshot) => (
								<div
									ref={dragProvided.innerRef}
									{...dragProvided.draggableProps}
									{...dragProvided.dragHandleProps}
									className={`select-none rounded-md min-w-[120px] m-[2px] transition shadow ${dragSnapshot.isDragging ? 'bg-blue-100 border-2 border-blue-400 shadow-lg' : 'bg-white border border-gray-200'}`}
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
