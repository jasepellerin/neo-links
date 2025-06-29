import { LinkIcon } from '@heroicons/react/24/solid'

export const Link = ({
	href,
	title,
	src,
	className,
	disabled,
	editMode
}: {
	href: string
	title: string
	src: string
	className?: string
	disabled?: boolean
	editMode?: boolean
}) => {
	const showSrc = src && src.trim() !== ''
	const Tag = disabled ? 'div' : 'a'

	const props = disabled ? {} : { href, target: '_blank', rel: 'noopener noreferrer' }

	return (
		<div className={`w-[100%] relative group ${className || ''}`}>
			<Tag {...props} className={`flex flex-col items-center justify-start gap-1 h-22`}>
				<div
					className={`relative w-14 h-14 flex items-center justify-center ${disabled ? '' : 'group-hover:ring-2 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-600 transition-all duration-150 scale-100 group-hover:scale-105'}`}
				>
					<div className={'flex items-center justify-center'}>
						{showSrc ? (
							<img src={src} alt={title.slice(0, 5)} className="w-full h-full object-contain" />
						) : (
							<LinkIcon className="w-full aspect-square text-neutral-400 dark:text-neutral-500" />
						)}
					</div>
				</div>
				<p
					className={`text-[10px] text-neutral-800 dark:text-neutral-100 ${disabled ? '' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition'} text-center select-none line-clamp-2 w-[100%] wrap-anywhere`}
				>
					{title}
				</p>
			</Tag>
		</div>
	)
}
