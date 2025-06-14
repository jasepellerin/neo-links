import { Modal } from './Modal'
import { Field, Input, Label } from '@headlessui/react'

export const AddSectionModal = ({
	open,
	onClose,
	newSectionTitle,
	setNewSectionTitle,
	onAddSection
}) => (
	<Modal open={open} onClose={onClose} title="Add Section">
		<Field>
			<Label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
				Section Title
			</Label>
			<Input
				type="text"
				placeholder="New section title"
				value={newSectionTitle}
				onChange={(e) => setNewSectionTitle(e.target.value)}
				className="border border-neutral-300 dark:border-neutral-700 rounded px-2 py-1 text-base bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
			/>
		</Field>
		<div className="flex gap-2 justify-end mt-2">
			<button
				onClick={onClose}
				className="px-4 py-1.5 rounded-md font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 cursor-pointer"
			>
				Cancel
			</button>
			<button
				onClick={onAddSection}
				className="px-4 py-1.5 rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
			>
				Add
			</button>
		</div>
	</Modal>
)
