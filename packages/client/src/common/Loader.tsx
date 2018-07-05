import './loader.css';

import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface LoaderState { }
export interface LoaderProps {
    loading?: boolean;
}

export class Loader extends React.Component<LoaderProps, LoaderState> {
    container?: HTMLSpanElement;
   
    setContainer = (element: HTMLSpanElement | null) => {
        if (!element) {
            return;
        }
    }

    render() {
        const { loading } = this.props;
        const className = classnames(
            'loader',
            loading && 'loader--loading'
        );

        return (
            // <span ref={this.setContainer} />
            <span>
                <svg viewBox="0 0 30 30" width={60} height={60} id="loader" className={className}>
                    <g strokeWidth={1} stroke="#000000">
                        <path d="M 10 10 L 10 20" id="line-left" />
                        <path d="M 10 10 L 15 15" id="line-top" />
                        <path d="M 15 15 L 20 10" />
                        <path d="M 20 10 L 20 20" />
                    </g>
                </svg>
            </span>
        );
    }
}
