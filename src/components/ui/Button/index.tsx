import React from 'react'

type Propstypes = {
    type: "button" | "submit"| "reset" | undefined;
    onClick?: () => void;
    children: React.ReactNode;
    variant? :string;
    className?: string | undefined;
}
function Button(props: Propstypes) {
    const { type, onClick, children,variant, className } = props
    return (
        <>
            <button
            type={type}
             className={`" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" ${variant} ${className}`} 
             onClick={onClick}
             >

                {children}
            </button>
        </>
    )
}

export default Button
