export function Card({ children, className = "" }) {
    return (
        <div className={`bg-gray-800 p-4 rounded-xl shadow-lg ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = "" }) {
    return (
        <div className={`p-2 ${className}`}>
            {children}
        </div>
    );
}