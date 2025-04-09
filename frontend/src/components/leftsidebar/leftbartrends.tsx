
interface LeftBarTrendsProps {
    id: number
    location: string
    hashtag: string
    tweets: string
}

export const LeftBarTrends = ({
    id,
    location,
    hashtag,
    tweets
}: LeftBarTrendsProps) => {
    return <div>
            <div key={id} className="mb-4">
                <div className="text-xs text-gray-500">{location}</div>
                <div className="font-bold">{hashtag}</div>
                <div className="text-xs text-gray-500">{tweets} Echo</div>
            </div>
        
    </div>
}