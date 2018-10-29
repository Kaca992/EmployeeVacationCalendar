import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './loginForm.scss';
import { Header, Form, Button, InputOnChangeData, Input, Label, Segment } from 'semantic-ui-react';
import { LoginFormStrings } from '../../common/strings';
import { emptyAndNonWhitespaceInput, emailValidation } from '../../utils/validation';
import fetcher from '../../utils/fetcher';
import { IErrorObject } from '../../common/appDataStructures';
import { RouteComponentProps, withRouter } from 'react-router';
import { History } from 'history';
import * as appActions from '@actions/app';

interface ILoginFormOwnProps extends RouteComponentProps<any> {

}

interface ILoginFormProps extends ILoginFormOwnProps {
    loginUser(email: string, password: string, history: History);
}

function mapStateToProps(state: IRootReducerState, ownProps: ILoginFormOwnProps): Partial<ILoginFormProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<ILoginFormProps> {
    return {
        loginUser: (email: string, password: string, history: History) => dispatch(appActions.loginUser(email, password, history))
    };
}

interface ILoginFormState {
    email: string;
    password: string;
    loginInProgress: boolean;
    emailError: string | null;
    passwordError: string | null;
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
        const { email, password, loginInProgress, emailError, passwordError } = this.state;
        const loginBtnEnabled = !passwordError && !emailError;

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
                    <Button primary fluid size='large' onClick={this._onLogin} loading={loginInProgress} disabled={!loginBtnEnabled}>
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
        const { loginUser, history } = this.props;
        const { email, password } = this.state;
        if (!this._isValidInput()) {
            return;
        }

        this.setState({ loginInProgress: true });

        loginUser(email, password, history)
            .catch((error: IErrorObject) => {
                this.setState({
                    emailError: error.body.message,
                    passwordError: error.body.message,
                    loginInProgress: false
                });
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm));
