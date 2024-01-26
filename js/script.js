$(function(){
 //jQuery goes here....

var i = 1;
function addOrSaveRowItem() {
    let orderIDArray = '';
    let orderValueArray = '';
    let orderQtyArray = '';
    
    $(this).parent('td').parent('tr').find('input[type=text]').each(function(){
        console.log(this.id);
        if(this.id.startsWith("orderID")){
            orderIDArray = [$(this).parent('td').parent('tr').id, this.value];
        } else if (this.id.startsWith("orderValue")) {
            orderValueArray = [$(this).parent('td').parent('tr').id, this.value];
        } else if (this.id.startsWith("orderQty")) {
            orderQtyArray = [$(this).parent('td').parent('tr').id, this.value];
        } else {
            alert("error");
        }
    });
    orderID =orderIDArray[1];
    orderValue =orderValueArray[1];
    orderQty =orderQtyArray[1];
    console.log("orderID =" + orderID);
    console.log("orderValue =" + orderValue);
    console.log("orderQty =" +orderQty);

    let rowNumber = this.id;
    $(this).parent('td').parent('tr').replaceWith('<tr class="to-save" id="'+rowNumber+'"><td id="orderID'+rowNumber+'">'+orderID+'</td> <td id="orderValue'+rowNumber+'">'+orderValue+'</td> <td id="orderQty'+rowNumber+'">'+orderQty+'</td> <td>   <button class="btn btn-sm btn-primary btn-edit" id="'+rowNumber+'">Edit</button>  <button class="btn btn-sm btn-danger" id="'+rowNumber+'">Delete</button> </td></tr>');
 }

 function saveToLocalStorage(orderData) {
     var  orderDataJson =   {
        orderData
    };
	localStorage.removeItem('orderData');
    localStorage.orderData = JSON.stringify(orderDataJson);

 }

 function filterOrders(jqueryOrdersObject, filterValue){

    //  console.log('Current Value:', filterValue);
    //  console.log('jqueryOrdersObject:', jqueryOrdersObject);
    console.log('this :', this);
    
    jqueryOrdersObject.each(function() {

        var orderValue = parseInt($(this).find('td:eq(1)').text());
        if (filterValue == 0 || orderValue >= filterValue) {
            $(this).show();
          } else {
            $(this).hide();
          }
    });
 }

$('#orderValueSlider').on('input', function() {
    var currentValue = $(this).val();
    if(parseInt(currentValue) == 0){

        $('#rangeValue').text('Show All');
    } else {

        $('#rangeValue').text(currentValue);
    }
    var orderjQueryObject = $(".table tbody").find("tr");

    filterOrders(orderjQueryObject, currentValue);
});

$("#AddOrderBtn").on("click", function() {
    // let rowHTML = `
    // <tr id="row'+i+'"> 
    // <td><input type='text'> </td>
    // <td><input type='text'></td> 
    // <td><input type='text'></td> 
    // <td><button class='btn btn-sm btn-primary'>Add</button></td>
    // </tr>`
    // $(".table tbody:last-child").append(rowHTML);
    $(".table tbody:last-child").append('<tr id="'+i+'"> <td><input type="text" id="orderID'+i+'"> </td>  <td><input type="text" id="orderValue'+i+'"></td> <td><input type="text" id="orderQty'+i+'"></td> <td><button class="btn btn-sm btn-primary btn-add" id="'+i+'">Add</button></td>  </tr>');
    i++
 });

 $(".table tbody").on("click",".btn-add", addOrSaveRowItem);

 $(".table tbody").on("click",".btn-save", addOrSaveRowItem);

 $(".table tbody").on("click", ".btn-danger", function(){
    $(this).parent('td').parent('tr').remove();
 });

 $(".table tbody").on("click", ".btn-edit", function(){
    let orderIDArray = '';
    let orderValueArray = '';
    let orderQtyArray = '';

    $(this).parent('td').parent('tr').find('td').each(function(){
        console.log(" edit IDs " + this.id);
        if(this.id.startsWith("orderID")){
            orderIDArray = [$(this).parent('td').parent('tr').id, $(this).text()];
        } else if (this.id.startsWith("orderValue")) {
            orderValueArray = [$(this).parent('td').parent('tr').id, $(this).text()];
        } else if (this.id.startsWith("orderQty")) {
            orderQtyArray = [$(this).parent('td').parent('tr').id, $(this).text()];
        } 
    });

    let rowNumber = this.id;
    $(this).parent('td').parent('tr').replaceWith('<tr id="'+rowNumber+'"> <td><input type="text" id="orderID'+rowNumber+'" value="'+orderIDArray[1]+'"> </td>  <td><input type="text" id="orderValue'+rowNumber+'" value="'+orderValueArray[1]+'"></td> <td><input type="text" id="orderQty'+rowNumber+'" value="'+orderQtyArray[1]+'"></td> <td><button class="btn btn-sm btn-primary btn-save" id="'+rowNumber+'">Save</button></td>  </tr>');
 });


 $("#SaveBtn").on("click", function() {
    const orderData = {
        rowData: []
      };

    const formatMe = ($el) => $el.text().trim();

    const $rows = $('.table').find('tr.to-save');
    rowsBefore = $rows;
    console.log(rowsBefore.toArray());
    // const headers = $rows.splice(0, 1); // header rows
    // rowsAfter = $rows;
    // console.log(rowsAfter.toArray());

    $rows.each((i,row) => {
        const $cols = $(row).find('td')//.filter(':not(:has(input[type="text"]))').get();
        let rowDetail = {
            OrderID: '',
            OrderValue: '',
            OrderQty: '',
        };

        $cols.each((i, col) => {
            const $col = $(col);
            if($col.prop('id').startsWith("orderID")){
                rowDetail['OrderID'] = formatMe($col);
                return;
            }
            if($col.prop('id').startsWith("orderValue")){
                rowDetail['OrderValue'] = formatMe($col);
                return;
            }
            if($col.prop('id').startsWith("orderQty")){
                rowDetail['OrderQty'] = formatMe($col);
                return;
            }
        });
        orderData['rowData'].push(rowDetail);
    });

    console.log(orderData);
    saveToLocalStorage(orderData);
 });
});