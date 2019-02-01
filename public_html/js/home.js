/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    getItems();

});

function addDollar() {
    clearChange();
    var currentMoney = $('#moneyIn').val();
    var moreMoney = Number(currentMoney) + 1;
    var moreMoneyFixed = moreMoney.toFixed(2);
    $('#moneyIn').val(moreMoneyFixed);
}
function addNickel() {
    clearChange();
    var currentMoney = $('#moneyIn').val();
    var moreMoney = Number(currentMoney) + 0.05;
    var moreMoneyFixed = moreMoney.toFixed(2);
    $('#moneyIn').val(moreMoneyFixed);
}
function addQuarter() {
    clearChange();
    var currentMoney = $('#moneyIn').val();
    var moreMoney = Number(currentMoney) + 0.25;
    var moreMoneyFixed = moreMoney.toFixed(2);
    $('#moneyIn').val(moreMoneyFixed);
}
function addDime() {
    clearChange();
    var currentMoney = $('#moneyIn').val();
    var moreMoney = Number(currentMoney) + .10;
    var moreMoneyFixed = moreMoney.toFixed(2);
    $('#moneyIn').val(moreMoneyFixed);
}
function selectItem(itemId) {
    $('#item').val(itemId);
    clearChange();
    clearMessage();
}
function purchase() {

    clearMessage();

    if ($('#moneyIn').val().length === 0) {
        $('#message').val('Must Insert Money');
        return false;
    }

    if ($('#item').val().length === 0) {
        $('#message').val('Must Select An Item');
        return false;
    }


    var amount = $('#moneyIn').val();
    var id = $('#item').val();
    var changeArray = [];

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/money/' + amount + '/item/' + id,
        success: function (response) {
//DONT DO THIS!!!
            for (var x in response) {
                if (response[x] >= 1) {
                    var changeItem = response[x] + ' ' + x;
                    changeArray.push(' ' + changeItem);
                }
            }

            $('#message').val('Thank You!!!');
            $('#change').val(changeArray);
            clearMoney();
            getItems();
        },
        error: function (response) {
            $('#message').val(response.responseText.slice(12, response.responseText.length - 2));
        }
    });
}

function getItems() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function (vendingArray) {
            $.each(vendingArray, function (index, item) {
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                $('#' + id).css({'text-align': 'center', 'cursor': 'pointer'})
                        .html('<a onclick="selectItem(' + id + ')">'
                                + name + '</a><p>$' + price
                                + '</p><p>Quantity Left: ' + quantity);
            });
        },
        error: function () {
            alert("'Error calling web service.  Please try again later.'");
        }
    });
}

function changeReturn() {
    var money = $('#moneyIn').val();

    if (money.length === 0) {
        $('#change').val("No change");
        return false;
    }

    var quarters;
    var dimes;
    var nickels;
    var pennies;
    var totalChange = [];

    quarters = money / 0.25;
    if (quarters >= 1) {
        totalChange.push(quarters.toFixed(0) + ' Quarters ');
    }
    money = money % 0.25;
    
    dimes = money / 0.10;
    if (dimes >= 1) {
        totalChange.push(dimes.toFixed(0) + ' Dimes ');
    }
    money = money % 0.10;
    
    nickels = money / 0.05;
    if (nickels >= 1) {
        totalChange.push(nickels.toFixed(0) + ' Nickels ');
    }
    money = money % 0.05;
    
    pennies = money / 0.01;
    if (pennies >= 1) {
        totalChange.push(pennies.toFixed(0) + ' Pennies ');
    }
    
    $('#change').val(totalChange);
    clearMoney();
    clearItem();
    clearMessage();
    getItems();
}
function clearMoney() {
    $('#moneyIn').val('');
}
function clearMessage() {
    $('#message').val('');
}
function clearItem() {
    $('#item').val('');
}
function clearChange() {
    $('#change').val('');
}



