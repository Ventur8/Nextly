import * as React from 'react';
import Login_component from './login_component';
import {getProviders,signIn}from "next-auth/react";


export default function LoginPage({providers}) {
  
    return (
     
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh', backgroundColor:'black'}}>
        <Login_component/>
      </div>
      
    )
  }

  export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: { providers }
    }
  }