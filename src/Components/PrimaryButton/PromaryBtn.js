import React from 'react';

const PromaryBtn = ({children}) => {
    return (
        <button className="btn btn-primary bg-gradient-to-r from-cyan-500 to-blue-500">{children}</button>
    );
};

export default PromaryBtn;