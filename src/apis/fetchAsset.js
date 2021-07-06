import seaport from '../components/seaport';

async function fetchAsset(tokenAddress, tokenId){
    const asset = {
        tokenAddress: tokenAddress,
        tokenId: tokenId
    };
    console.log("Fetching asset", asset);
    const OpenSeaAsset = await seaport.api.getAsset(asset);
    return OpenSeaAsset;
}

export default fetchAsset;