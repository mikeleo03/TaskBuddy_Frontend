// Sidebar component
const Sidebar = ({ page, setPage, saveEdit, setSaveEdit }) => {

    const navigation = [
        {
            pageName: 'Home',
            name: 'Home',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path>
            </svg>
            ,
        },
        {
            pageName: 'Add',
            name: 'Add',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>,
        },
    ]

    const navsFooter = [
        {
            href: '/',
            name: 'Help',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            ,
        }
    ]

    const handleSelect = ({ pageName }) => {
        if (pageName !== "Add") {
            setSaveEdit({ id: 3, value : null });
            setPage("Pass");
        }
    };

    return (
        <nav className="top-0 left-0 w-full h-full bg-primaryBlue md:rounded-l-xl">
            <div className="flex flex-col h-full w-full md:overflow-hidden">
                {/* // For large */}
                <div className="pl-3 text-sm font-medium flex-1 w-full md:block hidden">
                    {
                        navigation.map((item, idx) => (
                            <div key={idx} className={`py-1.5 my-3 rounded-l-xl hover:bg-primaryYellow duration-150 w-20 ${page === item.pageName ? "bg-primaryYellow font-bold" : ""}`}>
                                <button onClick={() => handleSelect(item.pageName)} className={`flex flex-col w-full items-center gap-x-2 text-gray-600 p-2 rounded-l-xl active:bg-primaryYellow active:border-none duration-150`}>
                                    <div className="text-gray-500">{item.icon}</div>
                                    <div className="text-light">{item.name}</div>
                                </button>
                            </div>
                        ))
                    }
                </div>
                {/* // For small */}
                <div className="px-4 block md:hidden text-sm font-medium flex flex-row flex-1 w-full h-full">
                    {navigation.map((item, idx) => (
                        <div
                            key={idx}
                            className={`md:py-1.5 md:my-3 my-2 md:rounded-l-xl hover:bg-primaryYellow duration-150 w-full ${
                                page === item.pageName ? 'bg-primaryYellow font-bold' : ''
                            }`}
                        >
                            <button
                                onClick={() => setPage(item.pageName)}
                                className={`flex flex-col w-full items-center gap-x-2 text-gray-600 p-2 md:rounded-l-xl active:bg-primaryYellow active:border-none duration-150`}
                            >
                                <div className="text-gray-500">{item.icon}</div>
                                <div className="text-light">{item.name}</div>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="md:block hidden">
                    <ul className="pb-4 text-sm font-medium">
                        {
                            navsFooter.map((item, idx) => (
                                <li key={idx} className="my-2">
                                    <a href={item.href} className="flex items-center w-full text-gray-600 p-2 rounded-lg duration-150">
                                        <div className="text-gray-500 w-full items-center flex justify-center">{item.icon}</div>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;