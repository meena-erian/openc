import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import fetchOwnership from '../apis/fetchOwnership';

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


export default function VerifyOwnership() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [editorDiv, setEditorDiv] = useState(false);
  const [editorObj, setEditorObj] = useState(false);

  async function handleSubmit(e){
      e.preventDefault();
      const accountAddress = e.target.accountaddress.value;
      const tokenAddress = e.target.tokenaddress.value;
      const tokenId = e.target.tokenid.value;
      
      setLoading(true);
      var ret = "Not Found";
      try{
        ret = await fetchOwnership(accountAddress, tokenAddress, tokenId);
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
            id="account-address" 
            name="accountaddress"
            fullWidth 
            label="Account Address" 
            variant="outlined" 
            defaultValue="0xd4f6cb0c1fe07407b7098ac7fe4265f3b2ae61f2" 
        />
        <TextField 
            id="token-address" 
            name="tokenaddress"
            fullWidth 
            label="Token Address" 
            variant="outlined" 
            defaultValue="0xe4c2bcf7c6bda591d2b18a5a1a68b604e8fc5538" 
        />
        <TextField 
            id="token-id" 
            name="tokenid"
            fullWidth 
            label="Token Id" 
            variant="outlined" 
            defaultValue="7" 
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