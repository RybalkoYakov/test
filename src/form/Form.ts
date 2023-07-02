import './styles.scss';
import template from './template.html';
import {stringToHTML} from "../utils/stringToHTML";
import bgImg from './../assets/form_bg_img.svg';

const FORM_PROPS = {
	classList: {
		opacityZero: 'opacity_zero',
		opacityFull: 'opacity_full'
	}
}

export function form() {
	const element = stringToHTML(template);

	// HTMLInput elements
	const firstNameElement = element.querySelector('#registration_form__first_name') as HTMLInputElement;
	const lastNameElement = element.querySelector('#registration_form__last_name') as HTMLInputElement;
	const nationalityElement = element.querySelector('#registration_form__nationality') as HTMLSelectElement;
	const emailElement = element.querySelector('#registration_form__email') as HTMLInputElement;
	const birthDateElement = element.querySelector('#registration_form__birth_date') as HTMLSelectElement;
	const birthMonthElement = element.querySelector('#registration_form__birth_month') as HTMLSelectElement;
	const birthYearElement = element.querySelector('#registration_form__birth_year') as HTMLSelectElement;
	const maleGenderElement = element.querySelector('#registration_form__male') as HTMLInputElement;
	const femaleGenderElement = element.querySelector('#registration_form__female') as HTMLInputElement;
	const passwordElement = element.querySelector('#registration_form__password') as HTMLInputElement;
	const confirmPasswordElement = element.querySelector('#registration_form__confirm_password') as HTMLInputElement;

	[maleGenderElement, femaleGenderElement].forEach(gender => {
		gender.addEventListener('input', () => {
			console.log(gender.value)
		})
	})

	function setSvgBg() {
		element.style.backgroundImage = `url(${bgImg})`;
		element.style.backgroundRepeat = `no-repeat`;
		element.style.backgroundPosition = `bottom right`;
	}

	function setFadeInAnimation() {
		const pageContent = element.querySelector('.registration_form');
		const fadeIinElements = Array.from(pageContent.children) as HTMLDivElement[];

		for (const fadeIinElement of fadeIinElements) {
			fadeIinElement.classList.add(FORM_PROPS.classList.opacityZero);
		}

		let currentElement = 0;
		const length = fadeIinElements.length;
		const delay = 200;

		function addFadeInClass() {
			if (currentElement >= length) return;
			setTimeout(() => {
				fadeIinElements[currentElement].classList.add(FORM_PROPS.classList.opacityFull);
				currentElement++;
				addFadeInClass();
			}, delay)
		}

		addFadeInClass();
	}

	function init() {
		setSvgBg();
		setFadeInAnimation();
	}

	return {
		render() {
			init();
			return element;
		}
	};
}