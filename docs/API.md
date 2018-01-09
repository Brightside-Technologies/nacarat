## Model Objects
* [Businesses](#businesses)
* [Enums](#enums)
* [Inventories](#inventories)
* [Merchants](#merchants)
* [Products](#products)
* [Users](#user)

### Business<a name="businesses"></a>
A **Business** is a brick and mortar location owned by a [merchant](#merchant).  A merchant can own one or many businesses.

##### Business Object<a name="businessObject"></a>
```
{
    "merchantName": "John Doe",
    "merchantEmail": "johndoes@example.com",
    "merchantId": "bd9f7777-2372-4699-8c71-274de3da1269",
    "profile": {
        "profilePhotoURL": "",
        "name": "Yellow Mart",
        "socialMedias": {
            "facebook": {
                "display": "facebook",
                "url": "#"
            },
            "twitter": {
                "display": "twitter",
                "url": "#"
            },
            "instagram": {
                "display": "instagram",
                "url": "#"
            }
        },
        "phone": {
            "calling_code": "+1",
            "number": "4155551234"
        },
        "address": {
            "delivery_line_1": "82130 Verbena Ave",
            "last_line": "Indio CA 92201-2237",
            "latitude": 33.73153,
            "longitude": -116.23103,
            "county_name": "Riverside",
            "components": {
                "primary_number": "82130",
                "street_name": "Verbena",
                "street_suffix": "Ave",
                "city_name": "Indio",
                "state_abbreviation": "CA",
                "zipcode": "92201",
                "plus4_code": "2237"
            }
        },
        "type": "retail",
        "email": "hello@yellowmart.com",
        "about": "Lorem Ipsum",
        "hoursOfOperation": {
            "Monday": {
              "openTime": "07:00",
              "closeTime": "18:00",
              "isOpen": true
            },
            "Tuesday": {
              "openTime": "07:00",
              "closeTime": "18:00",
              "isOpen": true
            },
            ...
        }
    },
    "inventories": {
        "inventoryId": {/** inventoryObject */},
    }
}
```
##### Simplified Business Object
A simplified business object will only have the most basic properties.
**TODO**: _Define Simplified Business Object_

```
{
     "profilePhotoURL": "",
        "name": "Yellow Mart",
        "socialMedias": {
            "facebook": {
                "display": "facebook",
                "url": "#"
            },
            "twitter": {
                "display": "twitter",
                "url": "#"
            },
            "instagram": {
                "display": "instagram",
                "url": "#"
            }
        },
        "phone": {
            "calling_code": "+1",
            "number": "4155551234"
        },
        "address": {
            "delivery_line_1": "82130 Verbena Ave",
            "last_line": "Indio CA 92201-2237",
            "latitude": 33.73153,
            "longitude": -116.23103,
            "county_name": "Riverside",
            "components": {
                "primary_number": "82130",
                "street_name": "Verbena",
                "street_suffix": "Ave",
                "city_name": "Indio",
                "state_abbreviation": "CA",
                "zipcode": "92201",
                "plus4_code": "2237"
            }
        },
        "type": "retail",
        "email": "hello@yellowmart.com",
        "about": "Lorem Ipsum",
        "hoursOfOperation": [{
                "day": "Monday",
                "openTime": "07:00",
                "closeTime": "18:00"
            },
            ...
        ]
}
```

---

### Inventories<a name="inventories"></a>
>TODO: Define inventory object.  How it is it different from [products](#products).  This might only be internal to a businesObject.
----

### Merchant<a name="merchant"></a>
A **Merchant** is the individual signing up for our service.  This will usually be the business owner.  A **merchant** will be created in the system at the time of user onboarding, _after_ a user is created in the system.

**TODO**: _How do we relate merchant and firebase user together? Maybe the merchant IS the user?_

##### Merchant Object<a name="merchantObject"></a>
```
"merchantId": {
    "name": "Dave Davis",
    "userId": "userId",
    "email": "dave@example.com",
    "account_type": "BUSINESS", // do we need this?
    "businesses":{
        "businessId"{/** Simplified businessObject */}
    }
  }
```
##### Simplified Merchant Object
A simplified merchant object will only have the most basic properties (NO stores or any other lists). It will be part of the `businessObject`
```
"merchantId": {
    "name": "Dave Davis",
    "email": "dave@example.com",
  }
```

###### Retrieve Merchants

`GET /merchants`
This will return an object with `key`, `value` pairs where `key`s are `merchantId`s and `value`s are their corresponding [merchantObject](#merchantObject).  For example:

```
/** response */
{
    "merchantId_1":{
        "name": "Dave Davis",
        "email": "dave@example.com",       
        "account_type": "BUSINESS",
        "stores":{
            "storeId": {/** Simplified Store Object */}
        }
    },
    "merchantId_2": {/** merchantObject for merchantId_2*/},
    "merchantId_3": {/** merchantObject for merchantId_3*/},
    ...
    ...
    ...
}
``` 
`GET /merchants/{merchantId}`
This will return the [merchantObject](#merchantObject) by `merchantId`
```
/** response */
{
    "name": "Dave Davis",
    "email": "dave@example.com",
    "account_type": "BUSINESS",
    "stores":{
        "storeId"{/** Simplified Store Object */}
    }
}
```

---

### Enums 
>TODO: Add enums to the database 

`Enums` will all be accessed via the and base path `url/enums`.

To get each different enum, append the enum type to the `basePath`.

##### Social Media Types Enums
`basePath/social-media-types`

```
{
    "Enums": {
        "socialMediaTypes":{
            "id_1": "Facebook",
            "id_2": "Twitter",
            "id_3": "Snapchat",
            "id_4": "Instagram"
        }
    }
}
```
##### Business types
`basePath/business-types`

```
{
    "Enums": {
        "businessTypes":{
            "id_1": "retail",
            "id_2": "restaurants"
        }
    }
}
```

---
