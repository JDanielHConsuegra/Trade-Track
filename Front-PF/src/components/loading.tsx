import { MdDownloading } from 'react-icons/md';

export const Loading: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-8">
            <MdDownloading className="animate-spin text-9xl text-blue-500 mx-auto my-8" />
                <h1 className="text-center text-5xl font-bold text-blue-950">
                    {text}
                </h1>
            </div>
    );
}