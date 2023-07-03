import template from './template.html';
import './styles.scss';
import {stringToHTML} from "../utils/stringToHTML";
import {UserEvents} from "../utils/userEvents";

const MODAL_PROPS = {
	classList: {
		hideModalWindow: 'hide__modal_window'
	}
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