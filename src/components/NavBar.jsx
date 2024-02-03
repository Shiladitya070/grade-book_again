
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const NavBar = ({ className = "" }) => {

    return (
        <nav className={`bg-gray-800 ${className}`}>
            <ul className="flex items-center justify-between px-4 py-2">
                <li>
                    <a href="/" className="text-white font-bold text-lg">Home</a>
                </li>
                <div className='flex gap-2 items-center'>
                    <li>
                        <Link className="link-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/profileEdit">Profile</Link>
                    </li>
                    <li>
                        <Link className="link-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/class/create_asg">Create Asg</Link>
                    </li>
                    <li>
                        <UserButton afterSignOutUrl='/' />
                    </li>

                </div>
            </ul>
        </nav>
    );
};

export default NavBar;
