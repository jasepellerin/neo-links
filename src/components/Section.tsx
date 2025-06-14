import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export const Section = ({ section, getLinkId, Link }) => (
	<div>
		<h2>{section.title}</h2>
		<Droppable droppableId={section.title} direction="horizontal">
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					style={{
						display: 'flex',
						gap: '10px',
						padding: '10px',
						background: snapshot.isDraggingOver ? '#f0f4ff' : '#fafbfc',
						border: snapshot.isDraggingOver ? '2px solid #4f8cff' : '1px solid #e0e0e0',
						borderRadius: '8px',
						marginBottom: '18px',
						minHeight: '80px'
					}}
				>
					{section.links.map((link, idx) => (
						<Draggable key={getLinkId(link)} draggableId={getLinkId(link)} index={idx}>
							{(dragProvided, dragSnapshot) => (
								<div
									ref={dragProvided.innerRef}
									{...dragProvided.draggableProps}
									{...dragProvided.dragHandleProps}
									style={{
										userSelect: 'none',
										background: dragSnapshot.isDragging ? '#e3f0ff' : '#fff',
										border: dragSnapshot.isDragging ? '2px solid #4f8cff' : '1px solid #e0e0e0',
										borderRadius: '6px',
										boxShadow: dragSnapshot.isDragging ? '0 2px 8px rgba(79,140,255,0.15)' : 'none',
										minWidth: 120,
										margin: '0 2px',
										...dragProvided.draggableProps.style
									}}
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
