import React from 'react';

const RoundedContentBox: React.FC = ({ children, outerContainerClassNames }) => {
    return (
        <div className={outerContainerClassNames}>
            <div className="max-w-6xl mx-auto px-4 pl-5 pr-5 pt-2 pb-2">
                <div className="w-full
                        mx-auto rounded-xl bg-white
                        p-6
                        shadow-lg outline outline-black/5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default RoundedContentBox;