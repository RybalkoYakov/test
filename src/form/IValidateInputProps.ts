export interface IValidateInputProps {
	value: string,
	confirmValue?: string
	element: HTMLInputElement
	confirmElement?: HTMLInputElement
	reg?: RegExp
}