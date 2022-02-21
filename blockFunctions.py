from constants import *


def bl_numOfTx(block):
    return block['nTx']


def getBlock(blockID):
    blockhash = rpc_client.getblockhash(blockID)
    return rpc_client.getblock(blockhash)


def getCleanTx(tx_hash):
    tx_hex = rpc_client.getrawtransaction(tx_hash)
    return rpc_client.decoderawtransaction(tx_hex)


def calculateBlockFeeSum(block):
    # Ukupna naknada se racuna, izlazna vrijednost - ulazna
    block = rpc_client.getblock(block)

    feeSum = 0
    for tx in block["tx"]:
        # Izvrtit ce kroz sve tx u bloku
        # tx = "ee10fb171a23cb4d7e8180bdb7ae55260e8f2fd49de408b2c477bf71acdc9900"
        cleanTx = getCleanTx(tx)
        feeSum += feeCalculation(cleanTx)

    return feeSum


# Calculate fees
def feeCalculation(tx):
    # Provjerava da nije nagrada za blok
    if "coinbase" in tx["vin"][0]:
        return 0

    return tx_amountIn(tx) - tx_amount(tx)


def tx_amount(tx_details):
    # Vraca vrijednost outputa te transakcije
    amount = 0
    for tx_out in tx_details["vout"]:
        amount += tx_out["value"]
    return amount


def tx_amountIn(tx_details):
    amount = 0

    for tx_in in tx_details["vin"]:
        tx = getCleanTx(tx_in["txid"])
        txIndex = int(tx_in["vout"])

        amount += tx["vout"][txIndex]["value"]

    return amount
# ------------------------


def getTransactionInfo(tx):
    txInfo = getCleanTx(tx)
    txFee = feeCalculation(txInfo)

    # Decimal cannot get serialized
    txFee = str(txFee)
    for vout in txInfo["vout"]:
        vout["value"] = str(vout["value"])

    return {'txInfo': txInfo, 'txFee': txFee}


def getBlockInfo(blockHash):
    blockInfo = rpc_client.getblock(blockHash)
    numberOfTx = bl_numOfTx(blockInfo)
    # blockFeeSum = calculateBlockFeeSum(blockHash)

    blockInfo["difficulty"] = str(blockInfo["difficulty"])

    return {"blockInfo": blockInfo, "numberOfTx": numberOfTx}
