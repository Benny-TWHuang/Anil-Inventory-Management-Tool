const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const jwt = require('jsonwebtoken');
const ldap = require('ldapjs');
const ldapClient = ldap.createClient({
    url: 'ldaps://corpad.intel.com:3269',
    tlsOptions: { 'rejectUnauthorized': false }
});

const nodemailer = require('nodemailer');
const mymail = 'your mail';
const mypw = 'your password';
const labidsid = 'lab account';
const labpw = 'lab account password';
const transporter = nodemailer.createTransport({
    host: 'smtpauth.intel.com',
    secureConnecton: true,
    tls: { 'rejectUnauthorized': false },
    port: 587,
    auth: {
        user: mymail,
        pass: mypw
    }
});

var pgp = require("pg-promise")(/*options*/);
let dbm = pgp("postgres://account:username@localhost:5432/MODULE");
let dbn = pgp("postgres://account:username@localhost:5432/NIC");
let dbo = pgp("postgres://account:username@localhost:5432/OTHERS");
let dbmem = pgp("postgres://account:username@localhost:5432/MEMBERS");

app.use(cors());

async function find_wwid(wwid) {
    let ori;
    const searchPromise = await new Promise((resolve, reject) => {
        dbmem.any("SELECT * FROM public.table_1 WHERE \"WWID\" = $1", [wwid])
        .then(function (result) {
            if(result.length == 0) {
                ldapClient.on('error', err => { console.log('ldap error', err);});
            
                ldapClient.bind(`GAR\\${labidsid})`, labpw, (bindErr, bindRes) => {
                    if (bindErr) {
                        return 0;
                    }
                    
                    const opts = {
                        filter: `(employeeID=${wwid})`,
                        scope: 'sub',
                        timeLimit: 500,
                        attributes: ['sAMAccountName','employeeID','displayName','mail', 'department']
                    };
                
                    ldapClient.search(`OU=Workers,DC=GAR,DC=corp,DC=intel,DC=com`, opts, (searchErr, searchRes) => {
                        searchRes.on('searchEntry', entry => {
                            const user = entry.object;
                            ori = {name: user.displayName, ssid: user.sAMAccountName, id: user.employeeID, mail: user.mail};
                            dbmem.any("INSERT INTO public.table_1 VALUES($1, $2, $3, $4, $5)", [ori.id, ori.name, user.department, ori.mail, ori.ssid])
                            .catch(function (error2) {
                                console.log(error2);
                            });
                            resolve(ori);
                        });
                        searchRes.on('error', error => {
                            ldapClient.unbind();
                            console.log('search error:', error);
                        });
                
                        searchRes.on('end', result => {
                            ldapClient.unbind();
                        });
                    });
                    ldapClient.search(`OU=Workers,DC=AMR,DC=corp,DC=intel,DC=com`, opts, (searchErr, searchRes) => {
                        searchRes.on('searchEntry', entry => {
                            const user = entry.object;
                            ori = {name: user.displayName, ssid: user.sAMAccountName, id: user.employeeID, mail: user.mail};
                            dbmem.any("INSERT INTO public.table_1 VALUES($1, $2, $3, $4, $5)", [ori.id, ori.name, user.department, ori.mail, ori.ssid])
                            .catch(function (error2) {
                                console.log(error2);
                            });
                            resolve(ori);
                        });
                        searchRes.on('error', error => {
                            ldapClient.unbind();
                            console.log('search error:', error);
                        });
                
                        searchRes.on('end', result => {
                            ldapClient.unbind();
                        });
                    });
                    ldapClient.search(`OU=Workers,DC=GER,DC=corp,DC=intel,DC=com`, opts, (searchErr, searchRes) => {
                        searchRes.on('searchEntry', entry => {
                            const user = entry.object;
                            ori = {name: user.displayName, ssid: user.sAMAccountName, id: user.employeeID, mail: user.mail};
                            dbmem.any("INSERT INTO public.table_1 VALUES($1, $2, $3, $4, $5)", [ori.id, ori.name, user.department, ori.mail, ori.ssid])
                            .catch(function (error2) {
                                console.log(error2);
                            });
                            resolve(ori);
                        });
                        searchRes.on('error', error => {
                            ldapClient.unbind();
                            console.log('search error:', error);
                        });
                
                        searchRes.on('end', result => {
                            ldapClient.unbind();
                        });
                    });
                    ldapClient.search(`OU=Workers,DC=CCR,DC=corp,DC=intel,DC=com`, opts, (searchErr, searchRes) => {
                        searchRes.on('searchEntry', entry => {
                            const user = entry.object;
                            ori = {name: user.displayName, ssid: user.sAMAccountName, id: user.employeeID, mail: user.mail};
                            dbmem.any("INSERT INTO public.table_1 VALUES($1, $2, $3, $4, $5)", [ori.id, ori.name, user.department, ori.mail, ori.ssid])
                            .catch(function (error2) {
                                console.log(error2);
                            });
                            resolve(ori);
                        });
                        searchRes.on('error', error => {
                            ldapClient.unbind();
                            console.log('search error:', error);
                        });
                
                        searchRes.on('end', result => {
                            ldapClient.unbind();
                        });
                    });
                });
            } else {
                ori = {name: result[0].Display_Name, ssid: result[0].mailNickname, id: result[0].WWID, mail: result[0].Mail};
                resolve(ori);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    });
    
    return searchPromise;
}

app.use('/api/show', express.json(), (req, res) => {
    const asking = req.body.ask;
    if(asking.substring(0, 3) == "ada"){
        let series = asking.substring(3);
        dbn.any("SELECT t1.\"UID\", t1.\"Product_Name\", t1.\"Family\", t2.\"Status\" FROM public.table1 AS t1 INNER JOIN (SELECT * FROM public.table2 AS tmp1 WHERE tmp1.\"Date\"=(SELECT MAX(tmp2.\"Date\") FROM public.table2 AS tmp2 WHERE tmp2.\"UID\"=tmp1.\"UID\")) AS t2 ON t1.\"UID\"=t2.\"UID\" WHERE \"Family\"=$1 ORDER BY \"Product_Name\"", [series])
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "legacy") {
        dbn.any("SELECT t1.\"UID\", t1.\"Product_Name\", t1.\"Family\", t2.\"Status\" FROM public.table1 AS t1 INNER JOIN (SELECT * FROM public.table2 AS tmp1 WHERE tmp1.\"Date\"=(SELECT MAX(tmp2.\"Date\") FROM public.table2 AS tmp2 WHERE tmp2.\"UID\"=tmp1.\"UID\")) AS t2 ON t1.\"UID\"=t2.\"UID\" WHERE \"Family\"!=\'800\' AND \"Family\"!=\'700\' AND \"Family\"!=\'600\' AND \"Family\"!=\'500\' AND \"Family\"!=\'300\' AND \"Family\"!=\'200\' ORDER BY \"Product_Name\"")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "module") {
        dbm.any("SELECT t1.\"UID\", t1.\"Model\", t1.\"Vendor\", t1.\"Type\", t1.\"Speed\", t1.\"Distance\", t1.\"Wavelength\", t1.\"Interface\", t2.\"Status\" FROM public.table_1 AS t1 INNER JOIN (SELECT * FROM public.table_2 AS tmp1 WHERE tmp1.\"Date\"=(SELECT MAX(tmp2.\"Date\") FROM public.table_2 AS tmp2 WHERE tmp2.\"UID\"=tmp1.\"UID\")) AS t2 ON t1.\"UID\"=t2.\"UID\" WHERE \"Type\" LIKE \'%odule%\' ORDER BY \"Speed\"")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "DAC") {
        dbm.any("SELECT t1.\"UID\", t1.\"Model\", t1.\"Vendor\", t1.\"Type\", t1.\"Speed\", t1.\"Distance\", t1.\"Wavelength\", t1.\"Interface\", t2.\"Status\" FROM public.table_1 AS t1 INNER JOIN (SELECT * FROM public.table_2 AS tmp1 WHERE tmp1.\"Date\"=(SELECT MAX(tmp2.\"Date\") FROM public.table_2 AS tmp2 WHERE tmp2.\"UID\"=tmp1.\"UID\")) AS t2 ON t1.\"UID\"=t2.\"UID\" WHERE \"Type\" LIKE \'%DAC%\' ORDER BY \"Speed\"")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "AOC") {
        dbm.any("SELECT t1.\"UID\", t1.\"Model\", t1.\"Vendor\", t1.\"Type\", t1.\"Speed\", t1.\"Distance\", t1.\"Wavelength\", t1.\"Interface\", t2.\"Status\" FROM public.table_1 AS t1 INNER JOIN (SELECT * FROM public.table_2 AS tmp1 WHERE tmp1.\"Date\"=(SELECT MAX(tmp2.\"Date\") FROM public.table_2 AS tmp2 WHERE tmp2.\"UID\"=tmp1.\"UID\")) AS t2 ON t1.\"UID\"=t2.\"UID\" WHERE \"Type\" NOT LIKE \'%odule%\' AND \"Type\" NOT LIKE \'%DAC%\' ORDER BY \"Speed\"")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "tools") {
        dbo.any("SELECT t1.*, t2.\"Status\" FROM public.table_1 AS t1 INNER JOIN (SELECT * FROM public.table_2 AS tmp1 WHERE tmp1.\"Date\"=(SELECT MAX(tmp2.\"Date\") FROM public.table_2 AS tmp2 WHERE tmp2.\"UID\"=tmp1.\"UID\")) AS t2 ON t1.\"UID\"=t2.\"UID\"")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
});

app.use('/api/uid', express.json(), (req, res) => {
    const asking = req.body.ask;
    const askinguid = req.body.curuid;
    if(asking.substring(0, 3) == "ada" || asking == "legacy"){
        dbn.any("SELECT t2.\"UID\", t2.\"Status\", t2.\"Borrower\", t2.\"Date\", t3.\"Note\" FROM public.table2 AS t2 JOIN public.table3 AS t3 ON t2.\"UID\"=t3.\"UID\" WHERE t2.\"UID\"=$1 ORDER BY t2.\"Date\" DESC", [askinguid])
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "module" || asking == "DAC" || asking == "AOC"){
        dbm.any("SELECT t2.\"UID\", t2.\"Status\", t2.\"Borrower\", t2.\"Date\", t3.\"Note\" FROM public.table_2 AS t2 JOIN public.table_3 AS t3 ON t2.\"UID\"=t3.\"UID\" WHERE t2.\"UID\"=$1 ORDER BY t2.\"Date\" DESC", [askinguid])
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    }  else if (asking == "tools"){
        dbo.any("SELECT t2.\"UID\", t2.\"Status\", t2.\"Borrower\", t2.\"Date\", t3.\"Note\" FROM public.table_2 AS t2 JOIN public.table_3 AS t3 ON t2.\"UID\"=t3.\"UID\" WHERE t2.\"UID\"=$1 ORDER BY t2.\"Date\" DESC", [askinguid])
        .then(function (result) {
            res.send(result);
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
});

app.use('/api/update', express.json(), (req, res) => {
    let asking = req.body.ask, status = req.body.status, borrower = req.body.borrower, note = req.body.note;
    if (status == undefined || status == "") {
        status = 'NA';
    }
    if (borrower == undefined || borrower == "") {
        borrower = 'NA';
    }
    if (note == undefined || note == "") {
        note = 'NA';
    }

    if(asking.substring(0, 3) == "ada" || asking == "legacy"){
        let uid = req.body.uid , product = req.body.product, family = req.body.family, location = req.body.location;
        dbn.any("INSERT INTO public.table1 VALUES($1, $2, $3, $4)", [uid, product, family, location])
        .then(() => {
            dbn.any("UPDATE public.table2 SET \"Status\"=$1, \"Borrower\"=$2 WHERE \"UID\"=$3", [status, borrower, uid])
            .catch(function (error2) {
                console.log(error2);
            });
            dbn.any("UPDATE public.table3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
            .catch(function (error3) {
                console.log(error3);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "module" || asking == "DAC" || asking == "AOC"){
        let uid = req.body.uid , model = req.body.model, vendor = req.body.vendor, type = req.body.type, speed = req.body.speed, distance = req.body.distance, wavelength = req.body.wavelength, inter = req.body.inter, location = req.body.location;
        dbm.any("INSERT INTO public.table_1 VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [uid, model, vendor, type, speed, distance, wavelength, inter, location])
        .then(() => {
            dbm.any("UPDATE public.table_2 SET \"Status\"=$1, \"Borrower\"=$2 WHERE \"UID\"=$3", [status, borrower, uid])
            .catch(function (error2) {
                console.log(error2);
            });
            dbm.any("UPDATE public.table_3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
            .catch(function (error3) {
                console.log(error3);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }  else if (asking == "tools"){
        let uid = req.body.uid , item = req.body.item;
        dbo.any("INSERT INTO public.table_1 VALUES($1, $2)", [uid, item])
        .then(() => {
            dbo.any("UPDATE public.table_2 SET \"Status\"=$1, \"Borrower\"=$2 WHERE \"UID\"=$3", [status, borrower, uid])
            .catch(function (error2) {
                console.log(error2);
            });
            dbo.any("UPDATE public.table_3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
            .catch(function (error3) {
                console.log(error3);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
});

app.use('/api/status', express.json(), async (req, res) => {
    let asking = req.body.ask, uid = req.body.uid , status = req.body.status, borrower = req.body.borrower, note = req.body.note;
    if (status == undefined || status == "") {
        status = 'NA';
    }
    if (borrower == undefined || borrower == "") {
        borrower = 'NA';
    }
    if (note == undefined || note == "") {
        note = 'NA';
    }
    

    if(asking.substring(0, 3) == "ada" || asking == "legacy"){
        dbn.any("SELECT * FROM public.table1 WHERE \"UID\" = $1", [uid])
        .then(function (result) {
            if(result.length == 0) {
                res.send("Nonexist");
            } else {
                dbn.any("INSERT INTO public.table2 VALUES($1, $2, $3)", [uid, status, borrower])
                .catch(function (error2) {
                    console.log(error2);
                });
                if(note != 'NA') {
                    dbn.any("UPDATE public.table3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
                    .catch(function (error3) {
                        console.log(error3);
                    });
                }
                
                dbn.any("SELECT * FROM public.table2 WHERE \"UID\" = $1 ORDER BY \"Date\"", [uid])
                .then(function (result) {
                    let preborrower = result[result.length - 1].Borrower;
                    let bor = 0, ret = 0;
                    if(preborrower != borrower) {
                        if(preborrower === 'NA') {
                            bor = 1;
                        } else if (borrower === 'NA') {
                            ret = 1;
                        } else {
                            bor = 1;
                            ret = 1;
                        }
                    } else if (borrower != 'NA') {
                        bor = 1;
                    }
                    if(bor === 1) {
                        // let bor_res = await find_wwid(borrower);//ori.id, ori.name, user.department, ori.mail, ori.ssid
    
                        // let borrow_mail = {
                        //     from: 'ANIL.Inventory.Management.Tool@intel.com',
                        //     to: bor_res.mail,
                        //     subject: 'Borrow Notice',
                        //     text: 'This is a test email sent from Node.js and Express'
                        // };
                        // transporter.sendMail(borrow_mail, function(error, info){
                        //     if(error){
                        //         console.log(error);
                        //     }
                        // });
                    }
                    if(ret === 1) {
                        // let ret_res = await find_wwid(preborrower);//ori.id, ori.name, user.department, ori.mail, ori.ssid
                        
                        // let return_mail = {
                        //     from: 'ANIL.Inventory.Management.Tool@intel.com',
                        //     to: ret_res.mail,
                        //     subject: 'Return Notice',
                        //     text: 'This is a test email sent from Node.js and Express'
                        // };
                        // transporter.sendMail(return_mail, function(error, info){
                        //     if(error){
                        //         console.log(error);
                        //     }
                        // });
                    }
                })
                res.send("OK");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "module" || asking == "DAC" || asking == "AOC"){
        dbm.any("SELECT * FROM public.table_1 WHERE \"UID\" = $1", [uid])
        .then(function (result) {
            if(result.length == 0) {
                res.send("Nonexist");
            } else {
                dbm.any("INSERT INTO public.table_2 VALUES($1, $2, $3)", [uid, status, borrower])
                .catch(function (error2) {
                    console.log(error2);
                });
                if(note != 'NA') {
                    dbm.any("UPDATE public.table_3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
                    .catch(function (error3) {
                        console.log(error3);
                    });
                }
                res.send("OK");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }  else if (asking == "tools"){
        dbo.any("SELECT * FROM public.table_1 WHERE \"UID\" = $1", [uid])
        .then(function (result) {
            if(result.length == 0) {
                res.send("Nonexist");
            } else {
                dbo.any("INSERT INTO public.table_2 VALUES($1, $2, $3)", [uid, status, borrower])
                .catch(function (error2) {
                    console.log(error2);
                });
                if(note != 'NA') {
                    dbo.any("UPDATE public.table_3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
                    .catch(function (error3) {
                        console.log(error3);
                    });
                }
                res.send("OK");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
});

app.use('/api/note', express.json(), (req, res) => {
    let asking = req.body.ask, uid = req.body.uid, note = req.body.note;
    
    if(asking.substring(0, 3) == "ada" || asking == "legacy"){
        dbn.any("SELECT * FROM public.table1 WHERE \"UID\" = $1", [uid])
        .then(function (result) {
            if(result.length == 0) {
                res.send("Nonexist");
            } else {
                dbn.any("UPDATE public.table3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
                .catch(function (error3) {
                    console.log(error3);
                });
                res.send("OK");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "module" || asking == "DAC" || asking == "AOC"){
        dbm.any("SELECT * FROM public.table_1 WHERE \"UID\" = $1", [uid])
        .then(function (result) {
            if(result.length == 0) {
                res.send("Nonexist");
            } else {
                dbm.any("UPDATE public.table_3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
                .catch(function (error3) {
                    console.log(error3);
                });
                
                res.send("OK");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }  else if (asking == "tools"){
        dbo.any("SELECT * FROM public.table_1 WHERE \"UID\" = $1", [uid])
        .then(function (result) {
            if(result.length == 0) {
                res.send("Nonexist");
            } else {
                dbo.any("UPDATE public.table_3 SET \"Note\"=$1 WHERE \"UID\"=$2", [note, uid])
                .catch(function (error3) {
                    console.log(error3);
                });
                
                res.send("OK");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
});

app.use('/api/modify', express.json(), (req, res) => {
    let asking = req.body.ask, uid = req.body.uid;
    
    if(asking.substring(0, 3) == "ada" || asking == "legacy"){
        let product = req.body.product, family = req.body.family;
        dbn.any("UPDATE public.table1 SET \"Product_Name\"=$1, \"Family\"=$2 WHERE \"UID\"=$3", [product, family, uid])
            .catch(function (error) {
                console.log(error);
            });
    } else if (asking == "module" || asking == "DAC" || asking == "AOC"){
        let model = req.body.model, vendor = req.body.vendor, type = req.body.type, speed = req.body.speed, distance = req.body.distance, wavelength = req.body.wavelength, inter = req.body.inter;
        dbm.any("UPDATE public.table_1 SET \"Model\"=$1, \"Vendor\"=$2, \"Type\"=$3, \"Speed\"=$4, \"Distance\"=$5, \"Wavelength\"=$6, \"Interface\"=$7 WHERE \"UID\"=$8", [model, vendor, type, speed, distance, wavelength, inter, uid])
            .catch(function (error) {
                console.log(error);
            });
    }  else if (asking == "tools"){
        let item = req.body.item;
        dbo.any("UPDATE public.table_1 SET \"Item\"=$1 WHERE \"UID\"=$2", [item, uid])
            .catch(function (error) {
                console.log(error);
            });
    } 
});

app.use('/api/newuid', express.json(), (req, res) => {
    let asking = req.body.ask, olduid = req.body.olduid, newuid = req.body.newuid;
    
    if(asking.substring(0, 3) == "ada" || asking == "legacy"){
        dbn.any("SELECT * from public.table1 WHERE \"UID\"=$1", [newuid])
        .then(function (result) {
            if(result.length > 0) {
                res.send("already");
            } else {
                dbn.any("SELECT * from public.table1 WHERE \"UID\"=$1", [olduid])
                .then(function (result) {
                    if(result.length == 0) {
                        res.send("no");
                    } else {
                        dbn.any("UPDATE public.table1 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        dbn.any("UPDATE public.table2 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        dbn.any("UPDATE public.table3 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        res.send("ok");
                    }
                })
                .catch(function (error1) {
                    console.log(error1);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } else if (asking == "module" || asking == "DAC" || asking == "AOC"){
        dbm.any("SELECT * from public.table_1 WHERE \"UID\"=$1", [newuid])
        .then(function (result) {
            if(result.length > 0) {
                res.send("already");
            } else {
                dbm.any("SELECT * from public.table_1 WHERE \"UID\"=$1", [olduid])
                .then(function (result) {
                    if(result.length == 0) {
                        res.send("no");
                    } else {
                        dbm.any("UPDATE public.table_1 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        dbm.any("UPDATE public.table_2 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        dbm.any("UPDATE public.table_3 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        res.send("ok");
                    }
                })
                .catch(function (error1) {
                    console.log(error1);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }  else if (asking == "tools"){
        dbo.any("SELECT * from public.table_1 WHERE \"UID\"=$1", [newuid])
        .then(function (result) {
            if(result.length > 0) {
                res.send("already");
            } else {
                dbo.any("SELECT * from public.table_1 WHERE \"UID\"=$1", [olduid])
                .then(function (result) {
                    if(result.length == 0) {
                        res.send("no");
                    } else {
                        dbo.any("UPDATE public.table_1 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        dbo.any("UPDATE public.table_2 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        dbo.any("UPDATE public.table_3 SET \"UID\"=$1 WHERE \"UID\"=$2", [newuid, olduid])
                        .catch(function (error2) {
                            console.log(error2);
                        });
                        res.send("ok");
                    }
                })
                .catch(function (error1) {
                    console.log(error1);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
});

app.use('/api/login', express.json(), (req, res) => {
    const cf = req.body;
    ldapClient.on('error', err => { console.log('ldap error', err);});

    ldapClient.bind(`${cf.region}\\${cf.username}`, cf.password, (bindErr, bindRes) => {
        if (bindErr) {
            console.log('bind error', bindErr);
            // let result = "SSID/password failed.\n";
            // res.send(result);
            return;
        } else if (cf.username === "lab_anil23f") {
            const SECRET = 'anillab';
            let ori = {name: "Anil 23F, Lab", ssid: "lab_anil23f", id: "11841229", team: "56107", mail: "ANIL.Inventory.Management.Tool@intel.com"};
            const token = jwt.sign(ori, SECRET);
            res.send(token);
        }
            
        const opts = {
            filter: `(sAMAccountName=${cf.username})`,
            scope: 'sub',
            timeLimit: 500,
            attributes: ['sAMAccountName','employeeID','displayName','mail','department']
        };
        
        ldapClient.search(`OU=Workers,DC=${cf.region},DC=corp,DC=intel,DC=com`, opts, (searchErr, searchRes) => {
            if(searchErr) {
                console.log('search error', searchErr);
                return;
            }
            
            searchRes.on('searchEntry', entry => {
                const user = entry.object;
                const SECRET = 'anillab';
                let ori = {name: user.displayName, ssid: user.sAMAccountName, id: user.employeeID, team: user.department, mail: user.mail};
                const token = jwt.sign(ori, SECRET);
                // const decoded = jwt.verify(token, SECRET);
                res.send(token);
                // res.send(user);
            });
    
            searchRes.on('error', error => {
                ldapClient.unbind();
                console.log('search error:', error);
            });
    
            searchRes.on('end', result => {
                ldapClient.unbind();
            });
        });
    });
});

app.use('/api/wwid', express.json(), async (req, res) => {
    let wwid = req.body.wwid;
    let result = await find_wwid(wwid);
    
    res.send(result);
    
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
