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
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
			<h1>Neo Links</h1>
			<div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
				<button onClick={() => setShowSectionModal(true)} style={{ padding: '4px 10px' }}>
					Add Section
				</button>
				<button onClick={() => setShowLinkModal(true)} style={{ padding: '4px 10px' }}>
					Add Link
				</button>
			</div>
			<Modal open={showSectionModal} onClose={() => setShowSectionModal(false)} title="Add Section">
				<input
					type="text"
					placeholder="New section title"
					value={newSectionTitle}
					onChange={(e) => setNewSectionTitle(e.target.value)}
					style={{ padding: '4px', fontSize: '1rem' }}
				/>
				<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
					<button onClick={() => setShowSectionModal(false)} style={{ padding: '4px 10px' }}>
						Cancel
					</button>
					<button onClick={handleAddSection} style={{ padding: '4px 10px' }}>
						Add
					</button>
				</div>
			</Modal>
			<Modal open={showLinkModal} onClose={() => setShowLinkModal(false)} title="Add Link">
				<input
					placeholder="Href"
					value={newLink.href}
					onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
					style={{ padding: '4px', fontSize: '1rem' }}
				/>
				<input
					placeholder="Title"
					value={newLink.title}
					onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
					style={{ padding: '4px', fontSize: '1rem' }}
				/>
				<input
					placeholder="Image src"
					value={newLink.src}
					onChange={(e) => setNewLink({ ...newLink, src: e.target.value })}
					style={{ padding: '4px', fontSize: '1rem' }}
				/>
				<select
					value={newLink.section}
					onChange={(e) => setNewLink({ ...newLink, section: e.target.value })}
					style={{ padding: '4px', fontSize: '1rem' }}
				>
					<option value="">Section</option>
					{linkSections.map((section) => (
						<option key={section.title} value={section.title}>
							{section.title}
						</option>
					))}
				</select>
				<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
					<button onClick={() => setShowLinkModal(false)} style={{ padding: '4px 10px' }}>
						Cancel
					</button>
					<button onClick={handleAddLink} style={{ padding: '4px 10px' }}>
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
