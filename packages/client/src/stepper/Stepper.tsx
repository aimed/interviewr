import './stepper.css';

import * as React from 'react';

export interface StepperState { }
export interface StepperProps {
    step: number;
}

export class Stepper extends React.Component<StepperProps, StepperState> {
    render() {
        const { step, children } = this.props;
        const childCount = React.Children.count(children);
        const stepSanitized = Math.min(Math.max(0, step), childCount);
        const innerStyle: React.CSSProperties = {
            transform: `translateX(${-stepSanitized * 100}vw)`,
            width: `${childCount * 100}vw`
        };
        return (
            <div className="stepper">
                <div className="stepper__inner" style={innerStyle}>
                    {children}
                </div>
            </div>
        );
    }
}

export interface StepperItemProps { }

export const StepperItem: React.StatelessComponent<StepperItemProps> = props => {
    return (
        <div className="stepper__item">
            {props.children}
        </div>
    );
};
