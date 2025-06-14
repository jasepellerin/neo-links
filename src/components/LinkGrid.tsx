import { useState } from 'react'
import { Link } from './Link'
import { Section } from './Section'
import { Modal } from './Modal'
import { initialLinkSections, getLinkId } from '../data/links'

export const LinkGrid = () => {
	const [linkSections, setLinkSections] = useState(initialLinkSections)
	const [newSectionTitle, setNewSectionTitle] = useState('')
	const [newLink, setNewLink] = useState({ href: '', title: '', src: '', section: '' })
	const [showSectionModal, setShowSectionModal] = useState(false)
	const [showLinkModal, setShowLinkModal] = useState(false)

	const handleAddSection = () => {
		if (!newSectionTitle.trim()) return
		if (linkSections.some((section) => section.title === newSectionTitle.trim())) return
		setLinkSections([...linkSections, { title: newSectionTitle.trim(), links: [] }])
		setNewSectionTitle('')
		setShowSectionModal(false)
	}

	const handleAddLink = () => {
		const { href, title, src, section } = newLink
		if (!href || !title || !src || !section) return
		setLinkSections(
			linkSections.map((s) =>
				s.title === section ? { ...s, links: [...s.links, { href, title, src }] } : s
			)
		)
		setNewLink({ href: '', title: '', src: '', section: '' })
		setShowLinkModal(false)
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

	return (
		<div className="flex flex-col gap-2.5 p-2">
			<h1 className="text-4xl font-bold mb-2">Neo Links</h1>
			<div className="flex gap-2 items-center mb-2">
				<button
					onClick={() => setShowSectionModal(true)}
					className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
				>
					Add Section
				</button>
				<button
					onClick={() => setShowLinkModal(true)}
					className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
				>
					Add Link
				</button>
			</div>
			<Modal open={showSectionModal} onClose={() => setShowSectionModal(false)} title="Add Section">
				<input
					type="text"
					placeholder="New section title"
					value={newSectionTitle}
					onChange={(e) => setNewSectionTitle(e.target.value)}
					className="border rounded px-2 py-1 text-base"
				/>
				<div className="flex gap-2 justify-end">
					<button
						onClick={() => setShowSectionModal(false)}
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						onClick={handleAddSection}
						className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
					>
						Add
					</button>
				</div>
			</Modal>
			<Modal open={showLinkModal} onClose={() => setShowLinkModal(false)} title="Add Link">
				<input
					placeholder="Href"
					value={newLink.href}
					onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
					className="border rounded px-2 py-1 text-base"
				/>
				<input
					placeholder="Title"
					value={newLink.title}
					onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
					className="border rounded px-2 py-1 text-base"
				/>
				<input
					placeholder="Image src"
					value={newLink.src}
					onChange={(e) => setNewLink({ ...newLink, src: e.target.value })}
					className="border rounded px-2 py-1 text-base"
				/>
				<select
					value={newLink.section}
					onChange={(e) => setNewLink({ ...newLink, section: e.target.value })}
					className="border rounded px-2 py-1 text-base"
				>
					<option value="">Section</option>
					{linkSections.map((section) => (
						<option key={section.title} value={section.title}>
							{section.title}
						</option>
					))}
				</select>
				<div className="flex gap-2 justify-end">
					<button
						onClick={() => setShowLinkModal(false)}
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						onClick={handleAddLink}
						className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
					>
						Add
					</button>
				</div>
			</Modal>
			<Section.DragDropContext onDragEnd={onDragEnd}>
				{linkSections.map((section) => (
					<Section key={section.title} section={section} getLinkId={getLinkId} Link={Link} />
				))}
			</Section.DragDropContext>
		</div>
	)
}
