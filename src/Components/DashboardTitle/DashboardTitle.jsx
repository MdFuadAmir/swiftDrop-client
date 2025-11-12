
const DashboardTitle = ({title,subTitle}) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-teal-600">{title}</h2>
            <p className="text-sm">{subTitle}</p>
        </div>
    );
};

export default DashboardTitle;