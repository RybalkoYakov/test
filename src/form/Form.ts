import './styles.scss';
import template from './form.html';
import {stringToHTML} from "../utils/stringToHTML";
import bgImg from './../assets/form_bg_img.svg';
import selectArrow from './../assets/select_arrow.svg';
import {IValidateInputProps} from "./IValidateInputProps";
import {formFilledRight, formFilledWrong} from "../utils/customEvents";
import {IRequestProps} from "./IRequestProps";
import axios from "axios";

const FORM_CONSTANTS = {
	classList: {
		opacityZero: 'opacity_zero',
		opacityFull: 'opacity_full',
		errorInput: 'error_input'
	},
	animations: {
		noAnimation: '',
		shake: 'shake'
	},
	keyCodes: {
		enter: 'Enter'
	},
	events: {
		click: 'click',
		keydown: 'keydown',
		animationend: 'animationend',
		input: 'input'
	}
}

export function form() {
	// Registration form HTML
	const element = stringToHTML(template);

	// HTML submit button
	const submitButton = element.querySelector('.sign_up_page__question button') as HTMLButtonElement;

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

	function validateForm() {
		const firstName = firstNameElement.value;
		const lastName = lastNameElement.value;
		const nationality = nationalityElement.value;

		const email = emailElement.value;
		const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		const birthDate = birthDateElement.value;
		const birthMonth = birthMonthElement.value;
		const birthYear = birthYearElement.value;

		const maleGender = maleGenderElement.value;
		const femaleGender = femaleGenderElement.value;
		const gender = maleGender ? maleGender : femaleGender;

		const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		const password = passwordElement.value;
		const confirmPassword = confirmPasswordElement.value;

		const validFirstName = validateInput({
			value: firstName,
			element: firstNameElement
		}, submitButton);

		const validLastName = validateInput({
			value: lastName,
			element: lastNameElement
		}, submitButton);

		const validUserEmail = validateInput({
			value: email,
			element: emailElement,
			reg: validEmail
		}, submitButton)

		const validUserPassword = validatePassword({
			value: password,
			confirmValue: confirmPassword,
			element: passwordElement,
			confirmElement: confirmPasswordElement,
			reg: validPassword
		}, submitButton)

		const isInputsValid = validUserPassword !== null && validUserEmail !== null && validLastName !== null && validFirstName !== null;

		if (!isInputsValid) {
			setTimeout(() => {window.dispatchEvent(formFilledWrong)}, 500);
		}
		else {
			setTimeout(() => {window.dispatchEvent(formFilledRight)}, 500);
			registrationComplete();
			sendRegistrationRequest({
				firstName,
				lastName,
				nationality,
				email,
				birthDay: {
					birthDate,
					birthMonth,
					birthYear
				},
				gender,
				password
			});
		}
	}

	function validateInput(props: IValidateInputProps, button: HTMLButtonElement): string | null {
		if (!props.reg && !props.confirmElement && !props.confirmValue && !props.value) {
			setErrorAnimation(props.element, submitButton);
			return null;
		}

		if (!props.confirmValue && !props.confirmElement && props.reg && !props.reg.test(props.value)) {
			setErrorAnimation(props.element, submitButton);
			return null;
		}

		return props.value;
	}

	function validatePassword(props: IValidateInputProps, button: HTMLButtonElement) {
		const isPasswordValid = props.value === props.confirmValue	&& props.reg.test(props.value);

		if (!isPasswordValid) {
			setErrorAnimation(props.element, submitButton);
			setErrorAnimation(props.confirmElement, submitButton);
			return  null;
		}

		return props.value;
	}

	function setErrorAnimation(element: HTMLInputElement, button?: HTMLButtonElement) {
		const animationDuration = '.5s'
		const animationStyle = 'linear'

		if (element) {
			element.value = '';
			element.classList.add(FORM_CONSTANTS.classList.errorInput);
			element.style.animation = `${FORM_CONSTANTS.animations.shake} ${animationDuration} ${animationStyle}`;
			element.addEventListener(FORM_CONSTANTS.events.animationend, () => {
				element.style.animation = FORM_CONSTANTS.animations.noAnimation;
				element.addEventListener(FORM_CONSTANTS.events.input, () => {
					element.classList.remove(FORM_CONSTANTS.classList.errorInput);
				})
			})
		}

		if (button) {
			button.style.animation = `${FORM_CONSTANTS.animations.shake} ${animationDuration} ${animationStyle}`;
			button.addEventListener(FORM_CONSTANTS.events.animationend, () => {
				button.style.animation = FORM_CONSTANTS.animations.noAnimation;
			})
		}
	}

	function setFadeInAnimation() {
		const pageContent = element.querySelector('.registration_form');
		const fadeIinElements = Array.from(pageContent.children) as HTMLDivElement[];

		for (const fadeIinElement of fadeIinElements) {
			fadeIinElement.classList.add(FORM_CONSTANTS.classList.opacityZero);
		}

		let currentElement = 0;
		const length = fadeIinElements.length;
		const delay = 200;

		function addFadeInClass() {
			if (currentElement >= length) return;
			setTimeout(() => {
				fadeIinElements[currentElement].classList.add(FORM_CONSTANTS.classList.opacityFull);
				currentElement++;
				addFadeInClass();
			}, delay)
		}

		addFadeInClass();
	}

	function setSvgBg() {
		element.style.backgroundImage = `url('${bgImg}')`;
		const currentBgImg = getComputedStyle(element).backgroundImage;
		const currQuery = Math.random().toString();
		element.style.backgroundImage = currentBgImg.replace(/\?.*$/, '') + '?' + currQuery;
		element.style.backgroundRepeat = `no-repeat`;
		element.style.backgroundPosition = `bottom right`;
	}

	function resetErrorClass() {
		[
			firstNameElement,
			lastNameElement,
			emailElement,
			passwordElement,
			confirmPasswordElement
		]
			.forEach(element => {
				element.classList.remove(FORM_CONSTANTS.classList.errorInput);
			})
	}

	function setListeners() {
		submitButton.addEventListener(FORM_CONSTANTS.events.click, () => {
			resetErrorClass();
			validateForm();
		});
	}

	function registrationComplete() {
		setTimeout(() => {
			element.replaceChildren();

			const aside = document.createElement('aside');
			aside.textContent = 'Sign up';

			const content = document.createElement('div');
			content.classList.add('sign_up_page__content');

			const thanksContainer = document.createElement('div');
			thanksContainer.classList.add('sign_up_page__thanks');
			const h1 = document.createElement('h1');
			const message = document.createElement('p');
			h1.textContent = 'Thank You!'
			message.textContent = 'you registered!'
			thanksContainer.append(h1,message);

			const question = document.createElement('div');
			question.classList.add('sign_up_page__question');
			question.style.marginBottom = '10px';

			const p =document.createElement('p');
			p.textContent = 'Have an account? ';

			const a = document.createElement('a');
			a.href = '#';
			a.textContent = 'Login';

			content.append(thanksContainer, question);
			question.append(p);
			p.append(a);

			element.append(aside, content);
		}, 500)
	}

	function sendRegistrationRequest(props: IRequestProps) {
		axios.post('/registration', props)
			.then(function (response: any) {
				console.log(response);
			})
			.catch(function (error: any) {
				console.log(error);
			});
	}

	function setSelectsStyles() {
		const selects = element.querySelectorAll('select') as NodeListOf<HTMLSelectElement>;
		selects.forEach(select => {
			select.style.background =  `url('${selectArrow}') no-repeat right 8px center`;
		})
	}

	function init() {
		document.addEventListener('DOMContentLoaded', () => {
			setSvgBg();
			setFadeInAnimation();
			setListeners();
			setSelectsStyles();
		})
	}

	return {
		render() {
			init();
			return element;
		}
	};
}