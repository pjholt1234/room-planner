interface UpIconProps {
    className?: string;
}

const UpIcon = ({ className = '' }: UpIconProps) => {
    return (
        <span className={`material-symbols-outlined ${className}`}>
            expand_less
        </span>
    );
};
export default UpIcon;
