
interface IProps {
    text: string;
}

export const NotFound: React.FC<IProps> = ({text}) => {
    return (
        <div>
            <p className="text-center hover:bg-blue-50 cursor-pointer transition-colors duration-500 mt-10 mb-10 text-2xl font-bold text-gray-500 border p-3 ">{text} </p>
        </div>
    )
}