import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar } from '@material-ui/core';
import fetchAssets from '../apis/fetchAssets';

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


export default function GetAssets() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [editorDiv, setEditorDiv] = useState(false);
  const [editorObj, setEditorObj] = useState(false);
  const [resultsDiv, setResultsDiv] = useState(false);
  const [resultsObj, setResultsObj] = useState(false);
  const [assets, setAssets] = useState([]);

  async function handleSubmit(e){
      e.preventDefault();
      const OpenSeaAssetQuery = JSON.parse(editorObj.getValue());
      console.log(OpenSeaAssetQuery);
      setLoading(true);
      var ret = "Not Found";
      try{
        if('pages' in OpenSeaAssetQuery){
            const pages = OpenSeaAssetQuery.pages;
            delete OpenSeaAssetQuery.pages;
            var offset = OpenSeaAssetQuery.offset;
            var limit = OpenSeaAssetQuery.limit;
            delete OpenSeaAssetQuery.offset;
            ret = {assets: []};
            for(var i=0; i<pages; i++){
                var {assets} = await fetchAssets({offset: offset, ...OpenSeaAssetQuery});
                ret.assets.push(...assets);
                if(assets.length < limit){
                    break;
                }
                offset += limit;
            }
        }
        else{
            ret = await fetchAssets(OpenSeaAssetQuery);
        }
        
      } catch (e){
        console.log(e);
      }
      if('assets' in ret){
          setAssets(ret.assets);
      }
      else {
          setAssets([]);
      }
      resultsObj.setValue(JSON.stringify(ret, null, 2));
      resultsObj.session.foldAll();
      setLoading(false);
  }
  return (
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div
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
        >{JSON.stringify({
            limit: 10,
            offset: 0,
            pages: 5,
            order_by: 'sale_date', 
        }, null, 2)}</div>
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
                if (r && resultsDiv === false) {
                    setResultsDiv(r);
                    var e = ace.edit(r)
                    setResultsObj(e);
                    e.session.setMode("ace/mode/javascript");
                }
            }}
            style={{
                maxWidth: "20cm", 
                width: '100%', 
                height: "50vh", 
                border: '1px solid gray'
            }}
        ></div>
        {assets.map(asset => (
            <Avatar 
                key={asset.tokenId} 
                alt={asset.name} 
                src={asset.imageUrlThumbnail}
                style={{display: "inline-block"}}
            />
        ))}
      </form>
  );
}