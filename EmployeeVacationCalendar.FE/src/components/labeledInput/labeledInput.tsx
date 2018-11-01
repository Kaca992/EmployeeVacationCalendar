import * as classNames from 'classnames';
import * as React from 'react';
import { InputProps, Label, Input } from 'semantic-ui-react';

import './labeledInput.scss';

export interface ILabeledInputProps extends InputProps {
    errorMessage?: string | null;
}

export default class LabeledInput extends React.Component<ILabeledInputProps> {
    public render() {
        const { errorMessage, ...inputProps } = this.props;

        return <div className="labeled-input">
            <Input
                {...inputProps}
                error={!!errorMessage}
            />
            {errorMessage && <Label className="labeled-input__error-label" basic color='red' pointing>
                {errorMessage}
            </Label>}
        </div>;
    }
}
