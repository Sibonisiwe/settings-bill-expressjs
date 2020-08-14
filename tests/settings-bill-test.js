 describe("the bill with settings factory function", function() {

    describe("set values", function() {
    it("should be able to set the call cost", function() {
        
        let settingsBill = BillWithSettings()

       
        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.85);
        assert.equal(1.85, settingsBill.getCallCost());
    });

    it("should be able to set the sms cost", function() {
        let settingsBill = BillWithSettings()
        
        settingsBill.setCriticalLevel(10);
        settingsBill.setSmsCost(0.85);
        assert.equal(0.85, settingsBill.getSmsCost());
    });
    
    it("should be able to set the sms and call cost", function() {
        
        let settingsBill = BillWithSettings()
        
        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(2.75);
        settingsBill.setSmsCost(0.75);
        assert.equal(2.75, settingsBill.getCallCost());
        assert.equal(0.75, settingsBill.getSmsCost());
     });
     
     
     it("should be able to set the critical level", function() {
         let settingsBill = BillWithSettings()
         
         settingsBill.setCriticalLevel(50);
         assert.equal(50, settingsBill.getCriticalLevel());
     });

     it("should be able to set the warning level", function() {
        let settingsBill = BillWithSettings()
        
        settingsBill.setWarningLevel(30);
        assert.equal(30, settingsBill.getWarningLevel());
     });
 });

//testing the values for the call radio buttom
 describe("use values", function() {
    it("should be able to use the call cost set", function() {
        
        let settingsBill = BillWithSettings()
    
        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(2.25);
        settingsBill.setSmsCost(0.85);
    
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
    
        assert.equal(6.75, settingsBill.getTotalCost());
        assert.equal(6.75, settingsBill.getTotalCallCost());
        assert.equal(0.00, settingsBill.getTotalSmsCost());
     
    });

    it("should be able to use the call cost set for 2 calls at 1.35 each", function() {

    let settingsBill = BillWithSettings()

    settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);

    settingsBill.makeCall();
    settingsBill.makeCall();
    
    

    assert.equal(2.70, settingsBill.getTotalCost());
    assert.equal(2.70, settingsBill.getTotalCallCost());
    assert.equal(0.00, settingsBill.getTotalSmsCost());
 
});

//testing the values for the sms radio buttom
it("should be able to send 2 sms's at 0.85 each", function() {

    let settingsBill = BillWithSettings()
    
    settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);

    settingsBill.sendSms();
    settingsBill.sendSms();
    

    assert.equal(1.70, settingsBill.getTotalCost());
    assert.equal(0.00, settingsBill.getTotalCallCost());
    assert.equal(1.70, settingsBill.getTotalSmsCost());
 
});
//test sms and call together
it("should be able to send 2 sms's at 0.85 each & make 1 call at 1.35", function() {

    let settingsBill = BillWithSettings()
    
    settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);

    settingsBill.sendSms();
    settingsBill.sendSms();
    settingsBill.makeCall();
 
    assert.equal(3.05, settingsBill.getTotalCost());
    assert.equal(1.35, settingsBill.getTotalCallCost());
    assert.equal(1.70, settingsBill.getTotalSmsCost());
 
    });
});

describe("warning & critical level", function() {

    it("it should return a class name of 'warning' if warning level is reached", function() {
        
        let settingsBill = BillWithSettings()
        
        //settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);
        

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        assert.equal("warning", settingsBill.totalClassName());
    });

    it("it should return a class name of 'critical' if critical level has been reached", function() {
        
        let settingsBill = BillWithSettings()
        
        
        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(10);
        

        
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        assert.equal("critical", settingsBill.totalClassName());
    });

    //make the critical level stop adding when reached
    it("it should stop the Total call cost from increasing when the critical level has been reached", function() {
        
        let settingsBill = BillWithSettings()
        
        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);
        
        

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        assert.equal("critical", settingsBill.totalClassName());
        assert.equal(10, settingsBill.getTotalCallCost());

    });  
});

}); 
 