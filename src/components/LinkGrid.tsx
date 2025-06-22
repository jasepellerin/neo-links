import { useState, useEffect, useRef } from 'react'
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	closestCorners,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Section } from './Section'
import { initialLinkSections, getLinkId } from '../data/links'
import { AddSectionModal } from './AddSectionModal'
import { AddLinkModal } from './AddLinkModal'
import { TrashIcon, PlusIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid'
import { Link } from './Link'
import { MoveLinksModal } from './MoveLinksModal'
import { ActionBar } from './ActionBar'
import { Modal } from './Modal'

export const LinkGrid = () => {
	const [linkSections, setLinkSections] = useState(() => {
		const stored = typeof window !== 'undefined' ? localStorage.getItem('neo-links-sections') : null
		return stored ? JSON.parse(stored) : initialLinkSections
	})
	const [newSectionTitle, setNewSectionTitle] = useState('')
	const [newLink, setNewLink] = useState({ href: '', title: '', src: '', section: '' })
	const [showSectionModal, setShowSectionModal] = useState(false)
	const [showLinkModal, setShowLinkModal] = useState(false)
	const [editMode, setEditMode] = useState<'move' | 'delete' | null>(null)
	const [activeId, setActiveId] = useState<string | null>(null)
	const [selectedLinkIds, setSelectedLinkIds] = useState<string[]>([])
	const [showMoveLinksModal, setShowMoveLinksModal] = useState(false)
	const [showConfirmDeleteSelectedModal, setShowConfirmDeleteSelectedModal] = useState(false)

	const fileInputRef = useRef<HTMLInputElement>(null)
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const findLink = (id: string) => {
		for (const section of linkSections) {
			const link = section.links.find((l) => getLinkId(l) === id)
			if (link) return { link, sectionTitle: section.title }
		}
		return null
	}
	const activeLink = activeId ? findLink(activeId)?.link : null

	useEffect(() => {
		setSelectedLinkIds([])
	}, [editMode])

	const handleAddSection = () => {
		if (!newSectionTitle.trim()) return
		if (linkSections.some((section) => section.title === newSectionTitle.trim())) return
		setLinkSections([...linkSections, { title: newSectionTitle.trim(), links: [] }])
		setNewSectionTitle('')
		setShowSectionModal(false)
	}

	// Don't allow duplicate links w/ same key
	const handleAddLink = () => {
		const { href, title, src, section } = newLink
		if (!href || !title || !section) return

		if (linkSections.some((s) => s.links.some((l) => l.href === href && l.title === title))) {
			alert('Cannot add duplicate link')
			return
		}

		setLinkSections(
			linkSections.map((s) =>
				s.title === section ? { ...s, links: [...s.links, { href, title, src }] } : s
			)
		)
		setNewLink({ href: '', title: '', src: '', section: '' })
		setShowLinkModal(false)
	}

	const handleDeleteSection = (title) => {
		setLinkSections(linkSections.filter((s) => s.title !== title))
	}

	const handleDeleteLink = (sectionTitle, linkIdx) => {
		setLinkSections(
			linkSections.map((s) =>
				s.title === sectionTitle ? { ...s, links: s.links.filter((_, i) => i !== linkIdx) } : s
			)
		)
	}

	const handleDeleteSelectedLinks = () => {
		setLinkSections((sections) =>
			sections.map((s) => ({
				...s,
				links: s.links.filter((l) => !selectedLinkIds.includes(getLinkId(l)))
			}))
		)
		setSelectedLinkIds([])
		setShowConfirmDeleteSelectedModal(false)
	}

	const handleMoveSelectedLinks = (destinationSectionTitle: string) => {
		const linksToMove = []
		const newSections = linkSections.map((s) => {
			const links = s.links.filter((l) => {
				const id = getLinkId(l)
				if (selectedLinkIds.includes(id)) {
					linksToMove.push(l)
					return false
				}
				return true
			})
			return { ...s, links }
		})

		const destSectionIndex = newSections.findIndex((s) => s.title === destinationSectionTitle)
		if (destSectionIndex > -1) {
			newSections[destSectionIndex].links.push(...linksToMove)
		}

		setLinkSections(newSections)
		setSelectedLinkIds([])
		setShowMoveLinksModal(false)
	}

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over) {
			setActiveId(null)
			return
		}

		if (active.id === over.id) {
			setActiveId(null)
			return
		}

		const activeSectionTitle = active.data.current?.sortable.containerId
		const overSectionTitle = over.data.current?.sortable.containerId

		// Only allow reordering within the same section
		if (activeSectionTitle === overSectionTitle) {
			const activeLinkIdx = active.data.current?.sortable.index
			const overLinkIdx = over.data.current?.sortable.index

			setLinkSections((sections) => {
				const sectionIdx = sections.findIndex((s) => s.title === activeSectionTitle)
				if (sectionIdx === -1) return sections
				const newSections = [...sections]
				const newLinks = arrayMove(newSections[sectionIdx].links, activeLinkIdx, overLinkIdx)
				newSections[sectionIdx] = {
					...newSections[sectionIdx],
					links: newLinks
				}
				return newSections
			})
		}

		setActiveId(null)
	}

	const handleExport = () => {
		const dataStr = JSON.stringify(linkSections, null, 2)
		const blob = new Blob([dataStr], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'neo-links-export.json'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
		localStorage.setItem('neo-links-sections', JSON.stringify(linkSections))
	}

	const handleImportClick = () => {
		fileInputRef.current?.click()
	}

	const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = (event) => {
			try {
				const imported = JSON.parse(event.target?.result as string)
				if (!Array.isArray(imported)) throw new Error('Invalid format')
				setLinkSections(imported)
			} catch (err) {
				alert('Failed to import: ' + (err as Error).message)
			}
		}
		reader.readAsText(file)
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div
				ref={scrollContainerRef}
				className="flex flex-col gap-2.5 px-4 pt-4 pb-32 h-screen overflow-y-auto bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-200"
			>
				<div className="flex flex-col sm:flex-row mb-4 gap-2">
					<h1 className="text-4xl font-bold">Neo Links</h1>
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-2">
							<button
								onClick={handleExport}
								className="p-2 rounded bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
								title="Export Links"
							>
								Export
							</button>
							<button
								onClick={handleImportClick}
								className="p-2 rounded bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
								title="Import Links"
							>
								Import
							</button>
							<input
								type="file"
								accept=".json,.txt,application/json,text/plain"
								ref={fileInputRef}
								onChange={handleImport}
								style={{ display: 'none' }}
							/>
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setEditMode((m) => (m === 'move' ? null : 'move'))}
								className={`p-2 rounded-full ${editMode === 'move' ? 'bg-indigo-600 text-white' : 'bg-neutral-300 dark:bg-neutral-700'}  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center cursor-pointer`}
								title="Move Links"
							>
								<ArrowsPointingOutIcon className="w-5 h-5" />
							</button>
							<button
								onClick={() => setEditMode((m) => (m === 'delete' ? null : 'delete'))}
								className={`p-2 rounded-full ${editMode === 'delete' ? 'bg-red-600 text-white' : 'bg-neutral-300 dark:bg-neutral-700'} hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center cursor-pointer`}
								title="Delete Links"
							>
								<TrashIcon className="w-5 h-5" />
							</button>
							<button
								onClick={() => setShowSectionModal(true)}
								className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center cursor-pointer"
								title="Add Section"
							>
								<PlusIcon className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
				<AddSectionModal
					open={showSectionModal}
					onClose={() => setShowSectionModal(false)}
					newSectionTitle={newSectionTitle}
					setNewSectionTitle={setNewSectionTitle}
					onAddSection={handleAddSection}
				/>
				<AddLinkModal
					open={showLinkModal}
					onClose={() => setShowLinkModal(false)}
					newLink={newLink}
					setNewLink={setNewLink}
					onAddLink={handleAddLink}
				/>
				{linkSections.map((section) => (
					<Section
						key={section.title}
						section={section}
						getLinkId={getLinkId}
						onAddLink={() => {
							setNewLink({ href: '', title: '', src: '', section: section.title })
							setShowLinkModal(true)
						}}
						editMode={editMode}
						onDeleteSection={() => handleDeleteSection(section.title)}
						onDeleteLink={(idx) => handleDeleteLink(section.title, idx)}
						selectedLinkIds={selectedLinkIds}
						onToggleSelectLink={(linkId) => {
							setSelectedLinkIds((current) =>
								current.includes(linkId)
									? current.filter((id) => id !== linkId)
									: [...current, linkId]
							)
						}}
					/>
				))}
			</div>
			<DragOverlay>{activeLink ? <Link {...activeLink} /> : null}</DragOverlay>
			{editMode && selectedLinkIds.length > 0 && (
				<ActionBar
					selectedCount={selectedLinkIds.length}
					onMove={editMode === 'move' ? () => setShowMoveLinksModal(true) : undefined}
					onDelete={
						editMode === 'delete' ? () => setShowConfirmDeleteSelectedModal(true) : undefined
					}
				/>
			)}
			<MoveLinksModal
				open={showMoveLinksModal}
				onClose={() => setShowMoveLinksModal(false)}
				sections={linkSections.map((s) => s.title)}
				onMoveLinks={handleMoveSelectedLinks}
			/>
			<Modal
				open={showConfirmDeleteSelectedModal}
				onClose={() => setShowConfirmDeleteSelectedModal(false)}
				title={`Delete ${selectedLinkIds.length} links?`}
			>
				<div>Are you sure you want to delete the selected links? This action cannot be undone.</div>
				<div className="flex gap-2 mt-4 justify-end">
					<button
						onClick={() => setShowConfirmDeleteSelectedModal(false)}
						className="px-3 py-1 rounded bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={handleDeleteSelectedLinks}
						className="px-3 py-1 rounded bg-red-600 text-white"
					>
						Delete
					</button>
				</div>
			</Modal>
		</DndContext>
	)
}
