"use client"

import { useState, useEffect } from "react"
import { createClient } from '../../../utils/supabase/client'

const podcastPage = ({params: {id}}: {params: {id: string}}) => {
    const [podcasts, setPodcasts] = useState<any[]>([])
    const supabase = createClient()
    
    useEffect(() => {
        const getPodcasts = async () => {
            const { data, error } = await supabase.from('podcasts').select('*').eq('id', id)

            if (error || !data) {
                console.log(error)
            }
        
            if (data) {
                setPodcasts(data)
            }
        }
    
        getPodcasts()
    }, [])
    
    return (
        <div>
        <h1>Podcasts</h1>
        
        </div>
    )
}

export default podcastPage  
