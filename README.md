# NodeJS Express API for Idea Barrel – connected to Azure Cosmos DB
<br></br>

## Base URL: http://ibapi.mkayyeedev.ninja

### Every request to any url derived from the base url must contain a header field: "dev_token", and a value that is defined in the front end client assigned to that field. A request without dev_token responds with a 404.
<br></br> 


## The API exposes 4 main endpoints:

### /ideas
### /bulletins
### /events
### /users

#
## With the following HTTP methods:

### **GET**
### /ideas
### /bulletins
### /events
### /users
### /ideas/id
### /bulletins/id
### /events/id
### /users/id
#

### **POST** (Include JSON object describing the post in the body)
### /ideas
### /bulletins
### /events
#

### **UPDATE** (Include JSON object describing the post in the body)
### /ideas/id
### /bulletins/id
### /events/id
#

### **DELETE**
### /ideas/id/category
### /bulletins/id/category
### /events/id/category

<br></br>
## An example post stored into the Cosmos DB can be seen from the table below.

|senderId|title|body|category|date|id|
|--------|-----|----|--------|----|--|
|2325371f-8c56-40f9-a658-1f4ca6c0fa52|The greatest idea|Testing ideas from Postman|test category|2021-03-28T14:19:41.875Z|"22d4a7ad-624a-4f7e-9c7d-efff1e47c2d6"|

#
All post request to any of the 3 CRUD endpoints (/ideas, /events, /bulletins) should have values assigned to the following four fields: **senderId, title, body, category** – as they are null-checked before any other processing. If a value is missing, a 400 response will be returned along with a JSON body, containing the given input and a reason why the request failed. 
#
In addition to the four necessary fields, you can include almost anything. Every post is automatically assigned fields for its **id**, and a **date** indicating when it was created. When a post succeeds, the server will respond with a status code 200 with a JSON object of the post in the body with the automatically added fields.
#

<br></br>
## An example post request body to http://ibapi.mkayyeedev.ninja/ideas

```
{
    "title": "MyTitle",
    "senderId": "2325371f-8c56-40f9-a658-1f4ca6c0fa52",
    "body": "Too tired to write a huge wall of text here",
    "category": "MyCategory",
    "anotherField1": "value1",
    "anotherField2": "value2",
    "anotherField3": "value3",
    "anotherField4": "value4"
}
```
## Response:
```
STATUS: 200 OK

{
    "title": "MyTitle",
    "senderId": "2325371f-8c56-40f9-a658-1f4ca6c0fa52",
    "body": "Too tired to write a huge wall of text here",
    "category": "MyCategory",
    "anotherField1": "value1",
    "anotherField2": "value2",
    "anotherField3": "value3",
    "anotherField4": "value4",
    "date": "2021-03-28T15:16:10.927Z",
    "id": "bec64705-d304-4c53-9bf1-2537319c86d0",
    "_rid": "ecsyAKG9rrUJAAAAAAAAAA==",
    "_self": "dbs/ecsyAA==/colls/ecsyAKG9rrU=/docs/ecsyAKG9rrUJAAAAAAAAAA==/",
    "_etag": "\"5500bde0-0000-0c00-0000-60609dbb0000\"",
    "_attachments": "attachments/",
    "_ts": 1616944571
}
```


## An example of an invalid post request body to http://ibapi.mkayyeedev.ninja/ideas

```
{
    "title": "MyTitle",
    "body": "Too tired to write a huge wall of text here",
    "category": "MyCategory",
    "anotherField1": "value1",
    "anotherField2": "value2",
    "anotherField3": "value3",
    "anotherField4": "value4"
}
```
## Response:
```
STATUS: 400 Bad Request

{
    "error": "senderId, category, title or body missing",
    "input": {
        "title": "MyTitle",
        "body": "Too tired to write a huge wall of text here",
        "category": "MyCategory",
        "anotherField1": "value1",
        "anotherField2": "value2",
        "anotherField3": "value3",
        "anotherField4": "value4"
    }
}
```
