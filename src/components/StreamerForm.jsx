import { useState } from "react";
import { STREAMING_PLATFORMS } from "../constants/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { settings } from "../config";
import Select from "react-select";
import '../styles/streamerForm.css'

//styles for custom dropdown
const colorStyles = {
    control: (styles) => (
        {
            ...styles,
            cursor: 'pointer',
            "&focus": {
                borderColor: '#646cff',
            }
        }),
    option: (styles, {isSelected}) => (
        {
            ...styles,
            backgroundColor: (isSelected) ? '#646cff' : 'default',
            color: (isSelected) ? 'white': 'default',
            cursor: 'pointer',
            "&:hover" : {
                backgroundColor: (isSelected) ? '#646cff' :'#888eff',
                color: 'white'
            }
        })
}

const StreamerForm = () => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    //format options for custom select
    const options = STREAMING_PLATFORMS.map(sp => ({
        value: sp,
        label: sp
    }))

    const [platform, setPlatform] = useState(options[0])
    

    const addStreamerMutation = useMutation((data) => axios.post(`${settings.api_url}`, data),
    {
      onError: (error) => {
        alert(error.response.data.message, 'error');
      },
      onSuccess: (data) => {
       console.log(data)
      },
    })

    const handleChangePlatform = (option) => {
        setPlatform(option)
    }

    const resetForm = () => {
        setDesc('')
        setName('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //check if any input is empty
        if(!name.length || !desc.length) {
            alert('All fields are required!')
            return
        }

        //send data
        addStreamerMutation.mutate({
            name: name,
            description: desc,
            streamingPlatform: platform.value
        })

        //reset form
        resetForm()
    }

    return (
        <section className="streamer__upload__wrapper">
             <form className="streamer__upload__form" action="#uploadStreamer" method="POST" onSubmit={handleSubmit}>
                <h2 className="streamer__upload__form__title">Enter your streamer</h2>
                <div className="streamer__upload__input__group --name">
                    <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <label htmlFor="name">
                        Name
                    </label>
                </div>
                <div className="streamer__upload__input__group --description">
                    <textarea className={(desc.length ? 'not-empty' :'')}  name="description" id="description" value={desc} onChange={(e)=>setDesc(e.target.value)} rows={5}/>
                    <label htmlFor="description">
                        Description
                    </label>
                </div>
                <div className="streamer__upload__input__group --platform_select">
                    Main streaming platform
                    <Select onChange={handleChangePlatform} value={platform} options={options} defaultValue={options[0]} styles={colorStyles}/>
                </div>
                <button className="streamer__upload__form__submit" type="submit">Send</button>
                </form>
        </section>
    );
}

export default StreamerForm;