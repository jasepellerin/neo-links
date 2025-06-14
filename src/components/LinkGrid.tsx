import { useState } from 'react'
import { Link } from './Link'

const initialLinkSections = [
	{
		title: 'Main',
		links: [
			{
				href: 'https://www.google.com',
				title: 'Google',
				src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
			},
			{
				href: 'https://www.google.com',
				title: 'Google',
				src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
			},
			{
				href: 'https://www.google.com',
				title: 'Google',
				src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
			}
		]
	}
]

export const LinkGrid = () => {
	const [linkSections, setLinkSections] = useState(initialLinkSections)

	const handleAddLink = ({ href, title, src }: { href: string; title: string; src: string }) => {
		setLinkSections([
			...linkSections,
			{
				title: 'Main',
				links: [
					...linkSections[0].links,
					{
						href,
						title,
						src
					}
				]
			}
		])
	}

	const handleRemoveLink = (sectionTitle: string, href: string) => {
		setLinkSections(
			linkSections.map((section) =>
				section.title === sectionTitle
					? { ...section, links: section.links.filter((link) => link.href !== href) }
					: section
			)
		)
	}

	const handleReorderLink = (sectionTitle: string, href: string, newIndex: number) => {
		const section = linkSections.find((internalSection) => internalSection.title === sectionTitle)
		if (!section) return

		const newLinks = section.links.filter((link) => link.href !== href)
		newLinks.splice(
			newIndex,
			0,
			section.links.find((link) => link.href === href)
		)

		setLinkSections(
			linkSections.map((s) => (s.title === sectionTitle ? { ...s, links: newLinks } : s))
		)
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
			<h1>Neo Links</h1>
			{linkSections.map((section) => (
				<div key={section.title}>
					<h2>{section.title}</h2>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '10px' }}>
						{section.links.map((link) => (
							<Link key={link.href} {...link} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
