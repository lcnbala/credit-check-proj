trigger CaseTrigger on Case (after update) {

    List<Case> newCases = trigger.new;
    Map<Id,Case> oldCasesMap = trigger.oldMap;
    Map<Id,String> acctCreditChecksMap = new Map<Id,String>();
    for (Case caseRec: newCases){
        
        if (caseRec.Credit_Check_Status__c != oldCasesMap.get(caseRec.Id).Credit_Check_Status__c){
            acctCreditChecksMap.put(caseRec.AccountId, caseRec.Credit_Check_Status__c);
        }
        
    }

    if (acctCreditChecksMap.size() > 0){
        Map<Id,Account> accounts = new Map<Id,Account>([SELECT Id, Credit_Check_Status__c FROM Account WHERE Id IN :acctCreditChecksMap.keySet()]);

        for (Account acct:accounts.values()){
            acct.Credit_Check_Status__c = acctCreditChecksMap.get(acct.Id);
        }

        update accounts.values();
    }
    
}