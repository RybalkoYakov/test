import {UserEvents} from "./userEvents";

export const formFilledWrong = new CustomEvent(UserEvents.formFilledWrong);
export const formFilledRight = new CustomEvent(UserEvents.formFilledRight);