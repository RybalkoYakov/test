import './styles.scss';
import template from './template.html';
import {stringToHTML} from "../utils/stringToHTML";
import bgImg from './../assets/form_bg_img.svg';

export function form() {
	const element = stringToHTML(template);
	function setSvgBg() {
		element.style.backgroundImage = `url(${bgImg})`;
		element.style.backgroundRepeat = `no-repeat`;
		element.style.backgroundPosition = `bottom right`;
	}

	function init() {
		setSvgBg();
	}

	return {
		render() {
			init();
			return element;
		}
	};
}