({
    doInit: function (component, event, helper) {

        var action = component.get("c.getRecordTypeId");
        action.setParams({
            "caseId": component.get("v.recordId")
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.recTypeId", response.getReturnValue());
            } else {
                console.log('Problem getting record type id, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },

    showModal: function (component, event, helper) {
        component.set("v.showModal", true);
    },

    hideModal: function (component, event, helper) {
        component.set("v.showModal", false);
    },

    handleSubmit: function (cmp, event, helper) {
        cmp.set('v.showSpinner', true);
    },

    handleError: function (cmp, event, helper) {
        cmp.set('v.showSpinner', false);
    },

    handleSuccess: function (cmp, event, helper) {
        cmp.set('v.showSpinner', false);
        cmp.set('v.showModal', false);
    }
})