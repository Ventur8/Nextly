"use client";
import { Button, Grid } from "@mui/material";
import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=1ce3288a1d574ced953ddb0c67d79ae9&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login_component() {
  return (
    <>
      <div
        className="faded"
        style={{
          backgroundColor: "rgba(255,255,255,0.4)",
          height: "500px",
          borderRadius: "25px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              height: "25vh",
              alignItems: "center",
            }}
          >
            <h3 style={{ color: "black" }}>
              Inicia sesion para empezar a utilizar la aplicacion{" "}
            </h3>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              href={AUTH_URL}
              style={{ color: "black", backgroundColor: "yellow" }}
            >
              {" "}
              Login
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
