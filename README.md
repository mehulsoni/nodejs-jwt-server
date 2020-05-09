
## Node JS JWT + Server


###### Server Port 8080

###### Server base URL: http://localhost:8086/

###### Installation 
Please update mongodb db url in ../db.js file
'mongodb://root:root@localhost:27017/?authSource=admin'

Run below command to install

cd /path/to/base/dir

npm install

npm start


###### API Implmented:

/login
/register
/verify
/wallets/validate/message
/wallets//signed-messages/:address


###### Frontend functionality: 
    Supported wallets : (Metamask and Portis) (Tested)
    Sign Message (Tested)
    Sign Personal Message  (Tested)
    Get Balance  (Tested)
    Get Dai Balance  (Tested)
    Send Dai Token  (Not Tested)
    Send Transactions  (Not Tested)
    Transaction History  (Not Tested)
    Signed Messages History (Tested)
    Login (Tested)
    Register (Tested)
    JWT authentication (Tested)
