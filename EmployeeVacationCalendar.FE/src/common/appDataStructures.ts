export interface IAction {
    type: string;
    payload?: any;
    error?: any;
}

export interface IErrorObject {
    body: {
        message: string;
    };
}
