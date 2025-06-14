import { Modal } from './Modal'
import { Field, Input, Label } from '@headlessui/react'

export const AddLinkModal = ({ open, onClose, newLink, setNewLink, onAddLink }) => (
	<Modal open={open} onClose={onClose} title="Add Link">
		<Field className="mb-4">
			<Label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
				Title
			</Label>
			<Input
				placeholder="Title"
				value={newLink.title}
				onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
				className="border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-2 text-base bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
			/>
		</Field>
		<Field className="mb-4">
			<Label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
				Href
			</Label>
			<Input
				placeholder="Href"
				value={newLink.href}
				onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
				className="border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-2 text-base bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
			/>
		</Field>
		<Field className="mb-4">
			<Label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
				Image src <span className="text-xs text-neutral-400">(optional)</span>
			</Label>
			<Input
				placeholder="Image src (optional)"
				value={newLink.src}
				onChange={(e) => setNewLink({ ...newLink, src: e.target.value })}
				className="border border-neutral-300 dark:border-neutral-700 rounded-lg px-2 py-2 text-base bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
			/>
		</Field>
		<div className="flex gap-3 justify-end mt-8">
			<button
				onClick={onClose}
				className="px-5 py-2 rounded-lg font-medium bg-neutral-700 dark:bg-neutral-700 text-neutral-200 dark:text-neutral-200 hover:bg-neutral-600 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-colors"
			>
				Cancel
			</button>
			<button
				onClick={onAddLink}
				className="px-5 py-2 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
			>
				Add
			</button>
		</div>
	</Modal>
)
