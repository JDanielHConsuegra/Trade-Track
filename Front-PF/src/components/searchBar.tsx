import { AiOutlineSearch } from 'react-icons/ai';

interface Props {
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  return (
    <div className="w-screen px-0 mt-2 mx-0">
      <div className="flex justify-center items-center relative w-full">
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscador..."
          className="w-full bg-[#D9D9D9] p-2 pl-10 border border-none rounded-lg"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};