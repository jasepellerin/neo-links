import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Modal } from './Modal'
import { Link } from './Link'

const LinkSortableItem = ({
	link,
	idx,
	getLinkId,
	deleteMode,
	setConfirmDeleteLinkIdx,
	fadingOutLinkIdx
}) => {
	const id = getLinkId(link)
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id
	})
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 50 : undefined,
		pointerEvents: isDragging ? ('none' as React.CSSProperties['pointerEvents']) : undefined
	}
	return (
		<div
			key={id}
			ref={!deleteMode ? setNodeRef : undefined}
			{...(!deleteMode ? attributes : {})}
			{...(!deleteMode ? listeners : {})}
			style={style}
			className={`select-none w-[22%] transition relative p-1 rounded-lg ${isDragging ? 'opacity-0 border-4 border-blue-400 dark:border-blue-600' : ''}`}
		>
			{deleteMode && (
				<button
					onClick={() => setConfirmDeleteLinkIdx(idx)}
					className="absolute top-0 right-0 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 z-10 cursor-pointer"
					title="Delete Link"
				>
					<TrashIcon className="w-5 h-5" />
				</button>
			)}
			<Link
				{...link}
				className={fadingOutLinkIdx === idx ? 'animate-fadeout' : 'animate-fadein'}
				disabled={deleteMode}
			/>
		</div>
	)
}

export const Section = ({
	section,
	getLinkId,
	onAddLink,
	deleteMode,
	onDeleteSection,
	onDeleteLink
}) => {
	const [confirmDeleteSection, setConfirmDeleteSection] = useState(false)
	const [confirmDeleteLinkIdx, setConfirmDeleteLinkIdx] = useState(null)
	const [fadingOutLinkIdx, setFadingOutLinkIdx] = useState(null)
	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-2xl font-semibold">{section.title}</h2>
				<div className="flex items-center gap-2">
					{deleteMode && (
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
						className="ml-2 p-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center cursor-pointer"
						title="Add Link"
					>
						<PlusIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
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
					section.links.map((link, idx) => (
						<LinkSortableItem
							key={getLinkId(link)}
							link={link}
							idx={idx}
							getLinkId={getLinkId}
							deleteMode={deleteMode}
							setConfirmDeleteLinkIdx={setConfirmDeleteLinkIdx}
							fadingOutLinkIdx={fadingOutLinkIdx}
						/>
					))
				)}
			</div>
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
			<Modal
				open={confirmDeleteLinkIdx !== null}
				onClose={() => setConfirmDeleteLinkIdx(null)}
				title="Delete Link?"
			>
				<div>Are you sure you want to delete this link?</div>
				<div className="flex gap-2 mt-4 justify-end">
					<button
						onClick={() => setConfirmDeleteLinkIdx(null)}
						className="px-3 py-1 rounded bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							setFadingOutLinkIdx(confirmDeleteLinkIdx)
							setTimeout(() => {
								onDeleteLink(confirmDeleteLinkIdx)
								setFadingOutLinkIdx(null)
								setConfirmDeleteLinkIdx(null)
							}, 400)
						}}
						className="px-3 py-1 rounded bg-red-600 text-white cursor-pointer"
					>
						Delete
					</button>
				</div>
			</Modal>
		</div>
	)
}
