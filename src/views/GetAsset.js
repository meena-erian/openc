import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import fetchAsset from '../apis/fetchAsset';

import ace from "../components/ace";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '20cm',
    margin: 'auto',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function GetAsset() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [editorDiv, setEditorDiv] = useState(false);
  const [editorObj, setEditorObj] = useState(false);

  async function handleSubmit(e){
      e.preventDefault();
      const tokenAddress = e.target.tokenaddress.value;
      const tokenId = e.target.tokenid.value;
      
      setLoading(true);
      var ret = "Not Found";
      try{
        ret = await fetchAsset(tokenAddress, tokenId);
      } catch (e){
        console.log(e);
      }
      editorObj.setValue(JSON.stringify(ret, null, 2));
      editorObj.session.foldAll();
      setLoading(false);
  }
  return (
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
            id="token-address" 
            name="tokenaddress"
            fullWidth 
            label="Token Address (Contract Address)" 
            variant="outlined" 
            //defaultValue="0x06012c8cf97bead5deae237070f9587f8e7a266d" 
            defaultValue="0x3d2e62b1d9f211a47c1c9302ec57133d36b9a32a" // Rinkeby
        />
        <TextField 
            id="token-id" 
            name="tokenid"
            fullWidth 
            label="Token Id" 
            variant="outlined" 
            //defaultValue="1" 
            defaultValue="507" // Rinkeby
        />
        <Button 
            variant="contained" 
            fullWidth
            type="submit"
            disabled={loading}
        >
            Fetch
        </Button>
        <div
            id='results-editor'
            ref={(r) => {
                if (r && editorDiv === false) {
                    setEditorDiv(r);
                    var e = ace.edit(r)
                    setEditorObj(e);
                    e.session.setMode("ace/mode/javascript");
                }
            }}
            style={{
                maxWidth: "20cm", 
                width: '100%', 
                height: "50vh", 
                border: '1px solid gray'
            }}
        />
      </form>
  );
}