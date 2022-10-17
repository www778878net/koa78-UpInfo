'use strict';
const Upinfo = require('../dist/index').default;
const expect = require('chai').expect;

describe("guid", () => {
    it('guid ', async () => {
        let up = new Upinfo(null);
        let newid = up.getNewid()   
        expect(newid.length).to.equal(36);
        
    });

   

});