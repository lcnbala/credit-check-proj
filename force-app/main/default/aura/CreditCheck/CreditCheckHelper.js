({
    validateCaseForm: function (component) {
        var validCase = true;

        var allValid = component.find('caseField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);

        if (allValid) {
            // Verify we have an account to attach it to
            var account = component.get("v.account");
            if ($A.util.isEmpty(account)) {
                validCase = false;
                console.log("Quick action context doesn't have a valid account.");
            }

            return (validCase);
        }
    }
})