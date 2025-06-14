import { useState, useEffect, useRef } from 'react'
import { Link } from './Link'
import { Section } from './Section'
import { initialLinkSections, getLinkId } from '../data/links'
import { AddSectionModal } from './AddSectionModal'
import { AddLinkModal } from './AddLinkModal'
import { TrashIcon, PlusIcon, ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'

export const LinkGrid = () => {
	const [linkSections, setLinkSections] = useState(() => {
		const stored = typeof window !== 'undefined' ? localStorage.getItem('neo-links-sections') : null
		return stored ? JSON.parse(stored) : initialLinkSections
	})
	const [newSectionTitle, setNewSectionTitle] = useState('')
	const [newLink, setNewLink] = useState({ href: '', title: '', src: '', section: '' })
	const [showSectionModal, setShowSectionModal] = useState(false)
	const [showLinkModal, setShowLinkModal] = useState(false)
	const [deleteMode, setDeleteMode] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleAddSection = () => {
		if (!newSectionTitle.trim()) return
		if (linkSections.some((section) => section.title === newSectionTitle.trim())) return
		setLinkSections([...linkSections, { title: newSectionTitle.trim(), links: [] }])
		setNewSectionTitle('')
		setShowSectionModal(false)
	}

	const handleAddLink = () => {
		const { href, title, src, section } = newLink
		if (!href || !title || !section) return
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

	const onDragEnd = (result) => {
		const { source, destination } = result
		if (!destination) return
		if (source.droppableId === destination.droppableId && source.index === destination.index) return

		const sourceSectionIdx = linkSections.findIndex((s) => s.title === source.droppableId)
		const destSectionIdx = linkSections.findIndex((s) => s.title === destination.droppableId)

		if (sourceSectionIdx === destSectionIdx) {
			const links = Array.from(linkSections[sourceSectionIdx].links)
			const [removed] = links.splice(source.index, 1)
			links.splice(destination.index, 0, removed)
			setLinkSections(
				linkSections.map((s, idx) => (idx === sourceSectionIdx ? { ...s, links } : s))
			)
		} else {
			const sourceLinks = Array.from(linkSections[sourceSectionIdx].links)
			const [removed] = sourceLinks.splice(source.index, 1)
			const destLinks = Array.from(linkSections[destSectionIdx].links)
			destLinks.splice(destination.index, 0, removed)
			setLinkSections(
				linkSections.map((s, idx) => {
					if (idx === sourceSectionIdx) return { ...s, links: sourceLinks }
					if (idx === destSectionIdx) return { ...s, links: destLinks }
					return s
				})
			)
		}
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

	useEffect(() => {
		localStorage.setItem('neo-links-sections', JSON.stringify(linkSections))
	}, [linkSections])

	return (
		<div className="flex flex-col gap-2.5 p-4 min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
			<div className="flex flex-col sm:flex-row mb-4 gap-2">
				<h1 className="text-4xl font-bold">Neo Links</h1>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-2">
						<button
							onClick={handleExport}
							className="p-2 rounded-full bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
							title="Export Links"
						>
							<ArrowUpTrayIcon className="w-5 h-5" />
						</button>
						<button
							onClick={handleImportClick}
							className="p-2 rounded-full bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
							title="Import Links"
						>
							<ArrowDownTrayIcon className="w-5 h-5" />
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
							onClick={() => setDeleteMode((m) => !m)}
							className={`p-2 rounded-full ${deleteMode ? 'bg-red-600' : 'bg-neutral-300 dark:bg-neutral-700'} text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center cursor-pointer`}
							title="Delete Mode"
						>
							<TrashIcon className="w-5 h-5" />
						</button>
						<button
							onClick={() => setShowSectionModal(true)}
							className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center cursor-pointer"
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
			<Section.DragDropContext onDragEnd={onDragEnd}>
				{linkSections.map((section) => (
					<Section
						key={section.title}
						section={section}
						getLinkId={getLinkId}
						Link={Link}
						onAddLink={() => {
							setNewLink({ href: '', title: '', src: '', section: section.title })
							setShowLinkModal(true)
						}}
						deleteMode={deleteMode}
						onDeleteSection={() => handleDeleteSection(section.title)}
						onDeleteLink={(idx) => handleDeleteLink(section.title, idx)}
					/>
				))}
			</Section.DragDropContext>
		</div>
	)
}
