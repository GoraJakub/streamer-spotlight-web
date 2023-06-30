import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { settings } from "../config";
import LoadingComponent from "./LoadingComponent";
import { useEffect } from "react";
import io from "socket.io-client";
import { AVATAR_LINK } from "../constants/constants";
import { Link } from "react-router-dom";
import "../styles/streamerList.css"
import { saveToLocalStorage } from "../utils/saveToLocalStorage";
import { isVoted } from "../utils/isVoted";


const StreamerList = () => {
    const queryClient = useQueryClient()

    const streamersQuery = useQuery({
        queryKey: ['streamers'],
        queryFn: () =>  axios.get(`${settings.api_url}`).then((res)=>res.data)
    })

    const voteForStreamerMutation = useMutation((id) => axios.put(`${settings.api_url}/${id}/vote`),{
        onError: (error) => alert(error.response.data.message)
    })

    const voteForStreamer = (id) => {
        saveToLocalStorage(id)
        voteForStreamerMutation.mutate(id)
    }

    useEffect(()=>{
        const socket = io(`${settings.socket_url}`)
        socket.on("streamersUpdate",() => {
            queryClient.invalidateQueries(['streamers'],{
                exact: true
            })
        })
    },[queryClient])

    if(streamersQuery.isLoading) return <LoadingComponent/>

    return(
        <section className="streamers__list__wrapper">
            <h2>Streamer List</h2>
            <ul className="streamers__list">
                {streamersQuery.data.data.streamers.map(streamer => (
                    <li key={streamer._id} className="streamers__list__item">
                        <img loading="lazy" src={AVATAR_LINK} className="streamers__avatar"/>
                        <div className="streamers__info__wrapper">
                            <h3 className="streamers__info__name">
                                <Link to={`/streamer/${streamer._id}`}>
                                    {streamer.name}
                                </Link>
                            </h3>
                            <p className="streamers__info__description">
                                {streamer.description}
                            </p>
                            <p className="streamers__info__streaming_platform">Main streaming platform: {streamer.streamingPlatform}</p>
                            <p className="streamers__info__votes">
                                Votes: {streamer.votes} <button onClick={()=>voteForStreamer(streamer._id)} className={isVoted(streamer._id) ? 'disabled' : ''}>{isVoted(streamer._id) ? 'Voted' : 'Vote!'}</button>
                            </p>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default StreamerList