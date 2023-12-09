interface DownIconProps {
    className?: string;
}

const DownIcon = ({ className = '' }: DownIconProps) => {
    return (
        <span className={`material-symbols-outlined ${className}`}>
            expand_more
        </span>
    );
};

export default DownIcon;
