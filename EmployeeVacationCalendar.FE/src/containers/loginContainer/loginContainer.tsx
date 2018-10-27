import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './loginContainer.scss';
import { Header, Form, Button, InputOnChangeData } from 'semantic-ui-react';

interface ILoginContainerProps {

}

interface ILoginContainerState {
    email: string;
    password: string;
}

function mapStateToProps(state: IRootReducerState): Partial<ILoginContainerProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<ILoginContainerProps> {
    return {

    };
}

class LoginContainer extends React.Component<ILoginContainerProps, ILoginContainerState> {
    constructor(props: ILoginContainerProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    public render() {
        const { email, password } = this.state;

        return (
            <div className="login-container">
                <Header className="login-container__header" as='h2' textAlign='center'>
                    {/* <Image src='/logo.png' /> Log-in to your account */}
                    Log-in to your account
                </Header>
                <Form className="login-container__form">
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail address'
                        value={email}
                        onChange={this._onEmailChanged}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={this._onPasswordChanged}
                    />

                    <Button primary fluid size='large' onClick={this._onLogin}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }

    private _onEmailChanged = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ email: data.value });
    }

    private _onPasswordChanged = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.setState({ password: data.value });
    }

    private _onLogin = () => {
        return;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
