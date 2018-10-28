import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './loginForm.scss';
import { Header, Form, Button, InputOnChangeData } from 'semantic-ui-react';
import { LoginFormStrings } from '../../common/strings';
import { emptyAndNonWhitespaceInput, emailValidation } from '../../utils/validation';

interface ILoginFormProps {

}

interface ILoginFormState {
    email: string;
    password: string;
    loginInProgress: boolean;
    emailError: string | null;
    passwordError: string | null;
}

function mapStateToProps(state: IRootReducerState): Partial<ILoginFormProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<ILoginFormProps> {
    return {

    };
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
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
        const { email, password, loginInProgress } = this.state;

        return (
            <div className="login-form">
                <Header className="login-form__header" as='h2' textAlign='center'>
                    {/* <Image src='/logo.png' /> Log-in to your account */}
                    {LoginFormStrings.Header}
                </Header>
                <Form className="login-form__inputs">
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder={LoginFormStrings.EmailPlaceholder}
                        value={email}
                        onChange={this._onEmailChanged}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder={LoginFormStrings.PasswordPlaceholder}
                        type='password'
                        value={password}
                        onChange={this._onPasswordChanged}
                    />

                    <Button primary fluid size='large' onClick={this._onLogin} loading={loginInProgress}>
                        {LoginFormStrings.LoginBtn}
                    </Button>
                </Form>
            </div>
        );
    }

    private _onEmailChanged = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ email: data.value, emailError: null, passwordError: null });
    }

    private _onPasswordChanged = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ password: data.value, emailError: null, passwordError: null });
    }

    private _onLogin = () => {
        if (!this._isValidInput()) {
            return;
        }

        this.setState({ loginInProgress: true });
    }

    private _isValidInput = (): boolean => {
        const { email, password } = this.state;
        const passwordError = emptyAndNonWhitespaceInput(password);
        const emailError = emailValidation(email);

        this.setState({ emailError, passwordError });
        return !passwordError && !emailError;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
