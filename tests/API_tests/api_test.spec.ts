import { test, expect } from '@playwright/test';


test('API Get Requests', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com');
    expect(response.status()).toBe(200);
    const pgContent = await response.text();
    // console.log(pgContent);

    expect(pgContent).toContain('Welcome to Restful-booker');
    console.log(await response.text());
});


let bookingId: number;
let token: string;
test.describe.serial('Booking flow w/ new bookingid', () => {
    test('Auth Request for TOKEN', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        expect(response.status()).toBe(200);
        token = (await response.json()).token;
        console.log('TOKEN = ' + token);
    });

    test('Post new Requests +/ capture BookingID', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname: 'say',
                lastname: 'mak',
                totalprice: 100,
                depositpaid: true,
                bookingdates: {
                    checkin: '2027-01-01',
                    checkout: '2027-01-10',
                }
            }
        })
        expect(response.status()).toBe(200);
        console.log(`new Request= ${await response.text()}`);
        bookingId = (await response.json()).bookingid;
        console.log(`BookingID= ${bookingId}`);
    });

    test('Get booking record from backend that was posted by above test', async ({ request }) => {
        const nURL = `https://restful-booker.herokuapp.com/booking/${bookingId}`
        console.log(nURL);
        const response = await request.get(nURL, {
            headers: { Accept: 'application/json' },
        });
        expect(response.status()).toBe(200);
        const pgContent = await response.json();
        console.log(pgContent);

        expect(pgContent.firstname).toBe('say');
        expect(pgContent.lastname).toBe('mak');
        expect(pgContent.totalprice).toBe(100);
        expect(pgContent.depositpaid).toBe(true);
        expect(pgContent.bookingdates.checkin).toBe('2027-01-01');
        expect(pgContent.bookingdates.checkout).toBe('2027-01-10');
    });

    test('PUT Request to updating previous booking record', async ({ request }) => {
        console.log(bookingId);
        const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`,
                Accept: 'application/json',
            },
            data: {
                firstname: 'say01',
                lastname: 'mak01',
                totalprice: 101,
                depositpaid: true,
                bookingdates: {
                    checkin: '2027-01-01',
                    checkout: '2027-01-10',
                }
            }
        });
        expect(response.status()).toBe(200);
        console.log(`Updated Booking Record= ${await response.text()}`);
    });


    test('Get data from backend that was updated by above test', async ({ request }) => {
        const nURL = `https://restful-booker.herokuapp.com/booking/${bookingId}`
        console.log(nURL);
        const response = await request.get(nURL, {
            headers: { Accept: 'application/json' },
        });
        expect(response.status()).toBe(200);
        const pgContent = await response.json();
        console.log(pgContent);

        expect(pgContent.firstname).toBe('say01');
        expect(pgContent.lastname).toBe('mak01');
        expect(pgContent.totalprice).toBe(101);
        expect(pgContent.depositpaid).toBe(true);
        expect(pgContent.bookingdates.checkin).toBe('2027-01-01');
        expect(pgContent.bookingdates.checkout).toBe('2027-01-10');
    });

});





