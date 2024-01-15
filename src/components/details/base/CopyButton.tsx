/** @jsxImportSource preact */
import type { FC, PropsWithChildren } from 'preact/compat'
import { useState } from 'preact/hooks'

type CopyButtonProps = {
	copyText: string
	actionText?: string
	feedbackText?: string
}

const ACTION_TEXT = 'Copy'
const FEEDBACK_TEXT = 'Copied!'

const CopyButton: FC<PropsWithChildren<CopyButtonProps>> = ({
	children,
	copyText,
	actionText = ACTION_TEXT,
	feedbackText = FEEDBACK_TEXT
}) => {
	const [tooltipText, setTooltipText] = useState(actionText)

	const copyCallback = () => {
		navigator.clipboard.writeText(copyText)

		setTooltipText(feedbackText)
		setTimeout(() => {
			setTooltipText(actionText)
		}, 5000)
	}

	return (
		<div class="group relative">
			<button type={'button'} onClick={copyCallback}>
				{children}
			</button>
			<div class="absolute -top-1 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center opacity-0 transition-opacity group-hover:opacity-100">
				<div class="rounded-lg bg-hd-grey/10 px-2.5 py-1 backdrop-blur dark:bg-hd-grey/60">
					<span class="select-none text-sm font-light">{tooltipText}</span>
				</div>
				<div class="relative top-[-1px] h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-hd-grey/10 backdrop-blur dark:border-t-hd-grey/60"></div>
			</div>
		</div>
	)
}

export default CopyButton
