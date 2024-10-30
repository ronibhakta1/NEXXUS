import { Bell, Bookmark, FileText, Hash, Home, Mail, MoreHorizontal, User } from "lucide-react"

export const RightSidebar = () => {
    return <div>
        <div className="bg-gray-900 rounded-2xl p-4 mt-4">
            <nav>
                <ul className="space-y-6">
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><Home className="mr-4" /> Home</a></li>
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><Hash className="mr-4" /> Explore</a></li>
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><Bell className="mr-4" /> Notifications</a></li>
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><Mail className="mr-4" /> Messages</a></li>
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><Bookmark className="mr-4" /> Bookmarks</a></li>
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><FileText className="mr-4" /> Lists</a></li>
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><User className="mr-4" /> Profile</a></li>
                    <li><a href="#" className="text-gray-200 text-xl flex items-center"><MoreHorizontal className="mr-4" /> More</a></li>
                </ul>
            </nav>
            {/* <button className="bg-blue-400 text-white rounded-full py-3 w-full font-bold text-lg mt-6">Echo</button> */}
        </div>
    </div>

}