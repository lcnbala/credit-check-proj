({
    doInit : function(component, event, helper) {

        // Prepare the action to load account record
        var action = component.get("c.getAccount");
        action.setParams({"accountId": component.get("v.recordId")});

        // Configure response handler
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.account", response.getReturnValue());
            } else {
                console.log('Problem getting account, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

    handleSave: function(component, event, helper) {
        if(helper.validateCaseForm(component)) {
            
            var saveCaseAction = component.get("c.saveCase");
            saveCaseAction.setParams({
                "caseRec": component.get("v.newCase"),
                "accountId": component.get("v.recordId")
            });

            saveCaseAction.setCallback(this, function(response) {
                var state = response.getState();
                if(state === "SUCCESS") {

                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Case Saved",
                        "message": "The new case was created."
                    });

                    $A.get("e.force:closeQuickAction").fire();
                    resultsToast.fire();
                    $A.get("e.force:refreshView").fire();
                }
                else if (state === "ERROR") {
                    console.log('Problem saving case, response state: ' + state);
                }
                else {
                    console.log('Unknown problem, response state: ' + state);
                }
            });

            $A.enqueueAction(saveCaseAction);
        }
        
    },

	handleCancel: function(component, event, helper) {
	    $A.get("e.force:closeQuickAction").fire();
    }
})