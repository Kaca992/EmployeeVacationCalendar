import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './loginForm.scss';
import { Header, Form, Button, InputOnChangeData, Input, Label, Segment } from 'semantic-ui-react';
import { LoginFormStrings } from '../../common/strings';
import { emptyAndNonWhitespaceInput, emailValidation } from '../../utils/validation';
import fetcher from '../../utils/fetcher';
import { withRouter, RouteComponentProps } from 'react-router';

interface ILoginFormProps {

}

interface ILoginFormState {
    email: string;
    password: string;
    loginInProgress: boolean;
    emailError: string | null;
    passwordError: string | null;
}

export default class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginInProgress: false,
            emailError: null,
            passwordError: null
        };
    }

    public render() {
        const { email, password, loginInProgress, emailError, passwordError } = this.state;

        return (
            <div className="login-form">
                <Header className="login-form__header" as='h2' textAlign='center'>
                    {/* <Image src='/logo.png' /> Log-in to your account */}
                    {LoginFormStrings.Header}
                </Header>
                <Segment className="login-form__fields">
                    <Form.Field>
                        <Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder={LoginFormStrings.EmailPlaceholder}
                            value={email}
                            error={!!emailError}
                            onChange={this._onEmailChanged}
                        />
                        {emailError && <Label basic color='red' pointing>
                            {emailError}
                        </Label>}
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder={LoginFormStrings.PasswordPlaceholder}
                            type='password'
                            value={password}
                            error={!!passwordError}
                            onChange={this._onPasswordChanged}
                        />
                        {passwordError && <Label basic color='red' pointing>
                            {passwordError}
                        </Label>}
                    </Form.Field>
                    <Button primary fluid size='large' onClick={this._onLogin} loading={loginInProgress}>
                        {LoginFormStrings.LoginBtn}
                    </Button>
                </Segment>
            </div>
        );
    }

    private _onEmailChanged = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ email: data.value, emailError: null });
    }

    private _onPasswordChanged = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ password: data.value, passwordError: null });
    }

    private _onLogin = () => {
        const { email, password } = this.state;
        if (!this._isValidInput()) {
            return;
        }

        this.setState({ loginInProgress: true });

        fetcher.fetch('/api/login', {
            jsonResponseExpected: true,
            requestInit: {
                method: 'POST',
                body: JSON.stringify({ email: email && email.trim(), password })
            }
        });
    }

    private _isValidInput = (): boolean => {
        const { email, password } = this.state;
        const passwordError = emptyAndNonWhitespaceInput(password);
        const emailError = emailValidation(email);

        this.setState({ emailError, passwordError });
        return !passwordError && !emailError;
    }
}
