import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import sendBuyOrder from '../apis/sendBuyOrder';
import ace from "../components/ace";
const ACCOUNT_1 = process.env.REACT_APP_ACCOUNT_1;

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '20cm',
        margin: 'auto',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


export default function CreateBuyOrder() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [editorDiv, setEditorDiv] = useState(false);
    const [editorObj, setEditorObj] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const asset = {
            tokenId : e.target.tokenid.value,
            tokenAddress : e.target.tokenaddress.value,
            schemaName : e.target.schemaname.value
        };
        const accountaddress = e.target.accountaddress.value;
        const startAmount = e.target.startamount.value;

        setLoading(true);
        var ret = "Failed";
        try {
            ret = await sendBuyOrder(asset, accountaddress, startAmount);
        } catch (e) {
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
                label="Account Address (Buyer)"
                variant="outlined"
                defaultValue={ACCOUNT_1}
            />
            <TextField
                id="token-address"
                name="tokenaddress"
                fullWidth
                label="Token Address"
                variant="outlined"
                defaultValue="0x3d2e62b1d9f211a47c1c9302ec57133d36b9a32a"
            />
            <TextField
                id="token-id"
                name="tokenid"
                fullWidth
                label="Token Id"
                variant="outlined"
                defaultValue="507"
            />
            <TextField
                id="schema-name"
                name="schemaname"
                fullWidth
                label="Schema Name"
                variant="outlined"
                defaultValue="ERC721"
            />
            <TextField
                id="start-amount"
                name="startamount"
                fullWidth
                label="Start Amount"
                variant="outlined"
                defaultValue="0.02"
            />
            <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
            >
                Submit
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