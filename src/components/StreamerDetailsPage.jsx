import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { settings } from "../config"
import LoadingComponent from "./LoadingComponent"
import { useEffect } from "react"
import { io } from "socket.io-client"
import { AVATAR_LINK } from "../constants/constants"
import "../styles/streamerDetails.css"
import { isVoted } from "../utils/isVoted"

const StreamerDetailsPage = () => {
    const {streamerId} = useParams()
    const queryClient = useQueryClient()

    const streamerQuery = useQuery({
        queryKey: ['streamer'],
        queryFn: () => axios.get(`${settings.api_url}/${streamerId}`).then(res=>res.data)
    })

    const voteForStreamerMutation = useMutation((id) => axios.put(`${settings.api_url}/${id}/vote`),{
        onError: (error) => alert(error.response.data.message)
    })

    const voteForStreamer = () => {
        voteForStreamerMutation.mutate(streamerId)
    }

    useEffect(()=>{
        const socket = io(`${settings.socket_url}`)
        socket.on("streamersUpdate",() => {
            queryClient.invalidateQueries(['streamer'],{
                exact: true
            })
        })
    },[queryClient])

    if (streamerQuery.isLoading) return <LoadingComponent/>

    const streamerData = streamerQuery.data.data.streamer

    return(
        <main>
            <section className="streamer__details__wrapper">
                <img loading="lazy" src={AVATAR_LINK} className="streamers__avatar"/>
                <div className="streamers__info__wrapper">
                    <h3 className="streamers__info__name">
                            {streamerData.name}
                    </h3>
                    <p className="streamers__info__description">
                        {streamerData.description}
                    </p>
                    <p className="streamers__info__streaming_platform">Main streaming platform: {streamerData.streamingPlatform}</p>
                </div>
                <div className="streamers__buttons__section">
                    <Link to="/" className="go_back_button">
                        <button>Back</button>
                    </Link>
                    <p className="streamers__info__votes">
                        Votes: {streamerData.votes} <button onClick={voteForStreamer} className={isVoted(streamerId) ? 'disabled' : ''}>
                            {isVoted(streamerId) ? 'Voted' : 'Vote!'}
                            </button>
                    </p>
                </div>
            </section>
            
        </main>
    )
}

export default StreamerDetailsPage