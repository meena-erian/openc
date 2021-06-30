import seaport from '../components/seaport';

//const accountAddress = '0x6ceb97e5b4a580776d87111bdd980f6557b0cc8';
//const accountAddress = '0x88207b431510dbe0addbdae3bd53013813fc8c71'; owner

export default async function fetchOwnership(accountAddress, tokenAddress){
    const asset = {
        tokenAddress: tokenAddress,
        tokenId: "1"
    };
    var balance = await seaport.getAssetBalance({
        accountAddress, // string
        asset, // Asset
    });
    var balanceOfWETH = await seaport.getTokenBalance({
        accountAddress, // string
        tokenAddress: tokenAddress
    });
    return { balance : balance, balanceOfWETH : balanceOfWETH };
}
