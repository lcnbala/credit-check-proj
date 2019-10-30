public with sharing class InitCreditCheckController {

    @AuraEnabled
    public static Id getRecordTypeId(Id caseId) {
        return [SELECT RecordTypeId  FROM Case WHERE Id = :caseId].RecordTypeId;
    }
    
}