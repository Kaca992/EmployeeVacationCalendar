import * as React from 'react';
import { connect } from 'react-redux';
import { IRootReducerState } from '@reducers/rootReducer';
import './loginContainer.scss';
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';

interface ILoginContainerProps {

}

interface ILoginContainerState {

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

    }

    public render() {
        return (
            <div className="login-container">
                <Header as='h2' color='teal' textAlign='center'>
                    {/* <Image src='/logo.png' /> Log-in to your account */}
                    Log-in to your account
                </Header>
                <Form className="login-container__form">
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail address'
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                    <Button color='teal' fluid size='large'>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
