import { useState } from 'react'
import { Link } from './Link'
import { Section } from './Section'
import { initialLinkSections, getLinkId } from '../data/links'
import { AddSectionModal } from './AddSectionModal'
import { AddLinkModal } from './AddLinkModal'

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
		if (!href || !title || !section) return
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
		<div className="flex flex-col gap-2.5 p-4 min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-4xl font-bold">Neo Links</h1>
				<button
					onClick={() => setShowSectionModal(true)}
					className="ml-4 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex items-center justify-center"
					title="Add Section"
				>
					<span className="text-2xl leading-none">＋</span>
				</button>
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
					/>
				))}
			</Section.DragDropContext>
		</div>
	)
}
