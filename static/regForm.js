var INCORRECT_DATE_FORMAT_ALERT = "Incorrect date format. Enter valid date (for example “9&nbsp;Nov&nbsp;2017”) or use the datepicker.";
var INCORRECT_DATE_ORDER_ALERT = "Incorrectly set accommodation dates. 'To' can't be earlier date than 'From'.";

function calculateNights() {
    var from = $("#from").val();
    var to = $("#to").val();
    
    var toTimestamp = Date.parse(to);
    var fromTimestamp = Date.parse(from);
    var result = ((toTimestamp - fromTimestamp) / (1000 * 60 * 60 * 24));
    return parseInt(result);  //converting the result to an integer
}

function updateNights() {
    var numNights = $("#numNights");
    var nights = $("#nights");
    var alertElement = $("#alert");
    var inTotal = $("#in-total");

    var intResult = calculateNights();               
    numNights.html(intResult);
    
    if (isNaN(intResult))  {
        nights.hide();
		alertElement.html(INCORRECT_DATE_FORMAT_ALERT);
    } else if (intResult < 0) {
        alertElement.html(INCORRECT_DATE_ORDER_ALERT);
        nights.hide();
    } else {
        nights.show();
        alertElement.html("");
    }
}

function toggleAccommodation() {
    if ($("#accommodation").val() == "double-room") {
        $("fieldset").prop("disabled", false);
        calculateFee();
    } else {
        if ($("#accommodation").val() == "no-accommodation") {
            $("fieldset").prop("disabled", true);
            $("#in-total").html("260.00");
            // $('input[name=roommate]').prop("checked", false);    // "vypne zaciarknuty radio button"
        }
    }
}

function calculateFee() {
    var intResult = calculateNights();
    var roommateValue = $('input[name=roommate]:checked').val();
    var inTotal = $("#in-total");
    
    if (intResult < 0 || isNaN(intResult)) {
        inTotal.html("0");
        $("#total-sum-alert").html("Invalid date");
        return;        
    } else {
        $("#total-sum-alert").html("");
    }

    if ($("#accommodation").val() == "no-accommodation") {
        inTotal.html("260.00");
    } else {
        if (roommateValue == "alone") {
            var totalSum = (45 * intResult + 260);
            totalSum = totalSum.toFixed(2);
            inTotal.html(totalSum);
        }
        if ((roommateValue == "with") || (roommateValue == "random")) {
            var totalSum = (22.5 * intResult + 260);
            totalSum = totalSum.toFixed(2);
            inTotal.html(totalSum);
        } 
    }
} 
      
    

$( document ).ready(function()  {
    $(".js-date").datepicker({
        dateFormat: $.datepicker.RFC_2822
    });

    updateNights();
    $(".js-date").on("input", updateNights);
    $(".js-date").on("change", updateNights);

    toggleAccommodation();
    $("#accommodation").on("change", toggleAccommodation);

    calculateFee();
    $(".on-change").on("change", calculateFee);
    // $("#from").on("change", aloneOrRoommate);
    // $("#to").on("change", aloneOrRoommate);
    // $("#accommodation").on("change", aloneOrRoommate);
    
    
});
