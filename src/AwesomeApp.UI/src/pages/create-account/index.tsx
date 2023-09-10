"use client"

import { useState } from "react";
import { PageBox } from "@/components/page-box";
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { CustomerType } from "@/types/models";

export default function CreateAccount(): React.ReactElement {
  return (
    <PageBox>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5">Create Account</Typography>
        </Grid>
        <Grid 
          item 
          container
          spacing={2}
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <FormControl>
            <TextField 
              required
              type="email"
              helperText="Email" 
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <TextField 
              required
              type="password"
              helperText="Password" 
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <TextField 
              required
              type="password"
              helperText="Repeat password" 
              variant="standard"
          />
          </FormControl>
          <FormControl>
            <TextField 
              required
              type="text"
              helperText="Full name" 
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <TextField 
              required
              type="number"
              helperText="Age" 
              variant="standard"
            />
          </FormControl>
          <FormControl>
            <FormLabel id="customer-type">Customer type</FormLabel>
            <RadioGroup
              name="radio-buttons-group"
              defaultValue={CustomerType.private}
            >
              <FormControlLabel value={CustomerType.private} control={<Radio />} label="Private" />
              <FormControlLabel value={CustomerType.company} control={<Radio />} label="Company" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
        >

        </Grid>
      </Grid>
    </PageBox>
  )
}
