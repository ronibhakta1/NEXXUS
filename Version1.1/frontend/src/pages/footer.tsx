export const Footer = () => {
    return <div>
            <footer className=" bottom-0 left-0 right-0 p-4 text-xs text-gray-500 bg-black">
                <nav className="flex flex-wrap justify-center gap-3">
                    {['About', 'Help Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Ads info', 'Blog', 'Status', 'Careers', 'Brand Resources', 'Advertising', 'Marketing', 'Twitter for Business', 'Developers', 'Directory', 'Settings'].map((link, index) => (
                        <a key={index} href="#" className="hover:underline">{link}</a>
                    ))}
                    <span>© 2023 NEXXUS, Inc.</span>
                </nav>
            </footer>
    </div>
}