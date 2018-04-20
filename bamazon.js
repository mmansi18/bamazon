var mysql = require('mysql');
var prompt = require('prompt');

var inputString = process.argv;
var rquested = 0;
var globaltotal = 0;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon_db'

});
var connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon_db'

});

choice = process.argv[2];
search_item = process.argv[3];
quantity = process.argv[4];

salepoint();




function salepoint() {

    if (choice === 'view.all') {
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

    if (choice === 'order') {
        var availableq = 0;
        var unitprice = 0;
        prompt.start();
        prompt.get(['ItemName', 'Quantity'], function (err, result) {
            if (err) { return onErr(err); }

            var frmuseritm = result.ItemName
            var frmuserqu = parseInt(result.Quantity)



            connection.connect((error) => {
                if (error) throw error
                // console.log('connected as ', connection.threadId)
                var sqlquery = "select * from products where product_name = " + "'" + frmuseritm + "'";
                connection.query(sqlquery, (error, response) => {
                    if (error) throw error

                    availableq = response[0].stock_quantity;
                    unitprice = response[0].price;
                    // console.log(availableq,unitprice)
                    if (frmuserqu <= availableq) {
                        var orderquery = " update products set stock_quantity =" + (availableq - frmuserqu) + " where product_name = '" + frmuseritm + "';"
                        connection.query(orderquery, (error, response) => {
                            if (error) throw error
                            console.log("Your Order Submeted")
                            console.log("The Total Price is: " + unitprice * frmuserqu + " $")

                        })
                        connection.end()

                    } else {
                        console.log("The available stock is :" + availableq)
                        console.log("The available stock is not enough for your order")
                        connection.end()
                    }

                })
            })
        })
    }
    if (choice === 'search') {
        var availableq = 0;
        var unitprice = 0;
        prompt.start();
        prompt.get(['ItemName'], function (err, result) {
            if (err) { return onErr(err); }

            var frmuseritm = result.ItemName
            connection.connect((error) => {
                if (error) throw error
                //  console.log('connected as ', connection.threadId)
                var sqlquery = "select * from products where product_name = " + "'" + frmuseritm + "'";
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
        })
    }


    if (choice === 'manage') {

        var sqlquery1 = "";
        prompt.start();
        console.log("please enter your choice :")
        prompt.get(['choice'], function (err, result) {

            var managchioce = result.choice;
            if (managchioce === 'update') {

                prompt.start();
                prompt.get(['ItemName', 'Quantity'], function (err, result) {

                    doit(2, result.ItemName, result.Quantity)


                })

            }
            if (managchioce === 'low') {
                sqlquery1 = "select * from products where stock_quantity <= 5"
                doit(1, sqlquery1, 0)

            }
            if (managchioce === 'high') {
                sqlquery1 = "select * from products where stock_quantity >= 50"
                doit(1, sqlquery1, 0)

            }
            if (managchioce === 'new') {
                prompt.start();
                console.log("enter new product :")
                prompt.get(['Name', 'price', 'quantity', 'department_name'], function (err, result) {

                    sqlquery1 = "INSERT INTO products (product_name,price,stock_quantity,department_name) VALUES ('" + result.Name + "'," + result.price + " ," + result.quantity + " ,'" + result.department_name + "');"
                    doit(3, sqlquery1, 0)

                })

            }

        })

    }
    function datasetter(mydata) {
        connection2.connect((error) => {
            if (error) throw error

            connection2.query(mydata, (error, response) => {
                if (error) throw error
                console.log("the product Quantity Changed")

            })

            connection2.end()

        })
    }


    function doit(choice1, querty0, added) {
        if (choice1 === 1) {

            connection.connect((error) => {
                if (error) throw error
                //  console.log('connected as ', connection.threadId)

                connection.query(querty0, (error, response) => {
                    if (error) throw error

                    console.log("NAME" + "\t" + "\t" + "PRICE" + "\t" + "\t" + "QUANTITY")
                    for (var key in response) {
                        console.log(response[key].product_name + "\t" + "\t" + response[key].price + " $" + "\t" + "\t" + response[key].stock_quantity);
                    }

                })
                connection.end()
            })


        }
        if (choice1 === 2) {
            var currentq = 0;
            var total = 0;
            var orderquery = "iii";

            connection.connect((error) => {
                if (error) throw error

                connection.query("select stock_quantity from products where product_name ='" + querty0 + "'", (error, response) => {
                    if (error) throw error
                    currentq = parseInt(response[0].stock_quantity)
                    // console.log(currentq)
                    var added2 = parseInt(added);
                    total = currentq + added2;
                    //  console.log(total)

                    orderquery = " update products set stock_quantity =" + total + " where product_name = '" + querty0 + "';"
                    datasetter(orderquery)
                    connection.end()
                })
            })

        }
        if (choice1 === 3) {
            
      
            connection2.connect((error) => {
                if (error) throw error
    
                connection2.query(querty0, (error, response) => {
                    if (error) throw error
                    
    
                })
    
                connection2.end()
    
            })

        }
    }

}