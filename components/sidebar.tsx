"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState, useEffect } from "react";

import 'boxicons/css/boxicons.min.css'; 
import { createClient } from '../utils/supabase/client'
import Link from "next/link";



const Sidebar = () => {

  const [pods, setPods] = useState<any[]>([])

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {data: {user}} = await supabase.auth.getUser();
      const id = user?.id;
      return id
    }

    const ifUser = async () => { 
      const id = await getUser()
      if (id) {
        const { data, error } = await supabase.from('profiles').select('pods').eq('id', id)
        if (data) {
          console.log(data)
          setPods(data)
        }
        else {
          console.log('no pods')
        }
      }
    }

    ifUser()
  }, [])

  return (
    <Sheet key={"left"}>
      <SheetTrigger><i className='bx bx-menu bx-lg'></i></SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>my pods</SheetTitle>
          <SheetDescription>
          {pods.length > 0 ? (
            pods.map((pod) => (
              <Link href={`/pod/${pod.id}`} key={pod.id}>
                <p>{pod.name}</p>
              </Link>
            ))
          ) : (
            <p>make a podcast!</p>
          )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default Sidebar