const {test, expect} = require('@playwright/test')

var token
var bookingId
//const baseURL = 'https://restful-booker.herokuapp.com'


test('Create Token', async({request})=>{

    const response =  await request.post('https://restful-booker.herokuapp.com/auth',{

            headers:
            {
                'accept': 'application/json'
            },
            data:{
                    'username': "admin",
                    "password": "password123"
            }
        })

        console.log(await response.json())
        var tokenId = await response.json()
        token = tokenId.token
        console.log("Token :", token)
        expect(await response.status()).toBe(200)
})

test('getBookingIds by all IDs', async({request})=>{

    const response = await request.get('https://restful-booker.herokuapp.com/booking')
    console.log('Get Booking All IDs:', await response.json())
    expect(await response.status()).toBe(200)
})

test('getBookingIds by filter name', async({request})=>{

    const response = await request.get('https://restful-booker.herokuapp.com/booking',{

    params:{
            'firstname': 'Zapp',
            'lastname':  'Brannigan'
    }
    })
    console.log('Get Booking by name', await response.json())
    expect(await response.status()).toBe(200)
})


test('getBookingIds by checkin checkout', async({request})=>{

    const response = await request.get('https://restful-booker.herokuapp.com/booking',{

    params:{
            'checkin': '2018-08-09',
            'checkout':  '2018-08-12'
    }
    })
    console.log('Get Booking by checkin/checkout', await response.json())
    expect(await response.status()).toBe(200)
})

test('Create Booking', async({request})=>{

    const response = await request.post('https://restful-booker.herokuapp.com/booking',{

                                headers:
                                {
                                    'accept': 'application/json',
                                },
                                data:{
                                    "firstname" : "MD Niyaz",
                                    "lastname" : "Hashmi",
                                    "totalprice" : 8279,
                                    "depositpaid" : true,
                                    "bookingdates" : {
                                        "checkin" : "2024-01-12",
                                        "checkout" : "2024-12-31"
                                    },
                                    "additionalneeds" : "Lunch"
                                
                                }


    })
    console.log('Create booking', await response.json())
    expect(await response.status()).toBe(200)
    var res = await response.json()
    bookingId = await res.bookingid
    console.log('Booking Id: ', await bookingId)
    expect(await res.bookingid).toBe(bookingId)
    expect(await res.booking.firstname).toEqual('MD Niyaz')
    expect(await res.booking.totalprice).toEqual(8279)
    expect(await res.booking.bookingdates.checkin).toEqual('2024-01-12')
})

test('getBooking by ID', async({request})=>{

    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`)
    console.log('Get Booking by ID', await response.json())
    expect(await response.status()).toBe(200)
    var res = await response.json()
    expect(await res.firstname).toEqual('MD Niyaz')
    expect(await res.lastname).toEqual('Hashmi')
    expect(await res.additionalneeds).toEqual('Lunch')
})

test('Update Booking', async({request})=>{

    console.log("Token: ", token)
    console.log("Bookingid: ", bookingId)

    const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`,{

                headers:{
                    'accept': 'application/json',
                    'cookie' : `token = ${token}`,
                    //'Authorization': `Basic ${token}`,
                },
                data:{
                    "firstname" : "MD Niyaz update",
                    "lastname" : "Hashmi update",
                    "totalprice" : 479,
                    "depositpaid" : true,
                    "bookingdates" : {
                        "checkin" : "2024-01-12",
                        "checkout" : "2024-12-31"
                    },
                    "additionalneeds" : "Lunch"
                }})
    console.log('Update Booking', await response.json())
    expect(await response.status()).toBe(200)
    var res = await response.json()
    expect(await res.firstname).toEqual('MD Niyaz update')
    expect(await res.lastname).toEqual('Hashmi update')
    expect(await res.totalprice).toEqual(479)
})

test('Partial Update Booking', async({request})=>{

    console.log("Token: ", await token)
    console.log("Bookingid: ", await bookingId)
    
    const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`,{

                headers:{
                    'accept': 'application/json',
                    'cookie' : `token = ${token}`,
                },
                data:{
                    "bookingdates" : {
                            "checkout" : "2024-12-30"
                    },
                    "additionalneeds" : "Dinner"
                }})
    console.log('Partial Update Booking', await response.json())
    expect(await response.status()).toBe(200)
    var res = await response.json()
    expect(await res.bookingdates.checkout).toEqual('2024-12-30')
    expect(await res.additionalneeds).toEqual('Dinner')
})

test('Delete Booking', async({request})=>{

    console.log("Token: ", token)
    console.log("Bookingid: ", bookingId)
    
    const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`,{

                headers:{
                    'Accept': 'application/json',
                    'Authorization' : `Basic ${token}`,
                }})
    console.log('Delete Booking', await response.status())
    expect(await response.status()).toBe(403)
})