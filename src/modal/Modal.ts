import template from './template.html';
import './styles.scss';
import {stringToHTML} from "../utils/stringToHTML";

export function modal() {
	const element = stringToHTML(template);

	return {
		render() {
			return element;
		},
		setModal(message?: string) {
			element.replaceChildren(message);
		}
	};
}