import template from './modal.html';
import './styles.scss';
import {stringToHTML} from "../utils/stringToHTML";
import {UserEvents} from "../utils/userEvents";

const MODAL_PROPS = {
	classList: {
		hideModalWindow: 'hide__modal_window'
	},
	registrationMessage: 'Registration passed successfully.',
	errorMessage: 'All red fields must be filled with valid data. The password must have a minimum 8 characters, 1 lowercase and uppercase letter, and 1 number.'
}

export function modal() {
	const element = stringToHTML(template);
	const messageContent = element.querySelector('p') as HTMLParagraphElement;
	const closeButton = element.querySelector('button') as HTMLButtonElement;

	function setListeners() {
		closeButton.addEventListener('click', () => {
			element.classList.add(MODAL_PROPS.classList.hideModalWindow);
		})

		window.addEventListener(UserEvents.formFilledWrong, () => {
			messageContent.replaceChildren(MODAL_PROPS.errorMessage);
			element.classList.remove(MODAL_PROPS.classList.hideModalWindow);
		})

		window.addEventListener(UserEvents.formFilledRight, () => {
			messageContent.replaceChildren(MODAL_PROPS.registrationMessage);
			element.classList.remove(MODAL_PROPS.classList.hideModalWindow);
		})
	}

	function init() {
		setListeners();
	}

	return {
		render() {
			init();
			return element;
		},
		setModal(message?: string) {
			messageContent.replaceChildren(message);
		}
	};
}