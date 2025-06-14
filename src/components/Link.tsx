import { LinkIcon } from '@heroicons/react/24/solid'

export const Link = ({ href, title, src }: { href: string; title: string; src: string }) => {
	const showSrc = src && src.trim() !== ''
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex flex-col items-center justify-center gap-2 no-underline group"
		>
			<div className="bg-white/90 dark:bg-neutral-800/80 p-3 rounded-2xl w-[50px] h-[50px] flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:ring-2 group-hover:ring-indigo-400 dark:group-hover:ring-indigo-600 transition-all duration-150 scale-100 group-hover:scale-105">
				{showSrc ? (
					<img src={src} alt={title} className="w-10 h-10 object-contain" />
				) : (
					<LinkIcon className="w-10 h-10" />
				)}
			</div>
			<p className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition text-center select-none max-w-25 truncate text-ellipsis">
				{title}
			</p>
		</a>
	)
}
