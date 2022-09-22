const { MarkovMachine } = require("./markov");

describe("Testing MarkovMachine Class", function(){
    let machine = new MarkovMachine("the cat in the hat is in the hat");

    test("tests the chains of the machine", function(){
        const expectedChains = {
            the : ["cat", "hat", "hat"],
            cat : ["in"],
            in : ["the", "the"],
            hat : ["is", null],
            is : ["in"]
        };
        expect(machine.chains).toEqual(expectedChains);
    });

    test("tests that makeword does not exceed numWords", function(){
        for(let i = 0; i < 100; i++){
            const wordcount = machine.makeText(5).split(/[ \r\n]+/).filter(c => c !== "");
            expect(wordcount.length).toBeLessThanOrEqual(5);
        }
    });
});