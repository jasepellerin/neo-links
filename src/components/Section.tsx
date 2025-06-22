import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Modal } from './Modal'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableLink } from './SortableLink'

export const Section = ({
	section,
	getLinkId,
	onAddLink,
	editMode,
	onDeleteSection,
	selectedLinkIds,
	onToggleSelectLink
}) => {
	const [confirmDeleteSection, setConfirmDeleteSection] = useState(false)
	const linkIds = section.links.map((l) => getLinkId(l))

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-2xl font-semibold">{section.title}</h2>
				<div className="flex items-center gap-2">
					{editMode && (
						<button
							onClick={() => setConfirmDeleteSection(true)}
							className="ml-2 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center cursor-pointer"
							title="Delete Section"
						>
							<TrashIcon className="w-5 h-5" />
						</button>
					)}
					<button
						onClick={onAddLink}
						className="ml-2 p-1.5 rounded-full text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center cursor-pointer"
						title="Add Link"
					>
						<PlusIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
			<SortableContext items={linkIds} strategy={verticalListSortingStrategy} id={section.title}>
				<div
					className={`flex gap-1 p-3 rounded-lg mb-4 min-h-[80px] transition border shadow-sm
				bg-gray-50 border-gray-200
				dark:bg-neutral-800 dark:border-neutral-700
				flex flex-wrap justify-around`}
				>
					{section.links.length === 0 ? (
						<div className="flex flex-1 items-center justify-center text-neutral-400 dark:text-neutral-500 italic min-h-[64px]">
							No links yet. Click <PlusIcon className="inline w-4 h-4 align-text-bottom" /> to add
							one!
						</div>
					) : (
						section.links.map((link) => (
							<SortableLink
								key={getLinkId(link)}
								id={getLinkId(link)}
								link={link}
								editMode={editMode}
								className=""
								isSelected={selectedLinkIds.includes(getLinkId(link))}
								onToggleSelect={() => onToggleSelectLink(getLinkId(link))}
							/>
						))
					)}
				</div>
			</SortableContext>
			<Modal
				open={confirmDeleteSection}
				onClose={() => setConfirmDeleteSection(false)}
				title="Delete Section?"
			>
				<div>Are you sure you want to delete this section and all its links?</div>
				<div className="flex gap-2 mt-4 justify-end">
					<button
						onClick={() => setConfirmDeleteSection(false)}
						className="px-3 py-1 rounded bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							setConfirmDeleteSection(false)
							onDeleteSection()
						}}
						className="px-3 py-1 rounded bg-red-600 text-white"
					>
						Delete
					</button>
				</div>
			</Modal>
		</div>
	)
}
