import React from 'react';

import {redirect} from "next/navigation";
import {createClient} from "@/app/utils/supabase/server";

const Peticion = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div>
      <h1>Peticion</h1>
      <p>Quieres ser mi san valentin</p>
    </div>
  );
};

export default Peticion;
