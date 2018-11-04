export function getMessageFromServerError(error: any): string {
    if (!error) {
        return "Unexpected error occurred.";
    }

    // unauthorized
    if (error.status === 401) {
        return "Unauthorized exception. Please re-login and try again.";
    }

    if (error && error.body) {
        return error.body.Message;
    }

    return "Unexpected error occurred.";
}
