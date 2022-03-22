"use strict";


const PORT = process.env.PORT || 3004;
const hup = require("socket.io")(PORT);


require("../hup/fire-event");

require("../hup/hup")

describe("socket events tests", () => {
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = null;
        consoleSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterAll(() => setTimeout(() => process.exit(), 0));
    let payload = {
        store: '1-206-flowers',
        orderId: '99223554-ec37-4689-a932-0e5f97a6ce76',
        customer: 'Charlotte Trantow',
        address: 'irbid'
    }
    test("pick up test", async () => {
        expect(hup.emit("pickup", payload)).toEqual(true);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled()
    });
    test("in-transit test", async () => {
        expect(hup.emit("inTtransit", payload)).toEqual(true);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled()
    });

    test("delivered test", async () => {
        expect(hup.emit("delivered", payload)).toEqual(true);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled()
    });
})  