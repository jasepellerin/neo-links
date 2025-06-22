import { LinkIcon, Bars3Icon } from '@heroicons/react/24/solid'

export const Link = ({
	href,
	title,
	src,
	className,
	disabled,
	editMode,
	attributes,
	listeners
}: {
	href: string
	title: string
	src: string
	className?: string
	disabled?: boolean
	editMode?: boolean
	attributes?: any
	listeners?: any
}) => {
	const showSrc = src && src.trim() !== ''
	const Tag = disabled ? 'div' : 'a'

	const props = disabled ? {} : { href, target: '_blank', rel: 'noopener noreferrer' }

	return (
		<div className={`w-[100%] relative group ${className || ''}`}>
			<Tag {...props} className={`flex flex-col items-center justify-start gap-1 h-18`}>
				<div
					className={`relative w-10 h-10 flex items-center justify-center ${disabled ? '' : 'group-hover:ring-2 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-600 transition-all duration-150 scale-100 group-hover:scale-105'}`}
				>
					{editMode && (
						<div
							{...attributes}
							{...listeners}
							className="absolute -top-1 -right-1 p-1 rounded-full bg-neutral-500/10 hover:bg-neutral-500/30 cursor-grab touch-none"
							onClick={(e) => {
								e.stopPropagation()
							}}
						>
							<Bars3Icon className="w-3 h-3 text-neutral-800 dark:text-neutral-100" />
						</div>
					)}
					<div className={`flex items-center justify-center ${disabled ? 'opacity-50' : ''}`}>
						{showSrc ? (
							<img src={src} alt={title.slice(0, 5)} className="w-full h-full object-contain" />
						) : (
							<LinkIcon className="w-10 h-10 text-neutral-400 dark:text-neutral-500" />
						)}
					</div>
				</div>
				<p
					className={`text-[8px] text-neutral-800 dark:text-neutral-100 ${disabled ? 'opacity-50' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition'} text-center select-none line-clamp-2 w-[100%] wrap-anywhere`}
				>
					{title}
				</p>
			</Tag>
		</div>
	)
}
