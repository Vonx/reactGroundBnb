
import React from 'react';
import handleViewport from 'react-in-viewport';


const Block = (props: { inViewport: boolean }) => {
    const { inViewport, innerRef, component: Component, ...rest } = props;
    const displayedComp = inViewport ? <Component { ...props} {...rest} /> : <div className="navBoxContainer">.</div>;
    return (
        <div className="viewport-block" ref={innerRef}>
            <div>{displayedComp}</div>
        </div>
    );
};

export const ViewportBlock = handleViewport(Block);
