interface LeftbarsuggetionsProps {
    id: number
    name: string
    username: string
    avatar: string
    verified: boolean
}

export const Leftbarsuggetions = ({
    id,
    name,
    username,
    avatar,
    verified}: LeftbarsuggetionsProps) => {
    return <div>
        <div key={id} className="flex items-center mb-4">
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-3" />
                <div className="flex-1">
                    <div className="font-bold ">
                        {name}
                        {verified && <span className="text-blue-400 ml-1">✓</span>}
                    </div>
                    <div className="text-gray-500">{username}</div>
                </div>
                <button className="bg-gray-200 text-black rounded-full px-4 py-1 font-bold">Follow</button>
            </div>
    </div>

}