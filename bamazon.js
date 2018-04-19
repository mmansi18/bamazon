var mysql = require('mysql');
var prompt = require('prompt');

var inputString = process.argv;
var rquested = 0;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon'

});

choice = process.argv[2];
search_item = process.argv[3];
quantity = process.argv[4];
thechoice();

function thechoice() {

    if (choice === 'view') {
        connection.connect((error) => {
            if (error) throw error
            console.log('connected as ', connection.threadId)
            var sqlquery = "select * from products"
            connection.query(sqlquery, (error, response) => {
                if (error) throw error
                console.log("NAME" + "\t" + "\t" + "PRICE" + "\t" + "\t" + "QUANTITY")
                for (var key in response) {
                    console.log(response[key].product_name + "\t" + "\t" + response[key].price + " $" + "\t" + "\t" + response[key].stock_quantity);
                }

            })
            connection.end()
        })
    }
    if (choice === 'search') {
        connection.connect((error) => {
            if (error) throw error
            console.log('connected as ', connection.threadId)
            var sqlquery = "select * from products where product_name = " + "'" + search_item + "'";
            connection.query(sqlquery, (error, response) => {
                if (error) throw error
                //  console.log(response[0].price)
                console.log("NAME" + "\t" + "\t" + "PRICE" + "\t" + "\t" + "QUANTITY")
                for (var key in response) {
                    console.log(response[key].product_name + "\t" + "\t" + response[key].price + " $" + "\t" + "\t" + response[key].stock_quantity);
                }

            })
            connection.end()
        })
    }

    if (choice === 'order') {

        connection.connect((error) => {
            if (error) throw error
            console.log('connected as ', connection.threadId)
            var sqlquery = "select * from products where product_name = " + "'" + search_item + "'";
            connection.query(sqlquery, (error, response) => {
                if (error) throw error
                var selectedquantity = response[0].stock_quantity;
                var unitprice = response[0].price;

                prompt.start();
                prompt.get(['Quantity'], function (err, result) {
                    if (err) {
                        return onErr(err);
                    }

                    var frmuserqu = parseInt(result.Quantity)



                    if (frmuserqu <= selectedquantity) {

                        var orderquery = " update products set stock_quantity =" + (selectedquantity - frmuserqu) + " where product_name = '" + search_item + "';"
                        connection.connect((error) => {
                            connection.query(orderquery, (error, response) => {
                                if (error) throw error

                                console.log("The total price is :" + (frmuserqu * unitprice) + " $")
                                console.log("your order submeted success")


                            })
                            connection.end()
                        })

                    } else {
                        console.log("the quantitytaht available is :" + selectedquantity)
                        connection.end()
                    }


                });




            })


        })
    }





}