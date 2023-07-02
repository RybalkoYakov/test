export function stringToHTML(str: string): HTMLElement {
	const domParser = new DOMParser();
	const document = domParser.parseFromString(str, 'text/html');
	return document.body.firstChild as HTMLElement;
}