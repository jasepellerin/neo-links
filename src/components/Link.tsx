import { LinkIcon } from '@heroicons/react/24/solid'

export const Link = ({
	href,
	title,
	src,
	className,
	disabled
}: {
	href: string
	title: string
	src: string
	className?: string
	disabled?: boolean
}) => {
	const showSrc = src && src.trim() !== ''
	const Tag = disabled ? 'div' : 'a'

	const props = disabled ? {} : { href, target: '_blank', rel: 'noopener noreferrer' }

	return (
		<div className={`w-[100%] relative group ${className || ''}`}>
			<Tag {...props} className={`flex flex-col items-center justify-start gap-2 h-32`}>
				<div
					className={`relative w-16 h-16 flex items-center justify-center ${disabled ? '' : 'group-hover:ring-2 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-600 transition-all duration-150 scale-100 group-hover:scale-105'}`}
				>
					<div className={`flex items-center justify-center ${disabled ? 'opacity-50' : ''}`}>
						{showSrc ? (
							<img src={src} alt={title} className="w-full h-full object-contain" />
						) : (
							<LinkIcon className="w-10 h-10 text-neutral-400 dark:text-neutral-500" />
						)}
					</div>
				</div>
				<p
					className={`text-md font-semibold text-neutral-800 dark:text-neutral-100 ${disabled ? 'opacity-50' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition'} text-center select-none line-clamp-2 w-[100%] wrap-anywhere`}
				>
					{title}
				</p>
			</Tag>
		</div>
	)
}
