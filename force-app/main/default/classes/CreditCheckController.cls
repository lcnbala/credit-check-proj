public with sharing class CreditCheckController {

    @AuraEnabled
    public static Account getAccount(Id accountId) {
        return [SELECT Name, BillingCity, BillingState FROM Account WHERE Id = :accountId];
    }
    
    @AuraEnabled
    public static Case saveCase(Case caseRec, Id accountId) {
        caseRec.AccountId = accountId;
        upsert caseRec;
        return caseRec;
    }

}