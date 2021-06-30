import seaport from '../components/seaport';

async function fetchAsset(tokenAddress){
    const asset = {
        tokenAddress: tokenAddress,
        tokenId: "1"
    };
    const OpenSeaAsset = await seaport.api.getAsset(asset);
    return OpenSeaAsset;
}

export default fetchAsset;