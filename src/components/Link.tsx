import { LinkIcon, TrashIcon } from '@heroicons/react/24/solid'

export const Link = ({
	href,
	title,
	src,
	className,
	disabled,
	deleteMode,
	onDelete
}: {
	href: string
	title: string
	src: string
	className?: string
	disabled?: boolean
	deleteMode?: boolean
	onDelete?: () => void
}) => {
	const showSrc = src && src.trim() !== ''
	const Tag = disabled ? 'div' : 'a'

	const props = disabled ? {} : { href, target: '_blank', rel: 'noopener noreferrer' }

	return (
		<div className={`w-[100%] relative group ${className || ''}`}>
			<Tag
				{...props}
				className={`flex flex-col items-center justify-start gap-2 h-30 ${
					disabled ? 'cursor-not-allowed' : ''
				}`}
			>
				<div
					className={`relative bg-white/90 dark:bg-neutral-800/80 p-3 rounded-2xl flex items-center justify-center shadow-md ${disabled ? '' : 'group-hover:shadow-xl group-hover:ring-2 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-600 transition-all duration-150 scale-100 group-hover:scale-105'}`}
				>
					<div className={`flex items-center justify-center ${disabled ? 'opacity-50' : ''}`}>
						{showSrc ? (
							<img src={src} alt={title} className="w-10 h-10 object-contain" />
						) : (
							<LinkIcon className="w-10 h-10" />
						)}
					</div>
					{deleteMode && (
						<button
							onClick={onDelete}
							className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 z-10 cursor-pointer"
							title="Delete Link"
						>
							<TrashIcon className="w-4 h-4" />
						</button>
					)}
				</div>
				<p
					className={`text-lg font-semibold text-neutral-800 dark:text-neutral-100 ${disabled ? 'opacity-50' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition'} text-center select-none line-clamp-2 w-[100%] wrap-anywhere`}
				>
					{title}
				</p>
			</Tag>
		</div>
	)
}
