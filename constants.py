# The library used: python-bitcoinrpc
from bitcoinrpc.authproxy import AuthServiceProxy

# Initial
rpc_user = "student"
rpc_password = "IhIskjGukNz9bRpWJL0FBNXmlSBd1pS5AtJdG1zfavLaICBuP4VDPEPMu67ql7U3"
host = "blockchain.oss.unist.hr"
port = "8332"

# Setting up the RPC client
rpc_client = AuthServiceProxy(
    "http://"+rpc_user+":"+rpc_password+"@"+host+":"+port+"/")
