import './loader.css';

import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface LoaderState { }
export interface LoaderProps {
    loading?: boolean;
}

export class Loader extends React.Component<LoaderProps, LoaderState> {
    container?: HTMLSpanElement;
    /*
    group?: svgjs.G;
    canvas?: svgjs.Doc;
    */
   
    setContainer = (element: HTMLSpanElement | null) => {
        if (!element) {
            return;
        }
        /*
        const canvas = svgjs(element);
        canvas.size(30, 40);
        
        const group = canvas.group();
        group.stroke({ width: 1 });
        
        const line1 = group.line(10, 20, 10, 30);
        const line2 = group.line(0, 0, 5, 5);
        group.line(15, 15, 20, 10);
        group.line(20, 10, 20, 20);

        line1.animate(200, '>').translate(0, -10);
        line2.animate(200, '>').translate(10, 10);
        // group.animate(500).rotate(360, 15, 15);

        canvas.scale(2, 2);
        this.canvas = canvas;
        this.container = element;
        this.group = group;
        */
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
