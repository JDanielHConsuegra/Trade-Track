// components/LinkBlue.tsx
import Link from 'next/link'
import { getTripStatus } from '@/helpers/getTripStatus'

interface IProps {
  text: string
  href: string
  date?: Date
}

export const LinkBlue: React.FC<IProps> = ({ text, href, date }) => {
  const tripStatus = getTripStatus(date);
  console.log(`Trip Status: ${tripStatus?.status} for date: ${date}`);
  



  return (
    <Link
      href={href}
      className={`text-white font-[Poppins] flex justify-center items-center mt-5 mb-5 w-[328px] h-[58px] bg-blue-900 rounded-3xl font-bold m-auto text-center hover:bg-blue-950 transition-colors duration-300 border-2`}
    >
      <p className="flex items-center justify-center gap-4">{text} {
        tripStatus 
        && <span className={` w-3 h-3  rounded-full ${tripStatus.status === 'today' ? 'bg-red-600' : tripStatus.status === 'future' ? 'bg-green-400' : 'bg-blue-300'}`}/>
        } </p>
    </Link>
  )
}