import './styles';
import {form} from "./form/Form";
import {modal} from "./modal/Modal";

const root = document.body;
root.append(form().render(), modal().render());
