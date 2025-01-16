interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => (
    <div className={`min-h-screen bg-[#F9FAFB] p-6 ${className}`}>
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
    </div>
);
