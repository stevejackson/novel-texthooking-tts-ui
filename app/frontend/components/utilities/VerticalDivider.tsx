import React from 'react';

const VerticalDivider: React.FC = () => {
    return (
        <div className="flex flex-col justify-around">
            <div className="h-75/100
                            min-h-75/100
                            w-[2px]
                            mr-[15px]
                            ml-[15px]
                            bg-neutral-300 dark:bg-white/10" />
        </div>
    );
};

export default VerticalDivider;