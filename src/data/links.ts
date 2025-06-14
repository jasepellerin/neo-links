export const initialLinkSections = [
	{
		title: 'Main',
		links: [
			{
				href: 'https://www.google.com/',
				title: 'Google 1',
				src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
			},
			{
				href: 'https://www.google.com',
				title: 'Google 2',
				src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
			},
			{
				href: 'https://www.google.com',
				title: 'Google 3',
				src: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
			}
		]
	}
]

export const getLinkId = (link: { href: string; title: string }) => `${link.href}-${link.title}`
