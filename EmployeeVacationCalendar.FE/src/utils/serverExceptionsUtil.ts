export function getMessageFromServerError(error: any): string {
    if (error && error.body) {
        return error.body.Message;
    }

    return "Unexpected error occurred.";
}
