import { fieldRequiredMessage, emailInvalid } from "@common/strings";

export function emptyAndNonWhitespaceInput(newInput: string) {
    let isEmpty = false;

    if (!newInput) {
        isEmpty = true;
    } else if (!newInput.trim()) {
        isEmpty = true;
    }

    return isEmpty ? fieldRequiredMessage : null;
}

export function emailValidation(email: string) {
    const cleanEmail = email ? email.trim() : email;

    const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const check = emptyAndNonWhitespaceInput(cleanEmail);
    if (check) {
        return check;
    }

    if (!regex.test(cleanEmail)) {
        return emailInvalid;
    }

    return null;
}
