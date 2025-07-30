import React from 'react';

const RoundedContentBox: React.FC = ({ children, outerContainerClassNames }) => {
    return (
        <div className={outerContainerClassNames}>
            <div className="max-w-6xl mx-auto px-3 lg:px-5 pt-2 pb-2">
                <div className="w-full
                        mx-auto rounded-xl bg-white
                        p-2
                        lg:p-6
                        shadow-lg outline outline-black/5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default RoundedContentBox;