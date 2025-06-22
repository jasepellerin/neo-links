import {
	TrashIcon,
	PlusIcon,
	PencilIcon,
	ArrowUpIcon,
	ArrowDownIcon
} from '@heroicons/react/24/solid'
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
	onRenameSection,
	onMoveUp,
	onMoveDown,
	isFirst,
	isLast,
	selectedLinkIds,
	onToggleSelectLink
}) => {
	const [confirmDeleteSection, setConfirmDeleteSection] = useState(false)
	const [isRenaming, setIsRenaming] = useState(false)
	const [newSectionTitle, setNewSectionTitle] = useState(section.title)
	const linkIds = section.links.map((l) => getLinkId(l))

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-2">
					<h2 className="text-2xl font-semibold">{section.title}</h2>
					{editMode && (
						<button
							onClick={() => {
								setNewSectionTitle(section.title)
								setIsRenaming(true)
							}}
							className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center cursor-pointer"
							title="Rename Section"
						>
							<PencilIcon className="w-4 h-4" />
						</button>
					)}
				</div>
				<div className="flex items-center gap-2">
					{editMode && (
						<>
							<button
								onClick={onMoveUp}
								disabled={isFirst}
								className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
								title="Move Section Up"
							>
								<ArrowUpIcon className="w-4 h-4" />
							</button>
							<button
								onClick={onMoveDown}
								disabled={isLast}
								className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
								title="Move Section Down"
							>
								<ArrowDownIcon className="w-4 h-4" />
							</button>
							<button
								onClick={() => setConfirmDeleteSection(true)}
								className="ml-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center cursor-pointer"
								title="Delete Section"
							>
								<TrashIcon className="w-5 h-5" />
							</button>
						</>
					)}
					{!editMode && (
						<button
							onClick={onAddLink}
							className="ml-2 p-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center cursor-pointer"
							title="Add Link"
						>
							<PlusIcon className="w-5 h-5" />
						</button>
					)}
				</div>
			</div>
			<SortableContext items={linkIds} strategy={verticalListSortingStrategy} id={section.title}>
				<div
					className={`flex gap-1 p-3 rounded-lg mb-4 min-h-[80px] transition border shadow-sm
				bg-white border-neutral-200
				dark:bg-neutral-800 dark:border-neutral-700
				flex flex-wrap justify-around`}
				>
					{section.links.length === 0 ? (
						<div className="flex flex-1 items-center justify-center text-neutral-500 dark:text-neutral-500 italic min-h-[64px]">
							No links yet. Click + to add one!
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
			<Modal open={isRenaming} onClose={() => setIsRenaming(false)} title="Rename Section">
				<div>
					<label
						htmlFor="section-name"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
					>
						Section Name
					</label>
					<input
						type="text"
						id="section-name"
						value={newSectionTitle}
						onChange={(e) => setNewSectionTitle(e.target.value)}
						className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-neutral-900 dark:text-neutral-100"
					/>
				</div>
				<div className="flex gap-2 mt-4 justify-end">
					<button
						onClick={() => setIsRenaming(false)}
						className="px-3 py-1 rounded bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							onRenameSection(newSectionTitle)
							setIsRenaming(false)
						}}
						className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white"
					>
						Save
					</button>
				</div>
			</Modal>
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
						className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
					>
						Delete
					</button>
				</div>
			</Modal>
		</div>
	)
}
