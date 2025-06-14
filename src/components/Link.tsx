export const Link = ({ href, title, src }: { href: string; title: string; src: string }) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '10px',
				textDecoration: 'none'
			}}
		>
			<div
				style={{
					backgroundColor: 'white',
					padding: '10px',
					borderRadius: '10px',
					width: '50px',
					height: '50px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<img src={src} alt={title} style={{ width: '100%' }} />
			</div>
			<p>{title}</p>
		</a>
	)
}
