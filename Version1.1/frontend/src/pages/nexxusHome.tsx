// import { Auth } from "../components/auth"
import { HomeButtons } from "../components/homebuttons"
import { NexxusTemplate } from "../components/nexxustemplate"

export const NexxusHome = () => {
    return <div className="grid grid-cols-2">
        <NexxusTemplate />
        <div className=" items-center justify-center place-content-center bg-black">
                <HomeButtons />
        </div>
        <footer className="absolute bottom-0 left-0 right-0 p-4 text-xs text-gray-500">
            <nav className="flex flex-wrap justify-center gap-3">
                {['About', 'Help Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Ads info', 'Blog', 'Status', 'Careers', 'Brand Resources', 'Advertising', 'Marketing', 'Twitter for Business', 'Developers', 'Directory', 'Settings'].map((link, index) => (
                    <a key={index} href="#" className="hover:underline">{link}</a>
                ))}
                <span>© 2023 NEXXUS, Inc.</span>
            </nav>
        </footer>

    </div>
}