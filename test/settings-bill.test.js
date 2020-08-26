let assert = require("assert");
let SettingsBill = require("../settings-bill");
const { settings } = require("cluster");

describe("The setSettings function", function () {
    it("should be able to set the settings cost", function () {
        let settingsBill = SettingsBill();

        settingsBill.setSettings({
            callCost: 2.5,
            criticalLevel: 30.12,
            smsCost: 1.5,
            warningLevel: 20.5
        });

        assert.deepEqual({ smsCost: "1.5", callCost: "2.5", warningLevel: "20.5", criticalLevel: "30.12" }, settingsBill.getSettings());

    });

    it("should be able to set the settings cost", function () {
        let settingsBill = SettingsBill();

        settingsBill.setSettings({
            callCost: 1.5,
            criticalLevel: 50,
            smsCost: 1,
            warningLevel: 30
        });

        assert.deepEqual({ smsCost: "1", callCost: "1.5", warningLevel: "30", criticalLevel: "50" }, settingsBill.getSettings());

    });
});

describe("The recordAction function", function () {
    it("should be able to record actions for SMS's", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        })
        settingsBill.recordAction('sms')
        settingsBill.getTotal('sms');
        //console.log(settingsBill.recordAction())

        assert.deepEqual([{ cost: 1.5, timestamp: new Date(), type: 'sms' }], settingsBill.actions());

    });

    it("should be able to record actions for call", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        })
        settingsBill.recordAction('call')
        settingsBill.getTotal('call');
        //console.log(settingsBill.recordAction())

        //console.log(settingsBill.actions())
        assert.deepEqual([{ cost: 2.5, timestamp: new Date(), type: 'call' }], settingsBill.actions());

    });
});

describe("The actionsFor function", function () {
    it("should be able to filter over call action", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        })
        settingsBill.recordAction("call");
        settingsBill.recordAction("call");
        assert.deepEqual([{
            cost: 2.5,
            timestamp: new Date(),
            type: 'call'
        },
            {
                cost: 2.5,
                timestamp: new Date(),
                type: 'call'
            }
        ], settingsBill.actionsFor("call"));

    });

    it("should be able to filter over sms action", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        })
        settingsBill.recordAction("sms");
        
    assert.deepEqual([{cost: 1.5,
        timestamp: new Date(),
        type: 'sms'}], settingsBill.actionsFor("sms"));

    });

});

describe("The getTotal function", function () {
    it("should be able to add calls made", function () {
        let settingsBill = SettingsBill();

        assert.equal(0, settingsBill.getTotal("call"));
    });

    it("should be able to add sms made", function () {
        let settingsBill = SettingsBill();

        assert.equal(0, settingsBill.getTotal("sms"));
    });
});

describe("The grandTotal function", function () {
    it("should be able to add 1 call and 2 SMS's", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        });

        settingsBill.recordAction("sms");
        settingsBill.recordAction("call")
        settingsBill.recordAction("call")

        assert.equal(6.5, settingsBill.grandTotal());
    });

    it("should be able to add 3 calls and 2 SMS's", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        });
        

       
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');



        assert.equal(10.5, settingsBill.grandTotal());

    });
});

describe("The colorCode functions", function () {
    it("it should return a class name of 'critical' if critical level has been reached", function () {
        let settingsBill = SettingsBill();

        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        })

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');



        assert.equal('critical', settingsBill.colorCode());


    });

    it("it should return a class name of 'warning' if critical level has been reached", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 15,
            warningLevel: 10
        })

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');



        assert.equal('warning', settingsBill.colorCode());


    });
});

describe("The hasReachedCriticalLevel function", function () {
    it("should be able to return true when critical level is reached", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 7,
            warningLevel: 5
        })

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.equal(true, settingsBill.hasReachedCriticalLevel())



    });

    it("should be able to return false when critical level is not reached", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 7,
            warningLevel: 5
        })

        //settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.equal(false, settingsBill.hasReachedCriticalLevel());
    });
});

describe("The hasReachedWarningLevel function", function () {
    it("should be able to return true when warning level is reached", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 7,
            warningLevel: 5
        })

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');


        assert.equal(true, settingsBill.hasReachedWarningLevel())



    });

    it("should be able to return false when warning level is not reached", function () {
        let settingsBill = SettingsBill();
        settingsBill.setSettings({
            callCost: 2.5,
            smsCost: 1.5,
            criticalLevel: 7,
            warningLevel: 5
        })


        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');


        assert.equal(false, settingsBill.hasReachedWarningLevel());
    });
});    